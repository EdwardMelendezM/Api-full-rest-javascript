const { matchedData } = require("express-validator");
const { userModel } = require("../models");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, comparePass } = require("../utils/handlePassword");
const { handleError } = require("../utils/handleError");

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req)
    const passwordHash = await encrypt(req.password);
    const body = { ...req, password: passwordHash }
    const dataUser = await userModel.create(body)

    dataUser.set("password", undefined, { strict: false })
    const data = {
      token: tokenSign(dataUser),
      user: dataUser
    }
    res.send({ data })
  } catch (error) {
    handleError(res, "ERROR_REGISTER_USER")
  }
}
const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req)
    const user = await userModel.findOne({ email: req.email }).select('password name role email')
    if (!user) {
      handleError(res, "USER_NOT_EXIST", 404)
      return
    }
    const passHas = user.get('password');
    const check = await comparePass(req.password, passHas)
    if (!check) {
      handleError(res, "PASS_NOT_EXIST", 401)
      return
    }
    user.set("password", undefined, { strict: false })
    const data = {
      token: tokenSign(user),
      user,
    }
    res.send({ data })
  } catch (e) {
    console.log(e)
    handleError(res, "ERROR_LOGIN_USERS")


  }
}

module.exports = { loginCtrl, registerCtrl }