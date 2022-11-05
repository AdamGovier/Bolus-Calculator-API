import axios from "axios";

/**
 * ! This function stores authentication token in memory using the axios defaults to auto append the auth-token header.
 * ? https://katifrantz.com/the-ultimate-guide-to-jwt-client-side-authentication-stop-using-local-storage
 */
export default token => {
    axios.defaults.headers.common = {
        "X-Requested-With": "XMLHttpRequest",
        "access-token": token
    }
}