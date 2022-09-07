import jwt from "jsonwebtoken";

export default {
    /**
     * @description Creates a new JWT access token, valid for the given time in the .env file.
     * @param {String} username, the unique username of the user stored in the database. 
     * @returns Signed JWT token
     */
    createAccessToken(username) {
        return createToken(username, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_EXPIRE_AFTER);
    },

    /**
     * @description Creates a new JWT refresh token, valid for the given time in the .env file.
     * @param {String} username, the unique username of the user stored in the database. 
     * @returns Signed JWT token
     */
    createRefreshToken(username) {
        return createToken(username, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_EXPIRE_AFTER);
    }
}

/**
 * Signs a JWT token using the paramaters provided.
 * @param {String} username 
 * @param {String} secret Key to sign with.
 * @param {String} expireAfter Token expiry date e.g. "7d", "15m", and "10s".
 * @returns JWT token.
 */
function createToken(username, secret, expireAfter) {
    return jwt.sign({
        username
    }, secret, {
        expiresIn: expireAfter
    });
}