import { useMemo, useState } from "react";
import { stylize } from "@/lib/fancy";
import { CopyCard } from "./CopyCard";

export function FancyTextTool({
  initial = "",
  limit = 48,
  heading = "Type your name",
}: {
  initial?: string;
  limit?: number;
  heading?: string;
}) {
  const [text, setText] = useState(initial);
  const results = useMemo(() => stylize(text || initial || "Nickname", limit), [text, initial, limit]);

  return (
    <div>
      <label htmlFor="fancy-input" className="mb-2 block text-sm font-semibold">
        {heading}
      </label>
      <input
        id="fancy-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a name or word…"
        maxLength={40}
        className="w-full rounded-lg border border-input bg-surface px-4 py-3 text-lg outline-none ring-ring/40 transition focus:border-primary focus:ring-4"
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {results.length} styles generated instantly. Tap any result to copy it.
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {results.map((r, i) => (
          <CopyCard key={`${r.name}-${i}`} value={r.value} label={r.name} />
        ))}
      </div>
    </div>
  );
}
