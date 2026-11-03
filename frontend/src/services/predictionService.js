
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export async function predictHeartDisease(patientData) {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(patientData)
  })

  if (!response.ok) {
    const errorData = await response.json()

    const errorMessage =
      errorData.detail?.[0]?.msg || 'Prediction request failed.'

    throw new Error(errorMessage)
  }

  return await response.json()
}
