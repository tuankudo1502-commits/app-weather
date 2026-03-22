import styles from './WelcomeState.module.css'

const QUICK_CITIES = [
  { label: '🇻🇳 Hồ Chí Minh', city: 'Ho Chi Minh' },
  { label: '🇻🇳 Hà Nội',       city: 'Hanoi'       },
  { label: '🇻🇳 Đà Nẵng',      city: 'Da Nang'     },
  { label: '🇯🇵 Tokyo',        city: 'Tokyo'       },
  { label: '🇬🇧 London',       city: 'London'      },
  { label: '🇺🇸 New York',     city: 'New York'    },
]

/**
 * Shown when no search has been made yet
 * Props: onSearch(city)
 */
export default function WelcomeState({ onSearch }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>🌤️</div>
      <h2 className={styles.title}>Thời tiết ở đâu hôm nay?</h2>
      <p className={styles.subtitle}>
        Nhập tên thành phố bất kỳ để xem thông tin thời tiết theo thời gian thực.
      </p>

      <div className={styles.quickCities}>
        {QUICK_CITIES.map(({ label, city }) => (
          <button
            key={city}
            className={styles.quickBtn}
            onClick={() => onSearch(city)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
