import Link from "next/link";
import { Trophy, Lock } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireUser, canJudge } from "@/lib/auth-helpers";
import { getSettings } from "@/lib/settings";
import { computeProjectScore, formatScore } from "@/lib/scoring";
import { AppHeader } from "@/components/app/app-header";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const user = await requireUser();
  const settings = await getSettings();
  const privileged = canJudge(user.role);
  const visible = settings.resultsPublished || privileged;

  return (
    <div className="min-h-screen">
      <AppHeader user={user} />
      <main className="mx-auto max-w-[900px] px-6 py-10">
        <div className="flex items-center gap-3">
          <Trophy className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-semibold tracking-tight">Leaderboard</h1>
        </div>
        <p className="mt-2 text-muted-foreground">{settings.eventName}</p>

        {!visible ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center ring-hairline">
            <Lock className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">
              Results haven't been published yet. Check back after judging wraps
              up.
            </p>
          </div>
        ) : (
          <Rankings live={privileged && !settings.resultsPublished} />
        )}
      </main>
    </div>
  );
}

async function Rankings({ live }: { live: boolean }) {
  const [metrics, projects] = await Promise.all([
    prisma.metric.findMany({ where: { active: true } }),
    prisma.project.findMany({
      where: { status: { in: ["UNDER_REVIEW", "SCORED"] } },
      include: {
        owner: { select: { name: true } },
        scores: { select: { judgeId: true, metricId: true, value: true } },
      },
    }),
  ]);

  const ranked = projects
    .map((p) => ({
      id: p.id,
      title: p.title,
      tagline: p.tagline,
      track: p.track,
      owner: p.owner.name,
      ...computeProjectScore(metrics, p.scores),
    }))
    .sort((a, b) => b.overall - a.overall || b.judgeCount - a.judgeCount);

  if (ranked.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center ring-hairline">
        <p className="text-sm text-muted-foreground">
          No projects have been scored yet.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {live && (
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-3 py-1 text-xs text-amber-400">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Live standings
          (not yet published to hackers)
        </p>
      )}
      <div className="overflow-hidden rounded-2xl border border-border ring-hairline">
        {ranked.map((p, i) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="flex items-center gap-4 border-b border-border bg-card px-5 py-4 transition-colors last:border-0 hover:bg-card/60"
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg font-mono text-sm ${
                i === 0
                  ? "bg-primary/15 text-primary ring-1 ring-inset ring-primary/30"
                  : "bg-secondary/60 text-muted-foreground"
              }`}
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-medium">{p.title}</span>
                {p.track && (
                  <span className="rounded-full border border-border bg-secondary/40 px-2 py-0.5 text-[11px] text-muted-foreground">
                    {p.track}
                  </span>
                )}
              </div>
              <p className="truncate text-sm text-muted-foreground">
                {p.tagline || p.owner || ""}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-lg font-semibold tabular-nums">
                {formatScore(p.overall)}
              </div>
              <div className="text-xs text-muted-foreground">
                {p.judgeCount} judge{p.judgeCount === 1 ? "" : "s"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
