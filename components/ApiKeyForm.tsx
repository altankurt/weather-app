import React, { useState } from 'react'
import { Button } from '@headlessui/react'
import { CloudIcon } from '@heroicons/react/24/outline'

interface ApiKeyFormProps {
  onApiKeySubmit: (apiKey: string) => Promise<boolean>
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (apiKey.trim().length !== 32) {
      setError('API anahtarı 32 karakter uzunluğunda olmalıdır.')
      setIsLoading(false)
      return
    }

    try {
      const isValid = await onApiKeySubmit(apiKey.trim())
      if (!isValid) {
        setError('Geçersiz API anahtarı. Lütfen tekrar deneyin.')
      }
    } catch (err) {
      setError(
        'API anahtarı doğrulanırken bir hata oluştu. Lütfen tekrar deneyin.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-10 shadow-2xl">
          <div className="mb-10">
            <CloudIcon
              className="mx-auto h-20 w-auto text-white"
              aria-hidden="true"
            />
            <h2 className="mt-8 text-center text-4xl font-extrabold text-white">
              Open Weather Map API'ye Erişin
            </h2>
            <p className="mt-4 text-center text-lg text-blue-100">
              Hava durumu verilerine erişmek için API anahtarınızı girin
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-10 space-y-8">
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="apiKey" className="sr-only">
                  API Anahtarı
                </label>
                <input
                  id="apiKey"
                  name="apiKey"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-lg"
                  placeholder="API anahtarınızı girin"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-base font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="group relative flex w-full justify-center rounded-lg border border-transparent bg-white px-6 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CloudIcon
                    className="h-6 w-6 text-blue-500 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                <span className="font-bold">
                  {isLoading ? 'Doğrulanıyor...' : 'API Anahtarını Doğrula'}
                </span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ApiKeyForm
