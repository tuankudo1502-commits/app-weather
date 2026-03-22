import { groupForecastByDay } from '../utils/weatherHelpers'
import ForecastCard from './ForecastCard'
import styles from './ForecastSection.module.css'

/**
 * 5-day forecast section
 * Props: data (OWM forecast object), timezone (seconds offset)
 */
export default function ForecastSection({ data, timezone }) {
  const days = groupForecastByDay(data.list, timezone)

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Dự báo 5 ngày tới</h2>
      <div className={styles.grid}>
        {days.map((day, i) => (
          <ForecastCard
            key={day.dt}
            dayLabel={day.dayLabel}
            maxTemp={day.maxTemp}
            minTemp={day.minTemp}
            midItem={day.midItem}
            animDelay={i * 0.07}
          />
        ))}
      </div>
    </section>
  )
}
