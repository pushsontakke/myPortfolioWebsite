"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, ChevronDown, Download, ArrowRight } from "lucide-react";
import { useAnimatedCounter } from "@/components/ui/AnimatedCounter";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  HERO_ROLES,
  HERO_HEADLINE_WORDS,
  HERO_SUBTITLE,
  HERO_METRICS,
  SITE,
} from "@/lib/constants";

const socialLinks = [
  { icon: Github, href: SITE.socials.github, label: "GitHub" },
  { icon: Linkedin, href: SITE.socials.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${SITE.email}`, label: "Email" },
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Trigger entrance animations after mount
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Rotate roles every 3 seconds
  useEffect(() => {
    const timer = setInterval(
      () => setRoleIndex((i) => (i + 1) % HERO_ROLES.length),
      3000
    );
    return () => clearInterval(timer);
  }, []);

  // Animated counters — triggered when section becomes visible
  const counters = HERO_METRICS.map((metric) =>
    useAnimatedCounter(metric.target, 2200, visible)
  );

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Aurora Background ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 animate-aurora-1"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 15% 50%, rgba(234,179,8,0.14) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 animate-aurora-2"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 85% 25%, rgba(234,179,8,0.08) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 animate-aurora-3"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 85%, rgba(234,179,8,0.06) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 animate-aurora-1"
          style={{
            background:
              "radial-gradient(ellipse 40% 40% at 70% 60%, rgba(234,179,8,0.05) 0%, transparent 55%)",
            animationDuration: "14s",
          }}
        />

        {/* Dot grid */}
        <div className="dot-grid absolute inset-0" />

        {/* Noise */}
        <div className="noise-overlay absolute inset-0" />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--color-surface))",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 py-28 lg:py-0">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          {/* ── Left Column ── */}
          <div>
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <StatusBadge label="Available for Work" color="success" />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-3"
            >
              <h1
                className="font-display font-extrabold text-content"
                style={{
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                }}
              >
                Piyush
                <br />
                <span className="relative">
                  Sontakke
                  <span
                    className="absolute -bottom-2 left-0 h-1 rounded-full"
                    style={{
                      width: "40%",
                      background:
                        "linear-gradient(90deg, var(--color-accent), transparent)",
                    }}
                  />
                </span>
              </h1>
            </motion.div>

            {/* Rotating roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-10 mb-5 overflow-hidden relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="h-10 flex items-center gap-2 font-mono text-base"
                >
                  <span className="text-accent">&gt;</span>
                  <span className="text-accent">
                    {HERO_ROLES[roleIndex]}
                  </span>
                  <span className="w-0.5 h-5 inline-block bg-accent animate-blink" />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Staggered headline */}
            <div className="mb-3 flex flex-wrap gap-x-2.5 gap-y-1">
              {HERO_HEADLINE_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
                  className="font-display font-semibold"
                  style={{
                    fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                    color:
                      word === "ships"
                        ? "var(--color-accent)"
                        : "var(--color-content)",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-8 text-content-secondary text-[0.95rem] tracking-wide"
            >
              {HERO_SUBTITLE}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a
                href={SITE.resume}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-accent text-surface font-semibold shadow-glow-accent-lg transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 cursor-pointer text-[0.9rem]"
              >
                <Download size={16} strokeWidth={1.5} />
                Download Resume
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-accent/50 text-accent bg-accent-dim transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 cursor-pointer text-[0.9rem]"
              >
                Start a Project
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex gap-3"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group p-2.5 rounded-xl text-content-secondary border border-surface-elevated bg-surface-card/40 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    className="transition-colors duration-200 group-hover:text-accent"
                  />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right Column — Metrics ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {HERO_METRICS.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                  className="group p-5 rounded-2xl glass transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-1 text-[0.7rem] opacity-40">
                    {metric.icon}
                  </div>
                  <div
                    className="font-display font-bold text-content tracking-tight"
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    }}
                  >
                    {metric.display(counters[i])}
                  </div>
                  <div className="text-content-muted text-small tracking-wide">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-[0.7rem] text-content-muted tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-content-muted" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}