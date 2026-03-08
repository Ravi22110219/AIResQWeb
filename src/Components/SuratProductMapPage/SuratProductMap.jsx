import React, { useEffect, useRef } from 'react'
import styles from './SuratProductMap.module.css'

const SuratProductMap = () => {
  const mapRef = useRef(null)
  const tableRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate)
          } else {
            entry.target.classList.remove(styles.animate)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (mapRef.current) observer.observe(mapRef.current)
    if (tableRef.current) observer.observe(tableRef.current)

    return () => {
      if (mapRef.current) observer.unobserve(mapRef.current)
      if (tableRef.current) observer.unobserve(tableRef.current)
    }
  }, [])

  return (
    <div className={styles.suratMapBox}>
      <div ref={tableRef} className={styles.tableColumn}>
        <h2>Surat Flood Map (3 Days Forecast)</h2>
        <p>
          This map presents a 3-day flood prediction for Surat based on recent
          rainfall data and elevation analysis.
        </p>
        <p>
          <strong>Contributors:</strong> Ravi Kumawat, Lakhveer Singh
        </p>
      </div>

      <div ref={mapRef} className={styles.mapColumn}>
        <div className={styles.mapHeading}>
          <h1>3 Days Flood Map</h1>
        </div>
        <div className={styles.suratMap}>
          <iframe
            src="https://ravi22110219.github.io/SuratMap/"
            title="Surat Flood Map"
            width="100%"
            height="500px"
            style={{ border: '1px solid black' }}
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default SuratProductMap
