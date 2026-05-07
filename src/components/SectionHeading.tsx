import { cn } from "@/utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-pretty bg-gradient-to-br from-white via-zinc-100 to-zinc-400 bg-clip-text text-xl font-semibold leading-snug tracking-tight text-transparent sm:text-2xl sm:leading-snug md:text-[1.7rem]",
          eyebrow ? "mt-2" : "mt-0",
        )}
      >
        {title}
      </h2>
      <div
        className="mt-3 h-px w-12 bg-gradient-to-r from-[color-mix(in_oklab,var(--accent)_65%,transparent)] to-transparent"
        aria-hidden
      />
    </div>
  );
}

