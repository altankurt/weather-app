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
        <div className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-6 shadow-2xl sm:p-10">
          <div className="mb-6 sm:mb-10">
            <CloudIcon
              className="mx-auto h-16 w-auto text-white sm:h-20"
              aria-hidden="true"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white sm:mt-8 sm:text-4xl">
              Open Weather Map API'ye Erişin
            </h2>
            <p className="mt-3 text-center text-base text-blue-100 sm:mt-4 sm:text-lg">
              Hava durumu verilerine erişmek için API anahtarınızı girin
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 sm:mt-10 sm:space-y-8"
          >
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
                  className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:px-4 sm:py-3 sm:text-lg"
                  placeholder="API anahtarınızı girin"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-3 sm:p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 sm:text-base">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="group relative flex w-full justify-center rounded-lg border border-transparent bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-6 sm:py-3 sm:text-base"
                disabled={isLoading}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <CloudIcon
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400 sm:h-6 sm:w-6"
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
