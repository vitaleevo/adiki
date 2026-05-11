import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "h-12 w-full rounded-md border border-[rgba(7,45,29,0.14)] bg-white px-4 text-sm text-[var(--brand-ink)] outline-none transition placeholder:text-[var(--brand-muted)] focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[rgba(232,171,39,0.18)]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
