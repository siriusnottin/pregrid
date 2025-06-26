'use client';

import { useEffect, useRef, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CubismPrompt.module.css';

gsap.registerPlugin(ScrollTrigger);

interface OCubismPromptbjectiveCard {
  text?: string;
  className?: string;
}

export default function CubismPrompt({ text, className }: OCubismPromptbjectiveCard) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper: get mouse position in SVG coordinates
  function getSvgMouse(e: MouseEvent, svg: SVGSVGElement) {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: pt.x, y: pt.y };
    const svgP = pt.matrixTransform(ctm.inverse());
    return { x: svgP.x, y: svgP.y };
  }

  // Shared points for morphing shapes
  const sharedPoints = useMemo(
    () => [
      { x: 173.5, y: 0 }, // 0: triangle top
      { x: 279, y: 66 }, // 1: right
      { x: 279, y: 182 }, // 2: bottom right (rect)
      { x: 66, y: 576.5 }, // 3: bottom left (SVG)
      { x: 66, y: 66 }, // 4: left
      { x: 0, y: 171.5 }, // 5: far left mid
      { x: 66, y: 282 }, // 6: left bottom (rect)
    ],
    []
  );

  // Path helpers for morphing shapes
  const trianglePath = useCallback(
    (pts: typeof sharedPoints) =>
      `M${pts[0].x} ${pts[0].y}L${pts[1].x} ${pts[1].y}L${pts[4].x} ${pts[4].y}Z`,
    []
  );
  const brownLeftPath = useCallback(
    (pts: typeof sharedPoints) =>
      `M${pts[5].x} ${pts[5].y}L${pts[4].x} ${pts[4].y}L${pts[6].x} ${pts[6].y}Z`,
    []
  );
  // Brown bottom: static triangle, visually separated from orange rect
  const brownBottomPath = () => `M66 276.5L66 210L279 276.5Z`;

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    const container = containerRef.current;
    const svg = svgRef.current;
    let points = sharedPoints.map((p) => ({ ...p }));
    function onMouseMove(e: MouseEvent) {
      const mouse = getSvgMouse(e, svg);
      // Find closest shared point
      let minDist = Infinity,
        minIdx = 0;
      for (let i = 0; i < points.length; i++) {
        const dx = points[i].x - mouse.x;
        const dy = points[i].y - mouse.y;
        const dist = dx * dx + dy * dy;
        if (dist < minDist) {
          minDist = dist;
          minIdx = i;
        }
      }
      // Move only the closest point
      const newPoints = points.map((pt, i) =>
        i === minIdx ? { x: pt.x + (mouse.x - pt.x) * 0.25, y: pt.y + (mouse.y - pt.y) * 0.25 } : pt
      );
      // Animate all shapes using the new points
      gsap.to('.orange-triangle', {
        attr: { d: trianglePath(newPoints) },
        duration: 0.25,
        ease: 'power2.out',
      });
      gsap.to('.orange-bg', {
        attr: {
          x: Math.min(newPoints[1].x, newPoints[4].x),
          y: Math.min(newPoints[1].y, newPoints[2].y, newPoints[3].y, newPoints[4].y),
          width: Math.abs(newPoints[1].x - newPoints[4].x),
          height: Math.abs(newPoints[3].y - newPoints[1].y),
        },
        duration: 0.25,
        ease: 'power2.out',
      });
      gsap.to('.brown-left', {
        attr: { d: brownLeftPath(newPoints) },
        duration: 0.25,
        ease: 'power2.out',
      });
      gsap.to('.brown-bottom', {
        attr: { d: brownBottomPath() },
        duration: 0.25,
        ease: 'power2.out',
      });
      points = newPoints;
    }
    function onMouseLeave() {
      points = sharedPoints.map((p) => ({ ...p }));
      gsap.to('.orange-triangle', {
        attr: { d: trianglePath(points) },
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to('.orange-bg', {
        attr: {
          x: Math.min(points[1].x, points[4].x),
          y: Math.min(points[1].y, points[2].y, points[3].y, points[4].y),
          width: Math.abs(points[1].x - points[4].x),
          height: Math.abs(points[3].y - points[1].y),
        },
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to('.brown-left', {
        attr: { d: brownLeftPath(points) },
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to('.brown-bottom', {
        attr: { d: brownBottomPath() },
        duration: 0.5,
        ease: 'power2.out',
      });
    }
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [sharedPoints, trianglePath, brownLeftPath]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    const container = containerRef.current;
    // Only fade in, no scale or hover morphs
    gsap.set(['.orange-bg', '.orange-triangle', '.brown-left', '.brown-bottom', '.text'], {
      opacity: 0,
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    tl.to('.orange-triangle', {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    })
      .to(
        '.orange-bg',
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .to(
        '.brown-left',
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      .to(
        '.brown-bottom',
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      .to(
        '.text',
        {
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.2'
      );
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Helper to split text into lines that fit the rectangle width
  function wrapSvgText(text: string = '', maxChars = 22): string[] {
    if (!text) return [''];
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    for (const word of words) {
      if ((currentLine + ' ' + word).trim().length > maxChars) {
        lines.push(currentLine.trim());
        currentLine = word;
      } else {
        currentLine += (currentLine ? ' ' : '') + word;
      }
    }
    if (currentLine) lines.push(currentLine.trim());
    return lines;
  }

  return (
    <div ref={containerRef} className={`${styles.svgContainer} ${className}`}>
      <svg
        ref={svgRef}
        width="400"
        height="300"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.animatedSvg}
      >
        {/* Brown left triangle beneath orange shapes */}
        <path className="brown-left" d={brownLeftPath(sharedPoints)} fill="#BF471E" />
        {/* Orange rectangle */}
        <rect
          className="orange-bg"
          x={Math.min(sharedPoints[1].x, sharedPoints[4].x)}
          y={Math.min(sharedPoints[1].y, sharedPoints[4].y)}
          width={Math.abs(sharedPoints[1].x - sharedPoints[4].x)}
          height={sharedPoints[2].y - sharedPoints[1].y}
          fill="#E15728"
        />
        {/* Orange triangle */}
        <path className="orange-triangle" d={trianglePath(sharedPoints)} fill="#F56331" />
        {/* Brown bottom triangle, visually separated */}
        <path className="brown-bottom" d={brownBottomPath()} fill="#BF471E" />
        {/* Primary text centered on orange background */}
        <text
          x="0"
          y="110"
          className="text"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          fontSize="1.25rem"
          fontWeight="500"
        >
          {wrapSvgText(text, 20).map((line, i) => (
            <tspan key={i} x="200" dy={i === 0 ? 0 : 32}>
              {line}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  );
}
