import { useMemo, useState } from "react";
import { SYMBOL_GROUPS } from "@/lib/fancy";
import { useSelection } from "@/hooks/use-selection";
import { useCopy } from "@/hooks/use-copy";
import { track } from "@/lib/analytics";
import { ExportBar } from "./ExportBar";
import { Check } from "lucide-react";

/**
 * Symbol library with per-symbol selection and one-click export.
 */
export function SymbolPalette({
  tool = "symbols",
  groups = SYMBOL_GROUPS,
}: {
  tool?: string;
  groups?: typeof SYMBOL_GROUPS;
}) {
  const [query, setQuery] = useState("");
  const { copy, copied } = useCopy();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        symbols: g.name.toLowerCase().includes(q) ? g.symbols : g.symbols.filter((s) => s === q),
      }))
      .filter((g) => g.symbols.length);
  }, [groups, query]);

  const all = useMemo(() => visible.flatMap((g) => g.symbols), [visible]);
  const { selected, toggle, selectAll, clear, exportLines, count } = useSelection(all);

  return (
    <div className="surface-card p-5">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[200px] flex-1">
          <label htmlFor="symbol-search" className="mb-1.5 block text-sm font-semibold">
            Filter by category
          </label>
          <input
            id="symbol-search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              clear();
            }}
            onBlur={() => query && track("search", tool, { query_length: query.length })}
            placeholder="hearts, stars, arrows…"
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none ring-ring/40 transition focus:border-primary focus:ring-4"
          />
        </div>
        <ExportBar
          lines={exportLines}
          fileBase="text-symbols"
          title={count ? "My selected symbols" : "Text symbols"}
          tool={tool}
        />
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Click a symbol to copy it, or tick several and export the set as text, PNG or SVG.{" "}
        {count > 0 ? `${count} selected.` : `${all.length} symbols shown.`}{" "}
        <button type="button" onClick={selectAll} className="font-semibold text-primary hover:underline">
          Select all
        </button>
        {count > 0 && (
          <>
            {" · "}
            <button type="button" onClick={clear} className="hover:underline">
              Clear
            </button>
          </>
        )}
      </p>

      <div className="mt-5 space-y-6">
        {visible.map((g) => (
          <section key={g.slug} id={g.slug}>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {g.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {g.symbols.map((s) => {
                const isSelected = selected.has(s);
                return (
                  <span key={s} className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        copy(s);
                        track("copy", tool, { symbol_group: g.slug });
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        toggle(s);
                      }}
                      title={`Click to copy ${s}`}
                      className={`grid h-11 min-w-11 place-items-center rounded-md border px-2 text-lg transition-colors ${
                        copied === s
                          ? "border-primary bg-primary text-primary-foreground"
                          : isSelected
                            ? "border-primary bg-accent"
                            : "border-border bg-surface hover:border-primary hover:bg-accent"
                      }`}
                    >
                      {copied === s ? <Check className="h-4 w-4" /> : s}
                    </button>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggle(s)}
                      aria-label={`Select symbol ${s}`}
                      className="absolute -right-1 -top-1 h-3.5 w-3.5 cursor-pointer accent-primary"
                    />
                  </span>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
