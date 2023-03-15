const router = require('express').Router();
const { getCategories } = require('../controllers/category.js');

router.get("/", getCategories)


module.exports = router; 