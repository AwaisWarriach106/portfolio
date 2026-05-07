"use client";

import { Building2, CalendarDays } from "lucide-react";

import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { experience } from "@/lib/experience";
import { cn } from "@/utils/cn";

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="scroll-section border-t border-white/[0.06] py-5 sm:py-6 lg:py-8"
    >
      <Container className="lg:px-0">
        <FadeIn>
          <SectionHeading eyebrow="Experience" title="Roles & impact" />
        </FadeIn>

        <ol className="relative mt-4 list-none space-y-3 p-0 sm:mt-5 sm:space-y-4 lg:mt-6 lg:space-y-5">
          {experience.map((e, index) => {
            const isLast = index === experience.length - 1;
            return (
              <FadeIn
                key={`${e.period}-${e.title}`}
                as="li"
                className="flex items-stretch gap-3 sm:gap-5"
              >
                <div
                  className="flex w-4 shrink-0 flex-col items-center sm:w-5"
                  aria-hidden
                >
                  <div className="relative z-[1] mt-1 flex h-3 w-3 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_oklab,var(--accent)_45%,transparent)] bg-zinc-950 shadow-[0_0_14px_color-mix(in_oklab,var(--accent)_30%,transparent)] sm:mt-1.5 sm:h-3.5 sm:w-3.5">
                    <span className="h-1 w-1 rounded-full bg-[var(--accent)] sm:h-1.5 sm:w-1.5" />
                  </div>
                  {!isLast ? (
                    <div
                      className={cn(
                        "mt-2 w-px flex-1 min-h-[2rem] bg-gradient-to-b",
                        "from-[color-mix(in_oklab,var(--accent)_28%,transparent)] via-white/12 to-white/[0.05]",
                      )}
                    />
                  ) : null}
                </div>

                <article className="min-w-0 flex-1 overflow-hidden rounded-xl border border-white/[0.07] bg-zinc-950/35 p-3.5 shadow-[0_16px_36px_-16px_rgba(0,0,0,0.48)] backdrop-blur-xl transition-colors duration-300 hover:border-white/[0.1] hover:bg-zinc-950/50 sm:rounded-2xl sm:p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-5">
                      <h3 className="text-base font-semibold tracking-tight text-zinc-50">
                        {e.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400">
                        <span className="inline-flex items-center gap-1.5 text-zinc-300">
                          <Building2 className="h-3.5 w-3.5 text-zinc-500" aria-hidden />
                          {e.company}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono tabular-nums text-zinc-400">
                          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                          {e.period}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-base leading-relaxed text-zinc-300">
                      {e.summary}
                    </p>

                    <ul className="mt-3 space-y-1.5 text-base leading-relaxed text-zinc-300">
                      {e.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span
                            className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-zinc-500"
                            aria-hidden
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
              </FadeIn>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
