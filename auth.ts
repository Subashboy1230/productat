import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";
import { resolveRole } from "@/lib/roles";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  pages: { signIn: "/login" },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      // A judge and a hacker may share the same email across providers later.
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    // Database-session strategy: `user` is the DB record. Surface id + role.
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = (user as { role?: "HACKER" | "JUDGE" | "ADMIN" }).role ?? "HACKER";
      }
      return session;
    },
  },
  events: {
    // First sign-in: set the initial role from the allowlists.
    async createUser({ user }) {
      if (!user.id) return;
      const role = await resolveRole(user.email);
      if (role !== "HACKER") {
        await prisma.user.update({ where: { id: user.id }, data: { role } });
      }
    },
    // Every sign-in: promote a hacker who was since added to the judge list
    // (or admin list). We never silently demote an existing judge/admin here.
    async signIn({ user }) {
      if (!user?.id || !user.email) return;
      const desired = await resolveRole(user.email);
      const current = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      });
      if (current && current.role === "HACKER" && desired !== "HACKER") {
        await prisma.user.update({ where: { id: user.id }, data: { role: desired } });
      }
    },
  },
});
