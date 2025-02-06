import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimeList from "../components/AnimeList";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";

function Home() {
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const query = useSelector((state) => state.search.query);
  const filters = useSelector((state) => state.search.filters);

  const fetchAnime = async () => {
    setLoading(true);
    try {
      // If filters.genres is an array, join them with commas.
      const genres =
        filters.genres && filters.genres.length > 0
          ? filters.genres.join(",")
          : "";
      const response = await axios.get(
        `http://localhost:5000/api/anime/search?q=${query}&page=${page}&genre=${genres}&rating=${filters.rating}&status=${filters.status}`
      );
      setAnimeData(response.data.data);
    } catch (error) {
      console.error("Error fetching anime:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, [query, filters, page]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar />
      <AnimeList animeData={animeData} loading={loading} />
      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous Page
        </button>
        <span className="text-lg text-gray-700">Page {page}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default Home;
