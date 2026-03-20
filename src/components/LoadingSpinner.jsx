import styles from './LoadingSpinner.module.css'

export default function LoadingSpinner() {
  return (
    <div className={styles.wrap} aria-live="polite" aria-label="Đang tải dữ liệu thời tiết">
      <div className={styles.spinner} />
      <p className={styles.text}>Đang tải dữ liệu thời tiết...</p>
    </div>
  )
}
