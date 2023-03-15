const Category = require('../models/Category');

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getCategories
}