import bcrypt from "bcrypt";

export const passwordChecker = (passwordRequest, existingPassword) => {
    const compareResult = bcrypt.compareSync(passwordRequest, existingPassword);
    return compareResult;
};