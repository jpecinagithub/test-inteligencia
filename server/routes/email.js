import express from 'express'
import { sendResultsEmail } from '../services/nodemailer.js'
import { generateResultsEmailHTML } from '../../src/services/scoring.js'

const router = express.Router()

router.post('/send-results', async (req, res) => {
  try {
    const { email, results } = req.body

    if (!email || !results) {
      return res.status(400).json({ error: 'Email y resultados son requeridos' })
    }

    const userName = results.userName || 'Usuario'
    const htmlContent = generateResultsEmailHTML(results, userName)

    const emailSent = await sendResultsEmail({
      to: email,
      subject: '📊 Tu Test de Inteligencia - Resultados',
      html: htmlContent
    })

    if (emailSent) {
      res.json({ success: true, message: 'Email enviado correctamente' })
    } else {
      res.status(500).json({ error: 'Error al enviar el email' })
    }
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

export default router
