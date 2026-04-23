"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Rocket,
  Brain,
  Globe,
  LayoutDashboard,
  Gauge,
  ArrowRight,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import useInView from "@/lib/hooks/useInView";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  Brain,
  Globe,
  LayoutDashboard,
  Gauge,
};

function ServiceCard({
  service,
  index,
  inView,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  inView: boolean;
}) {
  const Icon = iconMap[service.icon];
  const [hovered, setHovered] = useState(false);
  const isLast = index === SERVICES.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
      className={cn(
        "relative rounded-xl transition-all duration-300",
        !service.active && isLast && "md:col-span-2"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gradient border on hover */}
      {service.active && (
        <div
          className="absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent-glow), transparent 60%)",
            opacity: hovered ? 1 : 0,
          }}
        />
      )}

      <div
        className={cn(
          "relative p-6 rounded-xl transition-all duration-300",
          service.active
            ? "bg-surface-alt/95 border border-border-subtle"
            : "bg-surface-alt/60 border border-border-subtle/50"
        )}
        style={{
          transform:
            hovered && service.active ? "translateY(-2px)" : "translateY(0)",
          boxShadow:
            hovered && service.active
              ? "var(--shadow-card-hover)"
              : "none",
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "p-3 rounded-xl shrink-0 transition-all duration-300",
              service.active
                ? hovered
                  ? "bg-accent-fill/15"
                  : "bg-accent-dim"
                : "bg-surface-elevated/40"
            )}
          >
            {Icon && (
              <Icon
                size={22}
                strokeWidth={1.5}
                className={
                  service.active ? "text-accent" : "text-content-faint"
                }
              />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <h3
                className={cn(
                  "font-display text-[1.08rem] font-semibold",
                  service.active ? "text-content" : "text-content-faint"
                )}
              >
                {service.title}
              </h3>
              {"badge" in service && service.badge && (
                <span className="px-2.5 py-0.5 rounded-full bg-content-muted/6 border border-content-muted/10 text-tiny text-content-faint italic">
                  {service.badge}
                </span>
              )}
            </div>
            <p
              className={cn(
                "text-[0.88rem] leading-relaxed",
                service.active
                  ? "text-content-secondary"
                  : "text-content-faint"
              )}
            >
              {service.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 lg:py-36 bg-surface-alt section-divider"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <SectionHeader
            tag="// services"
            title="I help early-stage startups go from idea to live, scalable product — without hiring a full engineering team."
            watermark="SerV's"
          />
          <p className="mt-3 text-accent font-display text-[1.05rem] font-semibold tracking-wide">
            Founding-Engineer-as-a-Service
          </p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            href={SITE.business.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 flex max-w-xl items-start gap-3 rounded-2xl border border-border-subtle bg-surface-card/70 px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-border hover:bg-surface-card"
          >
            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent-fill shadow-glow-accent" />
            <div className="min-w-0">
              <p className="text-[0.84rem] font-semibold text-content">
                Building {SITE.business.name}
              </p>
              <p className="mt-1 text-[0.83rem] leading-relaxed text-content-secondary">
                {SITE.business.servicesDescription}
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-accent">
                {SITE.business.servicesCta}
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.6}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </motion.a>
        </motion.div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-accent-fill text-accent-contrast font-semibold text-[0.9rem] shadow-glow-accent-lg transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 cursor-pointer"
          >
            Have a project in mind? Let&apos;s talk
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
