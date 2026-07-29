import { Link } from "@tanstack/react-router";
import { NICHE_MAP, TOOLS, type Niche } from "@/lib/content";
import { LANDING_MAP } from "@/lib/landing";

interface HubItem {
  to: string;
  params?: Record<string, string>;
  title: string;
  blurb: string;
}

function resolve(slug: string): HubItem | null {
  const niche = NICHE_MAP[slug] as Niche | undefined;
  if (niche) {
    return {
      to: "/generator/$slug",
      params: { slug: niche.slug },
      title: niche.h1,
      blurb: niche.description,
    };
  }
  const landing = LANDING_MAP[slug];
  if (landing) {
    return {
      to: "/ideas/$slug",
      params: { slug: landing.slug },
      title: landing.h1,
      blurb: landing.promise,
    };
  }
  const tool = TOOLS.find((t) => t.slug === slug || t.slug === `/${slug}`);
  if (tool) return { to: tool.slug, title: tool.title, blurb: tool.blurb };
  return null;
}

function Card({ item }: { item: HubItem }) {
  return (
    <Link
      to={item.to}
      params={item.params as never}
      className="surface-card hover-lift block p-4"
    >
      <span className="block font-semibold">{item.title}</span>
      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {item.blurb}
      </span>
    </Link>
  );
}

/**
 * "Related generators" grid — accepts niche slugs, landing slugs or tool paths
 * so any page can funnel readers into neighbouring keyword pages.
 */
export function RelatedGenerators({
  slugs,
  title = "Related generators",
  description,
}: {
  slugs: string[];
  title?: string;
  description?: string;
}) {
  const items = slugs.map(resolve).filter(Boolean) as HubItem[];
  if (!items.length) return null;
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <Card key={i.title} item={i} />
        ))}
      </div>
    </section>
  );
}

/**
 * Compact sitewide link hub rendered at the bottom of every content page so
 * both readers and crawlers always have a route deeper into the site.
 */
export function ExploreMore({ exclude }: { exclude?: string }) {
  const landings = Object.values(LANDING_MAP);
  const niches = Object.values(NICHE_MAP) as Niche[];

  return (
    <nav aria-label="Explore more" className="mt-12 border-t border-border pt-8">
      <h2 className="font-display text-2xl font-bold">Explore more name ideas</h2>
      <div className="mt-5 grid gap-6 sm:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Tools
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {TOOLS.filter((t) => t.slug !== exclude).map((t) => (
              <li key={t.slug}>
                <Link to={t.slug} className="text-foreground hover:text-primary hover:underline">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Game &amp; app generators
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {niches.slice(0, 12).map((n) => (
              <li key={n.slug}>
                <Link
                  to="/generator/$slug"
                  params={{ slug: n.slug }}
                  className="text-foreground hover:text-primary hover:underline"
                >
                  {n.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Name idea collections
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {landings.slice(0, 14).map((l) => (
              <li key={l.slug}>
                <Link
                  to="/ideas/$slug"
                  params={{ slug: l.slug }}
                  className="text-foreground hover:text-primary hover:underline"
                >
                  {l.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link
        to="/ideas"
        className="mt-6 inline-block text-sm font-semibold text-primary hover:underline"
      >
        Browse all name idea pages →
      </Link>
    </nav>
  );
}
