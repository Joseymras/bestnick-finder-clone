import { Check } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";

export interface ResultItem {
  value: string;
  label?: string;
}

/**
 * Grid of generated results where every item is individually selectable.
 * Clicking the body copies; the checkbox toggles selection for bulk export.
 */
export function SelectableResults({
  items,
  selected,
  onToggle,
  tool,
  size = "md",
}: {
  items: ResultItem[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  tool: string;
  size?: "sm" | "md";
}) {
  const { copy, copied } = useCopy();
  const text = size === "sm" ? "text-sm" : "text-base";

  if (!items.length) return null;

  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const isSelected = selected.has(item.value);
        const isCopied = copied === item.value;
        return (
          <li key={item.value}>
            <div
              className={`surface-card hover-lift flex items-center gap-2 px-3 py-2.5 transition-colors ${
                isSelected ? "border-primary ring-2 ring-primary/25" : ""
              }`}
            >
              <label className="flex shrink-0 cursor-pointer items-center p-1">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle(item.value)}
                  className="h-4 w-4 cursor-pointer accent-primary"
                  aria-label={`Select ${item.value}`}
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  copy(item.value);
                  track("copy", tool, { value_length: item.value.length });
                }}
                className="min-w-0 flex-1 text-left"
                aria-label={`Copy ${item.value}`}
              >
                {item.label && (
                  <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </span>
                )}
                <span className={`block truncate font-medium ${text}`}>{item.value}</span>
              </button>

              <span
                className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold ${
                  isCopied ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {isCopied ? (
                  <span className="flex items-center gap-1">
                    <Check className="h-3 w-3" /> Copied
                  </span>
                ) : (
                  "Copy"
                )}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Select all / clear controls paired with SelectableResults. */
export function SelectionControls({
  total,
  selectedCount,
  onSelectAll,
  onClear,
  tool,
}: {
  total: number;
  selectedCount: number;
  onSelectAll: () => void;
  onClear: () => void;
  tool: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted-foreground">
        {selectedCount > 0 ? `${selectedCount} of ${total} selected` : `${total} results`}
      </span>
      <button
        type="button"
        onClick={() => {
          onSelectAll();
          track("select_all", tool, { count: total });
        }}
        className="font-semibold text-primary hover:underline"
      >
        Select all
      </button>
      {selectedCount > 0 && (
        <button type="button" onClick={onClear} className="text-muted-foreground hover:underline">
          Clear
        </button>
      )}
    </div>
  );
}
