"use client";

import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";
import { Chip } from "@/components/Chip";
import { systemDesigns } from "@/lib/system-design";

export function SystemDesign() {
  return (
    <section
      id="system-design"
      className="scroll-mt-10 border-t border-white/10 py-10"
    >
      <Container className="lg:px-0">
        <FadeIn>
          <SectionHeading
            eyebrow="System design"
            title="How I think about architecture"
            className="max-w-2xl"
          />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-300">
            Simple diagrams, clear flows, and scaling notes—the part most
            portfolios skip.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {systemDesigns.map((s) => (
            <FadeIn key={s.title}>
              <Card className="h-full">
                <h3 className="text-base font-semibold tracking-tight text-zinc-50">
                  {s.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-zinc-300">
                  {s.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {s.diagram.nodes.slice(0, 6).map((n) => (
                    <Chip key={n}>{n}</Chip>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="text-xs font-medium tracking-[0.18em] uppercase text-zinc-400">
                    Flow
                  </p>
                  <ul className="mt-4 space-y-2 text-base leading-relaxed text-zinc-300">
                    {s.diagram.flows.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-medium tracking-[0.18em] uppercase text-zinc-400">
                    Scaling notes
                  </p>
                  <ul className="mt-4 space-y-2 text-base leading-relaxed text-zinc-300">
                    {s.scalingNotes.map((n) => (
                      <li key={n}>{n}</li>
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

