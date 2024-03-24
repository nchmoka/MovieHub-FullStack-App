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
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

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
        <div className="movies grid grid-cols-5 gap-8">
            {/* Filters by categories */}
            <div className="col-span-1 border-r border-gray-200 mt-20 ml-2 p-6">
                <form>
                    {filters.map((section) => (
                        <Disclosure as="div" key={section.id}>
                            {({ open }) => (
                                <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                        <Disclosure.Button className="flex w-full-80 items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 hover:border-gray-200 border border-solid border-gray-300">
                                            <span className="font-medium text-gray-900 hover:text-gray-500">
                                                Filter By Category
                                            </span>
                                            <span className="ml-6 flex items-center">
                                                {open ? (
                                                    <MinusIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <PlusIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </span>
                                        </Disclosure.Button>
                                    </h3>
                                    <Disclosure.Panel className="pt-6">
                                        <div className="space-y-2">
                                            {section.options.map(
                                                (option, optionIdx) => (
                                                    <div
                                                        key={option.value}
                                                        className="flex items-center"
                                                    >
                                                        <input
                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            defaultValue={
                                                                option.value
                                                            }
                                                            type="checkbox"
                                                            checked={
                                                                option.checked
                                                            }
                                                            onChange={() =>
                                                                handleFilterChange(
                                                                    optionIdx
                                                                )
                                                            }
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label
                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                            className="ml-2 min-w-0 flex-1 text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </form>
            </div>

            {/* Movies grid */}
            <div className="col-span-4">
                <form className="w-full relative">
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-md">
                            <input
                                type="search"
                                placeholder="Search for a movie..."
                                className="w-full p-4 pr-16 rounded-full bg-white text-gray-800 placeholder-gray-500"
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </form>
                <div className="mt-4 border-t border-gray-200"></div>
                <div className="container mx-auto">
                    <div className="grid grid-cols-4 gap-8">
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
