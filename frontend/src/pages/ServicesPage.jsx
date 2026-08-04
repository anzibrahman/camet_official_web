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
  FaLaptopCode,
  FaTools,
  FaUsersCog,
  FaServer,
  FaChartLine,
  FaClipboardCheck,
  FaLifeRing,
  FaSyncAlt,
  FaChalkboardTeacher,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Tally Sales & Services',
    icon: FaPuzzlePiece,
    short: 'Complete TallyPrime solutions for sales, setup, and ongoing business support.',
    description:
      'We provide end-to-end TallyPrime sales, installation, implementation, migration, customization, and support services for smooth business operations.',
    features: [
      'TallyPrime sales',
      'Installation & configuration',
      'Implementation & migration',
      'Annual support & maintenance',
      'Data synchronization',
      'Tally customization',
      'Training & user support',
    ],
    accent: 'from-sky-500 to-blue-600',
  },
  {
    title: 'Customized Software Solutions',
    icon: FaCogs,
    short: 'Business-fit applications designed around your workflow.',
    description:
      'We design and develop customized applications based on your business requirements, integrating automation and reporting features that improve operational efficiency.',
    features: [
      'Requirement-based application development',
      'Workflow automation features',
      'Custom reporting modules',
      'Operational efficiency improvements',
      'Scalable business software solutions',
    ],
    accent: 'from-violet-500 to-indigo-600',
  },
  {
    title: 'Cloud Solutions & Web Development',
    icon: FaCloud,
    short: 'Secure cloud infrastructure and modern web apps.',
    description:
      'Secure cloud infrastructure and modern web applications that give your business reliable access, backup, and scalable digital operations.',
    features: [
      'Cloud hosting for Tally',
      'Remote access',
      'Secure data backup',
      'Cloud infrastructure',
      'Multi-location access',
      'Secure web application development',
      'User-friendly business web solutions',
    ],
    accent: 'from-cyan-500 to-sky-600',
  },
  {
    title: 'Implementation & Migration',
    icon: FaSyncAlt,
    short: 'Move from old systems to modern workflows without disruption.',
    description:
      'We handle full implementation planning and data migration so your team can transition to new systems safely, accurately, and with minimum downtime.',
    features: [
      'Legacy data migration',
      'New system rollout',
      'Configuration planning',
      'Workflow mapping',
      'Testing and validation',
      'Go-live support',
    ],
    accent: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Training & User Support',
    icon: FaChalkboardTeacher,
    short: 'Help your team learn and use the system confidently.',
    description:
      'We provide structured training sessions and user support so your staff can use the software effectively and your business can run more efficiently.',
    features: [
      'On-site training sessions',
      'Online training programs',
      'User manual documentation',
      'Video tutorials',
      '24/7 help desk support',
      'Remote assistance',
    ],
    accent: 'from-orange-500 to-amber-600',
  },
  {
    title: 'IT Consulting & Support',
    icon: FaHeadset,
    short: 'Guidance to improve your technology and business processes.',
    description:
      'We help businesses choose the right technology stack, improve operations, and maintain reliable systems with professional consulting and support.',
    features: [
      'IT strategy planning',
      'System architecture design',
      'Process automation',
      'Security audits',
      'Performance optimization',
      'Technical support',
    ],
    accent: 'from-pink-500 to-rose-600',
  },
]

const highlights = [
  { icon: FaDatabase, label: 'Secure business data' },
  { icon: FaNetworkWired, label: 'Connected systems' },
  { icon: FaUsersCog, label: 'Team enablement' },
]

function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071426] pt-28 pb-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.14),transparent_30%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:56px_56px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
          >
            <div>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-sky-200">
                Professional Services
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl leading-[1.05]">
                Absolute service solutions for modern business operations.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 md:text-base">
                From Tally sales and migration to cloud solutions, software development, training,
                and ongoing support, we deliver services that help your business work smarter.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {highlights.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 backdrop-blur-sm"
                    >
                      <Icon className="text-sky-300" />
                      <span>{item.label}</span>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-600"
                >
                  Talk to our team
                  <FaArrowRight className="text-xs" />
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
                >
                  View services
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="relative hidden justify-self-end lg:block"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-md">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/10 p-5">
                    <FaLaptopCode className="text-3xl text-sky-300" />
                    <h3 className="mt-4 text-lg font-semibold">Software</h3>
                    <p className="mt-1 text-sm text-white/70">Custom applications</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-5">
                    <FaCloud className="text-3xl text-cyan-300" />
                    <h3 className="mt-4 text-lg font-semibold">Cloud</h3>
                    <p className="mt-1 text-sm text-white/70">Access anywhere</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-5">
                    <FaSyncAlt className="text-3xl text-emerald-300" />
                    <h3 className="mt-4 text-lg font-semibold">Migration</h3>
                    <p className="mt-1 text-sm text-white/70">Safe transition</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-5">
                    <FaChalkboardTeacher className="text-3xl text-orange-300" />
                    <h3 className="mt-4 text-lg font-semibold">Training</h3>
                    <p className="mt-1 text-sm text-white/70">User support</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative -mt-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`h-2 bg-gradient-to-r ${service.accent}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${service.accent} text-white shadow-lg`}>
                        <Icon className="text-xl" />
                      </div>
                      <span className="text-3xl font-bold text-slate-100 select-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-slate-500">
                      {service.short}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {service.description}
                    </p>

                    <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Key features
                      </p>
                      <div className="mt-3 space-y-2">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                            <FaCheckCircle className="mt-0.5 shrink-0 text-sky-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#071426] px-6 py-10 text-center text-white shadow-xl">
            <h2 className="text-2xl font-bold md:text-3xl">
              Need a custom service plan for your business?
            </h2>
            <p className="mt-3 text-sm text-white/70 md:text-base">
              We can help you choose the right service, add migration support, and train your team.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-600"
              >
                Get in touch
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage