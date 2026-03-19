import { Resend } from 'resend'
import { generateResultsEmailHTML } from '../../src/services/scoring.js'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, results } = req.body

    if (!email || !results) {
      return res.status(400).json({ error: 'Email y resultados son requeridos' })
    }

    const userName = results.userName || 'Usuario'
    const htmlContent = generateResultsEmailHTML(results, userName)

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: '📊 Tu Test de Inteligencia - Resultados',
      html: htmlContent
    })

    if (error) {
      console.error('Error sending email:', error)
      return res.status(500).json({ error: 'Error al enviar el email' })
    }

    res.json({ success: true, message: 'Email enviado correctamente' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}