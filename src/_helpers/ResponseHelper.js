/*
Response Status List
- No access token in headers authorization  = 400 Bad Request
- Access token invalid                      = 401 Unauthorized
- Refresh token invalid                     = 403 Forbidden
*/

export const message = {
    errorServer: "Something went wrong, please try again later !!",

    userNameAvailable: "User Name available",
    userNameNotAvailable: "User Name not available",
    errorUserNameExist: "Username exist, try another username",

    emailAvailable: "Email available",
    emailNotAvailable: "Email not available",
    emailInvalid: "Not a valid email !!!",
    errorEmailExist: "Email already associated with this account",

    errorPasswordNotFound: "Wrong password",
    passwordFound: "Password correct",
    changePasswordSuccess: "Password change successfuly",

    registrationSuccess: "Registration successfully !!!",
    loginSuccess: "Login Succesfully !!!",

    tokenNotFound: "Access token required !!!",
    tokenValid: "Token valid",

    // errorAccessToken: "Something wrong when verifying token, please try again later !!!",
    errorGeneratingToken: "Something wrong when generating token, please try again later !!!",
    errorAccessToken: "Access token invalid, please request again !!!",
    errorRefreshToken: "Refrfesh token invalid, please \'Login\' again !!!",
    errorGeneratingToken: "Something wrong when generating token, please try again later !!!",
};

export const status = {
    success: 200,
    successCreateNewData: 201,
    errorRefreshToken: 403,
    validIfNotExist: 202,
    errorServer: 500, //data not saved in DB, or other server error
    errorRequest: 400,
    errorAccessToken: 401, // check if user not passing the token
    notFound: 404,
};

export const responseHelper = (res, status, message, data) => {
    return res.status(status).send({ status, message, data });
};