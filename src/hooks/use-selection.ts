import { useCallback, useMemo, useState } from "react";

/** Multi-select state for generated result lists. */
export function useSelection(all: string[]) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = useCallback((value: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => setSelected(new Set(all)), [all]);
  const clear = useCallback(() => setSelected(new Set()), []);

  // Selected items in display order; falls back to everything when nothing is
  // ticked so export buttons always have something to work with.
  const exportLines = useMemo(() => {
    const picked = all.filter((v) => selected.has(v));
    return picked.length ? picked : all;
  }, [all, selected]);

  return { selected, toggle, selectAll, clear, exportLines, count: selected.size };
}
