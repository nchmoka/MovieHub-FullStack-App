const express = require('express');
const watchlistController = require('../controllers/watchlistController'); // Adjust the path as needed
const requireAuth = require('../middleware/requireAuth'); // Assuming you have an authentication middleware

const router = express.Router();

// Require authentication for all watchlist routes
router.use(requireAuth);

// Add a movie to the watchlist
router.post('/add', watchlistController.addMovieToWatchlist);

// Remove a movie from the watchlist
// Assuming you pass userId and movieId as URL parameters for simplicity
router.delete('/remove/:userId/:movieId', watchlistController.removeMovieFromWatchlist);

// Fetch the user's watchlist
// Assuming you pass userId as a URL parameter
router.get('/:userId', watchlistController.fetchWatchlist);

module.exports = router;
