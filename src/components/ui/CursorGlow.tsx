"use client";

// Mouse-follow accent glow effect (desktop only)

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -300, y: -300 });
  const current = useRef({ x: -300, y: -300 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    if (!mediaQuery.matches) {
      return;
    }

    const startAnimation = () => {
      if (raf.current !== 0) {
        return;
      }

      raf.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      startAnimation();
    };

    const handleMouseLeave = () => {
      pos.current = { x: -300, y: -300 };
      startAnimation();
    };

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.12;
      current.current.y += (pos.current.y - current.current.y) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`;
      }

      const deltaX = Math.abs(pos.current.x - current.current.x);
      const deltaY = Math.abs(pos.current.y - current.current.y);

      if (deltaX < 0.5 && deltaY < 0.5) {
        raf.current = 0;
        return;
      }

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="cursor-glow pointer-events-none fixed z-50 hidden lg:block will-change-transform"
      style={{
        width: 400,
        height: 400,
        background:
          "radial-gradient(circle, var(--cursor-glow-1) 0%, var(--cursor-glow-2) 30%, transparent 65%)",
      }}
    />
  );
}
