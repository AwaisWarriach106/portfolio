import { cn } from "@/utils/cn";

export function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-xs font-medium text-zinc-200",
        className,
      )}
    >
      {children}
    </span>
  );
}

