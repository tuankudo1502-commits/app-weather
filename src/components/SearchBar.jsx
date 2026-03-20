import { useRef, useState, useEffect, useCallback } from 'react'
import styles from './SearchBar.module.css'

const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct'

/**
 * Search bar with autocomplete suggestions via OWM Geocoding API
 * Props: onSearch(city: string), loading: bool
 */
export default function SearchBar({ onSearch, loading }) {
  const inputRef      = useRef(null)
  const dropdownRef   = useRef(null)
  const debounceTimer = useRef(null)

  const [query,       setQuery]       = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isFetching,  setIsFetching]  = useState(false)
  const [isOpen,      setIsOpen]      = useState(false)

  // Fetch suggestions from Geocoding API
  const fetchSuggestions = useCallback(async (q) => {
    if (q.trim().length < 2) {
      setSuggestions([])
      setIsOpen(false)
      return
    }
    setIsFetching(true)
    try {
      const res  = await fetch(`${GEO_URL}?q=${encodeURIComponent(q)}&limit=6&appid=${API_KEY}`)
      const data = await res.json()

      const unique = []
      const seen   = new Set()
      for (const item of data) {
        const parts = [item.name, item.state, item.country].filter(Boolean)
        const label = parts.join(', ')
        if (!seen.has(label)) {
          seen.add(label)
          unique.push({ label, city: item.name, country: item.country, state: item.state })
        }
      }
      setSuggestions(unique)
      setIsOpen(unique.length > 0)
      setActiveIndex(-1)
    } catch {
      setSuggestions([])
      setIsOpen(false)
    } finally {
      setIsFetching(false)
    }
  }, [])

  // Debounce input → fetch after 300 ms idle
  const handleChange = (e) => {
    const val = e.target.value
    setQuery(val)
    clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => fetchSuggestions(val), 300)
  }

  // Confirm a suggestion
  const selectSuggestion = (item) => {
    setQuery(item.label)
    setSuggestions([])
    setIsOpen(false)
    setActiveIndex(-1)
    onSearch(`${item.city},${item.country}`)
  }

  // Submit raw query (fuzzy – OWM will do its best)
  const handleSubmit = () => {
    const val = query.trim()
    if (!val) return
    setSuggestions([])
    setIsOpen(false)
    onSearch(val)
  }

  // Keyboard navigation in dropdown
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter') handleSubmit()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      activeIndex >= 0 ? selectSuggestion(suggestions[activeIndex]) : handleSubmit()
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        inputRef.current    && !inputRef.current.contains(e.target)
      ) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className={styles.searchBar}>
      <div className={styles.inputWrap}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="Nhập tên thành phố..."
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          disabled={loading}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        />


        {isOpen && (
          <ul ref={dropdownRef} className={styles.dropdown} role="listbox">
            {suggestions.map((item, idx) => (
              <li
                key={item.label}
                className={`${styles.option} ${idx === activeIndex ? styles.optionActive : ''}`}
                role="option"
                aria-selected={idx === activeIndex}
                onMouseDown={() => selectSuggestion(item)}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <span className={styles.optionIcon}></span>
                <span className={styles.optionLabel}>
                  <span className={styles.optionCity}>{item.city}</span>
                  {(item.state || item.country) && (
                    <span className={styles.optionMeta}>
                      {[item.state, item.country].filter(Boolean).join(', ')}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className={styles.btn} onClick={handleSubmit} disabled={loading}>
        {loading ? 'Đang tải...' : 'Tìm kiếm'}
      </button>
    </div>
  )
}