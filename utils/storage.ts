const API_KEY_STORAGE_KEY = 'weather_app_api_key'

export const storeApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey)
}

export const getStoredApiKey = (): string | null => {
  return localStorage.getItem(API_KEY_STORAGE_KEY)
}

export const removeStoredApiKey = (): void => {
  localStorage.removeItem(API_KEY_STORAGE_KEY)
}
