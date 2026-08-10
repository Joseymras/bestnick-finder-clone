import { useState } from "react";
import { Check } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import { ensureTrending } from "@/lib/live";
import { useUiLang } from "@/lib/ui-lang";
import { VoteButtons } from "./VoteButtons";

export interface ResultItem {
  value: string;
  label?: string;
}

/**
 * Up/down voting for a freshly generated name. The name is only promoted into
 * the shared trends table once a visitor decides to vote on it.
 */
function ResultVote({ value, tool }: { value: string; tool: string }) {
  const { t } = useUiLang();
  const [id, setId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (id) return <VoteButtons nicknameId={id} up={0} down={0} tool={tool} size="sm" />;

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        const next = await ensureTrending(value, tool);
        setBusy(false);
        if (next) setId(next);
      }}
      aria-label={`${t.vote}: ${value}`}
      className="shrink-0 rounded-md border border-border px-2 py-1 text-[11px] font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
    >
      {t.vote}
    </button>
  );
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
  votable = false,
}: {
  items: ResultItem[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  tool: string;
  size?: "sm" | "md";
  votable?: boolean;
}) {
  const { copy, copied } = useCopy();
  const { t } = useUiLang();
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

              {votable ? (
                <ResultVote value={item.value} tool={tool} />
              ) : (
                <span
                  className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold ${
                    isCopied ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {isCopied ? (
                    <span className="flex items-center gap-1">
                      <Check className="h-3 w-3" /> {t.copied}
                    </span>
                  ) : (
                    t.copy
                  )}
                </span>
              )}
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
  const { t } = useUiLang();

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted-foreground">
        {selectedCount > 0
          ? `${selectedCount} / ${total} ${t.selected}`
          : `${total} ${t.results}`}
      </span>
      <button
        type="button"
        onClick={() => {
          onSelectAll();
          track("select_all", tool, { count: total });
        }}
        className="font-semibold text-primary hover:underline"
      >
        {t.selectAll}
      </button>
      {selectedCount > 0 && (
        <button type="button" onClick={onClear} className="text-muted-foreground hover:underline">
          {t.clear}
        </button>
      )}
    </div>
  );
}
