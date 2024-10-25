import { GoogleLogin } from "@react-oauth/google";

function Login(){
  const onSuccess = (res) => {
    console.log("success", res.profileObj);
  }

  const onFailure = (res) => {
    console.log("failed", res);
  }

  return(
    <div id="signInButton">
      <GoogleLogin
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        buttonText = "Apply"
        onSuccess= {onSuccess}
        onFailure = {onFailure}
        isSignedIn = {true}

      />
    </div>
  )
}

export default Login