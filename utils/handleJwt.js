const jwt = require('jsonwebtoken');
const getProperties = require('./handlePropertiesEngine');
const propertiesKey = getProperties();
const tokenSign = (user) => {

  const sign = jwt.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h"
    }
  )
  return sign;
}

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
}

module.exports = { tokenSign, verifyToken }