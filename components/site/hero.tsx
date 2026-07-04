import { ArrowRight, Sparkles, Compass, PenTool, Code2, Megaphone } from "lucide-react";

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
    <section id="top" className="relative pt-28 sm:pt-36">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center animate-fade-up">
            <a
              href="#hackathon"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 ring-hairline"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              <span className="eyebrow text-foreground/70">
                Inaugural hackathon, late July
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <h1
            className="display mt-7 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-[4.5rem] animate-fade-up"
            style={{ animationDelay: "60ms" }}
          >
            Build real products,
            <br />
            <span className="text-primary">zero to one.</span>
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
            <WaitlistForm label="Apply to join" />
            <p className="mt-3 text-xs text-muted-foreground">
              Applications are reviewed. We approve builders on a rolling basis.
            </p>
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
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_60px_-30px_rgba(30,22,16,0.28)] ring-hairline">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
              <div className="ml-3 flex items-center gap-2 rounded-md bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
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
                          ? "bg-primary/10 font-medium text-primary"
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
                <div className="mt-auto rounded-lg border border-border bg-secondary/60 p-3">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    Hackathon in
                  </p>
                  <p className="display text-lg font-medium text-foreground">
                    Late July
                  </p>
                </div>
              </aside>

              <div className="p-4 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4 text-primary" /> Your build path
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    idea to shipped
                  </span>
                </div>
                <div className="space-y-2.5">
                  {path.map((p) => (
                    <div
                      key={p.module}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                        <p.icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {p.name}
                        </p>
                        <p className="truncate font-mono text-xs text-muted-foreground">
                          Module {p.module}
                        </p>
                      </div>
                      <span className="ml-auto rounded-full bg-secondary px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
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
