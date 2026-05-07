"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/utils/cn";

export function FadeIn({
  children,
  delay = 0,
  y = 12,
  as = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "li";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const motionProps = {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
    whileInView: reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-20% 0px -20% 0px" } as const,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
      delay,
    },
    className: cn(as === "li" && "min-w-0", className),
    children,
  };

  if (as === "li") {
    return <motion.li {...motionProps} />;
  }

  return <motion.div {...motionProps} />;
}

