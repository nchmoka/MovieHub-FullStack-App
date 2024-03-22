import { useMoviesContext } from "../hooks/useMoviesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const MovieDetails = ({ movie }) => {
    const { dispatch } = useMoviesContext();
    const { user } = useAuthContext();

    const handleRemoveMovieClick = async () => {
        if (!user) {
            return;
        }
        const response = await fetch("/api/movies/" + movie._id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: "DELETE_MOVIE", payload: json });
        }
    };

    // Updated function to handle adding a movie to the watchlist
    const handleAddToWatchlistClick = async () => {
        if (!user) {
            return;
        }
        // Include the user's email in the body of the request
        const body = JSON.stringify({
            userEmail: user.email, // Assuming 'user' object contains an 'email' field
            movieId: movie._id // This might be redundant if you're already specifying the movie ID in the URL
        });
        
        const response = await fetch("/api/watchlist/add/" + movie._id, {
            method: "POST", // Keep as POST since we're adding to the watchlist
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: body // Include the body in the request
        });
        const json = await response.json();
        if (response.ok) {
            // Assuming you have a dispatch action for adding to the watchlist
            dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: json });
        }
    };

      // Updated function to handle adding a movie to the watchlist
      const handleRemoveFromWatchlistClick = async () => {
        if (!user) {
            return;
        }
        // Include the user's email in the body of the request
        const body = JSON.stringify({
            userEmail: user.email, // Assuming 'user' object contains an 'email' field
            movieId: movie._id // This might be redundant if you're already specifying the movie ID in the URL
        });
        
        const response = await fetch("/api/watchlist/remove/" + movie._id, {
            method: "DELETE", // Keep as POST since we're adding to the watchlist
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: body // Include the body in the request
        });
        const json = await response.json();
        if (response.ok) {
            // Assuming you have a dispatch action for adding to the watchlist
            dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: json });
        }
    };

    return (
        <div className="movie-details">
            <button onClick={handleAddToWatchlistClick}>Add To Watchlist</button>
            <button onClick={handleRemoveFromWatchlistClick}>Remove From Watchlist</button>
            <h4>{movie.title}</h4>
            <p><strong>Genre: </strong>{movie.genre}</p>
            <p><strong>Summary: </strong>{movie.summary}</p>
            <p><strong>Director: </strong>{movie.director}</p>
            <p><strong>Year: </strong>{movie.year}</p>
            <p><strong>Image: </strong>{movie.image}</p>
            <span className="material-symbols-outlined" onClick={handleRemoveMovieClick}>
                delete
            </span>
        </div>
    );
};

export default MovieDetails;
