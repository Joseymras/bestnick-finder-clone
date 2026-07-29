import { SITE } from "./content";

export interface SeoInput {
  /** Path beginning with "/" — used for canonical and og:url. */
  path: string;
  title: string;
  description: string;
  /** Shorter title for social cards; falls back to `title`. */
  socialTitle?: string;
  socialDescription?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

/**
 * Builds the complete head payload for a route: title, description,
 * canonical, Open Graph and Twitter Card tags. Every content route uses this
 * so no page can ship with partial metadata.
 */
export function buildHead(input: SeoInput) {
  const url = `${SITE.url}${input.path === "/" ? "" : input.path}`;
  const socialTitle = input.socialTitle ?? input.title;
  const socialDescription = input.socialDescription ?? input.description;

  return {
    meta: [
      { title: input.title },
      { name: "description", content: input.description },
      ...(input.noindex
        ? [{ name: "robots", content: "noindex, nofollow" }]
        : [{ name: "robots", content: "index, follow, max-image-preview:large" }]),
      { property: "og:type", content: input.type ?? "website" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:title", content: socialTitle },
      { property: "og:description", content: socialDescription },
      { property: "og:url", content: url },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: socialTitle },
      { name: "twitter:description", content: socialDescription },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** Reusable BreadcrumbList JSON-LD node. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/** WebApplication JSON-LD for tool pages — helps AI assistants cite the tool. */
export function toolJsonLd(name: string, description: string, path: string) {
  return {
    "@type": "WebApplication",
    name,
    description,
    url: `${SITE.url}${path}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}
