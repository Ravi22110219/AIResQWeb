import React from 'react'
import styles from './Loader.module.css'
import image1 from '../../assets/photos/LoaderImage1.png'
import image2 from '../../assets/photos/LoaderImage2.png'
import image3 from '../../assets/photos/LoaderImage3.png'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div
        className={styles.layer}
        style={{ backgroundImage: `url(${image3})` }}
      ></div>
      <div
        className={styles.layer}
        style={{ backgroundImage: `url(${image2})` }}
      ></div>
      <div
        className={styles.layer}
        style={{ backgroundImage: `url(${image1})` }}
      ></div>
    </div>
  )
}

export default Loader
