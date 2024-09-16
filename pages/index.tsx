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
    <div className="min-h-screen bg-gray-100 py-6 sm:py-12">
      <Head>
        <title>Hava Durumu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-4">
        {!apiKey ? (
          <ApiKeyForm onApiKeySubmit={handleApiKeySubmit} />
        ) : (
          <div className="space-y-8">
            <CitySelector onCitySelect={handleCitySelect} />
            {selectedCity && (
              <WeatherDisplay city={selectedCity} apiKey={apiKey} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
