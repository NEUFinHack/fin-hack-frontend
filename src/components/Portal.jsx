import  { useState, useEffect } from 'react';

export default function HackathonForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    university: '',
    major: '',
    graduationYear: '',
    isOver18: '',
    resume: null,
    linkedin: '',
    additionalFile: null,
    foodRestrictions: '',
    tshirtSize: '',
    gender: '',
    race: ''
  });

  const [errors, setErrors] = useState({});

  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('http://universities.hipolabs.com/search?country=United States');
        const data = await response.json();
        setUniversities(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching universities:', error);
        setIsLoading(false);
      }
    };

    fetchUniversities();
  }, []);


  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.endsWith('.edu')) newErrors.email = 'Must be a valid .edu email address';
    if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (formData.phone.length < 10) newErrors.phone = 'Please enter a valid phone number';
    if (formData.university.length < 2) newErrors.university = 'University is required';
    if (formData.major.length < 2) newErrors.major = 'Major is required';
    if (formData.graduationYear.length !== 4) newErrors.graduationYear = 'Please enter a valid year';
    if (!formData.isOver18) newErrors.isOver18 = 'Please select an option';
    if (!formData.resume) newErrors.resume = 'Resume is required';
    if (formData.linkedin && !formData.linkedin.startsWith('https://linkedin.com/')) newErrors.linkedin = 'Please enter a valid LinkedIn URL';
    if (!formData.tshirtSize) newErrors.tshirtSize = 'Please select a T-shirt size';
    if (!formData.gender) newErrors.gender = 'Please select a gender';
    if (!formData.race) newErrors.race = 'Please select a race';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your server
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] p-6 text-white">
      <div className="mx-auto max-w-3xl mt-20 mb-32">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Application Form</h1>
          <span className="text-[#9FEF00]">In Progress</span>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  School Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
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
                  value={formData.name}
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
                  value={formData.phone}
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
                  value={formData.university}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                >
                <option value="">Select a university</option>
                  {isLoading ? (
                    <option value="" disabled>Loading universities...</option>
                  ) : (
                    universities.map((uni, index) => (
                      <option key={index} value={uni.name}>
                        {uni.name}
                      </option>
                    ))
                  )}
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
                  value={formData.major}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#9FEF00] focus:ring focus:ring-[#9FEF00] focus:ring-opacity-50"
                />
                {errors.major && <p className="mt-1 text-sm text-red-500">{errors.major}</p>}
              </div>
              <div>
                <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-300">
                  Graduation Year
                </label>
                <select
                  id="race"
                  name="race"
                  value={formData.race}
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
                {errors.graduationYear && <p className="mt-1 text-sm text-red-500">{errors.graduationYear}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="isOver18" className="block text-sm font-medium text-gray-300">
                Are you over 18 on the hackathon date?
              </label>
              <select
                id="isOver18"
                name="isOver18"
                value={formData.isOver18}
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
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleInputChange}
                accept=".pdf"
                required
                className="mt-1 block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-700 file:text-white
                hover:file:bg-gray-600"
              />
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
                value={formData.linkedin}
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
                value={formData.foodRestrictions}
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
                  value={formData.tshirtSize}
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
                  value={formData.gender}
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
                  value={formData.race}
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
      </div>
    </div>
  );
}