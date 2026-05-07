"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/utils/cn";

export function AnimatedCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-white/[0.07] bg-zinc-950/35 p-5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.11] hover:bg-zinc-950/45 hover:shadow-[0_22px_44px_-14px_rgba(0,0,0,0.55)]",
          className,
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.002 }}
      transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.65 }}
      className={cn(
        "rounded-2xl border border-white/[0.07] bg-zinc-950/35 p-5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.11] hover:bg-zinc-950/45 hover:shadow-[0_22px_44px_-14px_rgba(0,0,0,0.55)] will-change-transform",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

