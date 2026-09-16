import express from 'express'
import { createEmailTransport, emailErrorDetails } from '../config/email.js'

const router = express.Router()

// Initialize lazily so configuration is read after the environment is loaded.
let transporter

router.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required'
    })
  }

  const mailOptions = {
    from: `"Contact Form" <${process.env.EMAIL_USER?.trim()}>`,
    to: process.env.CONTACT_EMAIL_TO || 'admin@camet.in',
    replyTo: email,
    subject: `New Contact Form: ${name} - ${new Date().toLocaleDateString()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
        <h2 style="color: #4937b8;">New Contact Form Submission</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #ddd;">Name:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #ddd;">Email:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #ddd;">Phone:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #ddd;">Message:</td>
            <td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
        <p style="color: #666; font-size: 14px;">Submitted on: ${new Date().toLocaleString()}</p>
      </div>
    `
  }

  try {
    transporter ||= createEmailTransport()
    await transporter.sendMail(mailOptions)
    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    })
  } catch (error) {
    console.error('Contact email failed:', emailErrorDetails(error))
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.'
    })
  }
})

export default router
