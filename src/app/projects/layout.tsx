import { ProjectsBreadcrumbHeader } from "../../components/ProjectsBreadcrumbHeader";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProjectsBreadcrumbHeader />
      {children}
    </>
  );
}
