import React, { useRef, useEffect } from "react";
import styles from "./FounderAdvisorSlider.module.css";

import Udit_Bhatia from "../../assets/photos/Udit_Bhatia.jpg";
import Auroop_Ganguly from "../../assets/photos/Auroop_Ganguly.jpg";
import Vivek_Kapadia from "../../assets/photos/Vivek_Kapadia.jpg";
import Divya_Upadhyay from "../../assets/photos/Divya_Upadhyay.jpg";
import Brijesh_Patel from "../../assets/photos/brijeshbhi_photo.jpg";
import Subimal_ghosh_Photo from "../../assets/photos/prof-subimal-ghosh.jpg";
import Raghu_Murtugudde from "../../assets/photos/Prof-Raghu.jpeg";
import Amit_Prashant from "../../assets/photos/Prof-amit-prashant.jpg";
import Pranab_Mohapatra from "../../assets/photos/prof-pranab-mohapatra.jpeg";
import Ashok_Jhunjhunwala from "../../assets/photos/ashok-jhunjhunwala.jpg";

const teamMembers = [
  {
    name: "Prof. Udit Bhatia",
    role: "Founder and Director",
    position: "Associate Professor, IIT Gandhinagar",
    image: Udit_Bhatia,
  },
  {
    name: "Prof. Vivek P. Kapadia",
    role: "Co-founder and Director",
    position:
      "Professor of Practice, IIT Gandhinagar | Former Secretary to Government of Gujarat",
    image: Vivek_Kapadia,
  },
  {
    name: "Dr. Divya Upadhyay",
    role: "Co-founder and CTO",
    position: "PhD Civil IIT Gandhinagar\nIIT Kanpur Alumnus",
    image: Divya_Upadhyay,
  },
  {
    name: "Mr. Brijeshbhai Patel",
    role: "Director",
    position: "Director, Photonics Watertech Pvt. Ltd.",
    image: Brijesh_Patel,
  },
  {
    name: "Prof. Auroop Ganguly",
    role: "Co-founder and Advisor",
    position:
      "CoE Distinguished Professor, Northeastern University, Boston, MA",
    image: Auroop_Ganguly,
  },
  {
    name: "Prof. Subimal Ghosh",
    role: "Advisor",
    position: "Professor, Civil Engineering, IIT Bombay",
    image: Subimal_ghosh_Photo,
  },
  {
    name: "Prof. Pranab Mohapatra",
    role: "Advisor",
    position: "Professor, Civil Engineering, IIT Gandhinagar",
    image: Pranab_Mohapatra,
  },
  {
    name: "Prof. Raghu Murtugudde",
    role: "Advisor",
    position:
      "Emeritus Professor, UMD | Retired Professor, IIT Bombay",
    image: Raghu_Murtugudde,
  },
  {
    name: "Prof. Amit Prashant",
    role: "Advisor",
    position: "Professor, Civil Engineering, IIT Gandhinagar",
    image: Amit_Prashant,
  },
  {
    name: "Prof. Ashok Jhunjhunwala",
    role: "Advisor",
    position: "Professor, Electrical Engineering, IIT Madras",
    image: Ashok_Jhunjhunwala,
  },
];

const FounderAdvisorSlider = () => {
  const sliderRef = useRef(null);

  // Pause animation when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        sliderRef.current.style.animationPlayState = 'paused';
      } else {
        sliderRef.current.style.animationPlayState = 'running';
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className={styles.teamSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          Our Founder <span className={styles.highlight}>&</span> Advisors
        </h2>
     

        <div className={styles.sliderWrapper}>
          <div className={styles.gradientOverlayLeft}></div>
          <div className={styles.gradientOverlayRight}></div>
          
          <div className={styles.sliderTrack} ref={sliderRef}>
            {[...teamMembers, ...teamMembers].map((member, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.imageWrapper}>
                  <img src={member.image} alt={member.name} />
                  <div className={styles.imageOverlay}></div>
                </div>
                <div className={styles.cardContent}>
                  <h3>{member.name}</h3>
                  <h4 className={styles.role}>{member.role}</h4>
                  <p>{member.position}</p>
                </div>
                <div className={styles.cardGlow}></div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill}></div>
        </div>
      </div>
    </div>
  );
};

export default FounderAdvisorSlider;