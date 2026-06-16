import { Clock, MapPin, Rocket } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";

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
      </div>
    </section>
  );
}
