import { useState } from 'react';
import WelcomeBanner from './components/quiz-svgs/WelcomeBanner';
import CubismPrompt from './components/quiz-svgs/CubismPrompt';

export default function QuizzPage() {
  const [showPrompt, setShowPrompt] = useState(false);

  return (
    <>
      <WelcomeBanner onAnimationEnd={() => setShowPrompt(true)} />
      {showPrompt && <CubismPrompt />}
    </>
  );
}
