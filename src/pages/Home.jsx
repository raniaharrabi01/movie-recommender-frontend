import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../services/movieService";
import { fetchFavoritesMovies } from "../services/movieService";
import Pagination from "../components/Pagination";

export default function Home() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [total_movies, setTotalMovies] = useState(0);
  const [total_pages, setTotalPages] = useState(0);
  const [current_page, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  const getMovies = async (page = current_page, query = searchQuery) => {
    try {
      setLoading(true);
      const response = await fetchMovies(page, limit, query);
      setMovies(response.movies);
      setTotalMovies(response.total_movies);
      setTotalPages(response.total_pages);
      setLimit(response.limit);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavoritesMovies(user.user_id).then((data) => {
        // data doit être un tableau d'IDs de films favoris
        setFavorites(data.map((fav) => fav.id));
      });
    }
  }, [user]);

  // Remettre la page à 1 à chaque nouvelle recherche
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Debounce le getMovies selon recherche ou page
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getMovies(current_page, searchQuery);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, current_page]);

  return (
    <div>
      <div className="bg-gradient-to-r from-black via-red-700 to-black">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 px-4 sm:px-6 lg:px-8 ">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Discover your next favorite movie ...
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Explore curated recommendations based on your tastes. Dive into new
            genres, trending titles, and timeless classics!
          </p>
          <div className="mt-6 flex  space-x-4">
            <button className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold shadow-md transition">
              Trending
            </button>
            <button className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md font-semibold shadow-md transition dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              New Releases
            </button>
            <button className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md font-semibold shadow-md transition dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              Classics
            </button>
          </div>
        </div>
        {loading ? (
          <p className="text-center text-black mt-6">Loading movies...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.includes(movie.id)}
              />
            ))}
          </div>
        )}
      </div>
      {/* Pagination */}
      <Pagination
        total_movies={total_movies}
        total_pages={total_pages}
        current_page={current_page}
        setCurrentPage={setCurrentPage}
        limit={limit}
      />
    </div>
  );
}
