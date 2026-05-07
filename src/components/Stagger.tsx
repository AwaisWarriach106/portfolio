"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/utils/cn";

export function Stagger({
  children,
  delayChildren = 0.05,
  staggerChildren = 0.08,
  as = "div",
  className,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  delayChildren?: number;
  staggerChildren?: number;
  as?: "div" | "ul";
  className?: string;
  "aria-label"?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    if (as === "ul") {
      return (
        <ul className={cn(className)} aria-label={ariaLabel}>
          {children}
        </ul>
      );
    }
    return <>{children}</>;
  }

  const variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  } as const;

  const viewport = { once: true, margin: "-15% 0px -25% 0px" } as const;

  if (as === "ul") {
    return (
      <motion.ul
        className={cn(className)}
        aria-label={ariaLabel}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={variants}
      >
        {children}
      </motion.ul>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
