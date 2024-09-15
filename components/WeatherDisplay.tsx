import React, { useEffect, useState } from 'react'
import axios from 'axios'

export interface WeatherDisplayProps {
  city: string
  apiKey: string
}

interface WeatherData {
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: Array<{
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city, apiKey }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get<WeatherData>(
          `/api/weather?city=${city}&apiKey=${apiKey}`
        )
        setWeatherData(response.data)
      } catch (err) {
        setError(
          'Hava durumu bilgileri alınamadı. Lütfen daha sonra tekrar deneyin.'
        )
        console.error('Error fetching weather data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [city, apiKey])

  if (loading) return <div className="text-center">Yükleniyor...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>
  if (!weatherData) return null

  return (
    <div className="mx-auto mt-6 max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">{city} Hava Durumu</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold">
            {Math.round(weatherData.main.temp)}°C
          </p>
          <p className="text-gray-600">
            Hissedilen: {Math.round(weatherData.main.feels_like)}°C
          </p>
        </div>
        <div className="text-right">
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
            className="h-16 w-16"
          />
          <p className="capitalize">{weatherData.weather[0].description}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Nem</p>
          <p>{weatherData.main.humidity}%</p>
        </div>
        <div>
          <p className="font-semibold">Rüzgar Hızı</p>
          <p>{weatherData.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherDisplay
