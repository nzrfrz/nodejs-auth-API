import { 
    responseHelper, 
    message,
    status
} from "../_helpers/ResponseHelper.js";
import { authManager } from "../_helpers/authManager.js";

export const CheckUserEmail = async (req, res) => {
    const { email } = req.params;

    const checkExistingEmail = await authManager.checkUserEmail(email);

    if (checkExistingEmail[0] === undefined) return responseHelper(res, status.validIfNotExist, message.emailAvailable, {});
    return responseHelper(res, status.notValidIfExist, message.errorEmailExist, {});
};