// src/pages/AdminHeroEditor.jsx
import { useState, useEffect } from 'react'
import { getHeroBannerApi, saveHeroBannerApi } from '@/services/heroApi'
import { 
  getAllProductsApi, 
  createProductApi, 
  updateProductApi, 
  deleteProductApi 
} from '@/services/productApi'
import uploadImageToCloudinary from '@/utils/uploadCloudinary'
import heroFallback from '@/assets/hero/heroImage.webp'
import {
  FaLaptopCode, FaDatabase, FaCloud, FaClipboardCheck,
  FaFileInvoiceDollar, FaServer, FaEdit, FaTrash, FaPlus,
  FaImages, FaHome, FaLayerGroup, FaSignOutAlt
} from 'react-icons/fa'
import { MdMiscellaneousServices } from 'react-icons/md'
import { BsFillGearFill } from 'react-icons/bs'
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2'
import ContentManager from '@/components/admin/ContentManager'

const STATIC_ADMIN = {
  username: 'admin',
  password: 'Admin@123',
}

const initialHeroState = {
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

const initialProductState = {
  category: 'Tally Products',
  slug: '',
  path: '',
  label: '',
  desc: '',
  description: '',
  icon: 'FaFileInvoiceDollar',
  iconBg: 'bg-blue-100',
  iconColor: 'text-blue-700',
  pricing: null,
  features: [],
  notes: [],
  useCases: [],
  ctaTitle: '',
  ctaText: ''
}

const iconOptions = [
  { value: 'FaLaptopCode', label: 'Laptop Code' },
  { value: 'FaDatabase', label: 'Database' },
  { value: 'FaCloud', label: 'Cloud' },
  { value: 'FaClipboardCheck', label: 'Clipboard Check' },
  { value: 'FaFileInvoiceDollar', label: 'File Invoice' },
  { value: 'FaServer', label: 'Server' },
  { value: 'MdMiscellaneousServices', label: 'Services' },
  { value: 'BsFillGearFill', label: 'Gear' },
  { value: 'HiOutlineWrenchScrewdriver', label: 'Wrench' },
]

export default function AdminHeroEditor() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState('hero')

  const [heroData, setHeroData] = useState(initialHeroState)
  const [bannerImage, setBannerImage] = useState(null)
  const [heroLoading, setHeroLoading] = useState(false)
  const [heroFetching, setHeroFetching] = useState(false)
  const [heroMessage, setHeroMessage] = useState('')
  const [heroError, setHeroError] = useState('')

  const [products, setProducts] = useState([])
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productData, setProductData] = useState(initialProductState)
  const [productsLoading, setProductsLoading] = useState(false)
  const [productMessage, setProductMessage] = useState('')
  const [productError, setProductError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginData.username === STATIC_ADMIN.username && loginData.password === STATIC_ADMIN.password) {
      setIsLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError('Invalid username or password')
    }
  }

  useEffect(() => {
    if (!isLoggedIn || activeTab !== 'hero') return
    const fetchHero = async () => {
      setHeroFetching(true)
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
        console.error('Hero fetch error:', err)
      } finally {
        setHeroFetching(false)
      }
    }
    fetchHero()
  }, [isLoggedIn, activeTab])

  useEffect(() => {
    if (!isLoggedIn || activeTab !== 'products') return
    fetchProducts()
  }, [isLoggedIn, activeTab])

  const fetchProducts = async () => {
    setProductsLoading(true)
    try {
      const { data } = await getAllProductsApi()
      if (data.success) setProducts(data.data)
    } catch (error) {
      console.error('Fetch products error:', error)
    } finally {
      setProductsLoading(false)
    }
  }

  const handleHeroChange = (e) => {
    const { name, value } = e.target
    setHeroData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setBannerImage(file)
      setHeroData((prev) => ({ ...prev, bannerImageUrl: URL.createObjectURL(file) }))
    }
  }

  const handleSaveHero = async (e) => {
    e.preventDefault()
    setHeroLoading(true)
    try {
      let finalImageUrl = heroData.bannerImageUrl
      if (bannerImage) {
        const uploaded = await uploadImageToCloudinary(bannerImage)
        finalImageUrl = uploaded.imageUrl
      }
      const payload = { ...heroData, bannerImageUrl: finalImageUrl }
      await saveHeroBannerApi(payload)
      setHeroMessage('Hero banner updated successfully')
      setBannerImage(null)
    } catch (err) {
      setHeroError(err.message || 'Failed to save')
    } finally {
      setHeroLoading(false)
    }
  }

  const handleProductChange = (e) => {
    const { name, value } = e.target
    setProductData(prev => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (field, value) => {
    const items = value.split('\n').filter(item => item.trim())
    setProductData(prev => ({ ...prev, [field]: items }))
  }

  const handlePricingChange = (e) => {
    try {
      const parsed = JSON.parse(e.target.value)
      setProductData(prev => ({ ...prev, pricing: parsed }))
    } catch (error) {}
  }

  const handleAddProduct = () => {
    setProductData(initialProductState)
    setEditingProduct(null)
    setShowProductForm(true)
  }

  const handleEditProduct = (product) => {
    setProductData({
      category: product.category,
      slug: product.slug,
      path: product.path,
      label: product.label,
      desc: product.desc,
      description: product.description,
      icon: product.icon,
      iconBg: product.iconBg,
      iconColor: product.iconColor,
      pricing: product.pricing,
      features: product.features,
      notes: product.notes,
      useCases: product.useCases || [],
      ctaTitle: product.ctaTitle || '',
      ctaText: product.ctaText || ''
    })
    setEditingProduct(product)
    setShowProductForm(true)
  }

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure?')) return
    try {
      await deleteProductApi(id)
      setProductMessage('Product deleted')
      fetchProducts()
    } catch (error) {
      setProductError('Failed to delete')
    }
  }

  const handleSaveProduct = async (e) => {
    e.preventDefault()
    setProductsLoading(true)
    try {
      if (editingProduct) {
        await updateProductApi(editingProduct._id, productData)
        setProductMessage('Product updated')
      } else {
        await createProductApi(productData)
        setProductMessage('Product created')
      }
      fetchProducts()
      setShowProductForm(false)
    } catch (error) {
      setProductError(error.response?.data?.message || 'Failed to save')
    } finally {
      setProductsLoading(false)
    }
  }

  const cancelProductForm = () => {
    setShowProductForm(false)
    setEditingProduct(null)
    setProductData(initialProductState)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10 flex items-center justify-center">
        <div className="max-w-md w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Admin Access</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Sign in</h1>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Username</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData((prev) => ({ ...prev, username: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
                placeholder="Admin@123"
              />
            </div>
            {loginError && <p className="text-sm text-red-600">{loginError}</p>}
            <button type="submit" className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 pt-24 md:p-6 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">Dashboard</p>
              <h2 className="text-xl font-bold text-slate-900">Website Manager</h2>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setActiveTab('hero')}
                type="button"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === 'hero' ? 'bg-blue-600 text-white' : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FaHome className="inline mr-2" />
                Hero
              </button>
              <button
                onClick={() => setActiveTab('products')}
                type="button"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === 'products' ? 'bg-blue-600 text-white' : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FaLayerGroup className="inline mr-2" />
                Products
              </button>
              <button
                onClick={() => setActiveTab('content')}
                type="button"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === 'content' ? 'bg-blue-600 text-white' : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FaImages className="inline mr-2" />
                Solutions & Content
              </button>
              <button
                onClick={() => setIsLoggedIn(false)}
                type="button"
                className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <FaSignOutAlt className="inline mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'hero' && (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <form onSubmit={handleSaveHero} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FaHome />
                Edit Hero Section
              </h3>
              <div className="mt-5 space-y-4">
                <input name="badgeText" value={heroData.badgeText} onChange={handleHeroChange} placeholder="Badge text" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
                <input name="titleLine1" value={heroData.titleLine1} onChange={handleHeroChange} placeholder="Title line 1" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
                <input name="titleLine2" value={heroData.titleLine2} onChange={handleHeroChange} placeholder="Title line 2" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
                <input name="titleHighlight" value={heroData.titleHighlight} onChange={handleHeroChange} placeholder="Highlight" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
                <textarea name="subtitle" value={heroData.subtitle} onChange={handleHeroChange} rows={4} placeholder="Subtitle" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="primaryCtaText" value={heroData.primaryCtaText} onChange={handleHeroChange} placeholder="Primary CTA" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
                  <input name="primaryCtaLink" value={heroData.primaryCtaLink} onChange={handleHeroChange} placeholder="Primary Link" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input name="secondaryCtaText" value={heroData.secondaryCtaText} onChange={handleHeroChange} placeholder="Secondary CTA" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
                  <input name="secondaryCtaLink" value={heroData.secondaryCtaLink} onChange={handleHeroChange} placeholder="Secondary Link" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm" />
                {heroMessage && <p className="text-sm text-green-600">{heroMessage}</p>}
                {heroError && <p className="text-sm text-red-600">{heroError}</p>}
                <button type="submit" disabled={heroLoading} className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
                  {heroLoading ? 'Saving...' : 'Save Hero'}
                </button>
              </div>
            </form>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Preview</h3>
              <div className="mt-5 overflow-hidden rounded-3xl bg-slate-900">
                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{heroData.badgeText}</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">{heroData.titleLine1} {heroData.titleLine2}</h2>
                  <p className="mt-3 text-sm text-white/70">{heroData.subtitle}</p>
                  <img src={heroData.bannerImageUrl || heroFallback} alt="Hero" className="mt-4 h-64 w-full rounded-xl object-cover" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Products</h3>
              <button onClick={handleAddProduct} type="button" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <FaPlus /> Add Product
              </button>
            </div>

            {showProductForm && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">{editingProduct ? 'Edit' : 'Add'} Product</h2>
                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <select name="category" value={productData.category} onChange={handleProductChange} className="w-full border rounded-lg px-4 py-2">
                      <option value="Tally Products">Tally Products</option>
                      <option value="Business Software Products">Business Software</option>
                    </select>
                    <input type="text" name="label" value={productData.label} onChange={handleProductChange} placeholder="Product Name" required className="w-full border rounded-lg px-4 py-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="slug" value={productData.slug} onChange={handleProductChange} placeholder="slug" required className="w-full border rounded-lg px-4 py-2" />
                    <input type="text" name="path" value={productData.path} onChange={handleProductChange} placeholder="/products/slug" required className="w-full border rounded-lg px-4 py-2" />
                  </div>
                  <input type="text" name="desc" value={productData.desc} onChange={handleProductChange} placeholder="Short description" required className="w-full border rounded-lg px-4 py-2" />
                  <textarea name="description" value={productData.description} onChange={handleProductChange} placeholder="Full description" required rows={4} className="w-full border rounded-lg px-4 py-2" />
                  <select name="icon" value={productData.icon} onChange={handleProductChange} className="w-full border rounded-lg px-4 py-2">
                    {iconOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                  <textarea value={JSON.stringify(productData.pricing, null, 2)} onChange={handlePricingChange} rows={6} placeholder='{"type":"plans"}' className="w-full border rounded-lg px-4 py-2 font-mono text-sm" />
                  <textarea value={productData.features.join('\n')} onChange={(e) => handleArrayChange('features', e.target.value)} rows={4} placeholder="Features (one per line)" className="w-full border rounded-lg px-4 py-2" />
                  <textarea value={productData.notes.join('\n')} onChange={(e) => handleArrayChange('notes', e.target.value)} rows={3} placeholder="Notes (one per line)" className="w-full border rounded-lg px-4 py-2" />
                  <div className="flex gap-4">
                    <button type="submit" disabled={productsLoading} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60">
                      {productsLoading ? 'Saving...' : editingProduct ? 'Update' : 'Create'}
                    </button>
                    <button type="button" onClick={cancelProductForm} className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
                  </div>
                  {productMessage && <p className="text-sm text-green-600">{productMessage}</p>}
                  {productError && <p className="text-sm text-red-600">{productError}</p>}
                </form>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Slug</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 font-medium">{product.label}</td>
                      <td className="px-6 py-4"><span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{product.category}</span></td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.slug}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button onClick={() => handleEditProduct(product)} type="button" className="text-blue-600 hover:text-blue-800 text-sm"><FaEdit /> Edit</button>
                        <button onClick={() => handleDeleteProduct(product._id)} type="button" className="text-red-600 hover:text-red-800 text-sm"><FaTrash /> Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && <p className="text-center text-gray-500 py-12">No products found</p>}
            </div>
          </div>
        )}

        {activeTab === 'content' && <ContentManager />}
      </div>
    </div>
  )
}
