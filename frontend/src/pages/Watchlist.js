import React, { useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import WatchlistDetails from "../components/WatchlistDetails";
import { useWatchlistContext } from "../hooks/useWatchlistContext";

const Watchlist = () => {
  const { watchlist, dispatch } = useWatchlistContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWatchlist = async () => {
        const response = await fetch("/api/watchlist/" + user.email, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "SET_WATCHLIST", payload: json });
        }
    };

    if (user) {
        fetchWatchlist();
    }
  }, [dispatch, user]);

  return (
    <div className="watchlist">
        <div className="movies">
            {watchlist &&
                watchlist.map((movie) => (
                    <WatchlistDetails key={movie._id} movie={movie} />
                ))}
        </div>
    </div>
  );
};

export default Watchlist;
