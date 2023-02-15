const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/tracks');
const customHeader = require('../middleware/customHeader');
const checkRol = require('../middleware/rol');
const AuthMiddleware = require('../middleware/sesion');
const { validatorCreateItem, validatorGetItem } = require('../validators/tracks');
const router = express.Router();

router.get("/", AuthMiddleware, checkRol(["admin"]), customHeader, getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/", validatorCreateItem, customHeader, createItem);
router.put("/:id", validatorGetItem, validatorCreateItem, updateItem);
router.delete("/:id", validatorGetItem, deleteItem);


module.exports = router;