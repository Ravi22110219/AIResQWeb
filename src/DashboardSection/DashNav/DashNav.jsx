import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../LoginPage/firebase";
import styles from "./DashNav.module.css";
import logo from "../../assets/photos/logo1.png";

const DashNav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert("Logged out successfully!");
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className={styles.dashNav}>
      <div className={styles.logo}>
        <img src={logo} className={styles.logoImg} alt="Logo" />
        <h1>AIResQ</h1>
      </div>
      <ul className={styles.navLinks}>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>FAQs</li>
        <li>About</li>
      </ul>
      <div className={styles.authButtons}>
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default DashNav;
