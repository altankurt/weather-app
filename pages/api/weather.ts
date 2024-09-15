import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query
  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!city) {
    return res.status(400).json({ error: 'City is required' })
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is not configured' })
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
    console.error('Error fetching weather data:', error)
    res.status(500).json({ error: 'Error fetching weather data' })
  }
}
