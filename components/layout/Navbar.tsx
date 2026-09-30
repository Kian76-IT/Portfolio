"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import ScrambleText from "@/components/ui/ScrambleText";

const navItems = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Tools",
    href: "#tools",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Experience",
    href: "#experience",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

const sectionIds = [
  "home",
  "about",
  "tools",
  "projects",
  "experience",
  "contact",
];

const rotatingTitles = [
  "AI / ML Enthusiast",
  "Software Enthusiast",
  "Computer Science Student",
  "Binus University Student"
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [titleIndex, setTitleIndex] = useState(0);

  /*
   * =========================================================
   * DETECT ACTIVE SECTION WHEN USER SCROLLS
   * =========================================================
   */
  useEffect(() => {
      const interval =
          window.setInterval(() => {
              setTitleIndex((current) =>
                  (current + 1) %
                  rotatingTitles.length
              );
          }, 3200);

      return () => {
          window.clearInterval(interval);
      };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      let currentSection = "home";

      for (const id of sectionIds) {
        const section = document.getElementById(id);

        if (!section) {
          continue;
        }

        const sectionTop = section.offsetTop;

        if (scrollPosition >= sectionTop) {
          currentSection = id;
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /*
   * =========================================================
   * CLOSE MOBILE MENU WHEN RESIZING
   * =========================================================
   */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /*
   * =========================================================
   * CLOSE MOBILE MENU WITH ESC
   * =========================================================
   */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape" &&
        isOpen
      ) {
        setIsOpen(false);
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
  }, [isOpen]);

  /*
   * =========================================================
   * LOCK BODY SCROLL WHEN MOBILE MENU IS OPEN
   * =========================================================
   */

  useEffect(() => {
    if (
      isOpen &&
      window.innerWidth < 768
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /*
   * =========================================================
   * NAVIGATION
   * =========================================================
   */

  const handleNavigation = (href: string) => {
    const id = href.replace("#", "");

    /*
     * IMPORTANT:
     * Change active navbar immediately.
     *
     * Jadi saat user klik Tools/Contact,
     * garis navbar langsung berpindah tanpa
     * harus menunggu scroll selesai.
     */
    setActiveSection(id);

    /*
     * Close mobile menu
     */
    setIsOpen(false);

    /*
     * Find target section
     */
    const section = document.getElementById(id);

    if (!section) {
      return;
    }

    /*
     * Navbar height / spacing
     */
    const navbarOffset = 96;

    /*
     * Calculate exact position
     */
    const sectionTop =
      section.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    /*
     * Smooth scroll
     */
    window.scrollTo({
      top: Math.max(sectionTop, 0),
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ===================================================== */}
      {/* NAVBAR                                                */}
      {/* ===================================================== */}

      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between py-4">

            {/* ================================================= */}
            {/* LOGO                                             */}
            {/* ================================================= */}

              <button
                  type="button"
                  onClick={() =>
                      handleNavigation("#home")
                  }
                  className="
                      min-w-[360px]
                      text-left
                      text-xl
                      font-semibold
                      tracking-[0.10em]
                      text-white
                      transition-colors
                      duration-300
                      hover:text-sky-400
                      md:text-[21px]
                  "
              >
                  <ScrambleText
                      key={rotatingTitles[titleIndex]}
                      text={rotatingTitles[titleIndex]}
                      duration={2000}
                  />
              </button>

            {/* ================================================= */}
            {/* DESKTOP NAVIGATION                                */}
            {/* ================================================= */}

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const id =
                  item.href.replace("#", "");

                const active =
                  activeSection === id;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() =>
                      handleNavigation(
                        item.href
                      )
                    }
                    className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                      active
                        ? "text-white"
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    {item.name}

                    {/* ========================================= */}
                    {/* ACTIVE LINE                               */}
                    {/* ========================================= */}

                    {active && (
                      <motion.span
                        layoutId="navbar-active"
                        className="absolute inset-x-3 -bottom-[1px] h-px bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ================================================= */}
            {/* MOBILE MENU BUTTON                                */}
            {/* ================================================= */}

            <button
              type="button"
              onClick={() =>
                setIsOpen(
                  (current) => !current
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition hover:bg-white/5 hover:text-white md:hidden"
              aria-label={
                isOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isOpen}
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.8,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.8,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* ================================================= */}
          {/* MOBILE NAVIGATION                                */}
          {/* ================================================= */}

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="overflow-hidden md:hidden"
              >
                <div className="border-t border-white/10 py-4">
                  <div className="flex flex-col gap-1">
                    {navItems.map(
                      (item, index) => {
                        const id =
                          item.href.replace(
                            "#",
                            ""
                          );

                        const active =
                          activeSection === id;

                        return (
                          <motion.button
                            key={item.name}
                            type="button"
                            initial={{
                              opacity: 0,
                              x: -10,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              duration: 0.2,
                              delay:
                                index *
                                0.04,
                            }}
                            onClick={() =>
                              handleNavigation(
                                item.href
                              )
                            }
                            className={`flex items-center justify-between rounded-lg px-4 py-3 text-left text-base transition ${
                              active
                                ? "bg-sky-400/10 text-sky-400"
                                : "text-zinc-400 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <span>
                              {item.name}
                            </span>

                            {active && (
                              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                            )}
                          </motion.button>
                        );
                      }
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}