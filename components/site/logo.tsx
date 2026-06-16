import { cn } from "@/lib/utils";

export function Logo({
  className,
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-[#0d1320] to-[#070a10] ring-1 ring-primary/40">
        <span
          aria-hidden
          className="absolute inset-0 rounded-lg bg-primary/20 blur-md"
        />
        <svg
          viewBox="0 0 64 64"
          className="relative h-4 w-4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26 14h12c7.18 0 13 5.82 13 13s-5.82 13-13 13h-5v10h-7V14Zm7 19h5c3.31 0 6-2.69 6-6s-2.69-6-6-6h-5v12Z"
            fill="url(#logo-g)"
          />
          <defs>
            <linearGradient
              id="logo-g"
              x1="26"
              y1="14"
              x2="51"
              y2="50"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7CC6FF" />
              <stop offset="1" stopColor="#1E73FF" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      {withWordmark && (
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          productat
        </span>
      )}
    </span>
  );
}
