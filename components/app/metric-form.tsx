"use client";

import { useFormState } from "react-dom";

import { saveMetric, type AdminFormState } from "@/lib/actions/admin";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/app/submit-button";

type Metric = {
  id: string;
  name: string;
  description: string | null;
  weight: number;
  maxScore: number;
};

export function MetricForm({
  metric,
  submitLabel = "Add metric",
}: {
  metric?: Metric;
  submitLabel?: string;
}) {
  const [state, action] = useFormState(
    saveMetric,
    { ok: false } as AdminFormState
  );
  const fe = state.fieldErrors ?? {};

  return (
    <form action={action} className="space-y-3">
      {metric && <input type="hidden" name="metricId" value={metric.id} />}

      <div className="grid gap-3 sm:grid-cols-[1fr_90px_90px]">
        <div className="space-y-1">
          <Label htmlFor={`name-${metric?.id ?? "new"}`}>Metric name</Label>
          <Input
            id={`name-${metric?.id ?? "new"}`}
            name="name"
            defaultValue={metric?.name ?? ""}
            placeholder="Technical Execution"
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`weight-${metric?.id ?? "new"}`}>Weight</Label>
          <Input
            id={`weight-${metric?.id ?? "new"}`}
            name="weight"
            type="number"
            step="0.1"
            min="0.1"
            defaultValue={metric?.weight ?? 1}
            required
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor={`max-${metric?.id ?? "new"}`}>Max</Label>
          <Input
            id={`max-${metric?.id ?? "new"}`}
            name="maxScore"
            type="number"
            step="1"
            min="2"
            defaultValue={metric?.maxScore ?? 10}
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor={`desc-${metric?.id ?? "new"}`}>Description</Label>
        <Textarea
          id={`desc-${metric?.id ?? "new"}`}
          name="description"
          defaultValue={metric?.description ?? ""}
          placeholder="What should judges look for?"
          className="min-h-[60px]"
        />
      </div>

      {state.error && (
        <p className="text-xs text-destructive">
          {fe.name?.[0] ?? fe.weight?.[0] ?? fe.maxScore?.[0] ?? state.error}
        </p>
      )}
      {state.ok && (
        <p className="text-xs text-emerald-400">Saved.</p>
      )}

      <SubmitButton size="sm" variant={metric ? "outline" : "default"}>
        {submitLabel}
      </SubmitButton>
    </form>
  );
}
