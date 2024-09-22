import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import ApiKeyForm from '../components/ApiKeyForm'
import CitySelector, { findNearestCity } from '../components/CitySelector'
import WeatherDisplay from '../components/WeatherDisplay'
import axios from 'axios'
import { getStoredApiKey, storeApiKey } from '../utils/storage'

export default function Home() {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  useEffect(() => {
    const storedApiKey = getStoredApiKey()
    if (storedApiKey) {
      setApiKey(storedApiKey)
      getUserLocation()
    }
  }, [])

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const nearestCity = findNearestCity(
            position.coords.latitude,
            position.coords.longitude
          )
          setSelectedCity(nearestCity)
        },
        (error) => {
          console.error('Error getting user location:', error)
          setSelectedCity('İstanbul') // Varsayılan şehir olarak tanımladım hata mesajı dönmek yerine daha mantıklı geldi
        }
      )
    } else {
      setSelectedCity('İstanbul')
    }
  }

  const handleApiKeySubmit = async (key: string): Promise<boolean> => {
    try {
      await axios.get(`/api/weather?city=London&apiKey=${key}`)
      storeApiKey(key)
      setApiKey(key)
      getUserLocation()
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
        <title>
          {selectedCity
            ? `${selectedCity} Hava Durumu | Hava Durumu Uygulaması`
            : 'Hava Durumu Uygulaması'}
        </title>
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
