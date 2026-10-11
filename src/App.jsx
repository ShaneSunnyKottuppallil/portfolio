import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  profile, stats, skills, experience, projects, education, certifications, achievements, marquee,
  terminalScript, incidentFlow,
} from './data.js';
import { Icon } from './Icons.jsx';
import {
  useScrollProgress, useCountUp, useTypewriter, useScramble, useInView,
} from './hooks.js';
import NetworkCanvas from './NetworkCanvas.jsx';
import FloatingGlyphs from './FloatingGlyphs.jsx';
import AnimatedAvatar from './Avatar.jsx';
import { DeployArt, PipelineArt, MonitoringArt } from './ProjectArt.jsx';

const projectArt = { monitoring: MonitoringArt, deploy: DeployArt, pipeline: PipelineArt };

const navItems = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['education', 'Education'],
  ['contact', 'Contact'],
];

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 65, damping: 15 } },
};

function Stat({ num, prefix = '', suffix = '', label, delay }) {
  const [ref, val] = useCountUp(num, 1500);
  return (
    <motion.div
      ref={ref}
      className="stat glass"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 80, damping: 15, delay }}
    >
      <span className="stat-value liquid-text">{prefix}{val}{suffix}</span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
}

function ScrambleTitle({ text }) {
  const [ref, seen] = useInView(0.5);
  const out = useScramble(text, { trigger: seen });
  return <h2 ref={ref} className="liquid-text">{out || '\u00A0'}</h2>;
}

function Section({ id, kicker, title, children }) {
  return (
    <section id={id} className="section">
      <motion.div
        className="section-head"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={reveal}
      >
        <span className="kicker"><span className="prompt">$</span> {kicker}</span>
        <ScrambleTitle text={title} />
        <span className="section-rule" aria-hidden="true" />
      </motion.div>
      {children}
    </section>
  );
}

/** Hero's self-running terminal — types a command, shows output, moves on, loops. */
function LiveTerminal() {
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState('');
  const [showOut, setShowOut] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const entry = terminalScript[i % terminalScript.length];
    let ch = 0;
    setTyped('');
    setShowOut(false);
    const typing = setInterval(() => {
      ch++;
      setTyped(entry.cmd.slice(0, ch));
      if (ch >= entry.cmd.length) {
        clearInterval(typing);
        setTimeout(() => setShowOut(true), 320);
        setTimeout(() => {
          setHistory((h) => [...h.slice(-2), entry]);
          setI((n) => n + 1);
        }, 2200);
      }
    }, 55);
    return () => clearInterval(typing);
  }, [i]);

  return (
    <div className="terminal glass">
      <div className="term-bar"><i /><i /><i /><span>shane@prod — bash</span></div>
      <div className="term-body">
        {history.map((h, k) => (
          <React.Fragment key={k}>
            <p><span className="tp">➜</span> <span className="tc">~</span> {h.cmd}</p>
            <p className="tdim">{h.out}</p>
          </React.Fragment>
        ))}
        <p><span className="tp">➜</span> <span className="tc">~</span> {typed}<span className="blink">▋</span></p>
        {showOut && <p className={terminalScript[i % terminalScript.length].ok ? 'tok' : 'tdim'}>{terminalScript[i % terminalScript.length].out}</p>}
      </div>
    </div>
  );
}

/** Animated flowing wave divider between sections. */
function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path d="M0 30 Q 150 0 300 30 T 600 30 T 900 30 T 1200 30" fill="none" stroke="url(#dv)" strokeWidth="2">
          <animate attributeName="d"
            values="M0 30 Q 150 0 300 30 T 600 30 T 900 30 T 1200 30;
                    M0 30 Q 150 60 300 30 T 600 30 T 900 30 T 1200 30;
                    M0 30 Q 150 0 300 30 T 600 30 T 900 30 T 1200 30"
            dur="6s" repeatCount="indefinite" />
        </path>
        <defs>
          <linearGradient id="dv" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e5e9f0" stopOpacity="0" />
            <stop offset="0.5" stopColor="#9aa3b2" />
            <stop offset="1" stopColor="#cbd3e1" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/** Experience card — scannable headline + metric chips, details on demand. */
function ExperienceCard({ e, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="tl-item"
      initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 70, damping: 16, delay: i * 0.05 }}>
      <div className="tl-marker"><span /></div>
      <div className={`tl-card glass ${open ? 'is-open' : ''}`}>
        <div className="tl-top">
          <div>
            <h3>{e.role}</h3>
            <p className="tl-company">{e.company}</p>
            <p className="tl-meta">{e.meta}</p>
          </div>
          <div className="tl-period"><span className="tag">{e.tag}</span><span>{e.period}</span></div>
        </div>

        {e.headline && <p className="tl-headline">{e.headline}</p>}

        {e.metrics && (
          <div className="tl-metrics">
            {e.metrics.map((m) => (
              <div key={m.k} className="tl-metric">
                <span className="tl-metric-v liquid-text">{m.v}</span>
                <span className="tl-metric-k">{m.k}</span>
              </div>
            ))}
          </div>
        )}

        <motion.div
          className="tl-details"
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          {e.note && <p className="tl-note">↳ {e.note}</p>}
          <ul>{e.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
        </motion.div>

        <button className="tl-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? 'Hide details' : 'View details'}
          <span className={`tl-chev ${open ? 'up' : ''}`}>▾</span>
        </button>
      </div>
    </motion.div>
  );
}

