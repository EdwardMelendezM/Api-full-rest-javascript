const bcryptjs = require('bcryptjs');

const encrypt = async (pass) => {
  const hash = await bcryptjs.hash(pass, 5)
  return hash
}

const comparePass = async (pass, passHash) => {
  const result = await bcryptjs.compare(pass, passHash)
  return result
}

module.exports = { encrypt, comparePass };