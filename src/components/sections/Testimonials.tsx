"use client";

import { motion } from "motion/react";
import { Quote, ExternalLink, MessageSquare } from "lucide-react";
import useInView from "@/lib/hooks/useInView";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE } from "@/lib/constants";

export function Testimonials() {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-24 lg:py-32 bg-surface section-divider"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeader
            tag="// testimonials"
            title="What people say"
            watermark="Testimonials"
          />
        </motion.div>

        {/* Skeleton cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="p-6 rounded-2xl relative overflow-hidden glass"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute inset-0 animate-shimmer"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 30%, var(--color-accent-dim) 50%, transparent 70%)",
                    animationDelay: `${i * 0.8}s`,
                  }}
                />
              </div>

              <div className="relative z-10">
                <Quote
                  size={22}
                  className="mb-5"
                  style={{ color: "var(--color-accent-border)" }}
                />

                {/* Skeleton text lines */}
                <div className="mb-6 space-y-2.5">
                  <div
                    className="h-2 rounded-full bg-surface-elevated/80"
                    style={{ width: "100%" }}
                  />
                  <div
                    className="h-2 rounded-full bg-surface-elevated/60"
                    style={{ width: "85%" }}
                  />
                  <div
                    className="h-2 rounded-full bg-surface-elevated/40"
                    style={{ width: "65%" }}
                  />
                </div>

                {/* Skeleton avatar */}
                <div className="flex items-center gap-3 pt-4 border-t border-border-subtle/40">
                  <div className="w-9 h-9 rounded-full bg-surface-elevated/60" />
                  <div>
                    <div
                      className="h-2 rounded-full bg-surface-elevated/70 mb-1.5"
                      style={{ width: "80px" }}
                    />
                    <div
                      className="h-2 rounded-full bg-surface-elevated/40"
                      style={{ width: "55px" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Message + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare size={16} className="text-content-muted" />
            <p className="text-content-secondary text-[0.92rem] italic">
              More on the way. Let&apos;s build something worth talking about.
            </p>
          </div>
          <a
            href={SITE.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-subtle text-content-secondary text-[0.82rem] bg-surface-card/30 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 cursor-pointer"
          >
            Leave a recommendation
            <ExternalLink
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}