/** Scroll-to-top button with a progress ring. */
function BackToTop({ progress }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const r = 20, c = 2 * Math.PI * r;
  return (
    <button className={`to-top ${show ? 'show' : ''}`} aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
        <circle cx="24" cy="24" r={r} fill="none" stroke="url(#tt)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - progress)} transform="rotate(-90 24 24)" />
        <defs>
          <linearGradient id="tt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e5e9f0" /><stop offset="1" stopColor="#9aa3b2" />
          </linearGradient>
        </defs>
      </svg>
      <Icon name="arrowUp" size={18} />
    </button>
  );
}

function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((m, i) => (
          <span key={i} className="marquee-item">{m}<i>•</i></span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const progress = useScrollProgress();
  const typed = useTypewriter(
    ['Associate DevOps Engineer', 'Site Reliability Engineer', 'Kubernetes Operator', 'CI/CD Automator'],
    { typeSpeed: 65, pause: 1400 }
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map(([id]) => id).concat('home');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* self-animating background */}
      <div className="bg-layer" aria-hidden="true">
        <NetworkCanvas />
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <FloatingGlyphs count={16} />
      </div>

      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <BackToTop progress={progress} />

      {/* NAV */}
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); go('home'); }}>
          <img src="/logo.png" alt="SK logo" />
          <span>Shane<strong>K.</strong></span>
        </a>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''}
              onClick={(e) => { e.preventDefault(); go(id); }}>{label}</a>
          ))}
          <a className="nav-cta" href={profile.resume} target="_blank" rel="noreferrer">Resume</a>
        </nav>
        <button className={`burger ${menuOpen ? 'x' : ''}`} aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}>
          <span /><span /><span />
        </button>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-inner">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          >
            <div className="status-pill">
              <span className="dot" /> Open to Associate DevOps / SRE roles
            </div>
            <h1>
              <span className="line">Shane Sunny</span>
              <span className="line liquid-text accent">Kottuppallil</span>
            </h1>
            <p className="role-line">
              <span className="type">{typed}</span><span className="caret" />
            </p>
            <p className="hero-tag">{profile.tagline}</p>

            {/* live self-running terminal */}
            <LiveTerminal />

            <div className="hero-actions">
              <a className="btn btn-primary" href={profile.resume} target="_blank" rel="noreferrer">
                <Icon name="download" /> Download Resume
              </a>
              <a className="btn btn-ghost" href="#projects" onClick={(e) => { e.preventDefault(); go('projects'); }}>
                See Projects
              </a>
            </div>
            <div className="hero-socials">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
              <a href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" /></a>
            </div>
          </motion.div>

          <motion.div
            className="hero-photo"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 55, damping: 15, delay: 0.1 }}
          >
            <div className="photo-ring float">
              <div className="photo-frame">
                <img src="/images/hero.jpg" alt={profile.name} />
                <div className="photo-badge glass">
                  <span className="live-dot" />
                  <code>uptime 99.9% — all green</code>
                </div>
              </div>
              <span className="orbit o1"><Icon name="container" size={18} /></span>
              <span className="orbit o2"><Icon name="cloud" size={18} /></span>
              <span className="orbit o3"><Icon name="pipeline" size={18} /></span>
            </div>
          </motion.div>
        </div>

        <div className="stat-strip">
          {stats.map((s, i) => <Stat key={s.label} {...s} delay={i * 0.07} />)}
        </div>
      </section>

      {/* self-scrolling tech belt */}
      <Marquee />

      <main>
        {/* ABOUT */}
        <Section id="about" kicker="whoami" title="About Me">
          <div className="about-grid">
            <motion.div className="about-photo" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
              <img src="/images/about.jpg" alt={profile.name} />
              <span className="about-photo-glow" aria-hidden="true" />
              <AnimatedAvatar />
            </motion.div>
            <motion.div className="about-text" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
              {profile.about.map((p, i) => <p key={i}>{p}</p>)}
              <div className="about-chips">
                <span className="glass"><Icon name="pin" /> {profile.location}</span>
                <span className="glass"><Icon name="mail" /> {profile.email}</span>
                <span className="glass"><Icon name="phone" /> {profile.phone}</span>
              </div>
            </motion.div>
          </div>
        </Section>

        <Divider />

        {/* SKILLS */}
        <Section id="skills" kicker="skills --list" title="Technical Toolkit">
          <div className="skills-grid">
            {skills.map((s, i) => (
              <motion.div key={s.group} className="skill-card glass"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ type: 'spring', stiffness: 70, damping: 15, delay: i * 0.05 }}>
                <div className="skill-icon"><Icon name={s.icon} /></div>
                <h3>{s.group}</h3>
                <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" kicker="experience --timeline" title="Where I've Operated">
          <div className="timeline">
            {experience.map((e, i) => (
              <ExperienceCard key={e.company} e={e} i={i} />
            ))}
          </div>
        </Section>

        {/* INCIDENT RESPONSE FLOW */}
        <Section id="incident" kicker="oncall --playbook" title="When The Pager Goes Off">
          <div className="incident-flow">
            {incidentFlow.map((step, i) => (
              <motion.div key={step.label} className="incident-step"
                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 90, damping: 14, delay: i * 0.12 }}>
                <div className="incident-node glass">
                  <span className="incident-pulse" />
                  <Icon name={step.icon} />
                </div>
                <h4>{step.label}</h4>
                <p>{step.note}</p>
                {i < incidentFlow.length - 1 && <span className="incident-arrow">→</span>}
              </motion.div>
            ))}
          </div>
        </Section>

        <Divider />

        {/* PROJECTS — cards "pull out" of the page on hover (3D perspective) */}
        <Section id="projects" kicker="projects --featured" title="Things I've Built">
          <div className="projects-grid pull-stage">
            {projects.map((p, i) => {
              const Art = projectArt[p.art] || DeployArt;
              return (
                <motion.article
                  key={p.name}
                  className={`project-card pull-card glass ${p.featured ? 'is-featured' : ''}`}
                  initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ type: 'spring', stiffness: 65, damping: 15, delay: i * 0.08 }}
                >
                  <div className="pull-card-inner">
                    {p.featured && <span className="featured-flag"><span className="live-dot" /> Featured</span>}
                    <div className="project-art-wrap"><Art /></div>
                    <div className="project-body">
                      <div className="project-head">
                        <Icon name="terminal" />
                        <h3>{p.name}</h3>
                        {p.repo && (
                          <a className="project-repo" href={p.repo} target="_blank" rel="noreferrer" aria-label="View on GitHub">
                            <Icon name="github" size={18} />
                          </a>
                        )}
                      </div>
                      <p className="project-blurb">{p.blurb}</p>
                      <ul>{p.points.map((pt, j) => <li key={j}>{pt}</li>)}</ul>
                      <div className="tech-row">
                        {p.tech.map((t) => <span key={t} className="tech-chip">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" kicker="education & certifications" title="Learning & Credentials">
          <div className="edu-col">
            {education.map((ed) => (
              <motion.div key={ed.school} className="edu-card glass"
                initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
                <div className="edu-icon"><Icon name="cap" /></div>
                <div>
                  <h3>{ed.degree}</h3>
                  <p className="edu-school">{ed.school} · {ed.location}</p>
                  <p className="edu-period">{ed.period}</p>
                  <div className="edu-highlights">{ed.highlights.map((h) => <span key={h}>{h}</span>)}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CERTIFICATIONS — visual badge grid */}
          <h3 className="cert-heading"><Icon name="badge" /> Certifications</h3>
          <div className="cert-grid">
            {certifications.map((c, i) => (
              <motion.div key={c.name}
                className={`cert-badge glass ${c.featured ? 'is-featured' : ''}`}
                style={{ '--accent': c.accent }}
                initial={{ opacity: 0, y: 22, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 90, damping: 14, delay: i * 0.05 }}>
                <span className="cert-ribbon" aria-hidden="true" />
                <div className="cert-mark"><Icon name={c.icon} size={20} /></div>
                <div className="cert-info">
                  <span className="cert-badge-name">{c.short}</span>
                  <span className="cert-badge-issuer">{c.issuer}</span>
                </div>
                {c.featured && <span className="cert-star">★</span>}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* ACHIEVEMENTS */}
        <Section id="achievements" kicker="achievements --highlights" title="Impact That Stuck">
          <div className="ach-grid">
            {achievements.map((a, i) => (
              <motion.div key={a.title} className="ach-card glass"
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 70, damping: 15, delay: i * 0.06 }}>
                <span className="ach-metric liquid-text">{a.metric}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" kicker="contact --open" title="Let's Build Something Reliable">
          <motion.div className="contact-card glass"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={reveal}>
            <p className="contact-lead">
              I'm open to Associate DevOps and SRE opportunities. Email or LinkedIn is the fastest way to reach me.
            </p>
            <div className="contact-actions">
              <a className="btn btn-primary" href={`mailto:${profile.email}`}><Icon name="mail" /> {profile.email}</a>
              <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn</a>
              <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a>
            </div>
            <div className="contact-meta">
              <span><Icon name="pin" /> {profile.location}</span>
              <span><Icon name="phone" /> {profile.phone}</span>
            </div>
          </motion.div>
        </Section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/logo.png" alt="SK logo" />
            <span>Shane Sunny Kottuppallil</span>
          </div>
          <p className="footer-note">Designed &amp; built with React · © {new Date().getFullYear()}</p>
          <div className="footer-socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
            <a href={`mailto:${profile.email}`} aria-label="Email"><Icon name="mail" /></a>
          </div>
        </div>
      </footer>
    </>
  );
}
