'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Color constants
const COLORS = {
  BLUE: '#377AA5',
  ORANGE: '#F25832',
  YELLOW: '#F7C80C',
  BLACK: '#000000'
} as const;

// SVG constants
const SVG_CONFIG = {
  VIEW_BOX: '0 0 100 100',
  STROKE_WIDTH: 0.2,
  TEXT: {
    TITLE_SIZE: 4.8,
    NORMAL_SIZE: 3.6,
    DESCRIPTION_SIZE: 2.4
  }
} as const;

export interface EventCard {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  description: string;
  btnText?: string;
  className?: string;
}

export default function EventCard({ event }: { event: EventCard }) {
  const gridSpan = event.id % 2 === 0 ? '6 / 11' : '2 / 7';

  // GSAP refs
  const svgRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const infoRef = useRef(null);
  const typeRef = useRef(null);
  const buttonRef = useRef(null);
  // New refs for SVG shapes
  const blueRectRef = useRef(null);
  const orangeRectRef = useRef(null);
  const yellowHalfCircleRef = useRef(null);
  const circleRef = useRef(null);
  const decoPath1Ref = useRef(null);
  const decoPath2Ref = useRef(null);
  // New refs for outlines
  const borderRect1Ref = useRef(null);
  const borderRect2Ref = useRef(null);

  // Hover animation handlers
  useEffect(() => {
    if (!svgRef.current) return;
    // Card hover
    const handleCardEnter = () => {
      gsap.to(blueRectRef.current, { scale: 1.12, rotate: 6, skewX: 6, transformOrigin: 'center', duration: 0.5, ease: 'power3.out' });
      gsap.to(orangeRectRef.current, { scale: 1.09, x: 24, y: -18, skewY: -8, transformOrigin: 'center', duration: 0.5, ease: 'power3.out' });
      gsap.to(yellowHalfCircleRef.current, { y: -28, scale: 1.08, rotate: -8, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      gsap.to(circleRef.current, { scale: 1.18, x: 22, y: 18, rotate: 10, transformOrigin: '50% 50%', duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    };
    const handleCardLeave = () => {
      gsap.to(blueRectRef.current, { scale: 1, rotate: 0, skewX: 0, duration: 0.5, ease: 'power3.out' });
      gsap.to(orangeRectRef.current, { scale: 1, x: 0, y: 0, skewY: 0, duration: 0.5, ease: 'power3.out' });
      gsap.to(yellowHalfCircleRef.current, { y: 0, scale: 1, rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      gsap.to(circleRef.current, { scale: 1, x: 0, y: 0, rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    };
    const svgNode = svgRef.current;
    svgNode.addEventListener('mouseenter', handleCardEnter);
    svgNode.addEventListener('mouseleave', handleCardLeave);
    // Button hover
    const buttonNode = buttonRef.current as Element | null;
    const handleButtonEnter = () => {
      gsap.to(buttonNode, { scale: 1.18, filter: 'drop-shadow(0 8px 32px #F7C80Ccc)', backgroundColor: '#fffbe6', transformOrigin: '50% 50%', duration: 0.35, ease: 'elastic.out(1, 0.5)' });
    };
    const handleButtonLeave = () => {
      gsap.to(buttonNode, { scale: 1, filter: 'none', backgroundColor: 'transparent', duration: 0.35, ease: 'power2.out' });
    };
    if (buttonNode) {
      buttonNode.addEventListener('mouseenter', handleButtonEnter);
      buttonNode.addEventListener('mouseleave', handleButtonLeave);
    }
    return () => {
      svgNode.removeEventListener('mouseenter', handleCardEnter);
      svgNode.removeEventListener('mouseleave', handleCardLeave);
      if (buttonNode) {
        buttonNode.removeEventListener('mouseenter', handleButtonEnter);
        buttonNode.removeEventListener('mouseleave', handleButtonLeave);
      }
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    let hasAnimated = false;
    let observer: IntersectionObserver | null = null;
    const playAnimation = () => {
      if (hasAnimated) return;
      hasAnimated = true;
      const tl = gsap.timeline();
      tl.set(svgRef.current, { opacity: 1 });
      // Animate SVG shapes first
      tl.from(blueRectRef.current, { scale: 0.7, opacity: 0, transformOrigin: 'center', duration: 0.5, ease: 'power2.out' })
        .from(orangeRectRef.current, { scale: 0.7, opacity: 0, transformOrigin: 'center', duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from(yellowHalfCircleRef.current, { y: -60, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from(circleRef.current, { scale: 0, opacity: 0, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(1.7)' }, '-=0.3')
        .from([decoPath1Ref.current, decoPath2Ref.current], { opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.3')
        // Animate content
        .from(descRef.current, { y: 40, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.2')
        .from(infoRef.current, { y: 40, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .from(typeRef.current, { x: -40, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from(titleRef.current, { scale: 0.7, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.3')
        .from(buttonRef.current, { scale: 0.7, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.4')
        // Animate outlines last
        .from(borderRect1Ref.current, { opacity: 0, scale: 0.95, transformOrigin: 'center', duration: 0.4, ease: 'power2.out' }, '+=0.1')
        .from(borderRect2Ref.current, { opacity: 0, scale: 0.95, transformOrigin: 'center', duration: 0.4, ease: 'power2.out' }, '-=0.2');
    };
    observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playAnimation();
            if (observer) observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(svgRef.current);
    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const handleClick = () => {
    // Add click handling logic here
    console.log('Clicked:', event.btnText);
  };

  return (
    <svg
      ref={svgRef}
      style={{ gridColumn: gridSpan, opacity: 0 }}
      width="100%"
      height="100%"
      viewBox="0 0 679 781"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue rectangle with description - placed first to be in background */}
      <rect ref={blueRectRef} x="272.191" y="273.378" width="405.944" height="405.944" fill={COLORS.BLUE} />
      <foreignObject x="292.191" y="273.378" width="365.944" height="385.944">
        <div
          ref={descRef}
          style={{
            fontFamily: 'Helvetica Neue',
            color: '#FFFFFF',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '2.5rem 3rem',
          }}
        >
          <p
            style={{
              fontSize: '0.875rem',
              lineHeight: '1.3',
              maxWidth: '85%',
              marginBottom: '2rem',
              fontWeight: '300',
            }}
          >
            {event.description}
          </p>
        </div>
      </foreignObject>

      {/* Orange rectangle with event info */}
      <rect ref={orangeRectRef} x="68.8125" y="68.8125" width="405.758" height="406.944" fill={COLORS.ORANGE} />
      <foreignObject x="270.8125" y="270.8125" width="135.758" height="136.944">
        <div
          ref={infoRef}
          style={{
            fontFamily: 'Helvetica Neue',
            color: COLORS.BLACK,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto auto',
              gap: '0.5rem',
              justifyContent: 'start',
              alignItems: 'baseline',
            }}
          >
            <p
              style={{
                fontSize: '1.25rem',
                fontWeight: '500',
                lineHeight: '1.2',
                textAlign: 'center',
              }}
            >
              {event.date}, <br /> {event.time}
            </p>
          </div>
        </div>
      </foreignObject>

      {/* Event type in bottom of orange rectangle */}
      <foreignObject x="70.8125" y="400" width="365.758" height="75">
        <div
          ref={typeRef}
          style={{
            fontFamily: 'Helvetica Neue',
            color: COLORS.BLACK,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '2.5rem',
          }}
        >
          <p
            style={{
              fontSize: '2rem',
              fontWeight: '200',
              letterSpacing: '0.01em',
            }}
          >
            {event.type}
          </p>
        </div>
      </foreignObject>

      {/* Title in yellow half-circle */}
      <path
        ref={yellowHalfCircleRef}
        d="M406.944 0C406.944 112.375 315.847 203.472 203.472 203.472C91.0976 203.472 0 112.375 0 0C110.931 0.000144784 91.0976 0.000108621 203.472 0.000108621C315.847 0.000108621 359.487 0 406.944 0Z"
        fill={COLORS.YELLOW}
      />
      <foreignObject x="0" y="20" width="406.944" height="100">
        <div
          ref={titleRef}
          style={{
            fontFamily: 'Helvetica Neue',
            color: COLORS.BLACK,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '1rem',
          }}
        >
          <h2
            style={{
              fontSize: '2rem',
              maxWidth: '90%',
              margin: '0 auto',
              fontWeight: '400',
              lineHeight: '1.1',
            }}
          >
            {event.title}
          </h2>
        </div>
      </foreignObject>

      {/* Decorative elements */}
      <circle ref={circleRef} cx="608.187" cy="101.95" r="69.8084" fill={COLORS.BLUE} />

      {/* Border elements */}
      <rect
        ref={borderRect1Ref}
        x="0.5"
        y="0.5"
        width="405.944"
        height="405.944"
        stroke={COLORS.BLACK}
        strokeWidth={SVG_CONFIG.STROKE_WIDTH}
      />
      <rect
        ref={borderRect2Ref}
        x="272.191"
        y="273.378"
        width="405.944"
        height="405.944"
        stroke={COLORS.BLACK}
        strokeWidth={SVG_CONFIG.STROKE_WIDTH}
      />

      {/* Additional decorative paths */}
      <path
        ref={decoPath1Ref}
        d="M511.357 169.75C511.357 76.4389 585.969 0.775766 678.099 0.502922L678.099 338.997C585.969 338.724 511.357 263.061 511.357 169.75Z"
        stroke={COLORS.BLACK}
        strokeWidth={SVG_CONFIG.STROKE_WIDTH}
      />
      <path
        ref={decoPath2Ref}
        d="M614.213 203.901C646.247 203.901 621.333 203.901 677.689 203.901C677.689 278.271 677.689 272.121 677.689 338.561C603.318 338.561 543.029 278.271 543.029 203.901C573.876 203.901 539.843 203.901 614.213 203.901Z"
        fill={COLORS.YELLOW}
      />

      {/* Button ellipse with text */}
      <g onClick={handleClick} style={{ cursor: 'pointer' }} ref={buttonRef}>
        <ellipse cx="575.542" cy="677.493" rx="102.453" ry="102.955" fill={COLORS.YELLOW} />
        <foreignObject x="473.089" y="574.538" width="204.906" height="205.91">
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontFamily: 'Helvetica Neue',
              color: COLORS.BLACK,
              padding: '1rem',
            }}
          >
            <p
              style={{
                fontSize: '1.5rem',
                fontWeight: '500',
                lineHeight: '1.2',
              }}
            >
              {event.btnText || "Je m'inscris"}
            </p>
          </div>
        </foreignObject>
      </g>
    </svg>
  );
}
