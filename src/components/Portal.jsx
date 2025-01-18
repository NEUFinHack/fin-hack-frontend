import { useState, useCallback } from 'react';
import { getResume, updateUser, uploadResume, removeResume } from '../api/user';
import { debounce } from 'lodash';
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { useAuthAndUserData, useUniversities } from '../hooks/onLoadHooks'; // Adjust path as needed

export default function HackathonForm() {
  const {
    formData,
    setFormData,
    resumeFile,
    setResumeFile,
    isLoading: userLoading,
    error: userError
  } = useAuthAndUserData();

  const {
    universities,
    isLoading: uniLoading,
    error: uniError
  } = useUniversities();

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  // Debounced update handler remains the same
  const debouncedUpdateUser = useCallback(
    debounce(async (data) => {
      try {
        await updateUser(data);
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
  }, [debouncedUpdateUser, setFormData]);

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const response = await uploadResume(file);
        setFormData(prevData => ({
          ...prevData,
          resume: response.resume_id
        }));
        const resumeResponse = await getResume(response.resume_id);
        setResumeFile(resumeResponse); // You might want to fetch the actual file using getResume here
      } catch {
        alert('Failed to upload resume. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleResumeRemove = async (resumeId) => {
    try {
      await removeResume(resumeId);
      setResumeFile(null);
      setFormData((prevState) => ({
        ...prevState,
        resume: null,
      }));
    } catch {
      alert('Failed to remove resume. Please try again.');
    }
  };

  // Form validation remains the same
  const validateForm = () => {
    let newErrors = {};
    if (!formData.school_email?.endsWith('.edu')) newErrors.email = 'Must be a valid .edu email address';
    if (formData.name?.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (formData.phone_number?.length < 10) newErrors.phone_number = 'Please enter a valid phone number';
    if (formData.university?.length < 2) newErrors.university = 'University is required';
    if (formData.major?.length < 2) newErrors.major = 'Major is required';
    if (formData.graduation_year?.length !== 4) newErrors.graduation_year = 'Please enter a valid year';
    if (!formData.over_18) newErrors.over_18 = 'Please select an option';
    if (!formData.resume && !resumeFile) newErrors.resume = 'Resume is required';
    if (formData.linkedin && !formData.linkedin.startsWith('https://www.linkedin.com/')) newErrors.linkedin = 'Please enter a valid LinkedIn URL';
    if (!formData.tshirt) newErrors.tshirt = 'Please select a T-shirt size';
    if (!formData.gender) newErrors.gender = 'Please select a gender';
    if (!formData.race) newErrors.race = 'Please select a race';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await updateUser({ ...formData, submitted: true });
        setFormData(prevData => ({ ...prevData, submitted: true }));
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again.');
      }
    } else {
      alert('Form has errors. Please correct them before submitting.');
    }
  };

  const signOut = () => {
    window.localStorage.removeItem("authToken");
    navigate('/');
  }

  // Handle loading states
  if (userLoading || uniLoading) {
    return (
      <div className="min-h-screen bg-[#0a1628] p-6 text-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="animate-spin h-6 w-6" />
          <p className="text-xl text-gray-300">Loading application data...</p>
        </div>
      </div>
    );
  }

  // Handle errors
  if (userError || uniError) {
    return (
      <div className="min-h-screen bg-[#0a1628] p-6 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400">Error loading application</p>
          <p className="text-gray-300 mt-2">{userError || uniError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="mx-auto max-w-3xl mt-20 mb-32">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold">Application Form</h1>

          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <span className="text-green-400 mr-2">
                {formData.submitted ? 'Submitted' : 'In Progress'}
              </span>
              {!formData.submitted && isSaving && (
                <Loader2 className="animate-spin h-4 w-4 text-green-400" />
              )}
            </div>

            <span className="text-gray-300 ml-2">
              {formData.google_email}
            </span>

            <button
              onClick={() => signOut()}
              className="ml-0 sm:ml-4 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors duration-300 w-full sm:w-auto"
            >
              Log Out
            </button>
          </div>
        </div>

        {!formData.submitted ? (
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6 ">
            <h3 className='text-sm font-medium text-gray-300'>Application due January 10th 11:59 PM PST</h3>
            <p></p>
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
                    className="mt-1 h-7 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50 pl-1"
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
                    className="mt-1 h-7 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50 pl-1"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={formData.phone_number || ''}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-7 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50 pl-1"
                  />
                  {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
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
                    className="mt-1 h-7 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50 pl-1"
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
                    className="mt-1 h-7 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50 pl-1"
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
                    className="mt-1 h-7 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
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
                <label htmlFor="over_18" className="block text-sm font-medium text-gray-300">
                  Are you over 18 on the hackathon date?
                </label>
                <select
                  id="over_18"
                  name="over_18"
                  value={formData.over_18 || ''}
                  onChange={handleInputChange}
                  required
                  className="mt-1 h-7 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50 pl-1"
                >
                  <option value="">Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.over_18 && <p className="mt-1 text-sm text-red-500">{errors.over_18}</p>}
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
                  className="mt-1 h-7 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50 pl-1"
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
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50 pl-1"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="tshirt" className="block text-sm font-medium text-gray-300">
                    T-shirt Size
                  </label>
                  <select
                    id="tshirt"
                    name="tshirt"
                    value={formData.tshirt || ''}
                    onChange={handleInputChange}
                    required
                    className="mt-1 h-7 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50 pl-1"
                  >
                    <option value="">Select size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                  {errors.tshirt && <p className="mt-1 text-sm text-red-500">{errors.tshirt}</p>}
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
                    className="mt-1 h-7 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50 pl-1"
                  >
                    <option value="">Select gender</option>
                    <option value="woman">Woman</option>
                    <option value="men">Man</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer not to say">Prefer not to say</option>
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
                    className="mt-1 h-7 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50 pl-1"
                  >
                    <option value="">Select race</option>
                    <option value="american indian / alaska native">American Indian / Alaska Native</option>
                    <option value="native hawaiian / other pacific islander">Native Hawaiian / Other Pacific Islander</option>
                    <option value="asian">Asian</option>
                    <option value="white">White</option>
                    <option value="black / african american">Black / African American</option>
                    <option value="hispanic / latino">Hispanic / Latino</option>
                    <option value="prefer not to say">Prefer not to say</option>
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