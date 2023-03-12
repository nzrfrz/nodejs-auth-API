import { 
    responseHelper, 
    message,
    status,
} from "../_helpers/ResponseHelper.js";

export const Playground = (req, res) => {
    const { page, per_page, q } = req.query;
    console.log("page: ", page);
    console.log("per page: ", per_page);
    console.log("q: ", q);
    responseHelper(res, status.errorRequest, "Wrong username, email or password");
};