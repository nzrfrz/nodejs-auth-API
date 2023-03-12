import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { authManager } from "../_helpers/authManager.js";
import { 
    responseHelper, 
    message,
    status,
} from "../_helpers/ResponseHelper.js";

dotenv.config();

export const GetUserProfile = async (req, res) => {
    // const { browser, version, os, platform, isMobile } = req.headers;

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === undefined) return responseHelper(res, status.errorToken, message.tokenNotFound);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, tokenResults) => {
        if (tokenResults === undefined) {
            responseHelper(res, status.errorToken, message.errorVerifyToken);
        }
        else {
            const checkUser = await authManager.checkUserByID(tokenResults.id);
            const { password, ...userProfile } = checkUser;
            responseHelper(res, status.success, message.tokenValid, userProfile);
        }
    });
};