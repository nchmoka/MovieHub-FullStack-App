const Movie = require("../models/MovieModel");
const mongoose = require("mongoose");

// GET all Movies
const getMovies = async (req, res) => {
    const movies = await Movie.find({}).sort({ ceratedAt: -1 });
    res.status(200).json(movies);
};
// GET one movie
const getMovie = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "no such movie" });
    }

    const movie = await Movie.findById(id);

    if (!movie) return res.status(400).json({ error: "Movie not found" });
    res.status(200).json(movie);
};
// POST new movie
const createMovie = async (req, res) => {
    const { title, genre, summary, director, year, image } = req.body;
    let emptyFields = [];
    if (!title) emptyFields.push("title");
    if (!genre) emptyFields.push("genre");
    if (!summary) emptyFields.push("summary");
    if (!director) emptyFields.push("director");
    if (!year) emptyFields.push("year");
    if (!image) emptyFields.push("image");
    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: "Please fill in all fields",
            emptyFields,
        });
    }
    //add doc to db
    try {
        const movie = await Movie.create({
            title,
            genre,
            summary,
            director,
            year,
            image,
        });
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete one movie
const deleteMovie = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "no such movie" });
    }

    const movie = await Movie.findOneAndDelete({ _id: id });

    if (!movie) return res.status(400).json({ error: "Movie not found" });
    res.status(200).json(movie);
};

// PATCH(Update) one movie
const updateMovie = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "no such movie" });
    }

    const movie = await Movie.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!movie) return res.status(400).json({ error: "Movie not found" });
    res.status(200).json(movie);
};

module.exports = {
    createMovie,
    getMovies,
    getMovie,
    deleteMovie,
    updateMovie,
};
