import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Save, Trash2 } from "lucide-react";
import {
  deleteOverride,
  listOverrides,
  normalisePath,
  upsertOverride,
  type SeoOverride,
} from "@/lib/seo-overrides";
import { GUIDES, NICHES, SITE, TOOLS } from "@/lib/content";
import { LANDING_PAGES } from "@/lib/landing";
import { LOCALES } from "@/lib/i18n";

/** Every indexable path in the app, so the owner can edit SEO for any page. */
function allPaths(): string[] {
  return [
    "/",
    "/tools",
    "/ideas",
    "/guides",
    "/nicknames",
    ...TOOLS.map((t) => t.slug),
    ...NICHES.map((n) => `/generator/${n.slug}`),
    ...LANDING_PAGES.map((l) => `/ideas/${l.slug}`),
    ...GUIDES.map((g) => `/guides/${g.slug}`),
    ...LOCALES.map((l) => `/nicknames/${l.code}`),
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
    "/cookie-policy",
  ].map(normalisePath);
}

type Draft = {
  title: string;
  description: string;
  canonical: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  jsonld: string;
  noindex: boolean;
};

const EMPTY: Draft = {
  title: "",
  description: "",
  canonical: "",
  og_title: "",
  og_description: "",
  og_image: "",
  twitter_title: "",
  twitter_description: "",
  jsonld: "",
  noindex: false,
};

function toDraft(row?: SeoOverride, path = "/"): Draft {
  if (!row) return { ...EMPTY, canonical: `${SITE.url}${path === "/" ? "" : path}` };
  return {
    title: row.title ?? "",
    description: row.description ?? "",
    canonical: row.canonical ?? "",
    og_title: row.og_title ?? "",
    og_description: row.og_description ?? "",
    og_image: row.og_image ?? "",
    twitter_title: row.twitter_title ?? "",
    twitter_description: row.twitter_description ?? "",
    jsonld: row.jsonld ? JSON.stringify(row.jsonld, null, 2) : "",
    noindex: row.noindex,
  };
}

/**
 * Per-page SEO editor. Saved values are published instantly — pages read them
 * on load and override the build-time head tags without a redeploy.
 */
