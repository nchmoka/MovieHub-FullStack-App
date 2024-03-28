import React from "react";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <form className="w-full relative">
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="search"
            placeholder="Search for a movie..."
            className="w-full p-4 pr-16 rounded-full bg-white text-gray-800 placeholder-gray-500"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
