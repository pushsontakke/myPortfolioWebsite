"use client";

// 3D tilt effect with mouse-follow glow on hover

import { useState, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  glowColor?: string;
  borderHover?: string;
  className?: string;
}

export function TiltCard({
  children,
  glowColor = "rgba(234,179,8,0.3)",
  borderHover = "rgba(234,179,8,0.3)",
  className,
}: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      const gx = ((e.clientX - rect.left) / rect.width) * 100;
      const gy = ((e.clientY - rect.top) / rect.height) * 100;
      setTilt({ x, y });
      setGlowPos({ x: gx, y: gy });
    },
    []
  );

  return (
    <div
      className={className}
      style={{
        borderRadius: "1rem",
        padding: "1px",
        background: hovering
          ? `linear-gradient(135deg, ${borderHover}, transparent 60%)`
          : "var(--color-border-subtle)",
        transition: "background 0.3s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setHovering(false);
      }}
    >
      <div
        className="rounded-2xl p-6 lg:p-8 relative overflow-hidden bg-surface-alt"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* Mouse-follow inner glow */}
        {hovering && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 70%)`,
              opacity: 0.15,
            }}
          />
        )}

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}