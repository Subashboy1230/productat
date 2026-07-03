"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth-helpers";
import { projectInput } from "@/lib/validators";
import { getSettings } from "@/lib/settings";

export type FormState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

function toData(input: {
  title: string;
  tagline?: string;
  description?: string;
  track?: string;
  repoUrl?: string;
  demoUrl?: string;
  videoUrl?: string;
  teamMembers?: string;
}) {
  return {
    title: input.title,
    tagline: input.tagline ?? null,
    description: input.description ?? null,
    track: input.track ?? null,
    repoUrl: input.repoUrl ?? null,
    demoUrl: input.demoUrl ?? null,
    videoUrl: input.videoUrl ?? null,
    teamMembers: input.teamMembers ?? null,
  };
}

export async function createProject(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const user = await requireUser();
  const parsed = projectInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  const project = await prisma.project.create({
    data: { ...toData(parsed.data), ownerId: user.id },
  });
  revalidatePath("/dashboard");
  redirect(`/projects/${project.id}`);
}

export async function updateProject(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const user = await requireUser();
  const id = String(formData.get("projectId") || "");
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing || existing.ownerId !== user.id) {
    return { ok: false, error: "Project not found." };
  }
  if (existing.status === "SCORED") {
    return {
      ok: false,
      error: "This project has been scored and can no longer be edited.",
    };
  }
  const parsed = projectInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  await prisma.project.update({ where: { id }, data: toData(parsed.data) });
  revalidatePath(`/projects/${id}`);
  revalidatePath("/dashboard");
  redirect(`/projects/${id}`);
}

export async function submitProject(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const user = await requireUser();
  const id = String(formData.get("projectId") || "");
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing || existing.ownerId !== user.id) {
    return { ok: false, error: "Project not found." };
  }
  const settings = await getSettings();
  if (!settings.submissionsOpen) {
    return { ok: false, error: "Submissions are closed for this event." };
  }
  if (!existing.title || !existing.description) {
    return {
      ok: false,
      error: "Add a title and description before submitting.",
    };
  }
  await prisma.project.update({
    where: { id },
    data: {
      status: "SUBMITTED",
      submittedAt: existing.submittedAt ?? new Date(),
    },
  });
  revalidatePath(`/projects/${id}`);
  revalidatePath("/dashboard");
  revalidatePath("/judge");
  return { ok: true };
}

export async function withdrawProject(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const user = await requireUser();
  const id = String(formData.get("projectId") || "");
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing || existing.ownerId !== user.id) {
    return { ok: false, error: "Project not found." };
  }
  if (existing.status === "UNDER_REVIEW" || existing.status === "SCORED") {
    return { ok: false, error: "Judging has begun; you can no longer withdraw." };
  }
  await prisma.project.update({ where: { id }, data: { status: "DRAFT" } });
  revalidatePath(`/projects/${id}`);
  revalidatePath("/dashboard");
  revalidatePath("/judge");
  return { ok: true };
}
