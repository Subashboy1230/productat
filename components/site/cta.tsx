import { WaitlistForm } from "@/components/site/waitlist-form";

export function CTA() {
  return (
    <section id="waitlist" className="relative scroll-mt-24 py-14 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-16 text-center ring-hairline sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-primary" />

          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-primary" />
            <span className="eyebrow text-primary">Applications open</span>
          </div>

          <h2 className="display mx-auto mt-5 max-w-2xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
            Be first in line to build
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground sm:text-lg">
            Apply to join the community and the inaugural hackathon in late
            July. Every application is reviewed, and we approve builders on a
            rolling basis.
          </p>

          <div className="mt-8">
            <WaitlistForm label="Apply to join" withInterest />
          </div>

          <p className="mt-4 font-mono text-xs text-muted-foreground">
            Reviewed within a few days, built for non-technical builders, no
            spam ever
          </p>
        </div>
      </div>
    </section>
  );
}
