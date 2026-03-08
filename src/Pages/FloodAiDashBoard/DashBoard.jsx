import React from "react";
import styles from "./DashBoard.module.css"
import { NavLink } from "react-router-dom";
import UrbanFlood from "../KozhikodeFloodPage/UrbanFlood";
import SummarySection from "../../DashboardSection/SummaryPage/SummarySection";
import DetailPage from "../../DashboardSection/DetailPage/Detail";

const DashBoard = () =>{
  return(<>
  <SummarySection />
    {/* // <div className={styles.dashBoardPage}>
    //   <h1>Coming Soon...</h1>
    //  <NavLink to="/contact-us"><button>Contact Us</button></NavLink> 
    // </div> */}
    </>
  )
}

export default DashBoard;