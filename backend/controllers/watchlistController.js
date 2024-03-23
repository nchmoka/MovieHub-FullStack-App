const Watchlist = require('../models/watchlistModel');

// Remove a movie from a user's watchlist
exports.removeMovieFromWatchlist = async (req, res) => {
    const { movieId } = req.params; // Assuming userId and movieId are passed as URL parameters
    const userEmail = req.body.userEmail;
    try {
        const movie = await Watchlist.removeFromWatchlist(userEmail, movieId);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.addMovieToWatchlist = async (req, res) => {
    const { movieId } = req.params; // Assuming userId and movieId are passed as URL parameters
    const userEmail = req.body.userEmail;

    try {
        await Watchlist.addToWatchlist(userEmail, movieId);
        res.status(201).json({ message: "Movie added to watchlist successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fetch the watchlist for a user
exports.fetchWatchlist = async (req, res) => {
    const { userId } = req.params; // Assuming userId is passed as a URL parameter

    try {
        const movies = await Watchlist.fetchWatchlist(userId);
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
