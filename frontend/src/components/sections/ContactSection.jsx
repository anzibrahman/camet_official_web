import { motion } from 'framer-motion'
import Button from '../common/Button'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

const ACCENT = '#4FD1E8'

const SERVICES = ['Tally Solutions', 'Cloud Services', 'Custom Software']

const CONTACTS = [
  { icon: FaPhoneAlt, label: 'Phone', value: '+91 82818 70533' },
  { icon: FaEnvelope, label: 'Email', value: 'info@cametitsolutions.com' },
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Kerala, India' },
]

const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

function ContactCard({ icon: Icon, label, value }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22 }}
      className="flex items-center gap-3 rounded-[18px] border border-white/15 bg-white/10 p-4 shadow-[0_16px_32px_-22px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.14]"
    >
      <div
        style={{ background: 'rgba(79,209,232,0.18)', color: ACCENT }}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
      >
        <Icon className="text-[14px]" />
      </div>

      <div className="min-w-0 text-left">
        <p className="text-[9px] uppercase tracking-[0.18em] text-white/55">{label}</p>
        <p className="mt-0.5 truncate text-[13px] font-semibold text-white">{value}</p>
      </div>
    </motion.div>
  )
}

function ContactSection() {
  return (
    <section
      style={{
        background:
          'linear-gradient(135deg, #060A12 0%, #0C1B2E 30%, #123449 58%, #17607A 82%, #1C8AA0 100%)',
      }}
      className="relative overflow-hidden py-12 md:py-14 lg:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN}")`, backgroundSize: '180px 180px' }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-[6%] h-[320px] w-[320px] rounded-full opacity-25 blur-[110px]"
        style={{ background: '#2ea3c5' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-15%] right-[2%] h-[340px] w-[340px] rounded-full opacity-20 blur-[120px]"
        style={{ background: '#6C6FE0' }}
      />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.08]"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M0 140 H260 V260 H520 V140 H760" stroke="white" strokeWidth="1.5" />
        <path d="M1440 620 H1180 V500 H920 V620 H700" stroke="white" strokeWidth="1.5" />
        <circle cx="260" cy="140" r="4" fill="white" />
        <circle cx="520" cy="260" r="4" fill="white" />
        <circle cx="1180" cy="620" r="4" fill="white" />
        <circle cx="920" cy="500" r="4" fill="white" />
      </svg>

      <div className="relative mx-auto flex min-h-[calc(100dvh-80px)] max-w-5xl flex-col justify-center px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-white/75 backdrop-blur-sm">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: ACCENT, boxShadow: '0 0 0 3px rgba(79,209,232,0.25)' }}
            />
            Get in touch
          </span>

          <h2 className="mt-4 text-[28px] font-light leading-[1.08] text-white sm:text-[34px] md:text-[42px]">
            Let&rsquo;s transform your business{' '}
            <span style={{ color: ACCENT }} className="font-medium">
              digitally
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-6 text-white/65">
            Looking for Tally solutions, cloud services, or customized software for your
            business? Our experts are ready to help you choose the right technology solution.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {SERVICES.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[10px] font-medium text-white/80 backdrop-blur-sm"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0C1B2E] shadow-[0_16px_32px_-14px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-0.5"
            >
              Book free consultation
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>

            <Button
              to="/services"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text- transition-all "
            >
              Explore services
            </Button>
          </div>

          <div className="mx-auto mt-5 flex items-center justify-center gap-2 text-[12px] leading-5 text-white/60">
            <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
            Free consultation and product demonstration included.
          </div>
        </motion.div>

        <div className="relative mx-auto mt-8 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
          {CONTACTS.map((c) => (
            <ContactCard key={c.label} {...c} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactSection