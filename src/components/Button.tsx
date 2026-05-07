import Link from "next/link";

import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 will-change-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-zinc-50 text-zinc-950 hover:bg-white hover:shadow-[0_10px_24px_rgba(255,255,255,0.18)] dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-white",
  secondary:
    "border border-white/10 bg-white/[0.02] text-zinc-200 hover:bg-white/[0.05] hover:border-white/20 hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)]",
  ghost:
    "text-zinc-300 hover:text-zinc-50 hover:bg-white/[0.06] dark:text-zinc-300 dark:hover:text-zinc-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
};

export function Button({
  href,
  children,
  variant = "secondary",
  size = "md",
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
}) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

