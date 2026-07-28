import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const fontDisplay = { fontFamily: '"Plus Jakarta Sans", "Poppins", sans-serif' }
const fontMono = { fontFamily: '"JetBrains Mono", "Menlo", monospace' }

const BG_TOP = '#F3F7FF'
const BG_BOTTOM = '#FFFFFF'
const INK = '#0B1F3A'
const MUTED = '#5C6B85'

const NAVY = '#0B1F3A'
const BLUE = '#2F6FED'
const CYAN = '#0E9BD9'
const GOLD = '#E8A317'

const accents = [BLUE, NAVY, CYAN]

const testimonials = [
  {
    name: 'Rajesh Kumar',
    company: 'ABC Enterprises',
    role: 'Managing Director',
    text: '"CAMTIT Solutions transformed our business operations with their excellent Tally implementation. Their team is professional."',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=faces',
  },
  {
    name: 'Priya Sharma',
    company: 'XYZ Retail',
    role: 'Operations Manager',
    text: '"Outstanding service! The custom ERP solution they developed has streamlined our entire workflow. Highly recommended."',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
  },
  {
    name: 'Arun Menon',
    company: 'Tech Innovations',
    role: 'CEO',
    text: '"Best software development company in Kerala. They delivered our project on time and within budget."',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
  },
  {
    name: 'Sneha Reddy',
    company: 'Global Logistics',
    role: 'Director',
    text: '"Their support team is available 24/7 and resolved our server issues instantly. A trustworthy technology partner."',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=faces',
  },
  {
    name: 'David John',
    company: 'Creative Hub',
    role: 'Founder',
    text: '"We love the new website and mobile app. The design is modern and the performance is lightning fast."',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces',
  },
  {
    name: 'Meera Nair',
    company: 'Coastal Foods',
    role: 'Finance Head',
    text: '"Migration to TallyPrime was smooth from day one. No downtime, no data loss, and clear communication throughout."',
    rating: 5,
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces',
  },
].map((t, i) => ({ ...t, color: accents[i % accents.length] }))

function TestimonialCard({ t, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className="testimonial-card relative w-[320px] cursor-pointer sm:w-[340px] lg:w-[360px] flex-shrink-0 pt-8"
    >
      <div className="relative z-10 mb-[-30px] flex items-end justify-between pl-1 pr-2">
        <div className="pb-3">
          <p style={fontDisplay} className="text-[15px] font-extrabold">
            <span style={{ color: t.color }}>{t.name}</span>
          </p>
          <p style={fontMono} className="text-[10px] uppercase tracking-[0.08em]">
            <span style={{ color: MUTED }}>{t.role}</span>
          </p>
        </div>

        <div
          className="h-16 w-16 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-[0_10px_20px_-8px_rgba(11,31,58,0.35)]"
          style={{ border: `2px solid ${t.color}` }}
        >
          <img src={t.photo} alt={t.name} className="h-full w-full object-cover" />
        </div>
      </div>

      <div
        className="relative rounded-2xl bg-white p-6 pt-11 transition-transform duration-300 hover:-translate-y-1"
        style={{
          border: '1px solid rgba(11,31,58,0.08)',
          boxShadow: '0 18px 40px -28px rgba(11,31,58,0.2)',
        }}
      >
        <div className="mb-3 flex gap-1" style={{ color: GOLD }}>
          {[...Array(t.rating)].map((_, i) => (
            <FaStar key={i} className="text-[11px]" />
          ))}
        </div>

        <p style={fontDisplay} className="text-[13.5px] leading-relaxed font-normal">
          <span style={{ color: INK }}>{t.text}</span>
        </p>

        <p style={fontDisplay} className="mt-4 text-[11.5px]">
          <span style={{ color: MUTED }}>{t.company}</span>
        </p>
      </div>
    </div>
  )
}

function MarqueeRow({ items, duration = 28 }) {
  const [isPaused, setIsPaused] = useState(false)
  const duplicated = [...items, ...items]

  const togglePause = () => {
    setIsPaused((prev) => !prev)
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex w-max gap-6"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicated.map((t, index) => (
          <TestimonialCard
            key={`${t.name}-${index}`}
            t={t}
            onToggle={togglePause}
          />
        ))}
      </div>
    </div>
  )
}

function Testimonials() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-24"
      style={{
        background: `linear-gradient(180deg, ${BG_TOP} 0%, ${BG_BOTTOM} 100%)`,
        color: INK,
      }}
    >
      <style>
        {`
          @keyframes marquee-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .marquee-track {
              animation: none !important;
            }
          }
        `}
      </style>

      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #DCE6F7 1px, transparent 1px), linear-gradient(to bottom, #DCE6F7 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 20%, black 0%, transparent 75%)',
        }}
      />

      <div
        className="pointer-events-none absolute -top-28 -left-28 z-0 h-[440px] w-[440px] rounded-full blur-[110px]"
        style={{ background: BLUE, opacity: 0.14 }}
      />
      <div
        className="pointer-events-none absolute right-[-120px] top-[8%] z-0 h-[380px] w-[380px] rounded-full blur-[110px]"
        style={{ background: CYAN, opacity: 0.14 }}
      />

      <div className="relative z-20 mx-auto mb-16 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div>
          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="h-px w-6" style={{ backgroundColor: BLUE }} />
            <p style={fontMono} className="text-[11px] uppercase tracking-[0.32em]">
              <span style={{ color: BLUE }}>Client Feedback</span>
            </p>
            <span className="h-px w-6" style={{ backgroundColor: BLUE }} />
          </div>

          <h2
            style={fontDisplay}
            className="mb-4 text-[32px] font-extrabold leading-[1.1] tracking-tight md:text-[46px]"
          >
            Trusted by{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${NAVY}, ${BLUE} 55%, ${CYAN})`,
              }}
            >
              Industry Leaders
            </span>
          </h2>

          <p
            style={fontDisplay}
            className="mx-auto max-w-xl text-[14px] font-normal leading-7 md:text-[15px]"
          >
            <span style={{ color: MUTED }}>
              Businesses across Kerala rely on us for dependable software, ERP systems,
              and support that doesn't disappear after go-live.
            </span>
          </p>
        </div>
      </div>

      <div className="relative z-20">
        <MarqueeRow items={testimonials} duration={28} />
      </div>
    </section>
  )
}

export default Testimonials