"use client";

import { useFormState, useFormStatus } from "react-dom";
import { AlertCircle } from "lucide-react";

import type { FormState } from "@/lib/actions/projects";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Values = {
  title?: string | null;
  tagline?: string | null;
  description?: string | null;
  track?: string | null;
  repoUrl?: string | null;
  demoUrl?: string | null;
  videoUrl?: string | null;
  teamMembers?: string | null;
};

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Saving..." : label}
    </Button>
  );
}

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="mt-1.5 text-xs text-destructive">{messages[0]}</p>;
}

export function ProjectForm({
  action,
  projectId,
  values,
  submitLabel = "Save project",
  tracks = [],
}: {
  action: Action;
  projectId?: string;
  values?: Values;
  submitLabel?: string;
  tracks?: string[];
}) {
  const [state, formAction] = useFormState(action, { ok: false } as FormState);
  const fe = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-6">
      {projectId && <input type="hidden" name="projectId" value={projectId} />}

      {state.error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Project title</Label>
        <Input
          id="title"
          name="title"
          defaultValue={values?.title ?? ""}
          placeholder="Latchkey"
          required
        />
        <FieldError messages={fe.title} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            name="tagline"
            defaultValue={values?.tagline ?? ""}
            placeholder="AI scheduling for clinics"
          />
          <FieldError messages={fe.tagline} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="track">Track</Label>
          {tracks.length ? (
            <select
              id="track"
              name="track"
              defaultValue={values?.track ?? ""}
              className="flex h-11 w-full rounded-md border border-input bg-secondary/40 px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">No track</option>
              {tracks.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          ) : (
            <Input
              id="track"
              name="track"
              defaultValue={values?.track ?? ""}
              placeholder="AI Agents"
            />
          )}
          <FieldError messages={fe.track} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={values?.description ?? ""}
          placeholder="What did you build, how does it work, and what's the impact?"
          className="min-h-[160px]"
        />
        <FieldError messages={fe.description} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="repoUrl">Repo URL</Label>
          <Input
            id="repoUrl"
            name="repoUrl"
            defaultValue={values?.repoUrl ?? ""}
            placeholder="https://github.com/..."
          />
          <FieldError messages={fe.repoUrl} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="demoUrl">Live demo URL</Label>
          <Input
            id="demoUrl"
            name="demoUrl"
            defaultValue={values?.demoUrl ?? ""}
            placeholder="https://..."
          />
          <FieldError messages={fe.demoUrl} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="videoUrl">Demo video URL</Label>
          <Input
            id="videoUrl"
            name="videoUrl"
            defaultValue={values?.videoUrl ?? ""}
            placeholder="https://youtu.be/..."
          />
          <FieldError messages={fe.videoUrl} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="teamMembers">Team members</Label>
        <Textarea
          id="teamMembers"
          name="teamMembers"
          defaultValue={values?.teamMembers ?? ""}
          placeholder="One per line: name and role or email"
          className="min-h-[80px]"
        />
        <FieldError messages={fe.teamMembers} />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton label={submitLabel} />
        <span className="text-xs text-muted-foreground">
          Saving keeps it as a draft. You submit it for judging from the project
          page.
        </span>
      </div>
    </form>
  );
}
