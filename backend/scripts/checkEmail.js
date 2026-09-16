import '../src/config/env.js'
import { createEmailTransport, emailErrorDetails } from '../src/config/email.js'

let transporter
try {
  transporter = createEmailTransport()
  await transporter.verify()
  console.log('SMTP connection and authentication succeeded. No email was sent.')
} catch (error) {
  console.error('SMTP verification failed:', emailErrorDetails(error))
  process.exitCode = 1
} finally {
  transporter?.close()
}
