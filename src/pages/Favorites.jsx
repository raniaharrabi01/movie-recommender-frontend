import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";
import { fetchFavoritesMovies } from "../services/movieService";
import Pagination from "../components/Pagination";

export default function Favorites() {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(20);

  // Charger les favoris depuis le backend
  const loadFavorites = async () => {
    if (!user?.user_id) return;
    try {
      setLoading(true);
      const response = await fetchFavoritesMovies(user.user_id);
      setFavorites(response);
    } catch (error) {
      console.error("Erreur lors du chargement des favoris :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, [user]);

  // Remettre la page à 1 à chaque nouvelle recherche
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Filtrer les favoris selon la recherche
  const filteredFavorites = favorites.filter((movie) =>
    movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  // Pagination locale sur les résultats filtrés
  const paginatedFavorites = filteredFavorites.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <div>
      <div className="bg-gradient-to-r from-black via-red-700 to-black">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Your Favorite Movies ❤️
          </h1>
        </div>

        {loading ? (
          <p className="text-center text-black mt-6">Loading movies...</p>
        ) : filteredFavorites.length === 0 ? (
          <p className="text-center text-gray-500">No favorites found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {paginatedFavorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={true}
                onFavoriteChange={loadFavorites} // 🔹 rafraîchir après suppression
              />
            ))}
          </div>
        )}
      </div>

      {filteredFavorites.length > 0 && (
        <Pagination
          total_movies={filteredFavorites.length}
          total_pages={Math.ceil(filteredFavorites.length / limit)}
          current_page={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
        />
      )}
    </div>
  );
}
