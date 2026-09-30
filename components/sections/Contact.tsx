"use client";

import {
    ArrowUpRight,
    Check,
    Mail,
    Send,
} from "lucide-react";

import {
    motion,
    useReducedMotion,
} from "motion/react";

import {
    FormEvent,
    useState,
} from "react";

import {
    FaGithub,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";


const EMAIL =
    "kianaurelio27@gmail.com";


export default function Contact() {
    const reduce =
        useReducedMotion();

    const [message, setMessage] =
        useState("");

    const [sent, setSent] =
        useState(false);


    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!message.trim()) {
            return;
        }

        const subject =
            encodeURIComponent(
                "Portfolio Contact"
            );

        const body =
            encodeURIComponent(
                message.trim()
            );

        const mailto =
            `mailto:${EMAIL}?subject=${subject}&body=${body}`;

        window.location.href =
            mailto;

        setSent(true);

        window.setTimeout(() => {
            setSent(false);
        }, 2500);
    };


    return (
        <section
            id="contact"
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
                    transition={{
                        duration: reduce
                            ? 0
                            : 0.6,
                        ease: "easeOut",
                    }}
                >
                    <p
                        className="
                            text-sm
                            font-medium
                            tracking-[0.2em]
                            text-sky-400
                        "
                    >
                        CONTACT
                    </p>

                    <h2
                        className="
                            mt-4
                            max-w-3xl
                            text-3xl
                            font-semibold
                            tracking-tight
                            text-white
                            md:text-5xl
                        "
                    >
                        Let&apos;s build something
                        together.
                    </h2>

                    <p
                        className="
                            mt-6
                            max-w-2xl
                            text-base
                            leading-relaxed
                            text-zinc-400
                            sm:text-lg
                        "
                    >
                        Have a project,
                        internship opportunity,
                        or just want to talk
                        about AI and technology?
                        Feel free to reach out.
                    </p>
                </motion.div>


                {/* ================================================== */}
                {/* CONTACT FORM                                       */}
                {/* ================================================== */}

                <motion.form
                    onSubmit={handleSubmit}
                    initial={
                        reduce
                            ? {
                                  opacity: 0,
                              }
                            : {
                                  opacity: 0,
                                  y: 30,
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
                        amount: 0.2,
                    }}
                    transition={{
                        duration: reduce
                            ? 0
                            : 0.65,
                        delay: reduce
                            ? 0
                            : 0.1,
                        ease: "easeOut",
                    }}
                    className="
                        group
                        relative
                        mt-12
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.02]
                        p-6
                        sm:p-8
                    "
                >

                    {/* FORM GLOW */}

                    <div
                        aria-hidden="true"
                        className="
                            pointer-events-none
                            absolute
                            -right-32
                            -top-32
                            h-80
                            w-80
                            rounded-full
                            bg-sky-400/[0.045]
                            blur-3xl
                            transition-opacity
                            duration-500
                            group-focus-within:bg-sky-400/[0.07]
                        "
                    />

                    <div className="relative">

                        {/* FORM HEADER */}

                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/[0.03]
                                    text-sky-400
                                "
                            >
                                <Mail
                                    size={18}
                                />
                            </div>

                            <div>
                                <h3
                                    className="
                                        text-lg
                                        font-semibold
                                        text-white
                                    "
                                >
                                    Send a Message
                                </h3>

                                <p
                                    className="
                                        mt-0.5
                                        text-xs
                                        text-zinc-600
                                    "
                                >
                                    I&apos;ll get back to
                                    you by email.
                                </p>
                            </div>
                        </div>


                        {/* MESSAGE */}

                        <div className="mt-7">
                            <label
                                htmlFor="message"
                                className="
                                    text-sm
                                    font-medium
                                    text-zinc-300
                                "
                            >
                                Message
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                value={message}
                                onChange={(event) =>
                                    setMessage(event.target.value)
                                }
                                placeholder="Tell me about your project or idea..."
                                rows={7}
                                className="
                                    mt-3
                                    w-full
                                    resize-none
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-black/20
                                    px-5
                                    py-4
                                    text-left
                                    text-sm
                                    leading-relaxed
                                    text-white
                                    outline-none
                                    placeholder:text-zinc-600
                                    transition-all
                                    duration-300
                                    focus:border-sky-400/40
                                    focus:bg-white/[0.025]
                                    focus:ring-1
                                    focus:ring-sky-400/20
                                "
                            />
                        </div>


                        {/* SEND BUTTON */}

                        <motion.button
                            type="submit"
                            disabled={!message.trim()}
                            whileHover={
                                reduce || !message.trim()
                                    ? undefined
                                    : {
                                        y: -2,
                                    }
                            }
                            whileTap={
                                message.trim()
                                    ? {
                                        scale: 0.985,
                                    }
                                    : undefined
                            }
                            className={`
                                mt-6
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2.5
                                rounded-xl
                                px-5
                                py-3.5
                                text-sm
                                font-semibold
                                transition-all
                                duration-300
                                ${
                                    message.trim()
                                        ? "bg-white text-black hover:-translate-y-0.5 hover:bg-zinc-200"
                                        : "cursor-not-allowed bg-white/10 text-zinc-600"
                                }
                            `}
                        >
                            {sent ? (
                                <>
                                    <Check
                                        size={18}
                                    />

                                    <span>
                                        Opening Email...
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Send
                                        size={18}
                                    />

                                    <span>
                                        Send Message
                                    </span>
                                </>
                            )}
                        </motion.button>


                        {/* EMAIL INFO */}

                        <a
                            href={`mailto:${EMAIL}`}
                            className="
                                mt-4
                                block
                                text-center
                                text-xs
                                text-zinc-600
                                transition-colors
                                duration-200
                                hover:text-sky-400
                            "
                        >
                            Open your default email application
                        </a>

                    </div>
                </motion.form>


                {/* ================================================== */}
                {/* SOCIAL LINKS                                       */}
                {/* ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}
                    transition={{
                        duration: reduce
                            ? 0
                            : 0.6,
                        delay: reduce
                            ? 0
                            : 0.15,
                    }}
                    className="
                        mt-10
                        flex
                        flex-wrap
                        justify-center
                        gap-3
                    "
                >

                    <SocialLink
                        href="https://github.com/Kian76-IT"
                        label="GitHub"
                        icon={
                            <FaGithub
                                size={17}
                            />
                        }
                    />

                    <SocialLink
                        href="https://linkedin.com/in/kianaureliowibowo"
                        label="LinkedIn"
                        icon={
                            <FaLinkedinIn
                                size={17}
                            />
                        }
                    />

                    <SocialLink
                        href="https://www.instagram.com/k.rrio"
                        label="Instagram"
                        icon={
                            <FaInstagram
                                size={17}
                            />
                        }
                    />

                </motion.div>


                {/* ================================================== */}
                {/* EMAIL ADDRESS                                      */}
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
                        duration: reduce
                            ? 0
                            : 0.6,
                        delay: reduce
                            ? 0
                            : 0.25,
                    }}
                    className="
                        mt-10
                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    <Mail
                        size={13}
                        className="text-zinc-700"
                    />

                    <a
                        href={`mailto:${EMAIL}`}
                        className="
                            font-mono
                            text-xs
                            text-zinc-600
                            transition-colors
                            duration-200
                            hover:text-sky-400
                        "
                    >
                        {EMAIL}
                    </a>
                </motion.div>


                {/* ================================================== */}
                {/* BOTTOM                                             */}
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
                        duration: reduce
                            ? 0
                            : 0.6,
                        delay: reduce
                            ? 0
                            : 0.3,
                    }}
                    className="
                        mt-10
                        border-t
                        border-white/10
                        pt-6
                    "
                >
                    <div
                        className="
                            flex
                            flex-col
                            gap-3
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        "
                    >
                        <p
                            className="
                                font-mono
                                text-[10px]
                                uppercase
                                tracking-[0.2em]
                                text-zinc-700
                            "
                        >
                            OPEN TO OPPORTUNITIES
                        </p>

                        <p
                            className="
                                text-xs
                                text-zinc-600
                            "
                        >
                            AI · Machine Learning ·
                            Software Engineering
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}


/* ================================================================== */
/* SOCIAL LINK                                                        */
/* ================================================================== */

type SocialLinkProps = {
    href: string;
    label: string;
    icon: React.ReactNode;
};


function SocialLink({
    href,
    label,
    icon,
}: SocialLinkProps) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
                y: -3,
            }}
            whileTap={{
                scale: 0.96,
            }}
            className="
                group
                flex
                items-center
                gap-2.5
                rounded-full
                border
                border-white/10
                bg-white/[0.02]
                px-5
                py-3
                text-sm
                font-medium
                text-zinc-400
                transition-all
                duration-300
                hover:border-sky-400/30
                hover:bg-sky-400/[0.06]
                hover:text-white
            "
        >
            <span
                className="
                    text-zinc-500
                    transition-colors
                    duration-300
                    group-hover:text-sky-400
                "
            >
                {icon}
            </span>

            <span>
                {label}
            </span>

            <ArrowUpRight
                size={13}
                className="
                    text-zinc-700
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-sky-400
                "
            />
        </motion.a>
    );
}