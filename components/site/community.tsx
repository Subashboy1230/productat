import {
  Presentation,
  MessagesSquare,
  Compass,
  Handshake,
  Hammer,
  Gift,
  Hash,
} from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";

const perks = [
  {
    icon: Presentation,
    title: "Monthly demo nights",
    body: "Ship something every month and show it live. Best demo gets the room, the feedback, and a slot on the newsletter.",
  },
  {
    icon: MessagesSquare,
    title: "Always-on builder channels",
    body: "Thousands of builders trading code reviews, intros, and brutally honest feedback at every hour.",
  },
  {
    icon: Compass,
    title: "Mentor & investor office hours",
    body: "Weekly 1:1 slots with operators, designers, and funds who have shipped and funded real products.",
  },
  {
    icon: Handshake,
    title: "Hiring & co-founder matching",
    body: "Curated intros for roles, contracts, and co-founders. The network hires from inside the network first.",
  },
  {
    icon: Hammer,
    title: "Hands-on workshops",
    body: "From eval harnesses to go-to-market, taught by people currently doing the thing, not talking about it.",
  },
  {
    icon: Gift,
    title: "Member perks & credits",
    body: "Cloud, API, and tooling credits, plus partner discounts that follow you long after the weekend.",
  },
];

const messages = [
  {
    initials: "MK",
    name: "maya.k",
    color: "from-sky-400 to-blue-600",
    text: "shipped the v2 of our eval harness at last night's demo, repo in #open-source",
    meta: "2m",
  },
  {
    initials: "DJ",
    name: "deon.builds",
    color: "from-indigo-400 to-violet-600",
    text: "anyone in NYC want to team up for the Sept hackathon? working on agent infra",
    meta: "11m",
  },
  {
    initials: "RT",
    name: "rosa.t",
    color: "from-cyan-400 to-sky-600",
    text: "office hours with a seed fund opened up Thursday 3pm PT, grabbed a slot 🚀",
    meta: "26m",
  },
];

export function Community() {
  return (
    <section id="community" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[30%] h-[300px] w-[300px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="The Community"
          title={
            <>
              The hackathon ends.{" "}
              <span className="text-muted-foreground">
                The momentum doesn&rsquo;t.
              </span>
            </>
          }
          description="Productat is a year-round home for builders. The weekend is the spark. The community is where products, teams, and careers actually compound."
        />

        {/* wide member card with chat mock */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-card ring-hairline">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="flex -space-x-2">
                {[
                  "from-sky-400 to-blue-600",
                  "from-indigo-400 to-violet-600",
                  "from-cyan-400 to-sky-600",
                  "from-blue-400 to-indigo-600",
                ].map((c, i) => (
                  <span
                    key={i}
                    className={`h-9 w-9 rounded-full bg-gradient-to-br ${c} ring-2 ring-card`}
                  />
                ))}
                <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary text-xs font-medium text-muted-foreground ring-2 ring-card">
                  +6k
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                One always-on room of people who ship
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Join builders from 38 cities trading work in progress, finding
                teammates, and pushing each other to put things in front of real
                users. Quiet lurkers welcome. Shippers celebrated.
              </p>
            </div>

            <div className="border-t border-border bg-background/40 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">shipped</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  live
                </span>
              </div>
              <div className="space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.name}
                    className="flex gap-3 rounded-xl border border-border bg-card/60 p-3"
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br ${m.color} text-[11px] font-semibold text-white`}
                    >
                      {m.initials}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{m.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {m.meta}
                        </span>
                      </div>
                      <p className="text-sm leading-snug text-muted-foreground">
                        {m.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* perks grid */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-border bg-card p-6 ring-hairline transition-colors hover:border-primary/30"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20 transition-transform group-hover:-translate-y-0.5">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-medium tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
