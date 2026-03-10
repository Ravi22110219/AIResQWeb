import React from "react";
import styles from "./UrbanProblemSection.module.css";

const focusPoints = [
  {
    title: "Science that holds up in the real world",
    desc: "Grounded in hydrology and urban systems, not black-box predictions.",
  },
  {
    title: "Speed without sacrificing physical realism",
    desc: "Because insight that arrives late is as good as insight that never arrived.",
  },
  {
    title: "Clarity for people who must act",
    desc: "Engineers, planners, and officials working with limited time and high stakes.",
  },
];

const UrbanProblemSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left Content */}
        <div className={styles.left}>
          <h2>Urban Flooding Is Not A Data Problem Alone.</h2>

          <p className={styles.lead}>
            It is a systems problem, where rainfall, drainage, infrastructure,
            and decisions intersect under pressure.
          </p>

          <p className={styles.body}>
            Cities struggle when flood understanding arrives too late, too
            coarse, or disconnected from how cities actually function. That gap
            is what drives our work.
          </p>
        </div>

        {/* Right Cards */}
        <div className={styles.right}>
          <div className={styles.focusHeader}>
            What we focus on, consistently:
          </div>

          <div className={styles.focusGrid}>
            {focusPoints.map((item, i) => (
              <div key={i} className={styles.focusCard}>
                <div className={styles.dot}></div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrbanProblemSection;