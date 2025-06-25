'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ObjectiveCard.module.css';

gsap.registerPlugin(ScrollTrigger);

interface ObjectiveCardProps {
  text: string;
  onAnimationEnd?: () => void; // Notify parent when animation ends
}

export default function ObjectiveCard({ text, onAnimationEnd }: ObjectiveCardProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    
    // Initial state - hide all elements
    gsap.set(['.quiz-bg', '.quiz-text'], {
      opacity: 0,
      scale: 0.8,
    });

    // Animation timeline for entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      onComplete: () => {
        if (onAnimationEnd) onAnimationEnd(); // Notify parent
      }
    });

    // Animate background and text
    tl.to('.quiz-bg', {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    })
    .to('.quiz-text', {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.3');

    // Hover animations
    const hoverTl = gsap.timeline({ paused: true });
    hoverTl.to('.quiz-bg', {
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
    })
    .to('.quiz-text', {
      scale: 1.02,
      y: -2,
      duration: 0.4,
      ease: 'power2.out',
    }, 0);

    const handleMouseEnter = () => hoverTl.play();
    const handleMouseLeave = () => hoverTl.reverse();

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [onAnimationEnd]);

  return (
    <div ref={containerRef} className={styles.svgContainer}>
      <svg 
        ref={svgRef}
        width="300" 
        height="100" 
        viewBox="0 0 300 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={styles.animatedSvg}
      >
        {/* Background */}
        <rect 
          className="quiz-bg"
          width="300" 
          height="100" 
          rx="4"
          fill="#E15728"
        />
        
        {/* Text */}
        <text 
          className="quiz-text"
          x="150" 
          y="60" 
          textAnchor="middle" 
          fill="white"
          fontSize="24"
          fontWeight="700"
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
