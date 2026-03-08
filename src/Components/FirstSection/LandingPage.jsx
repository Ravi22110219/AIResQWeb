import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

import grid1 from "../../assets/photos/landingPage/1.jpg";
import grid2 from "../../assets/photos/landingPage/2.jpg";
import grid3 from "../../assets/photos/landingPage/3.jpg";
import grid4 from "../../assets/photos/landingPage/4.jpg";
import grid5 from "../../assets/photos/landingPage/5.jpg";
import grid6 from "../../assets/photos/landingPage/6.jpg";

const LandingPage = () => {
  const typingRef = useRef(null);

  const imagesColA = [grid1, grid2, grid3, grid1, grid2, grid3];
  const imagesColB = [grid4, grid5, grid6, grid4, grid5, grid6];

  useEffect(() => {
    if (!typingRef.current) return;
    const typed = new Typed(typingRef.current, {
      strings: ["Predicting Floods", "Mitigating Risks", "Building Resilience"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
    return () => typed.destroy();
  }, []);

  return (
    <section className={styles.LandingPage}>
      <div className={styles.LandingPageContentColumn}>
        <div className={styles.LandingPageContentCol_1}>
          <span className={styles.badge}>Rain to Resilience</span>

          <div className={styles.TypingEffect}>
            <span ref={typingRef}></span>
          </div>

          <h1>AI-Powered Urban Flood Intelligence, Built for Decisions</h1>

          <p>
           Developed in India, AIResQ combines live, science-grounded flood simulations with decision-ready insights to help cities, infrastructure owners, and industries understand flood behaviour and plan the right actions.
          </p>

          {/* <p>
            AquaTwin delivers more than 100× speed-up over traditional physical
            models with comparable accuracy, enabling real-time, city-scale flood
            foresight.
          </p> */}

          <Link to="/urban-flood">
            <button>See the Platform in Action</button>
          </Link>
        </div>

        <div className={styles.LandingPageContentCol_2}>
          <div className={styles.imageColumnUp}>
            {imagesColA.map((src, i) => (
              <div key={`a-${i}`} className={styles.imageCard}>
                <img src={src} alt={`Flood analysis ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
          <div className={styles.imageColumnDown}>
            {imagesColB.map((src, i) => (
              <div key={`b-${i}`} className={styles.imageCard}>
                <img src={src} alt={`Flood data ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
