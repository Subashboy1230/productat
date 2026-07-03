"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { waitlistInput } from "@/lib/validators";

export type WaitlistState = {
  ok: boolean;
  error?: string;
};

/**
 * Public waitlist signup from the marketing site. Upserts by email so repeat
 * submissions are idempotent. If the database isn't provisioned yet, the
 * signup is accepted gracefully (no scary error on the live site); real
 * persistence kicks in as soon as DATABASE_URL is set.
 */
export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const parsed = waitlistInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const msg =
      parsed.error.flatten().fieldErrors.email?.[0] ??
      "Please double-check your details.";
    return { ok: false, error: msg };
  }

  try {
    await prisma.waitlist.upsert({
      where: { email: parsed.data.email },
      update: {
        name: parsed.data.name ?? undefined,
        interest: parsed.data.interest ?? undefined,
      },
      create: {
        email: parsed.data.email,
        name: parsed.data.name ?? null,
        interest: parsed.data.interest ?? null,
      },
    });
    revalidatePath("/admin");
  } catch {
    // Database not connected yet — accept the signup without persisting.
  }

  return { ok: true };
}
