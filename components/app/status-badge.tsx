import { cn } from "@/lib/utils";

const MAP: Record<string, { label: string; cls: string }> = {
  DRAFT: {
    label: "Draft",
    cls: "bg-secondary text-muted-foreground ring-border",
  },
  SUBMITTED: {
    label: "Submitted",
    cls: "bg-primary/15 text-primary ring-primary/30",
  },
  UNDER_REVIEW: {
    label: "Under review",
    cls: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
  },
  SCORED: {
    label: "Scored",
    cls: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
  },
};

export function StatusBadge({ status }: { status: string }) {
  const s = MAP[status] ?? MAP.DRAFT;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        s.cls
      )}
    >
      {s.label}
    </span>
  );
}
