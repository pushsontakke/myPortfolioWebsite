"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Calendar,
} from "lucide-react";
import useInView from "@/lib/hooks/useInView";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EXPERIENCES } from "@/lib/constants";

export function Experience() {
  const { ref, inView } = useInView(0.12);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-24 lg:py-36 bg-surface-alt section-divider"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <SectionHeader
            tag="// experience"
            title="Where I've shipped"
            watermark="Exp."
          />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-5 lg:left-8 top-0 bottom-0 w-px"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
            style={{
              background:
                "linear-gradient(to bottom, var(--color-accent-fill), var(--color-accent-border), transparent)",
              transformOrigin: "top",
            }}
          />

          {/* Experience entries */}
          <div className="flex flex-col gap-10">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 + index * 0.2 }}
                className="relative pl-14 lg:pl-24"
              >
                {/* Timeline dot */}
                <div className="absolute left-3 lg:left-6 top-3 w-5 h-5 rounded-full bg-accent-fill flex items-center justify-center shadow-glow-accent">
                  <Briefcase size={9} className="text-accent-contrast" />
                </div>

                {/* Connector line */}
                <div
                  className="absolute left-[2.4rem] lg:left-[3.4rem] top-5 w-4 lg:w-8 h-px"
                  style={{ background: "var(--color-accent-border)" }}
                />

                {/* Card */}
                <div className="p-6 lg:p-8 rounded-2xl glass">
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-display text-[1.35rem] font-bold text-content tracking-tight">
                        {exp.role}
                      </h3>
                      <p className="mt-1 text-accent text-[0.95rem] font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="flex items-center gap-1.5 font-mono text-tag text-content-secondary">
                        <Calendar size={12} strokeWidth={1.5} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-tag text-content-muted">
                        <MapPin size={12} strokeWidth={1.5} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Context tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-0.5 rounded-full bg-accent-dim border border-accent-border text-small text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Summary */}
                  <p className="text-content-secondary text-[0.9rem] leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Expand toggle */}
                  <button
                    onClick={() => toggleExpand(index)}
                    className="mt-5 flex items-center gap-1.5 cursor-pointer text-accent text-[0.82rem] transition-all duration-200 hover:-translate-y-px group"
                  >
                    <span className="group-hover:underline">
                      {expandedIndex === index
                        ? "Show less"
                        : "Key achievements"}
                    </span>
                    {expandedIndex === index ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>

                  {/* Expandable achievements */}
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 pt-5 flex flex-col gap-2.5 border-t border-border-subtle">
                          {exp.achievements.map((item, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-start gap-2.5 text-[0.85rem] text-content-secondary"
                            >
                              <span className="mt-1 text-accent text-[0.7rem]">
                                ▸
                              </span>
                              <span>{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
