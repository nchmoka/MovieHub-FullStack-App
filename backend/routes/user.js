const express = require("express");

const router = express.Router();

// controller functions
const {
    signupUser,
    loginUser,
    getUsers,
    changeUserRole,
    deleteUser,
} = require("../controllers/userController");
const requireRule = require("../middleware/requireRule");
const { get } = require("mongoose");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

router.use(requireRule);

// GET all users
router.get("/getUsers", getUsers);

// change user role
router.post("/changeUserRole/:id", changeUserRole);

// DELETE a movie
router.delete("/:id", deleteUser);

module.exports = router;
