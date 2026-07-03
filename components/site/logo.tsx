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
      <span className="grid h-7 w-7 place-items-center rounded-md bg-primary">
        <span className="display text-[15px] font-semibold leading-none text-primary-foreground">
          P
        </span>
      </span>
      {withWordmark && (
        <span className="display text-[17px] font-medium tracking-tight text-foreground">
          productat
        </span>
      )}
    </span>
  );
}
