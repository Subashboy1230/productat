"use client";

import { useFormState } from "react-dom";

import { addJudge, type AdminFormState } from "@/lib/actions/admin";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/app/submit-button";

export function JudgeInviteForm() {
  const [state, action] = useFormState(
    addJudge,
    { ok: false } as AdminFormState
  );

  return (
    <form action={action} className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          name="email"
          type="email"
          placeholder="judge@email.com"
          required
          className="sm:flex-1"
        />
        <Input
          name="note"
          placeholder="Note (optional)"
          className="sm:w-48"
        />
        <SubmitButton pendingText="Adding...">Add judge</SubmitButton>
      </div>
      {state.error && (
        <p className="text-xs text-destructive">
          {state.fieldErrors?.email?.[0] ?? state.error}
        </p>
      )}
      {state.ok && (
        <p className="text-xs text-emerald-400">
          Added. They become a judge as soon as they sign in.
        </p>
      )}
    </form>
  );
}
