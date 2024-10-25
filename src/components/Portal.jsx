import Login from "./Auth/login";
import Logout from "./Auth/logout";
import { useEffect } from "react";
import { gapi } from 'gapi-script';

function Portal() {
    const clientId = "940076628954-lf7kegiepgj5cpk6ddija1q340rsabhp.apps.googleusercontent.com"
    useEffect(() => {
        function start(){
            gapi.client.init({
                clientId: clientId,
                scope: ""})
            
        }
        gapi.load('client:auth2', start);
    });

    return (
        <div>
            <Login/>
            <Logout/>
        </div>
    );
}
export default Portal;