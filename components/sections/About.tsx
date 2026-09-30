"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Brain,
  Code2,
  GraduationCap,
  Heart,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import type { MouseEvent, ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* DATA — replace every [PLACEHOLDER] with your real info             */
/* Wrap a word in **double asterisks** to highlight it.               */
/* ------------------------------------------------------------------ */

const intro = [
  "I'm a Computer Science student at **BINUS University** with a strong interest in **Artificial Intelligence**, **Machine Learning**, and **Software Engineering**.",
  "I enjoy learning by **building and experimenting** turning ideas, models, and data into practical applications that can solve **real-world problems**.",
];

const education = [
  {
    school: "Binus University",
    detail: "Computer Science — Intelligent Systems",
    period: "2024 – Present",
    note: "Studying Computer Science with a focus on AI and software development. Through coursework and hands-on work, I'm building a foundation in AI / ML, data, and software engineering while learning how to turn theory into things people can use.",
  },
  // Optional, like an exchange program:
  // { school: "[Universitas Exchange]", detail: "Exchange Student", period: "[2025]", note: "[...]" },
];

const facts: { icon: LucideIcon; value: string; label: string }[] = [
  { icon: GraduationCap, value: "2028", label: "Graduating" },
  { icon: MapPin, value: "Jakarta", label: "Based in" },
  { icon: Code2, value: "CS", label: "Major" },
  { icon: Brain, value: "AI / ML", label: "Interests" },
];

const beyondCode = ["Hiking", "Playing Games", "Exploring New Things",];

/* ------------------------------------------------------------------ */
/* MAIN                                                               */
/* ------------------------------------------------------------------ */

export default function About() {
    const reduce = useReducedMotion();

    const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: reduce ? 0 : 0.6, delay },
    });

    return (
    <section
        id="about"
        className="scroll-mt-24 border-t border-white/10 px-6 py-24"
    >
        <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium tracking-[0.2em] text-sky-400">
            ABOUT ME
        </p>

        {/* Heading + intro */}
        <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-start">
            <motion.h2
            {...reveal()}
            className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl"
            >
                Curious About How Things Work
            <br />
                Always Looking to Improve
            </motion.h2>

            <motion.div
            {...reveal(0.1)}
            className="space-y-5 text-base leading-relaxed text-zinc-400 md:text-lg"
            >
            {intro.map((p) => (
                <p key={p}>
                <Highlight text={p} />
                </p>
            ))}
            </motion.div>
        </div>

        {/* Education + beyond the code */}
        <div className="mt-16 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <motion.div {...reveal()}>
            <SpotlightCard className="h-full p-6 sm:p-8">
                <p className="text-sm uppercase tracking-[0.18em] text-zinc-600">
                Education
                </p>

                <ol className="relative mt-6 space-y-8 border-l border-white/10 pl-6">
                {education.map((e) => (
                    <li key={e.school} className="relative">
                    <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
                    <p className="font-mono text-sm text-sky-400">{e.period}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                        {e.school}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-400">{e.detail}</p>
                    <p className="mt-3 max-w-lg text-base leading-relaxed text-zinc-500">
                        {e.note}
                    </p>
                    </li>
                ))}
                </ol>
            </SpotlightCard>
            </motion.div>

            <motion.div {...reveal(0.1)}>
            <SpotlightCard className="h-full p-6 sm:p-8">
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-zinc-600">
                <Heart size={13} className="text-sky-400" />
                Beyond the code
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                        Life beyond the code
                </h3>

                <div className="mt-6 flex flex-wrap gap-2">
                {beyondCode.map((item) => (
                    <motion.span
                    key={item}
                    whileHover={{ y: -2 }}
                    className="cursor-default rounded-full border border-white/10 px-3.5 py-2 text-sm text-zinc-400 transition-colors hover:border-sky-400/30 hover:bg-sky-400/[0.06] hover:text-sky-400"
                    >
                    {item}
                    </motion.span>
                ))}
                </div>
            </SpotlightCard>
            </motion.div>
        </div>

        {/* Quick facts */}
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {facts.map((f, i) => {
            const Icon = f.icon;
            return (
                <motion.div key={f.label} {...reveal(i * 0.07)}>
                <SpotlightCard className="p-6 text-center">
                    <Icon size={20} className="mx-auto text-sky-400" />
                    <p className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                    {f.value}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-zinc-600">
                    {f.label}
                    </p>
                </SpotlightCard>
                </motion.div>
            );
            })}
        </div>

        {/* Quote */}
        <motion.blockquote
            {...reveal()}
            className="mt-14 border-l-2 border-sky-400 pl-5"
        >
            <p className="text-xl italic text-zinc-300 underline decoration-sky-400 decoration-wavy decoration-1 underline-offset-[10px] sm:text-2xl">
    
            </p>
        </motion.blockquote>
        </div>
    </section>
    );
    }

    /* ------------------------------------------------------------------ */
    /* HELPERS                                                            */
    /* ------------------------------------------------------------------ */

    // Turns "a **b** c" into highlighted spans
    function Highlight({ text }: { text: string }) {
    return (
    <>
        {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
            <span key={i} className="font-medium text-sky-400">
            {part}
            </span>
        ) : (
            part
        )
        )}
    </>
    );
    }

    // Card with a soft glow that follows the cursor
    function SpotlightCard({
    children,
    className = "",
    }: {
    children: ReactNode;
    className?: string;
    }) {
    const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
    };

    return (
    <div
        onMouseMove={onMove}
        className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-white/20 ${className}`}
    >
        <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
            background:
            "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(56,189,248,0.12), transparent 60%)",
        }}
        />
        <div className="relative">{children}</div>
    </div>
    );
}