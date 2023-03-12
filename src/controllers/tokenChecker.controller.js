import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { 
    responseHelper, 
    message,
    status
} from "../_helpers/ResponseHelper.js";
import { accessTokenGenerator } from "../_helpers/tokenGenerator.js";

dotenv.config();

export const RefreshTokenChecker = (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === undefined) return responseHelper(res, status.errorToken, message.tokenNotFound);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (error, tokenResults) => {
        if (tokenResults === undefined) {
            responseHelper(res, status.errorToken, "Refresh token invalid, Please Login again !!");
        }
        else {
            responseHelper(res, status.success, message.tokenValid);
        }
    });
};

export const AccessTokenGenerator = (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === undefined) return responseHelper(res, status.errorToken, message.tokenNotFound);

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (error, tokenResults) => {
        if (tokenResults === undefined) {
            responseHelper(res, status.errorToken, "Refresh token invalid, Please Login again !!");
        }
        else {
            const { iat, exp, ...tempTokenData } = tokenResults;
            const accessToken = accessTokenGenerator(tempTokenData);
            responseHelper(res, status.success, message.tokenValid, { accessToken });
        }
    });
};