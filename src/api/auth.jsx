import axiosInstance from './axios';

export const isTokenExpired = () => {
    axiosInstance.post('/api/auth/validate_token')
      .then(response => {
        return false;
      })
      .catch(error => {
        localStorage.removeItem('authToken');
        return true;
      });
};
  