import { useCallback } from 'react'
import Background       from './components/Background'
import Header           from './components/Header'
import SearchBar        from './components/SearchBar'
import SearchHistory    from './components/SearchHistory'
import ErrorMessage     from './components/ErrorMessage'
import LoadingSpinner   from './components/LoadingSpinner'
import WelcomeState     from './components/WelcomeState'
import CurrentWeather   from './components/CurrentWeather'
import ForecastSection  from './components/ForecastSection'
import { useWeather }        from './hooks/useWeather'
import { useSearchHistory }  from './hooks/useSearchHistory'
import styles from './App.module.css'

export default function App() {
  const { weather, forecast, status, error, fetchWeather } = useWeather()
  const { history, addToHistory, removeFromHistory }       = useSearchHistory()

  const handleSearch = useCallback(async (city) => {
    const resolvedName = await fetchWeather(city)
    if (resolvedName) addToHistory(resolvedName)
  }, [fetchWeather, addToHistory])

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isIdle    = status === 'idle'

  return (
    <>
      <Background />

      <main className={styles.wrapper}>
        <Header />

        <SearchBar onSearch={handleSearch} loading={isLoading} />

        <SearchHistory
          history={history}
          onSelect={handleSearch}
          onRemove={removeFromHistory}
        />

        <ErrorMessage message={error} />

        {isLoading && <LoadingSpinner />}

        {isSuccess && weather && (
          <>
            <CurrentWeather data={weather} />
            {forecast && (
              <ForecastSection data={forecast} timezone={weather.timezone} />
            )}
          </>
        )}

        {isIdle && <WelcomeState onSearch={handleSearch} />}
      </main>
    </>
  )
}
