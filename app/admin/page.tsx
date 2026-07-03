import Link from "next/link";
import { Trophy, Users, SlidersHorizontal, Trash2 } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-helpers";
import { getSettings } from "@/lib/settings";
import {
  setPhase,
  publishResults,
  removeJudge,
  removeMetric,
} from "@/lib/actions/admin";
import { AppHeader } from "@/components/app/app-header";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/app/submit-button";
import { JudgeInviteForm } from "@/components/app/judge-invite-form";
import { MetricForm } from "@/components/app/metric-form";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireRole(["ADMIN"]);
  const settings = await getSettings();

  const [metrics, invites, judgeUsers] = await Promise.all([
    prisma.metric.findMany({ orderBy: { order: "asc" } }),
    prisma.judgeInvite.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.user.findMany({
      where: { role: { in: ["JUDGE", "ADMIN"] } },
      select: { email: true, role: true },
    }),
  ]);
  const signedInJudges = new Set(
    judgeUsers.map((u) => (u.email ?? "").toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <AppHeader user={user} />
      <main className="mx-auto max-w-[1000px] space-y-10 px-6 py-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Admin</h1>
          <Button asChild variant="outline" size="sm">
            <Link href="/leaderboard">
              <Trophy className="h-4 w-4" /> Leaderboard
            </Link>
          </Button>
        </div>

        {/* Event phases */}
        <section className="rounded-2xl border border-border bg-card p-6 ring-hairline">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">Event phases</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Drive the quality loop: open submissions, open judging, then publish
            results to reveal scores and feedback to hackers.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <PhaseCard
              title="Submissions"
              on={settings.submissionsOpen}
              phase="submissionsOpen"
            />
            <PhaseCard
              title="Judging"
              on={settings.judgingOpen}
              phase="judgingOpen"
            />
            <div className="rounded-xl border border-border bg-background/40 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Results</span>
                <span
                  className={`text-xs ${
                    settings.resultsPublished
                      ? "text-emerald-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {settings.resultsPublished ? "Published" : "Hidden"}
                </span>
              </div>
              <div className="mt-3">
                {settings.resultsPublished ? (
                  <form action={setPhase}>
                    <input type="hidden" name="phase" value="resultsPublished" />
                    <input type="hidden" name="value" value="0" />
                    <SubmitButton size="sm" variant="outline" pendingText="...">
                      Unpublish
                    </SubmitButton>
                  </form>
                ) : (
                  <form action={publishResults}>
                    <SubmitButton size="sm" pendingText="Publishing...">
                      Publish results
                    </SubmitButton>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Judge list */}
        <section className="rounded-2xl border border-border bg-card p-6 ring-hairline">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">Judges</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Add an email to the judge list. That person gets the judge role the
            moment they sign in with GitHub using that email.
          </p>

          <div className="mt-5">
            <JudgeInviteForm />
          </div>

          <div className="mt-6 divide-y divide-border">
            {invites.length === 0 && (
              <p className="py-3 text-sm text-muted-foreground">
                No judges on the list yet.
              </p>
            )}
            {invites.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm">{inv.email}</span>
                    {signedInJudges.has(inv.email.toLowerCase()) ? (
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-400">
                        signed in
                      </span>
                    ) : (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
                        invited
                      </span>
                    )}
                  </div>
                  {inv.note && (
                    <p className="truncate text-xs text-muted-foreground">
                      {inv.note}
                    </p>
                  )}
                </div>
                <form action={removeJudge}>
                  <input type="hidden" name="email" value={inv.email} />
                  <SubmitButton
                    size="sm"
                    variant="ghost"
                    pendingText="..."
                  >
                    <Trash2 className="h-4 w-4" />
                  </SubmitButton>
                </form>
              </div>
            ))}
          </div>
        </section>

        {/* Rubric */}
        <section className="rounded-2xl border border-border bg-card p-6 ring-hairline">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-medium">Judging rubric</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            The metric set judges score against. Weights scale each metric's
            contribution to the overall score.
          </p>

          <div className="mt-5 space-y-3">
            {metrics.map((m) => (
              <details
                key={m.id}
                className="rounded-xl border border-border bg-background/40 p-4"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-xs text-muted-foreground">
                    weight {m.weight}, max {m.maxScore}
                  </span>
                </summary>
                <div className="mt-4 space-y-4">
                  <MetricForm metric={m} submitLabel="Save changes" />
                  <form action={removeMetric}>
                    <input type="hidden" name="metricId" value={m.id} />
                    <SubmitButton
                      size="sm"
                      variant="ghost"
                      pendingText="Removing..."
                    >
                      <Trash2 className="h-4 w-4" /> Remove metric
                    </SubmitButton>
                  </form>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <h3 className="text-sm font-medium">Add a metric</h3>
            <div className="mt-3">
              <MetricForm submitLabel="Add metric" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function PhaseCard({
  title,
  on,
  phase,
}: {
  title: string;
  on: boolean;
  phase: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        <span
          className={`text-xs ${on ? "text-emerald-400" : "text-muted-foreground"}`}
        >
          {on ? "Open" : "Closed"}
        </span>
      </div>
      <div className="mt-3">
        <form action={setPhase}>
          <input type="hidden" name="phase" value={phase} />
          <input type="hidden" name="value" value={on ? "0" : "1"} />
          <SubmitButton
            size="sm"
            variant={on ? "outline" : "default"}
            pendingText="..."
          >
            {on ? `Close ${title.toLowerCase()}` : `Open ${title.toLowerCase()}`}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
