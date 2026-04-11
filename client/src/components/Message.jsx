import ReactMarkdown from 'react-markdown';
import styles from './Message.module.css';
import SoftLeadForm from './SoftLeadForm';

const BOOKING_URL = 'https://www.mtmgym.de/en/free-initial-consultation/';

export default function Message({ message, onDismissBooking, onDismissSoftLead }) {
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
          {isUser
            ? <p className={styles.content}>{message.content}</p>
            : <div className={styles.content}><ReactMarkdown>{message.content}</ReactMarkdown></div>
          }
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
        {message.showSoftLeadForm && (
          <SoftLeadForm onDismiss={() => onDismissSoftLead(message.id)} />
        )}
      </div>
    </div>
  );
}
