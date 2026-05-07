"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

import { AnimatedCard } from "@/components/AnimatedCard";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger } from "@/components/Stagger";
import { projects } from "@/lib/projects";

function isUsableLink(h?: string) {
  return Boolean(h && h !== "#");
}

function CarouselShotCell({
  s,
  fallbackAlt,
  priority,
}: {
  s: Shot;
  fallbackAlt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-none border-0 bg-transparent ring-0 shadow-none sm:rounded-xl sm:border sm:border-white/10 sm:bg-black/15 sm:ring-1 sm:ring-white/5 sm:shadow-[0_16px_50px_rgba(0,0,0,0.45)]">
      <Image
        src={s.src}
        alt={s.alt || fallbackAlt}
        fill
        sizes="(min-width: 1024px) 520px, 92vw"
        className="object-cover object-center transition-transform"
        style={s.scale ? { transform: `scale(${s.scale})` } : undefined}
        priority={priority}
      />
    </div>
  );
}

function CarouselArrowCell() {
  return (
    <div className="hidden items-center justify-center sm:flex">
      <div className="relative grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.30)] backdrop-blur">
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(60%_80%_at_50%_40%,rgba(255,255,255,0.14),transparent_65%)]" />
        <ArrowRight className="relative h-5 w-5 text-white/75" />
      </div>
    </div>
  );
}

function PlaceholderShot({ alt }: { alt: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_40%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_60%)] opacity-70" />
        <div className="absolute -inset-40 bg-[conic-gradient(from_180deg_at_50%_50%,transparent,rgba(255,255,255,0.08),transparent)] blur-2xl opacity-60" />
      </div>
      <div className="aspect-[16/9] w-full" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-zinc-400">
            Screenshot placeholder
          </p>
          <p className="mt-2 text-sm text-zinc-300">{alt}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectShot({
  src,
  alt,
  layout = "landscape",
  fit = "cover",
  priority,
}: {
  src?: string;
  alt: string;
  layout?: "landscape" | "portrait";
  fit?: "cover" | "contain";
  priority?: boolean;
}) {
  if (!src) return <PlaceholderShot alt={alt} />;
  const aspect = "aspect-[16/9]";
  const isPortraitContain = layout === "portrait" && fit === "contain";

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] shadow-[0_18px_70px_rgba(0,0,0,0.55)] ring-1 ring-white/5 sm:rounded-2xl">
      <div className={`${aspect} w-full`} />

      {isPortraitContain ? (
        <>
          <div className="sm:hidden">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 520px, 92vw"
              className="object-contain"
              priority={priority}
            />
          </div>

          <Image
            src={src}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1024px) 520px, 92vw"
            className="hidden sm:block object-cover opacity-45 blur-sm scale-110"
            priority={false}
          />
          <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_38%,rgba(255,255,255,0.14),transparent_62%)]" />
          <div className="hidden sm:block absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.60))]" />
          <div className="hidden sm:flex absolute inset-0 items-center justify-center px-5 py-4">
            <div className="relative h-full max-h-[96%] w-full max-w-[70%]">
              <div className="absolute inset-0 rounded-[2rem] border border-white/12 bg-black/20 shadow-[0_26px_90px_rgba(0,0,0,0.70)]" />
              <div className="absolute inset-[11px] overflow-hidden rounded-[1.55rem] bg-black/25 ring-1 ring-white/10">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 520px, 92vw"
                  className="object-contain"
                  priority={priority}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_40%,rgba(255,255,255,0.10),transparent_62%)]" />
          <div className="absolute inset-0 p-0 sm:p-2">
            <div className="relative h-full w-full overflow-hidden sm:rounded-xl sm:border sm:border-white/10 sm:bg-black/20 sm:ring-1 sm:ring-white/5">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 520px, 92vw"
                className={
                  fit === "contain"
                    ? "object-contain p-0 sm:p-3"
                    : "object-cover"
                }
                priority={priority}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

