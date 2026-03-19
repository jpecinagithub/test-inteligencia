import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function generateResultsEmailHTML(results, userName) {
  const { totalScore, iqEstimate, areaScores, personalitySummary, summary, timeUsed } = results
  
  const minutes = Math.floor(timeUsed / 60)
  const seconds = timeUsed % 60
  
  const formatAreaName = (area) => {
    const names = {
      matematica: 'Matemática',
      linguistica: 'Lingüística',
      espacial: 'Espacial',
      logica: 'Lógica'
    }
    return names[area] || area
  }

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#10b981'
    if (percentage >= 60) return '#3b82f6'
    if (percentage >= 40) return '#f59e0b'
    return '#ef4444'
  }
  
  const areaBars = Object.entries(areaScores)
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
            Has completado el test de inteligencia. A continuación encontrarás tu puntuación total y el desglose por áreas cognitivas.
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
            <h3 style="color: #fff; margin: 0 0 10px 0; font-size: 16px;">${summary.overall}</h3>
            <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.6;">${summary.message}</p>
          </div>
          
          ${summary.strengths.length > 0 ? `
            <div style="margin-top: 20px;">
              <h4 style="color: #10b981; margin: 0 0 10px 0; font-size: 14px;">Fortalezas</h4>
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">${summary.strengths.join(', ')}</p>
            </div>
          ` : ''}
          
          ${summary.improvements.length > 0 ? `
            <div style="margin-top: 20px;">
              <h4 style="color: #f59e0b; margin: 0 0 10px 0; font-size: 14px;">Áreas de Mejora</h4>
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">${summary.improvements.join(', ')}</p>
            </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding: 20px; background: #0f172a; border-radius: 12px;">
            <h4 style="color: #fff; margin: 0 0 10px 0; font-size: 14px;">Perfil de Personalidad</h4>
            <p style="color: #94a3b8; margin: 0; font-size: 14px; line-height: 1.8;">
              • Orientación analítica: <span style="color: #fff;">${personalitySummary.analytical}</span><br>
              • Persistencia: <span style="color: #fff;">${personalitySummary.persistence}</span><br>
              • Tolerancia a presión: <span style="color: #fff;">${personalitySummary.pressureTolerance}</span><br>
              • Impulsividad: <span style="color: #fff;">${personalitySummary.impulsivity}</span>
            </p>
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