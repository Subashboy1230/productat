import { prisma } from "@/lib/prisma";

/** Fetch the single global settings row, creating it on first access. */
export async function getSettings() {
  const existing = await prisma.settings.findUnique({ where: { id: 1 } });
  if (existing) return existing;
  return prisma.settings.create({ data: { id: 1 } });
}
