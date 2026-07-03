"use client";

import { useFormState, useFormStatus } from "react-dom";

import type { FormState } from "@/lib/actions/projects";
import { Button } from "@/components/ui/button";

type Variant = "default" | "outline" | "secondary" | "ghost";
type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

function Btn({
  label,
  pendingLabel,
  variant,
  size,
}: {
  label: string;
  pendingLabel: string;
  variant?: Variant;
  size?: "default" | "sm" | "lg";
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={variant} size={size} disabled={pending}>
      {pending ? pendingLabel : label}
    </Button>
  );
}

export function InlineAction({
  action,
  projectId,
  label,
  pendingLabel = "Working...",
  variant = "default",
  size = "default",
}: {
  action: Action;
  projectId: string;
  label: string;
  pendingLabel?: string;
  variant?: Variant;
  size?: "default" | "sm" | "lg";
}) {
  const [state, formAction] = useFormState(action, { ok: false } as FormState);
  return (
    <form action={formAction} className="inline-flex flex-col items-start gap-1">
      <input type="hidden" name="projectId" value={projectId} />
      <Btn
        label={label}
        pendingLabel={pendingLabel}
        variant={variant}
        size={size}
      />
      {state.error && (
        <span className="text-xs text-destructive">{state.error}</span>
      )}
    </form>
  );
}
