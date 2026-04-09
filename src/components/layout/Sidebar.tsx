"use client";

// Fixed left nav (desktop) + floating pill nav (mobile) with scroll-aware highlighting

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_ITEMS, SITE } from "@/lib/constants";

const socialLinks = [
  { icon: Github, href: SITE.socials.github },
  { icon: Linkedin, href: SITE.socials.linkedin },
  { icon: X, href: `mailto:${SITE.socials.twitter}` },
  { icon: Mail, href: `mailto:${SITE.email}` },
];

export function Sidebar() {
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const updateActiveSection = (id: string) => {
    if (!id || id === activeRef.current) {
      return;
    }

    activeRef.current = id;
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  // Scroll to section from URL hash on page load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && NAV_ITEMS.some((item) => item.id === hash)) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section)
    );

    if (sections.length === 0) {
      return;
    }

    let rafId = 0;

    const calculateActiveSection = () => {
      rafId = 0;

      const scrollAnchor = window.scrollY + 160;
      const pageBottom = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      let nextActive = sections[0].id;

      for (const section of sections) {
        if (section.offsetTop <= scrollAnchor) {
          nextActive = section.id;
          continue;
        }

        break;
      }

      if (pageBottom >= documentHeight - 2) {
        nextActive = sections[sections.length - 1].id;
      }

      updateActiveSection(nextActive);
    };

    const requestSectionUpdate = () => {
      if (rafId !== 0) {
        return;
      }

      rafId = window.requestAnimationFrame(calculateActiveSection);
    };

    requestSectionUpdate();
    window.addEventListener("scroll", requestSectionUpdate, { passive: true });
    window.addEventListener("resize", requestSectionUpdate);

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", requestSectionUpdate);
      window.removeEventListener("resize", requestSectionUpdate);
    };
  }, []);

  const scrollTo = (id: string) => {
    updateActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-[220px] flex-col justify-between z-40 py-8 px-6 bg-surface/[0.92] backdrop-blur-xl border-r border-border-subtle">
        <div>
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="font-display text-2xl font-extrabold text-content mb-14 cursor-pointer group"
          >
            <span className="group-hover:text-accent transition-colors duration-300">
              PS
            </span>
            <span className="text-accent">.</span>
          </button>

          {/* Nav Links */}
          <div className="flex flex-col gap-0.5">
            {NAV_ITEMS.map(({ id, label, num }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative text-left px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer group flex items-center gap-3"
                style={{
                  color:
                    active === id
                      ? "var(--color-content)"
                      : "var(--color-content-muted)",
                  background:
                    active === id ? "var(--color-accent-dim)" : "transparent",
                }}
              >
                <span
                  className="font-mono transition-colors duration-300"
                  style={{
                    fontSize: "0.6rem",
                    color:
                      active === id
                        ? "var(--color-accent)"
                        : "var(--color-content-faint)",
                    minWidth: "14px",
                  }}
                >
                  {num}
                </span>
                <span className="text-[0.82rem] transition-all duration-300 group-hover:text-content">
                  {label}
                </span>

                {/* Active indicator bar */}
                {active === id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-accent-fill"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-5">
          {/* Availability Badge */}
          <div className="flex items-center gap-2.5 px-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-status-success" />
            </span>
            <span className="text-status-success text-[0.72rem] tracking-wide">
              Available for Work
            </span>
          </div>

          <ThemeToggle className="mx-3" />

          {/* Social Icons */}
          <div className="flex gap-3 px-3">
            {socialLinks.map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-content-muted transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 group"
              >
                <Icon
                  size={15}
                  strokeWidth={1.5}
                  className="transition-colors duration-200 group-hover:text-accent"
                />
              </a>
            ))}
          </div>

          {/* Resume Button */}
          <button
            onClick={() => scrollTo("contact")}
            className="mx-3 px-3 py-2.5 rounded-full bg-accent-fill text-accent-contrast text-[0.75rem] font-semibold shadow-glow-accent transition-all duration-300 cursor-pointer hover:scale-[1.03] hover:-translate-y-0.5 flex items-center justify-center gap-1.5"
          >
            <Download size={12} strokeWidth={1.5} />
            Resume
          </button>
        </div>
      </nav>

      {/* ── Mobile Nav Bar ── */}
      <nav className="lg:hidden fixed top-4 left-4 right-4 z-50 rounded-2xl px-5 py-3.5 flex items-center justify-between bg-surface/[0.92] backdrop-blur-xl border border-border-subtle shadow-[0_20px_45px_rgba(74,54,21,0.12)]">
        <span className="font-display text-xl font-extrabold text-content">
          PS<span className="text-accent">.</span>
        </span>
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success" />
          </span>
          <ThemeToggle compact />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="cursor-pointer p-1 text-content"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Fullscreen Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            id="mobile-navigation"
            className="lg:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-surface/[0.98] backdrop-blur-xl"
          >
            {NAV_ITEMS.map(({ id, label, num }, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => scrollTo(id)}
                className="px-8 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-3"
                style={{
                  color:
                    active === id
                      ? "var(--color-content)"
                      : "var(--color-content-muted)",
                  background:
                    active === id ? "var(--color-accent-dim)" : "transparent",
                }}
              >
                <span
                  className="font-mono text-[0.65rem]"
                  style={{
                    color:
                      active === id
                        ? "var(--color-accent)"
                        : "var(--color-content-faint)",
                  }}
                >
                  {num}
                </span>
                <span className="font-display text-xl">{label}</span>
              </motion.button>
            ))}

            {/* Mobile Social Icons */}
            <div className="flex gap-5 mt-6">
              {socialLinks.map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-content-muted"
                >
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
