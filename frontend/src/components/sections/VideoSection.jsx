import { useEffect, useState } from 'react'
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

function VideoSection() {
  const [videos, setVideos] = useState([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    api.get('/addons')
      .then(({ data }) => setVideos((data?.data || []).filter((addon) => addon.video?.url)))
      .catch((error) => console.error('Could not load add-on videos:', error))
  }, [])

  useEffect(() => {
    if (videos.length < 2) return undefined
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % videos.length), 7000)
    return () => window.clearInterval(timer)
  }, [videos.length])

  if (!videos.length) return null

  const current = videos[index % videos.length]
  const url = current.video.url
  const embedUrl = toEmbedUrl(url)

  return <section className="border-y border-slate-200 bg-slate-50 py-16"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="mb-8 text-center"><p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">TallyPrime add-ons</p><h2 className="mt-2 text-3xl font-bold text-slate-900">Add-on video demonstrations</h2><p className="mt-2 text-slate-600">Browse videos added from the admin panel.</p></div><div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl"><div className="relative aspect-video">{embedUrl ? <iframe key={url} src={embedUrl} title={current.title} className="absolute inset-0 h-full w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /> : <video key={url} src={url} controls className="absolute inset-0 h-full w-full object-contain" />}</div><div className="flex items-center justify-between gap-4 bg-white px-5 py-4"><div><p className="font-semibold text-slate-900">{current.title}</p><p className="text-sm text-slate-600">{current.subtitle}</p></div>{videos.length > 1 && <div className="flex gap-2">{videos.map((video, videoIndex) => <button key={video._id || video.slug} onClick={() => setIndex(videoIndex)} aria-label={`Show ${video.title}`} className={`h-2.5 w-2.5 rounded-full ${videoIndex === index ? 'bg-blue-600' : 'bg-slate-300'}`} />)}</div>}</div></div></div></section>
}

export default VideoSection
