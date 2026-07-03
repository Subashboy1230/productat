import Link from "next/link";

import { signOut } from "@/auth";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { canJudge, isAdmin, type SessionUser } from "@/lib/auth-helpers";

const roleLabel: Record<string, string> = {
  HACKER: "Hacker",
  JUDGE: "Judge",
  ADMIN: "Admin",
};

export function AppHeader({ user }: { user: SessionUser }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border glass">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="Productat home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            <Link
              href="/dashboard"
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            {canJudge(user.role) && (
              <Link
                href="/judge"
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Judging
              </Link>
            )}
            {isAdmin(user.role) && (
              <Link
                href="/admin"
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Admin
              </Link>
            )}
            <Link
              href="/leaderboard"
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Leaderboard
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="hidden sm:inline-flex">
            {roleLabel[user.role] ?? user.role}
          </Badge>
          <span className="hidden max-w-[160px] truncate text-sm text-muted-foreground md:inline">
            {user.name || user.email}
          </span>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button type="submit" variant="outline" size="sm">
              Sign out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
