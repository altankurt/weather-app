import React, { useState } from 'react'

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
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">OpenWeatherMap API Anahtarı</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="apiKey"
            className="block text-sm font-medium text-gray-700"
          >
            API Anahtarı
          </label>
          <input
            type="text"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="API anahtarınızı girin"
            required
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={isLoading}
        >
          {isLoading ? 'Doğrulanıyor...' : 'Gönder'}
        </button>
      </form>
    </div>
  )
}

export default ApiKeyForm
