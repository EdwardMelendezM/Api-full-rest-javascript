const { userModel } = require("../models");
const { handleError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const getProperties = require("../utils/handlePropertiesEngine");

const propertiesKey = getProperties();
const AuthMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleError(res, "NO_TOKEN", 403)
      return
    }
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = await verifyToken(token)

    if (!dataToken) {
      handleError(res, "NOT_PAYLOAD-DATA", 403)
    }

    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id]
    }

    const user = await userModel.findOne(query)
    req.user = user

    next();

  } catch (err) {
    console.log(err)
    handleError(res, "ERROR_MIDDLEWARE_AUTH", 403)
  }
}

module.exports = AuthMiddleware;