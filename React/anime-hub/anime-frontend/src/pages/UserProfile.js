// src/pages/UserProfile.js
import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setFavorites } from "../store/favoritesSlice";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

function UserProfile() {
  const favorites = useSelector((state) => state.favorites.items);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/favorites", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        dispatch(setFavorites(response.data));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    if (user) fetchFavorites();

    // (Optional) Socket.io listeners can be added here if needed.
    const socket = io("http://localhost:5000");
    socket.on("favoriteAdded", (data) => {
      // Optionally handle real-time updates here.
    });
    socket.on("favoriteRemoved", (data) => {
      // Optionally handle real-time updates here.
    });
    return () => socket.disconnect();
  }, [user, dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className="text-xl text-center text-gray-700 dark:text-gray-300">You have no favorite anime yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {favorites.map((anime) => (
            <div key={anime.mal_id} className="border p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
              <img src={anime.image_url} alt={anime.title} className="w-full mb-4 rounded" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{anime.title}</h3>
              <Link to={`/anime/${anime.mal_id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
