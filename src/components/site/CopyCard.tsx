import { Check, Copy } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";

export function CopyCard({
  value,
  label,
  size = "md",
}: {
  value: string;
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { copy, copied } = useCopy();
  const isCopied = copied === value;
  const text = size === "lg" ? "text-xl" : size === "sm" ? "text-sm" : "text-base";

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      className="surface-card hover-lift group flex w-full items-center gap-3 px-4 py-3 text-left"
      aria-label={`Copy ${value}`}
    >
      <span className="min-w-0 flex-1">
        {label && (
          <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
        )}
        <span className={`block truncate font-medium ${text}`}>{value}</span>
      </span>
      <span
        className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
          isCopied
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground"
        }`}
      >
        {isCopied ? (
          <span className="flex items-center gap-1">
            <Check className="h-3 w-3" /> Copied
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Copy className="h-3 w-3" /> Copy
          </span>
        )}
      </span>
    </button>
  );
}

export function CopyChip({ value }: { value: string }) {
  const { copy, copied } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(value)}
      title={`Copy ${value}`}
      className={`grid h-11 min-w-11 place-items-center rounded-md border px-2 text-lg transition-colors ${
        copied === value
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-surface hover:border-primary hover:bg-accent"
      }`}
    >
      {copied === value ? <Check className="h-4 w-4" /> : value}
    </button>
  );
}
