const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/tracks');
const validatorCreateItem = require('../validators/tracks');
const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", validatorCreateItem, createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);


module.exports = router;