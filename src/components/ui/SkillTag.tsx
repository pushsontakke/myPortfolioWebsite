// Tech/skill pill badge with optional "learning" state

import { cn } from "@/lib/utils";

interface SkillTagProps {
  name: string;
  learning?: boolean;
  className?: string;
}

export function SkillTag({ name, learning, className }: SkillTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full font-mono text-tag transition-all duration-300 hover:-translate-y-0.5 cursor-default",
        learning
          ? "bg-surface-card/40 border border-surface-elevated/40 text-content-muted italic"
          : "bg-surface-card border border-surface-elevated text-content-secondary",
        className
      )}
    >
      {name}
      {learning && (
        <span className="ml-1.5 opacity-50 text-tiny">learning</span>
      )}
    </span>
  );
}