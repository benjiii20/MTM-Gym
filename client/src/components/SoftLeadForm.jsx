import { useState, useRef, useEffect } from 'react';
import styles from './SoftLeadForm.module.css';

const COUNTRY_CODES = [
  { name: 'Germany', code: '+49' },
  { name: 'Austria', code: '+43' },
  { name: 'Switzerland', code: '+41' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'United States', code: '+1' },
  { name: 'Afghanistan', code: '+93' },
  { name: 'Albania', code: '+355' },
  { name: 'Algeria', code: '+213' },
  { name: 'Angola', code: '+244' },
  { name: 'Argentina', code: '+54' },
  { name: 'Armenia', code: '+374' },
  { name: 'Australia', code: '+61' },
  { name: 'Azerbaijan', code: '+994' },
  { name: 'Bahrain', code: '+973' },
  { name: 'Bangladesh', code: '+880' },
  { name: 'Belarus', code: '+375' },
  { name: 'Belgium', code: '+32' },
  { name: 'Bolivia', code: '+591' },
  { name: 'Bosnia & Herzegovina', code: '+387' },
  { name: 'Brazil', code: '+55' },
  { name: 'Bulgaria', code: '+359' },
  { name: 'Cambodia', code: '+855' },
  { name: 'Cameroon', code: '+237' },
  { name: 'Canada', code: '+1' },
  { name: 'Chile', code: '+56' },
  { name: 'China', code: '+86' },
  { name: 'Colombia', code: '+57' },
  { name: 'Croatia', code: '+385' },
  { name: 'Cuba', code: '+53' },
  { name: 'Cyprus', code: '+357' },
  { name: 'Czech Republic', code: '+420' },
  { name: 'Denmark', code: '+45' },
  { name: 'Ecuador', code: '+593' },
  { name: 'Egypt', code: '+20' },
  { name: 'Estonia', code: '+372' },
  { name: 'Ethiopia', code: '+251' },
  { name: 'Finland', code: '+358' },
  { name: 'France', code: '+33' },
  { name: 'Georgia', code: '+995' },
  { name: 'Ghana', code: '+233' },
  { name: 'Greece', code: '+30' },
  { name: 'Guatemala', code: '+502' },
  { name: 'Hong Kong', code: '+852' },
  { name: 'Hungary', code: '+36' },
  { name: 'Iceland', code: '+354' },
  { name: 'India', code: '+91' },
  { name: 'Indonesia', code: '+62' },
  { name: 'Iran', code: '+98' },
  { name: 'Iraq', code: '+964' },
  { name: 'Ireland', code: '+353' },
  { name: 'Israel', code: '+972' },
  { name: 'Italy', code: '+39' },
  { name: 'Ivory Coast', code: '+225' },
  { name: 'Japan', code: '+81' },
  { name: 'Jordan', code: '+962' },
  { name: 'Kazakhstan', code: '+7' },
  { name: 'Kenya', code: '+254' },
  { name: 'Kosovo', code: '+383' },
  { name: 'Kuwait', code: '+965' },
  { name: 'Kyrgyzstan', code: '+996' },
  { name: 'Latvia', code: '+371' },
  { name: 'Lebanon', code: '+961' },
  { name: 'Libya', code: '+218' },
  { name: 'Lithuania', code: '+370' },
  { name: 'Luxembourg', code: '+352' },
  { name: 'Malaysia', code: '+60' },
  { name: 'Malta', code: '+356' },
  { name: 'Mexico', code: '+52' },
  { name: 'Moldova', code: '+373' },
  { name: 'Montenegro', code: '+382' },
  { name: 'Morocco', code: '+212' },
  { name: 'Mozambique', code: '+258' },
  { name: 'Myanmar', code: '+95' },
  { name: 'Nepal', code: '+977' },
  { name: 'Netherlands', code: '+31' },
  { name: 'New Zealand', code: '+64' },
  { name: 'Nigeria', code: '+234' },
  { name: 'North Macedonia', code: '+389' },
  { name: 'Norway', code: '+47' },
  { name: 'Oman', code: '+968' },
  { name: 'Pakistan', code: '+92' },
  { name: 'Palestine', code: '+970' },
  { name: 'Panama', code: '+507' },
  { name: 'Paraguay', code: '+595' },
  { name: 'Peru', code: '+51' },
  { name: 'Philippines', code: '+63' },
  { name: 'Poland', code: '+48' },
  { name: 'Portugal', code: '+351' },
  { name: 'Qatar', code: '+974' },
  { name: 'Romania', code: '+40' },
  { name: 'Russia', code: '+7' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Senegal', code: '+221' },
  { name: 'Serbia', code: '+381' },
  { name: 'Singapore', code: '+65' },
  { name: 'Slovakia', code: '+421' },
  { name: 'Slovenia', code: '+386' },
  { name: 'Somalia', code: '+252' },
  { name: 'South Africa', code: '+27' },
  { name: 'South Korea', code: '+82' },
  { name: 'Spain', code: '+34' },
  { name: 'Sri Lanka', code: '+94' },
  { name: 'Sudan', code: '+249' },
  { name: 'Sweden', code: '+46' },
  { name: 'Syria', code: '+963' },
  { name: 'Taiwan', code: '+886' },
  { name: 'Tajikistan', code: '+992' },
  { name: 'Tanzania', code: '+255' },
  { name: 'Thailand', code: '+66' },
  { name: 'Tunisia', code: '+216' },
  { name: 'Turkey', code: '+90' },
  { name: 'Turkmenistan', code: '+993' },
  { name: 'Uganda', code: '+256' },
  { name: 'Ukraine', code: '+380' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'Uruguay', code: '+598' },
  { name: 'Uzbekistan', code: '+998' },
  { name: 'Venezuela', code: '+58' },
  { name: 'Vietnam', code: '+84' },
  { name: 'Yemen', code: '+967' },
  { name: 'Zimbabwe', code: '+263' },
];

export default function SoftLeadForm({ onDismiss }) {
  const [contact, setContact] = useState({ name: '', email: '', countryCode: '+49', phone: '', goal: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [codeOpen, setCodeOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!codeOpen) return;
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCodeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [codeOpen]);

  const handleChange = (e) => {
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const fullPhone = contact.phone ? `${contact.countryCode} ${contact.phone}` : '';
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: fullPhone,
          goal: contact.goal,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong.');
      }
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
        <p>Got it — we'll be in touch!</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.title}>Stay in touch — we'll keep you in the loop</p>
      <input
        className={styles.input}
        name="name"
        value={contact.name}
        onChange={handleChange}
        placeholder="Your name"
      />
      <input
        className={styles.input}
        name="email"
        type="email"
        value={contact.email}
        onChange={handleChange}
        placeholder="your@email.com"
        required
      />
      <p className={styles.fieldLabel}>Phone <span className={styles.optional}>(optional)</span></p>
      <div className={styles.phoneRow}>
        <div className={styles.codeDropdown} ref={dropdownRef}>
          <button
            type="button"
            className={styles.codeBtn}
            onClick={() => setCodeOpen((o) => !o)}
          >
            {contact.countryCode} <span className={styles.codeArrow}>▾</span>
          </button>
          {codeOpen && (
            <div className={styles.codeList}>
              {COUNTRY_CODES.map((c) => (
                <div
                  key={c.name}
                  className={`${styles.codeOption}${contact.countryCode === c.code ? ` ${styles.codeOptionActive}` : ''}`}
                  onMouseDown={() => {
                    setContact((prev) => ({ ...prev, countryCode: c.code }));
                    setCodeOpen(false);
                  }}
                >
                  {c.code} {c.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          className={styles.phoneInput}
          name="phone"
          type="tel"
          value={contact.phone}
          onChange={handleChange}
          placeholder="Your number"
        />
      </div>
      <select
        className={styles.input}
        name="goal"
        value={contact.goal}
        onChange={handleChange}
      >
        <option value="">My main goal (optional)</option>
        <option value="Build Muscle">Build Muscle</option>
        <option value="Improve Body Composition">Improve Body Composition</option>
        <option value="Optimize Longevity">Optimize Longevity</option>
        <option value="Improve Health & Well-being">Improve Health &amp; Well-being</option>
      </select>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.actions}>
        <button type="button" className={styles.dismissBtn} onClick={onDismiss}>
          No thanks
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Saving...' : 'Stay in touch'}
        </button>
      </div>
    </form>
  );
}
