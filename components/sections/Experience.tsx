"use client";

import Image from "next/image";

import {
    motion,
    AnimatePresence,
    useReducedMotion,
    useScroll,
    useSpring,
} from "motion/react";

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import { experiences } from "@/data/experience";


type ExperienceCardProps = {
    experience: (typeof experiences)[number];
    index: number;
    isActive: boolean;
    reduce: boolean;
};


function ExperienceCard({
    experience,
    index,
    isActive,
    reduce,
}: ExperienceCardProps) {
    const [currentImage, setCurrentImage] =
        useState(0);

    const [direction, setDirection] =
        useState(1);

    const [isHovered, setIsHovered] =
        useState(false);

    const touchStartX =
        useRef<number | null>(null);

    const images = experience.images ?? [];


    /* -------------------------------------------------------------- */
    /* IMAGE NAVIGATION                                                */
    /* -------------------------------------------------------------- */

    const nextImage = () => {
        if (images.length <= 1) return;

        setDirection(1);

        setCurrentImage((current) =>
            current === images.length - 1
                ? 0
                : current + 1
        );
    };


    const previousImage = () => {
        if (images.length <= 1) return;

        setDirection(-1);

        setCurrentImage((current) =>
            current === 0
                ? images.length - 1
                : current - 1
        );
    };


    const selectImage = (index: number) => {
        setDirection(
            index > currentImage ? 1 : -1
        );

        setCurrentImage(index);
    };


    /* -------------------------------------------------------------- */
    /* TOUCH / SWIPE                                                   */
    /* -------------------------------------------------------------- */

    const handleTouchStart = (
        event: React.TouchEvent<HTMLDivElement>
    ) => {
        touchStartX.current =
            event.touches[0].clientX;
    };


    const handleTouchEnd = (
        event: React.TouchEvent<HTMLDivElement>
    ) => {
        if (touchStartX.current === null) {
            return;
        }

        const touchEndX =
            event.changedTouches[0].clientX;

        const distance =
            touchEndX - touchStartX.current;

        const minimumSwipeDistance = 50;

        if (
            Math.abs(distance) >=
            minimumSwipeDistance
        ) {
            if (distance < 0) {
                nextImage();
            } else {
                previousImage();
            }
        }

        touchStartX.current = null;
    };


    return (
        <motion.article
            initial={
                reduce
                    ? { opacity: 0 }
                    : {
                          opacity: 0,
                          y: 40,
                      }
            }
            whileInView={
                reduce
                    ? { opacity: 1 }
                    : {
                          opacity: 1,
                          y: 0,
                      }
            }
            viewport={{
                once: true,
                amount: 0.15,
            }}
            transition={
                reduce
                    ? { duration: 0 }
                    : {
                          duration: 0.65,
                          delay: index * 0.08,
                          ease: "easeOut",
                      }
            }
            onMouseEnter={() =>
                setIsHovered(true)
            }
            onMouseLeave={() =>
                setIsHovered(false)
            }
            className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                bg-white/[0.02]
                transition-all
                duration-500

                ${
                    isActive
                        ? `
                            border-sky-400/30
                            bg-sky-400/[0.025]
                            shadow-[0_0_40px_rgba(56,189,248,0.06)]
                        `
                        : `
                            border-white/10
                            hover:border-white/20
                        `
                }
            `}
        >
            {/* ------------------------------------------------------ */}
            {/* ACTIVE CARD GLOW                                        */}
            {/* ------------------------------------------------------ */}

            <motion.div
                aria-hidden="true"
                animate={
                    isActive
                        ? {
                              opacity: 1,
                          }
                        : {
                              opacity: 0,
                          }
                }
                transition={{
                    duration: 0.4,
                }}
                className="
                    pointer-events-none
                    absolute
                    -right-24
                    -top-24
                    h-72
                    w-72
                    rounded-full
                    bg-sky-400/[0.06]
                    blur-3xl
                "
            />


            {/* ------------------------------------------------------ */}
            {/* IMAGE                                                     */}
            {/* ------------------------------------------------------ */}

            {images.length > 0 && (
                <div
                    className="
                        relative
                        mx-5
                        mt-5
                        overflow-hidden
                        rounded-xl
                        bg-zinc-900
                        sm:mx-6
                        sm:mt-6
                    "
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="relative aspect-video overflow-hidden">
                        <AnimatePresence
                            initial={false}
                            custom={direction}
                            mode="sync"
                        >
                            <motion.div
                                key={currentImage}
                                custom={direction}
                                initial={
                                    reduce
                                        ? {
                                              opacity: 0,
                                          }
                                        : {
                                              opacity: 0,
                                              x:
                                                  direction *
                                                  25,
                                              scale: 1.02,
                                          }
                                }
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    scale: 1,
                                }}
                                exit={
                                    reduce
                                        ? {
                                              opacity: 0,
                                          }
                                        : {
                                              opacity: 0,
                                              x:
                                                  direction *
                                                  -25,
                                              scale: 0.99,
                                          }
                                }
                                transition={
                                    reduce
                                        ? {
                                              duration: 0,
                                          }
                                        : {
                                              duration: 0.35,
                                              ease: "easeOut",
                                          }
                                }
                                className="absolute inset-0"
                            >
                                <Image
                                    src={
                                        images[
                                            currentImage
                                        ]
                                    }
                                    alt={`${experience.event} - ${experience.role} photo ${
                                        currentImage + 1
                                    }`}
                                    fill
                                    quality={90}
                                    sizes="
                                        (max-width: 768px) 100vw,
                                        1100px
                                    "
                                    unoptimized
                                    className="
                                        object-cover
                                        transition-transform
                                        duration-700
                                        group-hover:scale-[1.02]
                                    "
                                />
                            </motion.div>
                        </AnimatePresence>


                        {/* IMAGE OVERLAY */}

                        <div
                            aria-hidden="true"
                            className="
                                pointer-events-none
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/40
                                via-transparent
                                to-white/[0.03]
                            "
                        />


                        {/* IMAGE COUNTER */}

                        {images.length > 1 && (
                            <div
                                className="
                                    absolute
                                    right-4
                                    top-4
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-black/55
                                    px-3
                                    py-1.5
                                    font-mono
                                    text-[10px]
                                    tracking-widest
                                    text-zinc-300
                                    backdrop-blur-md
                                "
                            >
                                {String(
                                    currentImage + 1
                                ).padStart(2, "0")}
                                <span className="mx-1 text-zinc-600">
                                    /
                                </span>
                                {String(
                                    images.length
                                ).padStart(2, "0")}
                            </div>
                        )}


                        {/* PREVIOUS */}

                        {images.length > 1 && (
                            <motion.button
                                type="button"
                                onClick={
                                    previousImage
                                }
                                whileHover={
                                    reduce
                                        ? undefined
                                        : {
                                              x: -2,
                                              scale: 1.05,
                                          }
                                }
                                whileTap={{
                                    scale: 0.94,
                                }}
                                aria-label="Previous photo"
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    flex
                                    h-10
                                    w-10
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-black/60
                                    text-white
                                    opacity-0
                                    backdrop-blur-md
                                    transition-all
                                    duration-300
                                    hover:border-sky-400/30
                                    hover:bg-black/80
                                    hover:text-sky-400
                                    group-hover:opacity-100
                                    focus-visible:opacity-100
                                "
                            >
                                <ChevronLeft
                                    size={20}
                                />
                            </motion.button>
                        )}


                        {/* NEXT */}

                        {images.length > 1 && (
                            <motion.button
                                type="button"
                                onClick={nextImage}
                                whileHover={
                                    reduce
                                        ? undefined
                                        : {
                                              x: 2,
                                              scale: 1.05,
                                          }
                                }
                                whileTap={{
                                    scale: 0.94,
                                }}
                                aria-label="Next photo"
                                className="
                                    absolute
                                    right-4
                                    top-1/2
                                    flex
                                    h-10
                                    w-10
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-black/60
                                    text-white
                                    opacity-0
                                    backdrop-blur-md
                                    transition-all
                                    duration-300
                                    hover:border-sky-400/30
                                    hover:bg-black/80
                                    hover:text-sky-400
                                    group-hover:opacity-100
                                    focus-visible:opacity-100
                                "
                            >
                                <ChevronRight
                                    size={20}
                                />
                            </motion.button>
                        )}


                        {/* DOTS */}

                        {images.length > 1 && (
                            <div
                                className="
                                    absolute
                                    bottom-4
                                    left-1/2
                                    flex
                                    -translate-x-1/2
                                    items-center
                                    gap-2
                                "
                            >
                                {images.map(
                                    (_, imageIndex) => (
                                        <motion.button
                                            key={
                                                imageIndex
                                            }
                                            type="button"
                                            onClick={() =>
                                                selectImage(
                                                    imageIndex
                                                )
                                            }
                                            animate={{
                                                width:
                                                    currentImage ===
                                                    imageIndex
                                                        ? 28
                                                        : 6,
                                                opacity:
                                                    currentImage ===
                                                    imageIndex
                                                        ? 1
                                                        : 0.5,
                                            }}
                                            whileHover={{
                                                opacity: 1,
                                            }}
                                            aria-label={`Go to photo ${
                                                imageIndex +
                                                1
                                            }`}
                                            className="
                                                h-1.5
                                                rounded-full
                                                bg-white
                                            "
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}


            {/* ------------------------------------------------------ */}
            {/* CONTENT                                                   */}
            {/* ------------------------------------------------------ */}

            <div className="relative p-5 sm:p-6">
                <div
                    className="
                        flex
                        flex-col
                        gap-2
                        md:flex-row
                        md:items-start
                        md:justify-between
                    "
                >
                    <div>
                        <motion.p
                            animate={{
                                color: isActive
                                    ? "rgb(56 189 248)"
                                    : "rgb(56 189 248)",
                            }}
                            className="
                                text-sm
                                font-medium
                            "
                        >
                            {experience.event}
                        </motion.p>

                        <h3
                            className="
                                mt-1
                                text-lg
                                font-semibold
                                tracking-tight
                                text-white
                                sm:text-xl
                            "
                        >
                            {experience.role}
                        </h3>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-zinc-500
                            "
                        >
                            {experience.place}
                        </p>
                    </div>


                    {/* YEAR */}

                    <span
                        className={`
                            text-base
                            font-semibold
                            transition-colors
                            duration-300

                            ${
                                isActive
                                    ? "text-sky-400"
                                    : "text-sky-500"
                            }
                        `}
                    >
                        {experience.period}
                    </span>
                </div>


                {/* DESCRIPTION */}

                <p
                    className="
                        mt-5
                        text-justify
                        text-sm
                        leading-relaxed
                        text-zinc-400
                        sm:text-base
                    "
                >
                    {experience.description}
                </p>


                {/* BOTTOM STATUS */}

                <div
                    className="
                        mt-6
                        flex
                        items-center
                        justify-between
                        border-t
                        border-white/10
                        pt-4
                    "
                >
                    <span
                        className="
                            font-mono
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-zinc-700
                        "
                    >
                        Experience
                    </span>

                    {images.length > 1 && (
                        <span
                            className="
                                text-[10px]
                                uppercase
                                tracking-[0.15em]
                                text-zinc-600
                            "
                        >
                            Swipe to explore
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
}


/* ================================================================== */
/* MAIN EXPERIENCE                                                    */
/* ================================================================== */

export default function Experience() {
    const reduce = useReducedMotion();

    const sectionRef =
        useRef<HTMLElement | null>(null);

    const itemRefs =
        useRef<(HTMLDivElement | null)[]>(
            []
        );

    const [activeIndex, setActiveIndex] =
        useState(0);


    /* -------------------------------------------------------------- */
    /* TIMELINE SCROLL PROGRESS                                        */
    /* -------------------------------------------------------------- */

    const {
        scrollYProgress,
    } = useScroll({
        target: sectionRef,
        offset: [
            "start 75%",
            "end 35%",
        ],
    });


    const timelineProgress = useSpring(
        scrollYProgress,
        {
            stiffness: 100,
            damping: 30,
            restDelta: 0.001,
        }
    );


    /* -------------------------------------------------------------- */
    /* ACTIVE EXPERIENCE                                               */
    /* -------------------------------------------------------------- */

    useEffect(() => {
        const elements =
            itemRefs.current.filter(
                Boolean
            ) as HTMLDivElement[];

        if (elements.length === 0) {
            return;
        }

        const observer =
            new IntersectionObserver(
                (entries) => {
                    const visibleEntries =
                        entries.filter(
                            (entry) =>
                                entry.isIntersecting
                        );

                    if (
                        visibleEntries.length ===
                        0
                    ) {
                        return;
                    }

                    const mostVisible =
                        visibleEntries.sort(
                            (
                                a,
                                b
                            ) =>
                                b.intersectionRatio -
                                a.intersectionRatio
                        )[0];

                    const index =
                        Number(
                            mostVisible.target.getAttribute(
                                "data-index"
                            )
                        );

                    if (
                        !Number.isNaN(index)
                    ) {
                        setActiveIndex(index);
                    }
                },
                {
                    threshold: [
                        0.2,
                        0.35,
                        0.5,
                        0.65,
                    ],
                    rootMargin:
                        "-20% 0px -35% 0px",
                }
            );


        elements.forEach((element) =>
            observer.observe(element)
        );


        return () =>
            observer.disconnect();
    }, []);


    return (
        <section
            ref={sectionRef}
            id="experience"
            className="
                scroll-mt-24
                border-t
                border-white/10
                px-6
                py-24
            "
        >
            <div className="mx-auto max-w-6xl">

                {/* ================================================== */}
                {/* HEADER                                             */}
                {/* ================================================== */}

                <motion.div
                    initial={
                        reduce
                            ? {
                                  opacity: 0,
                              }
                            : {
                                  opacity: 0,
                                  y: 25,
                              }
                    }
                    whileInView={
                        reduce
                            ? {
                                  opacity: 1,
                              }
                            : {
                                  opacity: 1,
                                  y: 0,
                              }
                    }
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={
                        reduce
                            ? {
                                  duration: 0,
                              }
                            : {
                                  duration: 0.6,
                                  ease: "easeOut",
                              }
                    }
                >
                    <p
                        className="
                            text-sm
                            font-medium
                            tracking-[0.2em]
                            text-sky-400
                        "
                    >
                        EXPERIENCE
                    </p>

                    <h2
                        className="
                            mt-4
                            max-w-2xl
                            text-3xl
                            font-semibold
                            tracking-tight
                            md:text-5xl
                        "
                    >
                        Experiences that shape
                        how I learn and build.
                    </h2>

                    <p
                        className="
                            mt-5
                            max-w-2xl
                            text-base
                            leading-relaxed
                            text-zinc-500
                            sm:text-lg
                        "
                    >
                        A collection of experiences
                        where I learned through
                        collaboration, participation,
                        and hands-on activities.
                    </p>
                </motion.div>


                {/* ================================================== */}
                {/* TIMELINE                                           */}
                {/* ================================================== */}

                <div className="relative mt-14">

                    {/* ------------------------------------------------ */}
                    {/* TIMELINE BASE LINE                              */}
                    {/* ------------------------------------------------ */}

                    <div
                        aria-hidden="true"
                        className="
                            absolute
                            left-[7px]
                            top-2
                            h-[calc(100%-8px)]
                            w-px
                            bg-white/10
                        "
                    />


                    {/* ------------------------------------------------ */}
                    {/* TIMELINE ACTIVE LINE                            */}
                    {/* ------------------------------------------------ */}

                    <motion.div
                        aria-hidden="true"
                        className="
                            absolute
                            left-[7px]
                            top-2
                            h-[calc(100%-8px)]
                            w-px
                            origin-top
                            bg-gradient-to-b
                            from-sky-400
                            via-sky-400/70
                            to-transparent
                        "
                        style={{
                            scaleY: reduce
                                ? 1
                                : timelineProgress,
                        }}
                    />


                    {/* ------------------------------------------------ */}
                    {/* EXPERIENCE ITEMS                                */}
                    {/* ------------------------------------------------ */}

                    <div className="space-y-10">
                        {experiences.map(
                            (
                                experience,
                                index
                            ) => {
                                const isActive =
                                    activeIndex ===
                                    index;

                                return (
                                    <div
                                        key={`${experience.event}-${experience.role}`}
                                        ref={(node) => {
                                            itemRefs.current[
                                                index
                                            ] = node;
                                        }}
                                        data-index={
                                            index
                                        }
                                        className="
                                            relative
                                            pl-10
                                        "
                                    >

                                        {/* ================================= */}
                                        {/* TIMELINE NODE                     */}
                                        {/* ================================= */}

                                        <motion.div
                                            animate={
                                                isActive
                                                    ? {
                                                          scale: 1.15,
                                                          borderColor:
                                                              "rgb(56 189 248)",
                                                          boxShadow:
                                                              "0 0 0 5px rgba(56,189,248,0.08), 0 0 20px rgba(56,189,248,0.35)",
                                                      }
                                                    : {
                                                          scale: 1,
                                                          borderColor:
                                                              "rgb(63 63 70)",
                                                          boxShadow:
                                                              "0 0 0 0 rgba(56,189,248,0)",
                                                      }
                                            }
                                            transition={{
                                                duration: 0.35,
                                                ease: "easeOut",
                                            }}
                                            className="
                                                absolute
                                                left-0
                                                top-2
                                                h-4
                                                w-4
                                                rounded-full
                                                border-2
                                                bg-[#0a0a0a]
                                            "
                                        />

                                        {/* INNER DOT */}

                                        <motion.div
                                            animate={{
                                                scale:
                                                    isActive
                                                        ? 1
                                                        : 0,
                                                opacity:
                                                    isActive
                                                        ? 1
                                                        : 0,
                                            }}
                                            transition={{
                                                duration: 0.25,
                                            }}
                                            className="
                                                absolute
                                                left-1/2
                                                top-1/2
                                                h-1.5
                                                w-1.5
                                                -translate-x-1/2
                                                -translate-y-1/2
                                                rounded-full
                                                bg-sky-400
                                            "
                                        />


                                        {/* CARD */}

                                        <ExperienceCard
                                            experience={
                                                experience
                                            }
                                            index={
                                                index
                                            }
                                            isActive={
                                                isActive
                                            }
                                            reduce={
                                                Boolean(
                                                    reduce
                                                )
                                            }
                                        />
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>


                {/* ================================================== */}
                {/* TIMELINE FOOTER                                    */}
                {/* ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.5,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                    }}
                    className="
                        mt-12
                        flex
                        items-center
                        gap-3
                        pl-10
                    "
                >
                    <span
                        className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-sky-400
                            shadow-[0_0_10px_rgba(56,189,248,0.7)]
                        "
                    />

                    <span
                        className="
                            font-mono
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-zinc-700
                        "
                    >
                        End of experience
                    </span>
                </motion.div>

            </div>
        </section>
    );
}