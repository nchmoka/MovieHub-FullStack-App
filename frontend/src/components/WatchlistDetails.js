import { useWatchlistContext } from "../hooks/useWatchlistContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WatchlistDetails = ({ movie }) => {
    const { dispatch } = useWatchlistContext();
    const { user } = useAuthContext();

    const handleRemoveFromWatchlistClick = async () => {
        if (!user) {
            return;
        }
        
        const response = await fetch("/api/watchlist/remove/" + movie._id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ userEmail: user.email })
        });
        if (response.ok) {
            dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: movie._id });
        }
    };

    return (
        <div className="movie-details">
            <button title="Add to Watchlist" className="material-symbols-outlined" onClick={handleRemoveFromWatchlistClick}>
                delete 
            </button>
            <h4>{movie.title}</h4>
            <p><strong>Genre: </strong>{movie.genre}</p>
            <p><strong>Summary: </strong>{movie.summary}</p>
            <p><strong>Director: </strong>{movie.director}</p>
            <p><strong>Year: </strong>{movie.year}</p>
            <p><strong>Image: </strong>{movie.image}</p>
        </div>
    );
};

export default WatchlistDetails;
