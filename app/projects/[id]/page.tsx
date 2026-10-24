import { notFound } from "next/navigation";
import { PROJECTS_DATA, getProjectById } from "@/lib/projects";
import { ProjectCaseStudy } from "@/components/project-case-study";

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}

