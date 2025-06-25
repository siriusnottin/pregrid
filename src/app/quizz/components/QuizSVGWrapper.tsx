'use client';

import { useState } from 'react';
import WelcomeBanner from './quiz-svgs/WelcomeBanner';
import CubismPrompt from './quiz-svgs/CubismPrompt';
import ObjectiveCard from './quiz-svgs/ObjectiveCard';
import styles from '../page.module.css';

export default function QuizSVGWrapper() {
  const [showObjectiveCard, setShowObjectiveCard] = useState(false);
  const [showCubismPrompt, setShowCubismPrompt] = useState(false);

  return (
    <>
      <WelcomeBanner
        text="Bienvenue dans notre quiz interactif."
        className={styles.welcomeBanner}
        onAnimationEnd={() => setShowObjectiveCard(true)}
      />
      {showObjectiveCard && (
        <ObjectiveCard
          text="Commencer le quiz"
          onAnimationEnd={() => setShowCubismPrompt(true)}
        />
      )}
      {showCubismPrompt && (
        <CubismPrompt
          text="Êtes-vous prêt à explorer l’univers géométrique du cubisme ?"
          className={styles.cubismPrompt}
        />
      )}
    </>
  );
}
