import express from "express";
import { Login } from "../controllers/login.controller.js";
import { LoginV2 } from "../controllers/loginV2.controller.js";
import { Logout } from "../controllers/logout.controller.js";
import { Registration } from "../controllers/registration.controller.js";
import { CheckUserName } from "../controllers/checkUserName.controller.js";
import { CheckUserEmail } from "../controllers/checkUserEmail.controller.js";
import { CheckUserPassword } from "../controllers/checkUserPassword.controller.js";
import { ChangePassword } from "../controllers/changePassword.controller.js";

import { GetUserProfile } from "../controllers/userProfile.controller.js";
import { 
    RefreshTokenChecker, 
    AccessTokenChecker, 
    AccessTokenGenerator, 
    AccessTokenGeneratorV2 
} from "../controllers/tokenChecker.controller.js";

import { Playground } from "../controllers/playgound.controller.js";

const router = express.Router();

export const Authentication = (app) => {
    const userLogin = router.post("/user/login/", Login);
    const userLoginV2 = router.post("/v2/user/login/", LoginV2);
    const userLogout = router.get("/user/logout/", Logout);
    const userRegistration = router.post("/user/registration/", Registration);
    const userNameChecker = router.post("/user/check-userName/", CheckUserName);
    const userEmailChecker = router.post("/user/check-userEmail/", CheckUserEmail);
    const userPasswordchecker = router.post("/user/check-password/", CheckUserPassword);
    const userChangePassword = router.put("/user/change-password/", ChangePassword);

    const getUser = router.get("/user/profile/", GetUserProfile);
    const checkRefreshToken = router.get("/token/refresh/", RefreshTokenChecker);
    const checkAccessToken = router.get("/token/access/", AccessTokenChecker);
    const generateAcessToken = router.get("/access-token/generate/", AccessTokenGenerator);
    const generateAcessTokenV2 = router.get("/v2/access-token/generate/", AccessTokenGeneratorV2);

    // const playground = router.get("/playground/?page=:page&per_page=:dataLength&q=:q", Playground);
    const playground = router.get("/playground/", Playground);

    app.use("/auth", userLogin);
    app.use("/auth", userLoginV2);
    app.use("/auth", userLogout);
    app.use("/auth", userRegistration);
    app.use("/auth", userNameChecker);
    app.use("/auth", userEmailChecker);
    app.use("/auth", userPasswordchecker);
    app.use("/auth", userChangePassword);

    app.use("/auth", playground);

    app.use("/auth", getUser);
    app.use("/auth", checkRefreshToken);
    app.use("/auth", checkAccessToken);
    app.use("/auth", generateAcessToken);
    app.use("/auth", generateAcessTokenV2);
};