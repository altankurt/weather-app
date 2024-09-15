import React, { useState, useEffect } from 'react'

interface CitySelectorProps {
  onCitySelect: (city: string) => void
}

interface City {
  name: string
  lat: number
  lon: number
}

const turkishCities: City[] = [
  { name: 'Adana', lat: 37.0, lon: 35.3213 },
  { name: 'Ankara', lat: 39.9334, lon: 32.8597 },
  { name: 'İstanbul', lat: 41.0082, lon: 28.9784 },
  // Diğer şehirleri de ekleyin...
]

const CitySelector: React.FC<CitySelectorProps> = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [userLocation, setUserLocation] = useState<{
    lat: number
    lon: number
  } | null>(null)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        function (error) {
          console.error('Error getting location:', error)
        }
      )
    }
  }, [])

  useEffect(() => {
    if (userLocation) {
      const nearestCity = findNearestCity(userLocation.lat, userLocation.lon)
      onCitySelect(nearestCity)
    }
  }, [userLocation, onCitySelect])

  const findNearestCity = (lat: number, lon: number): string => {
    let nearestCity = turkishCities[0]
    let minDistance = calculateDistance(
      lat,
      lon,
      nearestCity.lat,
      nearestCity.lon
    )

    for (let i = 1; i < turkishCities.length; i++) {
      const distance = calculateDistance(
        lat,
        lon,
        turkishCities[i].lat,
        turkishCities[i].lon
      )
      if (distance < minDistance) {
        minDistance = distance
        nearestCity = turkishCities[i]
      }
    }

    return nearestCity.name
  }

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371 // Dünya'nın yarıçapı (km)
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return d
  }

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180)
  }

  const filteredCities = turkishCities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="mx-auto mt-6 max-w-md">
      <input
        type="text"
        placeholder="Şehir ara..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full rounded-md border border-gray-300 p-2"
      />
      <div className="grid max-h-60 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
        {filteredCities.map((city) => (
          <button
            key={city.name}
            onClick={() => onCitySelect(city.name)}
            className="rounded-md bg-blue-100 p-2 text-sm transition-colors hover:bg-blue-200"
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CitySelector
