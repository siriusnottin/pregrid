'use client';

import LieuOpenings from './LieuOpenings';
import LieuMap from './LieuMap';
import styles from './LieuSection.module.css'
import Heading from '@/components/ui/Heading';

export default function LieuSection() {
  return (
    <section className={styles.lieuSection}>
      <div>
        <Heading
          as="h2"
          className={styles.lieuTitle}
        >
          Lieu
        </Heading>
      </div>
      <div className={styles.lieuContent}>
        <LieuMap />
        <LieuOpenings />
      </div>
    </section>
  );
}
