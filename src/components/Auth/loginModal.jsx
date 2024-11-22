import { useEffect} from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const LoginModal = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        navigate('/portal');
    }
  }, [navigate]);

  const onSuccess = (message) => {
    window.localStorage.setItem('authToken', message.credential);
    closeModal();
    navigate('/portal');
  };

  const onFail = () => {
    alert("Login Failed. Please Try Again");
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg p-8 w-full max-w-md shadow-lg">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>

            {/* Modal Content */}
            <h1 className="text-3xl font-bold text-[#0a1628] text-center mb-6">
              LOGIN
            </h1>
            <div className="text-center">
              <GoogleLogin onSuccess={onSuccess} onError={onFail}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

LoginModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

export default LoginModal;
