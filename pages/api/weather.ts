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
    const [currentWeather, forecast] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, {
        params: { q: city, appid: apiKey, units: 'metric', lang: 'tr' },
      }),
      axios.get(`${BASE_URL}/forecast`, {
        params: { q: city, appid: apiKey, units: 'metric', lang: 'tr' },
      }),
    ])

    res.status(200).json({
      current: currentWeather.data,
      forecast: forecast.data,
    })
  } catch (error) {
    console.error('Error fetching weather data:', error)
    if (axios.isAxiosError(error) && error.response) {
      res
        .status(error.response.status)
        .json({ error: error.response.data.message })
    } else {
      res.status(500).json({ error: 'Error fetching weather data' })
    }
  }
}
