import { motion, useInView, useMotionValue, useMotionTemplate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Button from '../common/Button'
import founder1Img from '../../assets/WhatsApp Image 2026-07-14 at 11.41.45 AM.jpeg'
import founder2Img from '../../assets/WhatsApp Image 2026-07-14 at 11.41.54 AM.jpeg'
import founder3Img from '../../assets/image.png'
import founder4Img from '../../assets/image2.png'
import founder5Img from '../../assets/image1.png'

/**
 * Fonts used by this section — add once, globally (e.g. index.html <head>):
 *
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
 *
 * Design concept: "connected systems" — CAMET links separate business tools (Tally,
 * ERP, custom software) into one working whole, so the page treats each idea as a
 * colored node in a small constellation, and every card carries its own accent color
 * rather than one repeated brand color. Dark indigo canvas so the palette can breathe.
 */

const fontDisplay = { fontFamily: '"Plus Jakarta Sans", "Poppins", sans-serif' }
const fontMono = { fontFamily: '"JetBrains Mono", "Menlo", monospace' }

const BG = '#161233'
const BG_2 = '#1D1850'
const CARD = 'rgba(255,255,255,0.05)'
const CARD_BORDER = 'rgba(255,255,255,0.10)'
const TEXT = '#F6F4FF'
const MUTED = '#ADA6D6'

const BLUE = '#5B8DEF'
const VIOLET = '#A78BFA'
const CORAL = '#FB7185'
const MINT = '#34D399'
const AMBER = '#FBBF24'

const fadeUp = {
  hidden: { opacity: 0, y: 46 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const pillars = [
  {
    label: 'Vision',
    color: BLUE,
    text: 'CAMET IT Solutions is more than a software company. We build dependable digital systems for businesses that value clarity, structure, and long-term growth.',
  },
  {
    label: 'Systems',
    color: VIOLET,
    text: 'From TallyPrime implementations to ERP solutions, add-ons, and custom software, our focus has always been on creating connected experiences that simplify operations and support confident decision-making.',
  },
  {
    label: 'People',
    color: CORAL,
    text: 'Every engagement is shaped with intent, careful planning, and a practical understanding of how real businesses operate. We believe technology should feel purposeful, elegant, and easy to trust.',
  },
]

const stats = [
  { label: 'Years of Experience', value: 10, suffix: '+', color: BLUE },
  { label: 'Projects Delivered', value: 1000, suffix: '+', display: '1,000+', color: MINT },
  { label: 'Active Clients', value: 500, suffix: '+', color: AMBER },
  { label: 'Team Experts', value: 50, suffix: '+', color: CORAL },
]

const people = [
  { name: 'Aarav Mehta', role: 'CEO & Founder', image: founder1Img, color: BLUE },
  { name: 'Riya Sharma', role: 'Co-Founder', image: founder2Img, color: VIOLET },
  { name: 'Karan Patel', role: 'Co-Founder', image: founder3Img, color: CORAL },
  { name: 'Neha Verma', role: 'Co-Founder', image: founder4Img, color: MINT },
  { name: 'Devansh Rao', role: 'Co-Founder', image: founder5Img, color: AMBER },
]

const nodes = [
  { x: 8, y: 18, color: BLUE },
  { x: 34, y: 6, color: VIOLET },
  { x: 58, y: 22, color: CORAL },
  { x: 22, y: 42, color: MINT },
  { x: 48, y: 48, color: AMBER },
]
const links = [
  [0, 1], [1, 2], [0, 3], [3, 4], [1, 4],
]

function CountUp({ value, suffix = '', display, duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.floor(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span className="tabular-nums">
      {display ? (n >= value ? display : n.toLocaleString()) : `${n.toLocaleString()}${suffix}`}
    </span>
  )
}

function About() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(167,139,250,0.10), transparent 70%)`

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: `linear-gradient(180deg, ${BG} 0%, ${BG_2} 100%)`, color: TEXT }}
    >
      {/* colorful gradient mesh */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 50, -10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full blur-[110px] z-0"
        style={{ background: BLUE, opacity: 0.28 }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -40, 20, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-[10%] right-[-140px] w-[420px] h-[420px] rounded-full blur-[110px] z-0"
        style={{ background: VIOLET, opacity: 0.28 }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 30, -20, 0], y: [0, -15, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-[-140px] left-[28%] w-[380px] h-[380px] rounded-full blur-[110px] z-0"
        style={{ background: CORAL, opacity: 0.22 }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -25, 15, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-[6%] right-[8%] w-[300px] h-[300px] rounded-full blur-[100px] z-0"
        style={{ background: MINT, opacity: 0.2 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ background: spotlight }} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-24 items-start">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-2xl relative"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BLUE }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: VIOLET }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CORAL }} />
              <p style={fontMono} className="text-[11px] uppercase tracking-[0.4em]">
                <span style={{ color: MUTED }}>About Us</span>
              </p>
            </motion.div>

            {/* constellation — signature element, tucked behind the headline */}
            <svg
              aria-hidden="true"
              viewBox="0 0 70 60"
              className="pointer-events-none absolute -top-6 -left-10 w-[280px] h-[240px] hidden lg:block opacity-70 z-0"
            >
              {links.map(([a, b], i) => (
                <motion.line
                  key={i}
                  x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
                  stroke="rgba(255,255,255,0.18)" strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.15 }}
                />
              ))}
              {nodes.map((n, i) => (
                <motion.circle
                  key={i}
                  cx={n.x} cy={n.y} r="1.6"
                  fill={n.color}
                  animate={{ r: [1.6, 2.2, 1.6] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </svg>

            <motion.h2
              variants={fadeUp}
              style={fontDisplay}
              className="relative font-extrabold text-[40px] sm:text-[52px] md:text-[62px] leading-[1.06] tracking-tight mb-10"
            >
              An invitation to
              <br />
              build with{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(90deg, ${BLUE}, ${VIOLET} 55%, ${CORAL})` }}
              >
                vision
              </span>
              .
            </motion.h2>

            <div className="space-y-5">
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.label}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="group relative rounded-2xl p-6 transition-colors duration-300"
                  style={{ backgroundColor: CARD, border: `1px solid ${CARD_BORDER}` }}
                >
                  <div
                    className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full transition-all duration-300 group-hover:w-[4px]"
                    style={{ backgroundColor: pillar.color }}
                  />
                  <div className="pl-4">
                    <p
                      style={{ ...fontDisplay, color: pillar.color }}
                      className="text-[13px] font-bold uppercase tracking-[0.2em] mb-2"
                    >
                      {pillar.label}
                    </p>
                    <p style={fontDisplay} className="text-[15px] md:text-[16px] leading-[1.75] font-normal">
                      <span style={{ color: MUTED }}>{pillar.text}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mt-4 lg:mt-16 grid grid-cols-2 gap-4"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-2xl p-6 text-center"
                  style={{
                    background: `linear-gradient(155deg, ${stat.color}26, rgba(255,255,255,0.04))`,
                    border: `1px solid ${stat.color}40`,
                  }}
                >
                  <div
                    className="text-4xl md:text-5xl mb-2 font-extrabold tabular-nums"
                    style={{ ...fontDisplay, color: stat.color }}
                  >
                    <CountUp value={stat.value} suffix={stat.suffix} display={stat.display} />
                  </div>
                  <div style={fontMono} className="text-[10px] uppercase tracking-[0.2em]">
                    <span style={{ color: MUTED }}>{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
                className="relative rounded-[24px] p-[2px] shadow-[0_30px_70px_-25px_rgba(91,141,239,0.35)]"
                style={{ background: `linear-gradient(120deg, ${BLUE}, ${VIOLET}, ${CORAL})` }}
              >
                <div className="overflow-hidden rounded-[22px]" style={{ backgroundColor: BG }}>
                  <iframe
                    className="w-full aspect-video"
                    src="https://www.youtube.com/embed/vZhRWdRo7nk"
                    title="Bharat Connect video"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            >
              <Button
                to="/contact"
                className="inline-flex w-fit items-center rounded-full text-white uppercase tracking-[0.28em] text-[11px] px-8 py-3.5 transition-all duration-300 hover:-translate-y-1 shadow-[0_15px_35px_-10px_rgba(167,139,250,0.6)]"
                style={{ ...fontMono, background: `linear-gradient(90deg, ${BLUE}, ${VIOLET})` }}
              >
                Read More
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 lg:mt-28"
        >
          <div className="flex items-center justify-between mb-8">
            <p style={fontMono} className="text-[11px] uppercase tracking-[0.4em]">
              <span style={{ color: MUTED }}>// The Team</span>
            </p>
            <p style={fontMono} className="text-[10px] uppercase tracking-[0.3em]">
              <span style={{ color: MUTED }}>{people.length} People</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {people.map((person) => (
              <motion.div
                key={person.name}
                variants={fadeUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-[24px] p-[2px]"
                style={{ background: `linear-gradient(160deg, ${person.color}, rgba(255,255,255,0.06))` }}
              >
                <div className="rounded-[22px] overflow-hidden" style={{ backgroundColor: BG_2 }}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(0deg, ${BG_2}E6 0%, transparent 55%)` }}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute inset-x-4 bottom-4 rounded-2xl px-3 py-3"
                      style={{ backgroundColor: 'rgba(22,18,51,0.55)', border: `1px solid ${person.color}66`, backdropFilter: 'blur(6px)' }}
                    >
                      <p style={fontMono} className="text-[10px] uppercase tracking-[0.2em]">
                        <span style={{ color: person.color }}>Leadership</span>
                      </p>
                      <p style={fontDisplay} className="mt-1 text-[12px] text-white/95 leading-5">
                        Building systems that simplify business growth.
                      </p>
                    </motion.div>
                  </div>

                  <div className="px-3 py-4 text-center">
                    <h4 style={fontDisplay} className="text-[14px] font-bold uppercase tracking-[0.06em]">
                      {person.name}
                    </h4>
                    <p style={fontMono} className="text-[9.5px] uppercase tracking-[0.2em] mt-1.5">
                      <span style={{ color: person.color }}>{person.role}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About