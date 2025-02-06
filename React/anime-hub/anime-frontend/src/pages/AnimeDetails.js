import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite } from "../store/favoritesSlice";
import { addNotification } from "../store/notificationsSlice";

function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(response.data.data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeDetails();
  }, [id]);

  const addToFavorites = async () => {
    if (!anime) return;
    try {
      await axios.post(
        "http://localhost:5000/api/user/favorites",
        {
          anime: {
            mal_id: anime.mal_id,
            title: anime.title,
            image_url: anime.images.jpg.image_url,
          },
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      dispatch(addFavorite({
        mal_id: anime.mal_id,
        title: anime.title,
        image_url: anime.images.jpg.image_url,
      }));
      // Option 1: Use socket event to display notification and remove local dispatch
      // Option 2: If you prefer local notification, uncomment the next lines and
      // ensure your socket event handler is not also dispatching a similar notification.
      /*
      dispatch(addNotification({
        id: Date.now(),
        message: `Added "${anime.title}" to your favorites!`,
        type: "success",
        timestamp: Date.now()
      }));
      */
    } catch (error) {
      console.error("Error adding to favorites:", error);
      dispatch(addNotification({
        id: Date.now(),
        message: `Could not add "${anime.title}" to favorites.`,
        type: "error",
        timestamp: Date.now()
      }));
    }
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (!anime) return <p className="text-center text-xl">Anime not found.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">{anime.title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full md:w-1/3 rounded shadow-xl"
        />
        <div className="flex-1">
          <p className="mb-4 text-gray-700 dark:text-gray-300">{anime.synopsis}</p>
          <p className="mb-2 text-gray-800 dark:text-gray-100">Episodes: {anime.episodes}</p>
          <p className="mb-2 text-gray-800 dark:text-gray-100">Rating: {anime.rating}</p>
          <p className="mb-2 text-gray-800 dark:text-gray-100">Status: {anime.status}</p>
          {/* Display genres if available */}
          {anime.genres && anime.genres.length > 0 && (
            <p className="mb-2 text-gray-800 dark:text-gray-100">
              Genres: {anime.genres.map((g) => g.name).join(", ")}
            </p>
          )}
          {anime.url && (
            <a 
              href={anime.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block mt-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition"
            >
              Watch Now
            </a>
          )}
          {user && (
            <button
              onClick={addToFavorites}
              className="mt-4 ml-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Add to Favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimeDetails;
