/**
 * Pure utility / helper functions for weather data
 */

const DAYS_VI = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

/**
 * Map OpenWeatherMap condition id + icon code → emoji
 */
export function getWeatherEmoji(id, icon = '') {
  const isNight = icon.endsWith('n')

  if (id >= 200 && id < 300) return '⛈️'
  if (id >= 300 && id < 400) return '🌦️'
  if (id === 511)              return '🌨️'
  if (id >= 500 && id < 600)  return '🌧️'
  if (id >= 600 && id < 700)  return '❄️'
  if (id >= 700 && id < 800)  return '🌫️'
  if (id === 800)              return isNight ? '🌙' : '☀️'
  if (id === 801)              return isNight ? '🌙' : '🌤️'
  if (id === 802)              return '⛅'
  if (id >= 803)               return '☁️'
  return '🌡️'
}

/**
 * Format unix timestamp + UTC offset → "HH:MM" local time
 */
export function formatLocalTime(unixSeconds, timezoneOffset) {
  const d = new Date((unixSeconds + timezoneOffset) * 1000)
  return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`
}

/**
 * Get Vietnamese day-of-week abbreviation from unix timestamp + tz offset
 */
export function getDayName(unixSeconds, timezoneOffset) {
  const d = new Date((unixSeconds + timezoneOffset) * 1000)
  return DAYS_VI[d.getUTCDay()]
}

/**
 * Group OWM 3-hour forecast list into daily buckets (max 5 days)
 * Returns array of { dt, dayLabel, maxTemp, minTemp, midItem }
 */
export function groupForecastByDay(forecastList, timezoneOffset) {
  const buckets = {}

  forecastList.forEach((item) => {
    const d = new Date((item.dt + timezoneOffset) * 1000)
    const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}-${d.getUTCDate()}`
    if (!buckets[key]) buckets[key] = { dt: item.dt, items: [] }
    buckets[key].items.push(item)
  })

  return Object.values(buckets)
    .slice(0, 5)
    .map((bucket, index) => {
      const temps   = bucket.items.map((x) => x.main.temp)
      const midItem = bucket.items[Math.floor(bucket.items.length / 2)]
      return {
        dt:       bucket.dt,
        dayLabel: index === 0 ? 'Hôm nay' : getDayName(bucket.dt, timezoneOffset),
        maxTemp:  Math.round(Math.max(...temps)),
        minTemp:  Math.round(Math.min(...temps)),
        midItem,
      }
    })
}

/**
 * Convert m/s → km/h
 */
export function msToKmh(ms) {
  return Math.round(ms * 3.6)
}

/**
 * Format metres visibility → "X.X km"
 */
export function formatVisibility(metres) {
  return `${(metres / 1000).toFixed(1)} km`
}
