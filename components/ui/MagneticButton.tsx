"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import type { ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  target?: string;
};

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  target,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 250,
    damping: 15,
    mass: 0.3,
  });

  const springY = useSpring(y, {
    stiffness: 250,
    damping: 15,
    mass: 0.3,
  });

  const handleMouseMove = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX =
      event.clientX - centerX;

    const distanceY =
      event.clientY - centerY;

    x.set(distanceX * 0.18);
    y.set(distanceY * 0.18);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClass =
    "relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-sm font-medium";

  const variantClass =
    variant === "primary"
      ? "bg-white text-black hover:bg-zinc-200"
      : "border border-white/20 text-white hover:border-white/30 hover:bg-white/10";

  return (
    <motion.a
      href={href}
      target={target}
      rel={
        target === "_blank"
          ? "noopener noreferrer"
          : undefined
      }
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{
        scale: 0.96,
      }}
      className={`${baseClass} ${variantClass}`}
    >
      {/* Hover glow */}

      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-sky-400/0 transition-colors duration-300 group-hover:bg-sky-400/10"
      />

      <span className="relative z-10">
        {children}
      </span>
    </motion.a>
  );
}