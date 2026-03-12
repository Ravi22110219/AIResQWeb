import styles from "./PartnersSection.module.css";

import iitrp from "../../assets/photos/partners/IIEC_IITGN.png";
import itel from "../../assets/photos/partners/ITEL_Logo.png";
import mir from "../../assets/photos/partners/MIRLOGO.png";
import airawat from "../../assets/photos/partners/Airawat.png";

const partners = [
  {
    name: "IIT Gandhinagar Research Park",
    logo: iitrp,
  },
  {
    name: "ITEL",
    logo: itel,
  },
  {
    name: "MIR Lab at IIT Gandhinagar",
    logo: mir,
  },
  {
    name: "Airawat Research Foundation",
    logo: airawat,
  },
];

export default function PartnersSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Meet Our Partners
        </h2>

        <div className={styles.grid}>
          {partners.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.logoWrapper}>
                <img src={item.logo} alt={item.name} />
              </div>
              <p className={styles.name}>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
