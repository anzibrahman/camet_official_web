import { test } from 'node:test'
import assert from 'node:assert/strict'
import express from 'express'
import { once } from 'node:events'
import { createComplaintRouter } from '../src/routes/complaints.js'

async function withServer(router, fn) {
  const app = express(); app.use(express.json()); app.use('/api/complaints', router)
  const server = app.listen(0, '127.0.0.1'); await once(server, 'listening')
  try { await fn(`http://127.0.0.1:${server.address().port}/api/complaints`) }
  finally { await new Promise(resolve => server.close(resolve)) }
}
const env = { CRM_COMPLAINT_API_URL: 'https://crm.example.test/api/website-complaints/', CAMET_COMPLAINT_API_KEY: 'test-only-secret-with-at-least-32-characters' }
const post = (base, path, body) => fetch(`${base}/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

test('missing licence enables enquiry without OTP even when CRM returns 404', async () => {
  const router = createComplaintRouter({ env, request: async () => ({ status: 404, json: async () => ({ success: false, exists: false, canSendOtp: true }) }) })
  await withServer(router, async base => {
    const response = await post(base, 'check-license', { licenceNumber: '123' })
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { success: true, exists: false, canSendOtp: false })
  })
})

test('enquiry emails website mailbox and never calls CRM', async () => {
  const mails = []
  const router = createComplaintRouter({ env: { CONTACT_EMAIL_TO: 'website@example.test', EMAIL_USER: 'sender@example.test' },
    request: async () => { assert.fail('Enquiry must not call CRM') },
    sendMail: async mail => { mails.push(mail); return { accepted: [mail.to] } },
  })
  await withServer(router, async base => {
    const body = { licenceNumber: '123', contactNumber: '9876543210', callNote: 'Tally support', description: 'Please call me about this issue.' }
    assert.equal((await post(base, 'enquiry', { ...body, description: '' })).status, 400)
    assert.equal(mails.length, 0)
    const response = await post(base, 'enquiry', body)
    assert.equal(response.status, 200)
    assert.equal((await response.json()).enquiry, true)
    assert.equal(mails[0].to, 'website@example.test')
    for (const value of Object.values(body)) assert.ok(mails[0].text.includes(value))
  })
})

test('legacy CRM missing-customer message opens enquiry, unrelated 404 remains an error', async () => {
  for (const message of ['No customer found with this licence number. Please check the number or contact Camet support.', 'Route not found']) {
    const router = createComplaintRouter({ env, request: async () => ({ status: 404, json: async () => ({ success: false, message }) }) })
    await withServer(router, async base => {
      const response = await post(base, 'check-license', { licenceNumber: '999' })
      if (message.startsWith('No customer')) {
        assert.equal(response.status, 200)
        assert.deepEqual(await response.json(), { success: true, exists: false, canSendOtp: false })
      } else {
        assert.equal(response.status, 404)
        assert.equal((await response.json()).success, false)
      }
    })
  }
})

test('failed enquiry email does not report success', async () => {
  await withServer(createComplaintRouter({ sendMail: async () => { throw new Error('SMTP unavailable') } }), async base => {
    const response = await post(base, 'enquiry', { licenceNumber: '123', contactNumber: '9876543210', callNote: 'Support', description: 'Please call about my enquiry.' })
    assert.equal(response.status, 503)
    assert.equal((await response.json()).success, false)
  })
})

test('proxy authenticates server-side, forwards fixed fields and strips private response fields', async () => {
  const router = createComplaintRouter({ env, request: async (url, options) => {
    assert.equal(url, 'https://crm.example.test/api/website-complaints/check-license')
    assert.equal(options.headers['X-Camet-Complaint-Key'], env.CAMET_COMPLAINT_API_KEY)
    assert.deepEqual(JSON.parse(options.body), { licenceNumber: '123' })
    return { status: 200, json: async () => ({ success: true, exists: true, customer: { email: 'private@example.test' }, apiKey: 'private' }) }
  } })
  await withServer(router, async base => {
    const response = await post(base, 'check-license', { licenceNumber: '123', customerid: 'not-allowed' })
    assert.deepEqual(await response.json(), { success: true, exists: true })
  })
})
test('unconfigured integration, invalid payloads and network failures return useful errors', async () => {
  await withServer(createComplaintRouter({ env: {} }), async base => assert.equal((await post(base, 'check-license', { licenceNumber: '123' })).status, 503))
  await withServer(createComplaintRouter({ env, request: async () => { throw new Error('network') } }), async base => {
    assert.equal((await post(base, 'check-license', { licenceNumber: { $ne: null } })).status, 400)
    const result = await post(base, 'submit', { challengeId: 'a', verificationToken: 'b', contactNumber: '1234567890', callNoteId: 'c', description: 'Some description' })
    assert.equal(result.status, 503); assert.match((await result.json()).message, /retry will not create a duplicate/)
    assert.equal((await post(base, 'arbitrary-crm-route', {})).status, 404)
  })
})
test('request throttling limits repeated public requests', async () => {
  const router = createComplaintRouter({ env, request: async () => ({ status: 200, json: async () => ({ success: true }) }) })
  await withServer(router, async base => {
    for (let i = 0; i < 60; i++) assert.equal((await post(base, 'check-license', { licenceNumber: '123' })).status, 200)
    assert.equal((await post(base, 'check-license', { licenceNumber: '123' })).status, 429)
  })
})
