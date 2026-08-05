import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from '../../assets/White_Logo_HD.png'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBoxOpen } from 'react-icons/fa'
import { RiStackFill } from 'react-icons/ri'
import { products } from '@/data/Product'
import { solutions } from '@/data/solutions'

function Header() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  const headerFont = {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 200,
    fontStyle: 'normal',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  }

  const headerButtonFont = {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 200,
    fontStyle: 'normal',
    textTransform: 'uppercase',
    letterSpacing: '0.14em',
  }

  const tallyProductLinks = products.filter(
    (item) => item.category === 'Tally Products'
  )

  const ownProductLinks = products.filter(
    (item) => item.category === 'Business Software Products'
  )

  const solutionLinks = solutions.filter((item) => item.slug !== 'all-solutions')

  const allProductLinks = [...tallyProductLinks, ...ownProductLinks]

  const isActive = (path) => location.pathname === path
  const isDropdownActive = (items) =>
    items.some((item) => location.pathname === item.path)

  const getDropdownMeta = () => {
    if (openDropdown === 'products') {
      return {
        title: 'Products',
        subtitle:
          'Explore Tally products, subscriptions, deployment options, and CAMET software offerings.',
        icon: FaBoxOpen,
        iconBg: 'bg-slate-100',
        iconColor: 'text-slate-900',
      }
    }

    if (openDropdown === 'solutions') {
      return {
        title: 'Solutions',
        subtitle:
          'Browse accounting, billing, GST, inventory, automation, integration, and industry-specific business software solutions.',
        icon: RiStackFill,
        iconBg: 'bg-slate-100',
        iconColor: 'text-slate-900',
      }
    }

    return null
  }

  const MegaMenuItem = ({ item }) => {
    const Icon = item.icon

    return (
      <Link
        to={item.path}
        className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-slate-100"
      >
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}>
          <Icon className={`text-[16px] ${item.iconColor}`} />
        </div>

        <div className="min-w-0">
          <div
            className="text-[11px] leading-tight text-slate-900 group-hover:text-black"
            style={headerFont}
          >
            {item.label}
          </div>
          <div className="mt-1 text-[12px] leading-snug tracking-normal text-slate-600 normal-case">
            {item.desc}
          </div>
        </div>
      </Link>
    )
  }

  const renderMobileGroup = (title, items = []) => (
    <>
      <div
        className="px-4 pt-3 text-[11px] uppercase tracking-[0.18em] text-slate-500"
        style={headerFont}
      >
        {title}
      </div>

      {items.map((item) => {
        const Icon = item.icon

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-50"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.iconBg}`}>
              <Icon className={`text-sm ${item.iconColor}`} />
            </div>
            <span className="text-[12px] text-slate-900" style={headerFont}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </>
  )

  const dropdownMeta = getDropdownMeta()
  const LeftIcon = dropdownMeta?.icon

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/60 shadow-lg backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex h-20 items-center px-4 sm:px-6">
          <div className="flex shrink-0 items-center">
            <Link to="/" className="flex shrink-0 items-center">
              <div className="flex items-center justify-center rounded-full bg-white px-3 py-1.5 shadow-md">
                <img
                  src={logo}
                  alt="CAMET IT SOLUTIONS LLP logo"
                  className="block h-6 w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <nav className="flex items-center gap-8">
              <Link
                to="/"
                className={`text-[12px] transition-colors ${
                  isActive('/') ? 'text-white' : 'text-white/85 hover:text-white'
                }`}
                style={headerFont}
              >
                Home
              </Link>

              <Link
                to="/about"
                className={`text-[12px] transition-colors ${
                  isActive('/about') ? 'text-white' : 'text-white/85 hover:text-white'
                }`}
                style={headerFont}
              >
                About
              </Link>

              <button
                type="button"
                onMouseEnter={() => setOpenDropdown('products')}
                className={`flex items-center gap-1 text-[12px] transition-colors ${
                  isDropdownActive(allProductLinks) || openDropdown === 'products'
                    ? 'text-white'
                    : 'text-white/85 hover:text-white'
                }`}
                style={headerFont}
              >
                Products
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <Link
                to="/services"
                className={`text-[12px] transition-colors ${
                  isActive('/services') ? 'text-white' : 'text-white/85 hover:text-white'
                }`}
                style={headerFont}
              >
                Services
              </Link>

              <button
                type="button"
                onMouseEnter={() => setOpenDropdown('solutions')}
                className={`flex items-center gap-1 text-[12px] transition-colors ${
                  isDropdownActive(solutionLinks) || openDropdown === 'solutions'
                    ? 'text-white'
                    : 'text-white/85 hover:text-white'
                }`}
                style={headerFont}
              >
                Solutions
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <Link
                to="/gallery"
                className={`text-[12px] transition-colors ${
                  isActive('/gallery') ? 'text-white' : 'text-white/85 hover:text-white'
                }`}
                style={headerFont}
              >
                Gallery
              </Link>

              <Link
                to="/contact"
                className={`text-[12px] transition-colors ${
                  isActive('/contact') ? 'text-white' : 'text-white/85 hover:text-white'
                }`}
                style={headerFont}
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center lg:flex">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-2 text-[12px] text-white backdrop-blur-md transition-all hover:bg-white/20"
                style={headerButtonFont}
              >
                Book a Service
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md p-2 text-white lg:hidden"
              type="button"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {openDropdown && dropdownMeta && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-[80px] hidden lg:block"
          >
            {/* This inner div is the actual hover area for the mega menu */}
            <div
              onMouseLeave={() => setOpenDropdown(null)}
              className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12"
            >
              <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
                <div className="grid min-h-[320px] grid-cols-12">
                  <div className="col-span-4 border-r border-black/10 bg-slate-50 p-8">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${dropdownMeta.iconBg}`}>
                        {LeftIcon && (
                          <LeftIcon className={`text-[22px] ${dropdownMeta.iconColor}`} />
                        )}
                      </div>

                      <div>
                        <div
                          className="text-[11px] uppercase tracking-[0.16em] text-slate-500"
                          style={headerFont}
                        >
                          {dropdownMeta.title}
                        </div>
                        <h3 className="mt-1 text-2xl font-light text-slate-900">
                          Explore {dropdownMeta.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-6 max-w-sm text-[14px] leading-7 text-slate-600">
                      {dropdownMeta.subtitle}
                    </p>

                    <div className="mt-8 rounded-2xl border border-black/10 bg-white p-5">
                      <p className="text-[10px] text-slate-500" style={headerFont}>
                        Quick Access
                      </p>
                      <p className="mt-2 text-[15px] font-light leading-6 text-slate-900">
                        Find the right platform, subscription, feature flow, or business software for your needs.
                      </p>
                    </div>
                  </div>

                  <div className="col-span-8 max-h-[70vh] overflow-y-auto bg-white p-6">
                    {openDropdown === 'products' ? (
                      <div className="space-y-6">
                        <div>
                          <p
                            className="mb-3 px-3 text-[10px] uppercase tracking-[0.18em] text-slate-500"
                            style={headerFont}
                          >
                            Tally Products
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {tallyProductLinks.map((item) => (
                              <MegaMenuItem key={item.path} item={item} />
                            ))}
                          </div>
                        </div>

                        <div>
                          <p
                            className="mb-3 px-3 text-[10px] uppercase tracking-[0.18em] text-slate-500"
                            style={headerFont}
                          >
                            Business Software Products
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {ownProductLinks.map((item) => (
                              <MegaMenuItem key={item.path} item={item} />
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {solutionLinks.map((item) => (
                          <MegaMenuItem key={item.path} item={item} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-5 mt-3 overflow-hidden rounded-3xl border border-black/10 bg-white backdrop-blur-xl sm:mx-8 lg:hidden"
          >
            <div className="max-h-[80vh] space-y-2 overflow-y-auto p-4">
              <Link
                to="/"
                className={`block rounded-2xl px-4 py-3 text-[13px] ${
                  isActive('/') ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                }`}
                style={headerFont}
              >
                Home
              </Link>

              <Link
                to="/about"
                className={`block rounded-2xl px-4 py-3 text-[13px] ${
                  isActive('/about') ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                }`}
                style={headerFont}
              >
                About
              </Link>

              {renderMobileGroup('Tally Products', tallyProductLinks)}
              {renderMobileGroup('Business Software Products', ownProductLinks)}
              {renderMobileGroup('Solutions', solutionLinks)}

              <Link
                to="/gallery"
                className={`block rounded-2xl px-4 py-3 text-[13px] ${
                  isActive('/gallery') ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                }`}
                style={headerFont}
              >
                Gallery
              </Link>

              <Link
                to="/contact"
                className={`block rounded-2xl px-4 py-3 text-[13px] ${
                  isActive('/contact') ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                }`}
                style={headerFont}
              >
                Contact
              </Link>

              <Link
                to="/contact"
                className="block rounded-2xl border border-black/10 bg-slate-900 px-4 py-3 text-center text-[12px] text-white"
                style={headerButtonFont}
              >
                Book a Service
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header