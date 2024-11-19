import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base URL from .env file
  headers: {
    'Content-Type': 'application/json', // Default header for JSON requests
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response && error.response.status === 401) {
//         console.error('Token expired or invalid. Redirecting to login...');
//         localStorage.removeItem('authToken'); 
//         window.location.href = '/login';
//       }
//       return Promise.reject(error); 
//     }
//   );

export default axiosInstance;
