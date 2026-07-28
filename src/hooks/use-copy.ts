import { useCallback, useState } from "react";

export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(value);
    window.setTimeout(() => setCopied((c) => (c === value ? null : c)), 1400);
  }, []);

  return { copy, copied };
}
