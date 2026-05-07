"use client";

import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { skillGroups } from "@/lib/skills";

export function Skills() {
  const levelStyles: Record<"Core" | "Comfortable" | "Familiar", string> = {
    Core: "border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-100/95",
    Comfortable: "border-sky-400/30 bg-sky-400/[0.08] text-sky-100/95",
    Familiar: "border-zinc-500/25 bg-white/[0.04] text-zinc-300",
  };

  return (
    <section
      id="skills"
      className="scroll-section border-t border-white/[0.06] py-5 sm:py-6 lg:py-8"
    >
      <Container className="lg:px-0">
        <FadeIn>
          <SectionHeading eyebrow="Skills" title="Where I go deep" />
        </FadeIn>

        <div className="mt-4 grid gap-2.5 sm:mt-5 sm:gap-3 lg:grid-cols-3 lg:gap-4">
          {skillGroups.map((g) => (
            <FadeIn key={g.title}>
              <Card className="group relative h-full overflow-hidden rounded-xl border-white/[0.07] p-3.5 sm:rounded-2xl sm:p-5">
                <div
                  className="pointer-events-none absolute -top-24 right-[-20%] h-44 w-44 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_72%)] opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
                  aria-hidden
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold tracking-tight text-zinc-50">
                      {g.title}
                    </h3>
                    <Chip className={levelStyles[g.level]}>{g.level}</Chip>
                  </div>

                  <ul className="mt-4 space-y-2.5 text-base leading-relaxed text-zinc-300">
                    {g.items.map((i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]/90 shadow-[0_0_10px_color-mix(in_oklab,var(--accent)_45%,transparent)]"
                          aria-hidden
                        />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
