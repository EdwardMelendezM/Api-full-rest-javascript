const { userModel } = require("../models");
const { handleError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");

const AuthMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleError(res, "NO_TOKEN", 403)
      return
    }
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token)

    if (!dataToken._id) {
      handleError(res, "ERROR_ID_TOKEN", 403)
    }
    const user = await userModel.findById(dataToken._id)
    req.user = user
    next();

  } catch (err) {
    console.log(err)
    handleError(res, "ERROR_MIDDLEWARE_AUTH", 403)
  }
}

module.exports = AuthMiddleware;