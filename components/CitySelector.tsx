import React, { useState, useEffect } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Button } from '@headlessui/react'

interface CitySelectorProps {
  onCitySelect: (city: string, isManualSelection: boolean) => void
}

interface City {
  name: string
  lat: number
  lon: number
}

const turkishCities: City[] = [
  { name: 'Adana', lat: 37.0, lon: 35.3213 },
  { name: 'Adıyaman', lat: 37.7648, lon: 38.2786 },
  { name: 'Afyonkarahisar', lat: 38.7507, lon: 30.5567 },
  { name: 'Ağrı', lat: 39.7191, lon: 43.0503 },
  { name: 'Amasya', lat: 40.6499, lon: 35.8353 },
  { name: 'Ankara', lat: 39.9208, lon: 32.8541 },
  { name: 'Antalya', lat: 36.8841, lon: 30.7056 },
  { name: 'Artvin', lat: 41.1828, lon: 41.8183 },
  { name: 'Aydın', lat: 37.856, lon: 27.8416 },
  { name: 'Balıkesir', lat: 39.6484, lon: 27.8826 },
  { name: 'Bilecik', lat: 40.1451, lon: 29.9799 },
  { name: 'Bingöl', lat: 38.8854, lon: 40.498 },
  { name: 'Bitlis', lat: 38.4006, lon: 42.1095 },
  { name: 'Bolu', lat: 40.7392, lon: 31.6089 },
  { name: 'Burdur', lat: 37.7202, lon: 30.2905 },
  { name: 'Bursa', lat: 40.1824, lon: 29.067 },
  { name: 'Çanakkale', lat: 40.1553, lon: 26.4142 },
  { name: 'Çankırı', lat: 40.6013, lon: 33.6134 },
  { name: 'Çorum', lat: 40.5506, lon: 34.9556 },
  { name: 'Denizli', lat: 37.7765, lon: 29.0864 },
  { name: 'Diyarbakır', lat: 37.9144, lon: 40.2306 },
  { name: 'Edirne', lat: 41.6818, lon: 26.5623 },
  { name: 'Elazığ', lat: 38.681, lon: 39.2264 },
  { name: 'Erzincan', lat: 39.75, lon: 39.5 },
  { name: 'Erzurum', lat: 39.9, lon: 41.27 },
  { name: 'Eskişehir', lat: 39.7767, lon: 30.5206 },
  { name: 'Gaziantep', lat: 37.0662, lon: 37.3833 },
  { name: 'Giresun', lat: 40.9128, lon: 38.3895 },
  { name: 'Gümüşhane', lat: 40.4386, lon: 39.5086 },
  { name: 'Hakkari', lat: 37.5833, lon: 43.7333 },
  { name: 'Hatay', lat: 36.4018, lon: 36.3498 },
  { name: 'Isparta', lat: 37.7648, lon: 30.5566 },
  { name: 'Mersin', lat: 36.8, lon: 34.6333 },
  { name: 'İstanbul', lat: 41.0082, lon: 28.9784 },
  { name: 'İzmir', lat: 38.4189, lon: 27.1287 },
  { name: 'Kars', lat: 40.6167, lon: 43.1 },
  { name: 'Kastamonu', lat: 41.3887, lon: 33.7827 },
  { name: 'Kayseri', lat: 38.7312, lon: 35.4787 },
  { name: 'Kırklareli', lat: 41.7333, lon: 27.2167 },
  { name: 'Kırşehir', lat: 39.1425, lon: 34.1709 },
  { name: 'Kocaeli', lat: 40.8533, lon: 29.8815 },
  { name: 'Konya', lat: 37.8667, lon: 32.4833 },
  { name: 'Kütahya', lat: 39.4167, lon: 29.9833 },
  { name: 'Malatya', lat: 38.3552, lon: 38.3095 },
  { name: 'Manisa', lat: 38.6191, lon: 27.4289 },
  { name: 'Kahramanmaraş', lat: 37.5858, lon: 36.9371 },
  { name: 'Mardin', lat: 37.3212, lon: 40.7245 },
  { name: 'Muğla', lat: 37.2153, lon: 28.3636 },
  { name: 'Muş', lat: 38.9462, lon: 41.7539 },
  { name: 'Nevşehir', lat: 38.6244, lon: 34.7144 },
  { name: 'Niğde', lat: 37.9667, lon: 34.6833 },
  { name: 'Ordu', lat: 40.9839, lon: 37.8764 },
  { name: 'Rize', lat: 41.0201, lon: 40.5234 },
  { name: 'Sakarya', lat: 40.7569, lon: 30.3783 },
  { name: 'Samsun', lat: 41.2928, lon: 36.3313 },
  { name: 'Siirt', lat: 37.9333, lon: 41.95 },
  { name: 'Sinop', lat: 42.0231, lon: 35.1531 },
  { name: 'Sivas', lat: 39.7477, lon: 37.0179 },
  { name: 'Tekirdağ', lat: 40.9833, lon: 27.5167 },
  { name: 'Tokat', lat: 40.3167, lon: 36.55 },
  { name: 'Trabzon', lat: 41.0015, lon: 39.7178 },
  { name: 'Tunceli', lat: 39.1079, lon: 39.5401 },
  { name: 'Şanlıurfa', lat: 37.1591, lon: 38.7969 },
  { name: 'Uşak', lat: 38.6823, lon: 29.4082 },
  { name: 'Van', lat: 38.4891, lon: 43.4089 },
  { name: 'Yozgat', lat: 39.8181, lon: 34.8147 },
  { name: 'Zonguldak', lat: 41.4564, lon: 31.7987 },
  { name: 'Aksaray', lat: 38.3687, lon: 34.037 },
  { name: 'Bayburt', lat: 40.2552, lon: 40.2249 },
  { name: 'Karaman', lat: 37.1759, lon: 33.2287 },
  { name: 'Kırıkkale', lat: 39.8468, lon: 33.5153 },
  { name: 'Batman', lat: 37.8812, lon: 41.1351 },
  { name: 'Şırnak', lat: 37.5164, lon: 42.4611 },
  { name: 'Bartın', lat: 41.6344, lon: 32.3375 },
  { name: 'Ardahan', lat: 41.1105, lon: 42.7022 },
  { name: 'Iğdır', lat: 39.9167, lon: 44.0333 },
  { name: 'Yalova', lat: 40.65, lon: 29.2667 },
  { name: 'Karabük', lat: 41.2061, lon: 32.6204 },
  { name: 'Kilis', lat: 36.7184, lon: 37.1212 },
  { name: 'Osmaniye', lat: 37.0742, lon: 36.2467 },
  { name: 'Düzce', lat: 40.8438, lon: 31.1565 },
]

