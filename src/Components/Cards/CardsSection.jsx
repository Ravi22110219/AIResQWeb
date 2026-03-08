import React from 'react';
import styles from './CardsSection.module.css';
import { NavLink } from 'react-router-dom';
import Img1 from '../../assets/photos/River_flooding.png';
import Img2 from '../../assets/photos/Compound.png';
import Img3 from '../../assets/photos/Hyperlocal.png';
import Img4 from '../../assets/photos/Recovery.png';

const cardsData = [
  {
    id: 1,
    title: 'River Flooding',
    description:
      'AI-powered predictive modeling for riverine flood forecasting and early warning systems.',
    link: '/riverine-flood',
    image: Img1,
  },
  {
    id: 2,
    title: 'Compound Flooding',
    description:
      'Advanced analytics for combined coastal and inland flood risk assessment.',
    link: '/urban-flood',
    image: Img2,
  },
  {
    id: 3,
    title: 'Hyperlocal Flood Remediation',
    description:
      'Street-level flood predictions with high-resolution simulation tools.',
    link: '/surface-flood',
    image: Img3,
  },
  {
    id: 4,
    title: 'Integrated Recovery',
    description:
      'Holistic resilience planning and post-flood recovery optimization.',
    link: '/',
    image: Img4,
  },
];

const CardSection = () => {
  return (
    <section className={styles.cards} id="cards">
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          {/* <span className={styles.sectionTag}>Our Solutions</span> */}
          <h1>Designed for Real-World Urban Complexity</h1>
        
        </header>

        <div className={styles.cardsContents}>
          {cardsData.map((card) => (
            <div key={card.id} className={styles.cardBox}>
              <div className={styles.cardImageWrapper}>
                <div className={styles.cardBoxTop}>
                  <img src={card.image} alt={card.title} loading="lazy" />
                </div>
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.cardDesc}>
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                </div>
                
                <div className={styles.cardFooter}>
                  <div className={styles.divider}></div>
                  <div className={styles.btnDiv}>
                    {card.id === 4 ? (
                      <button className={`${styles.cardBtn} ${styles.comingSoonBtn}`} disabled>
                        <span className={styles.btnGlow}></span>
                        Coming Soon
                      </button>
                    ) : (
                      <NavLink to={card.link} className={styles.cardLink}>
                        <button className={styles.cardBtn}>
                          <span className={styles.btnGlow}></span>
                          <span className={styles.btnText}>Learn More</span>
                          <svg className={styles.btnIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardSection;