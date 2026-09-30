
"use client";

import { motion, useReducedMotion } from "motion/react";
import {
    ArrowUpRight,
    Database,
    Cpu,
    Code2,
    Wrench,
    Search,
    X,
    List,
    Network,
} from "lucide-react";
import { useEffect, useState } from "react";

import { openProject } from "@/lib/projectEvents";

/* ================================================================== */
/* TYPES                                                              */
/* ================================================================== */

type Category = "AI / ML" | "Software" | "Data" | "Tools";

type Technology = {
    name: string;
    category: Category;
    note: string;
    projects: string[];
};

type Project = {
    id: string;
    name: string;
    description: string;
    technologies: string[];
};

type ViewMode = "list" | "map";

/* ================================================================== */
/* DATA                                                               */
/* ================================================================== */

const projects: Project[] = [
    {
        id: "rag",
        name: "Diabetes RAG Chatbot",
        description:
            "A Retrieval-Augmented Generation chatbot for diabetes-related question answering using semantic retrieval and a language model.",
        technologies: [
            "Python",
            "Transformers",
            "FAISS",
            "LoRA",
            "Pandas",
            "NumPy",
            "Hugging Face",
        ],
    },

    {
        id: "lung-cancer",
        name: "Lung Cancer Detection",
        description:
            "A Deep learning and computer vision project focused on detecting lung cancer from medical imaging data.",
        technologies: [
            "Python",
            "PyTorch",
            "Scikit-learn",
            "Computer Vision",
            "Pandas",
            "NumPy",
            "Matplotlib",
        ],
    },

    {
        id: "save",
        name: "Save n Serve",
        description:
            "A food donation platform connecting food givers with recipients through a Flutter application and backend services.",
        technologies: [
            "Dart",
            "Flutter",
            "Express.js",
            "SQL",
            "PostgreSQL",
            "Supabase",
        ],
    },
];

/* ================================================================== */
/* TECHNOLOGIES                                                       */
/* ================================================================== */

const rawTechnologies: [string, Category, string][] = [
    [
        "Python",
        "AI / ML",
        "Main language for data pipelines, model training and RAG logic.",
    ],

    [
        "PyTorch",
        "AI / ML",
        "Training and evaluating the lung imaging model.",
    ],

    [
        "Scikit-learn",
        "AI / ML",
        "Metrics, splits and baseline models.",
    ],

    [
        "Transformers",
        "AI / ML",
        "Loading and running language models.",
    ],

    [
        "FAISS",
        "AI / ML",
        "Vector search to fetch relevant context for answers.",
    ],

    [
        "LoRA",
        "AI / ML",
        "Lightweight fine-tuning of the language model.",
    ],

    [
        "Computer Vision",
        "AI / ML",
        "Reading medical images for detection.",
    ],

    [
        "Next.js",
        "Software",
        "Framework behind this portfolio.",
    ],

    [
        "React",
        "Software",
        "Component-based UI, including this section.",
    ],

    [
        "TypeScript",
        "Software",
        "Typed code for safer front-end work.",
    ],

    [
        "JavaScript",
        "Software",
        "Everyday scripting for web and Node.",
    ],

    [
        "Dart",
        "Software",
        "Language for the Flutter app.",
    ],

    [
        "Flutter",
        "Software",
        "Cross-platform mobile app for Save n Serve.",
    ],

    [
        "Express.js",
        "Software",
        "REST backend for the app.",
    ],

    [
        "Tailwind CSS",
        "Software",
        "Styling and layout across this site.",
    ],

    [
        "Pandas",
        "Data",
        "Cleaning and shaping datasets.",
    ],

    [
        "NumPy",
        "Data",
        "Numerical work and array operations.",
    ],

    [
        "Matplotlib",
        "Data",
        "Plotting training curves and results.",
    ],

    [
        "SciPy",
        "Data",
        "Scientific and statistical computing.",
    ],

    [
        "SQL",
        "Data",
        "Querying and structuring app data.",
    ],

    [
        "PostgreSQL",
        "Data",
        "Relational database for Save n Serve.",
    ],

    [
        "MySQL",
        "Data",
        "Relational database for practice and small apps.",
    ],

    [
        "Git",
        "Tools",
        "Version control for every project.",
    ],

    [
        "GitHub",
        "Tools",
        "Hosting code and collaborating.",
    ],

    [
        "Hugging Face",
        "Tools",
        "Models, tokenizers and datasets hub.",
    ],

    [
        "Supabase",
        "Tools",
        "Hosted Postgres and auth for the app.",
    ],

    [
        "Vercel",
        "Tools",
        "Deploying and previewing web projects.",
    ],
    [
        "HTML",
        "Software",
        "Deploying and previewing web projects.",
    ],
    [
        "Tensorflow",
        "AI / ML",
        "Loading and running language models.",
    ],
];

