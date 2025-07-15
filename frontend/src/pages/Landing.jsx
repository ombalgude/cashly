import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import upiImage from "../assets/upi-image.png";
import BACKEND_URL from "../../config";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/`)
      .then((res) => console.log("Backend connected:", res.data))
      .catch((err) => console.error("Backend error:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-black to-gray-900 text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 shadow-lg bg-black bg-opacity-60 backdrop-blur-md">
        <h1 className="text-3xl font-extrabold tracking-wide text-blue-400">
          Cashly
        </h1>
        <div className="flex space-x-6">
          <Button
            label="Sign\u00A0Up"
            onClick={() => navigate("/signup")}
            className="text-lg px-8 py-3"
          />
          <Button
            label={isLoggedIn ? "Logout" : "Login"}
            onClick={() => {
              if (isLoggedIn) {
                setIsLoggedIn(false);
                localStorage.removeItem("token");
              } else {
                navigate("/signin");
              }
            }}
            className="text-lg px-8 py-3"
          />
          <Button
            label="Dashboard"
            onClick={() => {
              const token = localStorage.getItem("token");
              if (token) {
                navigate("/dashboard");
              } else {
                alert("Please sign in first to access the dashboard.");
              }
            }}
            className="text-lg px-8 py-3"
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center px-6 md:px-36 py-20">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-16 w-full">
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-200">
              The Future of UPI Payments
            </h2>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              Cashly is a next-generation UPI payment platform built for simplicity, speed, and security. Whether you're sending or receiving money, Cashly ensures a seamless and reliable payment experience — powered by trust and modern tech.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <img
              src={upiImage}
              alt="UPI Illustration"
              className="w-80 md:w-96 drop-shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto text-center text-gray-500 text-sm py-6 bg-black bg-opacity-60">
        © 2025 Cashly. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
