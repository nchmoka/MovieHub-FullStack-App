const express = require("express");
const {
    createMovie,
    getMovies,
    getMovie,
    deleteMovie,
    updateMovie,
} = require("../controllers/movieController");
const requireAuth = require("../middleware/requireAuth");
const requireRule = require("../middleware/requireRule");
const router = express.Router();

// require auth for all movie routes
router.use(requireAuth);

// GET all movies
router.get("/", getMovies);

//GET a single movie
router.get("/:id", getMovie);

// require admin rule for the following routes
router.use(requireRule);

// POST a new movie
router.post("/", createMovie);

// DELETE a movie
router.delete("/:id", deleteMovie);

// UPDATE a movie
router.patch("/:id", updateMovie);

module.exports = router;
