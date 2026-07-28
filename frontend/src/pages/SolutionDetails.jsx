import { useEffect, useRef, useState } from 'react'
import { Navigate, Link, useParams } from 'react-router-dom'
import Header from '@/components/common/Header'
import { ArrowLeft, ArrowUpRight, CircleCheck } from 'lucide-react'
import { FaLayerGroup } from 'react-icons/fa'
import { solutions } from '@/data/solutions'

const headingFont = { fontFamily: "'General Sans', 'Inter', sans-serif" }
const bodyFont = { fontFamily: "'Inter', system-ui, sans-serif" }

function useFontLoader() {
  useEffect(() => {
    if (document.getElementById('corporate-font-import')) return
    const link = document.createElement('link')
    link.id = 'corporate-font-import'
    link.rel = 'stylesheet'
    link.href =
      'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap'
    document.head.appendChild(link)
  }, [])
}

function useReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(node)
        }
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

function Reveal({ className = '', delay = 0, children }) {
  const [ref, inView] = useReveal()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView
          ? 'translate-y-0 scale-100 opacity-100'
          : 'translate-y-6 scale-[0.97] opacity-0'
      } ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop
      const max = h.scrollHeight - h.clientHeight
      setPct(max > 0 ? (scrolled / max) * 100 : 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-[linear-gradient(90deg,#22d3ee,#6366f1,#f59e0b)] transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

function FeatureTile({ feature, index }) {
  const reverse = index % 2 === 1

  return (
    <Reveal delay={index * 90}>
      <div className="group/tile relative h-full overflow-hidden rounded-2xl p-[1.5px]">
        <div
          className={`absolute inset-[-60%] ${
            reverse ? 'animate-spin-slow-reverse' : 'animate-spin-slow'
          } bg-[conic-gradient(from_0deg,transparent_0%,rgba(34,211,238,0.9)_8%,transparent_22%)] opacity-70 transition-opacity duration-300 group-hover/tile:opacity-100`}
        />
        <div className="relative flex h-full items-start gap-3 rounded-2xl bg-white p-4 transition-transform duration-300 group-hover/tile:-translate-y-0.5">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-sm transition-transform duration-300 group-hover/tile:scale-110 group-hover/tile:rotate-6">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-sm font-medium text-slate-900">{feature}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Supports efficient workflows, structured execution, and operational visibility.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function BenefitTile({ benefit, index }) {
  const reverse = index % 2 === 1

  return (
    <Reveal delay={index * 80}>
      <div className="group/tile relative h-full overflow-hidden rounded-2xl p-[1.5px]">
        <div
          className={`absolute inset-[-60%] ${
            reverse ? 'animate-spin-slow-reverse' : 'animate-spin-slow'
          } bg-[conic-gradient(from_0deg,transparent_0%,rgba(99,102,241,0.85)_10%,transparent_24%)] opacity-60 transition-opacity duration-300 group-hover/tile:opacity-100`}
        />
        <div className="relative flex h-full items-start gap-3 rounded-2xl bg-white p-4 transition-transform duration-300 group-hover/tile:-translate-y-0.5">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-sm">
            <CircleCheck className="h-3.5 w-3.5" />
          </span>
          <p className="text-sm leading-6 text-slate-700">{benefit}</p>
        </div>
      </div>
    </Reveal>
  )
}

function SolutionSpotlightCard({ solution }) {
  const cardRef = useRef(null)

  const handleMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <aside
      ref={cardRef}
      onMouseMove={handleMove}
      className="group relative overflow-hidden rounded-[26px] bg-[#0b1220] p-[1px] shadow-[0_25px_60px_rgba(0,0,0,0.45)] transition-shadow duration-300 hover:shadow-[0_30px_80px_rgba(99,102,241,0.35)]"
    >
      <div className="animate-gradient absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.55),rgba(255,255,255,0.06),rgba(99,102,241,0.55),rgba(34,211,238,0.55))]" />

      <div className="relative rounded-[25px] bg-[#0b1220] px-5 py-5 text-white md:px-6 md:py-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(280px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.10), transparent 60%)',
          }}
        />

        <div className="bg-orb-b pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/25 blur-3xl" />

        <div className="relative space-y-3">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            <FaLayerGroup className="text-[10px]" />
            Solution Snapshot
          </p>

          <h2
            className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-3xl font-semibold leading-none tracking-tight text-transparent md:text-5xl"
            style={headingFont}
          >
            {solution.label}
          </h2>

          <p className="max-w-md text-sm leading-6 text-white/70">
            Tailored for real operational workflows, custom deployment needs, and business-specific execution.
          </p>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-colors duration-200 hover:border-cyan-300/40 hover:bg-white/10">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">Status</p>
              <p className="pt-1 text-sm font-medium text-white">Operational</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-colors duration-200 hover:border-cyan-300/40 hover:bg-white/10">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">Deployment</p>
              <p className="pt-1 text-sm font-medium text-white">Custom-fit</p>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition-colors duration-200 hover:border-cyan-300/40 hover:bg-white/10">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-white">Module</p>
                <p className="text-xs text-cyan-200">Active business-ready configuration</p>
              </div>
              <p className="text-sm font-semibold text-white">{solution.label}</p>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition-colors duration-200 hover:border-cyan-300/40 hover:bg-white/10">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-white">Workflow fit</p>
                <p className="text-xs text-cyan-200">Configured to your process</p>
              </div>
              <p className="text-sm font-semibold text-white">Business-specific</p>
            </div>
          </div>

          <Link
            to="/contact"
            className="group/btn relative mt-1 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_0_rgba(34,211,238,0)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(34,211,238,0.55)]"
          >
            <span className="shine-sweep" />
            Book a Service
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </aside>
  )
}

function SolutionDetails() {
  useFontLoader()
  const { slug } = useParams()
  const solution = solutions.find((item) => item.slug === slug)

  if (!solution) {
    return (
      <>
        <Header />
        <main
          className="flex min-h-dvh items-center justify-center bg-slate-50 px-4 py-10"
          style={bodyFont}
        >
          <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                404
              </p>
              <h1 className="text-xl font-semibold text-slate-900" style={headingFont}>
                Solution not found
              </h1>
              <p className="text-sm leading-6 text-slate-600">
                The solution you are looking for is not available right now.
              </p>
              <div className="pt-2">
                <Link
                  to="/solutions"
                  className="inline-flex rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-900"
                >
                  Back to Solutions
                </Link>
              </div>
            </div>
          </section>
        </main>
      </>
    )
  }

  const SolutionIcon = solution.icon
  const marqueeItems = solution.features?.length ? solution.features : [solution.label]

  return (
    <>
      <style>{`
        @keyframes floatA { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(26px,-18px) scale(1.06); } }
        @keyframes floatB { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-22px,20px) scale(1.08); } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes shimmer { 0% { transform: translateX(-120%) skewX(-12deg); } 100% { transform: translateX(220%) skewX(-12deg); } }
        @keyframes softPulse { 0%,100% { opacity:.55; transform: scale(1); } 50% { opacity:1; transform: scale(1.2); } }
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes spinSlowReverse { to { transform: rotate(-360deg); } }
        @keyframes twinkle { 0%,100% { opacity:.15; transform: scale(1); } 50% { opacity:.9; transform: scale(1.4); } }
        @keyframes orbit { to { transform: rotate(360deg); } }
        @keyframes underlineDraw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes titleGlow { 0%,100% { text-shadow: 0 0 24px rgba(34,211,238,0.0); } 50% { text-shadow: 0 0 24px rgba(34,211,238,0.35); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        .bg-orb-a { animation: floatA 11s ease-in-out infinite; }
        .bg-orb-b { animation: floatB 13s ease-in-out infinite; }
        .animate-gradient { background-size: 220% 220%; animation: gradientShift 9s ease infinite; }
        .animate-spin-slow { animation: spinSlow 5s linear infinite; }
        .animate-spin-slow-reverse { animation: spinSlowReverse 6s linear infinite; }
        .animate-orbit { animation: orbit 9s linear infinite; }
        .animate-title-glow { animation: titleGlow 4s ease-in-out infinite; }
        .animate-marquee { animation: marquee 26s linear infinite; }

        .particle {
          position: absolute;
          border-radius: 9999px;
          background: radial-gradient(circle, #67e8f9, transparent 70%);
          animation: twinkle 3.4s ease-in-out infinite;
        }

        .pulse-dot { animation: softPulse 2.2s ease-in-out infinite; }

        .shine-sweep { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .shine-sweep::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: translateX(-120%) skewX(-12deg);
        }
        .group\\/btn:hover .shine-sweep::after { animation: shimmer 1s ease; }

        .underline-draw {
          transform-origin: left;
          animation: underlineDraw 0.8s ease-out 0.3s both;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <ScrollProgress />
      <Header />

      <main className="min-h-dvh bg-slate-50" style={bodyFont}>
        <section className="relative overflow-hidden bg-[#0b1220] pb-14 pt-20 md:pb-20 md:pt-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.16),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(99,102,241,0.22),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(245,158,11,0.10),transparent_30%)]" />
          <div className="bg-orb-a pointer-events-none absolute -top-24 right-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="bg-orb-b pointer-events-none absolute bottom-0 left-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                width: 4 + (i % 3) * 2,
                height: 4 + (i % 3) * 2,
                left: `${8 + i * 11}%`,
                top: `${15 + ((i * 17) % 60)}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}

          <div className="relative mx-auto max-w-7xl px-4 md:px-6">
            <Link
              to="/solutions"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Solutions
            </Link>

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <Reveal>
                <div className="flex h-full flex-col justify-center">
                  <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300 backdrop-blur-sm">
                    <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    Solution Module
                  </span>

                  <div className="flex items-start gap-4">
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                      <span className="animate-orbit absolute inset-0 rounded-full border border-dashed border-cyan-400/40">
                        <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_2px_rgba(34,211,238,0.7)]" />
                      </span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-indigo-500/20 shadow-inner">
                        <SolutionIcon className="text-2xl text-cyan-300" />
                      </div>
                    </div>

                    <div>
                      <h1
                        className="animate-title-glow text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl"
                        style={headingFont}
                      >
                        {solution.heroTitle || solution.label}
                      </h1>
                      <span className="underline-draw mt-2 block h-[3px] w-16 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" />
                    </div>
                  </div>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 md:text-base">
                    {solution.heroText}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <Link
                      to="/contact"
                      className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(34,211,238,0.45)]"
                    >
                      <span className="shine-sweep" />
                      Book a Service
                    </Link>

                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      Talk to Our Team
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <SolutionSpotlightCard solution={solution} />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-indigo-500" />
              <h2 className="text-base font-semibold tracking-tight text-slate-900" style={headingFont}>
                Overview
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                {solution.heroText}
              </p>
            </div>
          </Reveal>
        </section>

        {solution.benefits?.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
            <Reveal>
              <h2 className="text-base font-semibold tracking-tight text-slate-900" style={headingFont}>
                Why choose this solution
              </h2>
            </Reveal>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {solution.benefits.map((benefit, index) => (
                <BenefitTile key={benefit} benefit={benefit} index={index} />
              ))}
            </div>
          </section>
        )}

        {solution.features?.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
            <Reveal>
              <h2 className="text-base font-semibold tracking-tight text-slate-900" style={headingFont}>
                Key features
              </h2>
            </Reveal>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {solution.features.map((feature, index) => (
                <FeatureTile key={feature} feature={feature} index={index} />
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
          <div className="grid gap-3 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold tracking-tight text-slate-900" style={headingFont}>
                  Solution fit
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {(solution.features || []).slice(0, 6).map((item, i) => (
                    <Reveal key={item} delay={i * 60} className="inline-block">
                      <span className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 transition-colors duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">
                        {item}
                      </span>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm font-semibold tracking-tight text-slate-900" style={headingFont}>
                  Implementation notes
                </h3>
                <div className="mt-2.5 space-y-1.5">
                  {(solution.benefits || []).slice(0, 5).map((note) => (
                    <div key={note} className="flex items-start gap-2">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
                      <p className="text-sm leading-6 text-slate-700">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="overflow-hidden border-y border-slate-200 bg-slate-950 py-4 mt-8">
          <div className="flex w-max animate-marquee gap-8">
            {[0, 1].map((loop) => (
              <div key={loop} className="flex shrink-0 gap-8">
                {marqueeItems.map((item, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/60"
                  >
                    {item}
                    <span className="text-cyan-400">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <Reveal delay={100}>
            <section className="group relative overflow-hidden rounded-2xl bg-[#0b1220] px-5 py-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)] md:px-8">
              <div className="animate-gradient pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(34,211,238,0.16),rgba(99,102,241,0.16),transparent)]" />
              <div className="bg-orb-a pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" />

              <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="max-w-2xl space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                    Need implementation support
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl" style={headingFont}>
                    Get {solution.label} customized for your workflow
                  </h3>
                  <p className="text-sm leading-6 text-white/70">
                    We tailor modules, reports, billing formats, integrations, and process flows according to how your team actually works.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(34,211,238,0.45)]"
                  >
                    Contact Us
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    Request Callback
                  </Link>
                </div>
              </div>
            </section>
          </Reveal>
        </section>
      </main>
    </>
  )
}

export default SolutionDetails