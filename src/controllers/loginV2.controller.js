import dotenv from "dotenv";

import { authManager } from "../_helpers/authManager.js";
import { passwordChecker } from "../_helpers/passwordChecker.js";
import { 
    responseHelper, 
    message,
    status,
} from "../_helpers/ResponseHelper.js";
import { refreshTokenGenerator } from "../_helpers/tokenGenerator.js";
import { accessTokenGenerator } from "../_helpers/tokenGenerator.js";

import DB from "../../db.config.js";

dotenv.config();
const USER_CREDENTIALS = DB.user_credentials;

export const LoginV2 = async (req, res) => {
    const { user, password } = req.body;

    const checkExistingUsername = await authManager.checkUserName(user);
    const checkExistingEmail = await authManager.checkUserEmail(user);
    
    const dataToSign = {
        id: checkExistingUsername[0]?.id || checkExistingEmail[0]?.id,
        userName: checkExistingUsername[0]?.userName || checkExistingEmail[0]?.userName,
        email: checkExistingUsername[0]?.email || checkExistingEmail[0]?.email,
    };

    const refreshToken = refreshTokenGenerator(dataToSign);
    const accessToken = accessTokenGenerator(dataToSign);
    // console.log(refreshToken);

    const payload = {
        fullName: null,
        address: null,
        country: null,
        province: null,
        regency: null,
        subDistrict: null,
        village: null,
        profilePic: "http://drive.google.com/uc?export=view&id=1DCruElbQ1qv6eqtLqyNL_rzrZ7egs-o2",
        phoneNumber: null,
        browser: req.headers.browser,
        version: req.headers.version,
        os: req.headers.os,
        platform: req.headers.platform,
        userRole: null,
        refreshToken,
        accessToken
    };

    switch (true) {
        case checkExistingUsername[0]?.userName !== undefined && passwordChecker(password, checkExistingUsername[0]?.password):
            USER_CREDENTIALS.findOneAndUpdate({ _id: checkExistingUsername[0].id }, payload, {new: true}, (error, results) => {
                if (results) {
                    responseHelper(res, status.success, message.loginSuccess, { accessToken, refreshToken });
                }
                else {
                    responseHelper(res, status.errorServer, message.errorServer, error);
                }
            });
            break;
        case checkExistingEmail[0]?.email !== undefined && passwordChecker(password, checkExistingEmail[0]?.password):
            USER_CREDENTIALS.findOneAndUpdate({ _id: checkExistingEmail[0].id }, payload, {new: true}, (error, results) => {
                if (results) {
                    responseHelper(res, status.success, message.loginSuccess, { accessToken, refreshToken });
                }
                else {
                    responseHelper(res, status.errorServer, message.errorServer, error);
                }
            });
            break;
        case checkExistingUsername[0]?.userName === undefined && passwordChecker(password, checkExistingUsername[0]?.password || ""):
            responseHelper(res, status.notFound, message.userNameNotAvailable);
            break;
        case checkExistingEmail[0]?.email === undefined && passwordChecker(password, checkExistingEmail[0]?.password || ""):
            responseHelper(res, status.notFound, message.emailNotAvailable);
            break;
        case (checkExistingEmail[0]?.email !== undefined || checkExistingUsername[0]?.userName !== undefined) && !passwordChecker(password, checkExistingUsername[0]?.password || checkExistingEmail[0]?.password):
            responseHelper(res, status.errorRequest, message.errorPasswordNotFound);
            break;
        default:
            responseHelper(res, status.errorRequest, "Wrong username, email or password", undefined);
            break;
    };
};