import { Globe } from "lucide-react";
import { UI, UI_LANGS, useUiLang, type UiLang } from "@/lib/ui-lang";

/** Compact interface-language picker for the site header and footer. */
export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useUiLang();

  return (
    <label className="flex items-center gap-1.5">
      <span className="sr-only">{t.interfaceLanguage}</span>
      <Globe className={`h-4 w-4 ${compact ? "text-ink-muted" : "text-muted-foreground"}`} aria-hidden />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as UiLang)}
        aria-label={t.interfaceLanguage}
        className={`cursor-pointer rounded-md border px-2 py-1 text-xs outline-none ${
          compact
            ? "border-white/20 bg-transparent text-ink-muted hover:text-ink-foreground"
            : "border-border bg-background text-foreground"
        }`}
      >
        {UI_LANGS.map((code) => (
          <option key={code} value={code} className="text-foreground">
            {UI[code].native}
          </option>
        ))}
      </select>
    </label>
  );
}
