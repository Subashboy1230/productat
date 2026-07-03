import Link from "next/link";
import { Plus, Gavel, Trophy, FolderGit2, ArrowRight } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-helpers";
import { getSettings } from "@/lib/settings";
import { AppHeader } from "@/components/app/app-header";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

function PhasePills({
  submissionsOpen,
  judgingOpen,
  resultsPublished,
}: {
  submissionsOpen: boolean;
  judgingOpen: boolean;
  resultsPublished: boolean;
}) {
  const pill = (label: string, on: boolean) => (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${
        on
          ? "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30"
          : "bg-secondary text-muted-foreground ring-border"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          on ? "bg-emerald-400" : "bg-muted-foreground/50"
        }`}
      />
      {label}
    </span>
  );
  return (
    <div className="flex flex-wrap gap-2">
      {pill("Submissions", submissionsOpen)}
      {pill("Judging", judgingOpen)}
      {pill("Results", resultsPublished)}
    </div>
  );
}

export default async function DashboardPage() {
  const user = await requireUser();
  const settings = await getSettings();

  return (
    <div className="min-h-screen">
      <AppHeader user={user} />
      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{settings.eventName}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Welcome, {user.name?.split(" ")[0] || "builder"}
            </h1>
          </div>
          <PhasePills
            submissionsOpen={settings.submissionsOpen}
            judgingOpen={settings.judgingOpen}
            resultsPublished={settings.resultsPublished}
          />
        </div>

        <div className="mt-10">
          {user.role === "HACKER" ? (
            <HackerHome userId={user.id} submissionsOpen={settings.submissionsOpen} />
          ) : user.role === "JUDGE" ? (
            <JudgeHome userId={user.id} judgingOpen={settings.judgingOpen} />
          ) : (
            <AdminHome />
          )}
        </div>
      </main>
    </div>
  );
}

async function HackerHome({
  userId,
  submissionsOpen,
}: {
  userId: string;
  submissionsOpen: boolean;
}) {
  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Your projects</h2>
        <Button asChild size="sm" disabled={!submissionsOpen}>
          <Link href="/dashboard/projects/new">
            <Plus className="h-4 w-4" /> New project
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center ring-hairline">
          <FolderGit2 className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">
            No projects yet. Start one and submit it before the deadline.
          </p>
          <Button asChild className="mt-5">
            <Link href="/dashboard/projects/new">
              <Plus className="h-4 w-4" /> Create your first project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-3">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.id}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 ring-hairline transition-colors hover:border-primary/30"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="truncate font-medium">{p.title}</span>
                  <StatusBadge status={p.status} />
                </div>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {p.tagline || "No tagline yet"}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

async function JudgeHome({
  userId,
  judgingOpen,
}: {
  userId: string;
  judgingOpen: boolean;
}) {
  const queueProjects = await prisma.project.findMany({
    where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } },
    select: { id: true, scores: { where: { judgeId: userId }, select: { id: true } } },
  });
  const pending = queueProjects.filter((p) => p.scores.length === 0).length;

  return (
    <section className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 ring-hairline">
        <Gavel className="h-6 w-6 text-primary" />
        <h2 className="mt-4 text-lg font-medium">Judging queue</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {judgingOpen
            ? `${pending} project${pending === 1 ? "" : "s"} waiting for your score.`
            : "Judging hasn't opened yet. Check back soon."}
        </p>
        <Button asChild className="mt-5" disabled={!judgingOpen}>
          <Link href="/judge">
            Open judging console <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="rounded-2xl border border-border bg-card p-6 ring-hairline">
        <Trophy className="h-6 w-6 text-primary" />
        <h2 className="mt-4 text-lg font-medium">Leaderboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          See how projects rank as scores come in.
        </p>
        <Button asChild variant="outline" className="mt-5">
          <Link href="/leaderboard">View leaderboard</Link>
        </Button>
      </div>
    </section>
  );
}

async function AdminHome() {
  const [projects, submitted, judges, invites, metrics, waitlist] =
    await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW", "SCORED"] } } }),
      prisma.user.count({ where: { role: "JUDGE" } }),
      prisma.judgeInvite.count(),
      prisma.metric.count({ where: { active: true } }),
      prisma.waitlist.count(),
    ]);

  const stat = (label: string, value: number) => (
    <div className="rounded-xl border border-border bg-card px-5 py-4 ring-hairline">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stat("Projects", projects)}
        {stat("Submitted", submitted)}
        {stat("Judges", judges)}
        {stat("Rubric metrics", metrics)}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Button asChild size="lg">
          <Link href="/admin">
            <Gavel className="h-4 w-4" /> Admin console
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/judge">Judge projects</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/leaderboard">
            <Trophy className="h-4 w-4" /> Leaderboard
          </Link>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        {invites} email{invites === 1 ? "" : "s"} on the judge invite list, and{" "}
        {waitlist} on the waitlist.
      </p>
    </section>
  );
}
