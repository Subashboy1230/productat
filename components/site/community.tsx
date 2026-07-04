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
    icon: Compass,
    title: "Mentors across all four lenses",
    body: "Designers, engineers, product folks, and operators who've shipped, on hand to unblock you on UX, tech, product, or go-to-market.",
  },
  {
    icon: Presentation,
    title: "Weekly build nights & workshops",
    body: "Hands-on sessions that turn a concept into a screen, a screen into a working app, and a working app into something people can use.",
  },
  {
    icon: Hammer,
    title: "Honest feedback on your product",
    body: "Post work in progress and get real critique from people who want you to ship, not vague encouragement.",
  },
  {
    icon: MessagesSquare,
    title: "A cohort building alongside you",
    body: "You're not learning alone. A room of builders and not-yet-builders moving idea to shipped at the same time keeps you honest.",
  },
  {
    icon: Gift,
    title: "Starters, templates & AI workflows",
    body: "The shortcuts builders actually use, so you spend your energy on the product, not on reinventing setup.",
  },
  {
    icon: Handshake,
    title: "Intros that matter",
    body: "Teammates for the hackathon, your first users, and people who've been where you're going.",
  },
];

const messages = [
  {
    name: "maya.k",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "shipped my first landing page tonight, zero code, straight from Tuesday's workshop 🎉",
    meta: "2m",
  },
  {
    name: "deon (non-tech founder)",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "finally get what an API actually does. six months of confusion gone in one session",
    meta: "14m",
  },
  {
    name: "rosa.t",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    text: "anyone want to pair for the hackathon? I'll bring product + GTM, looking for a build partner 🚀",
    meta: "31m",
  },
];

const faces = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/46.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/75.jpg",
];

export function Community() {
  return (
    <section id="community" className="relative scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="The community"
          title={
            <>
              By builders.{" "}
              <span className="text-muted-foreground">
                For the not-yet-technical.
              </span>
            </>
          }
          description="Everyone here remembers being a beginner. Productat is people who've shipped, teaching people who want to, so you can go from idea to real product without a computer science degree."
        />

        {/* wide member card with chat mock */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-card ring-hairline">
          <div className="grid lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <div className="flex -space-x-2">
                {faces.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-card"
                  />
                ))}
                <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary text-xs font-medium text-muted-foreground ring-2 ring-card">
                  you
                </span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                Who it&rsquo;s for
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Non-technical founders, designers, PMs, domain experts, and
                career-switchers with an idea and no clear path to build it.
                Come curious, leave with a product and a crew that ships.
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={m.avatar}
                      alt=""
                      loading="lazy"
                      className="h-8 w-8 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">
                          {m.name}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">
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
