import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-helpers";
import { updateProject } from "@/lib/actions/projects";
import { TRACKS } from "@/lib/constants";
import { AppHeader } from "@/components/app/app-header";
import { ProjectForm } from "@/components/app/project-form";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireUser();
  const project = await prisma.project.findUnique({ where: { id: params.id } });

  if (!project || project.ownerId !== user.id) notFound();
  if (project.status === "SCORED") redirect(`/projects/${project.id}`);

  return (
    <div className="min-h-screen">
      <AppHeader user={user} />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to project
        </Link>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight">
          Edit project
        </h1>

        <div className="mt-8">
          <ProjectForm
            action={updateProject}
            projectId={project.id}
            values={project}
            tracks={[...TRACKS]}
            submitLabel="Save changes"
          />
        </div>
      </main>
    </div>
  );
}
