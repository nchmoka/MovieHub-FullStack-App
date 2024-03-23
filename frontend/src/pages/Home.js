import { useEffect } from "react";
import React, { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import { useMoviesContext } from "../hooks/useMoviesContext";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import MovieDetails from "../components/MovieDetails";

const Home = () => {
    const { movies, dispatch } = useMoviesContext();
    const { user } = useAuthContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSearch, setActiveSearch] = useState([])
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
    
    const handleSearch = (e) => {
        const term = e.target.value.trim().toLowerCase();
        setSearchTerm(term);
        if (term === '') {
            setActiveSearch([]);
        } else {
            const searchResults = movies.filter(movie => movie.title.toLowerCase().includes(term));
            setActiveSearch(searchResults);
        }
    };
    

    return (
        <div className="movies">
            <form className='w-[500px] relative'>
                <div className="relative">
                    <input type="search" placeholder='Type Here' className='w-full p-4 rounded-full bg-slate-800' onChange={handleSearch}/>
                    <button type="button" className='absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-600 rounded-full'>
                        <AiOutlineSearch />
                    </button>
                </div>
                {/* {
                    activeSearch.length > 0 && (
                        <div className="absolute top-20 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
                            {
                                activeSearch.map(movie => (
                                    <span key={movie._id}>{movie.title}</span>
                                ))
                            }
                        </div>
                    )
                } */}
            </form>
            <div className="container mx-auto">
                <div className="grid grid-cols-4 gap-10">
                    {
                    (searchTerm !== "" && activeSearch.length === 0) ? 
                    (<div className="col-span-4 text-center text-gray-500">No results found.</div>)
                    :
                    (searchTerm === '' ? movies : activeSearch) &&
                    (activeSearch.length > 0 ? activeSearch : movies).map((movie) => (
                        <MovieDetails key={movie._id} movie={movie} />
                    ))
                    }
                </div>
            </div>


            {/* {movies &&
                movies.map((movie) => (
                    <MovieDetails key={movie._id} movie={movie} />
            ))} */}
        </div>
    );
};

export default Home;
