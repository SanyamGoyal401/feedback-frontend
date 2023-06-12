import React from 'react'
import styles from './Hero.module.css';


const Hero = () => {
  return (
    <div className={styles.hero}>
        <div className={styles.heroImg}>
            <img className={styles.Img} src='/hero.png' alt='hero'/>
        </div>
        <div className={styles.heroTxt}>
            <div className={styles.head1}>
                Add your products and give your valuable feedback
            </div>
            <div className={styles.head2}>
                Easily give your valuable feedback in a matter of minutes. Access your audience on all platforms. Observe result manually in real time.
            </div>
        </div>
    </div>
  )
}

export default Hero