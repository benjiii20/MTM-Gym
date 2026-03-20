import styles from './Message.module.css';
import BookingForm from './BookingForm';

function formatContent(text) {
  return text
    .split('\n')
    .map((line, i) => <span key={i} className={styles.line}>{line || <br />}</span>);
}

export default function Message({ message, onSubmitBooking, onDismissBooking }) {
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
          <BookingForm
            onSubmit={onSubmitBooking}
            onDismiss={() => onDismissBooking(message.id)}
          />
        )}
      </div>
    </div>
  );
}
