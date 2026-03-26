import { useState } from 'react';
import styles from './LandingPage.module.css';

const CONSULTATION_URL = 'https://www.mtmgym.de/en/free-initial-consultation/';

const CDN = 'https://www.mtmgym.de/wp-content/uploads';

const PILLARS = [
  {
    number: '01',
    title: 'Strength',
    body: 'We guarantee your progress — without wasting any time — through goal-oriented coaching and structured strength training, accompanied by your personal trainer in every session.',
    image: `${CDN}/2023/11/Homepage-HM-Strength-768x576.jpg`,
  },
  {
    number: '02',
    title: 'Lifestyle & Longevity',
    body: 'In the initial assessment, we analyze your current condition using medical measurement methods to create the most precise and effective training and nutrition plan possible.',
    image: `${CDN}/2024/02/website_llifestyle-1-768x576.jpg`,
  },
  {
    number: '03',
    title: 'Nutrition',
    body: 'The right nutrition is fundamental for well-being and successful training. Our coaches provide evidence-based guidance tailored to your lifestyle and goals.',
    image: `${CDN}/2023/11/Homepage-HM-Nutricion-768x576.jpg`,
  },
  {
    number: '04',
    title: 'Mental Health',
    body: 'Exercise and nutrition are the most powerful partners for mental health. We integrate mindfulness and recovery strategies into every program.',
    image: `${CDN}/2023/11/Homepage-HM-Mental-Health-768x576.jpg`,
  },
];

const CLIENTS = [
  { name: 'Mitch', age: 32, job: 'Climate Scientist', months: '16 months' },
  { name: 'Manja', age: 38, job: 'Marketing Lead', months: '17 months' },
  { name: 'Björn', age: 32, job: 'Entrepreneur', months: '15 months' },
  { name: 'Anna', age: 33, job: 'Coach', months: '5 months' },
  { name: 'Ilya', age: 43, job: 'Entrepreneur', months: '14 months' },
  { name: 'Markus', age: 34, job: 'Surgeon', months: '9 months' },
  { name: 'Fred', age: 32, job: 'VP People', months: '12 months' },
];

const PT_TIERS = [
  {
    label: '4× / month',
    price: '€640',
    period: '/ month',
    features: [
      'Supervised 60min session with your personal trainer',
      'Exclusive personal training atmosphere',
      'Monthly Lifestyle & Body Composition Analysis',
      'Nutrition & Supplement Coaching',
      'Individually periodized training plan',
      '1 protein shake + 1 amino shake per session',
      'Unused sessions can be made up within 2 months',
    ],
  },
  {
    label: '8× / month',
    price: '€1,120',
    period: '/ month',
    features: [
      'Supervised 60min session with your personal trainer',
      'Exclusive personal training atmosphere',
      'Monthly Lifestyle & Body Composition Analysis',
      'Nutrition & Supplement Coaching',
      'Individually periodized training plan',
      '1 protein shake + 1 amino shake per session',
      'Unused sessions can be made up within 2 months',
    ],
  },
  {
    label: '12× / month',
    price: '€1,500',
    period: '/ month',
    features: [
      'Supervised 60min session with your personal trainer',
      'Exclusive personal training atmosphere',
      'Monthly Lifestyle & Body Composition Analysis',
      'Nutrition & Supplement Coaching',
      'Individually periodized training plan',
      '1 protein shake + 1 amino shake per session',
      'Unused sessions can be made up within 2 months',
    ],
  },
  {
    label: '16× / month',
    price: '€1,920',
    period: '/ month',
    features: [
      'Supervised 60min session with your personal trainer',
      'Exclusive personal training atmosphere',
      'Monthly Lifestyle & Body Composition Analysis',
      'Nutrition & Supplement Coaching',
      'Individually periodized training plan',
      '1 protein shake + 1 amino shake per session',
      'Unused sessions can be made up within 2 months',
    ],
  },
  {
    label: 'Drop-In',
    price: '€1,600',
    period: '/ 10 sessions',
    features: [
      'Perfect solution for visiting Berlin',
      'Supervised 60min session',
      'Exclusive personal training atmosphere',
      '1 protein shake + 1 amino shake per session',
    ],
  },
];

