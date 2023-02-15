const express = require('express');
const { createItem, getItem, getItems, deleteItem } = require('../controllers/storage');
const uploadMiddleware = require('../utils/handleStorage');
const { validatorGetItem } = require('../validators/storage');
const router = express.Router();

router.post("/", uploadMiddleware.single("myfile"), createItem)
router.get("/", getItems)
router.get("/:id", validatorGetItem, getItem)
router.delete("/:id", validatorGetItem, deleteItem)


module.exports = router;