"use client";

import { motion } from "motion/react";
import { GraduationCap, Award, ShieldCheck, BookOpen } from "lucide-react";
import useInView from "@/lib/hooks/useInView";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SkillTag } from "@/components/ui/SkillTag";
import { EDUCATION } from "@/lib/constants";

export function Education() {
  const { ref, inView } = useInView(0.12);

  const { degree, certification } = EDUCATION;

  return (
    <section
      id="education"
      ref={ref}
      className="relative py-24 lg:py-36 bg-surface-alt section-divider"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <SectionHeader
            tag="// education & certifications"
            title="Credentials"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ── Degree Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 lg:p-8 rounded-2xl glass flex flex-col justify-between"
            style={{ minHeight: "200px" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-xl bg-accent-dim">
                  <GraduationCap
                    size={22}
                    strokeWidth={1.5}
                    className="text-accent"
                  />
                </div>
                <div>
                  <h3 className="font-display text-[1.2rem] font-semibold text-content">
                    {degree.title}
                  </h3>
                  <p className="text-[0.85rem] text-content-secondary">
                    {degree.institution}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4 text-label text-content-muted border-t border-border-subtle/50">
              <span className="flex items-center gap-1.5">
                <BookOpen size={12} />
                {degree.year}
              </span>
              <span>·</span>
              <span>{degree.location}</span>
            </div>
          </motion.div>

          {/* ── Certification Card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 lg:p-8 rounded-2xl glass"
            style={{
              borderColor: "var(--color-accent-border)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-5">
              <div className="p-3 rounded-xl shrink-0 bg-accent-dim">
                <Award
                  size={22}
                  strokeWidth={1.5}
                  className="text-accent"
                />
              </div>
              <div>
                <h3 className="font-display text-[1.15rem] font-semibold text-content leading-snug">
                  {certification.title}
                </h3>
                <p className="mt-1.5 text-[0.85rem] text-content-secondary">
                  {certification.institution}
                </p>
              </div>
            </div>

            {/* NSDC Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-accent-dim border border-accent-border mb-4">
              <ShieldCheck size={14} className="text-accent" />
              <span className="text-small text-accent tracking-wide">
                {certification.badge}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-5">
              <StatusBadge
                label={certification.status}
                color="accent"
                pulse={true}
              />
            </div>

            {/* Progress bar */}
            <div className="mb-5">
              <div className="flex justify-between mb-2 text-[0.75rem] text-content-secondary">
                <span>{certification.currentModule}</span>
                <span className="font-mono text-accent">
                  {certification.progress}%
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-surface-elevated/60">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={
                    inView
                      ? { width: `${certification.progress}%` }
                      : {}
                  }
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-accent-fill), var(--color-accent-glow))",
                  }}
                />
              </div>

              {/* Module dots */}
              <div className="flex gap-2 mt-3">
                {Array.from({ length: certification.totalModules }).map(
                  (_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-1 rounded-full"
                      style={{
                        background:
                          i < certification.completedModules
                            ? "var(--color-accent-fill)"
                            : i === certification.completedModules
                              ? "linear-gradient(90deg, var(--color-accent-fill), var(--color-accent-dim))"
                              : "var(--color-surface-elevated)",
                      }}
                    />
                  )
                )}
              </div>
            </div>

            {/* Curriculum pills */}
            <div className="flex flex-wrap gap-1.5">
              {certification.curriculum.map((topic) => (
                <SkillTag key={topic} name={topic} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
