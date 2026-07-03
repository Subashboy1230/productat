import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, Globe, Video, Pencil, Gavel } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireUser, canJudge, isAdmin } from "@/lib/auth-helpers";
import { getSettings } from "@/lib/settings";
import { computeProjectScore, formatScore } from "@/lib/scoring";
import { submitProject, withdrawProject } from "@/lib/actions/projects";
import { AppHeader } from "@/components/app/app-header";
import { StatusBadge } from "@/components/app/status-badge";
import { InlineAction } from "@/components/app/inline-action";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireUser();
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { owner: { select: { name: true, image: true } } },
  });
  if (!project) notFound();

  const isOwner = project.ownerId === user.id;
  const judgeOrAdmin = canJudge(user.role);
  if (!isOwner && !judgeOrAdmin) notFound();

  const [settings, metrics, scores, feedback] = await Promise.all([
    getSettings(),
    prisma.metric.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.score.findMany({ where: { projectId: project.id } }),
    prisma.feedback.findMany({
      where: { projectId: project.id },
      include: { judge: { select: { name: true } } },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const result = computeProjectScore(metrics, scores);
  const showResults = settings.resultsPublished || judgeOrAdmin;

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
          href={isOwner ? "/dashboard" : "/judge"}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {isOwner ? "Dashboard" : "Judging"}
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {project.title}
          </h1>
          <StatusBadge status={project.status} />
          {project.track && (
            <span className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
              {project.track}
            </span>
          )}
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

        {project.teamMembers && (
          <div className="mt-8">
            <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Team
            </h2>
            <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">
              {project.teamMembers}
            </p>
          </div>
        )}

        {/* Owner controls */}
        {isOwner && (
          <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-border pt-6">
            {project.status !== "SCORED" && project.status !== "UNDER_REVIEW" && (
              <Button asChild variant="outline">
                <Link href={`/dashboard/projects/${project.id}/edit`}>
                  <Pencil className="h-4 w-4" /> Edit
                </Link>
              </Button>
            )}
            {project.status === "DRAFT" &&
              (settings.submissionsOpen ? (
                <InlineAction
                  action={submitProject}
                  projectId={project.id}
                  label="Submit for judging"
                  pendingLabel="Submitting..."
                />
              ) : (
                <span className="text-sm text-muted-foreground">
                  Submissions are closed.
                </span>
              ))}
            {project.status === "SUBMITTED" && (
              <InlineAction
                action={withdrawProject}
                projectId={project.id}
                label="Withdraw to draft"
                pendingLabel="Withdrawing..."
                variant="outline"
              />
            )}
          </div>
        )}

        {/* Judge / admin entry point */}
        {judgeOrAdmin &&
          (project.status === "SUBMITTED" || project.status === "UNDER_REVIEW") && (
            <div className="mt-9 border-t border-border pt-6">
              <Button asChild>
                <Link href={`/judge/${project.id}`}>
                  <Gavel className="h-4 w-4" /> Score this project
                </Link>
              </Button>
            </div>
          )}

        {/* Results / scoring summary */}
        {showResults && (
          <div className="mt-9 border-t border-border pt-6">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Scoring
              </h2>
              <div className="text-right">
                <span className="text-2xl font-semibold">
                  {formatScore(result.overall)}
                </span>
                <span className="text-sm text-muted-foreground"> / 100</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {result.judgeCount} judge{result.judgeCount === 1 ? "" : "s"} scored
              this project
              {!settings.resultsPublished && isOwner
                ? " (visible to you once results are published)"
                : ""}
              .
            </p>

            <div className="mt-5 space-y-3">
              {metrics.map((m) => {
                const pm = result.perMetric[m.id];
                const pct = pm && pm.count ? (pm.average / m.maxScore) * 100 : 0;
                return (
                  <div key={m.id}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{m.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {pm && pm.count ? pm.average.toFixed(1) : "—"} / {m.maxScore}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {feedback.length > 0 && (
              <div className="mt-7">
                <h3 className="text-sm font-medium">Judge feedback</h3>
                <div className="mt-3 space-y-3">
                  {feedback.map((f) => (
                    <div
                      key={f.id}
                      className="rounded-xl border border-border bg-card p-4 ring-hairline"
                    >
                      <p className="text-sm leading-relaxed text-foreground/90">
                        {f.comment}
                      </p>
                      {isAdmin(user.role) && f.judge.name && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          {f.judge.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
