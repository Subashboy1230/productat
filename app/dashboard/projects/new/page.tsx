import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { requireRole } from "@/lib/auth-helpers";
import { getSettings } from "@/lib/settings";
import { createProject } from "@/lib/actions/projects";
import { TRACKS } from "@/lib/constants";
import { AppHeader } from "@/components/app/app-header";
import { ProjectForm } from "@/components/app/project-form";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const user = await requireRole(["HACKER", "ADMIN"]);
  const settings = await getSettings();

  return (
    <div className="min-h-screen">
      <AppHeader user={user} />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight">
          New project
        </h1>
        <p className="mt-2 text-muted-foreground">
          Save a draft now and keep editing. You submit it for judging from the
          project page.
        </p>

        {!settings.submissionsOpen && (
          <div className="mt-6 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
            Submissions are currently closed, but you can still save a draft.
          </div>
        )}

        <div className="mt-8">
          <ProjectForm
            action={createProject}
            tracks={[...TRACKS]}
            submitLabel="Create project"
          />
        </div>
      </main>
    </div>
  );
}
