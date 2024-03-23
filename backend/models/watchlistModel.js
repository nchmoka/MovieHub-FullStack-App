const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./userModel'); // Adjust the path as needed
const Movie = require('./MovieModel'); // Make sure the path is correc

const watchlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movies: [{
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  }],
}, { timestamps: true });

watchlistSchema.statics.fetchWatchlist = async function (email) {
    if (!email) {
      throw new Error("Email is required to fetch the watchlist.");
    }

  
    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found.");
    }
  
    // Fetch watchlist for the user and populate the movies
    const watchlist = await this.findOne({ user: user._id })
                                .populate('movies');
  
    if (!watchlist) {
      throw new Error("Watchlist not found.");
    }

    // Since we're populating 'movies', 'watchlist.movies' will contain the full movie documents
    return watchlist.movies;
};


watchlistSchema.statics.addToWatchlist = async function(email, movieId) {
  // Ensure both parameters are provided
  if (!email || !movieId) {
      throw new Error("Both email and movieId are required.");
  }

  // Find the user by email
  const user = await User.findOne({ email: email });
  if (!user) {
      throw new Error("User not found.");
  }

  // Ensure the movie exists
  const movie = await Movie.findById(movieId);
  if (!movie) {
      throw new Error("Movie not found.");
  }

  // Attempt to find an existing watchlist for the user
  let watchlist = await this.findOne({ user: user._id });

  // If the watchlist doesn't exist, create a new one
  if (!watchlist) {
      watchlist = await this.create({ user: user._id, movies: [movieId] });
  } else {
      // If the movie is already in the watchlist, throw an error
      if (watchlist.movies.includes(movieId)) {
        return watchlist;
      }
      // Add the movie to the existing watchlist
      watchlist.movies.push(movieId);
      await watchlist.save();
  }

  return watchlist;
};

watchlistSchema.statics.removeFromWatchlist = async function(email, movieId) {
  // Ensure both parameters are provided
  if (!email || !movieId) {
      throw new Error("Both email and movieId are required.");
  }

  // Find the user by email
  const user = await User.findOne({ email: email });
  if (!user) {
      throw new Error("User not found.");
  }

  // Ensure the movie exists
  const movie = await Movie.findById(movieId);
  if (!movie) {
      throw new Error("Movie not found.");
  }

  // Attempt to find an existing watchlist for the user
  let watchlist = await this.findOne({ user: user._id });

  // If the watchlist doesn't exist, or if the movie isn't in the watchlist, throw an error
  if (!watchlist || !watchlist.movies.includes(movieId)) {
      throw new Error("Movie not in watchlist.");
  }

  // Remove the movie from the watchlist
  watchlist.movies = watchlist.movies.filter(id => id.toString() !== movieId.toString());
  await watchlist.save();

  return movieId;
};


module.exports = mongoose.model("Watchlist", watchlistSchema);
