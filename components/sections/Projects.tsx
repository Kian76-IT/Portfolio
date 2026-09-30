"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { Code2 } from "lucide-react";

import { projects } from "@/data/projects";

import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
import Reveal from "../ui/Reveal";

import {
    OPEN_PROJECT_EVENT,
    type OpenProjectEventDetail,
} from "@/lib/projectEvents";

export default function Projects() {
    // ==========================================
    // SELECTED PROJECT
    // ==========================================

    const [
        selectedProjectIndex,
        setSelectedProjectIndex,
    ] = useState<number | null>(null);

    // ==========================================
    // OPEN PROJECT
    // ==========================================

    const openProject = useCallback(
        (index: number) => {
            setSelectedProjectIndex(index);
        },
        []
    );

    // ==========================================
    // CLOSE PROJECT
    // ==========================================

    const closeProject = useCallback(() => {
        setSelectedProjectIndex(null);
    }, []);

    // ==========================================
    // PREVIOUS PROJECT
    // ==========================================

    const goToPreviousProject =
        useCallback(() => {
            setSelectedProjectIndex((current) => {
                if (current === null) {
                    return null;
                }

                return current === 0
                    ? projects.length - 1
                    : current - 1;
            });
        }, []);

    // ==========================================
    // NEXT PROJECT
    // ==========================================

    const goToNextProject =
        useCallback(() => {
            setSelectedProjectIndex((current) => {
                if (current === null) {
                    return null;
                }

                return current ===
                    projects.length - 1
                    ? 0
                    : current + 1;
            });
        }, []);

    // ==========================================
    // OPEN PROJECT FROM TOOLS
    // ==========================================

    useEffect(() => {
    const handleOpenProject = (
        event: Event
    ) => {
        const customEvent =
            event as CustomEvent<OpenProjectEventDetail>;

        const projectName =
            customEvent.detail?.projectName;

        console.log(
            "OPEN PROJECT EVENT:",
            projectName
        );

        if (!projectName) return;

        const index =
    projects.findIndex(
        (project) =>
            project.title.trim().toLowerCase() ===
            projectName.trim().toLowerCase()
    );

        console.log(
            "PROJECT INDEX:",
            index
        );

        if (index === -1) {
            console.warn(
                "Project not found:",
                projectName
            );
            return;
        }

        setSelectedProjectIndex(index);
    };

    window.addEventListener(
        OPEN_PROJECT_EVENT,
        handleOpenProject
    );

    return () => {
        window.removeEventListener(
            OPEN_PROJECT_EVENT,
            handleOpenProject
        );
    };
}, []);

    // ==========================================
    // SELECTED PROJECT
    // ==========================================

    const selectedProject =
        selectedProjectIndex !== null
            ? projects[selectedProjectIndex]
            : null;

    // ==========================================
    // PREVIOUS PROJECT DATA
    // ==========================================

    const previousProject =
        selectedProjectIndex !== null
            ? projects[
                  selectedProjectIndex === 0
                      ? projects.length - 1
                      : selectedProjectIndex - 1
              ]
            : null;

    // ==========================================
    // NEXT PROJECT DATA
    // ==========================================

    const nextProject =
        selectedProjectIndex !== null
            ? projects[
                  selectedProjectIndex ===
                  projects.length - 1
                      ? 0
                      : selectedProjectIndex + 1
              ]
            : null;

    return (
        <>
            {/* ========================================= */}
            {/* PROJECT SECTION                            */}
            {/* ========================================= */}

            <section
                id="projects"
                className="
                    scroll-mt-24
                    border-t
                    border-white/10
                    px-6
                    py-24
                "
            >
                <div className="mx-auto max-w-6xl">

                    {/* ================================= */}
                    {/* SECTION LABEL                      */}
                    {/* ================================= */}

                    <p
                        className="
                            text-sm
                            font-medium
                            tracking-[0.2em]
                            text-sky-400
                        "
                    >
                        PROJECTS
                    </p>

                    {/* ================================= */}
                    {/* SECTION TITLE                      */}
                    {/* ================================= */}

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
                        Things I&apos;ve built.
                    </h2>

                    {/* ================================= */}
                    {/* PROJECT CARDS                      */}
                    {/* ================================= */}

                    <div
                        className="
                            mt-12
                            grid
                            gap-8
                            md:grid-cols-2
                        "
                    >
                        {projects.map(
                            (
                                project,
                                index
                            ) => (
                                <Reveal
                                    key={
                                        project.title
                                    }
                                    delay={
                                        index *
                                        0.1
                                    }
                                >
                                    <ProjectCard
                                        title={
                                            project.title
                                        }
                                        roles={
                                            project.roles
                                        }
                                        description={
                                            project.description
                                        }
                                        tech={
                                            project.tech
                                        }
                                        image={
                                            project.image
                                        }
                                        repo={
                                            project.repo
                                        }
                                        demo={
                                            project.demo
                                        }
                                        onOpen={() =>
                                            openProject(
                                                index
                                            )
                                        }
                                    />
                                </Reveal>
                            )
                        )}
                    </div>

                    {/* ================================= */}
                    {/* GITHUB BUTTON                      */}
                    {/* ================================= */}

                    <div
                        className="
                            mt-12
                            flex
                            justify-center
                        "
                    >
                        <a
                            href="https://github.com/Kian76-IT"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                group
                                flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-white/15
                                bg-white/[0.03]
                                px-6
                                py-3
                                text-sm
                                font-medium
                                text-white
                                transition-all
                                duration-200
                                hover:-translate-y-0.5
                                hover:border-white/30
                                hover:bg-white/[0.08]
                            "
                        >
                            <Code2
                                size={18}
                                className="
                                    transition-transform
                                    duration-200
                                    group-hover:rotate-6
                                "
                            />

                            View All Projects on GitHub
                        </a>
                    </div>
                </div>
            </section>

            {/* ========================================= */}
            {/* PROJECT MODAL                              */}
            {/* ========================================= */}

            <ProjectModal
    project={selectedProject}
    previousProjectName={
        previousProject?.title ?? ""
    }
    nextProjectName={
        nextProject?.title ?? ""
    }
    currentIndex={
        selectedProjectIndex ?? 0
    }
    totalProjects={projects.length}
    onClose={closeProject}
    onPrevious={goToPreviousProject}
    onNext={goToNextProject}
/>
        </>
    );
}