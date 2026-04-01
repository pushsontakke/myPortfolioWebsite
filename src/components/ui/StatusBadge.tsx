// Colored dot + text label (e.g., green "Available", amber "In Progress")

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  label: string;
  color: "success" | "warning" | "accent";
  pulse?: boolean;
  className?: string;
}

const colorMap = {
  success: {
    dot: "bg-status-success",
    text: "text-status-success",
    bg: "bg-status-success/[0.08]",
    border: "border-status-success/25",
  },
  warning: {
    dot: "bg-status-warning",
    text: "text-status-warning",
    bg: "bg-status-warning/[0.08]",
    border: "border-status-warning/25",
  },
  accent: {
    dot: "bg-accent",
    text: "text-accent",
    bg: "bg-accent-dim",
    border: "border-accent-border",
  },
};

export function StatusBadge({
  label,
  color,
  pulse = true,
  className,
}: StatusBadgeProps) {
  const colors = colorMap[color];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-tiny",
        colors.bg,
        colors.border,
        colors.text,
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulse && (
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              colors.dot
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex rounded-full h-1.5 w-1.5",
            colors.dot
          )}
        />
      </span>
      {label}
    </span>
  );
}