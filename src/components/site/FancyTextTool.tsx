import { useEffect, useMemo, useState } from "react";
import { stylize } from "@/lib/fancy";
import { track } from "@/lib/analytics";
import { useSelection } from "@/hooks/use-selection";
import { SelectableResults, SelectionControls } from "./SelectableResults";
import { ExportBar } from "./ExportBar";

export function FancyTextTool({
  initial = "",
  limit = 48,
  heading = "Type your name",
  tool = "fancy-text-generator",
}: {
  initial?: string;
  limit?: number;
  heading?: string;
  tool?: string;
}) {
  const [text, setText] = useState(initial);
  const results = useMemo(
    () => stylize(text || initial || "Nickname", limit),
    [text, initial, limit],
  );
  const values = useMemo(() => results.map((r) => r.value), [results]);
  const { selected, toggle, selectAll, clear, exportLines, count } = useSelection(values);

  // Reset the selection whenever the source word changes.
  useEffect(() => {
    clear();
  }, [text, clear]);

  return (
    <div>
      <label htmlFor="fancy-input" className="mb-2 block text-sm font-semibold">
        {heading}
      </label>
      <input
        id="fancy-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => text && track("generate", tool, { length: text.length })}
        placeholder="Enter a name or word…"
        maxLength={40}
        className="w-full rounded-lg border border-input bg-surface px-4 py-3 text-lg outline-none ring-ring/40 transition focus:border-primary focus:ring-4"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <SelectionControls
          total={values.length}
          selectedCount={count}
          onSelectAll={selectAll}
          onClear={clear}
          tool={tool}
        />
        <ExportBar
          lines={exportLines}
          fileBase={`${text || "nickname"}-fancy-text`}
          title={`${text || "Nickname"} — stylish fonts`}
          tool={tool}
        />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Tap a style to copy it, or tick several and export them together as text, PNG or SVG.
      </p>

      <div className="mt-4">
        <SelectableResults
          items={results.map((r) => ({ value: r.value, label: r.name }))}
          selected={selected}
          onToggle={toggle}
          tool={tool}
        />
      </div>
    </div>
  );
}
