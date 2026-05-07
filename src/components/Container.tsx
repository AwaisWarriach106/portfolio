import { cn } from "@/utils/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("w-full px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

