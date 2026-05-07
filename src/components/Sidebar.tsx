"use client";

import Image from "next/image";
import { Link2, Mail, MapPin } from "lucide-react";

import { SectionNav } from "@/components/SectionNav";
import { profile } from "@/lib/profile";
import { cn } from "@/utils/cn";

function SocialIconLink({
  href,
  label,
  children,
  className,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        "flex h-11 w-11 min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.02] text-zinc-400 transition-all duration-300",
        "hover:border-white/[0.12] hover:bg-white/[0.05] hover:text-zinc-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
        className,
      )}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function Sidebar() {
  return (
    <div className="lg:sticky lg:top-6 lg:z-10 lg:max-h-[calc(100dvh-2rem)] lg:overflow-y-auto lg:pb-1">
      <aside className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-zinc-950/40 shadow-[0_20px_48px_-20px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:rounded-2xl">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -right-1/4 -top-1/3 h-[70%] w-[90%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_14%,transparent),transparent)] blur-3xl" />
          <div className="absolute -bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
          <div className="absolute right-6 top-6 h-16 w-16 rounded-full border border-dashed border-white/[0.06]" />
        </div>

        <div className="relative px-4 pb-5 pt-5 sm:px-5 sm:pb-6 sm:pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-4">
            <div className="relative mx-auto h-[5.25rem] w-[5.25rem] shrink-0 overflow-hidden rounded-full ring-1 ring-white/10 ring-offset-2 ring-offset-zinc-950 sm:mx-0 sm:rounded-2xl sm:ring-offset-0">
              <Image
                src="/assets/img/profile.webp"
                alt={`${profile.name} — profile photo`}
                fill
                priority
                sizes="84px"
                className="object-cover object-top"
              />
            </div>

            <div className="min-w-0 flex-1 text-center sm:pt-1 sm:text-left">
              <a
                href="#top"
                className="group inline-block touch-manipulation rounded-lg py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <span className="bg-gradient-to-br from-white via-zinc-100 to-zinc-500 bg-clip-text text-xl font-semibold tracking-tight text-transparent transition-opacity group-hover:opacity-90 sm:text-[1.65rem] sm:leading-[1.15]">
                  {profile.name}
                </span>
              </a>
              <p className="mt-2 flex items-center justify-center gap-1.5 font-mono text-xs text-zinc-400 sm:justify-start">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden />
                <span className="tracking-wide">{profile.location}</span>
              </p>
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-md text-pretty text-center text-base leading-relaxed text-zinc-300 sm:mx-0 sm:text-left">
            {profile.headline}
          </p>

          <div className="mt-6 hidden lg:block">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
              Explore
            </p>
            <SectionNav className="mt-2" />
          </div>

          <div className="mt-6 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              <SocialIconLink href={profile.links.linkedin} label="LinkedIn">
                <Link2 className="h-4 w-4" strokeWidth={1.75} />
              </SocialIconLink>
              <SocialIconLink
                href={`mailto:${profile.links.email}`}
                label="Email"
              >
                <Mail className="h-4 w-4" strokeWidth={1.75} />
              </SocialIconLink>
            </div>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 touch-manipulation items-center justify-center font-mono text-xs tracking-wide text-zinc-400 underline decoration-white/20 underline-offset-4 transition-colors hover:text-zinc-200 hover:decoration-white/35 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:min-h-10 sm:justify-start"
            >
              Download Resume
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