export function SeoManager({ onFlash }: { onFlash: (msg: string) => void }) {
  const paths = useMemo(allPaths, []);
  const [rows, setRows] = useState<SeoOverride[]>([]);
  const [path, setPath] = useState(paths[0] ?? "/");
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    const data = await listOverrides();
    setRows(data);
    setLoading(false);
    return data;
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    setDraft(toDraft(rows.find((r) => normalisePath(r.path) === path), path));
  }, [path, rows]);

  const overridden = useMemo(
    () => new Set(rows.map((r) => normalisePath(r.path))),
    [rows],
  );

  const visible = useMemo(
    () => paths.filter((p) => p.toLowerCase().includes(filter.trim().toLowerCase())),
    [paths, filter],
  );

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    let jsonld: unknown = null;
    if (draft.jsonld.trim()) {
      try {
        jsonld = JSON.parse(draft.jsonld);
      } catch {
        onFlash("JSON-LD isn't valid JSON — fix it and save again.");
        return;
      }
    }
    setBusy(true);
    const error = await upsertOverride({
      path,
      title: draft.title.trim() || null,
      description: draft.description.trim() || null,
      canonical: draft.canonical.trim() || null,
      og_title: draft.og_title.trim() || null,
      og_description: draft.og_description.trim() || null,
      og_image: draft.og_image.trim() || null,
      twitter_title: draft.twitter_title.trim() || null,
      twitter_description: draft.twitter_description.trim() || null,
      jsonld: (jsonld ?? null) as SeoOverride["jsonld"],
      noindex: draft.noindex,
    });
    setBusy(false);
    onFlash(error ? error.message : `Published SEO for ${path}.`);
    if (!error) await reload();
  };

  const remove = async () => {
    setBusy(true);
    const error = await deleteOverride(path);
    setBusy(false);
    onFlash(error ? error.message : `Reset ${path} to its built-in tags.`);
    if (!error) await reload();
  };

  const input =
    "w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none ring-ring/40 focus:border-primary focus:ring-4";
  const len = (s: string) => (s ? `${s.length} chars` : "");

  return (
    <section className="surface-card mt-6 p-5">
      <h2 className="font-display text-xl font-bold">Page SEO editor</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Edit the title, description, canonical, social cards and JSON-LD of any page. Changes go
        live the moment you save — no rebuild, no upload. Leave a field blank to keep the built-in
        value.
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div>
          <label htmlFor="seo-filter" className="mb-1.5 block text-sm font-semibold">
            Find a page
          </label>
          <input
            id="seo-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="e.g. free-fire"
            className={input}
          />
          <div className="mt-2 max-h-80 overflow-y-auto rounded-lg border border-border">
            {loading ? (
              <div className="flex items-center gap-2 p-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading…
              </div>
            ) : (
              <ul className="divide-y divide-border text-sm">
                {visible.map((p) => (
                  <li key={p}>
                    <button
                      type="button"
                      onClick={() => setPath(p)}
                      className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left ${
                        p === path ? "bg-accent font-semibold" : "hover:bg-accent/60"
                      }`}
                    >
                      <span className="truncate">{p}</span>
                      {overridden.has(p) && (
                        <span className="shrink-0 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                          custom
                        </span>
                      )}
                    </button>
                  </li>
                ))}
                {!visible.length && (
                  <li className="p-3 text-muted-foreground">No pages match that filter.</li>
                )}
              </ul>
            )}
          </div>
        </div>

        <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
          <p className="sm:col-span-2 rounded-lg bg-accent px-3 py-2 text-sm">
            Editing <span className="font-semibold">{path}</span>
          </p>

          <div className="sm:col-span-2">
            <label htmlFor="seo-title" className="mb-1.5 block text-sm font-semibold">
              Title <span className="text-muted-foreground">({len(draft.title) || "aim for < 60"})</span>
            </label>
            <input
              id="seo-title"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className={input}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="seo-desc" className="mb-1.5 block text-sm font-semibold">
              Meta description{" "}
              <span className="text-muted-foreground">({len(draft.description) || "aim for < 160"})</span>
            </label>
            <textarea
              id="seo-desc"
              rows={2}
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              className={input}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="seo-canonical" className="mb-1.5 block text-sm font-semibold">
              Canonical URL
            </label>
            <input
              id="seo-canonical"
              value={draft.canonical}
              onChange={(e) => setDraft({ ...draft, canonical: e.target.value })}
              placeholder={`${SITE.url}${path === "/" ? "" : path}`}
              className={input}
            />
          </div>

          <div>
            <label htmlFor="seo-ogtitle" className="mb-1.5 block text-sm font-semibold">
              OG title
            </label>
            <input
              id="seo-ogtitle"
              value={draft.og_title}
              onChange={(e) => setDraft({ ...draft, og_title: e.target.value })}
              className={input}
            />
          </div>
          <div>
            <label htmlFor="seo-twtitle" className="mb-1.5 block text-sm font-semibold">
              Twitter title
            </label>
            <input
              id="seo-twtitle"
              value={draft.twitter_title}
              onChange={(e) => setDraft({ ...draft, twitter_title: e.target.value })}
              className={input}
            />
          </div>
          <div>
            <label htmlFor="seo-ogdesc" className="mb-1.5 block text-sm font-semibold">
              OG description
            </label>
            <textarea
              id="seo-ogdesc"
              rows={2}
              value={draft.og_description}
              onChange={(e) => setDraft({ ...draft, og_description: e.target.value })}
              className={input}
            />
          </div>
          <div>
            <label htmlFor="seo-twdesc" className="mb-1.5 block text-sm font-semibold">
              Twitter description
            </label>
            <textarea
              id="seo-twdesc"
              rows={2}
              value={draft.twitter_description}
              onChange={(e) => setDraft({ ...draft, twitter_description: e.target.value })}
              className={input}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="seo-ogimage" className="mb-1.5 block text-sm font-semibold">
              Social image URL (absolute https)
            </label>
            <input
              id="seo-ogimage"
              value={draft.og_image}
              onChange={(e) => setDraft({ ...draft, og_image: e.target.value })}
              className={input}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="seo-jsonld" className="mb-1.5 block text-sm font-semibold">
              Extra JSON-LD (valid JSON, added alongside the built-in schema)
            </label>
            <textarea
              id="seo-jsonld"
              rows={6}
              spellCheck={false}
              value={draft.jsonld}
              onChange={(e) => setDraft({ ...draft, jsonld: e.target.value })}
              placeholder='{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[]}'
              className={`${input} font-mono text-xs`}
            />
          </div>

          <label className="flex items-center gap-2 text-sm font-semibold sm:col-span-2">
            <input
              type="checkbox"
              checked={draft.noindex}
              onChange={(e) => setDraft({ ...draft, noindex: e.target.checked })}
              className="h-4 w-4 accent-primary"
            />
            Hide this page from search engines (noindex, nofollow)
          </label>

          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground disabled:opacity-50"
            >
              <Save className="h-4 w-4" /> Publish SEO
            </button>
            {overridden.has(path) && (
              <button
                type="button"
                onClick={() => void remove()}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 font-semibold disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" /> Reset to default
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
