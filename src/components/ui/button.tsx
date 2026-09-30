import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  outline: "border bg-background text-foreground hover:bg-accent",
  destructive: "bg-destructive text-white hover:bg-destructive/90",
  link: "text-primary underline-offset-4 hover:underline",
} as const;

const sizes = {
  default: "h-11 px-4 py-2",
  sm: "h-9 px-3",
  lg: "h-12 px-6",
  icon: "size-11",
} as const;

export function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
