import { z } from "zod";

/** Treat empty/whitespace strings as undefined before validating. */
const emptyToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

const optionalUrl = z.preprocess(
  emptyToUndefined,
  z.string().trim().url("Enter a valid URL (include https://)").optional()
);

const optionalText = (max: number) =>
  z.preprocess(
    emptyToUndefined,
    z.string().trim().max(max, `Keep this under ${max} characters`).optional()
  );

export const projectInput = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Give your project a title")
    .max(120, "Title is too long"),
  tagline: optionalText(160),
  description: optionalText(8000),
  track: optionalText(60),
  repoUrl: optionalUrl,
  demoUrl: optionalUrl,
  videoUrl: optionalUrl,
  teamMembers: optionalText(2000),
});

export type ProjectInput = z.infer<typeof projectInput>;

/** A single metric score coming from the judging form. */
export const scoreInput = z.object({
  metricId: z.string().min(1),
  value: z.coerce.number().int().min(0).max(100),
});

export const metricInput = z.object({
  name: z.string().trim().min(2, "Name the metric").max(80),
  description: optionalText(280),
  weight: z.coerce.number().min(0.1, "Weight must be at least 0.1").max(100),
  maxScore: z.coerce.number().int().min(2).max(100),
});

export const judgeInviteInput = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  note: optionalText(160),
});

export const waitlistInput = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  name: optionalText(80),
  interest: optionalText(280),
});
