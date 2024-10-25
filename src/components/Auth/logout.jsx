import { GoogleLogout } from "@react-oauth/google";

function Logout(){
  const onSuccess = () => {
    console.log("logged out");
  }

  return(
    <div id="signInButton">
      <GoogleLogout
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        buttonText = "Logout"
        onSuccess= {onSuccess}
      />
    </div>
  )
}

export default Logout