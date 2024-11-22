import axiosInstance from './axios';

export const isTokenExpired = async (navigate) => {
  axiosInstance.get('/api/auth/validate_token')
  .catch(() => {
    alert("Session Expired. Please Login Again.");
    navigate('/');
  });
};
  