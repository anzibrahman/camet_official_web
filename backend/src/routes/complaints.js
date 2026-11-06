import express from 'express'

// Fixed routes and a server-only key: the browser cannot query arbitrary CRM APIs.
export function createComplaintRouter({ request = fetch, env = process.env } = {}) {
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
      try {
        const response = await request(`${base}/${action}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Camet-Complaint-Key': key },
          body: JSON.stringify(body), signal: AbortSignal.timeout(45000),
        })
        const data = await response.json()
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
