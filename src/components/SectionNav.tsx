"use client";

import { cn } from "@/utils/cn";
import { useActiveSection } from "@/hooks/useActiveSection";

export const sectionLinks = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  // { id: "system-design", label: "System Design" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export function SectionNav({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const active = useActiveSection(sectionLinks.map((l) => l.id));

  return (
    <nav className={cn("flex flex-col gap-0.5", className)} aria-label="Page sections">
      {sectionLinks.map((l) => {
        const isActive = active === l.id;
        return (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={onNavigate}
            aria-current={isActive ? "location" : undefined}
            className={cn(
              "group relative flex min-h-11 touch-manipulation items-center rounded-lg py-2.5 pl-3.5 pr-2.5 text-sm transition-colors duration-200",
              isActive
                ? "bg-white/[0.06] text-zinc-50"
                : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100",
            )}
          >
            <span
              className={cn(
                "absolute left-1 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-all duration-200",
                isActive
                  ? "bg-[var(--accent)] shadow-[0_0_14px_color-mix(in_oklab,var(--accent)_55%,transparent)]"
                  : "bg-zinc-700/80 group-hover:bg-zinc-500",
              )}
              aria-hidden
            />
            <span
              className={cn(
                "block pl-2 tracking-tight",
                isActive ? "font-medium" : "font-normal",
              )}
            >
              {l.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

