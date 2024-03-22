require("dotenv").config(); // load .env variables

const express = require("express");
const mongoose = require("mongoose");
const moviesRoutes = require("./routes/movies");
const userRoutes = require("./routes/user");
const watchlistRoutes = require("./routes/watchlist"); // Update the path according to your project structure

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use("/api/movies", moviesRoutes);
app.use("/api/user", userRoutes);
app.use("/api/watchlist", watchlistRoutes); // Use watchlist routes

// connect to mongodb & listen for requests
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connected to MongoDB");
            console.log("listening on port 4000");
        });
    })
    .catch((error) => {
        console.log(error);
    });
