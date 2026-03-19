import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendResultsEmail({ to, subject, html }) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to,
      subject,
      html
    })

    if (error) {
      console.error('Error sending email:', error)
      return false
    }

    console.log('Email sent:', data?.id)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}
