import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import ComplaintRegistration from '../ComplaintRegistration'

export default function BookServiceButton({ children = 'Book a Service', ...props }) {
  const dialog = useRef(null)
  const [open, setOpen] = useState(false)

  function close() {
    dialog.current?.close()
    setOpen(false)
  }

  return <>
    <button {...props} type="button" aria-haspopup="dialog" onClick={() => {
      setOpen(true)
      dialog.current.showModal()
    }}>{children}</button>
    {createPortal(<dialog ref={dialog} aria-label="Book a Service" onClose={() => setOpen(false)}
      onClick={event => { if (event.target === event.currentTarget) close() }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl bg-white p-5 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 sm:p-6">
      <div className="mb-2 flex justify-end">
        <button type="button" onClick={close} aria-label="Close service form" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Close ×</button>
      </div>
      {open && <ComplaintRegistration embedded service />}
    </dialog>, document.body)}
  </>
}
