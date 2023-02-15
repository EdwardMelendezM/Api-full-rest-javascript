const { handleError } = require("../utils/handleError")
/**
 * Array con los roles permitidos
 * @param {*} rol
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;
    const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))
    if (!checkValueRol) {
      handleError(res, "USER_NOT_PERMISSIONS", 403)
      return
    }
    next();
  } catch (err) {
    handleError(res, "ERROR_PERMISSIONS", 403)
  }
}
module.exports = checkRol;