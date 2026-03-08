import styles from "./FloodProducts.module.css";

const floodProducts = [
  {
    title: "AquaResQ",
    description:
      "Advanced flood simulations converting rainfall to runoff, mapping flood extent, depth, duration, and drainage behaviour across city infrastructure.",
    video: "https://airesq-web-video.s3.ap-south-1.amazonaws.com/AQUARESQ.mp4",
  },
  {
    title: "MobiResQ",
    description:
      "Evaluates flood impacts on mobility and accessibility, enabling smart routing, emergency access planning, and resilient movement during flood conditions.",
    video: "https://airesq-web-video.s3.ap-south-1.amazonaws.com/MOBIRESQ.mp4",
  },
  {
    title: "FloodTwin",
    description:
      "A 3D digital twin rendering flood scenarios spatially, enabling intuitive understanding, asset-level impact forecasts, and scenario-based risk exploration.",
    video: "https://airesq-web-video.s3.ap-south-1.amazonaws.com/AQUATWIN.mp4",
  },
];

export default function FloodProducts() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headingBlock}>
          <h2>Turning Flood Science Into Action</h2>
          <p>
            Modular, interoperable tools developed from years of flood research
            and field deployments, designed to support planning, preparedness,
            and operations.
          </p>
        </div>

        <div className={styles.grid}>
          {floodProducts.map((item, index) => (
          <div className={styles.card}>
  <video
    src={item.video}
    autoPlay
    muted
    loop
    playsInline
    className={styles.video}
  />

  <div className={styles.overlay}>
    <div className={styles.textBlock}>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.description}>{item.description}</p>
    </div>
  </div>
</div>

          ))}
        </div>
      </div>
    </section>
  );
}
