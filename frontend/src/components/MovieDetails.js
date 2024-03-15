import { useMoviesContext } from "../hooks/useMoviesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const MovieDetails = ({ movie }) => {
    const { dispatch } = useMoviesContext();
    const { user } = useAuthContext();

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
    // "title": "The Dark Knight",
    // "genre": "Action",
    // "summary": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    // "director": "Frank Darabont",
    // "year": 1994,
    // "image": "url/to/image"
    return (
        <div className="movie-details">
            <h4>{movie.title}</h4>
            <p>
                <strong>Genre: </strong>
                {movie.genre}
            </p>
            <p>
                <strong>Summary: </strong>
                {movie.summary}
            </p>
            <p>
                <strong>Director: </strong>
                {movie.director}
            </p>
            <p>
                <strong>Year: </strong>
                {movie.year}
            </p>
            <p>
                <strong>Image: </strong>
                {movie.image}
            </p>
            <span className="material-symbols-outlined" onClick={handleClick}>
                delete
            </span>
        </div>
    );
};

export default MovieDetails;
