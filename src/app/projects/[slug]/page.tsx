import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { projects } from "@/lib/projects";
import { profile } from "@/lib/profile";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return {
    title: project.title,
    description: project.oneLiner,
    openGraph: {
      title: `${project.title} · ${profile.name}`,
      description: project.oneLiner,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <div className="min-h-full bg-[var(--background)] pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
      <main id="main-content" className="isolate" tabIndex={-1}>
        <ProjectCaseStudy project={project} />
      </main>
    </div>
  );
}
