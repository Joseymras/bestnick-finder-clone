import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { JsonLd } from "@/components/site/Blocks";
import { ExploreMore } from "@/components/site/LinkHub";
import { AdSlot } from "@/components/site/AdSlot";
import { LANDING_PAGES } from "@/lib/landing";
import { buildHead, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/ideas/")({
  head: () =>
    buildHead({
      path: "/ideas",
      title: `Username & Nickname Idea Collections — ${SITE.name}`,
      description:
        "Browse every name idea collection: aesthetic, gamer, cute, dark, professional, couple and platform-specific username ideas with instant generators.",
      socialTitle: "Username & Nickname Idea Collections",
      socialDescription:
        "Dozens of curated name idea pages, each with its own generator, examples and export tools.",
    }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbJsonLd([{ name: "Name ideas", path: "/ideas" }]),
            {
              "@type": "CollectionPage",
              name: "Username & Nickname Idea Collections",
              url: `${SITE.url}/ideas`,
              hasPart: LANDING_PAGES.map((p) => ({
                "@type": "WebPage",
                name: p.h1,
                url: `${SITE.url}/ideas/${p.slug}`,
              })),
            },
          ],
        }}
      />
      <Breadcrumbs items={[{ label: "Name ideas" }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        Username &amp; Nickname Idea Collections
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        {LANDING_PAGES.length} curated collections, each with its own generator, worked examples,
        platform rules and one-click export. Pick the register you are aiming for and start rolling.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LANDING_PAGES.map((p) => (
          <Link
            key={p.slug}
            to="/ideas/$slug"
            params={{ slug: p.slug }}
            className="surface-card hover-lift block p-4"
          >
            <span className="block font-semibold">{p.h1}</span>
            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
              {p.promise}
            </span>
          </Link>
        ))}
      </div>

      <AdSlot slot="1111111111" />
      <ExploreMore />
    </div>
  );
}
