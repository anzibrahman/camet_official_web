import { useEffect, useId, useRef, useState } from 'react'
import api from '@/utils/api'

const inputClass = 'mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:bg-slate-100'
const buttonClass = 'rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60'

function isMissingLicence(action, status, data) {
  return action === 'check-license' && [200, 404].includes(status) &&
    (data?.exists === false || (data?.success === false && typeof data.message === 'string' &&
      /^No customer found with this licence number\b/i.test(data.message)))
}

export default function ComplaintRegistration({ embedded = false, service = false, initialLicenceNumber = '' }) {
  const formId = useId()
  const [open, setOpen] = useState(embedded)
  const [licenceNumber, setLicenceNumber] = useState(() => /^[0-9]{1,15}$/.test(initialLicenceNumber) ? initialLicenceNumber : '')
  const [step, setStep] = useState('licence')
  const [session, setSession] = useState({})
  const [otp, setOtp] = useState('')
  const [notes, setNotes] = useState([])
  const [details, setDetails] = useState({ companyName: '', contactNumber: '', callNoteId: '', callNote: '', description: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [receipt, setReceipt] = useState(null)
  const [resendAt, setResendAt] = useState(0)
  const [now, setNow] = useState(Date.now())
  const lock = useRef(false)
  const licenceInput = useRef(null)

  useEffect(() => {
    if (open) licenceInput.current?.focus()
  }, [open])
  useEffect(() => {
    if (!resendAt) return
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [resendAt])

  async function run(action, body, onSuccess) {
    if (lock.current) return
    lock.current = true
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const { data, status } = await api.post(`/complaints/${action}`, body, { timeout: 50000 })
      if (isMissingLicence(action, status, data)) {
        onSuccess({ success: true, exists: false, canSendOtp: false })
        return
      }
      if (!data.success) throw new Error(data.message || 'Please try again.')
      onSuccess(data)
    } catch (err) {
      // Support CRM responses from backends deployed before enquiry normalization.
      if (isMissingLicence(action, err.response?.status, err.response?.data)) {
        onSuccess({ success: true, exists: false, canSendOtp: false })
        return
      }
      setError(err.response?.data?.message || err.message || 'Unable to connect. Please try again.')
    } finally {
      lock.current = false
      setBusy(false)
    }
  }

  function reset() {
    setStep('licence')
    setSession({})
    setOtp('')
    setNotes([])
    setDetails({ companyName: '', contactNumber: '', callNoteId: '', callNote: '', description: '' })
    setReceipt(null)
    setError('')
    setMessage('')
    setResendAt(0)
  }

  function check(e) {
    e.preventDefault()
    run('check-license', { licenceNumber: licenceNumber.trim() }, data => {
      if (data.exists === false) {
        setSession({ canSendOtp: false })
        setStep('enquiry')
        setMessage('No customer is registered with this licence number. Enter your contact number, call note and description to email an enquiry to Camet.')
        return
      }
      setStep('found')
      setSession({ canSendOtp: data.canSendOtp })
      setMessage(data.canSendOtp ? 'Customer found. Send an OTP to verify your registered email.' : 'Customer found, but no valid email is registered. Please contact Camet support.')
    })
  }

  function sendOtp() {
    run('send-otp', { licenceNumber: licenceNumber.trim() }, data => {
      setSession({ challengeId: data.challengeId, maskedEmail: data.maskedEmail })
      setStep('otp')
      setOtp('')
      setMessage(`OTP sent to ${data.maskedEmail}. The code expires in 10 minutes.`)
      setResendAt(Date.now() + 60000)
      setNow(Date.now())
    })
  }

  function verify(e) {
    e.preventDefault()
    run('verify-otp', { challengeId: session.challengeId, otp }, data => {
      setSession(prev => ({ ...prev, verificationToken: data.verificationToken }))
      setNotes(data.callNotes)
      setDetails(prev => ({ ...prev, contactNumber: data.contactNumber }))
      setStep('details')
      setMessage(service ? 'Email verified. Complete your service request within 15 minutes.' : 'Email verified. Complete your complaint within 15 minutes.')
    })
  }

  function submit(e) {
    e?.preventDefault()
    if (step === 'enquiry') {
      run('enquiry', { licenceNumber: licenceNumber.trim(), companyName: details.companyName.trim(), contactNumber: details.contactNumber, callNote: details.callNote, description: details.description }, data => {
        setReceipt(data)
        setStep('success')
      })
      return
    }
    run('submit', { challengeId: session.challengeId, verificationToken: session.verificationToken, ...details }, data => {
      setReceipt(data)
      setStep('success')
    })
  }

  const remaining = Math.max(0, Math.ceil((resendAt - now) / 1000))
  return (
    <div className={embedded ? '' : 'mt-6 border-t border-slate-200 pt-6'}>
      {!embedded && <button type="button" aria-expanded={open} aria-controls={`${formId}-registration`} disabled={busy} onClick={() => setOpen(value => !value)} className="w-full rounded-xl border border-sky-700 px-5 py-3 text-sm font-semibold text-sky-800 hover:bg-sky-50 disabled:opacity-60">
        {open ? 'Hide complaint form' : 'Raise a Complaint'}
      </button>}
      {open && (
        <section id={`${formId}-registration`} aria-labelledby={`${formId}-heading`} className="mt-5 rounded-2xl bg-slate-50 p-4 sm:p-5" aria-busy={busy}>
          <h3 id={`${formId}-heading`} className="text-lg font-semibold text-slate-900">{service ? 'Book a Service' : 'Register your complaint'}</h3>
          <p className="mt-1 mb-5 text-sm leading-6 text-slate-600">{service ? 'Check your licence to continue. Registered customers verify their email; other enquiries are emailed directly to Camet.' : 'Verify your licence and registered email to raise a support complaint.'}</p>
          <div role="status" aria-live="polite" className="text-sm text-emerald-800">{message}</div>
          {error && <p role="alert" className="my-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

          {step !== 'success' && <form onSubmit={check} className="mt-3 space-y-3">
            <label htmlFor={`${formId}-licence`} className="block text-sm font-medium text-slate-800">Licence number <span aria-hidden="true">*</span>
              <input ref={licenceInput} id={`${formId}-licence`} value={licenceNumber} onChange={e => setLicenceNumber(e.target.value)} required inputMode="numeric" pattern="[0-9]{1,15}" maxLength={15} disabled={busy || step !== 'licence'} className={inputClass} placeholder="Enter your licence number" />
            </label>
            {step === 'licence' && <button type="submit" disabled={busy} className={buttonClass}>{busy ? 'Checking…' : 'Check Licence'}</button>}
          </form>}

          {step === 'found' && session.canSendOtp && <button type="button" onClick={sendOtp} disabled={busy} className={`${buttonClass} mt-4`}>{busy ? 'Sending…' : 'Send OTP'}</button>}

          {step === 'otp' && <form onSubmit={verify} className="mt-4 space-y-4">
            <p className="text-sm text-slate-600">A verification code was sent to <strong>{session.maskedEmail}</strong>.</p>
            <label htmlFor={`${formId}-otp`} className="block text-sm font-medium text-slate-800">Email OTP
              <input id={`${formId}-otp`} autoComplete="one-time-code" inputMode="numeric" required pattern="[0-9]{6}" maxLength={6} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} disabled={busy} className={inputClass} placeholder="Six-digit code" />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" disabled={busy} className={buttonClass}>{busy ? 'Please wait…' : 'Verify OTP'}</button>
              <button type="button" onClick={sendOtp} disabled={busy || remaining > 0} className="text-sm font-semibold text-sky-800 underline disabled:opacity-50">{remaining ? `Resend in ${remaining}s` : 'Resend OTP'}</button>
            </div>
          </form>}

          {['details', 'enquiry'].includes(step) && <form onSubmit={submit} className="mt-4 space-y-4">
            <label htmlFor={`${formId}-company`} className="block text-sm font-medium text-slate-800">Company name
              <input id={`${formId}-company`} autoComplete="organization" maxLength={200} value={details.companyName} onChange={e => setDetails(prev => ({ ...prev, companyName: e.target.value }))} disabled={busy} className={inputClass} placeholder="Enter your company name" />
            </label>
            <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-slate-800">Contact number <span aria-hidden="true">*</span>
              <input id={`${formId}-phone`} type="tel" autoComplete="tel" required minLength={7} maxLength={20} value={details.contactNumber} onChange={e => setDetails(prev => ({ ...prev, contactNumber: e.target.value }))} disabled={busy} className={inputClass} />
            </label>
            <label htmlFor={`${formId}-note`} className="block text-sm font-medium text-slate-800">Call note <span aria-hidden="true">*</span>
              {step === 'enquiry' ? <input id={`${formId}-note`} required maxLength={200} value={details.callNote} onChange={e => setDetails(prev => ({ ...prev, callNote: e.target.value }))} disabled={busy} className={inputClass} placeholder="What would you like to enquire about?" /> : <select id={`${formId}-note`} required value={details.callNoteId} onChange={e => setDetails(prev => ({ ...prev, callNoteId: e.target.value }))} disabled={busy} className={inputClass}>
                <option value="">Select a call note</option>
                {notes.map(note => <option key={note._id} value={note._id}>{note.callNotes}</option>)}
              </select>}
            </label>
            {step === 'details' && !notes.length && <p className="text-sm text-amber-800">No call notes are available. Please contact Camet support.</p>}
            <label htmlFor={`${formId}-description`} className="block text-sm font-medium text-slate-800">Description <span aria-hidden="true">*</span>
              <textarea id={`${formId}-description`} required minLength={10} maxLength={5000} rows={4} value={details.description} onChange={e => setDetails(prev => ({ ...prev, description: e.target.value }))} disabled={busy} className={inputClass} placeholder="Describe the issue (at least 10 characters)" />
            </label>
            {step === 'enquiry' && <p className="text-sm text-slate-600">Your enquiry will be emailed to Camet so our team can contact you.</p>}
            <button type="submit" disabled={busy || (step === 'details' && !notes.length)} className={`${buttonClass} w-full`}>{busy ? 'Submitting…' : step === 'enquiry' ? 'Send Enquiry' : service ? 'Book Service' : 'Submit Complaint'}</button>
          </form>}

          {step === 'success' && receipt && <div role="status" className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            <p className="font-semibold">{receipt.enquiry ? 'Your enquiry has been emailed to Camet. Our team will contact you.' : service ? 'Your service request has been registered successfully.' : 'Your complaint has been registered successfully.'}</p>
            {receipt.reference && <p className="mt-2 break-all">Reference: {receipt.reference}</p>}
            <p className="mt-2">{receipt.notificationSent ? 'An email notification has been sent to Camet.' : 'Your complaint is saved. The email notification could not be confirmed.'}</p>
            {!receipt.notificationSent && <button type="button" disabled={busy} onClick={() => submit()} className="mt-3 font-semibold underline">{busy ? 'Retrying…' : 'Retry email notification'}</button>}
          </div>}

          {step !== 'licence' && <button type="button" disabled={busy} onClick={reset} className="mt-4 text-sm font-semibold text-slate-600 underline disabled:opacity-50">{step === 'success' ? service ? 'Book another service' : 'Raise another complaint' : 'Start again / change licence'}</button>}
        </section>
      )}
    </div>
  )
}
