import { redirect } from "next/navigation";
import { Github, ArrowLeft } from "lucide-react";

import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  const callbackUrl = searchParams?.callbackUrl || "/dashboard";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="w-full max-w-sm">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to productat.com
        </a>

        <div className="rounded-2xl border border-border bg-card p-8 ring-hairline">
          <Logo />
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">
            Sign in to Productat
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Hackers submit projects. Judges score them. Sign in with GitHub to
            get started.
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: callbackUrl });
            }}
            className="mt-7"
          >
            <Button type="submit" size="lg" className="w-full">
              <Github className="h-4 w-4" /> Continue with GitHub
            </Button>
          </form>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            New here? Signing in creates your hacker account automatically.
          </p>
        </div>
      </div>
    </main>
  );
}
