import React from "react";
import styles from "./CapabilitiesSection.module.css";

const capabilities = [
  {
    id: 1,
    title: "Accuracy",
    desc: "Validated with past records and sensor observations",
    icon: (
      <svg viewBox="0 0 24 24" className={styles.iconSvg}>
        <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z" />
        <path d="M9 12l2 2 4-4" className={styles.iconTick} />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Speed",
    desc: "100× faster than traditional simulations",
    icon: (
      <svg viewBox="0 0 24 24" className={styles.iconSvg}>
        <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Readiness",
    desc: "Decision-ready outputs for cities",
    icon: (
      <svg viewBox="0 0 24 24" className={styles.iconSvg}>
        <path d="M4 6h16v10H4z" />
        <path d="M8 10h8M8 14h5" className={styles.iconLines} />
      </svg>
    ),
  },
];

const CapabilitiesSection = () => {
  return (
    <section className={styles.capSection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Designed for Real-World Urban Complexity</h2>
          <p>
           Foundational capabilities that make near real-time flood prediction possible
          </p>
        </header>

        <div className={styles.grid}>
          {capabilities.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>

              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              <div className={styles.bottomLine}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;