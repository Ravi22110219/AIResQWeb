"use client"

import { useEffect, useState } from "react"
import Typed from "typed.js"
import styles from "./MainPage.module.css"
import { Link } from "react-router-dom"
import CardSection from "../Cards/CardsSection"
import UrbanFlood from "../../Pages/KozhikodeFloodPage/UrbanFlood"
import SuratProductMap from '../SuratProductMapPage/SuratProductMap'
// import WeAreHiring from "../WeAreHiring/WeAreHiring"
import mainPageSidePhoto from "../../assets/photos/mainside.png"
import AIResQVideo from "../VideoSection/AIResQVideo"
import FounderAdvisorSlider from "../Founders/FounderAdvisorSlider"
import LandingPage from "./LandingPage"
import FloodProducts from "../FloodProductsGIF/FloodProducts"
import PartnersSection from "../PartnersSection/PartnersSection"
import CapabilitiesSection from "../CapabilitiesSection/CapabilitiesSection"
import UrbanProblemSection from "../UrbanProblemSection/UrbanProblemSection"

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [landingPageLoaded, setLandingPageLoaded] = useState(false);

  useEffect(() => {
    // Pre-load the landing page component
    const preloadLandingPage = () => {
      // This forces the LandingPage component to be ready
      setLandingPageLoaded(true);
    };

    // Start preloading immediately
    preloadLandingPage();

    // Simulate minimum loading time for smooth animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Keep at 2 seconds for better UX

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}>
          <div className={styles.loaderCircle}>
            <div className={styles.loaderCircleInner}></div>
          </div>
          <div className={styles.loaderText}>
            <span>A</span>
            <span>I</span>
            <span>R</span>
            <span>e</span>
            <span>s</span>
            <span>Q</span>
          </div>
          <div className={styles.loadingSubtext}>
            <span className={styles.typingLoader}>Preparing flood intelligence...</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}></div>
        </div>

        {/* Water Drops Animation */}
        <div className={styles.waterDrops}>
          <div className={styles.drop}></div>
          <div className={styles.drop}></div>
          <div className={styles.drop}></div>
          <div className={styles.drop}></div>
        </div>

        {/* Hidden preloader for LandingPage */}
        <div style={{ display: 'none' }}>
          <LandingPage />
        </div>
      </div>
    );
  }

  return (
    <section>
      <section>
        <LandingPage />
        <CapabilitiesSection />
        <AIResQVideo />
        <FloodProducts />
        <UrbanProblemSection />
        <FounderAdvisorSlider />
        <PartnersSection />
      </section>
    </section>
  )
}

export default MainPage