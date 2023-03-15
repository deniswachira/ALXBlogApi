const { createError } = require("../utils/error");
const User = require('../models/User');
const Category = require('../models/Category');


const addCategory = async (req, res, next) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (error) {
        res.status(500).json(error);
    }
}

// const deleteComment = async (req, res, next) => {
//     try {
//         const comment = await Comment.findById(res.params.id)
//         const video = await Video.findById(res.params.id)
//         if (req.user.id === comment.userId || req.user.id === video.userId) {
//             await Comment.findByIdAndDelete(req.params.id)
//             res.status(200).json("Comment has been deleted. ")
//         } else {
//             return next(createError(404, "You can only delete your comment"))
//         }
//     } catch (err) {
//         next(err)
//     }
// }

const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addCategory,
    getCategories
}