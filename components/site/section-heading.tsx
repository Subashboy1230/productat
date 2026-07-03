import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-6 bg-primary" />
        <span className="eyebrow text-primary">{eyebrow}</span>
      </div>
      <h2 className="display mt-5 text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
