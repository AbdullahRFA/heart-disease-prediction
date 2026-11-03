const API_BASE_URL = 'http://127.0.0.1:8000'


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


  const result = await response.json()

  return result
}