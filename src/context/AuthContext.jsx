import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { loginUser ,signupUser} from "../services/authService";
import { jwtDecode } from "jwt-decode";
import React from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const storedToken = localStorage.getItem("token");
  const decodedUser = storedToken ? jwtDecode(storedToken) : null;
  const [user, setUser] = useState(decodedUser);

  // Vérifie et initialise l'utilisateur au chargement
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          // Token expiré
          console.log("Token expiré, suppression...");
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser(decoded);
        }
      } catch (err) {
        console.error("Erreur lors du décodage du token :", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const { token } = await loginUser(credentials);
      const decoded = jwtDecode(token);
      console.log("Utilisateur décodé après login :", decoded); // user details
      setUser(decoded);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

    const handleSignup = async (userData) => {
    try {
    const response = await signupUser(userData); 
    return response; 
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, handleSignup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
