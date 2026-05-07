import { cn } from "@/utils/cn";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#system-design", label: "System" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#notes", label: "Notes" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteNav({ className }: { className?: string }) {
  return (
    <nav className={cn("flex items-center gap-5 text-sm", className)}>
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="text-zinc-300 hover:text-zinc-50 transition-colors"
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}

