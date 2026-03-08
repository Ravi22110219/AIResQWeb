import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import Udit_Bhatia from "../../assets/photos/Udit_Bhatia.jpg";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Summary"); // Default active tab

  // Function to handle tab clicks
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <aside className={styles.sidebar}>
      <ul>
       <NavLink to="/flood-ai-dashboard"> <li
          className={activeTab === "Summary" ? styles.active : ""}
          onClick={() => handleTabClick("Summary")}
        >
          Summary
        </li></NavLink>
      <NavLink to="/flood-ai-dashboard/detail-page">  <li
          className={activeTab === "Detail" ? styles.active : ""}
          onClick={() => handleTabClick("Detail")}
        >
          Detail
        </li></NavLink>
        <NavLink to="/flood-ai-dashboard/location"><li
          className={activeTab === "Location" ? styles.active : ""}
          onClick={() => handleTabClick("Location")}
        >
          Location
        </li></NavLink>
        <NavLink to="/flood-ai-dashboard/setting"> <li
          className={activeTab === "Setting" ? styles.active : ""}
          onClick={() => handleTabClick("Setting")}
        >
          Setting
        </li></NavLink> 
      </ul>
      <div className={styles.profile}>
        <img src={Udit_Bhatia} alt="Profile" className={styles.profileImage} />
        <div>
          <span>Dr. Udit Bhatia</span>
          <button className={styles.dropdown}>▼</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
