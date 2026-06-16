const cities = [
  "San Francisco",
  "New York",
  "Austin",
  "Seattle",
  "Los Angeles",
  "Boston",
  "Chicago",
  "Denver",
  "Miami",
  "Atlanta",
  "Pittsburgh",
  "Portland",
];

const stats = [
  { value: "6,400+", label: "builders in the network" },
  { value: "38", label: "cities across the US" },
  { value: "140+", label: "products shipped" },
  { value: "$250K", label: "in prizes & credits" },
];

export function Stats() {
  return (
    <section className="relative mt-24 sm:mt-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Builders shipping from coast to coast
        </p>

        {/* city marquee */}
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-3">
            {[...cities, ...cities].map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="whitespace-nowrap rounded-full border border-border bg-secondary/30 px-4 py-1.5 text-sm text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* stat row */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border ring-hairline md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-card px-6 py-8 text-center transition-colors hover:bg-card/60"
            >
              <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1.5 text-sm text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
