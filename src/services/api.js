import axios from 'axios'

const API_URL = '/api'

export async function sendResultsByEmail(email, results) {
  try {
    const response = await axios.post(`${API_URL}/send-results`, {
      email,
      results
    })
    return { success: true, data: response.data }
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.error || 'Error al enviar email' 
    }
  }
}
