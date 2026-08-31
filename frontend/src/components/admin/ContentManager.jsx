import { useEffect, useState } from 'react'
import { FaEdit, FaHeart, FaPlus, FaRegHeart, FaTrash } from 'react-icons/fa'
import { createContent, deleteContent, getAdminContent, updateContent } from '@/services/contentApi'
import { uploadMediaToCloudinary } from '@/utils/uploadCloudinary'

const configs = {
  solutions: { label: 'Solutions', singular: 'Solution', defaults: { slug: '', path: '', label: '', desc: '', heroTitle: '', heroText: '', features: [], benefits: [], icon: 'FaLaptopCode', isActive: true } },
  addons: { label: 'Tally Add-ons', singular: 'Add-on', defaults: { slug: '', title: '', subtitle: '', points: [], videoUrl: '', isActive: true } },
  gallery: { label: 'Gallery', singular: 'Gallery item', defaults: { category: '', title: '', dateLabel: '', mediaUrl: '', mediaType: 'image', isActive: true } },
  reviews: { label: 'Client Reviews', singular: 'Review', defaults: { name: '', company: '', role: '', text: '', rating: 5, photoUrl: '', isActive: true } },
}

const lines = (value) => (value || []).join('\n')

export default function ContentManager() {
  const [type, setType] = useState('solutions')
  const [items, setItems] = useState([])
  const [form, setForm] = useState(configs.solutions.defaults)
  const [editing, setEditing] = useState(null)
  const [media, setMedia] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const config = configs[type]

  const load = async () => {
    setLoading(true)
    try { setItems((await getAdminContent(type)).data.data || []) }
    catch (err) { setError(err.response?.data?.message || `Could not load ${config.label}`) }
    finally { setLoading(false) }
  }

  useEffect(() => { setEditing(null); setForm(configs[type].defaults); setMedia(null); setMessage(''); load() }, [type])

  const change = (event) => setForm((old) => ({ ...old, [event.target.name]: event.target.value }))
  const arrayChange = (field, value) => setForm((old) => ({ ...old, [field]: value.split('\n').map((item) => item.trim()).filter(Boolean) }))
  const edit = (item) => { setEditing(item); setMedia(null); setForm({ ...configs[type].defaults, ...item, ...(type === 'addons' ? { videoUrl: item.video?.url || '' } : {}) }); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const reset = () => { setEditing(null); setForm(config.defaults); setMedia(null); setError(''); setMessage('') }

  const save = async (event) => {
    event.preventDefault(); setLoading(true); setError(''); setMessage('')
    try {
      const payload = { ...form, isActive: form.isActive !== false }
      if (type === 'addons') {
        const url = payload.videoUrl?.trim()
        delete payload.videoUrl
        if (url) payload.video = { url, resourceType: 'video' }
        else if (!editing) payload.video = null
      }
      if (media) {
        const uploaded = await uploadMediaToCloudinary(media)
        if (!uploaded) throw new Error('Media upload did not return a file')
        if (type === 'solutions') payload.headingVideo = uploaded
        if (type === 'gallery') Object.assign(payload, { mediaUrl: uploaded.url, publicId: uploaded.publicId, mediaType: uploaded.resourceType })
        if (type === 'reviews') Object.assign(payload, { photoUrl: uploaded.url, photoPublicId: uploaded.publicId })
      }
      if (editing) await updateContent(type, editing._id, payload)
      else await createContent(type, payload)
      setMessage(`${config.singular} ${editing ? 'updated' : 'created'} successfully`); reset(); await load()
    } catch (err) { setError(err.response?.data?.message || err.message || 'Could not save') }
    finally { setLoading(false) }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this item?')) return
    try { await deleteContent(type, id); await load() } catch { setError('Could not delete item') }
  }

  const toggleFavorite = async (item) => {
    if (!item.video?.url) return
    setLoading(true)
    setError('')
    try {
      await updateContent('addons', item._id, { isFavorite: !item.isFavorite })
      await load()
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update favorite video')
    } finally {
      setLoading(false)
    }
  }

  const mediaLabel = type === 'gallery' || type === 'reviews' ? 'Photo or video' : 'Video (optional)'
  return <div>
    <div className="mb-6 flex flex-wrap gap-2">{Object.entries(configs).map(([key, item]) => <button key={key} onClick={() => setType(key)} className={`rounded-lg px-4 py-2 text-sm font-medium ${type === key ? 'bg-blue-600 text-white' : 'border border-slate-300 bg-white text-slate-700'}`}>{item.label}</button>)}</div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form onSubmit={save} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between"><h3 className="text-lg font-bold">{editing ? `Edit ${config.singular}` : `Add ${config.singular}`}</h3>{editing && <button type="button" onClick={reset} className="text-sm text-slate-600">Cancel</button>}</div>
        <div className="space-y-3">
          {type === 'solutions' && <><input name="label" value={form.label} onChange={change} placeholder="Solution name" required className="field" /><input name="slug" value={form.slug} onChange={change} placeholder="slug (example: jewellery-management)" required className="field" /><input name="path" value={form.path} onChange={change} placeholder="/solutions/your-slug" required className="field" /><input name="desc" value={form.desc} onChange={change} placeholder="Short description" required className="field" /><input name="heroTitle" value={form.heroTitle} onChange={change} placeholder="Heading" className="field" /><textarea name="heroText" value={form.heroText} onChange={change} placeholder="Heading description" className="field" rows="3" /><textarea value={lines(form.features)} onChange={(e) => arrayChange('features', e.target.value)} placeholder="Features — one per line" className="field" rows="5" /><textarea value={lines(form.benefits)} onChange={(e) => arrayChange('benefits', e.target.value)} placeholder="Benefits — one per line" className="field" rows="4" /></>}
          {type === 'addons' && <><input name="title" value={form.title} onChange={change} placeholder="Add-on name" required className="field" /><input name="slug" value={form.slug} onChange={change} placeholder="slug" required className="field" /><input name="subtitle" value={form.subtitle} onChange={change} placeholder="Short description" className="field" /><input name="videoUrl" type="url" value={form.videoUrl || ''} onChange={change} placeholder="Video URL (YouTube, Vimeo, or direct .mp4)" className="field" /><textarea value={lines(form.points)} onChange={(e) => arrayChange('points', e.target.value)} placeholder="Points — one per line" className="field" rows="6" /></>}
          {type === 'gallery' && <><input name="title" value={form.title} onChange={change} placeholder="Title" required className="field" /><input name="category" value={form.category} onChange={change} placeholder="Category (example: events)" required className="field" /><input name="dateLabel" value={form.dateLabel} onChange={change} placeholder="Date label" className="field" />{!media && <input name="mediaUrl" value={form.mediaUrl} onChange={change} placeholder="Media URL (or upload below)" required={!editing} className="field" />}</>}
          {type === 'reviews' && <><input name="name" value={form.name} onChange={change} placeholder="Client name" required className="field" /><input name="company" value={form.company} onChange={change} placeholder="Company" className="field" /><input name="role" value={form.role} onChange={change} placeholder="Role" className="field" /><textarea name="text" value={form.text} onChange={change} placeholder="Client review" required className="field" rows="5" /><input name="rating" type="number" min="1" max="5" value={form.rating} onChange={change} className="field" /></>}
          {type !== 'addons' && <label className="block text-sm font-medium text-slate-700">{mediaLabel}<input type="file" accept="image/*,video/*" onChange={(e) => setMedia(e.target.files?.[0] || null)} className="mt-1 block w-full text-sm" /></label>}
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isActive !== false} onChange={(e) => setForm((old) => ({ ...old, isActive: e.target.checked }))} />Show on website</label>
          {message && <p className="text-sm text-green-600">{message}</p>}{error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-60">{loading ? 'Saving…' : editing ? `Update ${config.singular}` : `Add ${config.singular}`}</button>
        </div>
      </form>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-200 p-5"><h3 className="font-bold">Saved {config.label}</h3></div><div className="max-h-[760px] divide-y overflow-y-auto">{items.map((item) => <div key={item._id} className="flex items-center justify-between gap-4 p-4"><div className="min-w-0"><p className="truncate font-medium">{item.label || item.title || item.name}</p><p className="truncate text-sm text-slate-500">{item.slug || item.company || item.category}</p></div><div className="flex gap-3">{type === 'addons' && <button type="button" onClick={() => toggleFavorite(item)} disabled={!item.video?.url || loading} title={item.video?.url ? (item.isFavorite ? 'Remove from home-page favorite videos' : 'Show in home-page favorite videos') : 'Add a video URL before favoriting'} aria-label={item.video?.url ? (item.isFavorite ? `Remove ${item.title} from favorite videos` : `Add ${item.title} to favorite videos`) : `${item.title} has no video URL`} className={`transition disabled:cursor-not-allowed disabled:opacity-30 ${item.isFavorite ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'}`}>{item.isFavorite ? <FaHeart /> : <FaRegHeart />}</button>}<button onClick={() => edit(item)} className="text-blue-600"><FaEdit /></button><button onClick={() => remove(item._id)} className="text-red-600"><FaTrash /></button></div></div>)}{!loading && !items.length && <p className="p-8 text-center text-sm text-slate-500">No {config.label.toLowerCase()} yet.</p>}</div></div>
    </div>
  </div>
}
