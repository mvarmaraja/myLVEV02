import axios from 'axios'

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

export const generateNextBestActions = async (objectType: string, objectId: string, prompt: string) => {
  try {
    const response = await axios.post(GEMINI_API_ENDPOINT, {
      contents: [{
        parts: [{
          text: `Generate next best actions for ${objectType} ${objectId}: ${prompt}`
        }]
      }]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`
      }
    })

    // Parse the response and extract the generated actions
    const generatedText = response.data.candidates[0].content.parts[0].text
    const actions = generatedText.split('\n').filter((action: string) => action.trim() !== '')

    return actions
  } catch (error) {
    console.error('Error generating next best actions:', error)
    return []
  }
}