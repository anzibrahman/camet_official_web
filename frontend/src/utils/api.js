import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:7000/api'
   baseURL: 'https://www.test.camet.in'
})

export default api