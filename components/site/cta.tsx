import { WaitlistForm } from "@/components/site/waitlist-form";

export function CTA() {
  return (
    <section id="waitlist" className="relative scroll-mt-24 py-12 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="border-gradient relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center ring-hairline sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
            <div className="absolute left-1/2 top-0 h-[320px] w-[680px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
          </div>

          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Waitlist open
          </div>

          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            Be first in line to build
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground sm:text-lg">
            Join the waitlist for the community and the inaugural hackathon in
            late July. We&rsquo;ll send you an invite, the schedule, and where to
            start.
          </p>

          <div className="mt-8">
            <WaitlistForm label="Join the waitlist" withInterest />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Free to join, built for non-technical builders, no spam ever
          </p>
        </div>
      </div>
    </section>
  );
}
