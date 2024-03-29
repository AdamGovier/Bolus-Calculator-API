import axios from "axios";
import setToken from "./setToken";

/**
 * @description Refresh the access-token
 */
export default async (router) => {
    const refreshTime = await refresher();

    setInterval(() => {
        refresher(); // 5s to give room for the request to complete.
    }, refreshTime - 10000); 



    return;

    async function refresher() {
        const res = await axios.post(`${process.env.VUE_APP_ENDPOINT}/api/admin/refreshToken`);
    
        // If not successful in refreshing access token.
        if(res.data.error) return router.push(`${res.data.redirect}`);
    
        // Set the new access token.
        setToken(res.headers["access-token"]);
    
        return res.data.expiresIn;
    }
}