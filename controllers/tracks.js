const { tracksModel } = require("../models")

/**
 * Optener lista de base de datos
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req, res) => {
  const data = await tracksModel.find({});
  res.send(data)
}
const getItem = async (req, res) => { }
const createItem = async (req, res) => {
  const { body } = req
  const data = await tracksModel.create(body);
  res.send(data)
}
const updateItem = async (req, res) => { }
const deleteItem = async (req, res) => { }

module.exports = { getItems, getItem, createItem, updateItem, deleteItem }