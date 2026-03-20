import { useState, useCallback } from 'react'

const STORAGE_KEY = 'skyscope_history'
const MAX_ITEMS   = 6

/**
 * Custom hook – manages search history in localStorage
 * Returns [history, addToHistory, removeFromHistory]
 */
export function useSearchHistory() {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })

  const persist = (list) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    setHistory(list)
  }

  const addToHistory = useCallback((city) => {
    setHistory((prev) => {
      const next = [
        city,
        ...prev.filter((c) => c.toLowerCase() !== city.toLowerCase()),
      ].slice(0, MAX_ITEMS)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const removeFromHistory = useCallback((city) => {
    setHistory((prev) => {
      const next = prev.filter((c) => c !== city)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const clearHistory = useCallback(() => persist([]), [])

  return { history, addToHistory, removeFromHistory, clearHistory }
}
