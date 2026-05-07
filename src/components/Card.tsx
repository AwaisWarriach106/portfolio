import { cn } from "@/utils/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.07] bg-zinc-950/35 p-5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 will-change-transform hover:-translate-y-0.5 hover:border-white/[0.11] hover:bg-zinc-950/45 hover:shadow-[0_22px_44px_-14px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

