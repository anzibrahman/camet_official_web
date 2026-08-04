import { motion } from 'framer-motion'
import Button from '../common/Button'
import {
  FaSlack,
  FaGoogle,
  FaRegCircle,
  FaChartLine,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa'
import { SiZoom, SiClickup } from 'react-icons/si'
import { Sparkles } from 'lucide-react'

const floatingNodes = [
  { icon: SiZoom, className: 'left-[8%] top-[22%]' },
  { icon: FaSlack, className: 'left-[14%] top-[58%]' },
  { icon: FaChartLine, className: 'left-[26%] top-[34%]' },
  { icon: Sparkles, className: 'left-[48%] top-[18%]' },
  { icon: FaGoogle, className: 'right-[24%] top-[30%]' },
  { icon: SiClickup, className: 'right-[16%] top-[58%]' },
  { icon: FaRegCircle, className: 'right-[10%] top-[42%]' },
]

function FloatingNode({ icon: Icon, className }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute hidden lg:flex h-11 w-11 items-center justify-center rounded-[18px] border border-[#d8d8d8] bg-white/92 shadow-[0_12px_24px_rgba(0,0,0,0.07)] ${className}`}
    >
      <Icon className="text-[15px] text-[#2b2f31]" />
    </motion.div>
  )
}

function ContactCard({ icon: Icon, label, value }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group rounded-[20px] border border-white/70 bg-white/70 backdrop-blur-md p-5 shadow-[0_14px_35px_rgba(15,23,42,0.06)]"
    >
      <div className="w-11 h-11 mx-auto mb-4 rounded-full bg-[#edf8fb] flex items-center justify-center text-[#2ea3c5] transition-colors duration-300 group-hover:bg-[#2ea3c5] group-hover:text-white">
        <Icon className="text-[16px]" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.24em] text-[#7b807d] text-center mb-2">
        {label}
      </p>
      <p className="text-[14px] md:text-[15px] font-medium text-[#20231f] text-center break-words">
        {value}
      </p>
    </motion.div>
  )
}

function ContactSection() {
  return (
    <section className="relative overflow-hidden bg-[#e9e9e7] py-14 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(226,232,240,0.75),transparent_28%)]" />

      <div className="absolute inset-0 opacity-35 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M20 180C170 120 240 260 360 220C500 175 580 120 710 180C830 235 900 330 1040 285C1160 245 1230 170 1420 220"
            stroke="url(#contactLine1)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M40 520C160 470 280 620 420 560C560 500 700 420 830 470C950 518 1030 650 1170 600C1280 560 1340 520 1420 555"
            stroke="url(#contactLine2)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M120 760C250 690 360 790 510 735C650 685 760 640 900 690C1040 740 1140 830 1360 775"
            stroke="url(#contactLine3)"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="contactLine1" x1="20" y1="180" x2="1420" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d6d3d1" />
              <stop offset="0.5" stopColor="#bfbfbf" />
              <stop offset="1" stopColor="#e7e5e4" />
            </linearGradient>
            <linearGradient id="contactLine2" x1="40" y1="520" x2="1420" y2="555" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e5e7eb" />
              <stop offset="0.5" stopColor="#cbd5e1" />
              <stop offset="1" stopColor="#e7e5e4" />
            </linearGradient>
            <linearGradient id="contactLine3" x1="120" y1="760" x2="1360" y2="775" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d4d4d8" />
              <stop offset="0.5" stopColor="#cbd5e1" />
              <stop offset="1" stopColor="#f5f5f4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {floatingNodes.map((node, index) => (
        <FloatingNode key={index} icon={node.icon} className={node.className} />
      ))}

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center rounded-full border border-[#d5d7d4] bg-white/75 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#6c716f]">
            Let’s Connect
          </span>

          <h2 className="mt-4 text-[30px] sm:text-[38px] md:text-[48px] font-light leading-[1.05] text-[#1d201e]">
            Ready to <span className="text-[#2ea3c5]">transform</span> your business systems?
          </h2>

          <p className="mt-4 text-[14px] md:text-[16px] leading-7 text-[#666b68] max-w-2xl mx-auto">
            Partner with a team that builds connected software experiences, reliable integrations,
            and long-term support for growing businesses.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8 mb-10">
            <Button
              to="/contact"
              className="bg-[#20231f] text-white hover:bg-[#2d312d] px-7 py-3 rounded-full text-[11px] uppercase tracking-[0.22em] shadow-lg transition-all hover:-translate-y-1"
            >
              Start Your Project
            </Button>

            <Button
              to="/services"
              className="bg-white/65 border border-[#d5d7d4] text-[#20231f] hover:bg-white px-7 py-3 rounded-full text-[11px] uppercase tracking-[0.22em] transition-all"
            >
              View All Services
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ContactCard
              icon={FaPhoneAlt}
              label="Phone"
              value="+91 XXXXX XXXXX"
            />
            <ContactCard
              icon={FaEnvelope}
              label="Email"
              value="Admin@camet.in"
            />
            <ContactCard
              icon={FaMapMarkerAlt}
              label="Location"
              value="Kerala, India"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection