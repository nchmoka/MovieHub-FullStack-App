import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import MovieDetails from './MovieDetails';

const Watchlist = () => {
    const [movies, setMovies] = useState([]); // Renamed to movies for clarity
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchMovies = async () => {
            setIsPending(true);
            setError(null);
            try {
                // Updated to fetch all movies instead of the user-specific watchlist
                const response = await fetch('/api/watchlist/'+ user._id, {
                    headers: {
                        Authorization: `Bearer ${user.token}`, // Keep if your API requires auth for this endpoint
                    },
                });
                if (!response.ok) {
                    throw new Error('Could not fetch the movies');
                }
                const movies = await response.json();
                setMovies(movies); // Updated state variable
                setIsPending(false);
            } catch (err) {
                setError(err.message);
                setIsPending(false);
            }
        };

        fetchMovies();
    }, [user]); // Depend on `user` if necessary for authentication

    return (
        <div className="watchlist">
            <h2>All Movies</h2> {/* Updated heading */}
            {isPending && <div>Loading movies...</div>}
            {error && <div>{error}</div>}
            {movies && movies.map(movie => (
                <MovieDetails key={movie._id} movie={movie} />
            ))}
        </div>
    );
};

export default Watchlist;
