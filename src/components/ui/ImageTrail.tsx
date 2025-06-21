'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './ImageTrail.module.css';

interface MousePosition {
  x: number;
  y: number;
}

interface ImageRef {
  element: HTMLImageElement;
  rect: DOMRect;
  isActive: () => boolean;
}

interface ImageTrailProps {
  images: string[];
  threshold?: number;
  className?: string;
}

// Helper functions
const MathUtils = {
  lerp: (a: number, b: number, n: number) => (1 - n) * a + n * b,
  distance: (x1: number, y1: number, x2: number, y2: number) => Math.hypot(x2 - x1, y2 - y1)
};

const ImageTrail: React.FC<ImageTrailProps> = ({ 
  images, 
  threshold = 100, 
  className = '' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<ImageRef[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  
  // Mouse position states
  const mousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const cacheMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  
  // Animation states
  const imgPosition = useRef(0);
  const zIndexVal = useRef(1);
  
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  const preloadImages = useCallback(() => {
    let loaded = 0;
    
    images.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === images.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.warn(`Failed to load image: ${src}`);
        loaded++;
        if (loaded === images.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, [images]);

  // Get mouse position
  const getMousePos = useCallback((ev: MouseEvent): MousePosition => {
    return {
      x: ev.pageX,
      y: ev.pageY
    };
  }, []);

  // Get distance between current and last mouse position
  const getMouseDistance = useCallback(() => {
    return MathUtils.distance(
      mousePos.current.x,
      mousePos.current.y,
      lastMousePos.current.x,
      lastMousePos.current.y
    );
  }, []);

  // Update image rect on resize
  const updateImageRects = useCallback(() => {
    imageRefs.current.forEach(imgRef => {
      if (imgRef.element) {
        imgRef.rect = imgRef.element.getBoundingClientRect();
        // Reset styles
        gsap.set(imgRef.element, {
          scale: 1,
          x: 0,
          y: 0,
          opacity: 0
        });
      }
    });
  }, []);

  // Show next image in trail
  const showNextImage = useCallback(() => {
    const imgRef = imageRefs.current[imgPosition.current];
    if (!imgRef?.element) return;

    const img = imgRef.element;
    
    // Kill any existing tweens
    gsap.killTweensOf(img);

    // Create timeline for image animation
    const tl = gsap.timeline();
    
    tl
      // Show the image at cached mouse position
      .set(img, {
        opacity: 1,
        scale: 1,
        zIndex: zIndexVal.current,
        x: cacheMousePos.current.x - imgRef.rect.width / 2,
        y: cacheMousePos.current.y - imgRef.rect.height / 2
      })
      // Animate to current mouse position
      .to(img, {
        duration: 0.9,
        ease: "expo.out",
        x: mousePos.current.x - imgRef.rect.width / 2,
        y: mousePos.current.y - imgRef.rect.height / 2
      }, 0)
      // Fade out
      .to(img, {
        duration: 1,
        ease: "power1.out",
        opacity: 0
      }, 0.4)
      // Scale down
      .to(img, {
        duration: 1,
        ease: "quint.out",
        scale: 0.2
      }, 0.4);
  }, []);

  // Main render loop
  const render = useCallback(() => {
    const distance = getMouseDistance();
    
    // Smooth cache mouse position
    cacheMousePos.current.x = MathUtils.lerp(
      cacheMousePos.current.x || mousePos.current.x,
      mousePos.current.x,
      0.1
    );
    cacheMousePos.current.y = MathUtils.lerp(
      cacheMousePos.current.y || mousePos.current.y,
      mousePos.current.y,
      0.1
    );

    // Show next image if mouse moved enough
    if (distance > threshold) {
      showNextImage();
      
      zIndexVal.current++;
      imgPosition.current = imgPosition.current < images.length - 1 ? imgPosition.current + 1 : 0;
      lastMousePos.current = { ...mousePos.current };
    }

    // Check if all images are inactive
    let isIdle = true;
    for (const imgRef of imageRefs.current) {
      if (imgRef.isActive()) {
        isIdle = false;
        break;
      }
    }

    // Reset z-index when idle
    if (isIdle && zIndexVal.current !== 1) {
      zIndexVal.current = 1;
    }

    animationFrameRef.current = requestAnimationFrame(render);
  }, [getMouseDistance, showNextImage, threshold, images.length]);

  // Handle mouse move
  const handleMouseMove = useCallback((ev: MouseEvent) => {
    mousePos.current = getMousePos(ev);
  }, [getMousePos]);

  // Handle window resize
  const handleResize = useCallback(() => {
    updateImageRects();
  }, [updateImageRects]);

  // Initialize image refs and preload images
  useEffect(() => {
    // Start preloading images
    preloadImages();
  }, [preloadImages]);

  // Initialize image refs after images are loaded
  useEffect(() => {
    if (!containerRef.current || !imagesLoaded) return;

    const imgElements = containerRef.current.querySelectorAll('img');
    imageRefs.current = Array.from(imgElements).map(img => ({
      element: img as HTMLImageElement,
      rect: img.getBoundingClientRect(),
      isActive: () => {
        return gsap.isTweening(img) || (img as HTMLElement).style.opacity !== '0';
      }
    }));

    // Set initial styles
    updateImageRects();
  }, [imagesLoaded, images, updateImageRects]);

  // Start animation loop and event listeners
  useEffect(() => {
    if (!imagesLoaded) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Initialize mouse position
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    lastMousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    cacheMousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    // Start render loop
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [imagesLoaded, handleMouseMove, handleResize, render]);

  return (
    <div ref={containerRef} className={`${styles.imageTrail} ${className}`}>
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Trail image ${index + 1}`}
          className={styles.trailImage}
          style={{ display: imagesLoaded ? 'block' : 'none' }}
        />
      ))}
    </div>
  );
};

export default ImageTrail;
