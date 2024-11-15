import axiosInstance from './axios';

export const getUserByEmail = async () => {
  try {
    const response = await axiosInstance.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const createUser = async () => {
    try {
        const response = await axiosInstance.post('/user');
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

export const updateUser = async (userData) => {
  try {
    const response = await axiosInstance.put('/user', userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

export const uploadResume = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file); 
  
      const response = await axiosInstance.post('/user/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading resume:', error);
      throw error;
    }
};

export const getResume = async (resumeId) => {
    try {
        const response = await axiosInstance.get(`/user/resume/${resumeId}`);
        return response;
    } catch (error) {
        console.error('Error fetching resume:', error);
        throw error;
    }
}
