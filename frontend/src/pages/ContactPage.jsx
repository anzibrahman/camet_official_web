import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/common/Button'
import api from '@/utils/api'

const PHONE_DISPLAY = '9072632605'
const PHONE_TEL = '9072632605'
const WHATSAPP_NUMBER = '9072632605'
const EMAIL = 'Admin@camet.in'

// Registered office address for the map
const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.4742857142856!2d76.318956!3d10.063056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08795f5f5f5f5f:0x0!2sA9,+2nd+Floor,+SGR+Tower,+5/215,+Factory+Road,+North+Kalamassery,+Kalamassery,+Kochi,+Kerala+683104!5e0!3m2!1sen!2sin!4v1709886475000!5m2!1sen!2sin';
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const validate = (data) => {
    const next = {}

    if (!data.name.trim()) next.name = 'Please enter your name'

    if (!data.email.trim()) {
      next.email = 'Please enter your email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = 'Please enter a valid email address'
    }

    if (data.phone && !/^[0-9+\-\s()]{7,15}$/.test(data.phone)) {
      next.phone = 'Please enter a valid phone number'
    }

    if (!data.message.trim()) {
      next.message = 'Tell us a little about what you need'
    } else if (data.message.trim().length < 10) {
      next.message = 'A few more details would help us respond better'
    }

    return next
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

const handleSubmit = async (e) => {
  e.preventDefault()

  const validationErrors = validate(formData)
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors)
    return
  }

  setIsSubmitting(true)
  setSubmitStatus('')

  try {
    const response = await api.post('/contact', formData)

    if (response.data.success) {
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setErrors({})
    } else {
      setSubmitStatus('error')
    }
  } catch (err) {
    console.error('Submit error:', err)
    setSubmitStatus('error')
  } finally {
    setIsSubmitting(false)
    setTimeout(() => setSubmitStatus(''), 5000)
  }
}

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const fadeLeft = {
    hidden: { opacity: 0, x: -36 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const fadeRight = {
    hidden: { opacity: 0, x: 36 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const staggerWrap = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const quickItems = [
    { label: 'Reply time', value: 'Within 1 business day' },
    { label: 'Support', value: 'Mon – Sat, 9.30 AM – 5.30 PM' },
    { label: 'Location', value: 'kalamassery,Ernakulam, Kerala' }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_#4937b8_0%,_#33268a_42%,_#271f6b_100%)] pt-32 pb-24 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.16) 1px, transparent 1px)',
              backgroundSize: '42px 42px'
            }}
          />
        </div>

        <motion.div
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-16 right-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute bottom-6 left-1/3 h-48 w-48 rounded-full bg-violet-300/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerWrap}
          >
            <motion.span
              variants={fadeUp}
              className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm"
            >
              CAMET IT SOLUTIONS LLP
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mb-5 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
            >
              Let's Build Something
              <span className="block text-white/80">Useful Together</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto max-w-2xl text-lg text-white/80 md:text-xl"
            >
              Have a project in mind, need support, or want to discuss your business requirements?
              We're ready to help.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              {quickItems.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-left backdrop-blur-sm"
                >
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                    {item.label}
                  </div>
                  <div className="text-sm font-medium text-white">{item.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <svg
          className="absolute bottom-0 left-0 h-16 w-full text-[#f6f7fb] md:h-24"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,40 C240,90 480,0 720,30 C960,60 1200,100 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </section>

      {/* Contact Section */}
      <section className="bg-[#f6f7fb] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            className="overflow-hidden rounded-[26px] bg-white shadow-[0_18px_50px_rgba(28,24,74,0.14)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerWrap}
          >
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              {/* Left content */}
              <motion.div
                variants={fadeLeft}
                className="relative flex items-center overflow-hidden bg-[#35268c] px-6 py-8 text-white sm:px-8 md:px-10 md:py-10"
              >
                <div className="pointer-events-none absolute -right-20 top-10 h-48 w-48 rounded-full bg-fuchsia-400/10 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-6 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />

                <div className="relative z-10 max-w-sm">
                  <span className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
                    Contact Us
                  </span>

                  <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                    Contact us for your business
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                    Looking for Tally solutions, cloud services, or customized software for your business? Our experts are ready to help you choose the right technology solution.
                  </p>

                  <motion.a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Hi, I'd like to know more about your services."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#ff4d4f] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#ef3f42]"
                  >
                    Chat on WhatsApp
                  </motion.a>

 <div className="mt-7 space-y-3">
  {[
    `Phone: ${PHONE_DISPLAY}`,
    `Email: ${EMAIL}`,
    'Location: A9, 2nd Floor, SGR Tower, Factory Road, North Kalamassery, Kochi - 683104'
  ].map((item) => (
    <motion.div
      key={item}
      whileHover={{ x: 6 }}
      className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/85 backdrop-blur-sm"
    >
      {item}
    </motion.div>
  ))}
</div>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 }}
                    className="mt-7 overflow-hidden rounded-[18px] border border-white/10 shadow-xl"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                      alt="Business discussion"
                      className="h-44 w-full object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Right form */}
              <motion.div
                variants={fadeRight}
                className="flex items-center justify-center bg-[linear-gradient(180deg,#f8d7de_0%,#f6cfd7_100%)] p-4 sm:p-5 md:p-7"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full max-w-[500px] rounded-[22px] border border-white/30 bg-white/35 px-5 py-6 shadow-[0_14px_34px_rgba(44,31,72,0.12)] backdrop-blur-md sm:px-6 sm:py-7"
                >
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                  <motion.h3
                    variants={fadeUp}
                    className="mb-2 text-center text-2xl font-semibold leading-tight text-slate-900"
                  >
                    Ask a Question
                  </motion.h3>

                  <motion.p
                    variants={fadeUp}
                    className="mb-5 text-center text-sm text-slate-600"
                  >
                    Share a few details and our team will get back to you shortly.
                  </motion.p>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700"
                    >
                      Thanks! Your message has been sent to {EMAIL}.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                    >
                      Something went wrong. Please try again.
                    </motion.div>
                  )}

                  <motion.form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-3.5"
                    variants={staggerWrap}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <motion.div variants={fadeUp} className="w-full">
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium text-slate-800"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`h-11 w-full rounded-xl border bg-white/80 px-4 text-sm text-slate-900 placeholder:text-slate-500 outline-none ${
                          errors.name
                            ? 'border-red-300 focus:border-red-400'
                            : 'border-[#d7b7be] focus:border-[#7f5d67]'
                        }`}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={fadeUp} className="w-full">
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-slate-800"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`h-11 w-full rounded-xl border bg-white/80 px-4 text-sm text-slate-900 placeholder:text-slate-500 outline-none ${
                          errors.email
                            ? 'border-red-300 focus:border-red-400'
                            : 'border-[#d7b7be] focus:border-[#7f5d67]'
                        }`}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={fadeUp} className="w-full">
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-sm font-medium text-slate-800"
                      >
                        Phone
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        className={`h-11 w-full rounded-xl border bg-white/80 px-4 text-sm text-slate-900 placeholder:text-slate-500 outline-none ${
                          errors.phone
                            ? 'border-red-300 focus:border-red-400'
                            : 'border-[#d7b7be] focus:border-[#7f5d67]'
                        }`}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1 text-xs text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={fadeUp} className="w-full">
                      <label
                        htmlFor="message"
                        className="mb-1.5 block text-sm font-medium text-slate-800"
                      >
                        Message <span className="text-red-500">*</span>
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.01 }}
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirement"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`w-full rounded-xl border bg-white/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 outline-none resize-none ${
                          errors.message
                            ? 'border-red-300 focus:border-red-400'
                            : 'border-[#d7b7be] focus:border-[#7f5d67]'
                        }`}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-xs text-red-500">
                          {errors.message}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex min-h-[46px] w-full items-center justify-center rounded-xl bg-[#ff3f6a] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[#eb2f5d] transition hover:bg-[#eb2f5d] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.form>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Map + mini contact cards */}
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              className="relative h-64 overflow-hidden rounded-2xl border border-slate-200 shadow-lg"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
            <iframe
  src={MAP_EMBED_URL}
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="CAMET IT SOLUTIONS LLP - SGR Tower, Factory Road, North Kalamassery"
  className="grayscale hover:grayscale-0 transition-all duration-500"
/>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerWrap}
              className="grid gap-4"
            >
              {[
                {
                  title: 'Call us',
                  value: PHONE_DISPLAY,
                  href: `tel:${PHONE_TEL}`
                },
                {
                  title: 'Email us',
                  value: EMAIL,
                  href: `mailto:${EMAIL}`
                },
                {
                  title: 'WhatsApp',
                  value: 'Start a quick chat',
                  href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi, I'd like to know more about your services."
                  )}`
                }
              ].map((item) => (
                <motion.a
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  href={item.href}
                  target={item.title === 'WhatsApp' ? '_blank' : undefined}
                  rel={item.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0F766E]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{item.value}</p>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage