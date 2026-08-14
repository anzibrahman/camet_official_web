import axios from 'axios'

// Every Express API route is mounted below /api. VITE_API_URL can override this
// for a deployed backend, while local development uses the configured port.
const baseUrl = import.meta.env.VITE_API_URL || (
  import.meta.env.VITE_ENV === 'development'
    ? 'http://localhost:7000/api'
    : '/api'
)

const api = axios.create({ baseURL: baseUrl })

export default api
