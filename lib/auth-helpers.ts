import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";

import { auth } from "@/auth";

export type SessionUser = {
  id: string;
  role: Role;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();
  return (session?.user as SessionUser | undefined) ?? null;
}

/** Require any authenticated user; otherwise redirect to /login. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

/** Require one of the given roles; otherwise bounce to the dashboard. */
export async function requireRole(roles: Role[]): Promise<SessionUser> {
  const user = await requireUser();
  if (!roles.includes(user.role)) redirect("/dashboard");
  return user;
}

export function isAdmin(role?: Role | null): boolean {
  return role === "ADMIN";
}

/** Admins can do everything judges can. */
export function canJudge(role?: Role | null): boolean {
  return role === "JUDGE" || role === "ADMIN";
}
