import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import React from "react";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import PrivateRoute from "./PrivateRoute";
import Favorites from "../pages/Favorites";
import MovieDetails from "../pages/MovieDetails";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/home" element={ <PrivateRoute> <Home /> </PrivateRoute>} />
        <Route path="/movies/:id" element={<PrivateRoute> <MovieDetails /> </PrivateRoute>} />
        <Route path="/favorites" element={<PrivateRoute> <Favorites /> </PrivateRoute>} />
        {/* Ajoutez d'autres routes privées si nécessaire */}
      </Routes>
    </BrowserRouter>
  );
}
