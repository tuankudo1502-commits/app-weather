import { getWeatherEmoji } from '../utils/weatherHelpers'
import styles from './ForecastCard.module.css'

/**
 * Single day forecast card
 * Props: dayLabel, dt, maxTemp, minTemp, midItem, animDelay
 */
export default function ForecastCard({ dayLabel, maxTemp, minTemp, midItem, animDelay = 0 }) {
  const { id, icon, description } = midItem.weather[0]
  const emoji = getWeatherEmoji(id, icon)

  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${animDelay}s` }}
    >
      <div className={styles.day}>{dayLabel}</div>
      <div className={styles.icon} role="img" aria-label={description}>{emoji}</div>
      <div className={styles.tempMax}>{maxTemp}°</div>
      <div className={styles.tempMin}>{minTemp}°</div>
      <div className={styles.desc}>{description}</div>
    </div>
  )
}
