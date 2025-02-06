// src/components/SearchBar.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setFilters } from '../store/searchSlice';

const availableGenres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 4, name: "Comedy" },
  { id: 8, name: "Drama" },
  { id: 10, name: "Fantasy" },
  { id: 14, name: "Horror" },
  { id: 22, name: "Mystery" },
  { id: 24, name: "Romance" },
  { id: 27, name: "Sci-Fi" },
  { id: 30, name: "Slice of Life" },
  // Add additional genres as desired
];

function SearchBar() {
  const dispatch = useDispatch();
  const { query, filters } = useSelector((state) => state.search);

  const handleSearch = (e) => dispatch(setQuery(e.target.value));

  // Updated handleGenreChange: Create a new copy of the genres array.
  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    // Create a new copy of the genres array
    let newGenres = Array.isArray(filters.genres) ? [...filters.genres] : [];
    if (e.target.checked) {
      newGenres.push(genreId);
    } else {
      newGenres = newGenres.filter((g) => g !== genreId);
    }
    dispatch(setFilters({ ...filters, genres: newGenres }));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilters({ ...filters, [e.target.name]: e.target.value }));
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for anime..."
        value={query}
        onChange={handleSearch}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="mb-4">
        <span className="block mb-2 font-semibold">Select Genres:</span>
        <div className="flex flex-wrap gap-4">
          {availableGenres.map((genre) => (
            <label key={genre.id} className="flex items-center space-x-1">
              <input
                type="checkbox"
                value={genre.id}
                checked={
                  filters.genres ? filters.genres.includes(String(genre.id)) : false
                }
                onChange={handleGenreChange}
                className="form-checkbox"
              />
              <span>{genre.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <select
          name="rating"
          onChange={handleFilterChange}
          value={filters.rating}
          className="p-2 border rounded"
        >
          <option value="">All Ratings</option>
          <option value="g">G</option>
          <option value="pg">PG</option>
          <option value="pg-13">PG-13</option>
          <option value="r">R</option>
          <option value="r+">R+</option>
        </select>
        <select
          name="status"
          onChange={handleFilterChange}
          value={filters.status}
          className="p-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="airing">Airing</option>
          <option value="completed">Completed</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
