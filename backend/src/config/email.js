import nodemailer from 'nodemailer'

export function createEmailTransport(env = process.env) {
  const user = env.EMAIL_USER?.trim()
  const pass = env.EMAIL_PASS?.trim()
  if (!user || !pass) {
    const error = new Error('Set EMAIL_USER and EMAIL_PASS in the backend environment')
    error.code = 'EMAIL_CONFIG'
    throw error
  }

  const port = Number(env.SMTP_PORT || 587)
  if (env.SMTP_HOST && (!Number.isInteger(port) || port < 1 || port > 65535)) {
    const error = new Error('SMTP_PORT must be a valid port number')
    error.code = 'EMAIL_CONFIG'
    throw error
  }

  return nodemailer.createTransport({
    ...(env.SMTP_HOST
      ? { host: env.SMTP_HOST.trim(), port, secure: env.SMTP_SECURE ? env.SMTP_SECURE === 'true' : port === 465 }
      : { service: 'gmail' }),
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  })
}

export function emailErrorDetails(error) {
  // Never log credentials, message contents, or raw SMTP responses.
  return {
    code: error.code || 'EMAIL_SEND_FAILED',
    command: error.command,
    responseCode: error.responseCode,
  }
}
