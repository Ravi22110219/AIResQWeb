import React from "react";

import Footer from "./Components/FooterSection/Footer";
import { Outlet } from "react-router-dom";

import HeaderBg from "./Components/HeaderBg/HeaderBg";
import DashNav from "./DashboardSection/DashNav/DashNav";
import Sidebar from "./DashboardSection/Sidebar/Sidebar";


function DashboardLayout() {
  return(
    <>
    <DashNav />
   
    <Sidebar />
    <HeaderBg />
   
    <main style={{ marginLeft: "200px"}}>
        <Outlet /><Footer /> 
      </main>
    

    </>
  )
};

export default DashboardLayout;