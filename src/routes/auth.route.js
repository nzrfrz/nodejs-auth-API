import express from "express";
import { Login } from "../controllers/login.controller.js";
import { Logout } from "../controllers/logout.controller.js";
import { Registration } from "../controllers/registration.controller.js";
import { CheckUserName } from "../controllers/checkUserName.controller.js";
import { CheckUserEmail } from "../controllers/checkUserEmail.controller.js";
import { CheckUserPassword } from "../controllers/checkUserPassword.controller.js";
import { ChangePassword } from "../controllers/changePassword.controller.js";

import { GetUserProfile } from "../controllers/userProfile.controller.js";
import { RefreshTokenChecker } from "../controllers/tokenChecker.controller.js";
import { AccessTokenChecker } from "../controllers/tokenChecker.controller.js";
import { AccessTokenGenerator } from "../controllers/tokenChecker.controller.js";

import { Playground } from "../controllers/playgound.controller.js";

const router = express.Router();

export const Authentication = (app) => {
    const userLogin = router.post("/user/login/", Login);
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

    // const playground = router.get("/playground/?page=:page&per_page=:dataLength&q=:q", Playground);
    const playground = router.get("/playground/", Playground);

    app.use("/auth", userLogin);
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
};