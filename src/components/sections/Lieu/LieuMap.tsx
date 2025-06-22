'use client';

import styles from './LieuMap.module.css';
import Image from 'next/image';
import LieuOverlay from './LieuOverlay';

export default function LieuMap() {
  return (
    <div className={`${styles.mapContainer} ${styles.lieuMap}`}>
      <div className={styles.mapImageWrapper}>
        <Image
          src="/images/map.png"
          alt="Map of events"
          width={911}
          height={468}
          priority
          className={styles.mapImage}
        />
        <div className={styles.overlayContainer}>
          <LieuOverlay />
        </div>
      </div>
    </div>
  );
}
