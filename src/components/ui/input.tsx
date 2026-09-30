import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-input bg-input-background px-3 py-1 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    />
  );
}