const technologies: Technology[] = rawTechnologies.map(
    ([name, category, note]) => ({
        name,
        category,
        note,

        projects: projects
            .filter((project) =>
                project.technologies.includes(name)
            )
            .map((project) => project.name),
    })
);

/* ================================================================== */
/* CATEGORIES                                                         */
/* ================================================================== */

const categories: {
    name: Category;
    icon: typeof Cpu;
}[] = [
    {
        name: "AI / ML",
        icon: Cpu,
    },

    {
        name: "Software",
        icon: Code2,
    },

    {
        name: "Data",
        icon: Database,
    },

    {
        name: "Tools",
        icon: Wrench,
    },
];

/* ================================================================== */
/* MAIN COMPONENT                                                     */
/* ================================================================== */

export default function Tools() {
    const reduce = useReducedMotion();

    /* -------------------------------------------------------------- */
    /* STATE                                                           */
    /* -------------------------------------------------------------- */

    const [activeCategory, setActiveCategory] =
        useState<Category>("AI / ML");

    const [view, setView] = useState<ViewMode>("list");

    const [query, setQuery] = useState("");

    const [selectedTechnology, setSelectedTechnology] =
        useState<string | null>(null);

    const [selectedProject, setSelectedProject] =
        useState<string | null>(null);

    /* -------------------------------------------------------------- */
    /* DERIVED STATE                                                   */
    /* -------------------------------------------------------------- */

    const normalizedQuery = query.trim().toLowerCase();
    const searching = normalizedQuery.length > 0;

    const visibleTechnologies = searching
        ? technologies.filter((technology) =>
              technology.name
                  .toLowerCase()
                  .includes(normalizedQuery)
          )
        : technologies.filter(
              (technology) =>
                  technology.category === activeCategory
          );

    const selectedTech = technologies.find(
        (technology) =>
            technology.name === selectedTechnology
    );

    const selectedProjectData = projects.find(
        (project) => project.id === selectedProject
    );

    const hasSelection = Boolean(
        selectedTech || selectedProjectData
    );

    /* -------------------------------------------------------------- */
    /* EFFECTS                                                         */
    /* -------------------------------------------------------------- */

    useEffect(() => {
        const handleKeyDown = (
            event: KeyboardEvent
        ) => {
            if (event.key !== "Escape") return;

            setSelectedTechnology(null);
            setSelectedProject(null);
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
    }, []);

    /* -------------------------------------------------------------- */
    /* HELPERS                                                         */
    /* -------------------------------------------------------------- */

    const clearSelection = () => {
        setSelectedTechnology(null);
        setSelectedProject(null);
    };

    const isTechnologyActive = (
        name: string
    ) => {
        if (selectedProjectData) {
            return selectedProjectData.technologies.includes(
                name
            );
        }

        return selectedTechnology === name;
    };

    const isProjectActive = (
        project: Project
    ) => {
        if (selectedTechnology) {
            return project.technologies.includes(
                selectedTechnology
            );
        }

        return selectedProject === project.id;
    };

    const handleTechnologyClick = (
        name: string
    ) => {
        const technology = technologies.find(
            (item) => item.name === name
        );

        setSelectedProject(null);

        setSelectedTechnology((current) =>
            current === name ? null : name
        );

        if (technology && !searching) {
            setActiveCategory(
                technology.category
            );
        }
    };

    const handleProjectClick = (
        id: string
    ) => {
        setSelectedTechnology(null);

        setSelectedProject((current) =>
            current === id ? null : id
        );
    };

    const handleOpenProject = (
        projectName: string
    ) => {
        console.log(
            "OPENING PROJECT:",
            projectName
        );

        openProject(projectName);
    };

    const fade = (delay = 0) =>
        reduce
            ? { duration: 0 }
            : {
                  duration: 0.25,
                  delay,
              };

    /* -------------------------------------------------------------- */
    /* RENDER                                                          */
    /* -------------------------------------------------------------- */

    return (
        <section
            id="tools"
            className="
                scroll-mt-24
                border-t
                border-white/10
                px-6
                py-24
            "
        >
            <div className="mx-auto max-w-6xl">

                {/* ================================================= */}
                {/* HEADER                                            */}
                {/* ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
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
                        TECH STACK
                    </p>

                    <h2
                        className="
                            mt-4
                            max-w-3xl
                            text-3xl
                            font-semibold
                            tracking-tight
                            md:text-5xl
                        "
                    >
                        Technologies i use to learn and build projects.
        
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
                        Pick a tool to see
                        where I used it, or
                        switch to the map to
                        see how everything
                        connects.
                    </p>
                </motion.div>

                {/* ================================================= */}
                {/* TOOLBAR                                            */}
                {/* ================================================= */}

                <div
                    className="
                        mt-10
                        flex
                        flex-wrap
                        items-center
                        justify-between
                        gap-3
                    "
                >
                    {/* CATEGORY */}

                    <div
                        className={`
                            flex
                            flex-wrap
                            gap-2
                            ${
                                view === "map"
                                    ? "invisible"
                                    : ""
                            }
                        `}
                    >
                        {categories.map(
                            (category) => {
                                const Icon =
                                    category.icon;

                                const active =
                                    !searching &&
                                    activeCategory ===
                                        category.name;

                                return (
                                    <button
                                        key={
                                            category.name
                                        }
                                        type="button"
                                        onClick={() => {
                                            setActiveCategory(
                                                category.name
                                            );

                                            setQuery(
                                                ""
                                            );

                                            clearSelection();
                                        }}
                                        className={`
                                            flex
                                            items-center
                                            gap-2
                                            rounded-full
                                            border
                                            px-4
                                            py-2.5
                                            text-sm
                                            transition-all
                                            duration-300
                                            focus-visible:outline
                                            focus-visible:outline-2
                                            focus-visible:outline-sky-400
                                            ${
                                                active
                                                    ? "border-sky-400/40 bg-sky-400/10 text-sky-400"
                                                    : "border-white/10 bg-white/[0.02] text-zinc-500 hover:border-white/20 hover:text-white"
                                            }
                                        `}
                                    >
                                        <Icon size={15} />

                                        {
                                            category.name
                                        }
                                    </button>
                                );
                            }
                        )}
                    </div>

                    {/* SEARCH + VIEW */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
                        {view === "list" && (
                            <label className="relative">
                                <span className="sr-only">
                                    Search
                                    technologies
                                </span>

                                <Search
                                    size={14}
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-zinc-600
                                    "
                                />

                                <input
                                    value={query}
                                    onChange={(event) =>
                                        setQuery(
                                            event.target
                                                .value
                                        )
                                    }
                                    placeholder="Search all tools"
                                    className="
                                        w-44
                                        rounded-full
                                        border
                                        border-white/10
                                        bg-white/[0.02]
                                        py-2.5
                                        pl-9
                                        pr-8
                                        text-sm
                                        text-white
                                        placeholder:text-zinc-600
                                        focus:border-sky-400/40
                                        focus:outline-none
                                        sm:w-52
                                    "
                                />

                                {searching && (
                                    <button
                                        type="button"
                                        aria-label="Clear search"
                                        onClick={() =>
                                            setQuery(
                                                ""
                                            )
                                        }
                                        className="
                                            absolute
                                            right-2.5
                                            top-1/2
                                            -translate-y-1/2
                                            text-zinc-500
                                            hover:text-white
                                        "
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </label>
                        )}

                        {/* VIEW SWITCH */}

                        <div
                            className="
                                flex
                                rounded-full
                                border
                                border-white/10
                                bg-white/[0.02]
                                p-1
                            "
                        >
                            {(
                                [
                                    {
                                        id: "list",
                                        label: "List",
                                        icon: List,
                                    },
                                    {
                                        id: "map",
                                        label: "Map",
                                        icon: Network,
                                    },
                                ] as const
                            ).map(
                                ({
                                    id,
                                    label,
                                    icon: Icon,
                                }) => (
                                    <button
                                        key={id}
                                        type="button"
                                        aria-pressed={
                                            view === id
                                        }
                                        onClick={() =>
                                            setView(id)
                                        }
                                        className={`
                                            flex
                                            items-center
                                            gap-1.5
                                            rounded-full
                                            px-3
                                            py-1.5
                                            text-xs
                                            transition
                                            ${
                                                view ===
                                                id
                                                    ? "bg-sky-400/10 text-sky-400"
                                                    : "text-zinc-500 hover:text-white"
                                            }
                                        `}
                                    >
                                        <Icon size={13} />
                                        {label}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* ================================================= */}
                {/* MAIN GRID                                          */}
                {/* ================================================= */}

                <div
                    className={`
                        mt-8
                        grid
                        gap-6
                        ${
                            view === "map"
                                ? "lg:grid-cols-[1.25fr_1fr]"
                                : "lg:grid-cols-[1fr_1.2fr]"
                        }
                    `}
                >
                    {/* ================================================= */}
                    {/* LEFT PANEL                                         */}
                    {/* ================================================= */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.02]
                            p-6
                            sm:p-8
                        "
                    >
                        {view === "list" ? (
                            <>
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >
                                    <div>
                                        <p
                                            className="
                                                text-xs
                                                uppercase
                                                tracking-[0.18em]
                                                text-zinc-600
                                            "
                                        >
                                            Technologies
                                        </p>

                                        <h3
                                            className="
                                                mt-2
                                                text-xl
                                                font-semibold
                                                text-white
                                            "
                                        >
                                            {searching
                                                ? `Results for “${query.trim()}”`
                                                : activeCategory}
                                        </h3>
                                    </div>

                                    <span
                                        className="
                                            text-xs
                                            text-zinc-600
                                        "
                                    >
                                        {
                                            visibleTechnologies.length
                                        }{" "}
                                        tools
                                    </span>
                                </div>

                                {visibleTechnologies.length ===
                                0 ? (
                                    <p
                                        className="
                                            mt-8
                                            text-sm
                                            text-zinc-500
                                        "
                                    >
                                        No tool
                                        matches “
                                        {query.trim()}
                                        ”.
                                    </p>
                                ) : (
                                    <div
                                        className="
                                            mt-8
                                            grid
                                            grid-cols-2
                                            gap-2
                                            sm:grid-cols-3
                                        "
                                    >
                                        {visibleTechnologies.map(
                                            (
                                                technology,
                                                index
                                            ) => {
                                                const active =
                                                    isTechnologyActive(
                                                        technology.name
                                                    );

                                                return (
                                                    <motion.button
                                                        key={
                                                            technology.name
                                                        }
                                                        type="button"
                                                        initial={{
                                                            opacity: 0,
                                                            y: 12,
                                                        }}
                                                        animate={{
                                                            opacity:
                                                                hasSelection
                                                                    ? active
                                                                        ? 1
                                                                        : 0.3
                                                                    : 1,
                                                            y: 0,
                                                            scale:
                                                                active
                                                                    ? 1.03
                                                                    : 1,
                                                        }}
                                                        transition={fade(
                                                            index *
                                                                0.03
                                                        )}
                                                        onClick={() =>
                                                            handleTechnologyClick(
                                                                technology.name
                                                            )
                                                        }
                                                        className={`
                                                            group
                                                            rounded-xl
                                                            border
                                                            px-3
                                                            py-4
                                                            text-left
                                                            transition-all
                                                            duration-300
                                                            focus-visible:outline
                                                            focus-visible:outline-2
                                                            focus-visible:outline-sky-400
                                                            ${
                                                                active
                                                                    ? "border-sky-400/40 bg-sky-400/10"
                                                                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                                                            }
                                                        `}
                                                    >
                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                justify-between
                                                                gap-2
                                                            "
                                                        >
                                                            <span
                                                                className={`
                                                                    text-sm
                                                                    font-medium
                                                                    ${
                                                                        active
                                                                            ? "text-sky-400"
                                                                            : "text-zinc-300 group-hover:text-white"
                                                                    }
                                                                `}
                                                            >
                                                                {
                                                                    technology.name
                                                                }
                                                            </span>

                                                            <ArrowUpRight
                                                                size={
                                                                    14
                                                                }
                                                                className="
                                                                    text-zinc-700
                                                                    transition
                                                                    group-hover:text-zinc-400
                                                                "
                                                            />
                                                        </div>
                                                    </motion.button>
                                                );
                                            }
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <p
                                    className="
                                        text-xs
                                        uppercase
                                        tracking-[0.18em]
                                        text-zinc-600
                                    "
                                >
                                    Stack map
                                </p>

                                <h3
                                    className="
                                        mt-2
                                        text-xl
                                        font-semibold
                                        text-white
                                    "
                                >
                                    Projects and
                                    the tools
                                    inside them
                                </h3>

                                <div
                                    className="
                                        mt-6
                                        overflow-x-auto
                                    "
                                >
                                    <StackMap
                                        selectedTechnology={
                                            selectedTechnology
                                        }
                                        selectedProject={
                                            selectedProject
                                        }
                                        onTechnology={
                                            handleTechnologyClick
                                        }
                                        onProject={
                                            handleProjectClick
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {/* ================================================= */}
                    {/* DETAIL PANEL                                       */}
                    {/* ================================================= */}

                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.02]
                            p-6
                            sm:p-8
                        "
                    >
                        <div
                            className="
                                pointer-events-none
                                absolute
                                -right-24
                                -top-24
                                h-64
                                w-64
                                rounded-full
                                bg-sky-400/[0.04]
                                blur-3xl
                            "
                        />

                        <div
                            className="relative"
                            aria-live="polite"
                        >
                            {selectedTech ? (
                                <TechnologyDetail
                                    technology={
                                        selectedTech
                                    }
                                    onProjectClick={
                                        handleProjectClick
                                    }
                                    onTechnologyClick={
                                        handleTechnologyClick
                                    }
                                    isProjectActive={
                                        isProjectActive
                                    }
                                />
                            ) : selectedProjectData ? (
                                <ProjectDetail
                                    project={
                                        selectedProjectData
                                    }
                                    onTechnologyClick={
                                        handleTechnologyClick
                                    }
                                    isTechnologyActive={
                                        isTechnologyActive
                                    }
                                    onOpenProject={
                                        handleOpenProject
                                    }
                                />
                            ) : (
                                <EmptyState
                                    view={view}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* ================================================= */}
                {/* CONNECTED PROJECTS                                */}
                {/* ================================================= */}

                <div className="mt-12">
                    <div
                        className="
                            flex
                            items-end
                            justify-between
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-xs
                                    uppercase
                                    tracking-[0.18em]
                                    text-zinc-600
                                "
                            >
                                Connected Projects
                            </p>

                            <h3
                                className="
                                    mt-2
                                    text-xl
                                    font-semibold
                                    text-white
                                "
                            >
                                See the
                                technologies
                                in context.
                            </h3>
                        </div>

                        {hasSelection && (
                            <button
                                type="button"
                                onClick={
                                    clearSelection
                                }
                                className="
                                    text-xs
                                    text-zinc-500
                                    transition
                                    hover:text-white
                                "
                            >
                                Clear selection
                                (Esc)
                            </button>
                        )}
                    </div>

                    <div
                        className="
                            mt-6
                            grid
                            gap-4
                            md:grid-cols-3
                        "
                    >
                        {projects.map(
                            (
                                project,
                                index
                            ) => {
                                const active =
                                    isProjectActive(
                                        project
                                    );

                                return (
                                    <motion.button
                                        key={
                                            project.id
                                        }
                                        type="button"
                                        initial={{
                                            opacity: 0,
                                            y: 20,
                                        }}
                                        whileInView={{
                                            opacity:
                                                hasSelection
                                                    ? active
                                                        ? 1
                                                        : 0.3
                                                    : 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            amount: 0.2,
                                        }}
                                        transition={
                                            reduce
                                                ? {
                                                      duration: 0,
                                                  }
                                                : {
                                                      duration: 0.5,
                                                      delay:
                                                          index *
                                                          0.08,
                                                  }
                                        }
                                        onClick={() =>
                                            handleProjectClick(
                                                project.id
                                            )
                                        }
                                        className={`
                                            group
                                            rounded-2xl
                                            border
                                            p-5
                                            text-left
                                            transition-all
                                            duration-300
                                            focus-visible:outline
                                            focus-visible:outline-2
                                            focus-visible:outline-sky-400
                                            ${
                                                active
                                                    ? "border-sky-400/40 bg-sky-400/5"
                                                    : "border-white/10 bg-white/[0.02] hover:-translate-y-1 hover:border-white/20"
                                            }
                                        `}
                                    >
                                        <div
                                            className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-4
                                            "
                                        >
                                            <h4
                                                className={`
                                                    font-semibold
                                                    ${
                                                        active
                                                            ? "text-sky-400"
                                                            : "text-white"
                                                    }
                                                `}
                                            >
                                                {
                                                    project.name
                                                }
                                            </h4>

                                            <ArrowUpRight
                                                size={
                                                    16
                                                }
                                                className="
                                                    shrink-0
                                                    text-zinc-700
                                                    transition
                                                    group-hover:text-zinc-400
                                                "
                                            />
                                        </div>

                                        <p
                                            className="
                                                mt-3
                                                text-sm
                                                leading-relaxed
                                                text-zinc-500
                                            "
                                        >
                                            {
                                                project.description
                                            }
                                        </p>

                                        <div
                                            className="
                                                mt-5
                                                flex
                                                flex-wrap
                                                gap-1.5
                                            "
                                        >
                                            {project.technologies.map(
                                                (
                                                    technology
                                                ) => (
                                                    <span
                                                        key={
                                                            technology
                                                        }
                                                        className={`
                                                            rounded-full
                                                            border
                                                            px-2
                                                            py-1
                                                            text-[10px]
                                                            ${
                                                                selectedTechnology ===
                                                                technology
                                                                    ? "border-sky-400/60 bg-sky-400/10 text-sky-400"
                                                                    : active
                                                                    ? "border-sky-400/20 text-sky-400/80"
                                                                    : "border-white/10 text-zinc-600"
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            technology
                                                        }
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </motion.button>
                                );
                            }
                        )}
                    </div>
                </div>

                {/* ================================================= */}
                {/* CURRENTLY EXPLORING                               */}
                {/* ================================================= */}

                <div
                    className="
                        mt-12
                        text-center
                    "
                >
                    <p
                        className="
                            text-xs
                            uppercase
                            tracking-[0.2em]
                            text-zinc-600
                        "
                    >
                        Currently exploring
                    </p>

                    <div
                        className="
                            mt-4
                            flex
                            flex-wrap
                            justify-center
                            gap-2
                        "
                    >
                        {[
                            "Machine Learning",
                            "LLM",
                            "Deep Learning",
                            "Computer Vision",
                            "Software",
                        ].map((item) => (
                            <span
                                key={item}
                                className="
                                    rounded-full
                                    border
                                    border-dashed
                                    border-white/15
                                    px-3
                                    py-1.5
                                    text-sm
                                    text-zinc-400
                                "
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ================================================================== */
/* EMPTY STATE                                                        */
/* ================================================================== */

function EmptyState({
    view,
}: {
    view: ViewMode;
}) {
    return (
        <div
            className="
                flex
                min-h-[320px]
                flex-col
                justify-center
            "
        >
            <div
                className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                "
            >
                <span
                    className="
                        text-lg
                        font-bold
                    "
                >
                    <span className="text-sky-400">
                        K
                    </span>

                    <span className="text-white">
                        W
                    </span>
                </span>
            </div>

            <h3
                className="
                    mt-8
                    text-2xl
                    font-semibold
                    text-white
                "
            >
                {view === "map"
                    ? "Select a project or tool"
                    : "Select a technology"}
            </h3>

            <p
                className="
                    mt-3
                    max-w-md
                    text-sm
                    leading-relaxed
                    text-zinc-500
                "
            >
                {view === "map"
                    ? "Click any node on the map. Its connections light up and the details appear here."
                    : "Choose a tool to see where I've used it and what it's often paired with."}
            </p>
        </div>
    );
}

/* ================================================================== */
/* STACK MAP                                                          */
/* ================================================================== */

function StackMap({
    selectedTechnology,
    selectedProject,
    onTechnology,
    onProject,
}: {
    selectedTechnology: string | null;
    selectedProject: string | null;
    onTechnology: (name: string) => void;
    onProject: (id: string) => void;
}) {
    const ROW = 30;
    const W = 520;

    const linked = technologies
        .filter(
            (technology) =>
                technology.projects.length > 0
        )
        .sort(
            (a, b) =>
                projects.findIndex(
                    (project) =>
                        project.name ===
                        a.projects[0]
                ) -
                projects.findIndex(
                    (project) =>
                        project.name ===
                        b.projects[0]
                )
        );

    const H =
        linked.length * ROW + 20;

    const techY = (index: number) =>
        10 +
        index * ROW +
        ROW / 2;

    const projY = (index: number) =>
        ((index + 0.5) * H) /
        projects.length;

    const any = Boolean(
        selectedTechnology ||
            selectedProject
    );

    const keyActivate =
        (callback: () => void) =>
        (
            event: React.KeyboardEvent
        ) => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                callback();
            }
        };

    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            className="
                min-w-[460px]
                w-full
            "
            role="group"
            aria-label="Map of projects and technologies"
        >
            {/* ===================================================== */}
            {/* LINKS                                                 */}
            {/* ===================================================== */}

            {projects.map(
                (
                    project,
                    projectIndex
                ) =>
                    project.technologies.map(
                        (name) => {
                            const technologyIndex =
                                linked.findIndex(
                                    (
                                        technology
                                    ) =>
                                        technology.name ===
                                        name
                                );

                            if (
                                technologyIndex <
                                0
                            ) {
                                return null;
                            }

                            const active =
                                selectedProject ===
                                    project.id ||
                                selectedTechnology ===
                                    name;

                            const y1 =
                                projY(
                                    projectIndex
                                );

                            const y2 =
                                techY(
                                    technologyIndex
                                );

                            return (
                                <path
                                    key={`${project.id}-${name}`}
                                    d={`M150 ${y1} C 270 ${y1}, 290 ${y2}, 380 ${y2}`}
                                    fill="none"
                                    strokeWidth={
                                        active
                                            ? 1.75
                                            : 1
                                    }
                                    className={`
                                        transition-all
                                        duration-300
                                        ${
                                            active
                                                ? "stroke-sky-400"
                                                : any
                                                ? "stroke-white/[0.04]"
                                                : "stroke-white/15"
                                        }
                                    `}
                                />
                            );
                        }
                    )
            )}

            {/* ===================================================== */}
            {/* PROJECTS                                               */}
            {/* ===================================================== */}

            {projects.map(
                (
                    project,
                    index
                ) => {
                    const active =
                        selectedProject ===
                            project.id ||
                        (selectedTechnology !==
                            null &&
                            project.technologies.includes(
                                selectedTechnology
                            ));

                    return (
                        <g
                            key={
                                project.id
                            }
                            role="button"
                            tabIndex={0}
                            aria-pressed={
                                selectedProject ===
                                project.id
                            }
                            onClick={() =>
                                onProject(
                                    project.id
                                )
                            }
                            onKeyDown={keyActivate(
                                () =>
                                    onProject(
                                        project.id
                                    )
                            )}
                            className="
                                cursor-pointer
                                outline-none
                                [&:focus-visible>rect]:stroke-sky-400
                            "
                            opacity={
                                any &&
                                !active
                                    ? 0.35
                                    : 1
                            }
                        >
                            <rect
                                x={0}
                                y={
                                    projY(
                                        index
                                    ) - 22
                                }
                                width={150}
                                height={44}
                                rx={12}
                                strokeWidth={1}
                                className={
                                    active
                                        ? "fill-sky-400/10 stroke-sky-400/50"
                                        : "fill-white/[0.03] stroke-white/15"
                                }
                            />

                            <text
                                x={75}
                                y={
                                    projY(
                                        index
                                    ) + 4
                                }
                                textAnchor="middle"
                                fontSize={12}
                                fontWeight={600}
                                className={
                                    active
                                        ? "fill-sky-400"
                                        : "fill-white"
                                }
                            >
                                {
                                    project.name
                                }
                            </text>
                        </g>
                    );
                }
            )}

            {/* ===================================================== */}
            {/* TECHNOLOGIES                                          */}
            {/* ===================================================== */}

            {linked.map(
                (
                    technology,
                    index
                ) => {
                    const active =
                        selectedTechnology ===
                            technology.name ||
                        (selectedProject !==
                            null &&
                            projects
                                .find(
                                    (
                                        project
                                    ) =>
                                        project.id ===
                                        selectedProject
                                )
                                ?.technologies.includes(
                                    technology.name
                                ));

                    return (
                        <g
                            key={
                                technology.name
                            }
                            role="button"
                            tabIndex={0}
                            aria-pressed={
                                selectedTechnology ===
                                technology.name
                            }
                            onClick={() =>
                                onTechnology(
                                    technology.name
                                )
                            }
                            onKeyDown={keyActivate(
                                () =>
                                    onTechnology(
                                        technology.name
                                    )
                            )}
                            className="
                                cursor-pointer
                                outline-none
                                [&:focus-visible>circle]:stroke-sky-400
                            "
                            opacity={
                                any &&
                                !active
                                    ? 0.35
                                    : 1
                            }
                        >
                            <rect
                                x={370}
                                y={
                                    techY(
                                        index
                                    ) -
                                    ROW / 2
                                }
                                width={150}
                                height={ROW}
                                fill="transparent"
                            />

                            <circle
                                cx={380}
                                cy={techY(
                                    index
                                )}
                                r={
                                    active
                                        ? 5
                                        : 4
                                }
                                strokeWidth={1.5}
                                className={
                                    active
                                        ? "fill-sky-400 stroke-sky-400"
                                        : "fill-zinc-900 stroke-zinc-500"
                                }
                            />

                            <text
                                x={394}
                                y={
                                    techY(
                                        index
                                    ) + 4
                                }
                                fontSize={12}
                                className={
                                    active
                                        ? "fill-sky-400"
                                        : "fill-zinc-400"
                                }
                            >
                                {
                                    technology.name
                                }
                            </text>
                        </g>
                    );
                }
            )}
        </svg>
    );
}

/* ================================================================== */
/* TECHNOLOGY DETAIL                                                  */
/* ================================================================== */

function TechnologyDetail({
    technology,
    onProjectClick,
    onTechnologyClick,
    isProjectActive,
}: {
    technology: Technology;
    onProjectClick: (id: string) => void;
    onTechnologyClick: (name: string) => void;
    isProjectActive: (
        project: Project
    ) => boolean;
}) {
    const relatedProjects =
        projects.filter((project) =>
            technology.projects.includes(
                project.name
            )
        );

    const pairedWith = Object.entries(
        relatedProjects
            .flatMap(
                (project) =>
                    project.technologies
            )
            .filter(
                (name) =>
                    name !== technology.name
            )
            .reduce<Record<string, number>>(
                (
                    accumulator,
                    name
                ) => ({
                    ...accumulator,
                    [name]:
                        (accumulator[name] ??
                            0) + 1,
                }),
                {}
            )
    )
        .sort(
            (a, b) =>
                b[1] - a[1]
        )
        .slice(0, 6)
        .map(([name]) => name);

    return (
        <motion.div
            key={technology.name}
            initial={{
                opacity: 0,
                x: 15,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            transition={{
                duration: 0.3,
            }}
        >
            <p
                className="
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-sky-400
                "
            >
                {technology.category}
            </p>

            <h3
                className="
                    mt-3
                    text-3xl
                    font-semibold
                    text-white
                "
            >
                {technology.name}
            </h3>

            <p
                className="
                    mt-4
                    max-w-md
                    text-sm
                    leading-relaxed
                    text-zinc-400
                "
            >
                {technology.note}
            </p>

            <div
                className="
                    mt-8
                    h-px
                    bg-white/10
                "
            />

            {relatedProjects.length >
            0 ? (
                <>
                    {/* USED IN */}

                    <div className="mt-8">
                        <p
                            className="
                                text-sm
                                font-medium
                                text-white
                            "
                        >
                            Used in
                        </p>

                        <div
                            className="
                                mt-3
                                space-y-2
                            "
                        >
                            {relatedProjects.map(
                                (
                                    project
                                ) => {
                                    const active =
                                        isProjectActive(
                                            project
                                        );

                                    return (
                                        <button
                                            key={
                                                project.id
                                            }
                                            type="button"
                                            onClick={() =>
                                                onProjectClick(
                                                    project.id
                                                )
                                            }
                                            className={`
                                                group
                                                flex
                                                w-full
                                                items-center
                                                justify-between
                                                rounded-xl
                                                border
                                                px-4
                                                py-3
                                                text-left
                                                transition-all
                                                duration-200
                                                ${
                                                    active
                                                        ? "border-sky-400/30 bg-sky-400/5"
                                                        : "border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                                                }
                                            `}
                                        >
                                            <span
                                                className={`
                                                    text-sm
                                                    ${
                                                        active
                                                            ? "text-sky-400"
                                                            : "text-zinc-300 group-hover:text-white"
                                                    }
                                                `}
                                            >
                                                {
                                                    project.name
                                                }
                                            </span>

                                            <ArrowUpRight
                                                size={
                                                    15
                                                }
                                                className="
                                                    text-zinc-600
                                                    transition-transform
                                                    duration-200
                                                    group-hover:-translate-y-0.5
                                                    group-hover:translate-x-0.5
                                                    group-hover:text-sky-400
                                                "
                                            />
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    </div>

                    {/* PAIRED */}

                    {pairedWith.length >
                        0 && (
                        <div className="mt-8">
                            <p
                                className="
                                    text-sm
                                    font-medium
                                    text-white
                                "
                            >
                                Often paired
                                with
                            </p>

                            <div
                                className="
                                    mt-3
                                    flex
                                    flex-wrap
                                    gap-2
                                "
                            >
                                {pairedWith.map(
                                    (
                                        name
                                    ) => (
                                        <button
                                            key={
                                                name
                                            }
                                            type="button"
                                            onClick={() =>
                                                onTechnologyClick(
                                                    name
                                                )
                                            }
                                            className="
                                                rounded-full
                                                border
                                                border-white/10
                                                px-3
                                                py-1.5
                                                text-xs
                                                text-zinc-400
                                                transition
                                                hover:border-sky-400/30
                                                hover:bg-sky-400/5
                                                hover:text-sky-400
                                            "
                                        >
                                            {
                                                name
                                            }
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div
                    className="
                        mt-8
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.02]
                        p-4
                    "
                >
                    <p
                        className="
                            text-sm
                            text-zinc-500
                        "
                    >
                        Part of my
                        everyday toolkit.
                        Not tied to a
                        showcased
                        project yet.
                    </p>
                </div>
            )}
        </motion.div>
    );
}

/* ================================================================== */
/* PROJECT DETAIL                                                     */
/* ================================================================== */

function ProjectDetail({
    project,
    onTechnologyClick,
    isTechnologyActive,
    onOpenProject,
}: {
    project: Project;
    onTechnologyClick: (
        name: string
    ) => void;
    isTechnologyActive: (
        name: string
    ) => boolean;
    onOpenProject: (
        projectName: string
    ) => void;
}) {
    return (
        <motion.div
            key={project.id}
            initial={{
                opacity: 0,
                x: 15,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            transition={{
                duration: 0.3,
            }}
        >
            {/* PROJECT */}

            <p
                className="
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-sky-400
                "
            >
                Project
            </p>

            <h3
                className="
                    mt-3
                    text-3xl
                    font-semibold
                    text-white
                "
            >
                {project.name}
            </h3>

            <p
                className="
                    mt-5
                    max-w-lg
                    text-sm
                    leading-relaxed
                    text-zinc-500
                "
            >
                {project.description}
            </p>

            {/* TECHNOLOGIES */}

            <div className="mt-8">
                <p
                    className="
                        text-sm
                        font-medium
                        text-white
                    "
                >
                    Technologies used
                </p>

                <div
                    className="
                        mt-4
                        flex
                        flex-wrap
                        gap-2
                    "
                >
                    {project.technologies.map(
                        (name) => {
                            const active =
                                isTechnologyActive(
                                    name
                                );

                            return (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() =>
                                        onTechnologyClick(
                                            name
                                        )
                                    }
                                    className={`
                                        rounded-full
                                        border
                                        px-3
                                        py-2
                                        text-xs
                                        transition
                                        ${
                                            active
                                                ? "border-sky-400/40 bg-sky-400/10 text-sky-400"
                                                : "border-white/10 text-zinc-400 hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
                                        }
                                    `}
                                >
                                    {name}
                                </button>
                            );
                        }
                    )}
                </div>
            </div>

            {/* VIEW PROJECT */}

            <div
                className="
                    mt-8
                    border-t
                    border-white/10
                    pt-6
                "
            >
                <button
                    type="button"
                    onClick={() =>
                        onOpenProject(
                            project.name
                        )
                    }
                    className="
                        group
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-xl
                        border
                        border-sky-400/20
                        bg-sky-400/[0.04]
                        px-4
                        py-4
                        text-left
                        transition-all
                        duration-300
                        hover:border-sky-400/40
                        hover:bg-sky-400/[0.08]
                        hover:shadow-[0_0_30px_rgba(56,189,248,0.06)]
                    "
                >
                    <div>
                        <p
                            className="
                                text-sm
                                font-medium
                                text-white
                            "
                        >
                            View Project
                        </p>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-zinc-500
                            "
                        >
                            Open the full
                            project
                            showcase
                        </p>
                    </div>

                    <ArrowUpRight
                        size={18}
                        className="
                            text-sky-400
                            transition-transform
                            duration-300
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                        "
                    />
                </button>
            </div>
        </motion.div>
    );
}
