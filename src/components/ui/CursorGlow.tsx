"use client";

// Mouse-follow accent glow effect (desktop only)

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -300, y: -300 });
  const current = useRef({ x: -300, y: -300 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.12;
      current.current.y += (pos.current.y - current.current.y) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
