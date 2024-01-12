import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

// Request interceptor to add token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      const { status, data } = error.response;


      if (data.exception.includes('JWT::ExpiredSignature')) {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('email')
        window.location.reload()
      }

      if (data.exception.includes("Couldn't find User")){
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('email')
        window.location.reload()
      }

      // Handle other error scenarios
      console.error('Error status:', status);
      console.error('Error data:', data);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(response)
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;