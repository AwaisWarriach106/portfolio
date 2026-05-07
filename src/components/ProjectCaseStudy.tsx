"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  ClipboardCheck,
  Database,
  FolderKanban,
  Layers3,
  LayoutTemplate,
  MessageSquare,
  Network,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  UserRound,
  ExternalLink,
  Mail,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Container } from "@/components/Container";
import {
  getCaseStudyFeatures,
  getCaseStudyGallery,
  type Project,
  type ProjectFeature,
  type ProjectScreenshot,
} from "@/lib/projects";
import { cn } from "@/utils/cn";
import { profile } from "@/lib/profile";

const shell = "mx-auto w-full max-w-[min(100%,90rem)]";

function getFeatureIcon(title: string) {
  const t = title.toLowerCase();
  if (/(rbac|role|permission|authorization|auth)/.test(t)) return ShieldCheck;
  if (/(attendance|timesheet|time)/.test(t)) return ClipboardCheck;
  if (/(taskboard|kanban|ticket|issue|task tracking)/.test(t)) return FolderKanban;
  if (/(mobile|offline|field)/.test(t)) return Smartphone;
  if (/(approval|workflow|review)/.test(t)) return Layers3;
  if (/(profile|employee|account)/.test(t)) return UserRound;
  if (/(chat|message)/.test(t)) return MessageSquare;
  return Sparkles;
}

function ScrollToTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-5 z-50 hidden min-h-11 min-w-11 items-center justify-center rounded-full",
        "border border-white/10 bg-white/[0.04] text-zinc-100 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur",
        "hover:border-white/20 hover:bg-white/[0.07]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        "lg:flex",
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}

function getShotIcon(shot: ProjectScreenshot) {
  const heading = (shot.heading ?? "").toLowerCase();
  const eyebrow = (shot.eyebrow ?? "").toLowerCase();
  const tags = (shot.tags ?? []).join(" ").toLowerCase();
  const hay = `${heading} ${eyebrow} ${tags}`;

  if (/(dashboard|operations|overview|hub|kpi)/.test(hay)) return LayoutTemplate;
  if (/(timesheet|time|approval)/.test(hay)) return ClipboardCheck;
  if (/(attendance|punch|clock)/.test(hay)) return ClipboardCheck;
  if (/(mobile|react native|field|offline)/.test(hay)) return Smartphone;
  if (/(absence|leave)/.test(hay)) return Layers3;
  if (/(taskboard|kanban|ticket|issue)/.test(hay)) return FolderKanban;
  return Sparkles;
}

