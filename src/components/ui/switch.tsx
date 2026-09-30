import { cn } from "@/lib/utils";

export function Switch({
  checked,
  onCheckedChange,
  className,
  ...props
}: {
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={Boolean(checked)}
      data-state={checked ? "checked" : "unchecked"}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "inline-flex h-6 w-10 shrink-0 items-center rounded-full border border-transparent p-0.5 transition-colors",
        checked ? "bg-primary" : "bg-muted",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "block size-4 rounded-full bg-card transition-transform",
          checked ? "translate-x-4" : "translate-x-0",
        )}
      />
    </button>
  );
}
