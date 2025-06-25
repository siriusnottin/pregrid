"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
    );
    return () => {
      gsap.set(el, { opacity: 0, y: 40 });
    };
  }, [pathname]);

  return (
    <div ref={containerRef} style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
