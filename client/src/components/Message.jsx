import styles from './Message.module.css';

const BOOKING_URL = 'https://www.mtmgym.de/en/free-initial-consultation/';

function formatContent(text) {
  return text
    .split('\n')
    .map((line, i) => <span key={i} className={styles.line}>{line || <br />}</span>);
}

export default function Message({ message, onDismissBooking }) {
  const isUser = message.role === 'user';

  return (
    <div className={`${styles.wrapper} ${isUser ? styles.user : styles.bot}`}>
      {!isUser && (
        <div className={styles.avatar} aria-hidden="true">
          M
        </div>
      )}
      <div className={styles.messageCol}>
        <div className={styles.bubble}>
          <p className={styles.content}>{formatContent(message.content)}</p>
        </div>
        {message.showBookingForm && (
          <div className={styles.bookingCard}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookingBtn}
            >
              Book Your Free Consultation →
            </a>
            <button
              className={styles.dismissLink}
              onClick={() => onDismissBooking(message.id)}
            >
              Maybe later
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
