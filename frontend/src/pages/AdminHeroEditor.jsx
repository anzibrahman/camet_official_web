import { getHeroBannerApi, saveHeroBannerApi } from '@/services/heroApi'
import { useEffect, useState } from 'react'
import heroFallback from '@/assets/hero/heroImage.webp'
import uploadImageToCloudinary from '@/utils/uploadCloudinary'

const STATIC_ADMIN = {
  username: 'admin',
  password: 'Admin@123',
}

const initialState = {
  badgeText: '',
  titleLine1: '',
  titleLine2: '',
  titleHighlight: '',
  subtitle: '',
  primaryCtaText: '',
  primaryCtaLink: '',
  secondaryCtaText: '',
  secondaryCtaLink: '',
  bannerImageUrl: '',
}

export default function AdminHeroEditor() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')

  const [heroData, setHeroData] = useState(initialState)
  const [bannerImage, setBannerImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    if (
      loginData.username === STATIC_ADMIN.username &&
      loginData.password === STATIC_ADMIN.password
    ) {
      setIsLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError('Invalid username or password')
    }
  }

  useEffect(() => {
    if (!isLoggedIn) return

    const fetchHero = async () => {
      setFetching(true)
      setError('')

      try {
        const { data } = await getHeroBannerApi()

        if (data?.hero) {
          setHeroData({
            badgeText: data.hero.badgeText || '',
            titleLine1: data.hero.titleLine1 || '',
            titleLine2: data.hero.titleLine2 || '',
            titleHighlight: data.hero.titleHighlight || '',
            subtitle: data.hero.subtitle || '',
            primaryCtaText: data.hero.primaryCtaText || '',
            primaryCtaLink: data.hero.primaryCtaLink || '',
            secondaryCtaText: data.hero.secondaryCtaText || '',
            secondaryCtaLink: data.hero.secondaryCtaLink || '',
            bannerImageUrl: data.hero.bannerImageUrl || '',
          })
        }
      } catch (err) {
        const apiMessage = err?.response?.data?.message || ''

        if (apiMessage !== 'Hero banner not found') {
          setError(apiMessage || 'Failed to load hero banner')
        }

        setHeroData(initialState)
      } finally {
        setFetching(false)
      }
    }

    fetchHero()
  }, [isLoggedIn])

  const handleChange = (e) => {
    const { name, value } = e.target
    setHeroData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]

    if (file) {
      setBannerImage(file)
      setHeroData((prev) => ({
        ...prev,
        bannerImageUrl: URL.createObjectURL(file),
      }))
    }
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setMessage('')
  setError('')

  try {
    let finalImageUrl = heroData.bannerImageUrl
    let finalPublicId = heroData.bannerImagePublicId || ''

    console.log('Before upload:', { finalImageUrl, finalPublicId, bannerImage })

    if (bannerImage) {
      const uploaded = await uploadImageToCloudinary(bannerImage)
      console.log('Cloudinary uploaded response:', uploaded)

      finalImageUrl = uploaded.imageUrl
      finalPublicId = uploaded.publicId
    }

    const payload = {
      badgeText: heroData.badgeText,
      titleLine1: heroData.titleLine1,
      titleLine2: heroData.titleLine2,
      titleHighlight: heroData.titleHighlight,
      subtitle: heroData.subtitle,
      primaryCtaText: heroData.primaryCtaText,
      primaryCtaLink: heroData.primaryCtaLink,
      secondaryCtaText: heroData.secondaryCtaText,
      secondaryCtaLink: heroData.secondaryCtaLink,
      bannerImageUrl: finalImageUrl,
      bannerImagePublicId: finalPublicId,
    }

    console.log('Payload sent to backend:', payload)

    const { data } = await saveHeroBannerApi(payload)
    console.log('Backend response:', data)

    setMessage(data?.message || 'Hero banner updated successfully')
  } catch (err) {
    console.error('Submit error:', err)
    setError(err?.response?.data?.message || err.message || 'Failed to save hero banner')
  } finally {
    setLoading(false)
  }
}

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Admin Access
          </p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">
            Sign in to manage hero section
          </h1>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) =>
                  setLoginData((prev) => ({ ...prev, username: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                placeholder="Enter password"
              />
            </div>

            {loginError && <p className="text-sm text-red-600">{loginError}</p>}

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (fetching) {
    return <div className="p-6">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Dashboard
            </p>
            <h2 className="text-xl font-bold text-slate-900">Hero Section Editor</h2>
          </div>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-900">Edit Content</h3>

            <div className="mt-5 space-y-4">
              <input
                name="badgeText"
                value={heroData.badgeText}
                onChange={handleChange}
                placeholder="Badge text"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

              <input
                name="titleLine1"
                value={heroData.titleLine1}
                onChange={handleChange}
                placeholder="Title line 1"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

              <input
                name="titleLine2"
                value={heroData.titleLine2}
                onChange={handleChange}
                placeholder="Title line 2"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

              <input
                name="titleHighlight"
                value={heroData.titleHighlight}
                onChange={handleChange}
                placeholder="Highlight text"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

              <textarea
                name="subtitle"
                value={heroData.subtitle}
                onChange={handleChange}
                rows={4}
                placeholder="Subtitle"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  name="primaryCtaText"
                  value={heroData.primaryCtaText}
                  onChange={handleChange}
                  placeholder="Primary CTA text"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
                <input
                  name="primaryCtaLink"
                  value={heroData.primaryCtaLink}
                  onChange={handleChange}
                  placeholder="Primary CTA link"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  name="secondaryCtaText"
                  value={heroData.secondaryCtaText}
                  onChange={handleChange}
                  placeholder="Secondary CTA text"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
                <input
                  name="secondaryCtaLink"
                  value={heroData.secondaryCtaLink}
                  onChange={handleChange}
                  placeholder="Secondary CTA link"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
              />

              {message && <p className="text-sm text-green-600">{message}</p>}
              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? 'Saving...' : 'Save Hero Banner'}
              </button>
            </div>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Live Preview</h3>

            <div className="mt-5 overflow-hidden rounded-3xl bg-slate-900">
              <div className="grid grid-cols-1 items-center gap-8 px-6 py-10 md:grid-cols-2 md:px-8">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                    {heroData.badgeText}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold leading-tight text-white">
                    {heroData.titleLine1}
                    <br />
                    {heroData.titleLine2}
                    <span className="block text-white/70">{heroData.titleHighlight}</span>
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/70">
                    {heroData.subtitle}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={heroData.primaryCtaLink || '#'}
                      className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
                    >
                      {heroData.primaryCtaText || 'Primary CTA'}
                    </a>
                    <a
                      href={heroData.secondaryCtaLink || '#'}
                      className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white"
                    >
                      {heroData.secondaryCtaText || 'Secondary CTA'}
                    </a>
                  </div>
                </div>

                <div>
                  <img
                    src={heroData.bannerImageUrl || heroFallback}
                    alt="Hero preview"
                    className="h-[320px] w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}