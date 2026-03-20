import styles from './ErrorMessage.module.css'

/**
 * Inline error banner
 * Props: message (string | null)
 */
export default function ErrorMessage({ message }) {
  if (!message) return null

  return (
    <div className={styles.error} role="alert">
      ⚠️ {message}
    </div>
  )
}
