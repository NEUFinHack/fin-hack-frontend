import axiosInstance from './axios';

export const getUserByEmail = async () => {
    const response = await axiosInstance.get('api/user');
    return response.data;
};

export const createUser = async () => {
  const response = await axiosInstance.post('api/user');
  return response.data;
}

export const updateUser = async (userData) => {
    const response = await axiosInstance.put('api/user', userData);
    return response.data;
}

export const uploadResume = async (file) => {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await axiosInstance.post('api/user/resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      return response.data;
};

export const getResume = async (resumeId) => {
  const response = await axiosInstance.get(`api/user/resume/${resumeId}`,
  {
    responseType: 'blob', // Important for handling files
  }
  );
  return response;
}


export const removeResume = async (resumeId) => {
    const response = await axiosInstance.delete(`api/user/resume/${resumeId}`);
    return response.data;
}
