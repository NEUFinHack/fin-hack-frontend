import { useState, useEffect, useCallback } from 'react';
import { isTokenExpired } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { createUser, getUserByEmail, getResume, updateUser, uploadResume, removeResume } from '../api/user';
import axios from 'axios';
import { debounce } from 'lodash';
import { Loader2 } from 'lucide-react'


export default function HackathonForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [resumeFile, setResumeFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const checkUserLogin = async () => {
      await isTokenExpired(navigate);
    }

    const getCurrentUser = async () => {
      try {
        const response = await getUserByEmail();
        setFormData(response);
        if (response.resume) {
          try {
            const resumeFile = await getResume(response.resume);
            setResumeFile(resumeFile);
          } catch {
            alert("Failed Getting Resume");
          }
        }
      } catch {
        try {
          const createResponse = await createUser(); 
          setFormData(createResponse.user); 
        } catch {
          alert("Failed Creating Application. Please Contact Admin");
          return (
            <></>
          )
        }
      } finally {
        setIsLoading(false);
      }
    }

    checkUserLogin();
    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get('http://universities.hipolabs.com/search?country=United States');
        setUniversities(response.data);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  const debouncedUpdateUser = useCallback(
    debounce(async (data) => {
      try {
        await updateUser(data)
      } catch {
        alert("Error Updating Application. Please Contact Admin");
      } finally {
        setIsSaving(false);
      }
    }, 5000),
    []
  );

  const handleInputChange = useCallback((event) => {
    const { name, value, type } = event.target;
    setIsSaving(true);

    if (type !== 'file') {
      setFormData(prevData => {
        const newFormData = { ...prevData, [name]: value };
        debouncedUpdateUser(newFormData);
        return newFormData;
      });
    }

  }, [debouncedUpdateUser]);

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const response = await uploadResume(file);
        const user = await getUserByEmail();
        setFormData(user);
        const resumeFile = await getResume(response.resume_id);
        setResumeFile(resumeFile);
      } catch {
        alert('Failed to upload resume. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleResumeRemove = async (resumeId) => {
    await removeResume(resumeId);
    setResumeFile(null);
    setFormData((prevState) => ({
      ...prevState, 
      ['resume']: null, 
    }));
  }

  const validateForm = () => {
    let newErrors = {};
    if (!formData.school_email?.endsWith('.edu')) newErrors.email = 'Must be a valid .edu email address';
    if (formData.name?.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (formData.phone?.length < 10) newErrors.phone = 'Please enter a valid phone number';
    if (formData.university?.length < 2) newErrors.university = 'University is required';
    if (formData.major?.length < 2) newErrors.major = 'Major is required';
    if (formData.graduation_year?.length !== 4) newErrors.graduation_year = 'Please enter a valid year';
    if (!formData.isOver18) newErrors.isOver18 = 'Please select an option';
    if (!formData.resume && !resumeFile) newErrors.resume = 'Resume is required';
    if (formData.linkedin && !formData.linkedin.startsWith('https://linkedin.com/')) newErrors.linkedin = 'Please enter a valid LinkedIn URL';
    if (!formData.tshirtSize) newErrors.tshirtSize = 'Please select a T-shirt size';
    if (!formData.gender) newErrors.gender = 'Please select a gender';
    if (!formData.race) newErrors.race = 'Please select a race';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await updateUser({ ...formData, isSubmitted: true });
        setFormData(prevData => ({ ...prevData, isSubmitted: true }));
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again.');
      }
    } else {
      alert('Form has errors. Please correct them before submitting.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a1628] p-6 text-white flex items-center justify-center">
        <p className="text-xl text-gray-300">Loading application data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="mx-auto max-w-3xl mt-20 mb-32">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Application Form</h1>
          <div className="flex items-center">
            <span className="text-green-400 mr-2">
              {formData.isSubmitted ? 'Submitted' : 'In Progress'}
            </span>
            {!formData.submitted && isSaving && (
              <Loader2 className="animate-spin h-4 w-4 text-green-400" />
            )}
            <span className="text-gray-300 ml-2">{formData.google_email}</span>
          </div>
        </div>

        {!formData.isSubmitted ? (
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 ">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="school_email" className="block text-sm font-medium text-gray-300">
                    School Email
                  </label>
                  <input
                    type="school_email"
                    id="school_email"
                    name="school_email"
                    value={formData.school_email || ''}
                    onChange={handleInputChange}
                    required
                    placeholder="johndoe@university.edu"
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-300">
                    University
                  </label>
                  <select
                    id="university"
                    name="university"
                    value={formData.university || ''}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                  >
                    <option value="">Select a university</option>
                    {universities.map((uni, index) => (
                      <option key={index} value={uni.name}>
                        {uni.name}
                      </option>
                    ))}
                  </select>
                  {errors.university && <p className="mt-1 text-sm text-red-500">{errors.university}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="major" className="block text-sm font-medium text-gray-300">
                    Major
                  </label>
                  <input
                    type="text"
                    id="major"
                    name="major"
                    value={formData.major || ''}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                  />
                  {errors.major && <p className="mt-1 text-sm text-red-500">{errors.major}</p>}
                </div>
                <div>
                  <label htmlFor="graduation_year" className="block text-sm font-medium text-gray-300">
                    Graduation Year
                  </label>
                  <select
                    id="graduation_year"
                    name="graduation_year"
                    value={formData.graduation_year || ''}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                  >
                    <option value="">Select Year</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.graduation_year && <p className="mt-1 text-sm text-red-500">{errors.graduation_year}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="isOver18" className="block text-sm font-medium text-gray-300">
                  Are you over 18 on the hackathon date?
                </label>
                <select
                  id="isOver18"
                  name="isOver18"
                  value={formData.isOver18 || ''}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.isOver18 && <p className="mt-1 text-sm text-red-500">{errors.isOver18}</p>}
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-300">
                  Resume (PDF)
                </label>
                {resumeFile ? (
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-300">Current resume: </span>
                      <a
                        href={URL.createObjectURL(resumeFile.data, { type: resumeFile.headers['content-type'] })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300"
                      >
                        Preview Resume
                      </a>
                      <button
                        type="button"
                        onClick={() => handleResumeRemove(formData.resume)}
                        className="text-xs text-red-500 hover:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleResumeUpload}
                    accept=".pdf"
                    required
                    className="mt-1 block w-full text-sm text-gray-300
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-gray-700 file:text-white
                    hover:file:bg-gray-600"
                  />
                )}
                {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 rounded-md">
                      <p className="text-white">Uploading resume...</p>
                    </div>
                )}
                {errors.resume && <p className="mt-1 text-sm text-red-500">{errors.resume}</p>}
              </div>

              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300">
                  LinkedIn (optional)
                </label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                />
                {errors.linkedin && <p className="mt-1 text-sm text-red-500">{errors.linkedin}</p>}
              </div>

              <div>
                <label htmlFor="additionalFile" className="block text-sm font-medium text-gray-300">
                  Additional File (optional)
                </label>
                <input
                  type="file"
                  id="additionalFile"
                  name="additionalFile"
                  onChange={handleInputChange}
                  className="mt-1 block w-full text-sm text-gray-300
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gray-700 file:text-white
                  hover:file:bg-gray-600"
                />
              </div>

              <div>
                <label htmlFor="foodRestrictions" className="block text-sm font-medium text-gray-300">
                  Food Restrictions (optional)
                </label>
                <textarea
                  id="foodRestrictions"
                  name="foodRestrictions"
                  rows="3"
                  value={formData.foodRestrictions || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="tshirtSize" className="block text-sm font-medium text-gray-300">
                    T-shirt Size
                  </label>
                  <select
                    id="tshirtSize"
                    name="tshirtSize"
                    value={formData.tshirtSize || ''}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                  >
                    <option value="">Select size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                  {errors.tshirtSize && <p className="mt-1 text-sm text-red-500">{errors.tshirtSize}</p>}
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                  >
                    <option value="">Select gender</option>
                    <option value="woman">Woman</option>
                    <option value="man">Man</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
                </div>
                <div>
                  <label htmlFor="race" className="block text-sm font-medium text-gray-300">
                    Race
                  </label>
                  <select
                    id="race"
                    name="race"
                    value={formData.race || ''}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                  >
                    <option value="">Select race</option>
                    <option value="american-indian-alaska-native">American Indian / Alaska Native</option>
                    <option value="native-hawaiian-pacific-islander">Native Hawaiian / Other Pacific Islander</option>
                    <option value="asian">Asian</option>
                    <option value="white">White</option>
                    <option value="black-african-american">Black / African American</option>
                    <option value="hispanic-latino">Hispanic / Latino</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.race && <p className="mt-1 text-sm text-red-500">{errors.race}</p>}
                </div>
              </div>

              <button type="submit" className="w-full rounded-md bg-[#9FEF00] px-4 py-2 font-medium text-gray-900 hover:bg-[#87C43C] transition-colors duration-300">
                Submit Application
              </button>
            </form>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 text-center">
            <p className="text-xl text-[#9FEF00]">Your application has been submitted successfully!</p>
            <p className="mt-4 text-gray-300">Thank you for applying to our hackathon.</p>
          </div>
        )}
      </div>
    </div>
  );
}