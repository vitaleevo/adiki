import * as React from "react";

import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "min-h-36 w-full resize-none rounded-md border border-[rgba(7,45,29,0.14)] bg-white px-4 py-3 text-sm text-[var(--brand-ink)] outline-none transition placeholder:text-[var(--brand-muted)] focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-[rgba(232,171,39,0.18)]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