function ShotPanel({
  shot,
  priority,
  className,
  fillRow,
}: {
  shot: ProjectScreenshot;
  priority?: boolean;
  className?: string;
  /** Match sibling column height (50/50 layout); landscape fills extra vertical space */
  fillRow?: boolean;
}) {
  const portrait = shot.layout === "portrait";
  const useContain = Boolean(!fillRow && (shot.fit ?? "cover") === "contain");

  return (
    <div
      className={cn(
        "group relative rounded-2xl p-px",
        "bg-[linear-gradient(135deg,color-mix(in_oklab,var(--accent)_50%,transparent),rgba(255,255,255,0.12)_45%,color-mix(in_oklab,var(--accent)_22%,transparent))]",
        "shadow-[0_24px_80px_rgba(0,0,0,0.45)]",
        "w-full",
        fillRow && "flex h-full min-h-0 flex-col",
        className,
      )}
    >
      <div
        className={cn(
          "relative min-h-0 overflow-hidden rounded-[15px] bg-zinc-950/95 ring-1 ring-white/[0.06]",
          fillRow && "flex min-h-0 flex-1 flex-col",
        )}
      >
        {fillRow ? (
          <div
            className="flex h-8 shrink-0 items-center gap-2 border-b border-white/[0.07] bg-zinc-900/90 px-3"
            aria-hidden
          >
            <span className="h-2 w-2 rounded-full bg-red-500/[0.35]" />
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]/[0.30]" />
            <span className="h-2 w-2 rounded-full bg-white/[0.18]" />
            <span className="ml-1 truncate font-mono text-[10px] tracking-wide text-zinc-600">
              {shot.heading ? `${shot.heading} · preview` : "UI preview"}
            </span>
          </div>
        ) : null}
        <div
          className={cn(
            "relative w-full overflow-hidden",
            portrait &&
              (fillRow
                ? "aspect-[9/16] w-full max-w-[min(100%,280px)] shrink-0 self-center"
                : "aspect-[9/16] max-h-[min(52vh,320px)] max-w-[220px] mx-auto sm:max-w-[240px]"),
            !portrait &&
              (fillRow
                ? "relative w-full overflow-hidden aspect-[16/9] sm:aspect-[2/1] lg:aspect-auto lg:min-h-0 lg:flex-1 lg:min-h-[200px]"
                : "aspect-[2/1] min-h-[160px] max-h-[min(38vh,280px)] sm:max-h-[300px]"),
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_0%,rgba(34,211,238,0.12),transparent_55%)] opacity-80 transition duration-500 group-hover:opacity-100"
            aria-hidden
          />
          <div
            className="absolute inset-0"
            style={
              shot.scale
                ? { transform: `scale(${shot.scale})`, transformOrigin: "center" }
                : undefined
            }
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 45vw, 92vw"
              className={cn(
                "object-center transition duration-500 group-hover:scale-[1.02]",
                useContain ? "object-contain p-2 sm:p-3" : "object-cover",
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryRow({
  index,
  shot,
  priority,
}: {
  index: number;
  shot: ProjectScreenshot;
  priority?: boolean;
}) {
  const textFirst = index % 2 === 0;
  const heading = shot.heading ?? "Screen";
  const bodyRaw = shot.caption ?? shot.alt;
  const body = bodyRaw.length > 170 ? `${bodyRaw.slice(0, 167)}…` : bodyRaw;
  const evidence = shot.evidenceLine;
  const bullets = shot.bullets ?? [];
  const topNotes = bullets.slice(0, 2);
  const ShotIcon = getShotIcon(shot);

  const textBlock = (
    <div className="min-h-0 min-w-0 lg:flex lg:h-full">
      <div
        className={cn(
          "flex h-full min-h-0 w-full flex-col justify-start gap-4 rounded-2xl border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.06),rgba(10,10,10,0.35))] p-5 sm:p-7",
          "border-l-[3px] border-l-[color-mix(in_oklab,var(--accent)_60%,transparent)]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_0_rgba(0,0,0,0.4)]",
          "backdrop-blur-md",
        )}
      >
        <header className="flex items-start gap-3 border-b border-white/[0.06] pb-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-[var(--accent)] shadow-inner">
            <ShotIcon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl">{heading}</h3>
          </div>
        </header>

        <p className="text-[15px] leading-relaxed text-zinc-300 sm:text-[15.5px]">{body}</p>

      {topNotes.length > 0 ? (
          <ul className="space-y-2 border-t border-white/[0.06] pt-4">
            {topNotes.map((b, i) => (
              <li key={`${i}-${b.slice(0, 24)}`} className="flex gap-2.5 text-[13px] leading-snug text-zinc-300">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-[var(--accent)]/85 shadow-[0_0_12px_color-mix(in_oklab,var(--accent)_35%,transparent)]"
                  aria-hidden
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Tags intentionally hidden to reduce duplication with header chips */}
      </div>
    </div>
  );

  const isPortrait = shot.layout === "portrait";

  const shotBlock = (
    <div className={cn("flex min-h-0 min-w-0 flex-col", !isPortrait && "lg:h-full")}>
      <div
        className={cn(
          "flex min-h-0 min-w-0",
          !isPortrait && "flex-1",
          isPortrait ? "items-center justify-center" : "items-stretch",
        )}
      >
        <ShotPanel
          shot={shot}
          priority={priority}
          fillRow
          className={cn(
            "max-w-full",
            isPortrait && "w-full max-w-[min(100%,300px)] max-h-[min(56vh,520px)]",
          )}
        />
      </div>
      {evidence ? (
        <p className="mt-3 max-w-xl border-t border-white/[0.06] pt-3 text-[12px] leading-snug text-zinc-500 sm:text-[13px]">
          {evidence}
        </p>
      ) : null}
    </div>
  );

  const mobileCard = (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(165deg,rgba(255,255,255,0.05),rgba(10,10,10,0.36))] shadow-[0_18px_60px_rgba(0,0,0,0.38)] ring-1 ring-white/[0.04]">
      <ShotPanel shot={shot} priority={priority} className="w-full rounded-none p-0" />
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-[var(--accent)] shadow-inner">
            <ShotIcon className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="text-base font-semibold leading-snug tracking-tight text-zinc-50">{heading}</h3>
          </div>
        </div>

        <p className="mt-3 text-[14.5px] leading-relaxed text-zinc-300">{body}</p>

        {topNotes.length > 0 ? (
          <ul className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
            {topNotes.map((b, i) => (
              <li key={`${i}-${b.slice(0, 24)}`} className="flex gap-2.5 text-[13px] leading-snug text-zinc-300">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-[var(--accent)]/85 shadow-[0_0_12px_color-mix(in_oklab,var(--accent)_35%,transparent)]"
                  aria-hidden
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {evidence ? (
          <p className="mt-4 border-t border-white/[0.06] pt-4 text-[12px] leading-snug text-zinc-500">
            {evidence}
          </p>
        ) : null}
      </div>
    </div>
  );

  return (
    <>
      <div className="py-4 sm:py-5 lg:hidden">{mobileCard}</div>
      <div className="hidden grid gap-4 py-4 sm:gap-5 sm:py-5 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-8 lg:py-6">
        {textFirst ? (
          <>
            {textBlock}
            {shotBlock}
          </>
        ) : (
          <>
            {shotBlock}
            {textBlock}
          </>
        )}
      </div>
    </>
  );
}

function TechLayerCard({
  title,
  icon: Icon,
  lines,
  image,
}: {
  title: string;
  icon: typeof LayoutTemplate;
  lines: string[];
  image?: { src: string; alt: string };
}) {
  return (
    <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(10,10,10,0.35))] shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.04]">
      <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-4 py-3 sm:px-5 sm:py-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-[var(--accent)]">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">{title}</h3>
      </div>

      {image ? (
        <figure className="relative m-0 w-full border-b border-white/[0.06] bg-zinc-950/95">
          <div className="relative aspect-[16/10] w-full min-h-[200px] max-h-[min(42vh,320px)] sm:min-h-[220px] sm:max-h-[340px]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 32vw, 96vw"
              className="object-contain object-center p-2 sm:p-4"
            />
          </div>
          <figcaption className="sr-only">{image.alt}</figcaption>
        </figure>
      ) : null}

      <div className="px-4 py-4 sm:px-5 sm:py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">Summary</p>
        <ul className="mt-2.5 space-y-2 text-[13px] leading-snug text-zinc-400">
          {lines.map((line) => (
            <li key={line} className="flex gap-2.5">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-[var(--accent)]/80 shadow-[0_0_10px_color-mix(in_oklab,var(--accent)_30%,transparent)]"
                aria-hidden
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: ProjectFeature; index: number }) {
  const Icon = getFeatureIcon(feature.title);

  return (
    <li
      className={cn(
        "rounded-xl border border-white/[0.08]",
        "bg-[linear-gradient(165deg,rgba(255,255,255,0.04)_0%,rgba(10,10,10,0.38)_100%)]",
        "p-4 shadow-[0_10px_30px_rgba(0,0,0,0.32)] ring-1 ring-white/[0.04]",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/[0.10] bg-white/[0.03] text-[var(--accent)] shadow-inner">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[13px] font-semibold leading-snug text-zinc-50">{feature.title}</h3>
          {feature.description ? (
            <p className="mt-1 text-[12px] leading-snug text-zinc-300">{feature.description}</p>
          ) : null}
          {feature.bullets?.length ? (
            <ul className="mt-2 space-y-1.5">
              {feature.bullets.map((line) => (
                <li key={line} className="flex gap-2.5 text-[11.5px] leading-snug text-zinc-400">
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]/70 shadow-[0_0_8px_color-mix(in_oklab,var(--accent)_35%,transparent)]"
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const gallery = useMemo(() => getCaseStudyGallery(project), [project]);
  const features = useMemo(() => getCaseStudyFeatures(project), [project]);
  const coreFeatures = useMemo(() => features.slice(0, 5), [features]);
  const moreFeatures = useMemo(() => features.slice(5), [features]);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const diagrams = project.detail?.diagrams;
  const contribution = project.detail?.contribution ?? [];
  const impactBullets = project.detail?.impactBullets ?? [];
  const stackSummary = useMemo(
    () => project.stack.slice(0, 6).join(" · "),
    [project.stack],
  );

  const feLines = useMemo(
    () => project.frontend.highlights.slice(0, 3),
    [project.frontend.highlights],
  );
  const apiLines = useMemo(
    () => [...project.backend.api, ...(project.backend.architecture?.slice(0, 1) ?? [])].slice(0, 3),
    [project.backend.api, project.backend.architecture],
  );
  const dbLines = useMemo(
    () => [...project.backend.data, ...(project.backend.auth?.slice(0, 1) ?? [])].slice(0, 3),
    [project.backend.data, project.backend.auth],
  );

  const motionFade = {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-6% 0px" },
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <article className="w-full overflow-x-clip">
      <div className="border-b border-white/[0.06] bg-[linear-gradient(105deg,rgba(34,211,238,0.07)_0%,transparent_38%,rgba(167,139,250,0.06)_100%)]">
        <Container className={cn(shell, "pb-5 pt-3 sm:pb-7 sm:pt-4 lg:px-12")}>
          <nav aria-label="Breadcrumb" className="hidden text-[11px] text-zinc-500 sm:block">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-zinc-200">
                  Home
                </Link>
              </li>
              <li className="text-zinc-700" aria-hidden>
                /
              </li>
              <li>
                <Link href="/#projects" className="text-zinc-400 hover:text-zinc-200">
                  Projects
                </Link>
              </li>
              <li className="text-zinc-700" aria-hidden>
                /
              </li>
              <li className="truncate font-medium text-zinc-300">{project.title}</li>
            </ol>
          </nav>

          <div className="mt-4 flex flex-col gap-4 lg:mt-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl lg:text-[2rem] lg:leading-tight">
                {project.title}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-snug text-zinc-400 sm:text-[15px]">
                {project.oneLiner}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 lg:justify-end">
              <Chip className="text-[11px]">{project.role}</Chip>
              {project.stack.slice(0, 6).map((s) => (
                <Chip
                  key={s}
                  className="border-white/[0.08] bg-white/[0.03] text-[11px] text-zinc-300"
                >
                  {s}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button href="/#contact" variant="primary" size="sm">
              Live demo
              <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
            </Button>
            <Button href={`mailto:${profile.links.email}`} variant="secondary" size="sm">
            <Mail className="h-4 w-4 shrink-0" aria-hidden />
            Email me
            </Button>
          </div>

          {/* Problem + Impact section intentionally hidden */}
        </Container>
      </div>

      <Container className={cn(shell, "py-5 sm:py-7 lg:px-12")}>
        {features.length > 0 ? (
          <motion.section id="features" className="scroll-section mt-6 sm:mt-8" {...motionFade}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]/85" aria-hidden />
                Key features
              </h2>
              <p className="text-[11px] text-zinc-600">
                Scan in 10 seconds
              </p>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-3">
              {coreFeatures.map((f, idx) => (
                <FeatureCard key={`${f.title}-${idx}`} feature={f} index={idx} />
              ))}
            </ul>

            {moreFeatures.length > 0 ? (
              <div className="mt-3">
                <button
                  type="button"
                  className={cn(
                    "text-[12px] font-medium text-zinc-300 underline decoration-white/15 underline-offset-4",
                    "hover:text-zinc-50 hover:decoration-white/30",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                  )}
                  aria-expanded={showMoreFeatures}
                  aria-controls="more-features"
                  onClick={() => setShowMoreFeatures((v) => !v)}
                >
                  {showMoreFeatures ? "Show fewer" : "+ more features"}
                </button>

                {showMoreFeatures ? (
                  <div id="more-features" className="mt-3">
                    <ul className="grid gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-3">
                      {moreFeatures.map((f, idx) => (
                        <FeatureCard
                          key={`${f.title}-more-${idx}`}
                          feature={f}
                          index={idx + coreFeatures.length}
                        />
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div id="more-features" className="sr-only" />
                )}
              </div>
            ) : null}
          </motion.section>
        ) : null}

        {contribution.length > 0 ? (
          <motion.section
            id="contribution"
            className={cn(
              "scroll-section mt-6 border-t border-white/[0.06] pt-6 sm:mt-8 sm:pt-8",
              features.length === 0 ? "border-t-0 pt-0" : "",
            )}
            {...motionFade}
          >
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                <Target className="h-3.5 w-3.5 text-[var(--accent)]/85" aria-hidden />
                My contribution
              </h2>
              <p className="text-[11px] text-zinc-600">What I personally owned</p>
            </div>
            <ul className="mt-4 space-y-2">
              {contribution.map((line) => (
                <li key={line} className="flex gap-2.5 text-[13px] leading-snug text-zinc-300">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-[var(--accent)]/80 shadow-[0_0_10px_color-mix(in_oklab,var(--accent)_30%,transparent)]"
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        ) : null}

        {impactBullets.length > 0 ? (
          <motion.section
            id="impact"
            className={cn(
              "scroll-section mt-6 border-t border-white/[0.06] pt-6 sm:mt-8 sm:pt-8",
              contribution.length === 0 && features.length === 0 ? "border-t-0 pt-0" : "",
            )}
            {...motionFade}
          >
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                <Target className="h-3.5 w-3.5 text-[var(--accent)]/85" aria-hidden />
                Impact
              </h2>
              <p className="text-[11px] text-zinc-600">Outcome</p>
            </div>
            <ul className="mt-4 space-y-2">
              {impactBullets.map((line) => (
                <li key={line} className="flex gap-2.5 text-[13px] leading-snug text-zinc-300">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-sm bg-[var(--accent)]/80 shadow-[0_0_10px_color-mix(in_oklab,var(--accent)_30%,transparent)]"
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        ) : null}

        {gallery.length > 0 ? (
          <motion.section
            id="walkthrough"
            className={cn(
              "scroll-section mt-6 sm:mt-8",
              features.length > 0 || contribution.length > 0 || impactBullets.length > 0
                ? "border-t border-white/[0.06] pt-6 sm:pt-8"
                : "",
            )}
            {...motionFade}
          >
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                <LayoutTemplate className="h-3.5 w-3.5 text-[var(--accent)]/85" aria-hidden />
                Screenshots
              </h2>
              <p className="text-[11px] text-zinc-600">UI walkthrough</p>
            </div>
            <div className="mt-1 divide-y divide-white/[0.05]">
              {gallery.map((shot, idx) => (
                <StoryRow key={`${shot.src}-${idx}`} index={idx} shot={shot} priority={idx < 2} />
              ))}
            </div>
          </motion.section>
        ) : null}

        {diagrams ? (
          <motion.section
            id="stack"
            className={cn(
              "scroll-section mt-6 border-t border-white/[0.06] pt-6 sm:mt-8 sm:pt-8",
              gallery.length === 0 && features.length === 0 ? "border-t-0 pt-0" : "",
            )}
            {...motionFade}
          >
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] ring-1 ring-white/[0.04]">
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <h2 className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    <Network className="h-3.5 w-3.5 text-[var(--accent)]/85" aria-hidden />
                    {project.title} &#183; architecture
                  </h2>
                  <p className="max-w-[min(100%,28rem)] text-right text-[11px] leading-snug text-zinc-600">
                    {stackSummary}
                  </p>
                </div>
              </div>

              {diagrams?.api && !diagrams?.frontend && !diagrams?.sql ? (
                <figure className="w-full">
                  <div className="relative aspect-[170/67] w-full bg-zinc-950/40">
                    <Image
                      src={diagrams.api.src}
                      alt={diagrams.api.alt}
                      fill
                      sizes="(min-width: 1024px) 90rem, 96vw"
                      className="object-contain object-center"
                    />
                  </div>
                  <figcaption className="sr-only">{diagrams.api.alt}</figcaption>
                </figure>
              ) : (
                <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                  <div className="grid gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                    <TechLayerCard title="Frontend" icon={LayoutTemplate} lines={feLines} image={diagrams?.frontend} />
                    <TechLayerCard title="API" icon={Network} lines={apiLines} image={diagrams?.api} />
                    <TechLayerCard title="Database" icon={Database} lines={dbLines} image={diagrams?.sql} />
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        ) : null}

        {/* Approach section intentionally hidden */}

        {/* Back to projects button intentionally removed */}
      </Container>

      <ScrollToTopButton />
    </article>
  );
}
