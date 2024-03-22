const Watchlist = require('../models/watchlistModel');

// Remove a movie from a user's watchlist
exports.removeMovieFromWatchlist = async (req, res) => {
    const { userId, movieId } = req.params; // Assuming userId and movieId are passed as URL parameters

    try {
        await Watchlist.removeFromWatchlist(userId, movieId);
        res.status(200).json({ message: "Movie removed from watchlist successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fetch the watchlist for a user
exports.fetchWatchlist = async (req, res) => {
    const { userId } = req.params; // Assuming userId is passed as a URL parameter

    try {
        const movies = await Watchlist.fetchWatchlist(userId);
        console.log(movies);
        res.status(200).json(movies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};