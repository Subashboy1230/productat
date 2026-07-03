"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-helpers";
import { getSettings } from "@/lib/settings";

export type JudgeFormState = {
  ok: boolean;
  error?: string;
  saved?: boolean;
};

/**
 * Save (or update) the signed-in judge's scores and feedback for a project.
 * Scores arrive as form fields named `metric_<metricId>`. Upserts are used so
 * a judge can revisit and revise. First score flips the project to
 * UNDER_REVIEW.
 */
export async function saveScores(
  _prev: JudgeFormState,
  formData: FormData
): Promise<JudgeFormState> {
  const judge = await requireRole(["JUDGE", "ADMIN"]);

  const settings = await getSettings();
  if (!settings.judgingOpen) {
    return { ok: false, error: "Judging is not open right now." };
  }

  const projectId = String(formData.get("projectId") || "");
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return { ok: false, error: "Project not found." };
  if (project.ownerId === judge.id) {
    return { ok: false, error: "You can't judge your own project." };
  }
  if (project.status !== "SUBMITTED" && project.status !== "UNDER_REVIEW") {
    return { ok: false, error: "This project isn't open for judging." };
  }

  const metrics = await prisma.metric.findMany({ where: { active: true } });

  const ops: Prisma.PrismaPromise<unknown>[] = [];
  let scored = 0;

  for (const m of metrics) {
    const raw = formData.get(`metric_${m.id}`);
    if (raw == null || String(raw) === "") continue;
    const value = Number(raw);
    if (!Number.isFinite(value) || value < 0 || value > m.maxScore) {
      return {
        ok: false,
        error: `Score for "${m.name}" must be between 0 and ${m.maxScore}.`,
      };
    }
    scored += 1;
    ops.push(
      prisma.score.upsert({
        where: {
          projectId_judgeId_metricId: {
            projectId,
            judgeId: judge.id,
            metricId: m.id,
          },
        },
        update: { value: Math.round(value) },
        create: {
          projectId,
          judgeId: judge.id,
          metricId: m.id,
          value: Math.round(value),
        },
      })
    );
  }

  if (scored === 0) {
    return { ok: false, error: "Enter a score for at least one metric." };
  }

  const comment = String(formData.get("feedback") || "").trim();
  if (comment) {
    ops.push(
      prisma.feedback.upsert({
        where: { projectId_judgeId: { projectId, judgeId: judge.id } },
        update: { comment },
        create: { projectId, judgeId: judge.id, comment },
      })
    );
  } else {
    ops.push(
      prisma.feedback.deleteMany({
        where: { projectId, judgeId: judge.id },
      })
    );
  }

  if (project.status === "SUBMITTED") {
    ops.push(
      prisma.project.update({
        where: { id: projectId },
        data: { status: "UNDER_REVIEW" },
      })
    );
  }

  await prisma.$transaction(ops);

  revalidatePath("/judge");
  revalidatePath(`/judge/${projectId}`);
  revalidatePath(`/projects/${projectId}`);
  revalidatePath("/leaderboard");

  return { ok: true, saved: true };
}
