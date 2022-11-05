// Packages
import jwt from "jsonwebtoken";
import ms from "ms";

// Custom Modules & Schemas.
import tokens from "../helpers/tokens.js";
import ErrorResponse from "../../Shared/Responses/error.response.js";
import RefreshToken from "../Models/RefreshToken.schema.js";

/**
 * @description Generate a new access token using the provided refresh token.
 */
export default async (req, res) => {
    const refreshToken = req.cookies['refresh-token'];
    
    if (!refreshToken) return res.status(401).json(new ErrorResponse("User is not authroised to access this resource. MISSING REFRESH TOKEN.", {redirect: process.env.UNAUTHENTICATED_REDIRECT_PATH}));
    if (!RefreshToken.findOne({token:refreshToken})) res.status(401).json(new ErrorResponse("User is not authroised to access this resource.", {redirect: process.env.UNAUTHENTICATED_REDIRECT_PATH}));

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);

        const accessToken = tokens.createAccessToken(user.username);
        res.header('access-token', accessToken).status(200).json({message: "Token refreshed, check headers.", expiresIn: ms(process.env.ACCESS_EXPIRE_AFTER)});
    });
}