type Shot = {
  src: string;
  alt: string;
  layout?: "landscape" | "portrait";
  fit?: "cover" | "contain";
  scale?: number;
};

function ProjectCarouselRow({
  shots,
  fallbackAlt,
  priority,
}: {
  shots: Shot[];
  fallbackAlt: string;
  priority?: boolean;
}) {
  const normalized = useMemo(() => shots.filter(Boolean).slice(0, 3), [shots]);
  const count = normalized.length;
  const mobileCols = count === 2 ? "grid-cols-2" : "grid-cols-3";
  const desktopCols =
    count === 2 ? "sm:grid-cols-[1fr_auto_1fr]" : "sm:grid-cols-[1fr_auto_1fr_auto_1fr]";

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] shadow-[0_18px_70px_rgba(0,0,0,0.55)] ring-1 ring-white/5 sm:rounded-2xl">
        <div className="aspect-[16/9] w-full" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_38%,rgba(255,255,255,0.14),transparent_62%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.22),rgba(0,0,0,0.60))]" />

        <div className="absolute inset-0 flex items-center justify-center px-0 py-0 sm:px-2 sm:py-2">
          <div
            className={[
              "grid h-full w-full items-center gap-0 sm:gap-2",
              mobileCols,
              desktopCols,
            ].join(" ")}
          >
            {(() => {
              const s0 = normalized[0];
              const s1 = normalized[1];
              const s2 = normalized[2];

              if (!s0 || !s1) return null;

              if (!s2) {
                return (
                  <>
                    <CarouselShotCell s={s0} fallbackAlt={fallbackAlt} priority={priority} />
                    <CarouselArrowCell />
                    <CarouselShotCell s={s1} fallbackAlt={fallbackAlt} />
                  </>
                );
              }

              return (
                <>
                  <CarouselShotCell s={s0} fallbackAlt={fallbackAlt} priority={priority} />
                  <CarouselArrowCell />
                  <CarouselShotCell s={s1} fallbackAlt={fallbackAlt} />
                  <CarouselArrowCell />
                  <CarouselShotCell s={s2} fallbackAlt={fallbackAlt} />
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectGallery({
  shots,
  fallbackAlt,
  priority,
}: {
  shots?: Shot[];
  fallbackAlt: string;
  priority?: boolean;
}) {
  const normalized = useMemo(() => (shots ?? []).filter(Boolean), [shots]);
  const [active, setActive] = useState(0);

  const current = normalized[active] ?? normalized[0];
  if (!current) return <PlaceholderShot alt={fallbackAlt} />;

  return (
    <div>
      <ProjectShot
        src={current.src}
        alt={current.alt || fallbackAlt}
        layout={current.layout}
        fit={current.fit}
        priority={priority}
      />

      {normalized.length > 1 ? (
        <div className="mt-2 flex min-h-11 gap-2 sm:gap-1.5">
            {normalized.slice(0, 3).map((s, idx) => {
              const isActive = idx === active;

              return (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setActive(idx)}
                  aria-label={`Show screenshot ${idx + 1} of ${normalized.length}`}
                  aria-pressed={isActive}
                  className={[
                    "group relative min-h-11 flex-1 touch-manipulation overflow-hidden rounded-xl border transition sm:h-20",
                    isActive
                      ? "border-white/45 bg-white/[0.08] ring-1 ring-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]",
                  ].join(" ")}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_40%,rgba(255,255,255,0.08),transparent_70%)] opacity-0 transition group-hover:opacity-100" />
                  <div
                    className={[
                      "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent transition-opacity",
                      isActive ? "opacity-100" : "opacity-70",
                    ].join(" ")}
                  />
                  <Image
                    src={s.src}
                    alt={s.alt || fallbackAlt}
                    fill
                    sizes="160px"
                    className={[
                      "object-contain p-2 opacity-95 transition duration-200 group-hover:opacity-100",
                      isActive ? "scale-[1.03]" : "scale-100",
                    ].join(" ")}
                  />
                </button>
              );
            })}
        </div>
      ) : null}
    </div>
  );
}

export function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="scroll-section border-t border-white/[0.06] py-5 sm:py-6 lg:py-8"
    >
      <Container className="lg:px-0">
        <FadeIn>
          <SectionHeading
            eyebrow="Projects"
            title="Recent work"
            className="max-w-xl"
          />
        </FadeIn>

        <div className="mt-4 sm:mt-5 lg:mt-6">
          <Stagger
            as="ul"
            aria-label="Featured projects"
            className="m-0 grid list-none gap-4 p-0 sm:gap-5 lg:gap-6"
          >
            {projects.slice(0, 5).map((p, idx) => {
              const hasGitHub = isUsableLink((p.links as { github?: string }).github);
              const eagerScreenshot = idx === 0;

              return (
                <FadeIn key={p.slug} as="li" y={10}>
                  <AnimatedCard className="max-sm:rounded-xl p-0 sm:p-4">
                    <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-5">
                      <div className="order-2 px-3 pb-3 pt-0 sm:px-0 sm:pb-0 sm:pt-0 lg:order-1">
                        <div className="flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <Chip key={t}>{t}</Chip>
                          ))}
                        </div>
                        <h3 className="mt-2.5 text-base font-semibold leading-snug tracking-tight text-zinc-50 sm:mt-3 sm:text-lg lg:text-xl">
                          {p.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                          {p.oneLiner}
                        </p>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--foreground-muted)] sm:text-[15px]">
                          {p.impact}
                        </p>
                        <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:flex-wrap">
                          <Button
                            href="/#contact"
                            variant="secondary"
                            size="sm"
                            className="w-full touch-manipulation justify-center border-white/15 bg-white/[0.03] text-zinc-100 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.08] hover:shadow-[0_10px_24px_rgba(0,0,0,0.25)] sm:w-auto"
                          >
                            Live demo
                            <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                          </Button>
                          {hasGitHub ? (
                            <Button
                              href={(p.links as { github?: string }).github!}
                              variant="secondary"
                              external
                              size="sm"
                              className="w-full touch-manipulation justify-center border-white/15 bg-white/[0.03] text-zinc-100 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.08] hover:shadow-[0_10px_24px_rgba(0,0,0,0.25)] sm:w-auto"
                            >
                              GitHub
                              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                            </Button>
                          ) : null}
                          <Button
                            href={`/projects/${p.slug}`}
                            variant="primary"
                            size="sm"
                            className="w-full touch-manipulation justify-center bg-white text-zinc-950 hover:-translate-y-0.5 hover:bg-zinc-200 hover:shadow-[0_12px_28px_rgba(255,255,255,0.2)] sm:w-auto"
                          >
                            Case Study
                            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
                          </Button>
                        </div>
                      </div>
                      <div className="order-1 min-w-0 lg:order-2">
                        {p.frontend.screenshots &&
                        p.frontend.screenshots.length >= 2 ? (
                          <ProjectCarouselRow
                            shots={p.frontend.screenshots}
                            fallbackAlt={p.frontend.screenshotAlt}
                            priority={eagerScreenshot}
                          />
                        ) : (
                          <ProjectGallery
                            shots={
                              p.frontend.screenshots ??
                              (p.frontend.screenshotSrc
                                ? [
                                    {
                                      src: p.frontend.screenshotSrc,
                                      alt: p.frontend.screenshotAlt,
                                      layout: p.frontend.screenshotLayout,
                                      fit: p.frontend.screenshotFit,
                                    },
                                  ]
                                : undefined)
                            }
                            fallbackAlt={p.frontend.screenshotAlt}
                            priority={eagerScreenshot}
                          />
                        )}
                      </div>
                    </div>
                  </AnimatedCard>
                </FadeIn>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
