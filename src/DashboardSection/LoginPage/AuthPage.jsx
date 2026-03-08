import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { motion } from "framer-motion";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is already logged in, redirect to the dashboard
        navigate("/flood-ai-dashboard");
      }
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, [navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegistering) {
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration Successful!");
        navigate("/flood-ai-dashboard");
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
        navigate("/flood-ai-dashboard");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-500 to-orange-600 p-5">
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-md bg-white/30 backdrop-blur-lg rounded-xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          {isRegistering ? "Create an Account" : "Welcome Back !"}
        </h2>
        
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <form onSubmit={handleAuth} className="flex flex-col space-y-4">
          {isRegistering && (
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/60 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/60 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/60 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isRegistering && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/60 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {isRegistering ? "Sign Up" : "Log In"}
          </motion.button>
        </form>

        <p className="text-center text-white mt-4">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}
          <span 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-300 cursor-pointer hover:underline ml-1"
          >
            {isRegistering ? "Log In" : ""}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