const COACHING_TIERS = [
  {
    label: 'Complete',
    price: '€350',
    period: '/ month',
    features: [
      'Independent workout in MTM Gym',
      'Monthly coaching session',
      'Nutrition & supplement coaching',
      'Monthly optimized training plan',
      'MTM App access',
    ],
  },
  {
    label: 'Training',
    price: '€250',
    period: '/ month',
    features: [
      'Coaching at MTM Gym',
      'Body composition analysis',
      'Training plan coaching',
    ],
  },
  {
    label: 'Nutrition',
    price: '€250',
    period: '/ month',
    features: [
      'Monthly 60min nutrition coaching',
      'On-site nutrition guidance',
      'Supplement recommendations',
    ],
  },
];

const CONCEPT_BOXES = [
  {
    icon: `${CDN}/2024/02/Icon-Team-five-stars.svg`,
    title: 'A TEAM OF EXPERTS',
    body: 'Combined knowledge from over 10 academic degrees, over 100 seminars, and tens of thousands of hours of Personal Training experience.',
  },
  {
    icon: `${CDN}/2023/12/Icon-Space.svg`,
    title: 'THE PERFECT SPACE',
    body: 'More than a gym. Our studios are exclusively for Personal Training — no crowd, no distractions, just you and your trainer.',
  },
  {
    icon: `${CDN}/2023/12/Icon-Monitoring.svg`,
    title: 'CONSTANT MONITORING',
    body: 'Assessment according to medical standards in a 4-week cycle to ensure your program is always perfectly calibrated.',
  },
  {
    icon: `${CDN}/2023/12/Icon-Training.svg`,
    title: 'PERIODIZED WORKOUT',
    body: 'Periodized training based on sports science — your plan evolves as you do, maximizing results at every stage.',
  },
];

