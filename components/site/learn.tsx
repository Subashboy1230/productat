import { PenTool, Compass, Code2, Megaphone } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";

const pillars = [
  {
    icon: PenTool,
    kicker: "UX / UI",
    title: "Design people actually get",
    body: "Think in flows and screens, not features. Wireframe an idea, build visual hierarchy, and learn to tell when an interface is working, plus the tools (Figma and friends) to make it real.",
  },
  {
    icon: Compass,
    kicker: "Product",
    title: "First-principles thinking",
    body: "Reason about products from the ground up: frame the real problem, decide what to build and what to cut, and scope a 0-to-1 MVP that's small enough to ship and sharp enough to matter.",
  },
  {
    icon: Code2,
    kicker: "Tech",
    title: "What the systems actually do",
    body: "Demystify the stack. What a frontend, backend, API, database, and auth each do, how they fit together, the nuances that trip people up, and enough hands-on dev (with AI tools) to build and to talk to engineers.",
  },
  {
    icon: Megaphone,
    kicker: "GTM",
    title: "Get it into real hands",
    body: "A builder's go-to-market mindset: positioning, a landing page that converts, finding your first users, and telling a story people repeat. Shipping is step one, distribution is the rest.",
  },
];

export function Learn() {
  return (
    <section id="learn" className="relative scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="What you'll learn"
          title={
            <>
              Four lenses.{" "}
              <span className="text-muted-foreground">One shipped product.</span>
            </>
          }
          description="You don't need to be technical to build something real. You need the right mental models across the whole product, and people who've shipped to pull you through."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.kicker}
              className="group rounded-2xl border border-border bg-card p-7 ring-hairline transition-colors hover:border-primary/30"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                  <p.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {p.kicker}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-medium tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
