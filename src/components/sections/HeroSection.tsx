'use client';

import Heading from '../ui/Heading';
import styles from './HeroSection.module.css';
import ImageTrail from '../ui/ImageTrail';

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <ImageTrail
          images={[
            '/images/image 5.png',
            '/images/image 7.png',
            '/images/image 8.png',
            '/images/image 9.png',
            '/images/image 10.png',
          ]}
          />
        <Heading 
          as="h1"
          className={styles.heroTitle}
        >
          <span>Free</span> <span>Grid</span>
        </Heading>
      </div>
    </section>
  );
}
