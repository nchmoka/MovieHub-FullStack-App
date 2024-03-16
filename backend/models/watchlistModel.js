// watchlistModel.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const User = require('./userModel'); // Adjust the path as needed
const Movie = require('./MovieModel'); // Adjust the path as needed


const watchlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  movie: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Movie'
  },
}, { timestamps: true });



watchlistSchema.statics.add = async function (userId, movieId) {


    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
      }

    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new Error("Movie not found");
    }

    const exists = await this.findOne({ user: userId, movie: movieId });

    if (exists) {
        throw new Error("Movie is already in the watchlist");
    }

    const watchlistEntry = await this.create({ user: userId, movie: movieId });
    return watchlistEntry;

};

watchlistSchema.statics.fetchWatchlist = async function (userId) {
    if (!userId) {
      throw new Error("UserId is required to fetch the watchlist.");
    }
  
    // Check if the user exists to avoid fetching a watchlist for a non-existent user
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      throw new Error("User not found");
    }
  
    // Fetch all watchlist entries for the user and populate the movie details
    const watchlistEntries = await this.find({ user: userId }).populate('movie');
  
    // Optionally, you might want to return a list of movies directly, instead of watchlist entries
    const movies = watchlistEntries.map(entry => entry.movie);
  
    return movies;
  };
  
  watchlistSchema.statics.removeFromWatchlist = async function (userId, movieId) {
    if (!userId || !movieId) {
      throw new Error("UserId and MovieId are required to remove a movie from the watchlist.");
    }
  
    // Check if the user exists to ensure the operation targets a valid user
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      throw new Error("User not found");
    }
  
    // Check if the movie exists to ensure the operation targets a valid movie
    const movieExists = await Movie.exists({ _id: movieId });
    if (!movieExists) {
      throw new Error("Movie not found");
    }
  
    // Attempt to find and remove the watchlist entry
    const result = await this.findOneAndRemove({ user: userId, movie: movieId });
    if (!result) {
      throw new Error("Watchlist entry not found or already removed");
    }
  
    return result;
  };
  




module.exports = mongoose.model("Watchlist", watchlistSchema);

