import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { 
    responseHelper, 
    message,
    status
} from "../_helpers/ResponseHelper.js";
import { authManager } from "../_helpers/authManager.js";
import { passwordChecker } from "../_helpers/passwordChecker.js";

dotenv.config();

export const CheckUserPassword = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === undefined) return responseHelper(res, status.errorToken, message.tokenNotFound);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, tokenResults) => {
        if (tokenResults === undefined) {
            responseHelper(res, status.errorToken, "Refresh token invalid, Please Login again !!");
        }
        else {
            const checkUser = await authManager.checkUserByID(tokenResults.id);
            const { password } = req.body;
            const isPasswordValid = passwordChecker(password, checkUser?.password || "");
            if (isPasswordValid) return responseHelper(res, status.success, message.passwordFound);
            return responseHelper(res, status.errorRequest, message.errorPasswordNotFound);
        }
    });
};