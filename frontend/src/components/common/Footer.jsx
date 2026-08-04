import { Link } from 'react-router-dom'
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from 'react-icons/fa'

function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Services', path: '/services' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
    { label: 'Admin', path: '/Admin' }
  ]

  const productLinks = [
    { label: 'TallyPrime', path: '/products/tallyprime' },
    { label: 'TallyPrime on Cloud', path: '/products/tallyprime-cloud' },
    { label: 'TallyPrime Server', path: '/products/tallyprime-server' },
    { label: 'Tally Software Services', path: '/products/tally-software-services' },
    { label: 'Tally Virtual User', path: '/products/tally-virtual-user' },
    { label: 'Tally Customization', path: '/products/tally-customization' },
  ]

  const serviceLinks = [
    { label: 'Tally Sales & Services', path: '/services' },
    { label: 'Customized Software Solutions', path: '/services' },
    { label: 'Cloud Solutions', path: '/services' },
    { label: 'Web Application Development', path: '/services' },
    { label: 'Implementation & Migration', path: '/services' },
    { label: 'Training & User Support', path: '/services' },
  ]

  const softwareLinks = [
    { label: 'Hotel Management System', path: '/products/hotel-management-system' },
    {
      label: 'Laboratory Management System',
      path: '/products/laboratory-management-system',
    },
    {
      label: 'Industry-Specific Solutions',
      path: '/products/industry-specific-solutions',
    },
  ]

  return (
    <footer className="relative overflow-hidden bg-[#081120] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(47,111,237,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,155,217,0.14),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 xl:grid-cols-6">
          <div className="xl:col-span-2">
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/70">
              CAMET IT SOLUTIONS LLP
            </span>

            <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
              Business software, Tally solutions, and digital systems built for growing companies.
            </h3>

            <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
              CAMET IT SOLUTIONS LLP provides Tally products, cloud access, implementation support,
              customization, and industry-focused software solutions for finance, operations,
              hospitality, laboratories, and business management.
            </p>

            <Link
              to="/contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/15"
            >
              Talk to our team
              <FaArrowRight className="text-[11px] transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
              Tally Products
            </h4>
            <ul className="mt-5 space-y-3">
              {productLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
              Services
            </h4>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((item) => (
                <li key={`${item.label}-${item.path}`}>
                  <Link
                    to={item.path}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
              Software Solutions
            </h4>
            <ul className="mt-5 space-y-3">
              {softwareLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
                Contact
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-white/65">
                <li className="flex items-start gap-3">
                  <FaPhoneAlt className="mt-1 shrink-0 text-[12px] text-cyan-300" />
                  <span>9072632605
9072632606
9072632607
</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 shrink-0 text-[12px] text-cyan-300" />
                  <span>Admin@camet.in</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 shrink-0 text-[12px] text-cyan-300" />
                  <span> Kalamassery,Kerala, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-white/50">
            &copy; {currentYear} CAMET IT SOLUTIONS LLP. All rights reserved.
          </p>

          <p className="text-sm text-white/45">
            Tally services, cloud solutions, custom software, and business automation support.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer