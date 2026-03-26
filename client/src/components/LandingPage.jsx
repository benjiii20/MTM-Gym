import { useState } from 'react';
import styles from './LandingPage.module.css';

const CONSULTATION_URL = 'https://www.mtmgym.de/en/free-initial-consultation/';
const ASSETS = '/assets';

const PILLARS = [
  {
    number: '01',
    title: 'Strength',
    body: 'We guarantee your progress — without wasting any time — through goal-oriented coaching and structured strength training within a professional setting. Your personal coach accompanies every session in our studio to ensure you always get the absolute maximum benefit.',
    image: `${ASSETS}/pillar-strength.jpg`,
  },
  {
    number: '02',
    title: 'Lifestyle & Longevity',
    body: 'In the initial assessment, we analyze your current condition using medical measurement methods to determine where you currently stand. What level of stress are you exposed to on a daily basis? Do you experience sleep issues, a fluctuating blood sugar level or are you lacking essential micronutrients that are holding you back? By fully understanding you, we can provide the optimal support to help you reach your goals of living a long and healthy life.',
    image: `${ASSETS}/pillar-lifestyle.jpg`,
  },
  {
    number: '03',
    title: 'Nutrition',
    body: 'The right nutrition is fundamental for well-being and successful training. In order to optimize your intake of macro- and micronutrients, we have developed our nutrition and supplement strategies in a way that they can be adapted to your everyday life. Based on our assessment and customized to your needs, we will develop healthy habits.',
    image: `${ASSETS}/pillar-nutrition.jpg`,
  },
  {
    number: '04',
    title: 'Mental Health',
    body: 'Exercise and nutrition are the most powerful partners for mental health. A healthier body, built and sustained through targeted habits, leads to increased stress resilience and improved performance.',
    image: `${ASSETS}/pillar-mental.jpg`,
  },
];

