import styles from './Background.module.css'

/**
 * Decorative animated background – stars + gradient blobs
 */
export default function Background() {
  return (
    <>
      <div className={styles.bgCanvas} aria-hidden="true" />
      <div className={styles.stars}    aria-hidden="true" />
    </>
  )
}
