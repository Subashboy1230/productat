import { ArrowRight, Sparkles, Compass, PenTool, Code2, Megaphone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { WaitlistForm } from "@/components/site/waitlist-form";

const path = [
  {
    icon: Compass,
    module: "01",
    name: "First-principles product thinking",
    tag: "Product",
  },
  {
    icon: PenTool,
    module: "02",
    name: "UI/UX foundations that actually convert",
    tag: "Design",
  },
  {
    icon: Code2,
    module: "03",
    name: "What a backend, API, and database really do",
    tag: "Engineering",
  },
  {
    icon: Megaphone,
    module: "04",
    name: "Positioning and go-to-market for 0 to 1",
    tag: "GTM",
  },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade" />
        <div className="absolute left-1/2 top-[-10%] h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-[8%] top-[20%] h-[260px] w-[260px] rounded-full bg-sky-500/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center animate-fade-up">
            <a href="#hackathon" className="group">
              <Badge className="gap-2 px-3 py-1 text-[13px]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Inaugural hackathon, late July
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Badge>
            </a>
          </div>

          <h1
            className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl animate-fade-up"
            style={{ animationDelay: "60ms" }}
          >
            <span className="text-gradient">Build real products,</span>
            <br />
            <span className="text-gradient-blue">zero to one.</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            Productat is a community of builders, by builders, helping
            non-technical people ship amazing tech products. Learn the craft
            across four lenses, UX/UI, engineering, product, and go-to-market,
            and build 0 to 1 with people who have done it.
          </p>

          <div
            className="mt-9 animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            <WaitlistForm label="Join the waitlist" />
            <a
              href="#learn"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              See what you&rsquo;ll learn
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* build-path mock */}
        <div
          className="relative mx-auto mt-16 max-w-4xl animate-fade-up"
          style={{ animationDelay: "280ms" }}
        >
          <div className="absolute inset-x-10 -top-6 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="overflow-hidden rounded-2xl border border-border glass ring-hairline shadow-2xl shadow-black/60">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              <div className="ml-3 flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
                productat.com/build-path
              </div>
              <div className="ml-auto hidden items-center gap-1.5 text-xs text-primary sm:flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Cohort forming
              </div>
            </div>

            <div className="grid gap-0 sm:grid-cols-[200px_1fr]">
              <aside className="hidden flex-col gap-1 border-r border-border p-4 sm:flex">
                {["Build path", "UX / UI", "Product", "Engineering", "GTM"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                        i === 0
                          ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          i === 0 ? "bg-primary" : "bg-foreground/20"
                        }`}
                      />
                      {item}
                    </div>
                  )
                )}
                <div className="mt-auto rounded-lg border border-border bg-secondary/40 p-3">
                  <p className="text-xs text-muted-foreground">Hackathon in</p>
                  <p className="font-mono text-lg font-medium text-foreground">
                    Late July
                  </p>
                </div>
              </aside>

              <div className="p-4 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4 text-primary" /> Your build path
                  </div>
                  <span className="text-xs text-muted-foreground">
                    idea to shipped
                  </span>
                </div>
                <div className="space-y-2.5">
                  {path.map((p) => (
                    <div
                      key={p.module}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card/60 px-4 py-3 transition-colors hover:border-primary/30"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                        <p.icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {p.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          Module {p.module}
                        </p>
                      </div>
                      <span className="ml-auto rounded-full bg-secondary/60 px-2.5 py-1 text-xs text-muted-foreground">
                        {p.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
