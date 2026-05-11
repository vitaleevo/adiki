import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--brand-gold)] text-[var(--brand-green)] shadow-[0_16px_40px_rgba(232,171,39,0.22)] hover:bg-[var(--brand-gold-dark)]",
        green:
          "bg-[var(--brand-green)] !text-white shadow-[0_16px_40px_rgba(7,45,29,0.22)] hover:bg-[var(--brand-green-2)] hover:!text-white",
        outline:
          "border border-[rgba(7,45,29,0.16)] bg-white text-[var(--brand-green)] hover:border-[var(--brand-gold)] hover:bg-[rgba(232,171,39,0.08)]",
        ghost: "text-[var(--brand-green)] hover:bg-[rgba(7,45,29,0.06)]",
        inverse:
          "border border-white/16 bg-white/10 !text-white backdrop-blur hover:bg-white/16 hover:!text-white"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
