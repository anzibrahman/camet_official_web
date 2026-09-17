import { useEffect, useState } from 'react'
import { FaStar, FaTimes } from 'react-icons/fa'
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

// How many lines of comment text show before truncating with "···"
const CLAMP_LINES = 3
const TEXT_BLOCK_HEIGHT = 66 // px — keeps every card the same height regardless of comment length

const testimonials = [
  {
    name: 'Anuraj P U',
    company: '',
    role: 'Verified Client',
    text: 'We received professional and dependable Tally support from CAMET IT SOLUTIONS LLP. Their team demonstrated strong technical expertise, prompt responsiveness, and a clear commitment to resolving issues efficiently. The overall support experience was smooth and well managed. We appreciate their service and look forward to continued collaboration. Highly appreciate Athul’s timely assistance and technical knowledge.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=AP',
  },
  {
    name: 'doc med',
    company: '',
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
    company: '',
    role: 'Verified Client',
    text: 'This is a Tally Support Centre offering customised Tally solutions. My experience with Mr. Riyas’s office has been very positive. Mr. Riyas and his staff are highly supportive, cooperative, and responsive. They provided excellent guidance and timely assistance whenever required.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=SA',
  },
  {
    name: 'karun saji',
    company: '',
    role: 'Local Guide',
    text: 'Great service. Responds quickly and provides accurate solutions. Trustworthy support.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=KS',
  },
  {
    name: 'Akshay KB',
    company: '',
    role: 'Local Guide',
    text: 'Quick response and effective resolution. Very satisfied with the Tally service.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=AK',
  },
  {
    name: 'JOJU PULIKKEN',
    company: '',
    role: 'Local Guide',
    text: 'Very supportive team. They immediately solved our issue on Tally.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=JP',
  },
  {
    name: 'sathyan thekkat',
    company: '',
    role: 'Verified Client',
    text: 'Excellent support service is provided by CAMET on every call. Really good experience.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=ST',
  },
  {
    name: 'GIREESH MB',
    company: '',
    role: 'Verified Client',
    text: 'CAMET IT SOLUTIONS LLP provides excellent service. They are very supportive and always ready to help. I am very satisfied with their work.',
    rating: 5,
    photo: 'https://placehold.co/200x200/e2e8f0/475569?text=GM',
  },
].map((testimonial, index) => ({
  ...testimonial,
  color: accents[index % accents.length],
}))

function TestimonialCard({ t, onToggle, onReadMore }) {
  return (
    <div
      onClick={onToggle}
      className="testimonial-card relative w-[260px] flex-shrink-0 cursor-pointer pt-7 sm:w-[270px] lg:w-[280px]"
    >
      {/* Client Name and Image */}
      <div className="relative z-10 mb-[-24px] flex items-end justify-between pl-1 pr-2">
        <div className="min-w-0 space-y-0.5 pb-2.5">
          <p
            style={fontDisplay}
            className="max-w-[170px] truncate text-[13px] font-extrabold leading-tight"
          >
            <span style={{ color: t.color }}>
              {t.name}
            </span>
          </p>

          {t.company && <p className="w-fit rounded-full bg-slate-100 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.06em] text-slate-600">
            {t.company}
          </p>}

          <p style={fontMono} className="text-[9px] uppercase tracking-[0.06em]">
            <span style={{ color: MUTED }}>{t.role || 'Client'}</span>
          </p>
        </div>

        <div
          className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-[0_10px_20px_-8px_rgba(11,31,58,0.35)]"
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

      {/* Testimonial Card — fixed height so every card matches regardless of comment length */}
      <div
        className="relative flex h-[210px] flex-col rounded-2xl bg-white p-4 pt-9 transition-transform duration-300 hover:-translate-y-1"
        style={{
          border: '1px solid rgba(11,31,58,0.08)',
          boxShadow: '0 18px 40px -28px rgba(11,31,58,0.2)',
        }}
      >
        {/* Rating */}
        <div className="mb-2.5 flex shrink-0 items-center gap-1" style={{ color: GOLD }}>
          {[...Array(t.rating || 5)].map((_, index) => <FaStar key={index} className="text-[10px]" />)}
        </div>

        {/* Review Description — clamped to a fixed number of lines, same height every time */}
        <div className="relative flex-1" style={{ height: TEXT_BLOCK_HEIGHT }}>
          <p
            style={{
              ...fontDisplay,
              display: '-webkit-box',
              WebkitLineClamp: CLAMP_LINES,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
            className="text-[12px] font-normal leading-relaxed"
          >
            <span style={{ color: INK }}>
              {t.text}
            </span>
          </p>
        </div>

        {/* Three-dot "read more" trigger — opens the full comment */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onReadMore(t)
          }}
          aria-label={`Read full comment from ${t.name}`}
          className="mt-1.5 flex shrink-0 items-center gap-1 self-start text-[11px] font-semibold"
          style={{ color: BLUE }}
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full border"
            style={{ borderColor: 'rgba(11,31,58,0.15)', color: MUTED }}
          >
            <span style={{ fontSize: '12px', lineHeight: '8px', letterSpacing: '1px' }}>&#8226;&#8226;&#8226;</span>
          </span>
          Read more
        </button>
      </div>
    </div>
  )
}

function MarqueeRow({ items, duration = 48, onReadMore }) {
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
            onReadMore={onReadMore}
          />
        ))}
      </div>
    </div>
  )
}

function ReadMoreModal({ testimonial, onClose }) {
  if (!testimonial) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1F3A]/50 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl bg-white p-7 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <FaTimes className="text-[13px]" />
        </button>

        <div className="mb-4 flex items-center gap-3 pr-8">
          <div
            className="h-12 w-12 shrink-0 overflow-hidden rounded-full"
            style={{ border: `2px solid ${testimonial.color}` }}
          >
            <img
              src={testimonial.photo || 'https://placehold.co/200x200/e2e8f0/475569?text=Client'}
              alt={testimonial.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p style={fontDisplay} className="truncate text-[15px] font-extrabold" >
              <span style={{ color: testimonial.color }}>{testimonial.name}</span>
            </p>
            <p style={fontMono} className="text-[10px] uppercase tracking-[0.08em]">
              <span style={{ color: MUTED }}>{testimonial.role || 'Client'}</span>
              {testimonial.company ? <span style={{ color: MUTED }}> · {testimonial.company}</span> : null}
            </p>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-1" style={{ color: GOLD }}>
          {[...Array(testimonial.rating || 5)].map((_, index) => (
            <FaStar key={index} className="text-[12px]" />
          ))}
        </div>

        <p style={fontDisplay} className="max-h-[50vh] overflow-y-auto text-[14px] font-normal leading-relaxed" >
          <span style={{ color: INK }}>{testimonial.text}</span>
        </p>
      </div>
    </div>
  )
}

function Testimonials() {
  const [databaseReviews, setDatabaseReviews] = useState([])
  const [activeTestimonial, setActiveTestimonial] = useState(null)

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
            '',

          company:
            review.company ||
            '',

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
          'Could not load s:',
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
          duration={48}
          onReadMore={setActiveTestimonial}
        />
      </div>

      <ReadMoreModal testimonial={activeTestimonial} onClose={() => setActiveTestimonial(null)} />
    </section>
  )
}

export default Testimonials