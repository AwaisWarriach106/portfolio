"use client";

import { motion } from "framer-motion";
import { Activity, Layers2, ShieldCheck } from "lucide-react";

import { Chip } from "@/components/Chip";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { aboutFocus } from "@/lib/about";
import { profile } from "@/lib/profile";
import { cn } from "@/utils/cn";

const icons = [Layers2, Activity, ShieldCheck] as const;

function StatPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-xs font-medium tabular-nums text-zinc-200">
      {children}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="scroll-section py-5 sm:py-6 lg:py-8">
      <Container className="lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6% 0px -6% 0px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading eyebrow="About" title="Engineering with intent" />

          {/* lg: stretch row so left bio card matches combined height of right column */}
          <div className="mt-5 grid gap-3 lg:grid-cols-12 lg:items-stretch lg:gap-4">
            <div
              className={cn(
                "relative overflow-hidden rounded-xl border border-white/[0.07] bg-zinc-950/45 p-4 shadow-[0_16px_36px_-16px_rgba(0,0,0,0.48)] backdrop-blur-xl sm:p-5 lg:col-span-7",
                "lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:justify-between",
              )}
            >
              <div
                className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_14%,transparent),transparent)] blur-2xl"
                aria-hidden
              />
              <div className="relative z-[1] space-y-3 text-base leading-relaxed text-zinc-300 sm:text-[17px] sm:leading-relaxed">
                <p className="text-[17px] font-semibold leading-snug text-zinc-50 sm:text-lg">
                  I build backend-heavy products where APIs, data, and runtime
                  behaviour stay understandable as complexity grows.
                </p>
                <p>
                  Day to day that means clear contracts, disciplined persistence
                  layers, and performance you can measure — not heroics. I work
                  closely with frontend and stakeholders so delivery stays aligned
                  with what actually ships.
                </p>
              </div>

              <aside
                className="relative z-[1] mt-5 border-t border-white/[0.06] pt-4 lg:mt-0"
                aria-label="Experience and primary stack"
              >
                <div className="flex flex-wrap gap-2">
                  <StatPill>{profile.stats.experience}</StatPill>
                  <StatPill>{profile.stats.projects}</StatPill>
                </div>
                <ul className="mt-3 flex list-none flex-wrap gap-1.5 p-0">
                  {profile.stackChips.map((t) => (
                    <li key={t}>
                      <Chip className="border-white/[0.07] bg-white/[0.02] text-xs font-normal text-zinc-300">
                        {t}
                      </Chip>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>

            <div className="flex min-h-0 flex-col gap-3 lg:col-span-5">
              {aboutFocus.map((item, i) => {
                const Icon = icons[i] ?? Layers2;
                return (
                  <div
                    key={item.title}
                    className={cn(
                      "flex gap-3 rounded-xl border border-white/[0.07] bg-zinc-950/35 p-3.5 backdrop-blur-md sm:gap-3.5 sm:p-4",
                      "transition-colors duration-300 hover:border-white/[0.1] hover:bg-zinc-950/45",
                    )}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-[var(--accent)]">
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold tracking-tight text-zinc-50">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
