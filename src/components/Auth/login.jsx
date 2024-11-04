import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
    const onsSuccess = (message) => {
        console.log(message);

    }

    return(
        <>
        <GoogleLogin
            onSuccess={onsSuccess}
        />
        </>
    )
}

export default Login;