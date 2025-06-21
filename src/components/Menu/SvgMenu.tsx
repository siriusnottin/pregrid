import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const DEBUG_MODE = process.env.NODE_ENV === 'development';

const evenementsPathData = "m250 30 l330 130 l100 90 c50 0 100 0 280 250 l120 50 l230 50";
const circlePathData = "M540 497 a127 127 0 1 1 254 0 a127 127 0 1 1 -254 0 Z";

const menuItems = [
  { 
    id: "galerie", 
    path: "M0 0 l526 192 l142 328 l-668 201 Z", 
    label: "GALERIE",
    color: "#C73D29",
    hoverColor: "#D84A2B",
    textColor: "#FF851B",
    textPosition: { x: 150, y: 350 },
    textRotation: -55
  },
  { 
    id: "evenements", 
    path: "M0 0 h701 l350 358 l390 255 v412 l-288 -386 l-487 -121 l-139 -321 l-255 -98 Z", 
    label: "EVENEMENTS",
    color: "#49A5AA",
    hoverColor: "#5BB7B2",
    textColor: "#EC9237",
    textPosition: { x: 650, y: 300 },
    textRotation: -90
  },
  { 
    id: "histoire", 
    path: "M1440 612 l-389 -255 l-350 -358 h739 Z", 
    label: "HISTOIRE",
    color: "#EFC66B",
    hoverColor: "#F9D76B",
    textColor: "#39CCCC",
    textPosition: { x: 1150, y: 180 },
    textRotation: 26
  },
  { 
    id: "quizz", 
    path: "M0 721 l666 -203 l487 121 l-785 196 l373 190 h-740 Z", 
    label: "QUIZZ",
    color: "#EC9237",
    hoverColor: "#FCA04A",
    textColor: "#111111",
    textPosition: { x: 150, y: 850 },
    textRotation: 0
  },
  { 
    id: "tickets", 
    path: "M363 834 l789 -195 l288 386 h-702 l-375 -192 Z", 
    label: "TICKETS",
    color: "#85144B",
    hoverColor: "#A61D3D",
    textColor: "#EC9237",
    textPosition: { x: 900, y: 850 },
    textRotation: 0
  },
];

interface SvgMenuProps {
  onSelect?: (id: string) => void;
}

