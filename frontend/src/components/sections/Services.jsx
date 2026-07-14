import { motion } from 'framer-motion'
import {
  FaCogs,
  FaPuzzlePiece,
  FaCloud,
  FaDatabase,
  FaTools,
  FaHospital,
  FaTruck,
  FaShoppingCart,
  FaUserShield,
  FaCodeBranch,
  FaChartLine,
  FaMobileAlt,
  FaNetworkWired,
  FaHeadset,
  FaChevronRight,
  FaCheck,
  FaIndustry,
} from 'react-icons/fa'

const fontDisplay = { fontFamily: '"Plus Jakarta Sans", "Poppins", sans-serif' }
const fontMono = { fontFamily: '"JetBrains Mono", "Menlo", monospace' }

const BG_TOP = '#EEF4FF'
const BG_BOTTOM = '#FBFCFF'
const GLASS = 'rgba(255,255,255,0.6)'
const INK = '#1C2033'
const MUTED = '#5C6178'

const BLUE = '#5B8DEF'
const VIOLET = '#A78BFA'
const MINT = '#22B37E'
const CORAL = '#FB7185'
const AMBER = '#E8A317'

const serviceGroups = [
  {
    id: 'services',
    eyebrow: 'Core Services',
    title: 'Services that move business systems forward.',
    description:
      'From software sales to cloud delivery, we help businesses adopt, extend, and manage digital systems with clarity and long-term reliability.',
    icon: FaCogs,
    color: BLUE,
    items: [
      'Software Sales & Licensing',
      'Software Customization',
      'System Integration',
      'API Integration Services',
      'Data Migration',
      'Cloud Solutions',
      'Annual Maintenance & Support (AMC)',
    ],
  },
  {
    id: 'development',
    eyebrow: 'Customization & Development',
    title: 'Built around your workflow, not the other way around.',
    description:
      'This is our core strength area, where we analyze requirements, design custom modules, automate workflows, and deliver operational visibility through reports and dashboards.',
    icon: FaCodeBranch,
    color: VIOLET,
    items: [
      'Requirement Analysis Process',
      'Custom Module Development',
      'Workflow Automation',
      'Reports & Dashboards',
      'Third-party Integrations',
      'Case Examples',
    ],
  },
  {
    id: 'integration',
    eyebrow: 'Integration Solutions',
    title: 'Technical integration built for connected operations.',
    description:
      'We connect ERP, CRM, commerce, tax, payment, mobile, and legacy systems so your business tools exchange data smoothly and reliably.',
    icon: FaNetworkWired,
    color: MINT,
    items: [
      'ERP–CRM Integration',
      'Payment Gateway Integration',
      'GST / Tax Integration',
      'E-commerce Integration',
      'Mobile App Integration',
      'Legacy System Integration',
    ],
  },
  {
    id: 'industries',
    eyebrow: 'Industries We Serve',
    title: 'Solutions shaped for real industry workflows.',
    description:
      'Our systems are adapted to the working patterns, reporting needs, and operational realities of different sectors, helping businesses deploy software with better fit and faster adoption.',
    icon: FaIndustry,
    color: AMBER,
    items: [
      'Manufacturing',
      'Retail & Wholesale',
      'Healthcare',
      'Education',
      'Logistics & Transport',
      'Construction',
      'Agriculture / FMCG',
    ],
  },
  {
    id: 'support',
    eyebrow: 'Support & AMC',
    title: 'Post-sales support that keeps systems stable.',
    description:
      'Our support and AMC model gives clients service continuity through structured plans, SLA commitments, issue tracking, remote and on-site support, and upgrade management.',
    icon: FaHeadset,
    color: CORAL,
    items: [
      'Support Plans',
      'SLA Details',
      'Ticketing Process',
      'Remote & On-site Support',
      'Upgrade & Patch Management',
    ],
  },
]

