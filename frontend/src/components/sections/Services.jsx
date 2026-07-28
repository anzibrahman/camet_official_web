import { motion } from 'framer-motion'
import {
  FaCloud,
  FaDatabase,
  FaPuzzlePiece,
  FaCogs,
  FaNetworkWired,
  FaHeadset,
  FaCheckCircle,
  FaArrowRight,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const services = [
  {
    index: '01',
    stage: 'Sell',
    title: 'Tally Sales & Services',
    desc: 'Complete TallyPrime sales, setup, implementation, migration, and ongoing support for smooth business operations.',
    stat: 'End-to-end TallyPrime enablement',
    icon: FaPuzzlePiece,
    points: [
      'TallyPrime sales',
      'Installation & configuration',
      'Implementation & migration',
      'Annual support & maintenance',
      'Data synchronization',
      'Tally customization',
      'Training & user support',
    ],
  },
  {
    index: '02',
    stage: 'Modernize',
    title: 'Customized Software Solutions',
    desc: 'We design and develop customized applications based on your business requirements, integrating automation and reporting features that improve operational efficiency.',
    stat: 'Business-fit software delivery',
    icon: FaCogs,
    points: [
      'Requirement-based application development',
      'Workflow automation features',
      'Custom reporting modules',
      'Operational efficiency improvements',
      'Scalable business software solutions',
    ],
  },
  {
    index: '03',
    stage: 'Scale',
    title: 'Cloud Solutions & Web Application Development',
    desc: 'Secure cloud infrastructure and modern web applications that give your business reliable access, backup, and scalable digital operations.',
    stat: 'Cloud-ready business systems',
    icon: FaCloud,
    points: [
      'Cloud hosting for Tally',
      'Remote access',
      'Secure data backup',
      'Cloud infrastructure',
      'Multi-location access',
      'Secure, scalable web application development',
      'User-friendly business web solutions',
    ],
  },
]

const miniFeatures = [
  { icon: FaCloud, label: 'Cloud-ready access' },
  { icon: FaDatabase, label: 'Secure business data' },
  { icon: FaCogs, label: 'Custom workflow solutions' },
]

// Each stage gets a step darker, tying colour to progress: light (just starting)
// to full navy (the long-term, sustained relationship). Same blue family throughout,
// not three unrelated hues.
const cardStyles = [
  {
    card: 'bg-white border-slate-200',
    iconWrap: 'bg-[#0B1F3A] text-[#7DD3FC]',
    index: 'text-slate-100',
    stage: 'text-[#2F6FED]',
    heading: 'text-slate-900',
    body: 'text-slate-600',
    statPill: 'border-slate-200 bg-slate-50 text-slate-700',
    check: 'text-[#2F6FED]',
    divider: 'border-slate-100',
  },
  {
    card: 'bg-[#EAF1FF] border-[#D7E6FF]',
    iconWrap: 'bg-[#0B1F3A] text-[#7DD3FC]',
    index: 'text-[#CFE0FF]',
    stage: 'text-[#1C4FC0]',
    heading: 'text-slate-900',
    body: 'text-slate-700',
    statPill: 'border-[#C6DBFF] bg-white/70 text-slate-700',
    check: 'text-[#1C4FC0]',
    divider: 'border-[#D7E6FF]',
  },
  {
    card: 'bg-[#0B1F3A] border-[#12294a]',
    iconWrap: 'bg-[#2F6FED] text-white',
    index: 'text-white/10',
    stage: 'text-[#7DD3FC]',
    heading: 'text-white',
    body: 'text-white/65',
    statPill: 'border-white/15 bg-white/[0.06] text-white/80',
    check: 'text-[#7DD3FC]',
    divider: 'border-white/10',
  },
]

function Services() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F7F9FC_0%,#FFFFFF_55%,#F4F7FB_100%)] py-10 md:py-12">
      <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />

      {/* faint schematic grid instead of pastel color blobs — reads as "system", not "confetti" */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro panel — solid navy, no full-bleed photo. A small framed image sits
            off to one side instead, so it reads as an accent, not a background. */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl bg-[#0B1F3A] px-6 py-7 shadow-[0_20px_50px_-28px_rgba(11,31,58,0.55)] ring-1 ring-white/[0.06] sm:px-8 md:flex-row md:px-10 md:py-8"
        >
          {/* layered depth: a subtle top sheen plus the two glows, instead of a flat fill */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_15%_-10%,rgba(56,189,248,0.14),transparent_60%)]" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#2F6FED]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-[#38BDF8]/10 blur-3xl" />

          {/* text content */}
          <div className="relative z-10 md:w-[62%]">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-[#38BDF8]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7DD3FC]">
                Services
              </p>
            </div>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl leading-[1.15]">
              Practical services for connected business operations.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
              We help businesses improve the way their systems work together through customization,
              integration, and dependable long-term support.
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {miniFeatures.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={index}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/85 backdrop-blur-md transition-colors hover:border-[#38BDF8]/40 hover:bg-white/[0.1]"
                  >
                    <Icon className="text-[#38BDF8] text-[10px]" />
                    <span>{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* small framed image, one side only, gently tilted rather than a full backdrop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            className="relative z-10 hidden shrink-0 md:block"
          >
            <div className="relative h-[200px] w-[250px] overflow-hidden rounded-xl border-4 border-white/10 shadow-[0_16px_36px_-15px_rgba(0,0,0,0.5)]">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/40 via-transparent to-[#0B1F3A]/10" />
            </div>
            <div className="absolute -bottom-3 -left-3 rounded-lg border border-white/10 bg-[#0B1F3A] px-2 py-1 shadow-lg">
              <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#7DD3FC]">Enterprise data hub</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Service pipeline — numbered stages with a connecting line, since these three
            are a real sequence (build → connect → sustain), not an arbitrary grid */}
        <div className="relative mt-6">
          <div className="pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent lg:block" />

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-5">
            {services.map((item, i) => {
              const Icon = item.icon
              const style = cardStyles[i]

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
                  className="group relative"
                >
                  {/* node on the pipeline */}
                  <div className="relative z-10 hidden items-center gap-2 lg:flex">
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-[#2F6FED] bg-white">
                      <span className="h-1 w-1 rounded-full bg-[#2F6FED]" />
                    </span>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2F6FED]">
                      {item.index} · {item.stage}
                    </span>
                  </div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`relative mt-2 overflow-hidden rounded-xl border p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 group-hover:shadow-[0_16px_36px_-20px_rgba(11,31,58,0.35)] ${style.card}`}
                  >
                    {/* subtle corner glow on hover, reinforcing the accent without adding new color */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#2F6FED]/0 blur-2xl transition-colors duration-300 group-hover:bg-[#2F6FED]/10" />

                    {/* mobile-only stage label, since the pipeline line is desktop-only */}
                    <span className={`relative mb-2 inline-block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] lg:hidden ${style.stage}`}>
                      {item.index} · {item.stage}
                    </span>

                    <div className="relative flex items-start justify-between gap-2">
                      <motion.div
                        whileHover={{ rotate: -8, scale: 1.08 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg shadow-sm ${style.iconWrap}`}
                      >
                        <Icon className="text-xs" />
                      </motion.div>
                      <span className={`text-3xl font-bold select-none ${style.index}`}>
                        {item.index}
                      </span>
                    </div>

                    <h3 className={`relative mt-3 text-base font-bold tracking-tight ${style.heading}`}>
                      {item.title}
                    </h3>

                    <p className={`relative mt-1 text-xs leading-5 ${style.body}`}>
                      {item.desc}
                    </p>

                    <div className={`relative mt-2.5 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${style.statPill}`}>
                      {item.stat}
                    </div>

                    <div className={`relative mt-2.5 space-y-1.5 border-t pt-2.5 ${style.divider}`}>
                      {item.points.map((point) => (
                        <div key={point} className={`flex items-start gap-2 text-xs ${style.body}`}>
                          <FaCheckCircle className={`mt-0.5 shrink-0 text-[10px] ${style.check}`} />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative mt-5 flex flex-col items-center justify-between gap-3 overflow-hidden rounded-xl bg-[#0B1F3A] px-5 py-4 text-center shadow-[0_16px_36px_-20px_rgba(11,31,58,0.55)] ring-1 ring-white/[0.06] md:flex-row md:text-left md:px-6"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse 60% 100% at 100% 50%, black 0%, transparent 70%)',
            }}
          />
          <div className="pointer-events-none absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#2F6FED]/20 blur-3xl" />

          <div className="relative z-10">
            <h3 className="text-sm font-bold text-white">
              Need a more tailored solution path?
            </h3>
            <p className="mt-0.5 text-xs text-white/60">
              We can assess your process and recommend the right customization,
              integration, or support model.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="relative z-10 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#2F6FED] px-4 py-2 text-xs font-medium text-white shadow-[0_10px_24px_-10px_rgba(47,111,237,0.7)] transition hover:bg-[#2560D6]"
            >
              Talk to our team
              <FaArrowRight className="text-[9px]" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services