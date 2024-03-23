const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
    // TODO: change in production to 8h or 1d
    return jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        rule = user.rule;
        // create token
        const token = createToken(user._id);

        res.status(201).json({ email, token, rule });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// sign up user
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password);

        // create token
        const token = createToken(user._id);

        res.status(201).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// change user role
const changeUserRole = async (req, res) => {
    const { id } = req.params;
    const { rule } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "no such user" });
    }
    if (rule != "admin" && rule != "user") {
        return res.status(400).json({ error: "no such role" });
    }
    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!user) return res.status(400).json({ error: "User not found" });
    res.status(200).json(user);
};

const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ ceratedAt: -1 });
    res.status(200).json(users);
};

module.exports = { signupUser, loginUser, getUsers, changeUserRole };
