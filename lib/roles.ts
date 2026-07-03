import { prisma } from "@/lib/prisma";
import type { Role } from "@prisma/client";

/** Emails that should receive the ADMIN role, from the ADMIN_EMAILS env var. */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Decide a user's role from their email:
 *  - ADMIN if listed in ADMIN_EMAILS
 *  - JUDGE if their email is on the JudgeInvite allowlist
 *  - HACKER otherwise (the default)
 */
export async function resolveRole(email?: string | null): Promise<Role> {
  if (!email) return "HACKER";
  const lower = email.toLowerCase();
  if (adminEmails().includes(lower)) return "ADMIN";
  const invite = await prisma.judgeInvite.findUnique({ where: { email: lower } });
  if (invite) return "JUDGE";
  return "HACKER";
}
