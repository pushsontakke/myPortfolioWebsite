"use client";

import { motion } from "motion/react";
import { Lock, ArrowRight, ExternalLink } from "lucide-react";
import useInView from "@/lib/hooks/useInView";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TiltCard } from "@/components/ui/TiltCard";
import { PROJECTS } from "@/lib/constants";

export function Projects() {
  const { ref, inView } = useInView(0.08);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 lg:py-36 bg-surface section-divider dot-grid"
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
            tag="// projects"
            title="What I've built"
            watermark="Work"
          />
        </motion.div>

        {/* Project cards grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => {
            const isWarning = project.statusColor === "warning";
            const glowColor = isWarning
              ? "rgba(249,115,22,0.3)"
              : "rgba(234,179,8,0.3)";
            const borderHover = isWarning
              ? "rgba(249,115,22,0.3)"
              : "rgba(234,179,8,0.3)";

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
              >
                <TiltCard glowColor={glowColor} borderHover={borderHover}>
                  {/* Status badges */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <StatusBadge
                      label={project.status}
                      color={
                        project.statusColor === "accent"
                          ? "accent"
                          : "warning"
                      }
                      pulse={project.statusColor === "warning"}
                    />
                    {project.access.icon === "Lock" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-content-muted/5 border border-content-muted/15 text-tiny text-content-muted">
                        <Lock size={10} />
                        {project.access.label}
                      </span>
                    )}
                    {project.access.icon === null && project.access.label && (
                      <span className="px-3 py-1 rounded-full bg-content-muted/4 text-tiny text-content-muted italic">
                        {project.access.label}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-card-title font-bold text-content tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-content-secondary text-[0.9rem] mb-5">
                    {project.subtitle}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-full font-mono text-tiny text-content-secondary bg-surface-elevated/80 border border-border-subtle transition-all duration-200 hover:-translate-y-px"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Architecture block (Ticketing Platform only) */}
                  {"architecture" in project && project.architecture && (
                    <div className="p-4 rounded-xl bg-surface/80 border border-border-subtle mb-6">
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-status-error" />
                        <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                        <span className="w-2.5 h-2.5 rounded-full bg-status-success" />
                        <span className="ml-2 font-mono text-[0.6rem] text-content-faint">
                          architecture.md
                        </span>
                      </div>
                      {project.architecture.map((line) => (
                        <div
                          key={line.key}
                          className="flex flex-wrap gap-1.5 font-mono text-tiny leading-relaxed"
                        >
                          <span className="text-accent">
                            &gt; {line.key}:
                          </span>
                          <span className="text-content-secondary">
                            {line.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Metrics grid */}
                  {project.metrics.length > 0 && (
                    <div
                      className={`grid gap-3 mb-6 ${
                        project.metrics.length === 4
                          ? "grid-cols-2"
                          : "grid-cols-3"
                      }`}
                    >
                      {project.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="text-center p-2.5 rounded-xl"
                          style={{
                            background: isWarning
                              ? "rgba(249,115,22,0.04)"
                              : "var(--color-accent-dim)",
                            border: isWarning
                              ? "1px solid rgba(249,115,22,0.08)"
                              : "1px solid var(--color-accent-border)",
                          }}
                        >
                          <div className="font-display font-bold text-content text-[0.95rem]">
                            {metric.value}
                          </div>
                          <div className="text-content-muted text-[0.62rem] tracking-wide">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Highlights */}
                  {project.highlights.length > 0 && (
                    <div className="flex flex-col gap-2 mb-6">
                      {project.highlights.map((highlight, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-[0.8rem] text-content-secondary"
                        >
                          <span className="mt-0.5 text-accent text-[0.7rem]">
                            ▸
                          </span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags (Ticketing Platform only) */}
                  {"tags" in project && project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full font-mono text-tiny text-content-secondary bg-surface-elevated/80 border border-border-subtle"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  {project.cta.href ? (
                    <a
                      href={project.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[0.82rem] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 cursor-pointer group border border-accent/40 text-accent bg-accent-dim"
                    >
                      {project.cta.label}
                      <ExternalLink
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </a>
                  ) : (
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-surface text-[0.82rem] font-semibold shadow-glow-accent transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 cursor-pointer group">
                      {project.cta.label}
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </button>
                  )}
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}