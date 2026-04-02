"use client";

import { motion } from "motion/react";
import {
  Monitor,
  Sparkles,
  Server,
  Database,
  Cloud,
  Activity,
  TestTube,
  Wrench,
  Brain,
  Zap,
  type LucideIcon,
} from "lucide-react";
import useInView from "@/lib/hooks/useInView";
import { SkillTag } from "@/components/ui/SkillTag";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SKILL_GROUPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Sparkles,
  Server,
  Database,
  Cloud,
  Activity,
  TestTube,
  Wrench,
  Brain,
  Zap,
};

export function Skills() {
  const { ref, inView } = useInView(0.08);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 lg:py-36 bg-surface section-divider dot-grid"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl glass">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-status-error" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="w-2.5 h-2.5 rounded-full bg-status-success" />
            </div>
            <span className="font-mono text-[0.82rem] text-accent">
              &gt; skills --list --all
            </span>
          </div>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_GROUPS.map((group, i) => {
            const Icon = iconMap[group.icon];
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, scale: 0.93, y: 25 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.055 }}
                className={cn(
                  "p-5 rounded-xl glass transition-all duration-300 hover:-translate-y-0.5 group",
                  group.span,
                  group.badge && "border-status-warning/15 shadow-glow-warning"
                )}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-accent-dim transition-all duration-300">
                      <Icon
                        size={14}
                        strokeWidth={1.5}
                        className="text-accent"
                      />
                    </div>
                    <span className="font-display text-[0.88rem] font-semibold text-content">
                      {group.title}
                    </span>
                  </div>
                  {group.badge && (
                    <StatusBadge
                      label={group.badge}
                      color="warning"
                      pulse={true}
                    />
                  )}
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const name =
                      typeof skill === "string" ? skill : skill.name;
                    const learning =
                      typeof skill === "string" ? false : skill.learning;
                    return (
                      <SkillTag
                        key={name}
                        name={name}
                        learning={learning}
                      />
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}