import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city, apiKey } = req.query

  if (!city || !apiKey) {
    return res.status(400).json({ error: 'City and API key are required' })
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
        lang: 'tr',
      },
    })
    res.status(200).json(response.data)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      res.status(401).json({ error: 'Invalid API key' })
    } else {
      console.error('Error fetching weather data:', error)
      res.status(500).json({ error: 'Error fetching weather data' })
    }
  }
}
