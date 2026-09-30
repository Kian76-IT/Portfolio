"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  y = 30,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? {
              opacity: 0,
            }
          : {
              opacity: 0,
              y,
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
        amount: 0.15,
      }}
      transition={
        reduce
          ? {
              duration: 0,
            }
          : {
              duration,
              delay,
              ease: "easeOut",
            }
      }
    >
      {children}
    </motion.div>
  );
}