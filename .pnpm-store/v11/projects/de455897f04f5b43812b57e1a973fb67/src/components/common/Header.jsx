import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from '../../assets/White_Logo_HD.png'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaChartLine,
  FaBoxOpen,
  FaPuzzlePiece,
  FaLaptopCode,
  FaCogs,
  FaUserCog,
  FaDatabase,
  FaCloud,
  FaClipboardCheck,
  FaFileInvoiceDollar,
} from 'react-icons/fa'
import {
  MdOutlineAssessment,
  MdMiscellaneousServices,
} from 'react-icons/md'
import { BsFillGearFill } from 'react-icons/bs'
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2'
import { RiStackFill } from 'react-icons/ri'

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

  const productLinks = [
    {
      path: '/products',
      label: 'All Products',
      desc: 'Complete CAMET product catalog',
      icon: FaBoxOpen,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-900',
    },
    {
      path: '/products/tallyprime',
      label: 'TallyPrime Rel 7.0',
      desc: 'Business management software',
      icon: FaFileInvoiceDollar,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700',
    },
    {
      path: '/products/tallyprime-server',
      label: 'TallyPrime Server',
      desc: 'Enterprise multi-user performance',
      icon: FaDatabase,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-700',
    },
    {
      path: '/products/smart-backup',
      label: 'Smart Backup++',
      desc: 'Reliable automated backup support',
      icon: FaCloud,
      iconBg: 'bg-sky-100',
      iconColor: 'text-sky-700',
    },
    {
      path: '/products/multi-file-attachment',
      label: 'Multi File Attachment',
      desc: 'Attach documents to transactions',
      icon: FaPuzzlePiece,
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-700',
    },
    {
      path: '/products/tally-sheet-magic',
      label: 'Tally Sheet Magic',
      desc: 'Advanced Excel-based reporting',
      icon: MdOutlineAssessment,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-700',
    },
    {
      path: '/products/audit-trail',
      label: 'Audit Trail & Voucher History',
      desc: 'Track changes and transaction history',
      icon: FaClipboardCheck,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-700',
    },
  ]

  const solutionLinks = [
    {
      path: '/solutions',
      label: 'All Solutions',
      desc: 'View CAMET solution areas',
      icon: RiStackFill,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-900',
    },
    {
      path: '/solutions/tally-customization',
      label: 'Tally Customization',
      desc: 'Adapt Tally to business workflows',
      icon: BsFillGearFill,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-700',
    },
    {
      path: '/solutions/business-automation',
      label: 'Business Automation',
      desc: 'Reduce manual business tasks',
      icon: MdMiscellaneousServices,
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-700',
    },
    {
      path: '/solutions/connected-business',
      label: 'Connected Workflows',
      desc: 'Streamline day-to-day operations',
      icon: HiOutlineWrenchScrewdriver,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-700',
    },
    {
      path: '/solutions/financial-reporting',
      label: 'Financial Reporting',
      desc: 'Better analytics and visibility',
      icon: FaChartLine,
      iconBg: 'bg-lime-100',
      iconColor: 'text-lime-700',
    },
    {
      path: '/solutions/software-integration',
      label: 'Software Integration',
      desc: 'Connect tools and systems',
      icon: FaCogs,
      iconBg: 'bg-rose-100',
      iconColor: 'text-rose-700',
    },
    {
      path: '/solutions/it-consulting',
      label: 'IT Consulting',
      desc: 'Architecture and transformation',
      icon: FaUserCog,
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-700',
    },
    {
      path: '/solutions/custom-software',
      label: 'Custom Software',
      desc: 'Tailored web and mobile solutions',
      icon: FaLaptopCode,
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-700',
    },
  ]

  const isActive = (path) => location.pathname === path
  const isDropdownActive = (items) => items.some((item) => location.pathname === item.path)

  const getDropdownItems = () => {
    if (openDropdown === 'products') return productLinks
    if (openDropdown === 'solutions') return solutionLinks
    return []
  }

  const getDropdownMeta = () => {
    if (openDropdown === 'products') {
      return {
        title: 'Products',
        subtitle: 'Explore software, add-ons, and tools for business operations.',
        icon: FaBoxOpen,
        iconBg: 'bg-slate-100',
        iconColor: 'text-slate-900',
      }
    }

    if (openDropdown === 'solutions') {
      return {
        title: 'Solutions',
        subtitle: 'Browse CAMET business solutions and workflow services.',
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
        className="group flex items-start gap-3 rounded-2xl p-3 hover:bg-slate-100 transition-colors"
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
          <Icon className={`text-[16px] ${item.iconColor}`} />
        </div>

        <div className="min-w-0">
          <div
            className="text-[11px] text-slate-900 leading-tight group-hover:text-black"
            style={headerFont}
          >
            {item.label}
          </div>
          <div className="text-[12px] text-slate-600 mt-1 leading-snug normal-case tracking-normal">
            {item.desc}
          </div>
        </div>
      </Link>
    )
  }

  const dropdownMeta = getDropdownMeta()
  const LeftIcon = dropdownMeta?.icon

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/60 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 ">
        <div className="flex items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-18 h-15 flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="CAMET IT SOLUTIONS LLP logo"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
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
                isDropdownActive(productLinks) || openDropdown === 'products'
                  ? 'text-white'
                  : 'text-white/85 hover:text-white'
              }`}
              style={headerFont}
            >
              Products
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

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
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <div className="hidden lg:flex items-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-2 text-white text-[12px] backdrop-blur-md hover:bg-white/20 transition-all"
              style={headerButtonFont}
            >
              Book a Service
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-white"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <AnimatePresence>
        {openDropdown && dropdownMeta && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block absolute left-0 right-0 top-[80px]"
          >
            <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
              <div className="rounded-[28px] border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] overflow-hidden">
                <div className="grid grid-cols-12 min-h-[320px]">
                  <div className="col-span-4 p-8 border-r border-black/10 bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${dropdownMeta.iconBg}`}>
                        {LeftIcon && <LeftIcon className={`text-[22px] ${dropdownMeta.iconColor}`} />}
                      </div>

                      <div>
                        <div
                          className="text-[11px] uppercase tracking-[0.16em] text-slate-500"
                          style={headerFont}
                        >
                          {dropdownMeta.title}
                        </div>
                        <h3 className="text-2xl font-light text-slate-900 mt-1">
                          Explore {dropdownMeta.title}
                        </h3>
                      </div>
                    </div>

                    <p className="mt-6 text-[14px] text-slate-600 leading-7 max-w-sm">
                      {dropdownMeta.subtitle}
                    </p>

                    <div className="mt-8 rounded-2xl border border-black/10 bg-white p-5">
                      <p
                        className="text-[10px] text-slate-500"
                        style={headerFont}
                      >
                        Quick Access
                      </p>
                      <p className="mt-2 text-slate-900 text-[15px] leading-6 font-light">
                        Find the right platform, add-on, or service flow for your business.
                      </p>
                    </div>
                  </div>

                  <div className="col-span-8 p-6 bg-white">
                    <div className="grid grid-cols-2 gap-2">
                      {getDropdownItems().map((item) => (
                        <MegaMenuItem key={item.path} item={item} />
                      ))}
                    </div>
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
            className="lg:hidden mx-5 sm:mx-8 mt-3 rounded-3xl border border-black/10 bg-white backdrop-blur-xl overflow-hidden"
          >
            <div className="p-4 space-y-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-[13px] ${
                  isActive('/') ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                }`}
                style={headerFont}
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-[13px] ${
                  isActive('/about') ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                }`}
                style={headerFont}
              >
                About
              </Link>

              <div className="px-4 pt-3 text-[11px] text-slate-500 uppercase tracking-[0.18em]" style={headerFont}>
                Products
              </div>

              {productLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-50"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                      <Icon className={`text-sm ${item.iconColor}`} />
                    </div>
                    <span className="text-[12px] text-slate-900" style={headerFont}>
                      {item.label}
                    </span>
                  </Link>
                )
              })}

              <div className="px-4 pt-3 text-[11px] text-slate-500 uppercase tracking-[0.18em]" style={headerFont}>
                Solutions
              </div>

              {solutionLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-slate-700 hover:bg-slate-50"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                      <Icon className={`text-sm ${item.iconColor}`} />
                    </div>
                    <span className="text-[12px] text-slate-900" style={headerFont}>
                      {item.label}
                    </span>
                  </Link>
                )
              })}

              <Link
                to="/gallery"
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-[13px] ${
                  isActive('/gallery') ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                }`}
                style={headerFont}
              >
                Gallery
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-2xl px-4 py-3 text-[13px] ${
                  isActive('/contact') ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                }`}
                style={headerFont}
              >
                Contact
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center rounded-2xl border border-black/10 bg-slate-900 px-4 py-3 text-white text-[12px]"
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
