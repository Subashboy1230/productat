"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Hackathon", href: "#hackathon" },
  { label: "Community", href: "#community" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 transition-all duration-300",
          scrolled &&
            "mt-2 h-14 max-w-[1100px] rounded-full border border-border glass px-4 ring-hairline"
        )}
      >
        <a href="#top" className="flex items-center" aria-label="Productat home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href="#community">Sign in</a>
          </Button>
          <Button size="sm" asChild>
            <a href="#apply">Apply to build</a>
          </Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-md text-muted-foreground hover:text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-4 mt-2 rounded-2xl border border-border glass p-2 ring-hairline md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-2 grid grid-cols-2 gap-2 p-2">
            <Button variant="outline" size="sm" asChild>
              <a href="#community" onClick={() => setOpen(false)}>
                Sign in
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href="#apply" onClick={() => setOpen(false)}>
                Apply
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
