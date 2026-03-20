import { getWeatherEmoji, formatLocalTime, msToKmh, formatVisibility } from '../utils/weatherHelpers'
import styles from './CurrentWeather.module.css'

const STAT_ITEMS = (d, tz) => [
  { label: '💧 Độ ẩm',        value: `${d.main.humidity}%` },
  { label: '💨 Tốc độ gió',   value: `${msToKmh(d.wind.speed)} km/h` },
  { label: '🌡 Cảm giác như', value: `${Math.round(d.main.feels_like)}°C` },
  { label: '👁 Tầm nhìn',     value: formatVisibility(d.visibility) },
  { label: '🌅 Bình minh',    value: formatLocalTime(d.sys.sunrise, tz) },
  { label: '🌇 Hoàng hôn',    value: formatLocalTime(d.sys.sunset,  tz) },
]

/**
 * Main weather card – current conditions
 * Props: data (OWM current weather object)
 */
export default function CurrentWeather({ data }) {
  const emoji    = getWeatherEmoji(data.weather[0].id, data.weather[0].icon)
  const tz       = data.timezone
  const dateStr  = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  return (
    <div className={styles.card}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.top}>
        <div className={styles.cityBlock}>
          <h1 className={styles.cityName}>{data.name}</h1>
          <p className={styles.cityMeta}>{data.sys.country} · {dateStr}</p>
          <p className={styles.desc}>{data.weather[0].description}</p>
        </div>

        <div className={styles.tempBlock}>
          <span className={styles.emoji} role="img" aria-label={data.weather[0].description}>
            {emoji}
          </span>
          <div className={styles.tempWrap}>
            <span className={styles.temp}>{Math.round(data.main.temp)}</span>
            <span className={styles.unit}>°C</span>
          </div>
        </div>
      </div>

      <div className={styles.statsRow}>
        {STAT_ITEMS(data, tz).map(({ label, value }) => (
          <div key={label} className={styles.statItem}>
            <span className={styles.statLabel}>{label}</span>
            <span className={styles.statValue}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
