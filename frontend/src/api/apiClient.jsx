import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status, data } = error.response

      if (status === 401 || data.exception === 'JWT::ExpiredSignature') {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('email')
        window.location.href = '/login'
        return Promise.reject(error)
      }

      if (data.exception && data.exception.includes("Couldn't find User")) {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('email')
        window.location.href = '/login'
      }
      console.error('Error status:', status)
      console.error('Error data:', data)
      console.error('Full error response:', error.response)
    } else if (error.request) {
      console.error('No response received. Request details:', error.request)
    } else {
      console.error('Error during request setup:', error.message)
    }

    return Promise.reject(error)
  }
)

export default api
