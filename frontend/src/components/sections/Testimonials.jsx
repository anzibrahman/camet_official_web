import { motion } from 'framer-motion'
import { FaQuoteRight, FaStar } from 'react-icons/fa'

/**
 * Fonts — same as About / Services, add once globally (index.html <head>):
 *
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
 */

const fontDisplay = { fontFamily: '"Plus Jakarta Sans", "Poppins", sans-serif' }
const fontMono = { fontFamily: '"JetBrains Mono", "Menlo", monospace' }

const BG_TOP = '#EEF4FF'
const BG_BOTTOM = '#FBFCFF'
const INK = '#1C2033'
const MUTED = '#5C6178'

const BLUE = '#5B8DEF'
const VIOLET = '#A78BFA'
const MINT = '#22B37E'
const CORAL = '#FB7185'
const AMBER = '#E8A317'

const testimonials = [
  {
    name: 'Rajesh Kumar',
    company: 'ABC Enterprises',
    role: 'Managing Director',
    text: 'CAMTIT Solutions transformed our business operations with their excellent Tally implementation. Their team is professional.',
    rating: 5,
    initial: 'RK',
    color: BLUE,
  },
  {
    name: 'Priya Sharma',
    company: 'XYZ Retail',
    role: 'Operations Manager',
    text: 'Outstanding service! The custom ERP solution they developed has streamlined our entire workflow. Highly recommended.',
    rating: 5,
    initial: 'PS',
    color: VIOLET,
  },
  {
    name: 'Arun Menon',
    company: 'Tech Innovations',
    role: 'CEO',
    text: 'Best software development company in Kerala. They delivered our project on time and within budget. Truly impressive expertise.',
    rating: 5,
    initial: 'AM',
    color: MINT,
  },
  {
    name: 'Sneha Reddy',
    company: 'Global Logistics',
    role: 'Director',
    text: 'Their support team is available 24/7 and resolved our server issues instantly. A trustworthy technology partner.',
    rating: 5,
    initial: 'SR',
    color: CORAL,
  },
  {
    name: 'David John',
    company: 'Creative Hub',
    role: 'Founder',
    text: 'We love the new website and mobile app. The design is modern and the performance is lightning fast. Great job!',
    rating: 5,
    initial: 'DJ',
    color: AMBER,
  },
]

// duplicated for a seamless marquee loop
const infiniteTestimonials = [...testimonials, ...testimonials]

function Testimonials() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-24"
      style={{ background: `linear-gradient(180deg, ${BG_TOP} 0%, ${BG_BOTTOM} 100%)`, color: INK }}
    >
      <style>{`
        @keyframes camet-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .camet-marquee-track {
          animation: camet-marquee 34s linear infinite;
        }
        .camet-marquee-wrap:hover .camet-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* soft colorful mesh, consistent with About / Services */}
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 40, -10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-28 -left-28 w-[440px] h-[440px] rounded-full blur-[110px] z-0"
        style={{ background: BLUE, opacity: 0.14 }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, -35, 20, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-[8%] right-[-120px] w-[380px] h-[380px] rounded-full blur-[110px] z-0"
        style={{ background: VIOLET, opacity: 0.14 }}
      />
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 25, -20, 0], y: [0, -15, 20, 0] }}
        transition={{ duration: 23, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-[-120px] left-[30%] w-[340px] h-[340px] rounded-full blur-[100px] z-0"
        style={{ background: MINT, opacity: 0.12 }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BLUE }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: VIOLET }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: CORAL }} />
            <p style={fontMono} className="text-[11px] uppercase tracking-[0.4em]">
              <span style={{ color: MUTED }}>Client Feedback</span>
            </p>
          </div>

          <h2
            style={fontDisplay}
            className="font-extrabold tracking-tight text-[32px] md:text-[46px] leading-[1.1] mb-4"
          >
            Trusted by{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(90deg, ${BLUE}, ${VIOLET} 55%, ${CORAL})` }}
            >
              Industry Leaders
            </span>
          </h2>

          <p style={fontDisplay} className="max-w-xl mx-auto text-[14px] md:text-[15px] leading-7 font-normal">
            <span style={{ color: MUTED }}>
              Businesses across Kerala rely on us for dependable software, ERP systems, and support that doesn't disappear after go-live.
            </span>
          </p>
        </motion.div>
      </div>

      {/* Infinite scroll container */}
      <div className="camet-marquee-wrap relative w-full overflow-hidden z-20">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 z-10" style={{ background: `linear-gradient(90deg, ${BG_TOP}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 z-10" style={{ background: `linear-gradient(270deg, ${BG_BOTTOM}, transparent)` }} />

        <div className="camet-marquee-track flex gap-6 w-max px-4">
          {infiniteTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="w-[340px] md:w-[380px] flex-shrink-0 relative rounded-[20px] bg-white p-7 md:p-8"
              style={{
                border: '1px solid rgba(28,32,51,0.08)',
                boxShadow: '0 18px 40px -26px rgba(28,32,51,0.18)',
              }}
            >
              {/* top accent bar */}
              <div
                className="absolute left-7 right-7 top-0 h-[3px] rounded-full"
                style={{ backgroundColor: testimonial.color }}
              />

              <div className="flex items-start justify-between mb-5">
                <div className="flex gap-1" style={{ color: AMBER }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-[12px]" />
                  ))}
                </div>
                <FaQuoteRight className="text-[20px]" style={{ color: `${testimonial.color}55` }} />
              </div>

              <p style={fontDisplay} className="mb-7 text-[14px] md:text-[15px] leading-relaxed font-normal line-clamp-4">
                <span style={{ color: INK }}>&ldquo;{testimonial.text}&rdquo;</span>
              </p>

              <div
                className="flex items-center gap-3.5 pt-5"
                style={{ borderTop: '1px solid rgba(28,32,51,0.08)' }}
              >
                <div
                  className="h-11 w-11 shrink-0 rounded-full flex items-center justify-center text-white font-bold text-[13px]"
                  style={{ ...fontDisplay, backgroundColor: testimonial.color }}
                >
                  {testimonial.initial}
                </div>
                <div className="min-w-0">
                  <p style={fontDisplay} className="text-[13px] font-bold truncate">
                    <span style={{ color: INK }}>{testimonial.name}</span>
                  </p>
                  <p style={fontMono} className="text-[10px] uppercase tracking-[0.1em] truncate mt-0.5">
                    <span style={{ color: testimonial.color }}>{testimonial.role}</span>
                  </p>
                  <p style={fontDisplay} className="text-[11.5px] truncate mt-0.5">
                    <span style={{ color: MUTED }}>{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials