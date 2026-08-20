import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import api from '@/utils/api'

const fontDisplay = {
  fontFamily: '"Plus Jakarta Sans", "Poppins", sans-serif',
}

const fontMono = {
  fontFamily: '"JetBrains Mono", "Menlo", monospace',
}

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
    name: 'Anuraj P U',
    company: 'Client Review',
    role: 'Verified Client',
    text: 'We received professional and dependable Tally support from CAMET IT SOLUTIONS LLP. Their team demonstrated strong technical expertise, prompt responsiveness, and a clear commitment to resolving issues efficiently. The overall support experience was smooth and well managed. We appreciate their service and look forward to continued collaboration. Highly appreciate Athul’s timely assistance and technical knowledge.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=AP',
  },
  {
    name: 'doc med',
    company: 'Client Review',
    role: 'Verified Client',
    text: 'CAMET IT SOLUTIONS helped us migrate our existing Tally.ERP 9 setup to TallyPrime. Good customer support was provided by Adithya.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=DM',
  },
  {
    name: 'ASCENT TAX SOLUTIONS',
    company: 'Long-Term Client',
    role: 'Business Partner',
    text: 'Great Tally partner! We have been partnered with CAMET for more than 5 years. Great service, support, and very good customer support services. Thank you.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=AT',
  },
  {
    name: 'S&A associates',
    company: 'Client Review',
    role: 'Verified Client',
    text: 'This is a Tally Support Centre offering customised Tally solutions. My experience with Mr. Riyas’s office has been very positive. Mr. Riyas and his staff are highly supportive, cooperative, and responsive. They provided excellent guidance and timely assistance whenever required.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=SA',
  },
  {
    name: 'karun saji',
    company: 'Client Review',
    role: 'Local Guide',
    text: 'Great service. Responds quickly and provides accurate solutions. Trustworthy support.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=KS',
  },
  {
    name: 'Akshay KB',
    company: 'Client Review',
    role: 'Local Guide',
    text: 'Quick response and effective resolution. Very satisfied with the Tally service.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=AK',
  },
  {
    name: 'JOJU PULIKKEN',
    company: 'Client Review',
    role: 'Local Guide',
    text: 'Very supportive team. They immediately solved our issue on Tally.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=JP',
  },
  {
    name: 'sathyan thekkat',
    company: 'Client Review',
    role: 'Verified Client',
    text: 'Excellent support service is provided by CAMET on every call. Really good experience.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=ST',
  },
  {
    name: 'GIREESH MB',
    company: 'Client Review',
    role: 'Verified Client',
    text: 'CAMET IT SOLUTIONS LLP provides excellent service. They are very supportive and always ready to help. I am very satisfied with their work.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=GM',
  },
].map((testimonial, index) => ({
  ...testimonial,
  color: accents[index % accents.length],
}))

function TestimonialCard({ t, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className="testimonial-card relative w-[320px] flex-shrink-0 cursor-pointer pt-8 sm:w-[340px] lg:w-[360px]"
    >
      {/* Client Name and Image */}
      <div className="relative z-10 mb-[-30px] flex items-end justify-between pl-1 pr-2">
        <div className="min-w-0 pb-3">
          <p
            style={fontDisplay}
            className="max-w-[230px] truncate text-[15px] font-extrabold"
          >
            <span style={{ color: t.color }}>
              {t.name}
            </span>
          </p>

          <p
            style={fontMono}
            className="text-[10px] uppercase tracking-[0.08em]"
          >
            <span style={{ color: MUTED }}>
              {t.role || 'Client'}
            </span>
          </p>
        </div>

        <div
          className="h-16 w-16 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-[0_10px_20px_-8px_rgba(11,31,58,0.35)]"
          style={{
            border: `2px solid ${t.color}`,
          }}
        >
          <img
            src={
              t.photo ||
              'https://placehold.co/200x200/e2e8f0/475569?text=Client'
            }
            alt={t.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Testimonial Card */}
      <div
        className="relative flex h-[310px] flex-col rounded-2xl bg-white p-6 pt-11 transition-transform duration-300 hover:-translate-y-1"
        style={{
          border: '1px solid rgba(11,31,58,0.08)',
          boxShadow: '0 18px 40px -28px rgba(11,31,58,0.2)',
        }}
      >
        {/* Rating */}
        <div
          className="mb-3 flex shrink-0 gap-1"
          style={{ color: GOLD }}
        >
          {[...Array(t.rating || 5)].map((_, index) => (
            <FaStar
              key={index}
              className="text-[11px]"
            />
          ))}
        </div>

        {/* Review Description */}
        <div className="testimonial-scroll flex-1 overflow-y-auto pr-1">
          <p
            style={fontDisplay}
            className="text-[13.5px] font-normal leading-relaxed"
          >
            <span style={{ color: INK }}>
              {t.text}
            </span>
          </p>
        </div>

        {/* Review Source */}
        <p
          style={fontDisplay}
          className="mt-4 shrink-0 text-[11.5px]"
        >
          <span style={{ color: MUTED }}>
            {t.company || 'Client Review'}
          </span>
        </p>
      </div>
    </div>
  )
}

function MarqueeRow({ items, duration = 28 }) {
  const [isPaused, setIsPaused] = useState(false)

  const duplicated = [...items, ...items]

  const togglePause = () => {
    setIsPaused((previous) => !previous)
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="marquee-track flex w-max gap-6"
        style={{
          animation: `marquee-scroll ${duration}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicated.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            t={testimonial}
            onToggle={togglePause}
          />
        ))}
      </div>
    </div>
  )
}

function Testimonials() {
  const [databaseReviews, setDatabaseReviews] = useState([])

  useEffect(() => {
    api
      .get('/reviews')
      .then(({ data }) => {
        const reviews = (data.data || []).map((review, index) => ({
          ...review,

          photo:
            review.photoUrl ||
            review.photo ||
            'https://placehold.co/200x200/e2e8f0/475569?text=Client',

          color: accents[index % accents.length],

          rating: review.rating || 5,

          role:
            review.role ||
            'Client Review',

          company:
            review.company ||
            'Client Review',

          text:
            review.text ||
            review.description ||
            review.review ||
            '',
        }))

        setDatabaseReviews(reviews)
      })
      .catch((error) => {
        console.error(
          'Could not load client reviews:',
          error
        )
      })
  }, [])

  // Database reviews + original client testimonials
  const displayedTestimonials = [
    ...databaseReviews,
    ...testimonials,
  ]

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

          .testimonial-scroll::-webkit-scrollbar {
            display: none;
          }

          .testimonial-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          @media (prefers-reduced-motion: reduce) {
            .marquee-track {
              animation: none !important;
            }
          }
        `}
      </style>

      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #DCE6F7 1px, transparent 1px), linear-gradient(to bottom, #DCE6F7 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 20%, black 0%, transparent 75%)',
        }}
      />

      {/* Blue Background Glow */}
      <div
        className="pointer-events-none absolute -top-28 -left-28 z-0 h-[440px] w-[440px] rounded-full blur-[110px]"
        style={{
          background: BLUE,
          opacity: 0.14,
        }}
      />

      {/* Cyan Background Glow */}
      <div
        className="pointer-events-none absolute right-[-120px] top-[8%] z-0 h-[380px] w-[380px] rounded-full blur-[110px]"
        style={{
          background: CYAN,
          opacity: 0.14,
        }}
      />

      {/* Section Heading */}
      <div className="relative z-20 mx-auto mb-16 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div>
          <div className="mb-5 flex items-center justify-center gap-2">
            <span
              className="h-px w-6"
              style={{
                backgroundColor: BLUE,
              }}
            />

            <p
              style={fontMono}
              className="text-[11px] uppercase tracking-[0.32em]"
            >
              <span style={{ color: BLUE }}>
                Client Feedback
              </span>
            </p>

            <span
              className="h-px w-6"
              style={{
                backgroundColor: BLUE,
              }}
            />
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
              Businesses across Kerala rely on us for dependable software,
              ERP systems, and support that doesn't disappear after go-live.
            </span>
          </p>
        </div>
      </div>

      {/* Testimonials Marquee */}
      <div className="relative z-20">
        <MarqueeRow
          items={displayedTestimonials}
          duration={28}
        />
      </div>
    </section>
  )
}

export default Testimonials