const CLIENTS = [
  { name: 'Mitch', age: 32, job: 'Climate Scientist', months: '16 months', image: `${ASSETS}/client-mitch.jpg` },
  { name: 'Manja', age: 38, job: 'Marketing Lead', months: '17 months', image: `${ASSETS}/client-manja.jpg` },
  { name: 'Björn', age: 32, job: 'Entrepreneur', months: '15 months', image: `${ASSETS}/client-bjorn.jpg` },
  { name: 'Anna', age: 33, job: 'Coach', months: '5 months', image: `${ASSETS}/client-anna.png` },
  { name: 'Ilya', age: 43, job: 'Entrepreneur', months: '14 months', image: `${ASSETS}/client-ilya.jpg` },
  { name: 'Markus', age: 34, job: 'Surgeon', months: '9 months', image: `${ASSETS}/client-markus.jpg` },
  { name: 'Fred', age: 32, job: 'VP People', months: '12 months', image: `${ASSETS}/client-fred.jpg` },
  { name: 'Eugen', age: 31, job: 'Comedian', months: '3 months', image: `${ASSETS}/client-eugen.jpg` },
  { name: 'Bashar', age: 35, job: 'Software Engineer', months: '5 months', image: `${ASSETS}/client-bashar.jpg` },
  { name: 'Yu', age: 30, job: 'Medical Doctor', months: '8 months', image: `${ASSETS}/client-yu.jpg` },
  { name: 'Toby', age: 44, job: 'VP', months: '12 months', image: `${ASSETS}/client-toby.jpg` },
  { name: 'Shawn', age: 36, job: 'Real Estate', months: '24 months', image: `${ASSETS}/client-shawn.jpg` },
  { name: 'Karl', age: 37, job: 'Physician', months: '6 months', image: `${ASSETS}/client-karl.jpg` },
  { name: 'Robert', age: 43, job: 'Consultant', months: '4 months', image: `${ASSETS}/client-robert.jpg` },
  { name: 'Jason', age: 41, job: 'Entrepreneur', months: '5 months', image: `${ASSETS}/client-jason.jpg` },
  { name: 'Thanu', age: 29, job: 'Project Manager', months: '4 months', image: `${ASSETS}/client-thanu.jpg` },
  { name: 'Genna', age: 32, job: 'Entrepreneur', months: '8 months', image: `${ASSETS}/client-genna.jpg` },
  { name: 'Henry', age: 28, job: 'Account Executive', months: '4 months', image: `${ASSETS}/client-henry.jpg` },
  { name: 'Elli', age: 23, job: 'Nurse', months: '8 months', image: `${ASSETS}/client-elli.jpg` },
  { name: 'Phillip', age: 29, job: 'Team Lead', months: '16 months', image: `${ASSETS}/client-phillip.jpg` },
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
    icon: `${ASSETS}/icon-team.svg`,
    title: 'A TEAM OF EXPERTS',
    body: 'Combined knowledge from over 10 academic degrees, over 100 seminars, tens of thousands of hours of Personal Training, and diverse areas of expertise. We coaches are a team and share the goal of a healthy, long life for our members.',
  },
  {
    icon: `${ASSETS}/icon-space.svg`,
    title: 'THE PERFECT SPACE',
    body: 'More than a gym. Our studios are exclusively for Personal Training and are optimized for your experience. We offer the most modern technology and the perfect atmosphere for your workouts.',
  },
  {
    icon: `${ASSETS}/icon-monitoring.svg`,
    title: 'CONSTANT MONITORING',
    body: 'Assessment according to medical standards in a 4-week cycle: Your physical progress data and nutritional biomarkers serve as the basis for customizing your training and diet plans to achieve optimal results.',
  },
  {
    icon: `${ASSETS}/icon-training.svg`,
    title: 'PERIODIZED WORKOUT ROUTINE',
    body: 'Periodized training based on sports science, taking your assessment into account. The MTM program utilizes a cyclical structure of varying intensity levels to ensure long-term performance improvements.',
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
          <img src={`${ASSETS}/mtm-logo-small.svg`} alt="MTM Personal Training" className={styles.navLogoImg} />
        </a>
        <div className={styles.navRight}>
          <span className={styles.navLang}>EN</span>
          <span className={styles.navLangDivider}>|</span>
          <a href="https://www.mtmgym.de/" className={styles.navLangInactive} target="_blank" rel="noopener noreferrer">DE</a>
          <button className={styles.navHamburger} aria-label="Menu">
            <span /><span /><span />
          </button>
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
          poster={`${ASSETS}/hero-poster.png`}
        >
          <source src={`${ASSETS}/hero-video.mp4`} type="video/mp4" />
        </video>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <img
            src={`${ASSETS}/make-the-most.svg`}
            alt="Make the Most"
            className={styles.heroLogo}
          />
          <h1 className={styles.heroTitle}>The MTM Program</h1>
          <p className={styles.heroSub}>
            Personalized for your body, integrated into your daily life.
          </p>
          <div className={styles.heroBtns}>
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              Free Consultation
            </a>
            <a href="https://www.mtmgym.de/shop/" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              MTM Shop
            </a>
            <button className={styles.btnSecondary} onClick={onOpenChat}>
              Chat with AI
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
              <h2 className={`${styles.sectionTitle} ${styles.uppercase}`}>Together on the Path to Progress</h2>
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
          <h2 className={styles.sectionTitle}>See our client's results</h2>
        </div>
        <div className={styles.galleryScroll}>
          {CLIENTS.map((c) => (
            <div key={`${c.name}-${c.age}`} className={styles.galleryCard}>
              <img src={c.image} alt={`${c.name} transformation`} className={styles.galleryImg} loading="lazy" />
              <div className={styles.galleryOverlay}>
                <div className={styles.galleryName}>{c.name}, {c.age}</div>
                <div className={styles.galleryMeta}>{c.job} · {c.months}</div>
              </div>
            </div>
          ))}
          <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className={styles.galleryCtaCard}>
            <div className={styles.galleryCtaText}>AND YOU?</div>
            <div className={styles.galleryCtaArrow}>→</div>
            <div className={styles.galleryCtaSub}>Free Consultation</div>
          </a>
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
          <h2 className={`${styles.sectionTitle} ${styles.uppercase}`}>Where Individualization Meets Results</h2>
          <p className={styles.sectionBody}>
            We define success through results that are measurable, relevant, and noticeable in
            daily life. For us, support means true guidance — extending beyond the training session.
            More energy, better sleep, and a nutrition plan that fits your life. Thanks to the
            expertise of our trainer team, ambitions are transformed into achievable results.
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
          <h2 className={`${styles.sectionTitle} ${styles.uppercase}`}>Our Studios</h2>
          <div className={styles.studiosGrid}>
            <a
              href="https://www.mtmgym.de/en/studio-berlin-charlottenburg/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.studioCard}
            >
              <img
                src={`${ASSETS}/studio-charlottenburg.jpg`}
                alt="Studio Charlottenburg"
                className={styles.studioImg}
                loading="lazy"
              />
              <div className={styles.studioInfo}>
                <div className={styles.studioName}>Charlottenburg</div>
                <div className={styles.studioAddress}>
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
                src={`${ASSETS}/studio-mitte.jpg`}
                alt="Studio Mitte"
                className={styles.studioImg}
                loading="lazy"
              />
              <div className={styles.studioInfo}>
                <div className={styles.studioName}>Mitte</div>
                <div className={styles.studioAddress}>
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
        <div className={styles.ctaBannerBtns}>
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
                src={`${ASSETS}/make-the-most.svg`}
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
                <li><a href="https://www.mtmgym.de/en/career/" target="_blank" rel="noopener noreferrer">Career</a></li>
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
