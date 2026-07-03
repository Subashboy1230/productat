"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-helpers";
import { adminEmails } from "@/lib/roles";
import { metricInput, judgeInviteInput } from "@/lib/validators";

export type AdminFormState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

function revalidateAll() {
  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath("/judge");
  revalidatePath("/leaderboard");
}

// ---- Judge list ----

export async function addJudge(
  _prev: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  await requireRole(["ADMIN"]);
  const parsed = judgeInviteInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Check the email and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  const { email, note } = parsed.data;
  await prisma.judgeInvite.upsert({
    where: { email },
    update: { note: note ?? null },
    create: { email, note: note ?? null },
  });

  // If they've already signed in as a hacker, promote them now.
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && existing.role === "HACKER") {
    await prisma.user.update({
      where: { id: existing.id },
      data: { role: "JUDGE" },
    });
  }

  revalidateAll();
  return { ok: true };
}

export async function removeJudge(formData: FormData): Promise<void> {
  await requireRole(["ADMIN"]);
  const email = String(formData.get("email") || "").toLowerCase();
  if (!email) return;

  await prisma.judgeInvite.deleteMany({ where: { email } });

  // Demote the user back to hacker unless they're a hard-coded admin.
  if (!adminEmails().includes(email)) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && user.role === "JUDGE") {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "HACKER" },
      });
    }
  }
  revalidateAll();
}

// ---- Rubric / metrics ----

export async function saveMetric(
  _prev: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  await requireRole(["ADMIN"]);
  const parsed = metricInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Check the metric fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  const id = String(formData.get("metricId") || "");
  const data = {
    name: parsed.data.name,
    description: parsed.data.description ?? null,
    weight: parsed.data.weight,
    maxScore: parsed.data.maxScore,
  };

  if (id) {
    await prisma.metric.update({ where: { id }, data });
  } else {
    const agg = await prisma.metric.aggregate({ _max: { order: true } });
    await prisma.metric.create({
      data: { ...data, order: (agg._max.order ?? 0) + 1 },
    });
  }
  revalidateAll();
  return { ok: true };
}

export async function removeMetric(formData: FormData): Promise<void> {
  await requireRole(["ADMIN"]);
  const id = String(formData.get("metricId") || "");
  if (!id) return;
  await prisma.metric.delete({ where: { id } });
  revalidateAll();
}

// ---- Event phases (the quality loop) ----

export async function setPhase(formData: FormData): Promise<void> {
  await requireRole(["ADMIN"]);
  const phase = String(formData.get("phase") || "");
  const value = String(formData.get("value") || "") === "1";

  if (phase === "submissionsOpen") {
    await prisma.settings.update({ where: { id: 1 }, data: { submissionsOpen: value } });
  } else if (phase === "judgingOpen") {
    await prisma.settings.update({ where: { id: 1 }, data: { judgingOpen: value } });
  } else if (phase === "resultsPublished") {
    await prisma.settings.update({ where: { id: 1 }, data: { resultsPublished: value } });
  } else {
    return;
  }
  revalidateAll();
}

/**
 * Publish results: lock judging, mark every project that received at least one
 * score as SCORED, and reveal results/feedback to hackers.
 */
export async function publishResults(): Promise<void> {
  await requireRole(["ADMIN"]);
  const scored = await prisma.score.findMany({
    distinct: ["projectId"],
    select: { projectId: true },
  });
  const ids = scored.map((s) => s.projectId);
  if (ids.length) {
    await prisma.project.updateMany({
      where: { id: { in: ids } },
      data: { status: "SCORED" },
    });
  }
  await prisma.settings.update({
    where: { id: 1 },
    data: { resultsPublished: true, judgingOpen: false },
  });
  revalidateAll();
}
