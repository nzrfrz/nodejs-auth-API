import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { 
    responseHelper, 
    message,
    status
} from "../_helpers/ResponseHelper.js";
import { authManager } from "../_helpers/authManager.js";
import { passwordChecker } from "../_helpers/passwordChecker.js";

import DB from "../../db.config.js";

dotenv.config();
const USER_CREDENTIALS = DB.user_credentials;

export const ChangePassword = async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === undefined) return responseHelper(res, status.errorToken, message.tokenNotFound);

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, tokenResults) => {
        if (tokenResults === undefined) {
            responseHelper(res, status.errorToken, "Refresh token invalid, Please Login again !!");
        }
        else {
            const checkUser = await authManager.checkUserByID(tokenResults.id);
            const { oldPassword, newPassword, newPasswordConfirmation } = req.body;
            const isPasswordValid = passwordChecker(oldPassword || "", checkUser?.password || "");
            switch (true) {
                case isPasswordValid === false:
                    responseHelper(res, status.errorRequest, message.errorPasswordNotFound); 
                    break;
                case newPassword === undefined || newPassword === "":
                    responseHelper(res, status.errorRequest, "New Password still empty !!!"); 
                    break;
                case newPasswordConfirmation === undefined || newPasswordConfirmation === "":
                    responseHelper(res, status.errorRequest, "Confirmation Password still empty !!!");
                    break;
                case newPassword !== newPasswordConfirmation:
                    responseHelper(res, status.errorRequest, "New Password and confirmation password not match !!!"); 
                    break;
                case isPasswordValid && (newPassword === newPasswordConfirmation):
                    const hashedPassword = bcrypt.hashSync(newPassword || "", salt);
                    const payload = { password: hashedPassword };
                    USER_CREDENTIALS.findOneAndUpdate({ _id: tokenResults.id }, payload, {new: true}, (error, results) => {
                        if (results) return responseHelper(res, status.success, message.changePasswordSuccess);
                        return responseHelper(res, status.errorServer, message.errorServer, error);
                    });
                    break;
                default:
                    responseHelper(res, status.errorRequest, "Old password, new Password or confirmation password still empty !!!"); 
                    break;
            }
        }
    });
};