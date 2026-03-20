import styles from './TypingIndicator.module.css';

export default function TypingIndicator() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatar} aria-hidden="true">M</div>
      <div className={styles.bubble} aria-label="Assistant is typing">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  );
}
