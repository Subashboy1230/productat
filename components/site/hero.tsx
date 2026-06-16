import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const feed = [
  {
    rank: 1,
    name: "Latchkey",
    tag: "AI scheduling for clinics",
    by: "Team Northstar",
    votes: 412,
  },
  {
    rank: 2,
    name: "Tinkergraph",
    tag: "Local-first data viz",
    by: " ship_it_sam",
    votes: 388,
  },
  {
    rank: 3,
    name: "Relayframe",
    tag: "Edge video pipelines",
    by: "Team Fog City",
    votes: 351,
  },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      {/* backdrop */}
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
                Applications open · Productat SF &rsquo;26
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Badge>
            </a>
          </div>

          <h1
            className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl animate-fade-up"
            style={{ animationDelay: "60ms" }}
          >
            <span className="text-gradient">Ship in a weekend.</span>
            <br />
            <span className="text-gradient-blue">Build for a lifetime.</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            Productat runs high-intensity hackathons and a year-round community
            for product builders &mdash; engineers, designers, and founders.
            Builders from every corner of the US, with a home base in the Bay
            Area.
          </p>

          <div
            id="apply"
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            <Button size="lg" asChild>
              <a href="#apply">
                Apply to build <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#community">Explore the community</a>
            </Button>
          </div>

          <p
            className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground animate-fade-up"
            style={{ animationDelay: "220ms" }}
          >
            <Zap className="h-3.5 w-3.5 text-primary" />
            Next hackathon &middot; San Francisco &middot; Sept 19&ndash;21, 2026
          </p>
        </div>

        {/* product mock */}
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
                productat.com/sf-26/demo-day
              </div>
              <div className="ml-auto hidden items-center gap-1.5 text-xs text-primary sm:flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Live · Demo Day
              </div>
            </div>

            <div className="grid gap-0 sm:grid-cols-[200px_1fr]">
              <aside className="hidden flex-col gap-1 border-r border-border p-4 sm:flex">
                {["Demo Day", "Projects", "Builders", "Leaderboard", "Judges"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                        i === 3
                          ? "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          i === 3 ? "bg-primary" : "bg-foreground/20"
                        }`}
                      />
                      {item}
                    </div>
                  )
                )}
                <div className="mt-auto rounded-lg border border-border bg-secondary/40 p-3">
                  <p className="text-xs text-muted-foreground">Time left</p>
                  <p className="font-mono text-lg font-medium text-foreground">
                    02:14:08
                  </p>
                </div>
              </aside>

              <div className="p-4 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Star className="h-4 w-4 text-primary" /> Top projects
                  </div>
                  <span className="text-xs text-muted-foreground">
                    241 shipping now
                  </span>
                </div>
                <div className="space-y-2.5">
                  {feed.map((p) => (
                    <div
                      key={p.rank}
                      className="flex items-center gap-4 rounded-xl border border-border bg-card/60 px-4 py-3 transition-colors hover:border-primary/30"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary/60 font-mono text-sm text-muted-foreground">
                        {p.rank}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {p.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {p.tag} · {p.by}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                        <Sparkles className="h-3 w-3" />
                        {p.votes}
                      </div>
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
