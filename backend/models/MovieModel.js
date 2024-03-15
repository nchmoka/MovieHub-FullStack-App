const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Movie exaple:
// "title": "The Dark Knight",
// "genre": "Action",
// "summary": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
// "director": "Frank Darabont",
// "year": 1994,
// "image": "url/to/image"

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Movie", movieSchema);
