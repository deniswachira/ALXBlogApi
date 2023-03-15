const router = require('express').Router();
const { verifyToken } = require('../utils/verifyToken');
const { getCategories, addCategory } = require('../controllers/category.js');

router.post("/", addCategory)
router.get("/", getCategories)

module.exports = router; 