import User from "../Models/User.schema.js";
import RefreshToken from "../Models/RefreshToken.schema.js";
import ErrorResponse from "../../Shared/Responses/error.response.js";
import log from "../../Shared/Helpers/log.js";
import bcrypt from "bcryptjs";
import tokens from "../helpers/tokens.js";
import ms from "ms";

export default async (req, res) => {
    const {username, password} = req.body;

    try {

        // Find if user exists in the database.
        const user = await User.findOne({username});
        if(!user) return log({
            errorCode: 401,
            hint: `Database was provided with an unknown username: "${username}".`,
            location: "login.controller.js"
        }, () => res.status(401).json(new ErrorResponse("User does not exist!", {field: 'username'})) );

        // Compare the entered password with the hashed password in the database.
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if(!passwordsMatch) return log({
            errorCode: 401,
            hint: `An attempt was made to sign into user: "${username}" but an incorrect password was provided.`,
            location: "login.controller.js"
        }, () => res.status(401).json(new ErrorResponse("Incorrect password!", {field: 'password'})));
        
    } catch (error) {

        return log({
            errorCode: 500,
            hint: `Sever Error. Possbile loss of connection with database.`,
            location: "login.controller.js",
            fullError: error
        }, () => res.status(500).json(new ErrorResponse("Internal Server Error, please try again later.", {field: 'username'})));
    
    }

    // If all is successful.
    const accessToken = tokens.createAccessToken(username);
    const refreshToken = tokens.createRefreshToken(username);

    res.header('access-token', accessToken);
    res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 1000 * 60 * 60 * 24 * 30), // 30 days
    });

    const tokenStore = new RefreshToken({token: refreshToken});
    await tokenStore.save();

    return log({
        errorCode: 200,
        hint: `Admin: "${username}" has successfully logged in.`
    }, () => 
        res.status(200).json({success: true, message: "Authenticated.", expiresIn: ms(process.env.ACCESS_EXPIRE_AFTER)})
    )
}