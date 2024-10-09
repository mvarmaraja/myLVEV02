import axios from 'axios'

// Replace with your actual API endpoint
const API_URL = 'https://api.example.com/alerts'

export const getAlerts = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching alerts:', error)
    return []
  }
}

export const getAlertDetails = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching alert details:', error)
    return null
  }
}