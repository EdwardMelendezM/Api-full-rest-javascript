const express = require('express');
const { createItem, getItem, getItems, deleteItem } = require('../controllers/storage');
const AuthMiddleware = require('../middleware/sesion');
const uploadMiddleware = require('../utils/handleStorage');
const { validatorGetItem } = require('../validators/storage');
const router = express.Router();

router.get("/", AuthMiddleware, getItems)
router.get("/:id", validatorGetItem, getItem)
router.post("/", uploadMiddleware.single("myfile"), createItem)

router.delete("/:id", validatorGetItem, deleteItem)


module.exports = router;