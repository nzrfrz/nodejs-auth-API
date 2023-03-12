import bcrypt from "bcrypt";
import DB from "../../db.config.js";

import { 
    responseHelper, 
    message,
    status
} from "../_helpers/ResponseHelper.js";
import { authManager } from "../_helpers/authManager.js";

const USER_CREDENTIALS = DB.user_credentials;

export const Registration = async (req, res) => {
    const { userName, email, password } = req.body;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const payload = new USER_CREDENTIALS(
        {
            userName,
            email,
            password: hashedPassword,
        }
    );

    const checkExistingUsername = await authManager.checkUserName(userName);
    const checkExistingEmail = await authManager.checkUserEmail(email);
    const isUsernameExist = checkExistingUsername[0] ? true : false;
    const isUserEmailExist = checkExistingEmail[0] ? true : false;

    switch (true) {
        case isUsernameExist && isUserEmailExist:
            responseHelper(res, status.errorRequest, `${message.errorUserNameExist} Or ${message.errorEmailExist}`, {});
            break;
        case isUsernameExist:
            responseHelper(res, status.errorRequest, message.errorUserNameExist, {});
            break;
        case isUserEmailExist:
            responseHelper(res, status.errorRequest, message.errorEmailExist, {});
            break;
        case !isUsernameExist && !isUserEmailExist:
            payload.save((error, results) => {
                if (results) {
                    responseHelper(res, status.successCreateNewData, message.registrationSuccess, {userName, email});
                }
                else {
                    responseHelper(res, status.errorServer, message.errorServer || error, {});
                }
            });
            break;
        default:
            break;
    };
};