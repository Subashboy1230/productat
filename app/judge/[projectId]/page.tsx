import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, Globe, Video } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-helpers";
import { getSettings } from "@/lib/settings";
import { AppHeader } from "@/components/app/app-header";
import { StatusBadge } from "@/components/app/status-badge";
import { ScoringForm } from "@/components/app/scoring-form";

export const dynamic = "force-dynamic";

export default async function JudgeProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const user = await requireRole(["JUDGE", "ADMIN"]);
  const settings = await getSettings();

  const project = await prisma.project.findUnique({
    where: { id: params.projectId },
    include: { owner: { select: { name: true } } },
  });
  if (!project) notFound();

  const [metrics, myScores, myFeedback] = await Promise.all([
    prisma.metric.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.score.findMany({
      where: { projectId: project.id, judgeId: user.id },
    }),
    prisma.feedback.findUnique({
      where: { projectId_judgeId: { projectId: project.id, judgeId: user.id } },
    }),
  ]);

  const existing: Record<string, number> = {};
  for (const s of myScores) existing[s.metricId] = s.value;

  const isOwnProject = project.ownerId === user.id;
  const judgeable =
    settings.judgingOpen &&
    (project.status === "SUBMITTED" || project.status === "UNDER_REVIEW") &&
    !isOwnProject;

  const links = [
    { icon: Github, label: "Repo", url: project.repoUrl },
    { icon: Globe, label: "Demo", url: project.demoUrl },
    { icon: Video, label: "Video", url: project.videoUrl },
  ].filter((l) => l.url);

  return (
    <div className="min-h-screen">
      <AppHeader user={user} />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <Link
          href="/judge"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Judging queue
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {project.title}
          </h1>
          <StatusBadge status={project.status} />
        </div>
        {project.tagline && (
          <p className="mt-2 text-lg text-muted-foreground">{project.tagline}</p>
        )}

        {links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.url ?? "#"}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-3 py-1.5 text-sm transition-colors hover:border-primary/30 hover:text-foreground"
              >
                <l.icon className="h-4 w-4" /> {l.label}
              </a>
            ))}
          </div>
        )}

        {project.description && (
          <div className="mt-8">
            <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              About
            </h2>
            <p className="mt-3 whitespace-pre-wrap leading-relaxed text-foreground/90">
              {project.description}
            </p>
          </div>
        )}

        <div className="mt-10 border-t border-border pt-8">
          <h2 className="text-xl font-semibold tracking-tight">Your scores</h2>
          {metrics.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              No rubric metrics defined yet. An admin needs to add metrics first.
            </p>
          ) : isOwnProject ? (
            <p className="mt-3 text-sm text-muted-foreground">
              This is your own project, so you can't score it.
            </p>
          ) : !settings.judgingOpen ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Judging is closed, so scoring is disabled.
            </p>
          ) : !judgeable ? (
            <p className="mt-3 text-sm text-muted-foreground">
              This project isn't open for judging.
            </p>
          ) : (
            <div className="mt-5">
              <ScoringForm
                projectId={project.id}
                metrics={metrics}
                existing={existing}
                existingFeedback={myFeedback?.comment}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
