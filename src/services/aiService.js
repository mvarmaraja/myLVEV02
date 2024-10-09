import axios from 'axios';

const GEMINI_API_ENDPOINT = 'https://api.gemini.ai/v1/generate'; // Replace with actual Gemini API endpoint

export const generateNextBestActions = async (objectType, objectId, prompt) => {
  try {
    const response = await axios.post(GEMINI_API_ENDPOINT, {
      prompt: `Generate next best actions for ${objectType} ${objectId}: ${prompt}`,
      apiKey: process.env.REACT_APP_GEMINI_API_KEY,
    });
    return response.data.actions;
  } catch (error) {
    console.error('Error generating next best actions:', error);
    return [];
  }
};