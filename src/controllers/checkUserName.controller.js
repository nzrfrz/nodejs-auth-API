import { 
    responseHelper, 
    message,
    status
} from "../_helpers/ResponseHelper.js";
import { authManager } from "../_helpers/authManager.js";

export const CheckUserName = async (req, res) => {
    const { userName } = req.body;

    const checkExistingUsername = await authManager.checkUserName(userName);

    if (checkExistingUsername[0] === undefined) return responseHelper(res, status.validIfNotExist, message.userNameAvailable);
    return responseHelper(res, status.notValidIfExist, message.errorUserNameExist);
};