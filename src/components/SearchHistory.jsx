import styles from './SearchHistory.module.css'

/**
 * Renders recent search history as clickable chips
 * Props: history[], onSelect(city), onRemove(city)
 */
export default function SearchHistory({ history, onSelect, onRemove }) {
  if (!history.length) return null

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>🕐 Gần đây:</span>
      {history.map((city) => (
        <span
          key={city}
          className={styles.chip}
          onClick={() => onSelect(city)}
        >
          {city}
          <button
            className={styles.removeBtn}
            onClick={(e) => {
              e.stopPropagation()
              onRemove(city)
            }}
            aria-label={`Xóa ${city}`}
          >
            ✕
          </button>
        </span>
      ))}
    </div>
  )
}
