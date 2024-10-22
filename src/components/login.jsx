import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const onSuccess = (response) => {
    console.log('Login Success: ', response);
    // Handle authentication, save tokens, etc.
  };

  const onError = () => {
    console.log('Login Failed');
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={onSuccess} onError={onError} />
    </div>
  );
};

export default Login;