"use client";

import { motion } from "motion/react";
import { Zap, Code, Layers, type LucideIcon } from "lucide-react";
import useInView from "@/lib/hooks/useInView";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ABOUT_SIGNALS, ABOUT_PARAGRAPHS } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Code,
  Layers,
};

export function About() {
  const { ref, inView } = useInView(0.12);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 lg:py-36 overflow-hidden bg-surface-alt section-divider"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[0.42fr_0.58fr] gap-12 lg:gap-20 items-start">
          {/* ── Left Column ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <SectionHeader
                tag="// about me"
                title={
                  <>
                    I don&apos;t just
                    <br />
                    write code.
                    <br />
                    <span className="text-accent">I own products.</span>
                  </>
                }
                watermark="About"
              />
            </motion.div>

            {/* Signal chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-col gap-3"
            >
              {ABOUT_SIGNALS.map(({ icon, label, desc }, i) => {
                const Icon = iconMap[icon];
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl glass transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="p-2 rounded-lg bg-accent-dim">
                      <Icon
                        size={14}
                        strokeWidth={1.5}
                        className="text-accent"
                      />
                    </div>
                    <div>
                      <div className="text-[0.82rem] text-content font-medium">
                        {label}
                      </div>
                      <div className="text-small text-content-muted">
                        {desc}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* ── Right Column — Paragraphs ── */}
          <div className="flex flex-col gap-6">
            {ABOUT_PARAGRAPHS.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 + i * 0.15 }}
                className="text-content-secondary text-[0.95rem] leading-relaxed"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}