const express = require("express");
const {
    createMovie,
    getMovies,
    getMovie,
    deleteMovie,
    updateMovie,
} = require("../controllers/movieController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all workouts
router.get("/", getMovies);

//GET a single workout
router.get("/:id", getMovie);

// POST a new workout
router.post("/", createMovie);

// DELETE a workout
router.delete("/:id", deleteMovie);

// UPDATE a workout
router.patch("/:id", updateMovie);

module.exports = router;