export default function SvgMenu({ onSelect }: SvgMenuProps) {
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);
  const centerCircleRef = useRef<SVGCircleElement>(null);
  const textRefs = useRef<(SVGTextElement | null)[]>([]);
  const circleTextAnimationRef = useRef<GSAPTimeline | null>(null);

  const handleMenuSelect = (id: string) => {
    // Call the optional onSelect callback if provided
    if (onSelect) {
      onSelect(id);
    }
  };

  useEffect(() => {
    // Animate paths
    gsap.fromTo(
      pathsRef.current,
      { 
        opacity: 0, 
        scale: 0.5, 
        rotation: -180,
        transformOrigin: "center center" 
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "back.out(1.7)",
      }
    );

    // Animate center circle
    gsap.fromTo(
      centerCircleRef.current,
      { 
        opacity: 0, 
        scale: 0, 
        rotation: 360,
        transformOrigin: "center center" 
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
        delay: menuItems.length * 0.2,
      }
    );
  }, []);

  const handleMouseEnter = (index: number) => {
    // Animate path with subtle scale effect only
    gsap.to(pathsRef.current[index], {
      scale: 1.05,
      duration: 0.4,
      ease: "power2.out",
      transformOrigin: "center center",
    });

    // Animate text with appropriate effect based on type
    const item = menuItems[index];
    if (item.id === 'evenements') {
      // For path text, just apply a subtle transform
      gsap.to(textRefs.current[index], {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      // Normal text animation
      gsap.to(textRefs.current[index], {
        scale: 1.15,
        rotation: "+=5",
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    // Reset path
    gsap.to(pathsRef.current[index], {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      transformOrigin: "center center",
    });

    // Reset text with appropriate effect based on type
    const item = menuItems[index];
    if (item.id === 'evenements') {
      // Reset path text
      gsap.to(textRefs.current[index], {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      // Reset normal text
      gsap.to(textRefs.current[index], {
        scale: 1,
        rotation: menuItems[index].textRotation,
        duration: 0.4,
        ease: "back.out(1.7)",
      });
    }
  };

  return (
    <svg
      width="100vw"
      height="100vh"
      viewBox="0 0 1440 1024"
      preserveAspectRatio="xMidYMid slice"
      role="menu"
      aria-label="Main navigation menu"
      style={{ 
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      {/* Background */}
      <rect width="1440" height="1024" fill="#FF851B" />

        <defs>
          <path 
            id="evenementsPath" 
            d={evenementsPathData}
          />
          <path
            id="circlePath"
            d={circlePathData}
          />
        </defs>

        {menuItems.map(({ id, path, label, color, textColor, textPosition, textRotation}, i) => (
          <g key={id}>
            <path
              d={path}
              fill={color}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              onClick={() => handleMenuSelect(id)}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleMenuSelect(id)}
              aria-label={label}
              ref={(el) => { pathsRef.current[i] = el; }}
            />
            {id === 'evenements' ? (
              <text
                ref={(el) => { textRefs.current[i] = el; }}
                fill={textColor}
                fontWeight="400"
                fontSize="4rem"
                textAnchor="start"
                dominantBaseline="middle"
                pointerEvents="none"
                style={{ 
                  userSelect: "none", 
                  fontFamily: "var(--font-cubik), 'Cubik', monospace",
                  letterSpacing: "3rem",
                  textTransform: "uppercase",
                }}
              >
                <textPath href="#evenementsPath" startOffset="15%">
                  {label}
                </textPath>
              </text>
            ) : (
              <text
                ref={(el) => { textRefs.current[i] = el; }}
                x={textPosition.x}
                y={textPosition.y}
                fill={textColor}
                fontWeight="400"
                fontSize="3rem"
                textAnchor="middle"
                dominantBaseline="middle"
                pointerEvents="none"
                transform={`rotate(${textRotation} ${textPosition.x} ${textPosition.y})`}
                style={{ 
                  userSelect: "none", 
                  fontFamily: "var(--font-cubik), 'Cubik', monospace",
                  letterSpacing: ".25rem",
                  textTransform: "uppercase"
                }}
              >
                {label}
              </text>
            )}
          </g>
        ))}
      
      {/* Visualize the EVENEMENTS text path for editing */}
      {DEBUG_MODE && (
        <path
          d={evenementsPathData}
          fill="none"
          stroke="#222"
          strokeDasharray="8 8"
          strokeWidth={2}
          opacity={0.4}
          pointerEvents="none"
        />
      )}
      
      {/* Visualize and create hit area for circle path */}
      <circle
        cx="667"
        cy="497"
        r="150"
        fill="transparent"
        pointerEvents="all"
      />

        {/* Center HOME circle */}
        <circle
          ref={centerCircleRef}
          cx="667"
          cy="497"
          r="137"
          fill="#000000"
          style={{ cursor: "pointer" }}
          onClick={() => handleMenuSelect("home")}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleMenuSelect("home")}
          aria-label="HOME"
          onMouseEnter={() => {
            gsap.to(centerCircleRef.current, {
              scale: 1.1,
              duration: 0.3,
              ease: "power2.out",
              transformOrigin: "center center"
            });
          }}
          onMouseLeave={() => {
            gsap.to(centerCircleRef.current, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
              transformOrigin: "center center"
            });
          }}
        />
        <text
          x="667"
          y="497"
          fill="#FF6B35"
          fontWeight="400"
          fontSize="2.75rem"
          textAnchor="middle"
          dominantBaseline="middle"
          pointerEvents="none"
          style={{ 
            userSelect: "none",
            fontFamily: "var(--font-cubik), 'Cubik', monospace",
            letterSpacing: "6px",
            textTransform: "uppercase"
          }}
        >
          HOME
        </text>
      <text
        fill="#FFFFFF"
        fontWeight="400"
        fontSize="2.75rem"
        textAnchor="start"
        dominantBaseline="hanging"
        pointerEvents="none"
        style={{
          userSelect: "none",
          fontFamily: "var(--font-cubik), 'Cubik', monospace",
          letterSpacing: "1.24em",
          textTransform: "uppercase",
        }}
      >
        <textPath
          href="#circlePath"
          startOffset="5%"
          id="circlePath1"
        >
          HOME
        </textPath>
        <textPath
          href="#circlePath"
          startOffset="55%"
          id="circlePath2"
        >
          HOME
        </textPath>
      </text>
    </svg>
  );
}
