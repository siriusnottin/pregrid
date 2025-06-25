'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './WelcomeBanner.module.css';

interface WelcomeBannerProps {
  text?: string;
  className?: string;
  onAnimationEnd?: () => void; // callback for parent
}

export default function WelcomeBanner({ text, className, onAnimationEnd }: WelcomeBannerProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const textRef = useRef<SVGTextElement>(null);

  // Helper to wrap text for SVG (based on actual SVG dimensions)
  function wrapSvgText(text: string, maxChars = 35): string[] {
    if (!text) return [''];
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      if ((currentLine + ' ' + word).trim().length > maxChars) {
        if (currentLine) lines.push(currentLine.trim());
        currentLine = word;
      } else {
        currentLine += (currentLine ? ' ' : '') + word;
      }
    }
    if (currentLine) lines.push(currentLine.trim());
    return lines;
  }

  const textLines = wrapSvgText(text ?? '');

  useEffect(() => {
    if (!rectRef.current || !textRef.current) return;
    // Set initial states
    gsap.set(rectRef.current, { width: 0 });
    gsap.set(textRef.current, { opacity: 0 });
    // Animate rectangle width (slower)
    gsap.to(rectRef.current, {
      width: 329,
      duration: 1.1, // slowed down
      ease: 'power2.out',
      onComplete: () => {
        // Fade in text after a delay
        gsap.to(textRef.current, {
          opacity: 1,
          duration: 0.6,
          delay: 0.18,
          ease: 'power2.out',
          onComplete: () => {
            if (onAnimationEnd) onAnimationEnd(); // notify parent
          }
        });
      }
    });
  }, [onAnimationEnd]);

  return (
    <div ref={containerRef} className={`${styles.welcomeBanner} ${className}`}>
      <svg
        ref={svgRef}
        width="329"
        height="98"
        viewBox="0 0 329 98"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.bannerSvg}
        style={{ opacity: 1, display: 'block' }}
      >
        {/* Background rectangle */}
        <rect
          ref={rectRef}
          className="banner-bg"
          x="0"
          y="0"
          width="329"
          height="98"
          fill="#2B507D"
          style={{ opacity: 1 }}
        />
        
        {/* Text content */}
        <text
          ref={textRef}
          className="banner-text"
          x="164.5"
          y="49"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="14"
          fontWeight="500"
          fontFamily="Arial, Helvetica, sans-serif"
          style={{ opacity: 1 }}
        >
          {textLines.map((line, i) => (
            <tspan
              key={i}
              x="164.5"
              dy={i === 0 ? 0 : 18}
            >
              {line}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  );
}
