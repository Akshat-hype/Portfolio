import { useEffect, useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Braces, Check, Code2, Github, Linkedin, Mail, Menu, Radio, Server, Terminal, X, Database, Cpu, Shield, Zap } from 'lucide-react'
import Universe from './components/Universe'
import { projects, type Project } from './data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

/** Terminal typing effect hook */
function useTypingEffect(texts: string[], speed = 55, pause = 2200) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = texts[textIndex]
    let timeout: number

    if (!isDeleting && charIndex < current.length) {
      timeout = window.setTimeout(() => setCharIndex(charIndex + 1), speed)
    } else if (!isDeleting && charIndex === current.length) {
      timeout = window.setTimeout(() => setIsDeleting(true), pause)
    } else if (isDeleting && charIndex > 0) {
      timeout = window.setTimeout(() => setCharIndex(charIndex - 1), speed / 2)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex((textIndex + 1) % texts.length)
    }

    setDisplayed(current.substring(0, charIndex))
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, speed, pause])

  return displayed
}

/** Animated counter */
function Counter({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = Date.now()
          const animate = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <motion.article className={`project-card ${project.accent}`} variants={fadeUp} whileHover={{ y: -7 }}>
      <div className="project-topline">
        <span className="mono project-number">/{project.number}</span>
        <span className="project-status"><span className="status-dot" />{project.status}</span>
      </div>
      <div className="project-visual" aria-hidden="true">
        <div className="visual-grid" />
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="visual-core"><Braces size={34} strokeWidth={1.2} /></div>
        <span className="visual-label mono">SYSTEM / {project.number}</span>
      </div>
      <p className="eyebrow">{project.category}</p>
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      <button className="text-link" onClick={() => onOpen(project)} aria-label={`Read case study for ${project.title}`}>
        Explore system <ArrowUpRight size={16} />
      </button>
    </motion.article>
  )
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="dialog-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.25 }}>
            <div className="dialog-top"><span className="mono">CASE FILE / {project.number}</span><button className="icon-button" onClick={onClose} aria-label="Close project details"><X size={19} /></button></div>
            <p className="eyebrow">{project.category}</p>
            <h2 id="dialog-title">{project.title}</h2>
            <p className="dialog-description">{project.description}</p>
            <h4>Engineering focus</h4>
            <ul className="detail-list">{project.details.map((detail) => <li key={detail}><Check size={16} />{detail}</li>)}</ul>
            <div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
            <p className="dialog-note">This case-study panel is ready for your implementation details, architecture diagram, repository link, and measured results. Replace concept descriptions with verified features as you complete the project.</p>
            <a className="button button-primary" href={project.href} target="_blank" rel="noreferrer">Repository link <ArrowUpRight size={16} /></a>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 180])

  const closeMenu = () => setMenuOpen(false)
  const openProject = useCallback((project: Project) => setActiveProject(project), [])

  const typingText = useTypingEffect([
    'APIs that scale.',
    'Systems that endure.',
    'Infrastructure that delivers.',
    'Code that just works.',
  ], 60, 2500)

  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Akshat Goel home"><span className="wordmark-mark">a<span>.</span></span><span className="wordmark-label">AKSHAT GOEL <small>BACKEND ENGINEER</small></span></a>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Selected work <span>01</span></a>
          <a href="#systems" onClick={closeMenu}>What I build <span>02</span></a>
          <a href="#experience" onClick={closeMenu}>Experience <span>03</span></a>
          <a href="#about" onClick={closeMenu}>About <span>04</span></a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <Universe />
          <div className="hero-vignette" />
          <motion.div className="hero-orb-glow" style={{ y: orbY }} aria-hidden="true" />
          <div className="hero-content">
            <motion.div className="availability-pill" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}><span className="pulse-dot" /> OPEN TO BACKEND OPPORTUNITIES</motion.div>
            <motion.p className="hero-kicker mono" initial="hidden" animate="visible" variants={fadeUp}>I BUILD THE THINGS YOU DON'T SEE.</motion.p>
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.08 }}>
              Beyond the<br /><span className="gradient-text">interface.</span>
              <span className="hero-h1-line">Into the <em>engine.</em></span>
            </motion.h1>
            <motion.p className="hero-copy" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.18 }}>I'm Akshat — a developer exploring the architecture behind reliable APIs, intelligent infrastructure, and products built to scale.</motion.p>

            {/* Terminal-style typing block */}
            <motion.div className="hero-code-block" initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.35 }}>
              <span className="code-comment">// akshat.config.ts</span><br />
              <span className="code-keyword">export const</span> focus = <span className="code-string">"{typingText}"</span><span className="typing-cursor" />
            </motion.div>

            <motion.div className="hero-actions" initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4 }}>
              <a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={17} /></a>
              <a className="button button-ghost" href="https://www.linkedin.com/in/-akshat-goel" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight size={16} /></a>
            </motion.div>
            <motion.div className="hero-footnote mono" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}><span>INDIA · IST</span><span className="footnote-line" /><span>BACKEND / SYSTEMS / APIS</span></motion.div>
          </div>
          <div className="hero-side-note mono" aria-hidden="true"><span>FIG. 001</span><span>THE INVISIBLE LAYER</span></div>
          <a className="scroll-cue mono" href="#work"><span className="scroll-cue-line" />SCROLL TO EXPLORE</a>
        </section>

        <section className="signal-strip" aria-label="Core technologies"><div className="signal-inner"><span className="mono signal-label">CURRENT TOOLKIT</span>{['NODE.JS', 'TYPESCRIPT', 'REST APIS', 'POSTGRESQL', 'REDIS', 'DOCKER', 'EXPRESS.JS', 'GIT'].map((tool) => <span className="signal-item" key={tool}>{tool}<span>✳</span></span>)}</div></section>

        <section className="work-section section-wrap" id="work">
          <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <div><p className="eyebrow"><span className="section-index">01 /</span> SELECTED WORK</p><h2>Systems with<br /><span className="muted-heading">a point of view.</span></h2></div>
            <p className="section-intro">A selection of systems and product ideas focused on the mechanics that make software dependable: configuration, workflows, data, and APIs.</p>
          </motion.div>
          <motion.div className="project-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }} variants={{ visible: { transition: { staggerChildren: 0.13 } } }}>
            {projects.map((project) => <ProjectCard key={project.number} project={project} onOpen={openProject} />)}
          </motion.div>
          <p className="work-footnote mono">MORE SYSTEMS IN THE LAB <span>—</span> DOCUMENTATION IN PROGRESS</p>
        </section>

        <section className="systems-section section-wrap" id="systems">
          <motion.div className="section-heading systems-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <div><p className="eyebrow"><span className="section-index">02 /</span> HOW I THINK</p><h2>Good systems are<br /><span className="gradient-text">designed, not hoped for.</span></h2></div>
            <p className="section-intro">I care about the decisions behind the endpoint: clear boundaries, predictable failures, observable behavior, and data you can trust.</p>
          </motion.div>
          <div className="systems-layout">
            <motion.div className="architecture-panel" initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="panel-header"><span className="mono"><span className="live-dot" /> REQUEST LIFECYCLE / 001</span><span className="mono panel-quiet">REFERENCE ARCHITECTURE</span></div>
              <div className="architecture-flow">
                <div className="arch-node client-node"><Code2 size={19} /><span>CLIENT</span><small>Request</small></div><div className="arch-connector"><span>HTTPS</span><i /></div>
                <div className="arch-node api-node"><Server size={19} /><span>API LAYER</span><small>Validate · Auth</small></div><div className="arch-connector"><span>ROUTE</span><i /></div>
                <div className="arch-node service-node"><Braces size={19} /><span>SERVICE</span><small>Business logic</small></div>
                <div className="arch-branch"><div className="branch-line" /><div className="branch-nodes"><div className="arch-node small-node"><span>POSTGRES</span><small>Persistent data</small></div><div className="arch-node small-node cache-node"><span>REDIS</span><small>Fast reads</small></div></div></div>
              </div>
              <div className="panel-footer mono"><span>TRACE ID: req_8f2a…</span><span>OBSERVABILITY FIRST</span></div>
            </motion.div>
            <div className="principles-list">
              {[
                { n: '01', title: 'Clarity over cleverness', text: 'Make boundaries and contracts easy to understand.', icon: Zap },
                { n: '02', title: 'Failure is a design case', text: 'Plan for retries, timeouts, invalid input, and partial outages.', icon: Shield },
                { n: '03', title: 'Measure what matters', text: 'Use logs, metrics, and tests to make behavior visible.', icon: Database },
                { n: '04', title: 'Security by default', text: 'Validate inputs, enforce access boundaries, and protect secrets.', icon: Cpu },
              ].map((item) => <motion.div className="principle" key={item.n} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}><span className="principle-number mono">{item.n}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowUpRight className="principle-arrow" size={17} /></motion.div>)}
            </div>
          </div>
        </section>

        <section className="experience-section section-wrap" id="experience">
          <motion.div className="section-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <div><p className="eyebrow"><span className="section-index">03 /</span> PROFESSIONAL EXPERIENCE</p><h2>Learning by<br /><span className="muted-heading">building real things.</span></h2></div>
            <p className="section-intro">Internship experience across mobile application development and the Internet Computer ecosystem.</p>
          </motion.div>
          <div className="experience-list">
            <motion.article className="experience-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
              <div className="experience-meta mono"><span>JULY 2026 — SEPTEMBER 2026</span><span>100XCODERS PLATFORM</span></div>
              <div className="experience-details">
                <p className="eyebrow">MOBILE DEVELOPMENT</p>
                <h3>App Developer Intern <span>— Manorekha</span></h3>
                <ul>
                  <li>Contributed to mobile application development using Flutter and Dart.</li>
                  <li>Worked on application features, API integration, and debugging to support a reliable user experience.</li>
                  <li>Collaborated on implementing and refining application functionality.</li>
                </ul>
              </div>
            </motion.article>
            <motion.article className="experience-card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
              <div className="experience-meta mono"><span>JUNE 2025 — AUGUST 2025</span></div>
              <div className="experience-details">
                <p className="eyebrow">BLOCKCHAIN DEVELOPMENT</p>
                <h3>Blockchain Developer Intern <span>— Kai Foundry</span></h3>
                <ul>
                  <li>Worked on decentralized application development within the Internet Computer Protocol ecosystem.</li>
                  <li>Collaborated with the BlockseBlock and ICP Hub India ecosystem on blockchain-based use cases.</li>
                  <li>Developed experience with decentralized application architecture and smart-contract-oriented workflows.</li>
                </ul>
              </div>
            </motion.article>
          </div>
        </section>

        <section className="about-section section-wrap" id="about">
          <div className="about-orbit" aria-hidden="true"><div className="about-orbit-core"><Terminal size={30} /></div><div className="about-orbit-ring ring-a" /><div className="about-orbit-ring ring-b" /><span className="orbit-tag mono tag-a">BUILD</span><span className="orbit-tag mono tag-b">SHIP</span><span className="orbit-tag mono tag-c">LEARN</span></div>
          <motion.div className="about-content" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <p className="eyebrow"><span className="section-index">04 /</span> A LITTLE CONTEXT</p>
            <h2>Curious by nature.<br /><span className="muted-heading">Engineer by practice.</span></h2>
            <p>My path has crossed mobile development, blockchain, and full-stack products. Each one has made me more interested in what sits underneath the interface: data models, service boundaries, integrations, and the systems that hold everything together.</p>
            <p>Now I'm sharpening that focus around backend engineering—building things that are easier to reason about, easier to operate, and more resilient when reality gets messy.</p>
            <div className="about-tags"><span>Product thinking</span><span>Systems mindset</span><span>Continuous learning</span></div>
            <a className="text-link about-link" href="https://www.linkedin.com/in/-akshat-goel" target="_blank" rel="noreferrer">More about my journey <ArrowUpRight size={16} /></a>
          </motion.div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-noise" aria-hidden="true" />
          <motion.div className="contact-content" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <p className="eyebrow"><span className="section-index">05 /</span> NEXT CONNECTION</p>
            <h2>Have a hard<br />problem? <span className="gradient-text">Good.</span></h2>
            <p>I'm interested in thoughtful teams, difficult engineering problems, and opportunities to build useful things.</p>
            <a className="button button-primary contact-button" href="https://mail.google.com/mail/?view=cm&fs=1&to=akshatgoel310805%40gmail.com">Start a conversation <ArrowUpRight size={17} /></a>
          </motion.div>
          <div className="contact-links"><a href="https://github.com/Akshat-hype" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/-akshat-goel" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a><a href="https://mail.google.com/mail/?view=cm&fs=1&to=akshatgoel310805%40gmail.com"><Mail size={17} /> Email <ArrowUpRight size={14} /></a></div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><a className="wordmark footer-wordmark" href="#home"><span className="wordmark-mark">a<span>.</span></span><span className="wordmark-label">AKSHAT GOEL <small>BUILT WITH CURIOSITY</small></span></a><span className="mono footer-note">DESIGNED IN THE DARK. BUILT FOR THE REAL WORLD.</span><a className="back-top mono" href="#home">BACK TO TOP ↑</a></footer>
      <div className="edge-glow" aria-hidden="true" />
      <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} />
      <div className="sr-only" aria-live="polite">{menuOpen ? 'Navigation menu open' : ''}</div>
      <div className="system-chip mono"><Radio size={12} /> INTERACTIVE PORTFOLIO <span className="chip-light" /></div>
    </div>
  )
}
