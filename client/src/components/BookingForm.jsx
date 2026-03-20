import { useState } from 'react';
import styles from './BookingForm.module.css';

const QUESTIONS = [
  {
    id: 'goal',
    text: 'What goal do you want to achieve with MTM?',
    options: ['Optimize Longevity', 'Improve Body Composition', 'Build Muscle', 'Improve health and well-being'],
    grid: true,
  },
  {
    id: 'exerciseHours',
    text: 'How many hours a week do you currently exercise?',
    options: ['0 hours', '1 hour', '2 hours', '3 hours', '4 hours +'],
    grid: false,
  },
  {
    id: 'experience',
    text: 'How experienced are you with strength training?',
    options: [
      'I have never trained.',
      'I already trained in a gym without supervision.',
      'I regularly did strength training for several years.',
      "I've already regularly worked with an expert.",
    ],
    grid: true,
  },
  {
    id: 'satisfaction',
    text: 'How satisfied are you with the results of your training so far?',
    options: [
      "I haven't started.",
      'I am dissatisfied.',
      "I had initial results but I'm stagnating.",
      'I am making progress, but there is potential for more.',
      'I am happy with my results.',
    ],
    grid: false,
  },
  {
    id: 'budget',
    text: 'What is your monthly budget to invest in your health?',
    options: ['Less than 100 €', '100 - 250 €', '250 € - 1.000 €', 'More than 1.000 €'],
    grid: true,
  },
  {
    id: 'timePerWeek',
    text: 'How much time can you invest in your health each week?',
    options: ['Less than 1 hour', '1 - 3 hours', '3 - 5 hours', 'More than 5 hours'],
    grid: true,
  },
  {
    id: 'studio',
    text: 'Which of our studios is more accessible to you?',
    options: ['Berlin - Charlottenburg', 'Berlin - Mitte', 'None of them.'],
    grid: false,
  },
];

function buildNotes(answers) {
  return QUESTIONS
    .filter((q) => answers[q.id])
    .map((q) => `${q.text}\n→ ${answers[q.id]}`)
    .join('\n\n');
}

export default function BookingForm({ onSubmit, onDismiss }) {
  const [contact, setContact] = useState({ name: '', email: '', phone: '', date: '', time: '' });
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContactChange = (e) => {
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit({ ...contact, notes: buildNotes(answers), answers });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.success}>
        <span className={styles.successIcon}>✓</span>
        <p>Your consultation is booked! We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Book Your Free Consultation</h3>

      {/* Contact info */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            name="name"
            value={contact.name}
            onChange={handleContactChange}
            placeholder="Your name"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Phone</label>
          <input
            className={styles.input}
            name="phone"
            value={contact.phone}
            onChange={handleContactChange}
            placeholder="+49 ..."
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email <span className={styles.required}>*</span></label>
        <input
          className={styles.input}
          name="email"
          type="email"
          value={contact.email}
          onChange={handleContactChange}
          placeholder="your@email.com"
          required
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Preferred Date <span className={styles.required}>*</span></label>
          <input
            className={styles.input}
            name="date"
            type="date"
            value={contact.date}
            onChange={handleContactChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Preferred Time <span className={styles.required}>*</span></label>
          <input
            className={styles.input}
            name="time"
            type="time"
            value={contact.time}
            onChange={handleContactChange}
            required
          />
        </div>
      </div>

      {/* Questionnaire */}
      <div className={styles.divider} />

      {QUESTIONS.map((q) => (
        <div key={q.id} className={styles.questionBlock}>
          <p className={styles.questionText}>{q.text}</p>
          <div className={`${styles.options} ${q.grid ? styles.optionsGrid : ''}`}>
            {q.options.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`${styles.optionBtn} ${answers[q.id] === opt ? styles.optionSelected : ''}`}
                onClick={() => handleSelect(q.id, opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button type="button" className={styles.dismissBtn} onClick={onDismiss}>
          Maybe later
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Booking...' : 'Book Consultation'}
        </button>
      </div>
    </form>
  );
}
