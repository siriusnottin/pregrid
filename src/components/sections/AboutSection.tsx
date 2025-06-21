'use client';

import styles from './AboutSection.module.css';
import Heading from '@/components/ui/Heading';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className={styles.aboutSection}>
      <Heading
        as="h2"
        className={styles.aboutTitle}
      >
        About
      </Heading>
      <div className={styles.aboutContent}>
        <p className={styles.subtitle}>
          Venez découvrir un lieu où formes géométriques, vision artistique et innovation numérique se rencontrent.
        </p>
        <div className={styles.aboutImage}>
          <Image
            src="/images/image 5.png"
            alt="About Free Grid"
            width={891}
            height={894}
            priority
          />
        </div>
        <div className={styles.aboutText}>
          <p>
            Fondé pour célébrer l’art sous toutes ses formes, notre musée s’inscrit aujourd’hui dans une nouvelle ère.
          </p>
          <p>
            À travers cette exposition dédiée au cubisme, il affirme son engagement à rendre l’art accessible, vibrant et connecté aux générations actuelles.
          </p>
          <p>
            Entre murs chargés d’histoire et interfaces interactives, le musée réinvente sa manière de transmettre la culture.
          </p>
        </div>
      </div>
    </section>
  );
}
