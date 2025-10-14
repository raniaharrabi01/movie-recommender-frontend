import React from "react";
import Navbar from "../components/Navbar";
import background from "../assets/background.jpg";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar />
      <div className="backdrop-blur-xl px-6 rounded-xl shadow-lg max-w-3xl mx-auto text-center py-6 mt-30">
        <h2 className="text-3xl font-bold mb-4">
           Discover your next favorite movie
        </h2>

        <p className="text-lg">
           Unlimited entertainment, just a click away </p>
        <div className="flex items-center justify-center">
          <Link
            to="/signup"
            className=" text-white bg-gradient-to-r from-red-500 via-red-800 to-red-900 hover:bg-gradient-to-br 
             font-medium rounded-lg text-base px-6 py-3 text-center me-2 mb-2 mt-10"
          >
            Get started 🎥
          </Link>
        </div>
      </div>
    </div>
  );
}
