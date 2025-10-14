import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import Navbar from "../components/Navbar";
import {
  fetchMovieById,
  recommanderMoviesList,
  updateFavoriteMovie,
} from "../services/movieService";
import MovieCard from "../components/MovieCard";
import { useAuth } from "../context/AuthContext";
import { fetchFavoritesMovies } from "../services/movieService";

export default function MovieDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [recommandation, setRecommandation] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState();

  useEffect(() => {
    async function loadMovie() {
      try {
        const response = await fetchMovieById(id);
        setMovie(response);
        const recomandations = await recommanderMoviesList(id);
        setRecommandation(recomandations);
        console.log("Recommandations:", recomandations);
      } catch (error) {
        console.error("Erreur lors du chargement du film :", error);
      }
    }
    loadMovie();
  }, [id]);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Empêche la navigation quand on clique sur le coeur
    setIsFavorite(!isFavorite);
    updateFavoriteMovie(movie.id, user.user_id)
      .then((response) => {
        console.log("Favorite movie updated:", response);
      })
      .catch((error) => {
        console.error("Error updating favorite movie:", error);
      });
  };

  useEffect(() => {
    if (user) {
      fetchFavoritesMovies(user.user_id).then((data) => {
        // data doit être un tableau d'IDs de films favoris
        setFavorites(data.map((fav) => fav.id));
      });
    }
  }, [user]);

  useEffect(() => {
    if (movie && favorites.length > 0) {
      setIsFavorite(favorites.includes(movie.id));
    }
  }, [movie, favorites]);

  if (!movie) {
    return <div className="text-center text-white mt-20">Chargement...</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Section de l'en-tête avec l'image de fond */}
      <div className="relative overflow-hidden">
        <div className="bg-transparent">
          <Navbar hideSearch={true} />
        </div>
        {/* Image de fond avec effet de dégradé */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.image_url})` }}
        >
          {/* Superposition pour assombrir et appliquer un flou */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          {/* Dégradé noir pour une transition douce vers le bas */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        {/* Contenu principal sur l'image de fond */}
        <div className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-24 pb-12 pt-5">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Poster du film */}
            <div className="flex-shrink-0 w-48 md:w-64 lg:w-80 shadow-2xl rounded-xl overflow-hidden">
              <img
                src={movie.image_url}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              {/* Bouton coeur positionné en absolute en haut à gauche */}
              <button
                onClick={toggleFavorite}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
                className="absolute top-7 left-25 p-1 rounded-full cursor-pointer group"
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

            {/* Détails du film */}
            <div className="flex flex-col text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold leading-tight mt-4 md:mt-0">
                {movie.title}
              </h1>

              {/* Métadonnées */}
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-4 text-gray-300">
                {/* Note */}
                {movie.rating && movie.rating !== "Note non disponible" && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-lg">⭐</span>
                    <span className="font-semibold text-white">{movie.rating}</span>
                  </div>
                )}
                {/* Année de sortie */}
                <p className="text-white">
                  {movie.release_date
                    ? movie.release_date.split("-")[0]
                    : "Date inconnue"}
                </p>
                {/* Genres */}
                <p className="text-white">
                  {Array.isArray(movie.genres)
                    ? movie.genres.join(", ")
                    : movie.genres}
                </p>
              </div>

              {/* Bouton pour regarder */}
              <button
                onClick={() => window.open(movie.trailer_url, "_blank")}
                className="mt-8 w-40 px-3 py-3 bg-white hover:bg-red-800 font-bold rounded-3xl transition-colors"
              >
                <div className="flex items-center justify-center gap-2 text-black h-full">
                  <FaPlay className="text-lg" />
                  <span>Play Trailer</span>
                </div>
              </button>

              {/* Synopsis */}
              <p className="mt-6 max-w-2xl text-white text-sm md:text-base leading-relaxed">
                {movie.overview}
              </p>

              {/* Section des réalisateurs */}
              {movie.director && (
                <p className="mt-4">
                  <span className="font-semibold text-gray-400">Director :</span>
                  <span className="font-bold"> {movie.director}</span>
                </p>
              )}
              {/* Section du casting */}
              {Array.isArray(movie.cast) && movie.cast.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-400 mb-4">Casting</h3>
                  <div className="flex flex-wrap gap-4">
                    {movie.cast.map((actor, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-900 text-white px-4 py-2 rounded-full text-m hover:bg-gray-800 transition-colors"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pb-8">
        <h1 className="text-2xl font-extrabold text-white">
          Discover the list of recommendation movies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {recommandation.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.includes(movie.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
