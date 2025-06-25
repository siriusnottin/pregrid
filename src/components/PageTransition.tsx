"use client";
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const PageTransition = forwardRef(function PageTransition(
  { children }: { children: React.ReactNode },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useImperativeHandle(ref, () => ({
    animateExit: () => {
      return new Promise<void>((resolve) => {
        const el = containerRef.current;
        if (!el) return resolve();
        gsap.to(el, {
          opacity: 0,
          y: 40,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: resolve,
        });
      });
    },
  }));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
    return () => {
      gsap.set(el, { opacity: 0, y: 40 });
    };
  }, [pathname]);

  return (
    <div ref={containerRef} style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
});

export default PageTransition;
