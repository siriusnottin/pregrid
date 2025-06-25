import { useState } from 'react';
import WelcomeBanner from './quiz-svgs/WelcomeBanner';
import CubismPrompt from './CubismPrompt'; // Adjust the import path if needed

export default function QuizzPage() {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <>
      <WelcomeBanner onAnimationEnd={() => setShowPrompt(true)} />
      {showPrompt && <CubismPrompt />}
    </>
  );
}
