import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
};

export function SectionHeader({ label, title, description, align = "left", inverse, className }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {label ? (
        <p className={cn("mb-3 text-xs font-bold uppercase text-[var(--brand-gold)]", inverse && "text-[var(--brand-gold-soft)]")}>
          {label}
        </p>
      ) : null}
      <h2 className={cn("font-display text-3xl font-semibold leading-tight text-[var(--brand-green)] md:text-5xl", inverse && "text-white")}>
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-5 text-base leading-8 text-[var(--brand-muted)] md:text-lg", inverse && "text-white/72")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
