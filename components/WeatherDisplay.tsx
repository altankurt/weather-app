import React, { useEffect, useState } from 'react'
import axios from 'axios'

export interface WeatherDisplayProps {
  city: string
  apiKey: string
}

interface WeatherData {
  current: {
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
    dt: number
    sys: {
      sunrise: number
      sunset: number
    }
  }
  forecast: {
    list: Array<{
      dt: number
      main: {
        temp: number
      }
      weather: Array<{
        description: string
        icon: string
      }>
    }>
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

  const currentDate = new Date(weatherData.current.dt * 1000)
  const dailyForecast = weatherData.forecast.list
    .filter((item, index) => index % 8 === 0)
    .slice(0, 5)
  const hourlyForecast = weatherData.forecast.list.slice(0, 8)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
        <div className="flex h-full flex-col justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 p-4 text-center text-white shadow-lg sm:p-6">
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">
            {city}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl">
            {currentDate.toLocaleTimeString()}
          </p>
          <p className="text-base sm:text-lg md:text-xl">
            {currentDate.toLocaleDateString()}
          </p>
        </div>

        <div className="flex h-full flex-col justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 p-4 text-white shadow-lg sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold sm:text-4xl md:text-5xl">
                {Math.round(weatherData.current.main.temp)}°C
              </p>
              <p className="text-base sm:text-lg md:text-xl">
                Hissedilen: {Math.round(weatherData.current.main.feels_like)}°C
              </p>
            </div>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
              alt={weatherData.current.weather[0].description}
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
            />
          </div>
          <div className="mt-4 flex flex-col justify-between text-sm sm:flex-row sm:text-base">
            <div>
              <p>
                Gün Doğumu:{' '}
                {new Date(
                  weatherData.current.sys.sunrise * 1000
                ).toLocaleTimeString()}
              </p>
              <p>
                Gün Batımı:{' '}
                {new Date(
                  weatherData.current.sys.sunset * 1000
                ).toLocaleTimeString()}
              </p>
            </div>
            <div className="mt-2 sm:mt-0">
              <p>Nem: {weatherData.current.main.humidity}%</p>
              <p>Rüzgar: {weatherData.current.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-8 md:grid-cols-2">
        <div className="flex h-full flex-col justify-center rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 p-4 text-white shadow-lg sm:p-6">
          <h3 className="mb-2 text-xl font-bold sm:mb-4 sm:text-2xl">
            5 Günlük Tahmin
          </h3>
          <div className="flex flex-nowrap overflow-x-auto pb-2 sm:pb-4">
            {dailyForecast.map((day) => (
              <div key={day.dt} className="mr-4 flex-shrink-0 text-center">
                <p className="text-sm sm:text-base">
                  {new Date(day.dt * 1000).toLocaleDateString()}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="weather icon"
                  className="mx-auto h-10 w-10 sm:h-12 sm:w-12"
                />
                <p className="text-base font-semibold sm:text-lg">
                  {Math.round(day.main.temp)}°C
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex h-full flex-col justify-center rounded-lg bg-gradient-to-br from-green-400 to-green-600 p-4 text-white shadow-lg sm:p-6">
          <h3 className="mb-2 text-xl font-bold sm:mb-4 sm:text-2xl">
            Saatlik Tahmin
          </h3>
          <div className="flex flex-nowrap overflow-x-auto pb-2 sm:pb-4">
            {hourlyForecast.map((hour) => (
              <div key={hour.dt} className="mr-4 flex-shrink-0 text-center">
                <p className="text-sm sm:text-base">
                  {new Date(hour.dt * 1000).toLocaleTimeString()}
                </p>
                <img
                  src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                  alt="weather icon"
                  className="mx-auto h-10 w-10 sm:h-12 sm:w-12"
                />
                <p className="text-base font-semibold sm:text-lg">
                  {Math.round(hour.main.temp)}°C
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherDisplay
