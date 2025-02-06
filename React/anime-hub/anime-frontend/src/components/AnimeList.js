import React from "react";
import { Link } from "react-router-dom";

function AnimeList({ animeData, loading }) {
  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (!animeData || animeData.length === 0)
    return <p className="text-center text-xl">No anime found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {animeData.map((anime) => (
        <div
          key={anime.mal_id}
          className="border rounded-lg overflow-hidden shadow-xl transform transition duration-500 hover:scale-105 bg-white dark:bg-gray-800"
        >
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h2 className="font-bold text-xl mb-2 text-gray-800 dark:text-gray-100">
              {anime.title}
            </h2>
            <Link to={`/anime/${anime.mal_id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnimeList;
