// The // section-name label + heading + optional background watermark text

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  tag: string;
  title: React.ReactNode;
  watermark?: string;
  className?: string;
}

export function SectionHeader({
  tag,
  title,
  watermark,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("relative isolate", className)}>
      {/* Background watermark */}
      {watermark && (
        <div
          aria-hidden="true"
          className="absolute -top-8 left-0 z-0 pointer-events-none select-none font-display font-extrabold leading-none tracking-tighter"
          style={{
            fontSize: "clamp(5rem, 14vw, 13rem)",
            color: "var(--color-watermark)",
            opacity: 0.5,
            WebkitTextStroke: "1px var(--color-watermark-stroke)",
            textShadow: "0 10px 24px var(--color-watermark-shadow)",
          }}
        >
          {watermark}
        </div>
      )}

      <div className="relative z-10">
        {/* Tag */}
        <span className="font-mono text-label text-accent tracking-wide">
          {tag}
        </span>

        {/* Title */}
        <h2 className="mt-3 font-display font-bold text-content tracking-tight text-section-title">
          {title}
        </h2>
      </div>
    </div>
  );
}
