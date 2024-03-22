import React, { useContext ,useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import MovieDetails from "../components/MovieDetails";
import { useWatchlistContext } from "../hooks/useWatchlistContext";


const Watchlist = () => {
  const { movies, dispatch } = useWatchlistContext();
  const { user } = useAuthContext();

  useEffect(() => {

    const fetchMovies = async () => {
        const response = await fetch("/api/watchlist/" + user.email, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "SET_MOVIES", payload: json });
        }
    };
    if (user) {
        fetchMovies();
    }
}, [dispatch, user]);



  return (
    <div className="home">
        <div className="movies">
            {movies &&
                movies.map((movie) => (
                    <MovieDetails key={movie._id} movie={movie} />
                ))}
        </div>
    </div>
);
};

export default Watchlist;