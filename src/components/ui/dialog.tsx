import { createContext, useContext, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const DialogContext = createContext<((open: boolean) => void) | null>(null);

export function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return <DialogContext.Provider value={onOpenChange}>{children}</DialogContext.Provider>;
}

export function DialogContent({ className, children }: { className?: string; children: ReactNode }) {
  const onOpenChange = useContext(DialogContext);
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      onClick={() => onOpenChange?.(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn("relative w-full rounded-2xl border border-border bg-card p-6", className)}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4 space-y-1">{children}</div>;
}

export function DialogTitle({ className, children }: { className?: string; children: ReactNode }) {
  return <h2 className={cn("text-lg font-bold", className)}>{children}</h2>;
}

export function DialogDescription({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}
