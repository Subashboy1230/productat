import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CTA() {
  return (
    <section className="relative py-12 sm:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="border-gradient relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center ring-hairline sm:px-12 sm:py-20">
          {/* glow + grid */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
            <div className="absolute left-1/2 top-0 h-[320px] w-[680px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
          </div>

          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
            Come build something this weekend
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground sm:text-lg">
            Apply for the next hackathon or drop your email and we&rsquo;ll send
            dates, tracks, and an invite to the community.
          </p>

          <form
            action="#apply"
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder="you@builder.dev"
              aria-label="Email address"
              className="h-12 sm:flex-1"
            />
            <Button type="submit" size="lg" className="h-12">
              Apply to build <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">
            Free for accepted builders · San Francisco + 12 satellite cities · No
            spam, ever
          </p>
        </div>
      </div>
    </section>
  );
}
