import axios from "axios";

export const fetchMovies = async (page, limit, search) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/movie/api/movies/db",
      {
        params: { page, limit, search },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovieById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/movie/api/movies/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    throw error;
  }
};

export const updateFavoriteMovie = async (movieId, userId) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/favorite/api/favorites",
      {
        item_id: movieId,
        user_id: userId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding favorite movie:", error);
    throw error;
  }
};

export const fetchFavoritesMovies = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/favorite/api/favorites/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

export const recommanderMoviesList = async (movieId) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/recommending/api/recommend",
      {
        params: { id: movieId },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    throw error;
  }
};

