import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { 
    responseHelper, 
    message,
    status
} from "../_helpers/ResponseHelper.js";

import DB from "../../db.config.js";

dotenv.config();
const USER_CREDENTIALS = DB.user_credentials;

export const LogoutV2 = (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === undefined) return responseHelper(res, status.errorToken, message.tokenNotFound);

    const payload = {
        browser: "",
        version: "",
        os: "",
        platform: "",
        userRole: "",
        refreshToken: "",
        accessToken: ""
    };

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, tokenResults) => {
        // console.log(tokenResults);
        if (tokenResults === undefined) {
            responseHelper(res, status.errorToken, "Refresh token invalid, Please Login again !!");
        }
        else {
            USER_CREDENTIALS.findOneAndUpdate({ _id: tokenResults.id }, payload, {new: true}, (error, results) => {
                if (results) return responseHelper(res, status.success, "Logged Out", {userStatus: "Unauthorized"});
                return responseHelper(res, status.errorServer, message.errorServer, error);
            });
            // responseHelper(res, status.success, message.tokenValid);
        }
    });
}