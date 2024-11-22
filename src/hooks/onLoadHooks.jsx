import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail, createUser, getResume } from '../api/user';
import { isTokenExpired } from '../api/auth';
import axios from 'axios';

// Custom hook for handling authentication and user data
export const useAuthAndUserData = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const initializeUser = async () => {
      try {
        // First check authentication
        await isTokenExpired(navigate);
        
        // Then get or create user
        try {
          const response = await getUserByEmail();
          
          if (!isMounted) return;
          
          setFormData(response);
          
          // Get resume if it exists
          if (response.resume) {
            try {
              const resumeFile = await getResume(response.resume);
              if (!isMounted) return;
              setResumeFile(resumeFile);
            } catch {
              if (!isMounted) return;
              setError('Failed to fetch resume');
            }
          }
        } catch {
          // If user doesn't exist, create new user
          const createResponse = await createUser();
          if (!isMounted) return;
          setFormData(createResponse.user);
        }
      } catch {
        if (!isMounted) return;
        setError('Authentication or user creation failed');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeUser();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return { formData, setFormData, resumeFile, setResumeFile, isLoading, error };
};

// Custom hook for fetching universities
export const useUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchUniversities = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          'http://universities.hipolabs.com/search?country=united%20states',
          {
            signal: controller.signal
          }
        );
        
        if (!isMounted) return;
        
        setUniversities(response.data);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }
        
        if (!isMounted) return;
        
        setError('Failed to fetch universities');
        console.error('Error fetching universities:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchUniversities();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return { universities, isLoading, error };
};