const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;
const fs = require('fs');
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleError } = require("../utils/handleError");

const createItem = async (req, res) => {
  const { body, file } = req
  const fileData = {
    filename: file.filename,
    url: `${PUBLIC_URL}/${file.filename}`
  }
  console.log(file)
  const data = await storageModel.create(fileData);
  res.send({ menssage: "POST_COMPLETED", data })
}
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send(data);
  } catch (error) {
    handleError(res, "ERROR_GET_ITEMS")
  }
}
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await storageModel.findById(id);
    res.send(data)
  } catch (error) {
    handleError(res, "ERROR_GET_ITEM_DETAILS")
  }
}

const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const datafile = await storageModel.findById(id);
    await storageModel.delete({ _id: id })
    const { filename } = datafile;
    const filePath = `${MEDIA_PATH}/${filename}`;
    fs.unlinkSync(filePath)
    const data = {
      filePath,
      deleted: 1
    }
    res.send(data)
  } catch (error) {
    handleError(res, "ERROR_DELETE_ITEM")
  }
}


module.exports = { createItem, getItems, getItem, deleteItem }