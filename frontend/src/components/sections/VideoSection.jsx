import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import api from '@/utils/api'

const toEmbedUrl = (url) => {
  try {
    const parsed = new URL(url)
    if (parsed.hostname.includes('youtu.be')) return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`
    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname.startsWith('/embed/')) return url
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : url
    }
    if (parsed.hostname.includes('vimeo.com')) return `https://player.vimeo.com/video/${parsed.pathname.split('/').filter(Boolean).pop()}`
  } catch { /* Direct video URLs are rendered by the video element. */ }
  return null
}

function VideoCard({ video }) {
  const url = video.video.url
  const embedUrl = toEmbedUrl(url)

  return <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="relative aspect-video bg-slate-950">
      {embedUrl
        ? <iframe src={embedUrl} title={video.title} className="absolute inset-0 h-full w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        : <video src={url} controls preload="metadata" className="absolute inset-0 h-full w-full object-contain" />}
    </div>
    <div className="px-4 py-3">
      <h3 className="truncate font-semibold text-slate-900">{video.title}</h3>
      {video.subtitle && <p className="mt-1 line-clamp-2 text-sm text-slate-600">{video.subtitle}</p>}
    </div>
  </article>
}

function VideoSection() {
  const [videos, setVideos] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    api.get('/addons')
      .then(({ data }) => setVideos((data?.data || []).filter((addon) => addon.isFavorite && addon.video?.url)))
      .catch((error) => console.error('Could not load add-on videos:', error))
  }, [])

  useEffect(() => {
    if (videos.length < 2) return undefined
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % videos.length), 7000)
    return () => window.clearInterval(timer)
  }, [videos.length])

  if (!videos.length) return null

  const displayedVideos = Array.from({ length: Math.min(3, videos.length) }, (_, offset) => videos[(index + offset) % videos.length])
  const move = (direction) => setIndex((current) => (current + direction + videos.length) % videos.length)

  return <section className="border-y border-slate-200 bg-slate-50 py-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">TallyPrime add-ons</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Add-on video demonstrations</h2>
          <p className="mt-2 text-slate-600">Browse videos marked as favorites in the admin panel.</p>
        </div>
        {videos.length > 1 && <div className="flex shrink-0 gap-2" aria-label="Add-on video controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous add-on videos" className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next add-on videos" className="grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white">
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {displayedVideos.map((video, videoIndex) => <VideoCard key={`${video._id || video.slug}-${index + videoIndex}`} video={video} />)}
      </div>
    </div>
  </section>
}

export default VideoSection
