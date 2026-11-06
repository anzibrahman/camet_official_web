import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const contactForm = pathname === '/contact'
      ? document.getElementById('contact-form')
      : null

    if (contactForm) {
      contactForm.scrollIntoView({ block: 'start', behavior: 'instant' })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname])

  return null
}

export default ScrollToTop
