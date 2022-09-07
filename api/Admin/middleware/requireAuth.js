import jwt from "jsonwebtoken";
import ErrorResponse from "../../Shared/Responses/error.response.js";

/**
 * @description Verifies that a user is authenticated and appends the user data to the request object.
 */
export default (req, res, next) => {
    const token = req.header('access-token');

    if (!token) return res.status(401).json(new ErrorResponse("User is not authroised to access this resource.", {redirect: process.env.UNAUTHENTICATED_REDIRECT_PATH}));
    
    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        // If user has a valid token.
        req.user = verified;

        // Continue to next request handler.
        next();
    } catch (err) {
        // If the token is not validated i.e. it has expired.
        res.status(400).json(new ErrorResponse("Invalid token.", {redirect: process.env.UNAUTHENTICATED_REDIRECT_PATH}));
    }
}