import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { ToolGrid } from "@/components/site/Blocks";
import { AdSlot } from "@/components/site/AdSlot";
import { NICHES, GUIDES, SITE } from "@/lib/content";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "All Name & Text Tools — Free Generators | BestNickFinder" },
      {
        name: "description",
        content:
          "Every BestNickFinder tool in one place: nickname generator, fancy text, username finder, name mixer, symbols, password generator and 16 niche generators.",
      },
      { property: "og:title", content: "All Name & Text Tools — Free Generators" },
      {
        property: "og:description",
        content: "Browse every free naming and text-styling tool on BestNickFinder.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/tools` }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Tools" }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">All Tools</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Every generator on the site, all free and all running entirely in your browser.
      </p>

      <section className="mt-8">
        <h2 className="mb-4 font-display text-2xl font-bold">Core tools</h2>
        <ToolGrid />
      </section>

      <AdSlot slot="1111111111" />

      <section className="mt-10">
        <h2 className="mb-4 font-display text-2xl font-bold">Generators by platform</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NICHES.map((n) => (
            <Link
              key={n.slug}
              to="/generator/$slug"
              params={{ slug: n.slug }}
              className="surface-card hover-lift block p-4"
            >
              <span className="block font-semibold">{n.h1}</span>
              <span className="mt-1 block text-sm text-muted-foreground line-clamp-2">
                {n.description}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-2xl font-bold">Guides</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              to="/guides/$slug"
              params={{ slug: g.slug }}
              className="surface-card hover-lift block p-4"
            >
              <span className="block font-semibold">{g.title}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{g.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
