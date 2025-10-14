import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateFavoriteMovie } from "../services/movieService";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function MovieCard({ movie, isFavorite: initialFavorite, onFavoriteChange }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const { user } = useAuth();

  // Gestion du clic sur le cœur pour toggle favoris
  const toggleFavorite = (e) => {
    e.stopPropagation(); // Empêche la navigation quand on clique sur le coeur
    setIsFavorite(!isFavorite);
    console.log("Toggle favorite for movie:", movie.id, "user est  : " ,user.user_id , "is now", !isFavorite);
    updateFavoriteMovie(movie.id, user.user_id)
      .then((response) => {
        console.log("Favorite movie updated:", response);
        if (onFavoriteChange) {
        onFavoriteChange(); // 🔹 Refresh favoris si nécessaire
      }
      })
      .catch((error) => {
        console.error("Error updating favorite movie:", error);
      });
  };

  useEffect(() => {
    setIsFavorite(initialFavorite);
  }, [initialFavorite]);

  return (
    <div
      className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm
        dark:bg-gray-800 dark:border-gray-700
        hover:border-red-600 hover:shadow-[0_0_9px_rgba(220,38,38,0.7)]
        transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <div className="overflow-hidden rounded-t-lg relative">
        <img
          className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          src={movie.image_url ? movie.image_url : "/placeholder.jpg"}
          alt={movie.title}
        />
        {/* Bouton coeur positionné en absolute en haut à gauche */}
        <button
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-2 left-2 p-1 rounded-full cursor-pointer group"
          style={{ background: "transparent" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            {/* Fond blanc dans la forme du cœur */}
            <path
              fill="white"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
              2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42
              22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
            {/* Contour et remplissage conditionnel */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke={isFavorite ? "red" : "white"}
              strokeWidth={2}
              fill={isFavorite ? "red" : "none"}
              className="group-hover:stroke-red-600 group-hover:fill-red-600 transition-colors duration-200"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
              2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42
              22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {movie.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
          {movie.overview || "No overview available."}
        </p>
      </div>
    </div>
  );
}
