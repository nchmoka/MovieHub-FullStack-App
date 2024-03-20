const express = require("express");

const router = express.Router();

// controller functions
const {
    signupUser,
    loginUser,
    getUsers,
} = require("../controllers/userController");
const requireRule = require("../middleware/requireRule");
const { get } = require("mongoose");

// login route
router.post("/login", loginUser);

// register route
router.post("/signup", signupUser);

router.use(requireRule);

// GET all users
router.get("/getUsers", getUsers);

module.exports = router;
