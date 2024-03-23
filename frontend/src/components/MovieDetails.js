import { useMoviesContext } from "../hooks/useMoviesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { Slide, Fade } from "react-awesome-reveal";
import { HiOutlineInformationCircle } from "react-icons/hi2";

const MovieDetails = ({ movie }) => {
    const { dispatch } = useMoviesContext();
    const { user } = useAuthContext();
    const [showDetails, setShowDetails] = useState(false);
    const handleClick = async () => {
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

    const handleModalToggle = () => {
        setShowDetails(!showDetails); // Toggle the state of the modal
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


    return (
        <div className="movie-card bg-gray-100 rounded-lg overflow-hidden shadow-lg mb-4 w-80 relative flex flex-col group">

            <img src={movie.image} alt={movie.title} className="w-full rounded-lg" />
            <div className="absolute left-0 top-0 bottom-0 opacity-0 group-hover:opacity-100 p-4 w-full bg-black/60 group-hover:backdrop-blur-sm duration-500">
                <div className="h-full flex flex-col justify-center text-white text-center">
                  <Slide cascade>
                    <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                    <div>
                      <button className="bg-white text-black px-6 py-3 rounded-lg duration-300">
                        <HiOutlineInformationCircle className="text-4xl"/>
                      </button>
                    </div>
                  </Slide>
                </div>
              </div>
            <button title="Add to Watchlist" className="material-symbols-outlined" onClick={handleAddToWatchlistClick}>
                    add 
            </button>
            {/* <div className="p-4 flex flex-col justify-between h-full">
                <h4 className="text-xl font-semibold mb-2">{movie.title}</h4>
                <p className="text-gray-700 mb-2"><strong>Genre: </strong>{movie.genre}</p>
                <p className="text-gray-700 mb-2"><strong>Summary: </strong>{movie.summary}</p>
                <p className="text-gray-700 mb-2"><strong>Director: </strong>{movie.director}</p>
                <p className="text-gray-700 mb-2"><strong>Year: </strong>{movie.year}</p>
            </div>
            <button onClick={handleModalToggle} className="bg-transparent absolute hover:border-opacity-100 bottom-2 right-2 px-4 py-4 rounded-full">
                <HiOutlineInformationCircle className="text-3xl"/>
            </button>
            {showDetails && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
                        <p><strong>Genre: </strong>{movie.genre}</p>
                        <p><strong>Summary: </strong>{movie.summary}</p>
                        <p><strong>Director: </strong>{movie.director}</p>
                        <p><strong>Year: </strong>{movie.year}</p>
                        <button onClick={() => setShowDetails(false)} className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">Close</button>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default MovieDetails;
