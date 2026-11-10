import express from 'express'
import { createEmailTransport } from '../config/email.js'

// Fixed routes and a server-only key: the browser cannot query arbitrary CRM APIs.
export function createComplaintRouter({ request = fetch, env = process.env, sendMail } = {}) {
  const router = express.Router()
  const limits = new Map()
  const actions = ['check-license', 'send-otp', 'verify-otp', 'submit']

  router.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    const now = Date.now()
    for (const [key, value] of limits) if (value.reset <= now) limits.delete(key)
    // req.ip follows Express trust-proxy settings; never trust arbitrary forwarded headers.
    const key = req.ip || req.socket.remoteAddress || 'unknown'
    let bucket = limits.get(key)
    if (!bucket) {
      if (limits.size >= 10000) return res.status(429).json({ success: false, message: 'Please try again later.' })
      bucket = { count: 0, reset: now + 10 * 60 * 1000 }
      limits.set(key, bucket)
    }
    if (++bucket.count > 60) return res.status(429).json({ success: false, message: 'Too many requests. Please wait before trying again.' })
    next()
  })

  // Enquiries are email-only and never call the CRM complaint/telecalling API.
  router.post('/enquiry', async (req, res) => {
    const { licenceNumber, companyName = '', contactNumber, callNote, description } = req.body || {}
    if (typeof companyName !== 'string' || companyName.length > 200 || typeof licenceNumber !== 'string' || !/^\d{1,15}$/.test(licenceNumber) ||
        typeof contactNumber !== 'string' || !/^[+\d\s()-]{7,20}$/.test(contactNumber) || contactNumber.replace(/\D/g, '').length < 7 ||
        typeof callNote !== 'string' || !callNote.trim() || callNote.length > 200 ||
        typeof description !== 'string' || description.trim().length < 10 || description.length > 5000) {
      return res.status(400).json({ success: false, message: 'Please provide a valid licence number, contact number, call note and description (at least 10 characters).' })
    }
    try {
      const mail = {
        from: `"Website Enquiry" <${env.EMAIL_USER?.trim()}>`,
        to: env.CONTACT_EMAIL_TO || 'admin@camet.in',
        subject: 'Website enquiry about an unregistered licence',
        text: `A visitor would like to make an enquiry about the following:\n\nLicence number: ${licenceNumber}\nCompany name: ${companyName.trim() || 'Not provided'}\nContact number: ${contactNumber.trim()}\nCall note: ${callNote.trim()}\n\nDescription:\n${description.trim()}\n\nPlease contact this visitor regarding their enquiry.`,
      }
      const result = await (sendMail ? sendMail(mail) : createEmailTransport(env).sendMail(mail))
      if (result?.rejected?.length) throw new Error('Email rejected')
      return res.json({ success: true, enquiry: true, notificationSent: true })
    } catch {
      return res.status(503).json({ success: false, message: 'Your enquiry email could not be sent. Please try again.' })
    }
  })

  for (const action of actions) {
    router.post(`/${action}`, async (req, res) => {
      const base = env.CRM_COMPLAINT_API_URL?.replace(/\/$/, '')
      const key = env.CAMET_COMPLAINT_API_KEY
      if (!base || !key || key.length < 32) return res.status(503).json({ success: false, message: 'Complaint registration is not configured yet. Please contact Camet support.' })
      const fields = {
        'check-license': ['licenceNumber'], 'send-otp': ['licenceNumber'],
        'verify-otp': ['challengeId', 'otp'],
        submit: ['challengeId', 'verificationToken', 'contactNumber', 'callNoteId', 'description'],
      }[action]
      const body = Object.fromEntries(fields.map(field => [field, req.body?.[field]]))
      if (Object.values(body).some(value => typeof value !== 'string' || value.length > 5000)) return res.status(400).json({ success: false, message: 'Please complete all the required fields.' })
      if (action === 'submit' && req.body?.companyName !== undefined) {
        if (typeof req.body.companyName !== 'string' || req.body.companyName.length > 200) return res.status(400).json({ success: false, message: 'Company name must be at most 200 characters.' })
        body.companyName = req.body.companyName.trim()
      }
      try {
        const response = await request(`${base}/${action}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Camet-Complaint-Key': key },
          body: JSON.stringify(body), signal: AbortSignal.timeout(45000),
        })
        const data = await response.json()
        const missingCustomer = data.exists === false ||
          (response.status === 404 && data.success === false && typeof data.message === 'string' &&
            /^No customer found with this licence number\b/i.test(data.message))
        if (action === 'check-license' && [200, 404].includes(response.status) && missingCustomer) {
          return res.json({ success: true, exists: false, canSendOtp: false })
        }
        // Only forward the public response contract, never arbitrary CRM customer fields.
        const allowed = ['success', 'message', 'exists', 'canSendOtp', 'challengeId', 'maskedEmail', 'expiresIn', 'verificationToken', 'contactNumber', 'callNotes', 'reference', 'notificationSent']
        const result = Object.fromEntries(allowed.filter(field => Object.hasOwn(data, field)).map(field => [field, data[field]]))
        if (Array.isArray(result.callNotes)) result.callNotes = result.callNotes.map(note => ({ _id: note._id, callNotes: note.callNotes }))
        if (response.status === 401 && !['submit', 'verify-otp'].includes(action)) {
          return res.status(503).json({ success: false, message: 'Complaint service is temporarily unavailable. Please contact Camet support.' })
        }
        return res.status(response.status).json(result)
      } catch {
        return res.status(503).json({ success: false, message: action === 'submit' ? 'We could not confirm the result. Please retry without refreshing; a retry will not create a duplicate complaint.' : 'Complaint service is temporarily unavailable. Please try again.' })
      }
    })
  }
  return router
}

export default createComplaintRouter()
