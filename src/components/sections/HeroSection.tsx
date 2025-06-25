'use client';

import Heading from '../ui/Heading';
import styles from './HeroSection.module.css';
import gridStyles from '@/styles/grid.module.css';
import ImageTrail from '../ui/ImageTrail';

export default function HeroSection() {
  return (
    <section className={`${styles.heroSection} ${gridStyles.grid}`}>
      <div className={styles.heroContent}>
        <ImageTrail
          images={[
            '/images/image 5.png',
            '/images/image 6.jpg',
            '/images/image 7.png',
            '/images/image 8.jpg',
            '/images/image 8.png',
            '/images/image 9.png',
            '/images/image 10.png',
            '/images/Main_Guernica_BAT-10313 2.png',
            '/images/pablo-picasso-les-demoiselles-davignon-1907-e1590724190144 (1) 3.png',
          ]}
        />
        <Heading as="h1" className={styles.heroTitle}>
          <span>Free</span> <span>Grid</span>
        </Heading>
      </div>
    </section>
  );
}
