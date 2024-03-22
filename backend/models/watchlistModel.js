const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./userModel'); // Adjust the path as needed

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

module.exports = mongoose.model("Watchlist", watchlistSchema);
