export const SITE_URL = 'https://camet.in'

// Use the returned URL for the Book a Service button in Tally.
export function getBookServiceUrl(licenceNumber = '') {
  const url = new URL('/', SITE_URL)
  url.searchParams.set('bookService', 'true')
  const licence = String(licenceNumber).trim()
  if (licence) url.searchParams.set('licenceNumber', licence)
  return url.toString()
}

export const COMPANY_INFO = {
  name: 'CAMTIT Solutions',
  tagline: 'Your IT Partner for Growth',
  email: 'Admin@camet.in',
  phone: '+91 XXXXX XXXXX',
  location: 'Kerala, India'
}