const floatingIcons = [
  { icon: FaDatabase, className: 'top-10 left-[10%]', color: BLUE },
  { icon: FaCloud, className: 'top-20 right-[12%]', color: VIOLET },
  { icon: FaPuzzlePiece, className: 'top-[40%] left-[18%]', color: MINT },
  { icon: FaChartLine, className: 'bottom-20 right-[20%]', color: CORAL },
  { icon: FaMobileAlt, className: 'bottom-14 left-[8%]', color: AMBER },
  { icon: FaShoppingCart, className: 'top-[54%] right-[8%]', color: BLUE },
  { icon: FaHospital, className: 'bottom-28 left-[28%]', color: VIOLET },
  { icon: FaTruck, className: 'top-[18%] left-[42%]', color: MINT },
  { icon: FaUserShield, className: 'bottom-[16%] right-[38%]', color: CORAL },
  { icon: FaTools, className: 'top-[12%] right-[34%]', color: AMBER },
]

function Services() {
  return (
    <section
      className="relative overflow-hidden py-4 md:py-6"
      style={{ background: `linear-gradient(180deg, ${BG_TOP} 0%, ${BG_BOTTOM} 100%)`, color: INK }}
    >
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 40, -10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-28 -left-28 w-[320px] h-[320px] rounded-full blur-[90px] z-0"
        style={{ background: BLUE, opacity: 0.12 }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -35, 20, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-[12%] right-[-100px] w-[280px] h-[280px] rounded-full blur-[90px] z-0"
        style={{ background: VIOLET, opacity: 0.12 }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 25, -20, 0], y: [0, -15, 20, 0] }}
        transition={{ duration: 23, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-[-100px] left-[30%] w-[260px] h-[260px] rounded-full blur-[80px] z-0"
        style={{ background: MINT, opacity: 0.1 }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -20, 15, 0], y: [0, 18, -10, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-[8%] right-[6%] w-[220px] h-[220px] rounded-full blur-[80px] z-0"
        style={{ background: CORAL, opacity: 0.1 }}
      />

      <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M40 180C180 120 240 260 360 230C500 195 560 120 690 180C790 225 860 330 980 290C1110 245 1170 160 1400 220"
            stroke="url(#line1)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M80 520C180 460 260 620 410 560C550 500 650 410 790 470C900 515 1000 660 1150 600C1260 555 1320 510 1410 560"
            stroke="url(#line2)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M120 760C280 680 350 800 500 740C660 675 710 620 860 680C1000 735 1110 840 1360 780"
            stroke="url(#line3)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="line1" x1="40" y1="180" x2="1400" y2="220" gradientUnits="userSpaceOnUse">
              <stop stopColor={BLUE} stopOpacity="0.25" />
              <stop offset="0.5" stopColor={VIOLET} stopOpacity="0.2" />
              <stop offset="1" stopColor={BLUE} stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="line2" x1="80" y1="520" x2="1410" y2="560" gradientUnits="userSpaceOnUse">
              <stop stopColor={MINT} stopOpacity="0.22" />
              <stop offset="0.5" stopColor={BLUE} stopOpacity="0.16" />
              <stop offset="1" stopColor={MINT} stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="line3" x1="120" y1="760" x2="1360" y2="780" gradientUnits="userSpaceOnUse">
              <stop stopColor={CORAL} stopOpacity="0.2" />
              <stop offset="0.5" stopColor={AMBER} stopOpacity="0.16" />
              <stop offset="1" stopColor={CORAL} stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {floatingIcons.map((item, index) => {
        const Icon = item.icon
        return (
          <motion.div
            key={index}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute ${item.className} hidden xl:flex h-6 w-6 items-center justify-center rounded-md backdrop-blur-md z-0`}
            style={{
              backgroundColor: GLASS,
              border: `1px solid ${item.color}33`,
              boxShadow: `0 6px 12px -10px ${item.color}55`,
            }}
          >
            <Icon style={{ color: item.color }} className="text-[9px]" />
          </motion.div>
        )
      })}

      <div className="relative z-20 max-w-5xl mx-auto px-3 sm:px-4 lg:px-5">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="max-w-lg"
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: BLUE }} />
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: VIOLET }} />
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: CORAL }} />
            <p style={fontMono} className="text-[8px] uppercase tracking-[0.28em]">
              <span style={{ color: MUTED }}>Services Ecosystem</span>
            </p>
          </div>

          <h2
            style={fontDisplay}
            className="font-extrabold tracking-tight text-[18px] sm:text-[21px] md:text-[24px] leading-[1.1]"
          >
            Integration, customization, support, and business systems built to work{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(90deg, ${BLUE}, ${VIOLET} 55%, ${CORAL})` }}
            >
              together
            </span>
            .
          </h2>

          <p style={fontDisplay} className="mt-1 text-[11px] leading-4.5 max-w-md font-normal">
            <span style={{ color: MUTED }}>
              Our services are structured to help businesses adopt software with clarity, connect platforms without friction, and scale operations with dependable support.
            </span>
          </p>
        </motion.div>

        <div className="mt-3 grid grid-cols-1 lg:grid-cols-12 gap-2.5 lg:gap-3">
          {serviceGroups.map((group, index) => {
            const Icon = group.icon
            const large = index === 0 || index === 2 || index === 4

            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className={`${large ? 'lg:col-span-7' : 'lg:col-span-5'} relative overflow-hidden rounded-[14px] bg-white`}
                style={{ boxShadow: `0 16px 32px -24px rgba(28,32,51,0.35)` }}
              >
                <div
                  className="relative overflow-hidden px-3 py-3 md:px-4 md:py-3.5"
                  style={{ backgroundColor: group.color }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
                      backgroundSize: '12px 12px',
                    }}
                  />
                  <Icon
                    aria-hidden="true"
                    className="absolute -right-1 -bottom-2 text-[48px] opacity-[0.14] pointer-events-none"
                    style={{ color: '#FFFFFF' }}
                  />
                  <span
                    aria-hidden="true"
                    style={fontDisplay}
                    className="absolute right-2 top-1 text-[26px] font-extrabold leading-none opacity-[0.16] select-none"
                  >
                    <span style={{ color: '#FFFFFF' }}>{String(index + 1).padStart(2, '0')}</span>
                  </span>

                  <div className="relative">
                    <span
                      style={fontMono}
                      className="inline-flex rounded-full px-1.5 py-0.5 text-[7px] uppercase tracking-[0.14em] bg-white/15 text-white"
                    >
                      {group.eyebrow}
                    </span>
                    <h3
                      style={fontDisplay}
                      className="mt-1 max-w-sm text-[13px] md:text-[14px] font-bold leading-tight text-white"
                    >
                      {group.title}
                    </h3>
                  </div>
                </div>

                <div className="relative px-3 md:px-4">
                  <div
                    className="absolute -top-4 left-3 md:left-4 h-8 w-8 rounded-lg flex items-center justify-center bg-white"
                    style={{ boxShadow: `0 8px 14px -10px ${group.color}88`, border: `1px solid ${group.color}30` }}
                  >
                    <Icon style={{ color: group.color }} className="text-[13px]" />
                  </div>
                </div>

                <div className="relative px-3 pb-3 pt-6 md:px-4 md:pb-4 md:pt-6">
                  <p style={fontDisplay} className="text-[10.5px] md:text-[11.5px] leading-4.5 max-w-xl font-normal">
                    <span style={{ color: MUTED }}>{group.description}</span>
                  </p>

                  <div className="mt-2.5 grid sm:grid-cols-2 sm:gap-x-3 gap-y-0">
                    {group.items.map((item, itemIndex) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: itemIndex * 0.03 }}
                        viewport={{ once: true }}
                        className="group/item flex items-center gap-1.5 py-0.5"
                      >
                        <span
                          className="flex h-[12px] w-[12px] shrink-0 items-center justify-center rounded-md"
                          style={{ backgroundColor: `${group.color}16` }}
                        >
                          <FaCheck style={{ color: group.color }} className="text-[5px]" />
                        </span>
                        <p style={fontDisplay} className="text-[10.5px] md:text-[11.5px] leading-4.5 font-medium">
                          <span style={{ color: INK }}>{item}</span>
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div
                    className="mt-2 flex items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.08em] cursor-pointer w-fit"
                    style={{ ...fontMono, color: group.color }}
                  >
                    Learn more
                    <FaChevronRight className="text-[6px]" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services