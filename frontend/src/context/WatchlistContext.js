import { createContext, useReducer } from "react";

export const WatchlistContext = createContext();
export const watchlistReducer = (state, action) => {
    switch (action.type) {
        case "SET_MOVIES":
            return {
                movies: action.payload,
            };
        case "DELETE_MOVIE":
            return {
                movies: state.movies.filter(
                    (w) => w._id !== action.payload._id
                ),
            };
            case "REMOVE_FROM_WATCHLIST":
                return {
                    ...state, 
                    watchlist: state.watchlist.filter(
                        (movie) => movie._id !== action.payload._id
                    ),
                };    
        default:
            return state;
    }
};
export const WatchlistContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(watchlistReducer, {
        movies: null,
        watchlist: [],
    });
    return (
        <WatchlistContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WatchlistContext.Provider>
    );
};
