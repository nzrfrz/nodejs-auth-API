import { 
    responseHelper, 
    message,
    status
} from "../_helpers/ResponseHelper.js";
import { authManager } from "../_helpers/authManager.js";
import { emailValidator } from "../_helpers/emailValidator.js";

export const CheckUserEmail = async (req, res) => {
    const { email } = req.body;
    const isValidEmail = emailValidator(email);

    const checkExistingEmail = await authManager.checkUserEmail(email);

    switch (true) {
        case isValidEmail === false:
            responseHelper(res, status.errorRequest, message.emailInvalid);
            break;
        case checkExistingEmail[0] === undefined:
            responseHelper(res, status.validIfNotExist, message.emailAvailable);
            break;    
        default:
            responseHelper(res, status.notValidIfExist, message.errorEmailExist);
            break;
    }
};