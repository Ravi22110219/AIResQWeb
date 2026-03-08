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
  const [currentSlide, setCurrentSlide] = useState(0)

  const textSlides = [
    {
      title: "AI-Powered Flood Resilience",
      content: [
        "Unlock the potential of cutting-edge AI solutions to tackle flood risks and build resilient communities. Stay tuned for groundbreaking innovations and comprehensive strategies that leverage artificial intelligence to predict, mitigate, and manage flooding at an unprecedented scale.",
        "Born from a decade of research, Rain2Resilience has evolved into a globally deployable product — turning cutting-edge science into resilience solutions for cities in India and across the world",
      ],
    },
    {
      title: "AquaTwin Technology",
      content: [
        "AquaTwin - One of its kind for cities worldwide, AquaTwin is among the fastest physics-guided AI flood emulators, engineered to represent drainage networks, terrain, and the conservation of mass, energy, and momentum, while flexibly adapting to local urban conditions and interventions.",
        "Delivering more than 100× speed-up over traditional physical models with comparable accuracy, AquaTwin enables real-time, city-scale flood foresight that empowers planners, engineers, and civic authorities alike.",
      ],
    },
    {
      title: "Real-Time Flood Prediction",
      content: [
        "Experience next-generation flood forecasting with our advanced AI algorithms that process real-time weather data, terrain analysis, and urban infrastructure mapping to deliver precise flood predictions hours before traditional systems.",
        "Our machine learning models continuously adapt to changing environmental conditions, providing cities with the most accurate and timely flood warnings to protect lives and property.",
      ],
    },
  ]

  useEffect(() => {
    // Initialize the typing effect
    const typed = new Typed(".typing", {
      strings: ["Predicting Floods", "Mitigating Risks", "Building Resilience"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    })

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % textSlides.length)
    }, 5000) // Change slide every 5 seconds

    // Cleanup Typed.js instance and interval on component unmount
    return () => {
      typed.destroy()
      clearInterval(slideInterval)
    }
  }, [textSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % textSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + textSlides.length) % textSlides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section>
      <div className={styles.LandingPage}>
        <div className={styles.TypingEffect}>
          <p>
            {" "}
            <span></span>
            <span className="typing"></span>
          </p>
        </div>
        <div className={styles.LandingPageContentColumn}>
          <div className={styles.LandingPageContentCol_1}>
            <h1>{textSlides[currentSlide].title}</h1>

            {textSlides[currentSlide].content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={prevSlide}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ←
              </button>

              <div style={{ display: "flex", gap: "8px" }}>
                {textSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      border: "none",
                      background: currentSlide === index ? "white" : "rgba(255, 255, 255, 0.4)",
                      cursor: "pointer",
                      transition: "background 0.3s ease",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                →
              </button>
            </div>

            <Link to="/urban-flood">
              <button>Click For Demo</button>
            </Link>
          </div>
          <div className={styles.LandingPageContentCol_2}>
            <div className="LandingPageContentCol_2 img">
              {/* <TowerLoader /> */}
              {/* <Loader /> */}
            <img src={mainPageSidePhoto || "/placeholder.svg"} alt="" />
            </div>
          </div>
        </div>
      </div> 
      <section>
        {" "}
        {/* <LandingPage /> */}
        <CardSection />
        {/* <CapabilitiesSection /> */}
        <AIResQVideo />
        {/* <WeAreHiring /> */}
        <FloodProducts />
        {/* <UrbanFlood /> */}
        {/* <UrbanProblemSection /> */}
        {/* <FounderAdvisorSlider /> */}
        {/* <PartnersSection /> */}
        {/* <SuratProductMap /> */}
      </section>
      <section>
        <div className={styles.gondalSurfaceFloodBanner}>
          <div className={styles.gondalSurfaceFloodBannerContentColumn}>
            <div className={styles.gondalSurfaceFloodBannerContentCol_1}>
              <h1>Data-driven Decision Support System</h1>
              <p>
                Understand the impact of every flood mitigation measure before you act. Our decision support system
                models real-world scenarios, helping you compare options, anticipate outcomes, and move forward with
                clarity and confidence.
              </p>
              <Link to="/surface-flood">
                {" "}
                <button>Learn More</button>
              </Link>
            </div>
            <div className={styles.gondalSurfaceFloodBannerContentCol_2}>
              <img src="https://i.pinimg.com/originals/a5/2b/23/a52b232810587be914eab7c004e9fb08.gif" alt="Img" />
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default MainPage
