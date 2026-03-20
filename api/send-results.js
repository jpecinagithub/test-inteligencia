import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function formatAreaName(area) {
  const names = {
    matematica: 'Matemática',
    linguistica: 'Lingüística',
    espacial: 'Espacial',
    logica: 'Lógica',
    cultura: 'Cultura'
  }
  return names[area] || area
}

function getScoreColor(percentage) {
  if (percentage >= 80) return '#10b981'
  if (percentage >= 60) return '#3b82f6'
  if (percentage >= 40) return '#f59e0b'
  return '#ef4444'
}

function generateResultsEmailHTML(results, userName) {
  const {
    totalScore = 0,
    iqEstimate = 0,
    areaScores = {},
    personalitySummary,
    summary,
    timeUsed = 0,
    questionDetails
  } = results || {}

  const safeSummary = {
    overall: summary?.overall || 'Resultado',
    message: summary?.message || 'Resultados generados correctamente.',
    strengths: Array.isArray(summary?.strengths) ? summary.strengths : [],
    improvements: Array.isArray(summary?.improvements) ? summary.improvements : []
  }

  const minutes = Math.floor(timeUsed / 60)
  const seconds = timeUsed % 60
  
  const areaBars = Object.entries(areaScores || {})
    .filter(([key]) => key !== 'personalidad')
    .map(([area, scores]) => `
      <div style="margin: 10px 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span style="color: #94a3b8;">${formatAreaName(area)}</span>
          <span style="color: #fff; font-weight: 600;">${scores.percentage}%</span>
        </div>
        <div style="background: #334155; border-radius: 4px; height: 8px; overflow: hidden;">
          <div style="background: ${getScoreColor(scores.percentage)}; width: ${scores.percentage}%; height: 100%;"></div>
        </div>
      </div>
    `).join('')

  const questionsHTML = Array.isArray(questionDetails) && questionDetails.length > 0 
    ? questionDetails.map((q, index) => {
        const userAnswerIndex = q.userAnswer
        const correctAnswerIndex = q.correctAnswer
        const userAnswer = q.options?.[userAnswerIndex] || 'No respondida'
        const correctAnswer = q.options?.[correctAnswerIndex] || 'N/A'
        const isCorrect = q.isCorrect
        
        return `
          <div style="margin-bottom: 24px; padding: 16px; background: #0f172a; border-radius: 8px; border-left: 4px solid ${isCorrect ? '#10b981' : '#ef4444'};">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="background: ${isCorrect ? '#10b981' : '#ef4444'}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">
                ${isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
              </span>
              <span style="color: #64748b; font-size: 12px;">${formatAreaName(q.area)}</span>
            </div>
            <p style="color: #fff; font-size: 14px; margin: 0 0 12px 0; line-height: 1.6;">
              <strong>Pregunta ${index + 1}:</strong> ${q.prompt}
            </p>
            <div style="margin-bottom: 8px;">
              <span style="color: #94a3b8; font-size: 12px;">Tu respuesta:</span>
              <span style="color: ${isCorrect ? '#10b981' : '#ef4444'}; font-size: 13px; margin-left: 8px;">${userAnswer}</span>
            </div>
            ${!isCorrect ? `
              <div style="margin-bottom: 8px;">
                <span style="color: #94a3b8; font-size: 12px;">Respuesta correcta:</span>
                <span style="color: #10b981; font-size: 13px; margin-left: 8px;">${correctAnswer}</span>
              </div>
            ` : ''}
            ${q.explanation ? `
              <div style="margin-top: 12px; padding: 12px; background: #1e293b; border-radius: 6px;">
                <span style="color: #3b82f6; font-size: 12px; font-weight: 600;">Explicación:</span>
                <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0 0; line-height: 1.5;">${q.explanation}</p>
              </div>
            ` : ''}
          </div>
        `
      }).join('')
    : '<p style="color: #94a3b8;">No se encontraron detalles de las preguntas.</p>'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px; text-align: center;">
          <h1 style="margin: 0 0 10px 0; font-size: 28px; color: white;">Test de Inteligencia</h1>
          <p style="margin: 0; color: #bfdbfe; font-size: 14px;">Resultados detallados</p>
        </div>
        
        <div style="padding: 40px;">
          <p style="margin: 0 0 20px 0; color: #94a3b8;">Hola <strong style="color: #fff;">${userName}</strong>,</p>
          <p style="margin: 0 0 30px 0; color: #94a3b8; line-height: 1.6;">
            Has completado el test de inteligencia. A continuación encontrarás tu puntuación total, el desglose por áreas y el análisis detallado de cada pregunta.
          </p>
          
          <div style="display: flex; gap: 20px; margin-bottom: 30px;">
            <div style="flex: 1; background: #0f172a; border-radius: 12px; padding: 24px; text-align: center;">
              <div style="font-size: 48px; font-weight: 800; color: #3b82f6; line-height: 1;">
                ${totalScore}<span style="font-size: 20px; color: #64748b;">%</span>
              </div>
              <div style="color: #64748b; font-size: 12px; margin-top: 8px;">Puntuación Total</div>
            </div>
            <div style="flex: 1; background: #0f172a; border-radius: 12px; padding: 24px; text-align: center;">
              <div style="font-size: 48px; font-weight: 800; color: #10b981; line-height: 1;">
                ${iqEstimate}
              </div>
              <div style="color: #64748b; font-size: 12px; margin-top: 8px;">CI Estimado</div>
            </div>
          </div>
          
          <h2 style="color: #fff; font-size: 18px; margin: 0 0 20px 0; border-bottom: 1px solid #334155; padding-bottom: 10px;">
            Rendimiento por Área
          </h2>
          ${areaBars}
          
          <div style="margin-top: 30px; padding: 20px; background: #0f172a; border-radius: 12px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #fff; margin: 0 0 10px 0; font-size: 16px;">${safeSummary.overall}</h3>
            <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.6;">${safeSummary.message}</p>
          </div>
          
          ${safeSummary.strengths.length > 0 ? `
            <div style="margin-top: 20px;">
              <h4 style="color: #10b981; margin: 0 0 10px 0; font-size: 14px;">Fortalezas</h4>
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">${safeSummary.strengths.join(', ')}</p>
            </div>
          ` : ''}
          
          ${safeSummary.improvements.length > 0 ? `
            <div style="margin-top: 20px;">
              <h4 style="color: #f59e0b; margin: 0 0 10px 0; font-size: 14px;">Áreas de Mejora</h4>
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">${safeSummary.improvements.join(', ')}</p>
            </div>
          ` : ''}
          
          ${personalitySummary ? `
            <div style="margin-top: 30px; padding: 20px; background: #0f172a; border-radius: 12px;">
              <h4 style="color: #fff; margin: 0 0 10px 0; font-size: 14px;">Perfil de Personalidad</h4>
              <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.8;">
                • Orientación analítica: <span style="color: #fff;">${personalitySummary.analytical || 'N/D'}</span><br>
                • Persistencia: <span style="color: #fff;">${personalitySummary.persistence || 'N/D'}</span><br>
                • Tolerancia a presión: <span style="color: #fff;">${personalitySummary.pressureTolerance || 'N/D'}</span><br>
                • Impulsividad: <span style="color: #fff;">${personalitySummary.impulsivity || 'N/D'}</span>
              </p>
            </div>
          ` : ''}
          
          <div style="margin-top: 40px;">
            <h2 style="color: #fff; font-size: 20px; margin: 0 0 20px 0; border-bottom: 1px solid #334155; padding-bottom: 10px;">
              Análisis Detallado de Preguntas
            </h2>
            ${questionsHTML}
          </div>
          
          <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 12px;">
            <p style="margin: 0 0 5px 0;">Tiempo utilizado: <strong style="color: #94a3b8;">${minutes}m ${seconds}s</strong></p>
            <p style="margin: 0;">Test completado el ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
        
        <div style="background: #0f172a; padding: 20px; text-align: center;">
          <p style="margin: 0; color: #64748b; font-size: 12px;">
            Este test es una herramienta informativa y no constituye un diagnóstico profesional.<br>
            © ${new Date().getFullYear()} Test de Inteligencia
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: 'Falta configurar RESEND_API_KEY en el servidor' })
    }

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

    res.json({
      success: true,
      message: 'Email enviado correctamente',
      email,
      id: data?.id || null
    })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
