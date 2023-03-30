import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const refreshTokenGenerator = (dataToSign) => {
    const refreshToken = jwt.sign(dataToSign, process.env.REFRESH_TOKEN_SECRET, { algorithm: "HS512", expiresIn: "15m" });  

    return refreshToken;
};

export const accessTokenGenerator = (dataToSign) => {
    const refreshToken = jwt.sign(dataToSign, process.env.ACCESS_TOKEN_SECRET, { algorithm: "HS512", expiresIn: "2m" });  

    return refreshToken;
};