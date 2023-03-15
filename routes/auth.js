const router = require('express').Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { createError } = require('../utils/createError');
// const {verifyToken} = require('../utils/verifyToken');
router.post('/signup', async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(400).json("Wrong credentials!");
        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");
        const { password, ...others } = user._doc;
        res.status(200).json(others);

    } catch (err) {
        res.status(500).json(err);
    }
})
router.post('/googleauth', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ _id: user._id }, `${process.env.JWT_SECRET}`);
            res
                .cookie("access_token", token, {
                    httpOnly: true
                })
                .status(200)
                .json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            })
            const savedUser = await newUser.save();
            const token = jwt.sign({ _id: savedUser._id }, `${process.env.JWT_SECRET}`);
            res
                .cookie("access_token", token, {
                    httpOnly: true
                })
                .status(200)
                .json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;