import { googleLogout } from "@react-oauth/google";

const Logout = () => {
    return (
        <>
            <button onClick={googleLogout}>
                log out
            </button>
        </>
    )
}

export default Logout;