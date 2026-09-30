"use client";

import { motion } from "motion/react";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
    return (
    <section
        id="home"
        className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden px-6 pt-24"
    >
        {/* =============================================== */}
        {/* INTERACTIVE BACKGROUND                           */}
        {/* =============================================== */}

        <InteractiveBackground />

        {/* =============================================== */}
        {/* HERO CONTENT                                    */}
        {/* =============================================== */}

        <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* ============================================= */}
        {/* ROLE                                          */}
        {/* ============================================= */}

        <motion.p
            initial={{
            opacity: 0,
            y: 20,
            }}
            animate={{
            opacity: 1,
            y: 0,
            }}
            transition={{
            duration: 0.6,
            }}
            className="text-base font-medium tracking-[0.2em] text-sky-400"
        >
            AI / MACHINE Enthusiast
        </motion.p>

        {/* ============================================= */}
        {/* NAME                                          */}
        {/* ============================================= */}

        <motion.h1
            initial={{
            opacity: 0,
            y: 25,
            }}
            animate={{
            opacity: 1,
            y: 0,
            }}
            transition={{
            duration: 0.7,
            delay: 0.15,
            }}
            className="mt-4 max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
        >
            Kian Aurelio Wibowo
        </motion.h1>

        {/* ============================================= */}
        {/* DESCRIPTION                                    */}
        {/* ============================================= */}

        <motion.p
            initial={{
            opacity: 0,
            y: 20,
            }}
            animate={{
            opacity: 1,
            y: 0,
            }}
            transition={{
            duration: 0.6,
            delay: 0.3,
            }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl"
        >
            Building intelligent applications with AI,
            data, and software engineering.
        </motion.p>

        {/* ============================================= */}
        {/* BUTTONS                                        */}
        {/* ============================================= */}

        <motion.div
            initial={{
            opacity: 0,
            y: 20,
            }}
            animate={{
            opacity: 1,
            y: 0,
            }}
            transition={{
            duration: 0.6,
            delay: 0.45,
            }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
            <MagneticButton
            href="#projects"
            variant="primary"
            >
            View Projects
            </MagneticButton>

            <MagneticButton
            href="/resume.pdf"
            variant="secondary"
            target="_blank"
            >
            Download CV
            </MagneticButton>
        </motion.div>

        {/* ============================================= */}
        {/* SCROLL INDICATOR                              */}
        {/* ============================================= */}

        <motion.a
            href="#about"
            initial={{
            opacity: 0,
            }}
            animate={{
            opacity: 1,
            }}
            transition={{
            duration: 0.8,
            delay: 1,
            }}
            whileHover={{
            y: 3,
            }}
            className="group mt-16 hidden items-center gap-3 text-xs tracking-[0.2em] text-zinc-600 transition-colors duration-200 hover:text-sky-400 sm:flex"
        >
            <motion.span
            animate={{
                y: [0, 5, 0],
            }}
            transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="block h-8 w-px bg-zinc-700 transition-colors duration-200 group-hover:bg-sky-400"
            />

            <span>SCROLL TO EXPLORE</span>
        </motion.a>
        </div>
    </section>
    );
}