export default function LandingPage({ onOpenChat }) {
  const [ptTab, setPtTab] = useState(0);
  const [coachTab, setCoachTab] = useState(0);

  return (
    <div>
      {/* ---- NAV ---- */}
      <nav className={styles.nav}>
        <a href="https://www.mtmgym.de/en/" className={styles.navLogo} target="_blank" rel="noopener noreferrer">
          <span className={styles.navLogoText}>MTM</span>
          <span className={styles.navLogoDot}>·</span>
          <span className={styles.navLogoSub}>GYM</span>
        </a>
        <ul className={styles.navLinks}>
          <li><a href="https://www.mtmgym.de/en/studio-berlin-charlottenburg/" target="_blank" rel="noopener noreferrer">Charlottenburg</a></li>
          <li><a href="https://www.mtmgym.de/en/studio-berlin-mitte/" target="_blank" rel="noopener noreferrer">Mitte</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="https://www.mtmgym.de/en/blog/" target="_blank" rel="noopener noreferrer">Blog</a></li>
          <li><a href="https://www.mtmgym.de/en/career" target="_blank" rel="noopener noreferrer">Career</a></li>
        </ul>
        <div className={styles.navRight}>
          <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className={styles.navCta}>
            Free Consultation
          </a>
        </div>
      </nav>

      {/* ---- HERO ---- */}
      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          poster={`${CDN}/2024/01/MTM-Startseite-desktop-fallback-video.png`}
        >
          <source src={`${CDN}/2024/01/Header-MTM-New.mp4`} type="video/mp4" />
        </video>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <img
            src={`${CDN}/2023/11/make-the-most.svg`}
            alt="Make the Most"
            className={styles.heroLogo}
          />
          <h1 className={styles.heroTitle}>The MTM Program</h1>
          <p className={styles.heroSub}>
            Personalized for your body, integrated into your daily life.
          </p>
          <div className={styles.heroBtns}>
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              Free Consultation →
            </a>
            <button className={styles.btnSecondary} onClick={onOpenChat}>
              Ask Our AI →
            </button>
          </div>
        </div>
      </section>

      {/* ---- HEALTH COMPONENTS ---- */}
      <section className={`${styles.section} ${styles.sectionMid}`}>
        <div className={styles.container}>
          <div className={styles.pillarsHeader}>
            <p className={styles.topline}>MTM Health Components</p>
            <h2 className={styles.sectionTitle}>Life Belongs to the Healthy</h2>
          </div>
          <div className={styles.pillarsGrid}>
            {PILLARS.map((p) => (
              <div key={p.number} className={styles.pillarItem}>
                <div className={styles.pillarImageWrap}>
                  <img src={p.image} alt={p.title} className={styles.pillarImage} loading="lazy" />
                </div>
                <div>
                  <p className={styles.pillarNumber}>{p.number} — {p.title}</p>
                  <h3 className={styles.pillarTitle}>{p.title}</h3>
                  <p className={styles.pillarBody}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- TOGETHER SECTION ---- */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <div className={styles.togetherInner}>
            <div>
              <p className={styles.topline}>Unleash Your Potential</p>
              <h2 className={styles.sectionTitle}>Together on the Path to Progress</h2>
              <p className={styles.sectionBody}>
                We are more than an external advisor; we are your partner on the way to your goal.
                Our program is precisely tailored to your situation, and we personally accompany you
                through every step of your journey. Hundreds of satisfied members have already
                successfully traveled this road with us and confirm: together, more is possible.
              </p>
            </div>
            <div className={styles.togetherStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>10+</div>
                <div className={styles.statLabel}>Academic degrees across the team</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>100+</div>
                <div className={styles.statLabel}>Seminars and continued education</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>2</div>
                <div className={styles.statLabel}>Exclusive studios in Berlin</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CLIENT GALLERY ---- */}
      <section className={`${styles.section} ${styles.sectionMid}`}>
        <div className={styles.container}>
          <p className={styles.topline}>Client Transformations</p>
          <h2 className={styles.sectionTitle}>Results That Speak for Themselves</h2>
          <div className={styles.galleryGrid}>
            {CLIENTS.map((c) => (
              <div key={c.name} className={styles.galleryCard}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1a1a 0%, #222 100%)' }} />
                <div className={styles.galleryOverlay}>
                  <div className={styles.galleryName}>{c.name}, {c.age}</div>
                  <div className={styles.galleryMeta}>{c.job} · {c.months}</div>
                </div>
              </div>
            ))}
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className={styles.galleryCtaCard}>
              <div className={styles.galleryCtaText}>AND YOU?</div>
              <div className={styles.galleryCtaArrow}>→</div>
              <div style={{ fontSize: '12px', color: 'var(--accent)', opacity: 0.8 }}>Free Consultation</div>
            </a>
          </div>
        </div>
      </section>

      {/* ---- PRICING ---- */}
      <section className={`${styles.section} ${styles.sectionDark}`} id="pricing">
        <div className={styles.container}>
          <p className={styles.topline}>Investment</p>
          <h2 className={styles.sectionTitle}>Choose Your Program</h2>
          <div className={styles.pricingGrid}>
            {/* 1:1 Personal Training */}
            <div className={styles.pricingCard}>
              <p className={styles.pricingCardTitle}>1:1 Personal Training</p>
              <div className={styles.pricingTabs}>
                {PT_TIERS.map((t, i) => (
                  <button
                    key={t.label}
                    className={`${styles.pricingTab} ${ptTab === i ? styles.pricingTabActive : ''}`}
                    onClick={() => setPtTab(i)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className={styles.pricingAmount}>{PT_TIERS[ptTab].price}</div>
              <div className={styles.pricingPeriod}>{PT_TIERS[ptTab].period}</div>
              <ul className={styles.pricingFeatures}>
                {PT_TIERS[ptTab].features.map((f) => (
                  <li key={f} className={styles.pricingFeature}>{f}</li>
                ))}
              </ul>
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                Book Free Consultation →
              </a>
            </div>

            {/* Coaching Package */}
            <div className={styles.pricingCard}>
              <p className={styles.pricingCardTitle}>Coaching Package</p>
              <div className={styles.pricingTabs}>
                {COACHING_TIERS.map((t, i) => (
                  <button
                    key={t.label}
                    className={`${styles.pricingTab} ${coachTab === i ? styles.pricingTabActive : ''}`}
                    onClick={() => setCoachTab(i)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className={styles.pricingAmount}>{COACHING_TIERS[coachTab].price}</div>
              <div className={styles.pricingPeriod}>{COACHING_TIERS[coachTab].period}</div>
              <ul className={styles.pricingFeatures}>
                {COACHING_TIERS[coachTab].features.map((f) => (
                  <li key={f} className={styles.pricingFeature}>{f}</li>
                ))}
              </ul>
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                Book Free Consultation →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CONCEPT BOXES ---- */}
      <section className={`${styles.section} ${styles.sectionMid}`}>
        <div className={styles.container}>
          <p className={styles.topline}>MTM Concept</p>
          <h2 className={styles.sectionTitle}>Where Individualization Meets Results</h2>
          <p className={styles.sectionBody}>
            We define success through results that are measurable, relevant, and noticeable in
            daily life. For us, support means true guidance — extending beyond the training session.
          </p>
          <div className={styles.conceptBoxes}>
            {CONCEPT_BOXES.map((b) => (
              <div key={b.title} className={styles.conceptBox}>
                <img src={b.icon} alt="" className={styles.conceptIcon} loading="lazy" />
                <h3 className={styles.conceptBoxTitle}>{b.title}</h3>
                <p className={styles.conceptBoxBody}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- STUDIOS ---- */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.container}>
          <p className={styles.topline}>Our Locations</p>
          <h2 className={styles.sectionTitle}>Two Studios in Berlin</h2>
          <div className={styles.studiosGrid}>
            <a
              href="https://www.mtmgym.de/en/studio-berlin-charlottenburg/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.studioCard}
            >
              <img
                src={`${CDN}/2023/12/Homepage-Teaser-Studio-Charlottenburg-576x768.jpg`}
                alt="Studio Charlottenburg"
                className={styles.studioImg}
                loading="lazy"
              />
              <div className={styles.studioInfo}>
                <div className={styles.studioName}>Charlottenburg</div>
                <div className={styles.studioAddress}>
                  <span className={styles.studioAddressPin}>📍</span>
                  Franklinstraße 28/29, 10587 Berlin
                </div>
              </div>
            </a>
            <a
              href="https://www.mtmgym.de/en/studio-berlin-mitte/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.studioCard}
            >
              <img
                src={`${CDN}/2024/05/DSC02923-576x768.jpg`}
                alt="Studio Mitte"
                className={styles.studioImg}
                loading="lazy"
              />
              <div className={styles.studioInfo}>
                <div className={styles.studioName}>Mitte</div>
                <div className={styles.studioAddress}>
                  <span className={styles.studioAddressPin}>📍</span>
                  Schönhauser Allee 9, 10119 Berlin
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ---- CTA BANNER ---- */}
      <div className={styles.ctaBanner}>
        <h2 className={styles.ctaBannerTitle}>Ready to start?</h2>
        <p className={styles.ctaBannerSub}>Book your free initial consultation — no commitment, no strings attached.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
            Book Free Consultation →
          </a>
          <button className={styles.btnSecondary} onClick={onOpenChat}>
            Ask Our AI →
          </button>
        </div>
      </div>

      {/* ---- FOOTER ---- */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerInner}>
            <div>
              <img
                src={`https://www.mtmgym.de/wp-content/themes/mtm/assets/img/make-the-most.svg`}
                alt="Make the Most"
                className={styles.footerLogo}
              />
              <p className={styles.footerTagline}>
                We do not see ourselves only as external advisors, but as your teammates on the way to your goal.
              </p>
            </div>
            <div>
              <p className={styles.footerColTitle}>Studio</p>
              <ul className={styles.footerLinks}>
                <li><a href="https://www.mtmgym.de/en/studio-berlin-charlottenburg/" target="_blank" rel="noopener noreferrer">Charlottenburg</a></li>
                <li><a href="https://www.mtmgym.de/en/studio-berlin-mitte/" target="_blank" rel="noopener noreferrer">Mitte</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">Free Consultation</a></li>
                <li><a href="https://www.mtmgym.de/en/blog/" target="_blank" rel="noopener noreferrer">Blog</a></li>
                <li><a href="https://www.mtmgym.de/en/career" target="_blank" rel="noopener noreferrer">Career</a></li>
              </ul>
            </div>
            <div>
              <p className={styles.footerColTitle}>Legal</p>
              <ul className={styles.footerLinks}>
                <li><a href="https://www.mtmgym.de/en/faq/" target="_blank" rel="noopener noreferrer">FAQ</a></li>
                <li><a href="https://www.mtmgym.de/en/imprint/" target="_blank" rel="noopener noreferrer">Impressum</a></li>
                <li><a href="https://www.mtmgym.de/en/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
                <li><a href="https://www.mtmgym.de/en/terms/" target="_blank" rel="noopener noreferrer">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span className={styles.footerCopyright}>© Copyright 2024 | MTM – Personal Training.</span>
            <div className={styles.footerSocials}>
              <a href="https://www.instagram.com/mtmgym" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/mtmgymberlin" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.youtube.com/@mtmgym5019" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href="https://www.shop.mtmgym.de/en/" target="_blank" rel="noopener noreferrer">Shop</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
