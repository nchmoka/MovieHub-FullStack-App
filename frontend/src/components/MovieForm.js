import { useState } from "react";
import { useMoviesContext } from "../hooks/useMoviesContext";
import { useAuthContext } from "../hooks/useAuthContext";
const MovieForm = () => {
    const { dispatch } = useMoviesContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [summary, setSummary] = useState("");
    const [director, setDirector] = useState("");
    const [year, setYear] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError("You need to be logged in to add a movie");
            return;
        }
        const movie = { title, genre, summary, director, year, image };
        const response = await fetch("/api/movies", {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setError(null);
            setTitle("");
            setGenre("");
            setSummary("");
            setDirector("");
            setYear("");
            setImage("");
            setEmptyFields([]);
            console.log("Movie added successfully", json);
            dispatch({ type: "CREATE_MOVIE", payload: json });
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Movie</h3>

            <label>Movie title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />
            <label>Movie Genre:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={genre}
                className={emptyFields.includes("genre") ? "error" : ""}
            />
            <label>Movie Summary:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={summary}
                className={emptyFields.includes("summary") ? "error" : ""}
            />
            <label>Movie Director:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={director}
                className={emptyFields.includes("director") ? "error" : ""}
            />
            <label>Movie Year:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={year}
                className={emptyFields.includes("year") ? "error" : ""}
            />
            <label>Movie Image:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={image}
                className={emptyFields.includes("image") ? "error" : ""}
            />
            <button>Add Movie</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default MovieForm;
