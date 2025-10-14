import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import background from "../assets/background.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { handleSignup } = useAuth();
  const [alertInfo, setAlertInfo] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await handleSignup({ email, password, name });
    if (response.status === 201) {
      setAlertInfo({
        type: "success",
        title: "Success 🎉",
        message: response.data.message,
      });
      setTimeout(() => navigate("/login"), 2000);
    }
  } catch (error) {
    if (error.response) {
      setAlertInfo({
        type: "error",
        title: "Error ❌",
        message: error.response.data.message, // message exact du backend
      });
    } else {
      setAlertInfo({
        type: "error",
        title: "Error ❌",
        message: "Signup failed. Please try again.",
      });
    }
  }
};



  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="space-y-5">
        <Navbar />
        {/* ✅ Affiche l’alerte seulement si alertInfo existe */}
        {alertInfo && (
          <Alert
            className="fixed top-3 left-1/2 transform -translate-x-1/2 max-w-md w-full z-50"
            type={alertInfo.type}
            title={alertInfo.title}
            message={alertInfo.message}
          />
        )}
        <section className="mt-13">
          <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0 min-h-[10vh]">
            <div className="w-full backdrop-blur-xl rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {/* Titre */}
                <div className="flex justify-center">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                  </h1>
                </div>

                {/* Form */}
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                               focus:ring-primary-600 focus:border-primary-600 
                               block w-full p-2.5 
                               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                               focus:ring-primary-600 focus:border-primary-600 
                               block w-full p-2.5 
                               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                               focus:ring-primary-600 focus:border-primary-600 
                               block w-full p-2.5 
                               dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      autoComplete="new-password"
                    />
                  </div>

                  {/* Bouton */}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
                               focus:ring-4 focus:ring-gray-300 font-medium rounded-lg 
                               text-sm px-5 py-2.5 me-2 mb-2 
                               dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 
                               dark:border-gray-700"
                    >
                      Create an account
                    </button>
                  </div>

                  {/* Lien vers login */}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
