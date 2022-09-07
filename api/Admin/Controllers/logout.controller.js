import RefreshToken from "../Models/RefreshToken.schema.js";
import ErrorResponse from "../../Shared/Responses/error.response.js";
import log from "../../Shared/Helpers/log.js";

/**
 * @description Generate a new access token using the provided refresh token.
 */
export default async (req, res) => {
    await RefreshToken.deleteOne({ token: req.cookies['refresh-token'] });
    res.clearCookie("refresh-token");

    log({
        errorCode: 200,
        hint: `User: "${req.user.username}" has logged out.`
    }, () => res.status(200).json(
        new ErrorResponse("Logged out.", {redirect: process.env.UNAUTHENTICATED_REDIRECT_PATH})
    ));
}