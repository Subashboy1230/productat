"use client";

import { useFormState, useFormStatus } from "react-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { joinWaitlist, type WaitlistState } from "@/lib/actions/waitlist";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="h-12 shrink-0" disabled={pending}>
      {pending ? "Joining..." : label}
      {!pending && <ArrowRight className="h-4 w-4" />}
    </Button>
  );
}

export function WaitlistForm({
  label = "Apply to join",
  withInterest = false,
  id,
}: {
  label?: string;
  withInterest?: boolean;
  id?: string;
}) {
  const [state, action] = useFormState(
    joinWaitlist,
    { ok: false } as WaitlistState
  );

  if (state.ok) {
    return (
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-4 text-left text-sm text-emerald-400">
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        <span>
          Thanks for applying. We review every request and will email you once
          you&rsquo;re approved.
        </span>
      </div>
    );
  }

  return (
    <form action={action} id={id} className="mx-auto max-w-md space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          type="email"
          name="email"
          required
          placeholder="you@email.com"
          aria-label="Email address"
          className="h-12 sm:flex-1"
        />
        <SubmitButton label={label} />
      </div>
      {withInterest && (
        <Input
          name="interest"
          placeholder="What do you want to build? (optional)"
          aria-label="What do you want to build"
          className="h-12"
        />
      )}
      {state.error && (
        <p className="text-left text-xs text-destructive">{state.error}</p>
      )}
    </form>
  );
}
