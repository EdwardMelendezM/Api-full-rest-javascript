const { matchedData } = require("express-validator");
const { tracksModel } = require("../models");
const { handleError } = require("../utils/handleError");

/**
 * Optener lista de base de datos
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req, res) => {
  try {
    const user = req.user
    const data = await tracksModel.find({});
    res.send({ data, user })
  } catch (error) {
    handleError(res, "ERROR_GET_ITEMS_TRACKS")
  }
}
const getItem = async (req, res) => {
  try {

    req = matchedData(req);
    const { id } = req;
    const data = await tracksModel.findById(id);
    res.send({ data })

  } catch (err) {
    handleError(res, "ERROR_GET_ITEM")
  }
}

const createItem = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.send(data)
  } catch (error) {
    handleError(res, "ERROR_CREATE_ITEM_TRACKS")
  }
}
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findOneAndUpdate({
      id, body
    });
    res.send({ data })
  } catch (error) {
    handleError(res, "ERROR_UPDATE_ITEM_TRACKS")
  }
}
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req)
    const { id } = req;
    const data = await tracksModel.delete({ _id: id });
    res.send({ data })
  } catch (error) {
    handleError(res, "ERROR_DELETE_ITEM_TRACKS")
  }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }