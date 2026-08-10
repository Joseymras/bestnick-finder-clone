import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { generateBatch, type NameFlavor } from "@/lib/names";
import { track } from "@/lib/analytics";
import { pushRecent } from "@/lib/live";
import { useSelection } from "@/hooks/use-selection";
import { SelectableResults, SelectionControls } from "./SelectableResults";
import { ExportBar } from "./ExportBar";
import { useUiLang } from "@/lib/ui-lang";

const FLAVORS: { id: NameFlavor; label: string }[] = [
  { id: "random", label: "Surprise me" },
  { id: "gamer", label: "Gamer" },
  { id: "aesthetic", label: "Aesthetic" },
  { id: "fantasy", label: "Fantasy" },
  { id: "dark", label: "Dark" },
  { id: "cute", label: "Cute" },
  { id: "funny", label: "Funny" },
  { id: "clan", label: "Clan / team" },
  { id: "anime", label: "Anime" },
  { id: "oneword", label: "One word" },
  { id: "short", label: "Short" },
  { id: "professional", label: "Professional" },
];

export function NameGenerator({
  defaultFlavor = "random",
  count = 12,
  showFlavors = true,
  tool = "nickname-generator",
}: {
  defaultFlavor?: NameFlavor;
  count?: number;
  showFlavors?: boolean;
  tool?: string;
}) {
  const { t } = useUiLang();
  const [flavor, setFlavor] = useState<NameFlavor>(defaultFlavor);
  const [letters, setLetters] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const { selected, toggle, selectAll, clear, exportLines, count: selectedCount } =
    useSelection(names);

  const roll = useCallback(() => {
    setNames(generateBatch(count, flavor, letters));
  }, [count, flavor, letters]);

  useEffect(() => {
    roll();
  }, [roll]);

  return (
    <div className="surface-card p-5">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[180px] flex-1">
          <label htmlFor="letters" className="mb-1.5 block text-sm font-semibold">
            {t.firstLetters}
          </label>
          <input
            id="letters"
            value={letters}
            onChange={(e) => setLetters(e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 6))}
            placeholder={t.firstLettersHint}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none ring-ring/40 transition focus:border-primary focus:ring-4"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            clear();
            const fresh = generateBatch(count, flavor, letters);
            setNames(fresh);
            track("generate", tool, { flavor, count, seeded: letters ? "yes" : "no" });
            // Share one pick with the public "recent nicknames" feed.
            void pushRecent(fresh[0] ?? "", tool);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <RefreshCw className="h-4 w-4" /> {t.generate}
        </button>
      </div>

      {showFlavors && (
        <div className="mt-4 flex flex-wrap gap-2">
          {FLAVORS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setFlavor(f.id);
                clear();
              }}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                flavor === f.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <SelectionControls
          total={names.length}
          selectedCount={selectedCount}
          onSelectAll={selectAll}
          onClear={clear}
          tool={tool}
        />
        <ExportBar
          lines={exportLines}
          fileBase={`${flavor}-nicknames`}
          title={selectedCount ? "My selected nicknames" : "Nickname ideas"}
          tool={tool}
        />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">{t.exportHint}</p>

      <div className="mt-4">
        <SelectableResults
          items={names.map((n) => ({ value: n }))}
          selected={selected}
          onToggle={toggle}
          tool={tool}
          votable
        />
      </div>
    </div>
  );
}
