import { Download, FileText, Image as ImageIcon, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import { downloadPng, downloadSvg, downloadTextFile, shareLines } from "@/lib/export";
import { track } from "@/lib/analytics";

/**
 * One-click export toolbar: copy all, download .txt, PNG, SVG and share.
 * Used by every generator and symbol tool.
 */
export function ExportBar({
  lines,
  fileBase,
  title,
  tool,
  className = "",
}: {
  lines: string[];
  fileBase: string;
  title: string;
  tool: string;
  className?: string;
}) {
  const [done, setDone] = useState<string | null>(null);
  const disabled = lines.length === 0;

  const flash = (key: string) => {
    setDone(key);
    window.setTimeout(() => setDone((d) => (d === key ? null : d)), 1400);
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
    } catch {
      /* noop */
    }
    track("copy_bulk", tool, { count: lines.length });
    flash("copy");
  };

  const btn =
    "inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} role="group" aria-label="Export options">
      <button type="button" onClick={copyAll} disabled={disabled} className={btn}>
        {done === "copy" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {done === "copy" ? "Copied" : `Copy all${lines.length ? ` (${lines.length})` : ""}`}
      </button>

      <button
        type="button"
        disabled={disabled}
        className={btn}
        onClick={() => {
          downloadTextFile(lines, fileBase);
          track("download_txt", tool, { count: lines.length });
        }}
      >
        <FileText className="h-4 w-4" /> .TXT
      </button>

      <button
        type="button"
        disabled={disabled}
        className={btn}
        onClick={() => {
          downloadPng(lines, fileBase, { title });
          track("download_png", tool, { count: lines.length });
        }}
      >
        <ImageIcon className="h-4 w-4" /> PNG
      </button>

      <button
        type="button"
        disabled={disabled}
        className={btn}
        onClick={() => {
          downloadSvg(lines, fileBase, { title });
          track("download_svg", tool, { count: lines.length });
        }}
      >
        <Download className="h-4 w-4" /> SVG
      </button>

      <button
        type="button"
        disabled={disabled}
        className={btn}
        onClick={async () => {
          const how = await shareLines(lines, title);
          track("share", tool, { count: lines.length, method: how });
          flash("share");
        }}
      >
        <Share2 className="h-4 w-4" /> {done === "share" ? "Ready" : "Share"}
      </button>
    </div>
  );
}
