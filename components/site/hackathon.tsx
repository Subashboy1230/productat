import {
  Clock,
  MapPin,
  Rocket,
  Trophy,
  Sparkles,
  Users,
  CalendarDays,
} from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";

const format = [
  {
    icon: Clock,
    title: "36-hour build sprint",
    body: "Friday night to Sunday afternoon. Form a team of up to four, pick a track, and ship something that actually runs.",
  },
  {
    icon: MapPin,
    title: "In person in the Bay",
    body: "Our SoMa HQ runs the flagship event. Can't make SF? Join from a satellite node in 12 cities across the US.",
  },
  {
    icon: Rocket,
    title: "Demo or it didn't happen",
    body: "No slideware. Every team gets two minutes on the Demo Day stage to put a working product in front of judges.",
  },
];

const schedule = [
  {
    day: "Friday",
    date: "Sept 19",
    items: [
      ["5:00 PM", "Doors, badges & team formation"],
      ["7:00 PM", "Kickoff + track reveal"],
      ["9:00 PM", "First commits"],
    ],
  },
  {
    day: "Saturday",
    date: "Sept 20",
    items: [
      ["All day", "Build + mentor office hours"],
      ["1:00 PM", "Lightning workshops"],
      ["11:00 PM", "Midnight ramen run"],
    ],
  },
  {
    day: "Sunday",
    date: "Sept 21",
    items: [
      ["12:00 PM", "Code freeze"],
      ["1:00 PM", "Demo Day on the main stage"],
      ["4:00 PM", "Awards + after-party"],
    ],
  },
];

const tracks = [
  "AI Agents",
  "Developer Tools",
  "Consumer",
  "Fintech",
  "Hardware",
  "Wildcard",
];

const prizes = [
  { place: "Grand Prize", amount: "$25,000", note: "+ intros to partner funds" },
  { place: "Track Winners", amount: "$5,000", note: "one per track, six tracks" },
  { place: "Community Choice", amount: "$5,000", note: "voted by every builder" },
];

export function Hackathon() {
  return (
    <section id="hackathon" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="The Hackathon"
          title={
            <>
              36 hours. One demo.{" "}
              <span className="text-muted-foreground">No filler.</span>
            </>
          }
          description="Productat hackathons are built for people who would rather ship than pitch. Show up with an idea, leave with a product and a team that ships."
        />

        {/* format cards */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {format.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-border bg-card p-6 ring-hairline transition-colors hover:border-primary/30"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-medium tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          ))}
        </div>

        {/* schedule + prizes/location */}
        <div className="mt-4 grid gap-4 lg:grid-cols-5">
          {/* schedule */}
          <div className="rounded-2xl border border-border bg-card p-6 ring-hairline sm:p-8 lg:col-span-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CalendarDays className="h-4 w-4 text-primary" />
                Weekend schedule
              </div>
              <Badge variant="outline" className="font-normal">
                Sept 19&ndash;21, 2026
              </Badge>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {schedule.map((col) => (
                <div key={col.day}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold">{col.day}</span>
                    <span className="text-xs text-muted-foreground">
                      {col.date}
                    </span>
                  </div>
                  <div className="mt-3 space-y-3 border-l border-border pl-4">
                    {col.items.map(([time, label]) => (
                      <div key={label} className="relative">
                        <span className="absolute -left-[1.3rem] top-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 ring-4 ring-primary/10" />
                        <div className="font-mono text-xs text-primary">
                          {time}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-border pt-6">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> Tracks
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tracks.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-secondary/40 px-3 py-1 text-sm text-foreground/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* prizes + location */}
          <div className="grid gap-4 lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 ring-hairline sm:p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="flex items-center gap-2 text-sm font-medium">
                <Trophy className="h-4 w-4 text-primary" /> Prizes
              </div>
              <div className="mt-5 space-y-4">
                {prizes.map((p) => (
                  <div
                    key={p.place}
                    className="flex items-center justify-between gap-3 border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <div className="text-sm font-medium">{p.place}</div>
                      <div className="text-xs text-muted-foreground">
                        {p.note}
                      </div>
                    </div>
                    <div className="text-xl font-semibold tracking-tight text-foreground">
                      {p.amount}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                Plus $250K in cloud and API credits split across every team that
                ships.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 ring-hairline sm:p-8">
              <div className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-primary" /> Location
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  Productat HQ &mdash; SoMa, San Francisco.
                </span>{" "}
                Fully stocked for 36 hours: power, bandwidth, food, and a quiet
                room when you need it.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-foreground/90">
                <Users className="h-4 w-4 text-primary" />
                12 satellite nodes nationwide for remote teams
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
