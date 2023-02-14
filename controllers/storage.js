const PUBLIC_URL = process.env.PUBLIC_URL;
const { storageModel } = require("../models");

const createItem = async (req, res) => {
  const { body, file } = req
  const fileData = {
    name: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`
  }
  console.log(file)
  const data = await storageModel.create(fileData);
  res.send({ menssage: "POST_COMPLETED", fileData })
}


module.exports = { createItem }