const CitySelector: React.FC<CitySelectorProps> = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [userLocation, setUserLocation] = useState<{
    lat: number
    lon: number
  } | null>(null)
  const [manuallySelectedCity, setManuallySelectedCity] = useState<
    string | null
  >(null)
  const [locationError, setLocationError] = useState<string | null>(null)

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

  const getUserLocation = () => {
    setLocationError(null)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
          const nearestCity = findNearestCity(
            position.coords.latitude,
            position.coords.longitude
          )
          setManuallySelectedCity(null)
          onCitySelect(nearestCity, false)
        },
        function (error) {
          console.error('Error getting location:', error)
          setLocationError('Konum alınamadı. Lütfen manuel seçim yapın.')
        }
      )
    } else {
      setLocationError('Tarayıcınız konum hizmetlerini desteklemiyor.')
    }
  }

  useEffect(() => {
    if (userLocation && !manuallySelectedCity) {
      const nearestCity = findNearestCity(userLocation.lat, userLocation.lon)
      onCitySelect(nearestCity, false)
    }
  }, [userLocation, manuallySelectedCity, onCitySelect])

  const handleCityClick = (city: string) => {
    setManuallySelectedCity(city)
    onCitySelect(city, true)
  }

  const filteredCities = turkishCities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="mx-auto mt-6">
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Şehir ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow rounded-l-md border border-gray-300 p-2"
        />
        <Button
          onClick={getUserLocation}
          className="flex items-center rounded-r-md bg-green-500 p-2 text-white hover:bg-green-600 focus:outline-none focus:ring-opacity-50"
        >
          <span className="mr-2">Current Location</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
      {locationError && (
        <p className="mb-2 text-sm text-red-500">{locationError}</p>
      )}
      <ScrollArea.Root className="h-48 overflow-hidden">
        <ScrollArea.Viewport className="h-full w-full">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
            {filteredCities.map((city) => (
              <Button
                key={city.name}
                onClick={() => handleCityClick(city.name)}
                className={`rounded-md p-2 text-sm transition-colors ${
                  city.name === manuallySelectedCity
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-400 hover:bg-gray-500'
                }`}
              >
                {city.name}
              </Button>
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex touch-none select-none bg-black/10 p-0.5 transition-colors duration-150 ease-out hover:bg-black/20"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-black/50 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  )
}

export default CitySelector
