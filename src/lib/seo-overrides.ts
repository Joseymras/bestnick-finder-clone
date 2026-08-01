import { supabase } from "@/integrations/supabase/client";

export interface SeoOverride {
  path: string;
  title: string | null;
  description: string | null;
  canonical: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  jsonld: unknown;
  noindex: boolean;
}

const FIELDS =
  "path,title,description,canonical,og_title,og_description,og_image,twitter_title,twitter_description,jsonld,noindex";

let cache: Promise<Record<string, SeoOverride>> | null = null;

/** All published overrides, keyed by path. Cached per page load. */
export function loadOverrides(force = false): Promise<Record<string, SeoOverride>> {
  if (force) cache = null;
  if (!cache) {
    cache = supabase
      .from("seo_overrides")
      .select(FIELDS)
      .then(({ data }) => {
        const out: Record<string, SeoOverride> = {};
        for (const row of (data ?? []) as SeoOverride[]) out[normalisePath(row.path)] = row;
        return out;
      })
      .catch(() => ({}));
  }
  return cache;
}

export function normalisePath(path: string) {
  if (!path) return "/";
  const clean = path.split("?")[0]!.split("#")[0]!;
  if (clean === "/") return "/";
  return clean.replace(/\/+$/, "") || "/";
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSONLD_ID = "seo-override-jsonld";

/**
 * Applies an owner-published override to the live document head. Runs in the
 * browser only, so prerendered HTML keeps its build-time defaults as fallback.
 */
export function applyOverride(o: SeoOverride) {
  if (typeof document === "undefined") return;
  if (o.title) {
    document.title = o.title;
    setMeta("property", "og:title", o.og_title || o.title);
    setMeta("name", "twitter:title", o.twitter_title || o.og_title || o.title);
  }
  if (o.og_title) setMeta("property", "og:title", o.og_title);
  if (o.twitter_title) setMeta("name", "twitter:title", o.twitter_title);
  if (o.description) {
    setMeta("name", "description", o.description);
    setMeta("property", "og:description", o.og_description || o.description);
    setMeta("name", "twitter:description", o.twitter_description || o.og_description || o.description);
  }
  if (o.og_description) setMeta("property", "og:description", o.og_description);
  if (o.twitter_description) setMeta("name", "twitter:description", o.twitter_description);
  if (o.og_image) {
    setMeta("property", "og:image", o.og_image);
    setMeta("name", "twitter:image", o.og_image);
  }
  if (o.canonical) {
    setLink("canonical", o.canonical);
    setMeta("property", "og:url", o.canonical);
  }
  setMeta(
    "name",
    "robots",
    o.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
  );

  document.getElementById(JSONLD_ID)?.remove();
  if (o.jsonld) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = JSONLD_ID;
    script.textContent = typeof o.jsonld === "string" ? o.jsonld : JSON.stringify(o.jsonld);
    document.head.appendChild(script);
  }
}

export async function upsertOverride(row: Partial<SeoOverride> & { path: string }) {
  const payload = { ...row, path: normalisePath(row.path), updated_at: new Date().toISOString() };
  const { error } = await supabase.from("seo_overrides").upsert(payload, { onConflict: "path" });
  cache = null;
  return error;
}

export async function deleteOverride(path: string) {
  const { error } = await supabase.from("seo_overrides").delete().eq("path", normalisePath(path));
  cache = null;
  return error;
}

export async function listOverrides(): Promise<SeoOverride[]> {
  const { data } = await supabase.from("seo_overrides").select(FIELDS).order("path");
  return (data ?? []) as SeoOverride[];
}
