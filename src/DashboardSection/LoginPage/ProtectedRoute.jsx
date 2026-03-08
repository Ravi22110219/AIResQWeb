import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../LoginPage/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

function ProtectedRoute() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  if (loading) return <h1>Loading...</h1>; // Show a loading message while checking auth

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
