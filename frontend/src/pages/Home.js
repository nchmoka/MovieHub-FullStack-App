import { useEffect } from "react";
import React, { Fragment, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useMoviesContext } from "../hooks/useMoviesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
// components
import MovieDetails from "../components/MovieDetails";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";

const Home = () => {
    const { movies, dispatch } = useMoviesContext();
    const { user } = useAuthContext();
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeSearch, setActiveSearch] = useState([]);
    const [filters, setFilters] = useState([
        {
            id: "category",
            name: "Category",
            options: [
                { value: "All", label: "All", checked: true },
                { value: "Comedy", label: "Comedy", checked: false },
                { value: "Drama", label: "Drama", checked: false },
                { value: "Action", label: "Action", checked: false },
                { value: "Horror", label: "Horror", checked: false },
                { value: "Adventure", label: "Adventure", checked: false },
            ],
        },
    ]);
 
    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch("/api/movies", {
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

    const handleFilterChange = (optionIdx) => {
        const updatedFilters = [...filters];
        updatedFilters[0].options = updatedFilters[0].options.map(
            (option, index) => ({
                ...option,
                checked: index === optionIdx ? !option.checked : false,
            })
        );
        setFilters(updatedFilters);

        const activeFilters = updatedFilters[0].options
            .filter((option) => option.checked)
            .map((option) => option.value);
        if (activeFilters.length === 0) {
            setActiveSearch(movies);
        } else {
            const filteredMovies = movies.filter((movie) =>
                activeFilters.some((filter) =>
                    movie.genre.toLowerCase().includes(filter.toLowerCase())
                )
            );
            setActiveSearch(filteredMovies);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.trim().toLowerCase();
        setSearchTerm(term);
        const updatedFilters = [...filters];
        updatedFilters[0].options = updatedFilters[0].options.map((option) => ({
            ...option,
            checked: term === "" ? false : option.value === "All",
        }));
        setFilters(updatedFilters);
        if (term === "") {
            setActiveSearch([]);
        } else {
            const searchResults = movies.filter((movie) =>
                movie.title.toLowerCase().includes(term)
            );
            setActiveSearch(searchResults);
        }
    };

    return (
        <div className="movies grid grid-cols-5 sm:grid-cols-5 gap-8">
            {/* Filters by categories */}
            <Filter filters={filters} handleFilterChange={handleFilterChange} />

            {/* Movies grid */}
            <div className="sm:col-span-4"> {/*col-span-4 */}
                <SearchBar searchTerm={searchTerm} onSearchChange={handleSearch} />
                <div className="mt-4 border-t border-gray-200"></div>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-8"> {/*grid-cols-4*/}
                        {searchTerm !== "" && activeSearch.length === 0 ? (
                            <div className="col-span-4 text-center text-3xl text-gray-500 mt-8">
                                No results found.
                            </div>
                        ) : (
                            (searchTerm === "" ? movies : activeSearch) &&
                            (activeSearch.length > 0
                                ? activeSearch
                                : movies
                            ).map((movie) => (
                                <MovieDetails key={movie._id} movie={movie} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
