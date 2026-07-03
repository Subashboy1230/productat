import Link from "next/link";
import { Gavel, CheckCircle2, Clock } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-helpers";
import { getSettings } from "@/lib/settings";
import { AppHeader } from "@/components/app/app-header";

export const dynamic = "force-dynamic";

export default async function JudgeQueuePage() {
  const user = await requireRole(["JUDGE", "ADMIN"]);
  const settings = await getSettings();

  const projects = await prisma.project.findMany({
    where: {
      status: { in: ["SUBMITTED", "UNDER_REVIEW"] },
      NOT: { ownerId: user.id },
    },
    orderBy: [{ submittedAt: "asc" }],
    include: {
      owner: { select: { name: true } },
      scores: { where: { judgeId: user.id }, select: { id: true } },
    },
  });

  const pending = projects.filter((p) => p.scores.length === 0);
  const done = projects.filter((p) => p.scores.length > 0);

  return (
    <div className="min-h-screen">
      <AppHeader user={user} />
      <main className="mx-auto max-w-[1000px] px-6 py-10">
        <div className="flex items-center gap-3">
          <Gavel className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-semibold tracking-tight">Judging</h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          {settings.judgingOpen
            ? "Score each submitted project against the rubric. You can revise scores any time while judging is open."
            : "Judging is currently closed. You can review submissions, but scoring is disabled."}
        </p>

        {projects.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center ring-hairline">
            <p className="text-sm text-muted-foreground">
              No submitted projects yet. Check back once teams start submitting.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            <QueueGroup
              title="Needs your score"
              icon={<Clock className="h-4 w-4 text-amber-400" />}
              projects={pending}
              empty="You've scored everything submitted so far."
            />
            <QueueGroup
              title="Scored by you"
              icon={<CheckCircle2 className="h-4 w-4 text-emerald-400" />}
              projects={done}
              empty="Nothing scored yet."
            />
          </div>
        )}
      </main>
    </div>
  );
}

function QueueGroup({
  title,
  icon,
  projects,
  empty,
}: {
  title: string;
  icon: React.ReactNode;
  projects: {
    id: string;
    title: string;
    tagline: string | null;
    track: string | null;
    owner: { name: string | null };
  }[];
  empty: string;
}) {
  return (
    <section>
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon}
        {title}
        <span className="text-muted-foreground">({projects.length})</span>
      </div>
      {projects.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">{empty}</p>
      ) : (
        <div className="mt-3 grid gap-3">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/judge/${p.id}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 ring-hairline transition-colors hover:border-primary/30"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium">{p.title}</span>
                  {p.track && (
                    <span className="rounded-full border border-border bg-secondary/40 px-2 py-0.5 text-[11px] text-muted-foreground">
                      {p.track}
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {p.tagline || p.owner.name || "Untitled team"}
                </p>
              </div>
              <span className="shrink-0 text-sm text-primary">Score →</span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
