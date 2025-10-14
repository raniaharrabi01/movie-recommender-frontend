// services/authService.js
import axios from "axios";

export const loginUser = async (credentials) => {
  const response = await axios.post("http://localhost:5000/user/login ", credentials);
  return response.data; 
};

export const signupUser = async (userData) => {
  const response = await axios.post("http://localhost:5000/user/signup", {
    email: userData.email,
    name: userData.name,
    password: userData.password,
  });
  return response;
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(`http://localhost:5000/user/update/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}