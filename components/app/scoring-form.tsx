"use client";

import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";

import { saveScores, type JudgeFormState } from "@/lib/actions/judging";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type ScoringMetric = {
  id: string;
  name: string;
  description?: string | null;
  maxScore: number;
  weight: number;
};

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Saving..." : "Save scores"}
    </Button>
  );
}

function MetricRow({
  metric,
  defaultValue,
}: {
  metric: ScoringMetric;
  defaultValue: number;
}) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <div className="rounded-xl border border-border bg-card p-5 ring-hairline">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{metric.name}</span>
            {metric.weight !== 1 && (
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
                weight {metric.weight}
              </span>
            )}
          </div>
          {metric.description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {metric.description}
            </p>
          )}
        </div>
        <div className="shrink-0 text-right">
          <span className="font-mono text-2xl font-semibold tabular-nums">
            {value}
          </span>
          <span className="text-sm text-muted-foreground">/{metric.maxScore}</span>
        </div>
      </div>
      <input
        type="range"
        name={`metric_${metric.id}`}
        min={0}
        max={metric.maxScore}
        step={1}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[hsl(var(--primary))]"
      />
    </div>
  );
}

export function ScoringForm({
  projectId,
  metrics,
  existing,
  existingFeedback,
}: {
  projectId: string;
  metrics: ScoringMetric[];
  existing: Record<string, number>;
  existingFeedback?: string;
}) {
  const [state, formAction] = useFormState(
    saveScores,
    { ok: false } as JudgeFormState
  );

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="projectId" value={projectId} />

      {state.error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}
      {state.saved && (
        <div className="flex items-start gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Scores saved. You can revise them any time while judging is open.</span>
        </div>
      )}

      <div className="space-y-3">
        {metrics.map((m) => (
          <MetricRow
            key={m.id}
            metric={m}
            defaultValue={existing[m.id] ?? Math.round(m.maxScore / 2)}
          />
        ))}
      </div>

      <div className="space-y-2">
        <Label htmlFor="feedback">Feedback for the team (optional)</Label>
        <Textarea
          id="feedback"
          name="feedback"
          defaultValue={existingFeedback ?? ""}
          placeholder="What worked, what to improve, what stood out."
          className="min-h-[120px]"
        />
      </div>

      <SaveButton />
    </form>
  );
}
