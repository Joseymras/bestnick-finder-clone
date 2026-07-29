// One-click export helpers shared by every generator and symbol tool.
// Everything runs in the browser — nothing is uploaded.

import { SITE } from "./content";

const WATERMARK = SITE.domain;

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function safeFileName(base: string) {
  const clean = base.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
  return clean || "bestnickfinder";
}

/** Plain-text export of a list of names/symbols, with a small credit footer. */
export function downloadTextFile(lines: string[], base: string) {
  const body = [...lines, "", `Generated with ${WATERMARK}`].join("\n");
  triggerDownload(new Blob([body], { type: "text/plain;charset=utf-8" }), `${safeFileName(base)}.txt`);
}

export interface ImageOptions {
  /** Heading rendered above the list. */
  title?: string;
  /** Background colour of the exported card. */
  background?: string;
  foreground?: string;
  accent?: string;
}

const DEFAULTS = {
  background: "#101828",
  foreground: "#f5f7fb",
  accent: "#22d3ee",
};

const FONT_STACK =
  "'Manrope','Segoe UI Symbol','Noto Sans Symbols 2','Apple Color Emoji','Segoe UI Emoji',sans-serif";

function layout(lines: string[], title?: string) {
  const padding = 56;
  const lineHeight = 62;
  const titleBlock = title ? 78 : 0;
  const width = 1200;
  const height = padding * 2 + titleBlock + lines.length * lineHeight + 56;
  return { padding, lineHeight, titleBlock, width, height };
}

/** Render the given lines to a branded PNG and download it. */
export function downloadPng(lines: string[], base: string, opts: ImageOptions = {}) {
  const o = { ...DEFAULTS, ...opts };
  const { padding, lineHeight, titleBlock, width, height } = layout(lines, opts.title);
  const scale = 2;

  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(scale, scale);

  ctx.fillStyle = o.background;
  ctx.fillRect(0, 0, width, height);

  // accent bar
  ctx.fillStyle = o.accent;
  ctx.fillRect(0, 0, width, 8);

  let y = padding + 34;
  if (opts.title) {
    ctx.font = `700 34px ${FONT_STACK}`;
    ctx.fillStyle = o.accent;
    ctx.fillText(opts.title, padding, y);
    y += titleBlock - 34;
  }

  ctx.font = `600 40px ${FONT_STACK}`;
  ctx.fillStyle = o.foreground;
  for (const line of lines) {
    y += lineHeight;
    ctx.fillText(line, padding, y);
  }

  ctx.font = `500 22px ${FONT_STACK}`;
  ctx.fillStyle = "rgba(245,247,251,0.55)";
  ctx.fillText(WATERMARK, padding, height - padding + 18);

  canvas.toBlob((blob) => {
    if (blob) triggerDownload(blob, `${safeFileName(base)}.png`);
  }, "image/png");
}

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Render the given lines to a branded, infinitely scalable SVG and download it. */
export function downloadSvg(lines: string[], base: string, opts: ImageOptions = {}) {
  const o = { ...DEFAULTS, ...opts };
  const { padding, lineHeight, titleBlock, width, height } = layout(lines, opts.title);

  const titleEl = opts.title
    ? `<text x="${padding}" y="${padding + 34}" font-family="${FONT_STACK}" font-size="34" font-weight="700" fill="${o.accent}">${escapeXml(opts.title)}</text>`
    : "";

  const start = padding + 34 + (opts.title ? titleBlock - 34 : 0);
  const body = lines
    .map(
      (line, i) =>
        `<text x="${padding}" y="${start + (i + 1) * lineHeight}" font-family="${FONT_STACK}" font-size="40" font-weight="600" fill="${o.foreground}">${escapeXml(line)}</text>`,
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(opts.title ?? "Name export")}">
<rect width="${width}" height="${height}" fill="${o.background}"/>
<rect width="${width}" height="8" fill="${o.accent}"/>
${titleEl}${body}
<text x="${padding}" y="${height - padding + 18}" font-family="${FONT_STACK}" font-size="22" font-weight="500" fill="rgba(245,247,251,0.55)">${WATERMARK}</text>
</svg>`;

  triggerDownload(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), `${safeFileName(base)}.svg`);
}

/** Native share sheet where available, clipboard fallback everywhere else. */
export async function shareLines(lines: string[], title: string): Promise<"shared" | "copied"> {
  const text = `${lines.join("\n")}\n\nvia ${SITE.url}`;
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text });
      return "shared";
    } catch {
      // user dismissed — fall through to clipboard
    }
  }
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* noop */
  }
  return "copied";
}
