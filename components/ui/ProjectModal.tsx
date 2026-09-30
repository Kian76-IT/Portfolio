"use client";

import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Code2,
    ExternalLink,
} from "lucide-react";

import {
    AnimatePresence,
    motion,
} from "motion/react";

import { useEffect } from "react";

type Project = {
    title: string;
    roles: string[];
    description: string;
    tech: string[];
    image: string;
    repo: string;
    demo: string;
};

type ProjectModalProps = {
    project: Project | null;

    previousProjectName: string;
    nextProjectName: string;

    currentIndex: number;
    totalProjects: number;

    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
};

export default function ProjectModal({
    project,
    previousProjectName,
    nextProjectName,
    currentIndex,
    totalProjects,
    onClose,
    onPrevious,
    onNext,
}: ProjectModalProps) {
    // ==========================================
    // KEYBOARD NAVIGATION
    // ==========================================

    useEffect(() => {
        if (!project) {
            return;
        }

        const handleKeyDown = (
            event: KeyboardEvent
        ) => {
            if (event.key === "Escape") {
                onClose();
            }

            if (event.key === "ArrowLeft") {
                onPrevious();
            }

            if (event.key === "ArrowRight") {
                onNext();
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [
        project,
        onClose,
        onPrevious,
        onNext,
    ]);

    // ==========================================
    // PREVENT BACKGROUND SCROLL
    // ==========================================

    useEffect(() => {
        if (!project) {
            return;
        }

        const originalOverflow =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow =
                originalOverflow;
        };
    }, [project]);

    // ==========================================
    // NO PROJECT
    // ==========================================

    if (!project) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                key="project-modal"
                className="
                    fixed
                    inset-0
                    z-[70]
                    overflow-y-auto
                    bg-[#070707]
                "
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
                transition={{
                    duration: 0.3,
                }}
            >
                {/* ================================== */}
                {/* BACKGROUND EFFECT                    */}
                {/* ================================== */}

                <div
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        fixed
                        inset-0
                        overflow-hidden
                    "
                >
                    <div
                        className="
                            absolute
                            left-1/2
                            top-[28%]
                            h-[800px]
                            w-[800px]
                            -translate-x-1/2
                            -translate-y-1/2
                            rounded-full
                            bg-sky-400/[0.055]
                            blur-[150px]
                        "
                    />

                    <div
                        className="
                            absolute
                            left-[18%]
                            top-[45%]
                            h-[450px]
                            w-[450px]
                            rounded-full
                            bg-cyan-400/[0.035]
                            blur-[130px]
                        "
                    />

                    <div
                        className="
                            absolute
                            right-[8%]
                            top-[20%]
                            h-[350px]
                            w-[350px]
                            rounded-full
                            bg-sky-300/[0.035]
                            blur-[120px]
                        "
                    />

                    <div
                        className="
                            absolute
                            inset-0
                            opacity-[0.025]
                        "
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                            backgroundSize:
                                "64px 64px",
                        }}
                    />

                    <div
                        className="
                            absolute
                            inset-0
                            bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.4)_100%)]
                        "
                    />
                </div>

                {/* ================================== */}
                {/* TOP NAVIGATION                      */}
                {/* ================================== */}

                <div
                    className="
                        fixed
                        left-0
                        right-0
                        top-0
                        z-[100]
                        flex
                        items-center
                        justify-between
                        px-5
                        py-5
                        sm:px-8
                        sm:py-7
                    "
                >
                    {/* BACK */}

                    <motion.button
                        type="button"
                        onClick={onClose}
                        whileHover={{
                            x: -3,
                        }}
                        whileTap={{
                            scale: 0.96,
                        }}
                        className="
                            group
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/10
                            bg-black/60
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-zinc-400
                            backdrop-blur-xl
                            transition-all
                            duration-200
                            hover:border-white/20
                            hover:bg-white/[0.06]
                            hover:text-white
                        "
                    >
                        <ArrowLeft
                            size={16}
                            className="
                                transition-transform
                                duration-200
                                group-hover:-translate-x-0.5
                            "
                        />

                        <span>
                            Back to Portfolio
                        </span>
                    </motion.button>

                    {/* COUNTER */}

                    <div
                        className="
                            rounded-full
                            border
                            border-white/10
                            bg-black/50
                            px-4
                            py-2
                            backdrop-blur-xl
                        "
                    >
                        <span
                            className="
                                font-mono
                                text-xs
                                tracking-widest
                                text-zinc-500
                            "
                        >
                            {String(
                                currentIndex + 1
                            ).padStart(2, "0")}{" "}
                            <span className="text-zinc-700">
                                /
                            </span>{" "}
                            {String(
                                totalProjects
                            ).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                {/* ================================== */}
                {/* MAIN CONTENT                        */}
                {/* ================================== */}

                <main
                    className="
                        relative
                        mx-auto
                        w-full
                        max-w-6xl
                        px-6
                        pb-24
                        pt-32
                        sm:px-8
                        sm:pt-36
                        lg:px-10
                        lg:pt-40
                    "
                >
                    {/* ================================= */}
                    {/* HEADER                              */}
                    {/* ================================= */}

                    <AnimatePresence
                        mode="wait"
                    >
                        <motion.div
                            key={
                                project.title +
                                "-header"
                            }
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -20,
                            }}
                            transition={{
                                duration: 0.35,
                            }}
                        >
                            {/* ROLES */}

                            <div
                                className="
                                    flex
                                    flex-wrap
                                    gap-2
                                "
                            >
                                {project.roles.map(
                                    (role) => (
                                        <span
                                            key={role}
                                            className="
                                                rounded-full
                                                border
                                                border-sky-400/20
                                                bg-sky-400/[0.06]
                                                px-3.5
                                                py-1.5
                                                text-xs
                                                font-medium
                                                text-sky-400
                                            "
                                        >
                                            {role}
                                        </span>
                                    )
                                )}
                            </div>

                            {/* TITLE */}

                            <div
                                className="
                                    mt-6
                                    flex
                                    items-end
                                    justify-between
                                    gap-8
                                "
                            >
                                <h1
                                    className="
                                        max-w-4xl
                                        text-4xl
                                        font-semibold
                                        leading-[1.05]
                                        tracking-tight
                                        text-white
                                        sm:text-5xl
                                        md:text-6xl
                                        lg:text-7xl
                                    "
                                >
                                    {project.title}
                                </h1>

                                <span
                                    className="
                                        hidden
                                        pb-2
                                        font-mono
                                        text-[10px]
                                        uppercase
                                        tracking-[0.25em]
                                        text-zinc-700
                                        sm:block
                                    "
                                >
                                    PROJECT
                                </span>
                            </div>

                            <div
                                className="
                                    mt-8
                                    h-px
                                    w-full
                                    bg-gradient-to-r
                                    from-sky-400/40
                                    via-white/10
                                    to-transparent
                                "
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* ================================= */}
                    {/* IMAGE                              */}
                    {/* ================================= */}

                    <AnimatePresence
                        mode="wait"
                    >
                        <motion.section
                            key={
                                project.image +
                                "-image"
                            }
                            initial={{
                                opacity: 0,
                                y: 25,
                                scale: 0.98,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                y: -20,
                                scale: 0.98,
                            }}
                            transition={{
                                duration: 0.45,
                                ease: "easeOut",
                            }}
                            className="
                                relative
                                mt-12
                                sm:mt-16
                            "
                        >
                            {/* IMAGE GLOW */}

                            <div
                                aria-hidden="true"
                                className="
                                    pointer-events-none
                                    absolute
                                    -inset-24
                                    rounded-[50%]
                                    bg-sky-400/[0.09]
                                    blur-[120px]
                                "
                            />

                            <div
                                aria-hidden="true"
                                className="
                                    pointer-events-none
                                    absolute
                                    -inset-12
                                    rounded-[40%]
                                    bg-cyan-300/[0.075]
                                    blur-[80px]
                                "
                            />

                            <div
                                aria-hidden="true"
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    rounded-3xl
                                    bg-sky-400/[0.045]
                                    blur-[45px]
                                "
                            />

                            {/* IMAGE FRAME */}

                            <div
                                className="
                                    relative
                                    mx-auto
                                    max-w-5xl
                                "
                            >
                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        -left-3
                                        -top-3
                                        z-10
                                        h-14
                                        w-14
                                        border-l
                                        border-t
                                        border-sky-400/50
                                    "
                                />

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        -bottom-3
                                        -right-3
                                        z-10
                                        h-14
                                        w-14
                                        border-b
                                        border-r
                                        border-sky-400/30
                                    "
                                />

                                <div
                                    className="
                                        relative
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-[#101010]
                                        p-2
                                        shadow-[0_0_100px_rgba(56,189,248,0.12)]
                                        sm:p-3
                                    "
                                >
                                    <div
                                        className="
                                            relative
                                            aspect-[16/9]
                                            overflow-hidden
                                            rounded-xl
                                            bg-zinc-900
                                        "
                                    >
                                        {project.image ? (
                                            <img
                                                src={
                                                    project.image
                                                }
                                                alt={`${project.title} project preview`}
                                                className="
                                                    absolute
                                                    inset-0
                                                    h-full
                                                    w-full
                                                    object-cover
                                                "
                                            />
                                        ) : (
                                            <div
                                                className="
                                                    flex
                                                    h-full
                                                    items-center
                                                    justify-center
                                                    text-sm
                                                    text-zinc-600
                                                "
                                            >
                                                Project
                                                Preview
                                            </div>
                                        )}

                                        <div
                                            className="
                                                pointer-events-none
                                                absolute
                                                inset-0
                                                bg-gradient-to-t
                                                from-black/30
                                                via-transparent
                                                to-white/[0.04]
                                            "
                                        />

                                        <div
                                            className="
                                                pointer-events-none
                                                absolute
                                                inset-0
                                                rounded-xl
                                                ring-1
                                                ring-inset
                                                ring-white/[0.08]
                                            "
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* IMAGE LABEL */}

                            <div
                                className="
                                    mt-4
                                    flex
                                    items-center
                                    justify-between
                                "
                            >
                                <span
                                    className="
                                        text-[10px]
                                        uppercase
                                        tracking-[0.2em]
                                        text-zinc-700
                                    "
                                >
                                    Project Preview
                                </span>

                                <span
                                    className="
                                        font-mono
                                        text-[10px]
                                        text-zinc-700
                                    "
                                >
                                    {String(
                                        currentIndex + 1
                                    ).padStart(2, "0")}
                                </span>
                            </div>
                        </motion.section>
                    </AnimatePresence>

                    {/* ================================= */}
                    {/* INFORMATION                        */}
                    {/* ================================= */}

                    <AnimatePresence
                        mode="wait"
                    >
                        <motion.div
                            key={
                                project.title +
                                "-details"
                            }
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -20,
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.05,
                            }}
                            className="
                                mt-16
                                grid
                                gap-14
                                lg:mt-20
                                lg:grid-cols-[1.35fr_0.8fr]
                                lg:gap-24
                            "
                        >
                            {/* ABOUT */}

                            <section>
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                    "
                                >
                                    <span
                                        className="
                                            font-mono
                                            text-xs
                                            text-sky-400
                                        "
                                    >
                                        01
                                    </span>

                                    <h2
                                        className="
                                            text-lg
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        About This Project
                                    </h2>
                                </div>

                                <p
                                    className="
                                        mt-5
                                        max-w-3xl
                                        text-sm
                                        leading-7
                                        text-zinc-400
                                        sm:text-base
                                        sm:leading-8
                                    "
                                >
                                    {
                                        project.description
                                    }
                                </p>
                            </section>

                            {/* TECHNOLOGIES */}

                            <section>
                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                    "
                                >
                                    <span
                                        className="
                                            font-mono
                                            text-xs
                                            text-sky-400
                                        "
                                    >
                                        02
                                    </span>

                                    <h2
                                        className="
                                            text-lg
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        Technologies
                                    </h2>
                                </div>

                                <div
                                    className="
                                        mt-5
                                        flex
                                        flex-wrap
                                        gap-2
                                    "
                                >
                                    {project.tech.map(
                                        (
                                            technology
                                        ) => (
                                            <span
                                                key={
                                                    technology
                                                }
                                                className="
                                                    rounded-lg
                                                    border
                                                    border-white/10
                                                    bg-white/[0.025]
                                                    px-3.5
                                                    py-2
                                                    text-xs
                                                    text-zinc-400
                                                    transition-all
                                                    duration-200
                                                    hover:border-sky-400/30
                                                    hover:bg-sky-400/[0.06]
                                                    hover:text-sky-400
                                                "
                                            >
                                                {
                                                    technology
                                                }
                                            </span>
                                        )
                                    )}
                                </div>
                            </section>
                        </motion.div>
                    </AnimatePresence>

                    {/* ================================= */}
                    {/* SLIDER                             */}
                    {/* ================================= */}

                    <div
                        className="
                            mt-16
                            border-t
                            border-white/10
                            pt-8
                            sm:mt-20
                        "
                    >
                        <div
                            className="
                                grid
                                gap-6
                                sm:grid-cols-[1fr_auto_1fr]
                                sm:items-center
                            "
                        >
                            {/* PREVIOUS */}

                            <motion.button
                                type="button"
                                onClick={
                                    onPrevious
                                }
                                whileHover={{
                                    x: -4,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                                className="
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    text-left
                                "
                            >
                                <span
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-white/10
                                        bg-white/[0.02]
                                        text-zinc-400
                                        transition-all
                                        duration-200
                                        group-hover:border-sky-400/30
                                        group-hover:bg-sky-400/[0.06]
                                        group-hover:text-sky-400
                                    "
                                >
                                    <ArrowLeft
                                        size={17}
                                    />
                                </span>

                                <span className="min-w-0">
                                    <span
                                        className="
                                            block
                                            text-[10px]
                                            uppercase
                                            tracking-[0.2em]
                                            text-zinc-600
                                        "
                                    >
                                        Previous
                                    </span>

                                    <span
                                        className="
                                            mt-1
                                            block
                                            max-w-[220px]
                                            truncate
                                            text-sm
                                            text-zinc-400
                                            transition-colors
                                            group-hover:text-white
                                        "
                                    >
                                        {
                                            previousProjectName
                                        }
                                    </span>
                                </span>
                            </motion.button>

                            {/* INDICATORS */}

                            <div
                                className="
                                    order-first
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    sm:order-none
                                "
                            >
                                {Array.from({
                                    length: totalProjects,
                                }).map(
                                    (_, index) => (
                                        <span
                                            key={
                                                index
                                            }
                                            className={`
                                                h-1.5
                                                rounded-full
                                                transition-all
                                                duration-300
                                                ${
                                                    index ===
                                                    currentIndex
                                                        ? "w-8 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.55)]"
                                                        : "w-1.5 bg-zinc-700"
                                                }
                                            `}
                                        />
                                    )
                                )}
                            </div>

                            {/* NEXT */}

                            <motion.button
                                type="button"
                                onClick={
                                    onNext
                                }
                                whileHover={{
                                    x: 4,
                                }}
                                whileTap={{
                                    scale: 0.97,
                                }}
                                className="
                                    group
                                    flex
                                    items-center
                                    justify-end
                                    gap-3
                                    text-right
                                "
                            >
                                <span className="min-w-0">
                                    <span
                                        className="
                                            block
                                            text-[10px]
                                            uppercase
                                            tracking-[0.2em]
                                            text-zinc-600
                                        "
                                    >
                                        Next
                                    </span>

                                    <span
                                        className="
                                            mt-1
                                            block
                                            max-w-[220px]
                                            truncate
                                            text-sm
                                            text-zinc-400
                                            transition-colors
                                            group-hover:text-white
                                        "
                                    >
                                        {
                                            nextProjectName
                                        }
                                    </span>
                                </span>

                                <span
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-white/10
                                        bg-white/[0.02]
                                        text-zinc-400
                                        transition-all
                                        duration-200
                                        group-hover:border-sky-400/30
                                        group-hover:bg-sky-400/[0.06]
                                        group-hover:text-sky-400
                                    "
                                >
                                    <ArrowRight
                                        size={17}
                                    />
                                </span>
                            </motion.button>
                        </div>
                    </div>

                    {/* ================================= */}
                    {/* ACTION BUTTONS                     */}
                    {/* ================================= */}

                    {(project.repo ||
                        project.demo) && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.4,
                                delay: 0.1,
                            }}
                            className="
                                mt-10
                                flex
                                flex-wrap
                                justify-center
                                gap-3
                            "
                        >
                            {project.repo && (
                                <a
                                    href={
                                        project.repo
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-2.5
                                        rounded-full
                                        border
                                        border-white/15
                                        bg-white/[0.03]
                                        px-5
                                        py-3
                                        text-sm
                                        font-medium
                                        text-white
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                        hover:border-white/30
                                        hover:bg-white/[0.07]
                                    "
                                >
                                    <Code2
                                        size={16}
                                    />

                                    <span>
                                        View Source
                                        Code
                                    </span>

                                    <ArrowUpRight
                                        size={15}
                                        className="
                                            transition-transform
                                            duration-200
                                            group-hover:translate-x-0.5
                                            group-hover:-translate-y-0.5
                                        "
                                    />
                                </a>
                            )}

                            {project.demo && (
                                <a
                                    href={
                                        project.demo
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-2.5
                                        rounded-full
                                        border
                                        border-sky-400/30
                                        bg-sky-400/[0.06]
                                        px-5
                                        py-3
                                        text-sm
                                        font-medium
                                        text-sky-300
                                        transition-all
                                        duration-300
                                        hover:-translate-y-0.5
                                        hover:border-sky-400/50
                                        hover:bg-sky-400/[0.12]
                                        hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]
                                    "
                                >
                                    <ExternalLink
                                        size={16}
                                    />

                                    <span>
                                        Live Demo
                                    </span>

                                    <ArrowUpRight
                                        size={15}
                                        className="
                                            transition-transform
                                            duration-200
                                            group-hover:translate-x-0.5
                                            group-hover:-translate-y-0.5
                                        "
                                    />
                                </a>
                            )}
                        </motion.div>
                    )}

                    {/* ================================= */}
                    {/* FOOTER                              */}
                    {/* ================================= */}

                    <div
                        className="
                            mt-20
                            flex
                            items-center
                            justify-between
                            border-t
                            border-white/5
                            pt-5
                        "
                    >
                        <span
                            className="
                                font-mono
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-zinc-700
                            "
                        >
                            KIAN AURELIO WIBOWO
                        </span>

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                text-[10px]
                                uppercase
                                tracking-[0.2em]
                                text-zinc-600
                                transition-colors
                                hover:text-sky-400
                            "
                        >
                            Back to Projects
                        </button>
                    </div>
                </main>
            </motion.div>
        </AnimatePresence>
    );
}