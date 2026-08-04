import { motion } from 'framer-motion'
import { useState } from 'react'

function VideoSection() {
  // Replace these with your actual video IDs
  const videos = [
    { id: "dQw4w9WgXcQ", title: "Office Tour", thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "ysz5S6PUM-U", title: "Team Culture", thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { id: "tgbNymZ7vqY", title: "Project Success", thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" }
  ]

  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#F7F9FC_0%,#FFFFFF_55%,#F4F7FB_100%)] py-16">
      {/* light neutral base, matching the Services section above it — alternating
          light/dark sections reads as intentional rhythm instead of two dark blocks stacked */}
      <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />

      {/* same schematic grid signature as Services, in slate instead of white */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #E2E8F0 1px, transparent 1px), linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 20%, black 0%, transparent 75%)',
        }}
      />

      {/* soft brand-blue glows instead of cyan-on-navy, tuned down for a light backdrop */}
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#2F6FED]/10 blur-[90px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#38BDF8]/10 blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-end justify-between gap-6 md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-[#2F6FED]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#2F6FED]">
                Life at CAMET
              </p>
            </div>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Life at CAMET IT
            </h2>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              A glimpse into our daily work, culture, and success stories.
            </p>
          </motion.div>

          <div className="hidden md:block">
            <a
              href="/gallery"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2F6FED] transition-colors hover:text-[#0B1F3A]"
            >
              View All Stories
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Video Collage Grid - Bento Style */}
        <div className="grid h-[500px] grid-cols-1 gap-4 md:h-[400px] md:grid-cols-3">
          {/* Main Large Video (Left) */}
          <motion.div
            className="group relative overflow-hidden rounded-xl border border-slate-200 shadow-[0_20px_50px_-24px_rgba(11,31,58,0.35)] md:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {activeVideo === 0 ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${videos[0].id}?autoplay=1`}
                title={videos[0].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                className="absolute inset-0 cursor-pointer bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${videos[0].thumbnail}')` }}
                onClick={() => setActiveVideo(0)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-all group-hover:border-[#2F6FED] group-hover:bg-[#2F6FED]">
                      <svg className="h-5 w-5 pl-1 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{videos[0].title}</h3>
                      <p className="text-xs text-[#7DD3FC]">Featured Story</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column (2 Smaller Videos Stacked) */}
          <div className="grid grid-rows-2 gap-4">
            {videos.slice(1).map((video, index) => (
              <motion.div
                key={index + 1}
                className="group relative overflow-hidden rounded-xl border border-slate-200 shadow-[0_20px_50px_-24px_rgba(11,31,58,0.35)]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.1 }}
              >
                {activeVideo === index + 1 ? (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div
                    className="absolute inset-0 cursor-pointer bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${video.thumbnail}')` }}
                    onClick={() => setActiveVideo(index + 1)}
                  >
                    <div className="absolute inset-0 bg-[#0B1F3A]/50 transition-colors group-hover:bg-[#0B1F3A]/25" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:border-[#2F6FED] group-hover:bg-[#2F6FED]">
                        <svg className="h-4 w-4 pl-1 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <h4 className="text-sm font-semibold text-white drop-shadow-md">{video.title}</h4>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection