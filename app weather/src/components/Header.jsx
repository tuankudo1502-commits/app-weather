import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.logo}>
          HiHi <span className={styles.logoAccent}>Weather</span>
        </div>
        <div className={styles.logoSub}>Dự báo thời tiết</div>
      </div>
    </header>
  )
}
