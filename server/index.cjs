require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') })
const express = require('express')
const cors = require('cors')
const { Resend } = require('resend')

const app = express()
const PORT = process.env.PORT || 3001
const resend = new Resend(process.env.RESEND_API_KEY)

app.use(cors())
app.use(express.json())

function formatAreaName(area) {
  const names = {
    matematica: 'Matemática',
    linguistica: 'Lingüística',
    espacial: 'Espacial',
    logica: 'Lógica',
    personalidad: 'Personalidad'
  }
  return names[area] || area
}

function getScoreColor(percentage) {
  if (percentage >= 80) return '#10b981'
  if (percentage >= 60) return '#3b82f6'
  if (percentage >= 40) return '#f59e0b'
  return '#ef4444'
}

function generateDetailedEmailHTML(results, userName) {
  const { 
    totalScore, 
    iqEstimate, 
    areaScores, 
    personalitySummary, 
    summary, 
    timeUsed, 
    questionDetails = [],
    userEmail 
  } = results
  
  const minutes = Math.floor(timeUsed / 60)
  const seconds = timeUsed % 60
  
  const areaBars = Object.entries(areaScores || {})
    .filter(([key]) => key !== 'personalidad')
    .map(([area, scores]) => `
      <div style="margin: 10px 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span style="color: #94a3b8;">${formatAreaName(area)}</span>
          <span style="color: #fff; font-weight: 600;">${scores.percentage || 0}% (${scores.correct}/${scores.total})</span>
        </div>
        <div style="background: #334155; border-radius: 4px; height: 8px; overflow: hidden;">
          <div style="background: ${getScoreColor(scores.percentage || 0)}; width: ${scores.percentage || 0}%; height: 100%;"></div>
        </div>
      </div>
    `).join('')

  const areaIcons = {
    matematica: '🧮',
    linguistica: '📝',
    espacial: '👁️',
    logica: '🧠',
    personalidad: '🎭'
  }

  const questionSections = questionDetails.reduce((acc, q) => {
    const area = q.area
    if (!acc[area]) acc[area] = []
    acc[area].push(q)
    return acc
  }, {})

  const questionsHTML = Object.entries(questionSections)
    .filter(([area]) => area !== 'personalidad')
    .map(([area, questions]) => `
      <div style="margin-bottom: 30px;">
        <h2 style="color: #fff; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 1px solid #334155; display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 24px;">${areaIcons[area] || '📊'}</span>
          ${formatAreaName(area)}
        </h2>
        ${questions.map((q, idx) => {
          const isCorrect = q.isCorrect
          const userAnswerText = q.userAnswer !== undefined && q.userAnswer !== null ? q.options[q.userAnswer] : 'No respondida'
          const correctAnswerText = q.options[q.correctAnswer]
          
          return `
            <div style="background: ${isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}; border: 1px solid ${isCorrect ? '#10b98133' : '#ef444433'}; border-radius: 12px; padding: 16px; margin-bottom: 12px;">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: ${isCorrect ? '#10b981' : '#ef4444'}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; flex-shrink: 0;">
                  ${isCorrect ? '✓' : '✗'}
                </div>
                <div style="flex: 1;">
                  <p style="color: #fff; margin: 0 0 12px 0; font-size: 14px; line-height: 1.5;">${idx + 1}. ${q.prompt}</p>
                  <div style="font-size: 12px;">
                    <p style="color: #ef4444; margin: 0 0 4px 0;">
                      <strong>Tu respuesta:</strong> ${userAnswerText}
                    </p>
                    <p style="color: #10b981; margin: 0;">
                      <strong>Respuesta correcta:</strong> ${correctAnswerText}
                    </p>
                  </div>
                </div>
              </div>
              <div style="background: rgba(59, 130, 246, 0.1); border-radius: 8px; padding: 12px; margin-left: 40px;">
                <p style="color: #94a3b8; margin: 0; font-size: 13px; line-height: 1.5;">
                  <strong style="color: #3b82f6;">💡 Explicación:</strong> ${q.explanation || 'No hay explicación disponible.'}
                </p>
              </div>
            </div>
          `
        }).join('')}
      </div>
    `).join('')

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #f8fafc; padding: 20px; margin: 0;">
      <div style="max-width: 700px; margin: 0 auto; background: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px; text-align: center;">
          <h1 style="margin: 0 0 8px 0; font-size: 24px; color: white;">🧠 Test de Inteligencia</h1>
          <p style="margin: 0; color: #bfdbfe; font-size: 13px;">Resultados detallados con explicaciones</p>
        </div>
        
        <div style="padding: 30px;">
          <p style="margin: 0 0 20px 0; color: #94a3b8;">Hola <strong style="color: #fff;">${userName}</strong>,</p>
          
          <div style="display: flex; gap: 15px; margin-bottom: 25px; flex-wrap: wrap;">
            <div style="flex: 1; min-width: 120px; background: #0f172a; border-radius: 12px; padding: 20px; text-align: center;">
              <div style="font-size: 36px; font-weight: 800; color: #3b82f6; line-height: 1;">${totalScore || 0}%</div>
              <div style="color: #64748b; font-size: 11px; margin-top: 6px;">Puntuación Total</div>
            </div>
            <div style="flex: 1; min-width: 120px; background: #0f172a; border-radius: 12px; padding: 20px; text-align: center;">
              <div style="font-size: 36px; font-weight: 800; color: #10b981; line-height: 1;">${iqEstimate || 100}</div>
              <div style="color: #64748b; font-size: 11px; margin-top: 6px;">CI Estimado</div>
            </div>
            <div style="flex: 1; min-width: 120px; background: #0f172a; border-radius: 12px; padding: 20px; text-align: center;">
              <div style="font-size: 36px; font-weight: 800; color: #f59e0b; line-height: 1;">${minutes}m ${seconds}s</div>
              <div style="color: #64748b; font-size: 11px; margin-top: 6px;">Tiempo Used</div>
            </div>
          </div>
          
          <h2 style="color: #fff; font-size: 16px; margin: 0 0 15px 0; border-bottom: 1px solid #334155; padding-bottom: 10px;">
            📊 Rendimiento por Área
          </h2>
          ${areaBars || '<p style="color: #94a3b8;">No disponible</p>'}
          
          <h2 style="color: #fff; font-size: 16px; margin: 30px 0 20px 0; border-bottom: 1px solid #334155; padding-bottom: 10px;">
            📝 Revisión de Preguntas
          </h2>
          ${questionsHTML || '<p style="color: #94a3b8;">No hay preguntas para mostrar.</p>'}
          
          ${summary ? `
          <div style="margin-top: 25px; padding: 20px; background: #0f172a; border-radius: 12px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #fff; margin: 0 0 10px 0; font-size: 15px;">${summary.overall || 'Resultado'}</h3>
            <p style="color: #94a3b8; margin: 0; font-size: 13px; line-height: 1.6;">${summary.message || ''}</p>
          </div>
          ` : ''}
        </div>
        
        <div style="background: #0f172a; padding: 20px; text-align: center;">
          <p style="margin: 0; color: #64748b; font-size: 11px;">
            Enviado a: ${userEmail}<br>
            Test completado el ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        
        <div style="background: #0f172a; padding: 20px; text-align: center;">
          <p style="margin: 0; color: #64748b; font-size: 11px;">
            Este test es una herramienta informativa y no constituye un diagnóstico profesional.<br>
            © ${new Date().getFullYear()} Test de Inteligencia
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

async function sendResultsEmail({ to, subject, html }) {
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

// Routes
app.post('/api/send-results', async (req, res) => {
  try {
    const { email, results } = req.body

    if (!email || !results) {
      return res.status(400).json({ error: 'Email y resultados son requeridos' })
    }

    const userName = results.userName || 'Usuario'
    const htmlContent = generateDetailedEmailHTML(results, userName)

    const emailSent = await sendResultsEmail({
      to: email,
      subject: '📊 Tu Test de Inteligencia - Resultados Detallados',
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

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
