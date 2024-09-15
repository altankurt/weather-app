import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import ApiKeyForm from '../components/ApiKeyForm'
import CitySelector from '../components/CitySelector'
import WeatherDisplay from '../components/WeatherDisplay'
import axios from 'axios'

export default function Home() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  useEffect(() => {
    const storedApiKey = sessionStorage.getItem('openweathermap_api_key')
    if (storedApiKey) {
      setApiKey(storedApiKey)
    }
  }, [])

  const handleApiKeySubmit = async (key: string): Promise<boolean> => {
    try {
      // API anahtarının geçerliliğini kontrol etmek için örnek bir istek yapıyoruz
      await axios.get(`/api/weather?city=London&apiKey=${key}`)
      sessionStorage.setItem('openweathermap_api_key', key)
      setApiKey(key)
      return true
    } catch (error) {
      console.error('Error validating API key:', error)
      return false
    }
  }

  const handleCitySelect = (city: string) => {
    setSelectedCity(city)
  }

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-6 sm:py-12">
      <Head>
        <title>Hava Durumu Uygulaması</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="to-light-blue-500 absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-cyan-400 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
        <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="mb-8 text-center text-4xl font-bold">Hava Durumu</h1>

          {!apiKey ? (
            <ApiKeyForm onApiKeySubmit={handleApiKeySubmit} />
          ) : (
            <>
              <h2 className="mb-4 text-2xl font-semibold">Şehir Seçin</h2>
              <CitySelector onCitySelect={handleCitySelect} />
              {selectedCity && (
                <WeatherDisplay city={selectedCity} apiKey={apiKey} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
