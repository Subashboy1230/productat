import { Rocket, Sparkles, Users, MapPin, ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";

const format = [
  {
    icon: Sparkles,
    title: "Beginner-friendly by design",
    body: "You do not need to code. Mentors, starters, and AI tools are on hand, and teams are mixed by skill so everyone contributes and everyone learns.",
  },
  {
    icon: Rocket,
    title: "Idea to shipped in a weekend",
    body: "Pick an idea, work it across all four lenses (UX/UI, product, tech, GTM), and walk out with something real you can put in front of people.",
  },
  {
    icon: Users,
    title: "Mentors in the room",
    body: "Designers, engineers, product folks, and operators floating the room to unblock you the moment you get stuck, not a week later.",
  },
];

export function Hackathon() {
  return (
    <section id="hackathon" className="relative scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="The inaugural hackathon"
          title={
            <>
              Our first hackathon.{" "}
              <span className="text-muted-foreground">Late July.</span>
            </>
          }
          description="The community's first build weekend. Show up with an idea and a willingness to learn, leave with a shipped 0-to-1 product and people who'll keep building with you."
        />

        <div className="mt-6 flex items-center justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            San Francisco Bay Area, late July 2026
          </span>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
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

        <div className="mt-8 flex flex-col items-center gap-3">
          <Button size="lg" asChild>
            <a href="#waitlist">
              Join the waitlist <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">
            Spots are limited for the first one. Waitlist members hear first.
          </p>
        </div>
      </div>
    </section>
  );
}
