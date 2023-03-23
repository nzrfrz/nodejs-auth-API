import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { 
    responseHelper, 
    message,
    status
} from "../_helpers/ResponseHelper.js";
import { accessTokenGenerator } from "../_helpers/tokenGenerator.js";

dotenv.config();

// unused
export const RefreshTokenChecker = (req, res) => {
    // console.log(JSON.parse(req.headers.cookies).refreshToken);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === undefined) return responseHelper(res, status.errorAccessToken, message.tokenNotFound);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (error, tokenResults) => {
        if (tokenResults === undefined) {
            responseHelper(res, status.errorAccessToken, "Refresh token invalid, Please Login again !!");
        }
        else {
            responseHelper(res, status.success, message.tokenValid);
        }
    });
};

export const AccessTokenChecker = (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === undefined) return responseHelper(res, status.errorAccessToken, message.tokenNotFound);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, tokenResults) => {
        if (tokenResults === undefined) {
            responseHelper(res, status.errorAccessToken, "Access token invalid, Please request again !!");
        }
        else {
            responseHelper(res, status.success, message.tokenValid);
        }
    });
};

export const AccessTokenGenerator = (req, res) => {
    jwt.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, tokenResults) => {
        if (tokenResults === undefined) {
            responseHelper(res, status.errorRefreshToken, "Refresh token invalid, Please Login again !!");
        }
        else {
            const { iat, exp, ...tempTokenData } = tokenResults;
            const accessToken = accessTokenGenerator(tempTokenData);
            responseHelper(res, status.success, message.tokenValid, { accessToken });
        }
    });
};

// generate access token with refresh token in http only cookie
export const AccessTokenGeneratorV2 = (req, res) => {
    jwt.verify(JSON.parse(req.headers.cookies).refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, tokenResults) => {
        if (tokenResults === undefined) {
            responseHelper(res, status.errorRefreshToken, "Refresh token invalid, Please Login again !!");
        }
        else {
            const { iat, exp, ...tempTokenData } = tokenResults;
            const accessToken = accessTokenGenerator(tempTokenData);
            responseHelper(res, status.success, message.tokenValid, { accessToken });
        }
    });
};