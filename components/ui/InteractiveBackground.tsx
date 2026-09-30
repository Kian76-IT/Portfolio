"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";

export default function InteractiveBackground() {
  const [isDesktop, setIsDesktop] = useState(false);

  /*
   * ================================================
   * MOUSE POSITION
   * ================================================
   */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /*
   * ================================================
   * SMOOTH SPRING
   * ================================================
   */

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
    mass: 0.6,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
    mass: 0.6,
  });

  /*
   * ================================================
   * DETECT DESKTOP
   * ================================================
   */

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  /*
   * ================================================
   * MOUSE TRACKING
   * ================================================
   */

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    /*
     * Start in center
     */
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, [isDesktop, mouseX, mouseY]);

  /*
   * ================================================
   * MOBILE
   * ================================================
   */

  if (!isDesktop) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Grid */}

        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Ambient glow */}

        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(56,189,248,0.07), transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>
    );
  }

  /*
   * ================================================
   * DESKTOP
   * ================================================
   */

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* ========================================== */}
      {/* GRID                                       */}
      {/* ========================================== */}

      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",

          maskImage:
            "radial-gradient(circle at center, black 0%, black 45%, transparent 85%)",

          WebkitMaskImage:
            "radial-gradient(circle at center, black 0%, black 45%, transparent 85%)",
        }}
      />

      {/* ========================================== */}
      {/* LARGE SOFT GLOW                            */}
      {/* ========================================== */}

      <motion.div
        className="absolute h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: smoothX,
          top: smoothY,

          background:
            "radial-gradient(circle, rgba(56,189,248,0.10) 0%, rgba(56,189,248,0.045) 35%, rgba(56,189,248,0.015) 55%, transparent 75%)",

          filter: "blur(25px)",
        }}
      />

      {/* ========================================== */}
      {/* MEDIUM GLOW                                */}
      {/* ========================================== */}

      <motion.div
        className="absolute h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: smoothX,
          top: smoothY,

          background:
            "radial-gradient(circle, rgba(56,189,248,0.14) 0%, rgba(56,189,248,0.06) 40%, transparent 70%)",

          filter: "blur(20px)",
        }}
      />

      {/* ========================================== */}
      {/* SMALL LIGHT                               */}
      {/* ========================================== */}

      <motion.div
        className="absolute h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: smoothX,
          top: smoothY,

          background:
            "radial-gradient(circle, rgba(125,211,252,0.12), transparent 70%)",

          filter: "blur(10px)",
        }}
      />

      {/* ========================================== */}
      {/* CURSOR DOT                                */}
      {/* ========================================== */}

      <motion.div
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300"
        style={{
          left: smoothX,
          top: smoothY,

          boxShadow:
            "0 0 10px rgba(56,189,248,0.9), 0 0 25px rgba(56,189,248,0.5)",
        }}
      />

      {/* ========================================== */}
      {/* CENTER AMBIENT LIGHT                      */}
      {/* ========================================== */}

      <div
        className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.02), transparent 70%)",

          filter: "blur(100px)",
        }}
      />

      {/* ========================================== */}
      {/* DARK VIGNETTE                              */}
      {/* ========================================== */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 20%, rgba(10,10,10,0.1) 55%, rgba(10,10,10,0.78) 100%)",
        }}
      />
    </div>
  );
}