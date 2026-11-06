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
