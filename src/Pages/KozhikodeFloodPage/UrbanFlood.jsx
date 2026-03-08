import React, { useState, useEffect } from "react";
import styles from "./UrbanFlood.module.css";
import RealTimeChart from "../RealTimeChart/RealTimeChart";

const MAP_URL = "https://ravi22110219.github.io/KozhikodeFloodMap/";

const UrbanFlood = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapKey, setMapKey] = useState(0);
  const [activeTab, setActiveTab] = useState("map"); // for mobile

  // Preload map in background
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://ravi22110219.github.io";
    document.head.appendChild(link);
  }, []);

  const refreshMap = () => {
    setMapLoaded(false);
    setMapKey((k) => k + 1);
  };

  return (
    <section className={styles.urbanFloodSection}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <h1 className={styles.mainTitle}>Kozhikode Urban Flood Monitoring</h1>
            <p className={styles.subTitle}>14-16 Aug 2018 flood mapping and rainfall analysis</p>
          </div>
          <div className={styles.headerBadges}>
            {/* <span className={styles.badge}>🌊 Live Monitoring</span>
            <span className={styles.badge}>📊 Updated Every 2s</span> */}
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className={styles.mobileTabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'map' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('map')}
          >
            🗺️ Flood Map
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'chart' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('chart')}
          >
            📈 Rainfall Chart
          </button>
        </div>

        {/* Main Content */}
        <div className={styles.kozhikodeMapBox}>
          {/* LEFT MAP COLUMN */}
          <div className={`${styles.mapColumn} ${activeTab === 'map' ? styles.active : ''}`}>
            <div className={styles.mapHeaderRow}>
              <div className={styles.mapHeading}>
                <div className={styles.headingIcon}>🗺️</div>
                <div className={styles.headingText}>
                  <h2>3-Day Flood Inundation Map</h2>
                  <p>Kozhikode Urban Area</p>
                </div>
              </div>

              <div className={styles.mapControls}>
                <button className={styles.refreshBtn} onClick={refreshMap}>
                  <span className={styles.btnIcon}>🔄</span>
                  <span className={styles.btnText}>Refresh Map</span>
                </button>
            
              </div>
            </div>

            <div className={styles.kozhikodeMapWrapper}>
              {!mapLoaded && (
                <div className={styles.mapLoader}>
                  <div className={styles.spinner}></div>
                  <p>Loading flood map...</p>
                  <span className={styles.loaderHint}>This may take a few seconds</span>
                </div>
              )}

              <iframe
                key={mapKey}
                src={MAP_URL}
                title="Kozhikode Flood Map"
                width="100%"
                height="500"
                loading="lazy"
                onLoad={() => setMapLoaded(true)}
                className={styles.kozhikodeMap}
                allow="geolocation"
              />
            </div>

            {/* Map Legend */}
        
          </div>

          {/* RIGHT CHART COLUMN */}
          <div className={`${styles.tableColumn} ${activeTab === 'chart' ? styles.active : ''}`}>
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                  <span className={styles.chartIcon}>🌧️</span>
                  <div>
                    <h3>Rainfall Intensity</h3>
                    <p>14-16 Aug 2018 precipitation data</p>
                  </div>
                </div>
                <div className={styles.chartStatus}>
                  <span className={styles.statusDot}></span>
                  <span>Past Event</span>
                </div>
              </div>
              <RealTimeChart />
            </div>

            {/* Quick Stats */}
 

            {/* Alert Message */}
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrbanFlood;