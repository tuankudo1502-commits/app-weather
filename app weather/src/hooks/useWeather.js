import { useState, useCallback } from 'react'
import { getCurrentWeather, getForecast } from '../services/weatherApi'

/**
 * Custom hook – handles weather data fetching state machine
 * Returns { weather, forecast, status, error, fetchWeather }
 *
 * status: 'idle' | 'loading' | 'success' | 'error'
 */
export function useWeather() {
  const [weather,  setWeather]  = useState(null)
  const [forecast, setForecast] = useState(null)
  const [status,   setStatus]   = useState('idle')   // 'idle' | 'loading' | 'success' | 'error'
  const [error,    setError]    = useState(null)

  const fetchWeather = useCallback(async (city) => {
    if (!city.trim()) return

    setStatus('loading')
    setError(null)

    try {
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ])
      setWeather(currentData)
      setForecast(forecastData)
      setStatus('success')
      return currentData.name   // resolved city name from API
    } catch (err) {
      setError(err.message)
      setStatus('error')
      return null
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setError(null)
    setWeather(null)
    setForecast(null)
  }, [])

  return { weather, forecast, status, error, fetchWeather, reset }
}
