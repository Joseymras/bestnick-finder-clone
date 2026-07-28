import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { generateBatch, type NameFlavor } from "@/lib/names";
import { CopyCard } from "./CopyCard";

const FLAVORS: { id: NameFlavor; label: string }[] = [
  { id: "random", label: "Surprise me" },
  { id: "gamer", label: "Gamer" },
  { id: "aesthetic", label: "Aesthetic" },
  { id: "fantasy", label: "Fantasy" },
  { id: "professional", label: "Professional" },
];

export function NameGenerator({
  defaultFlavor = "random",
  count = 12,
  showFlavors = true,
}: {
  defaultFlavor?: NameFlavor;
  count?: number;
  showFlavors?: boolean;
}) {
  const [flavor, setFlavor] = useState<NameFlavor>(defaultFlavor);
  const [letters, setLetters] = useState("");
  const [names, setNames] = useState<string[]>([]);

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
            First letters (optional)
          </label>
          <input
            id="letters"
            value={letters}
            onChange={(e) => setLetters(e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 6))}
            placeholder="e.g. Ar"
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none ring-ring/40 transition focus:border-primary focus:ring-4"
          />
        </div>
        <button
          type="button"
          onClick={roll}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <RefreshCw className="h-4 w-4" /> Generate
        </button>
      </div>

      {showFlavors && (
        <div className="mt-4 flex flex-wrap gap-2">
          {FLAVORS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFlavor(f.id)}
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

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {names.map((n) => (
          <CopyCard key={n} value={n} />
        ))}
      </div>
    </div>
  );
}
