"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { useMemo } from "react";

import { projects } from "@/lib/projects";

function titleFromSlug(slug: string) {
  return projects.find((p) => p.slug === slug)?.title ?? slug.replace(/-/g, " ");
}

export function ProjectsBreadcrumbHeader() {
  const pathname = usePathname();

  const crumb = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    // /projects or /projects/[slug]
    const slug = parts[0] === "projects" ? parts[1] : undefined;
    return {
      isProjectRoot: parts.length === 1 && parts[0] === "projects",
      projectTitle: slug ? titleFromSlug(slug) : undefined,
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[var(--background)]/90 backdrop-blur-md supports-[backdrop-filter]:bg-[var(--background)]/80 lg:hidden">
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-6xl px-4 py-2 sm:px-6"
        style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top, 0px))" }}
      >
        <ol className="flex min-h-12 flex-wrap items-center gap-1.5 text-[12px] text-zinc-500">
          <li>
            <Link
              href="/"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-zinc-300 transition-colors hover:text-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Home
            </Link>
          </li>
          <li className="text-zinc-700" aria-hidden>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <Link
              href="/#projects"
              className="inline-flex min-h-10 items-center rounded-lg px-2 text-zinc-300 transition-colors hover:text-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Projects
            </Link>
          </li>
          {!crumb.isProjectRoot && crumb.projectTitle ? (
            <>
              <li className="text-zinc-700" aria-hidden>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li className="max-w-[min(72vw,26rem)] truncate px-2 font-medium text-zinc-200">
                {crumb.projectTitle}
              </li>
            </>
          ) : null}
        </ol>
      </nav>
    </header>
  );
}

