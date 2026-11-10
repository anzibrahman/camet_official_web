import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BookServiceButton from './components/common/BookServiceButton'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import FloatingWhatsApp from './components/common/FloatingWhatsApp'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const openBooking = searchParams.get('bookService') === 'true'
  const licenceNumber = searchParams.get('licenceNumber')?.trim() || ''

  function dismissBooking() {
    const params = new URLSearchParams(location.search)
    params.delete('bookService')
    params.delete('licenceNumber')
    navigate({ pathname: location.pathname, search: params.toString() ? `?${params}` : '', hash: location.hash }, { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      {openBooking && <BookServiceButton key={location.key} autoOpen hideTrigger initialLicenceNumber={licenceNumber} onDismiss={dismissBooking} />}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
