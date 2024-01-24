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

      if (status === 401 || data.exception === 'JWT::ExpiredSignature') {
        // Token expired, clear local storage and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        window.location.href = '/login'; // Redirect to your login page
        return Promise.reject(error);
      }

      if (data.exception.includes("Couldn't find User")) {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        window.location.href = '/login';
      }

      // Log detailed information about the error
      console.error('Error status:', status);
      console.error('Error data:', data);
      console.error('Full error response:', error.response);

    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received. Request details:', error.request);
      // Handle network error scenarios, e.g., display a user-friendly message

    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error during request setup:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;