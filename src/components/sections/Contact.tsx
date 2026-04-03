"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Download, Calendar, Send, Mail, Sparkles } from "lucide-react";
import useInView from "@/lib/hooks/useInView";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
    SITE,
    CONTACT_ROLES,
    CONTACT_SERVICES,
    CONTACT_STATS,
} from "@/lib/constants";

export function Contact() {
    const { ref, inView } = useInView(0.12);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setForm({ name: "", email: "", message: "" });
        }, 3000);
    };

    return (
        <section
            id="contact"
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
                        tag="// contact"
                        title="Let's connect"
                        watermark="Say Hi"
                    />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-0">
                    {/* ── Left — Recruiters ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:pr-12 lg:border-r lg:border-border-subtle"
                    >
                        <div className="p-6 rounded-2xl glass mb-6">
                            <h3 className="font-display text-[1.4rem] font-bold text-content mb-2">
                                Open to new opportunities
                            </h3>
                            <p className="text-content-secondary text-[0.9rem] leading-relaxed mb-6">
                                {CONTACT_ROLES}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={SITE.resume}
                                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-surface font-semibold text-[0.85rem] shadow-glow-accent transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 cursor-pointer"
                                >
                                    <Download size={15} strokeWidth={1.5} />
                                    Download Resume
                                </a>
                                <a
                                    href={`mailto:${SITE.email}`}
                                    className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-strong text-content-secondary text-[0.85rem] bg-surface-card/30 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 cursor-pointer"
                                >
                                    <Calendar size={15} strokeWidth={1.5} />
                                    Book a Call
                                </a>
                            </div>
                        </div>

                        {/* Quick stats */}
                        <div className="grid grid-cols-3 gap-3">
                            {CONTACT_STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="text-center p-3 rounded-xl glass"
                                >
                                    <div className="font-display font-bold text-content text-[1.1rem]">
                                        {stat.value}
                                    </div>
                                    <div className="text-tiny text-content-muted">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Right — Freelance Form ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:pl-12"
                    >
                        <h3 className="font-display text-[1.4rem] font-bold text-content mb-2">
                            Have a project?
                        </h3>
                        <p className="text-content-secondary text-[0.9rem] mb-6">
                            {CONTACT_SERVICES}
                        </p>

                        {/* {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-16 rounded-2xl glass"
                            >
                                <Sparkles size={32} className="text-accent mb-3" />
                                <p className="text-content font-display text-[1.1rem] font-semibold">
                                    Thanks for reaching out!
                                </p>
                                <p className="mt-1 text-content-muted text-[0.85rem]">
                                    I&apos;ll get back to you soon.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                {[
                                    { name: "name", label: "Name", type: "text" },
                                    { name: "email", label: "Email", type: "email" },
                                ].map((field, i) => (
                                    <motion.div
                                        key={field.name}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={inView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                                    >
                                        <input
                                            type={field.type}
                                            placeholder={field.label}
                                            required
                                            value={form[field.name as keyof typeof form]}
                                            onChange={(e) =>
                                                setForm({ ...form, [field.name]: e.target.value })
                                            }
                                            onFocus={() => setFocusedField(field.name)}
                                            onBlur={() => setFocusedField(null)}
                                            className="w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300 bg-surface-card/60 text-content text-[0.9rem]"
                                            style={{
                                                border:
                                                    focusedField === field.name
                                                        ? "1px solid var(--color-accent-border)"
                                                        : "1px solid var(--color-border-subtle)",
                                                boxShadow:
                                                    focusedField === field.name
                                                        ? "0 0 16px var(--color-accent-dim)"
                                                        : "none",
                                            }}
                                        />
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.6 }}
                                >
                                    <textarea
                                        placeholder="Message"
                                        rows={4}
                                        required
                                        value={form.message}
                                        onChange={(e) =>
                                            setForm({ ...form, message: e.target.value })
                                        }
                                        onFocus={() => setFocusedField("message")}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-300 resize-none bg-surface-card/60 text-content text-[0.9rem]"
                                        style={{
                                            border:
                                                focusedField === "message"
                                                    ? "1px solid var(--color-accent-border)"
                                                    : "1px solid var(--color-border-subtle)",
                                            boxShadow:
                                                focusedField === "message"
                                                    ? "0 0 16px var(--color-accent-dim)"
                                                    : "none",
                                        }}
                                    />
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.7 }}
                                    type="submit"
                                    className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full w-full bg-accent text-surface font-semibold text-[0.9rem] shadow-glow-accent-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 cursor-pointer"
                                >
                                    <Send
                                        size={15}
                                        strokeWidth={1.5}
                                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                                    />
                                    Send Message
                                </motion.button>
                            </form>
                        )} */}

                        <div className="mt-5 flex items-center gap-2 text-label text-content-muted">
                            <Mail size={14} strokeWidth={1.5} />
                            {/* <span>Or email directly: </span> */}
                            <span>send an email: </span>
                            <a
                                href={`mailto:${SITE.email}`}
                                className="text-accent transition-colors duration-200 hover:underline"
                            >
                                {SITE.email}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}