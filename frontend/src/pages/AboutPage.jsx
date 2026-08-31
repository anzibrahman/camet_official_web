import { motion } from 'framer-motion'
import {
  FaTrophy,
  FaLightbulb,
  FaHandshake,
  FaStar,
  FaAward,
  FaUsers,
  FaCalendarAlt,
  FaHeadset,
  FaCertificate,
  FaCheckCircle,
  FaMicrosoft,
} from 'react-icons/fa'
import {  SiZoho } from 'react-icons/si'
import { MdOutlineSecurity, MdBusinessCenter } from 'react-icons/md'
import Button from '../components/common/Button'
import { FaChartLine } from 'react-icons/fa'
import ceoImg from '../assets/image3.png'
import coFounder1Img from '../assets/WhatsApp Image 2026-07-28 at 2.38.57 PM (1).jpeg'
import coFounder2Img from '../assets/WhatsApp Image 2026-07-14 at 11.41.54 AM.jpeg'
import coFounder3Img from '../assets/image.png'
import coFounder4Img from '../assets/ChatGPT Image Jul 21, 2026, 02_14_10 PM.png'
import coFounder5Img from '../assets/WhatsApp Image 2026-08-20 at 12.24.34 PM.jpeg'
function AboutPage() {
  const values = [
    {
      title: 'Excellence',
      icon: FaTrophy,
      description:
        'We aim for quality, reliability, and precision in every implementation, customization, and software delivery.',
    },
    {
      title: 'Innovation',
      icon: FaLightbulb,
      description:
        'We adopt practical technology that improves business efficiency, reduces manual work, and supports growth.',
    },
    {
      title: 'Integrity',
      icon: FaHandshake,
      description:
        'We build lasting client relationships through honest guidance, clear communication, and accountable execution.',
    },
    {
      title: 'Customer First',
      icon: FaStar,
      description:
        'Every solution is shaped around real business operations, user adoption, and measurable long-term value.',
    },
  ]

  const credentials = [
    { icon: FaAward, value: '5-Star', label: 'Tally Partner Rating' },
    { icon: FaCalendarAlt, value: '10+', label: 'Years in Business' },
    { icon: FaUsers, value: '250+', label: 'Business Clients' },
    { icon: FaHeadset, value: '24/7', label: 'Support Coverage' },
  ]

  const certifications = [
    'Tally Certified Partner',
    'Structured Delivery Process',
    'Data Security Practices',
    'Documentation-led Implementation',
  ]

  const expertise = [
    'ERP implementation and business process digitization',
    'Tally customization and third-party integration support',
    'Custom software development for operational workflows',
    'Business automation, reporting, and process optimization',
    'Long-term support, AMC, and user enablement services',
    'Technology consulting for finance, inventory, HR, and operations',
  ]

  const partners = [
    {
      name: 'Microsoft',
      icon: FaMicrosoft,
      desc: 'Supports business productivity, collaboration, and modern digital infrastructure alignment.',
    },
    {
      name: 'BIZ ANALYST',
      icon: FaChartLine,
      desc: 'Brings enterprise process discipline and large-scale workflow understanding into solution planning.',
    },
    // {
    //   name: 'Zoho',
    //   icon: SiZoho,
    //   desc: 'Enables CRM, workflow, and business productivity integration opportunities.',
    // },
    {
      name: 'Tally',
      icon: MdBusinessCenter,
      desc: 'Supports accounting, inventory, compliance, and connected business operations.',
    },
  ]

  const ceoPillars = [
    {
      title: 'Client Trust First',
      description:
        'We prioritize long-term relationships by delivering dependable systems and clear business outcomes.',
    },
    {
      title: 'Operational Practicality',
      description:
        'Technology should simplify work on the ground and fit the realities of daily business operations.',
    },
    {
      title: 'Continuous Innovation',
      description:
        'We evolve with new tools and methods that create measurable value for our clients.',
    },
    {
      title: 'Accountable Delivery',
      description:
        'Execution matters as much as strategy, so we own timelines, communication, and support quality.',
    },
  ]

  const coFounders = [
    {
      name: 'Muhammed Riyas',
    
      image: coFounder1Img,
    },
    {
      name: 'Umesh',
    
      image: coFounder2Img,
    },
    {
      name: 'Sadhakhath',
    
      image: coFounder3Img,
    },
    {
      name: 'Ebby Manjooran',
     
      image: coFounder4Img,
    },
     {
      name: 'Naison Francis',
    
      image: coFounder5Img,
    },

  ]

  const teamStats = [
    { value: '40+', label: 'Implementation & Support Professionals' },
    { value: '10+', label: 'Domain Specialists' },
    { value: '1000+', label: 'Active Business Relationships' },
    { value: '4', label: 'Leadership Verticals' },
  ]

  const compliance = [
    'Role-based project ownership and escalation process',
    'Documented implementation and handover workflow',
    'Controlled access and data handling practices',
    'Support ticketing and response management discipline',
  ]

  const slidingPartners = [...partners, ...partners]

  return (
    <div className="min-h-screen bg-[#C2D8F7] pt-[72px]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.08),transparent_28%)]" />
        <div className="absolute inset-0 opacity-[0.25] [background-image:linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:60px_60px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left side */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                About CAMET
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
                Building smarter business systems with technology, support, and trust.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                CAMET IT SOLUTIONS LLP helps organizations streamline operations with ERP services,
                cloud solutions, software development, and ongoing support. We focus on practical
                execution, clean implementation, and long-term value.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  to="/contact"
                  className="rounded-full bg-sky-600 px-6 py-3 font-semibold text-shadow-sky-600/20 shadow-lg shadow-sky-600/20 transition hover:bg-sky-700"
                >
                  Schedule a Meeting
                </Button>

                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
                >
                  Explore Services
                </a>
              </div>

              <div className="mt-8 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { value: 'ERP', label: 'Implementation' },
                  { value: 'Cloud', label: 'Solutions' },
                  { value: 'Support', label: 'Training' },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ y: -4 }}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <p className="text-lg font-bold text-slate-900">{item.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative mx-auto max-w-[560px]">
                <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-sky-200/60 blur-3xl" />
                <div className="absolute -right-4 bottom-8 h-28 w-28 rounded-full bg-teal-200/60 blur-3xl" />

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="overflow-hidden rounded-[28px] bg-slate-100 shadow-xl md:mt-8">
                    <img
                      src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
                      alt="Business workspace"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[28px] bg-[#0F172A] p-6 text-white shadow-xl">
                      <p className="text-sm uppercase tracking-[0.22em] text-sky-300">
                        Our Approach
                      </p>
                      <p className="mt-4 text-lg font-semibold leading-7">
                        Simple process. Clear communication. Reliable delivery.
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-[28px] bg-slate-100 shadow-xl">
                      <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80"
                        alt="Team collaboration"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-xl"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    Trusted business technology partner
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    ERP · Integrations · Custom Software
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership + cofounders */}
      <section className="border-t border-slate-200 bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="overflow-hidden rounded-[18px]">
                <img src={ceoImg} alt="CAMET CEO" className="h-[280px] w-full object-cover" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#1F2937]">Shine Mathew</h3>
              <p className="text-sm font-medium text-[#0F766E]">Chief Executive Officer</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Leading CAMET with a focus on trust, operational value, and business-centered digital transformation.
              </p>
            </motion.div>

            <div className="rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.18)] overflow-hidden">
              <div className="px-6 py-8 sm:px-8 lg:px-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                  Leadership Philosophy
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#1F2937] md:text-3xl">
                  Practical leadership for business growth
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  Our leadership approach combines practical decision-making, operational discipline,
                  and long-term business thinking to build reliable solutions and strong client relationships.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {ceoPillars.map((pillar, index) => (
                    <motion.div
                      key={pillar.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="rounded-[20px] border border-slate-200 bg-slate-50 p-5 transition-shadow duration-300 hover:shadow-md"
                    >
                      <div className="mb-3 h-1.5 w-10 rounded-full bg-[#0F766E]" />
                      <h3 className="text-base font-bold text-[#1F2937]">{pillar.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {pillar.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 bg-[#F8FAFC] px-6 py-8 sm:px-8 lg:px-10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Leadership Team
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-[#1F2937]">Co-Founders</h3>
                  </div>

                  <p className="max-w-2xl text-sm leading-6 text-slate-600">
                    A committed founding team with complementary strengths across operations,
                    customer engagement, delivery, and business growth.
                  </p>
                </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
  {coFounders.map((person, index) => (
    <motion.div
      key={person.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group min-w-0 rounded-[20px] border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      <div className="overflow-hidden rounded-[16px] bg-slate-100">
        <img
          src={person.image}
          alt={person.name}
          className="h-[190px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <h3 className="mt-3 truncate text-sm font-bold text-[#1F2937]">
        {person.name}
      </h3>

      <p className="mt-1 text-xs font-medium leading-5 text-[#0F766E]">
        {person.role}
      </p>

      {person.description && (
        <p className="mt-2 text-xs leading-5 text-slate-600">
          {person.description}
        </p>
      )}
    </motion.div>
  ))}
</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise + compliance */}
    <section className="border-t border-slate-200 bg-[#f0f7ff] py-6 md:py-8">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Experience & Expertise */}
      <div>
        <h2 className="mb-3 text-lg font-bold text-[#1F2937] md:text-xl">
          Experience & Expertise
        </h2>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {expertise.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -2 }}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm"
            >
              <div className="flex items-start gap-2">
                <FaCheckCircle className="mt-0.5 shrink-0 text-[14px] text-[#0F766E]" />
                <p className="text-xs leading-5 text-slate-700 sm:text-sm">{item}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compliance & Process */}
      <div>
        <h2 className="mb-3 text-lg font-bold text-[#1F2937] md:text-xl">
          Compliance & Process
        </h2>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {compliance.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ x: 2 }}
              className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm"
            >
              <MdOutlineSecurity className="mt-0.5 shrink-0 text-[15px] text-[#0F766E]" />
              <p className="text-xs leading-5 text-slate-700 sm:text-sm">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Partners + stats */}
      <section className="overflow-hidden border-t border-slate-200 bg-[#f6f9fd] py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-[#1F2937] md:text-3xl">
              Partners & Team Strength
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-600 md:text-base">
              We work across leading software ecosystems while supporting clients through a strong implementation team.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            {/* Sliding partners */}
            <div className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-[#eaeaeb] px-3 py-4 sm:px-4">
              <motion.div
                className="flex w-max gap-4"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 18,
                  ease: 'linear',
                }}
              >
                {slidingPartners.map((partner, index) => {
                  const Icon = partner.icon
                  return (
                    <motion.div
                      key={`${partner.name}-${index}`}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="w-[260px] flex-shrink-0 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0FDFA] text-[#0F766E]">
                        <Icon className="text-xl" />
                      </div>
                      <h3 className="mt-3 text-base font-bold text-[#1F2937]">{partner.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{partner.desc}</p>
                    </motion.div>
                  )
                })}
              </motion.div>

              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F8FAFC] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F8FAFC] to-transparent" />
            </div>

            {/* Team stats */}
            <div className="grid grid-cols-2 gap-3">
              {teamStats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 text-center shadow-sm"
                >
                  <p className="text-2xl font-bold text-[#0F766E]">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-slate-200 bg-white py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-[#1F2937] md:text-3xl">Core Values</h2>
            <p className="mx-auto max-w-2xl text-sm text-slate-600 md:text-base">
              The principles that guide our decisions, delivery, and client relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {values.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-[20px] border border-slate-200 bg-[#F8FAFC] p-5 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1F2937] text-[#99F6E4]">
                    <Icon className="text-base" />
                  </div>
                  <h3 className="mb-2 mt-4 text-base font-bold text-[#1F2937]">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[22px] bg-[#1F2937] px-6 py-8 text-center shadow-[0_30px_70px_-30px_rgba(31,41,55,0.45)] ring-1 ring-white/[0.06] sm:px-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(45,212,191,0.18),transparent_60%)]" />
            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-3 text-xl font-bold text-white md:text-2xl">
                Partner with a team focused on business outcomes.
              </h2>
              <p className="mb-6 text-sm text-white/75 md:text-base">
                Let’s discuss how CAMET can help improve operations, connect systems, and support your next stage of growth.
              </p>
              <Button
                variant="primary"
                to="/contact"
                className="bg-[#0F766E] px-6 py-2.5 font-semibold text-[#0b5f59] hover:bg-[#0b5f59]"
              >
                Schedule a Meeting
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage