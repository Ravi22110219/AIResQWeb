import React from "react";
import styles from "./VideoSection.module.css";

const AIResQVideo = () => {
  return (
    <section className={styles.videoSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h3>Urban Flooding Is More Than Water on Streets</h3>
          <p>
            Here’s a concise walkthrough of the urban flooding challenge, the
            systems that shape it, and the intelligence AIResQ creates
          </p>
        </div>

        {/* Laptop Video */}
        <div className={styles.laptopFrame}>
          <div className={styles.screen}>
            <iframe
              className={styles.videoIframe}
              src="https://www.youtube.com/embed/H2JbteLAtqQ?autoplay=1&mute=1&controls=0&loop=1&playlist=H2JbteLAtqQ&rel=0&modestbranding=1&showinfo=0"
              title="AIResQ Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIResQVideo;