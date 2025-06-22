import React from 'react';
import styles from './LieuOpenings.module.css';

const gridItems = [
  // Row 1
  { type: 'spacer' },
  { type: 'block', day: 'Lundi' },
  { type: 'spacer' },
  // Row 2
  { type: 'block', day: 'Mercredi' },
  { type: 'spacer' },
  { type: 'block', day: 'Mardi' },
  // Row 3
  { type: 'spacer' },
  { type: 'spacer' },
  { type: 'block', day: 'Jeudi' },
  // Row 4
  { type: 'block', day: 'Vendredi' },
  { type: 'block', day: 'Samedi' },
  { type: 'spacer' },
  // Row 5
  { type: 'spacer' },
  { type: 'spacer' },
  { type: 'block', day: 'Dimanche' },
] as const;

type Day = 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';

const times: Record<Day, string> = {
  Lundi: 'Fermé',
  Mardi: '10h – 18h',
  Mercredi: '10h – 18h',
  Jeudi: '12h – 20h',
  Vendredi: '10h – 18h',
  Samedi: '11h – 19h',
  Dimanche: '11h – 17h',
};

function getBlockClass(day: Day) {
  switch (day) {
    case 'Lundi':
    case 'Vendredi':
      return styles.lundi;
    case 'Mardi':
    case 'Samedi':
      return styles.mardi;
    case 'Mercredi':
    case 'Dimanche':
      return styles.mercredi;
    case 'Jeudi':
      return styles.jeudi;
    default:
      return '';
  }
}

export default function LieuOpenings() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {gridItems.map((item, idx) => {
          if (item.type === 'spacer') {
            return <div key={idx} className={styles.spacer} />;
          }
          const day = item.day as Day;
          return (
            <div
              key={day}
              className={`${styles.block} ${getBlockClass(day)}`}
            >
              <span className={styles.day}>{day}</span>
              <span className={styles.time}>{times[day]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
