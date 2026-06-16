import { ArrowRight, Box, Circle, Hexagon, Triangle, Command, Boxes } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";

const sponsors = [
  { name: "Northwind", icon: Hexagon },
  { name: "Halcyon", icon: Circle },
  { name: "Quantel", icon: Triangle },
  { name: "Vector Labs", icon: Box },
  { name: "Brightpath", icon: Command },
  { name: "Ridgeline", icon: Boxes },
  { name: "Monolith", icon: Hexagon },
  { name: "Apex API", icon: Triangle },
  { name: "Foundry", icon: Box },
  { name: "Cobalt", icon: Circle },
  { name: "Lumen", icon: Command },
  { name: "Switchboard", icon: Boxes },
];

export function Sponsors() {
  return (
    <section id="sponsors" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="Sponsors & Partners"
          title="Backed by the tools builders actually use"
          description="Sponsors put real infrastructure, credits, and mentors in the room, and meet the builders shipping on their stack first."
        />

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border ring-hairline sm:grid-cols-3 lg:grid-cols-4">
          {sponsors.map((s) => (
            <div
              key={s.name}
              className="group flex items-center justify-center gap-2.5 bg-card px-6 py-8 text-muted-foreground transition-colors hover:bg-card/60 hover:text-foreground"
            >
              <s.icon className="h-5 w-5 text-foreground/40 transition-colors group-hover:text-primary" />
              <span className="text-base font-medium tracking-tight">
                {s.name}
              </span>
            </div>
          ))}
        </div>

        {/* sponsor CTA */}
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-border bg-card p-8 ring-hairline sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Put your product in builders&rsquo; hands
              </h3>
              <p className="mt-2 text-pretty text-muted-foreground">
                Sponsor a hackathon or the year-round community. Tiers from
                community supporter to title partner, with API integrations,
                workshops, and hiring access.
              </p>
            </div>
            <Button size="lg" asChild className="shrink-0">
              <a href="#apply">
                Become a sponsor <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
