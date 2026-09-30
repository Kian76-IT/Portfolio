"use client";

import Image from "next/image";
import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";

type ProjectCardProps = {
    title: string;
    roles: string[];
    description: string;
    tech: string[];
    image: string;
    repo: string;
    demo: string;
    onOpen: () => void;
};

export default function ProjectCard({
    title,
    roles,
    description,
    tech,
    image,
    repo,
    demo,
    onOpen,
}: ProjectCardProps) {
    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLElement>
    ) => {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            onOpen();
        }
    };

    return (
        <article
            role="button"
            tabIndex={0}
            onClick={onOpen}
            onKeyDown={handleKeyDown}
            className="
                group
                flex
                h-full
                cursor-pointer
                flex-col
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/[0.02]
                text-left
                outline-none
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-sky-400/30
                hover:bg-white/[0.035]
                focus-visible:border-sky-400/50
                focus-visible:ring-2
                focus-visible:ring-sky-400/30
            "
        >
            {/* IMAGE */}

            <div className="relative aspect-video overflow-hidden bg-zinc-900">
                {image ? (
                    <Image
                        src={image}
                        alt={`${title} project preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                        "
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-zinc-600">
                        Project Preview
                    </div>
                )}

                {/* Dark overlay */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/60
                        via-transparent
                        to-transparent
                        opacity-60
                        transition-opacity
                        duration-300
                        group-hover:opacity-80
                    "
                />

                {/* Open icon */}

                <div
                    className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-10
                        w-10
                        translate-y-1
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        bg-black/50
                        text-white
                        opacity-0
                        backdrop-blur-md
                        transition-all
                        duration-300
                        group-hover:translate-y-0
                        group-hover:opacity-100
                    "
                >
                    <ArrowUpRight size={18} />
                </div>
            </div>

            {/* CONTENT */}

            <div className="flex flex-1 flex-col p-5 sm:p-6">
                {/* TITLE */}

                <h3 className="text-lg font-semibold text-white sm:text-xl">
                    {title}
                </h3>

                {/* ROLES */}

                <div className="mt-3 flex flex-wrap gap-2">
                    {roles.map((role) => (
                        <span
                            key={role}
                            className="
                                rounded-full
                                border
                                border-sky-400/20
                                bg-sky-400/5
                                px-3
                                py-1
                                text-xs
                                font-medium
                                text-sky-400
                            "
                        >
                            {role}
                        </span>
                    ))}
                </div>

                {/* DESCRIPTION */}

                <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                    {description}
                </p>

                {/* TECHNOLOGIES */}

                <div className="mt-6 flex flex-wrap gap-2">
                    {tech.map((item) => (
                        <span
                            key={item}
                            className="
                                rounded-full
                                border
                                border-white/10
                                px-2.5
                                py-1
                                text-xs
                                text-zinc-400
                                transition-colors
                                duration-200
                                group-hover:border-white/15
                                group-hover:text-zinc-300
                                sm:px-3
                            "
                        >
                            {item}
                        </span>
                    ))}
                </div>

                {/* FOOTER */}

                <div className="mt-auto pt-6">
                    <div className="flex items-center justify-between border-t border-white/10 pt-5">
                        <span className="text-sm text-zinc-500 transition-colors duration-200 group-hover:text-zinc-300">
                            Click to view details
                        </span>

                        <div className="flex items-center gap-3">
                            {repo && (
                                <Code2
                                    size={16}
                                    className="text-zinc-600"
                                />
                            )}

                            {demo && (
                                <ExternalLink
                                    size={16}
                                    className="text-zinc-600"
                                />
                            )}

                            <ArrowUpRight
                                size={18}
                                className="
                                    text-zinc-600
                                    transition-all
                                    duration-300
                                    group-hover:translate-x-0.5
                                    group-hover:-translate-y-0.5
                                    group-hover:text-sky-400
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}