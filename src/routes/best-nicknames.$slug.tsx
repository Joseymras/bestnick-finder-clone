import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { NameGenerator } from "@/components/site/NameGenerator";
import { FancyTextTool } from "@/components/site/FancyTextTool";
import { JsonLd, Prose } from "@/components/site/Blocks";
import { ExploreMore } from "@/components/site/LinkHub";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AdSlot } from "@/components/site/AdSlot";
import { MARKET_MAP, MARKET_PAGES } from "@/lib/markets";
import { buildHead, breadcrumbJsonLd, toolJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/best-nicknames/$slug")({
  loader: ({ params }) => {
    const page = MARKET_MAP[params.slug];
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) =>
    loaderData
      ? buildHead({
          path: `/best-nicknames/${loaderData.slug}`,
          title: loaderData.title,
          description: loaderData.description,
          socialTitle: loaderData.h1,
          socialDescription: loaderData.intro.slice(0, 160),
          type: "article",
        })
      : {},
  component: Page,
});

function Page() {
  const page = Route.useLoaderData();
  const { country, platform } = page;
  const siblings = MARKET_PAGES.filter(
    (m) => m.platform.slug === platform.slug && m.country.slug !== country.slug,
  ).slice(0, 8);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            faqJsonLd(page.faqs),
            breadcrumbJsonLd([
              { name: "Countries", path: "/best-nicknames" },
              { name: country.name, path: `/best-nicknames/country/${country.slug}` },
              { name: page.h1, path: `/best-nicknames/${page.slug}` },
            ]),
            toolJsonLd(page.h1, page.description, `/best-nicknames/${page.slug}`),
            {
              "@type": "Article",
              headline: page.h1,
              description: page.description,
              inLanguage: country.langCode,
              mainEntityOfPage: `${SITE.url}/best-nicknames/${page.slug}`,
              author: { "@type": "Organization", name: SITE.name },
              publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
              about: { "@type": "Thing", name: `${platform.name} nicknames in ${country.name}` },
            },
            {
              "@type": "ItemList",
              name: `${platform.name} nickname examples for ${country.name}`,
              itemListElement: page.examples.map((e, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: e,
              })),
            },
          ],
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Countries", to: "/best-nicknames" },
          { label: page.h1 },
        ]}
      />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        <span aria-hidden className="mr-2">
          {country.flag}
        </span>
        {page.h1}
      </h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">{page.intro}</p>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-2xl font-bold">
          Generate {platform.name} names for {country.name}
        </h2>
        <NameGenerator
          defaultFlavor={platform.flavor}
          count={18}
          showFlavors
          tool={`market-${page.slug}`}
        />
      </section>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-2xl font-bold">
          {platform.name} name examples ({country.language})
        </h2>
        <ul className="flex flex-wrap gap-2">
          {page.examples.map((e) => (
            <li key={e} className="surface-card px-3 py-1.5 text-sm font-semibold">
              {e}
            </li>
          ))}
        </ul>
      </section>

      <AdSlot slot="1111111111" />

      {platform.symbols && (
        <section className="mt-10">
          <h2 className="mb-3 font-display text-2xl font-bold">Style it for {platform.name}</h2>
          <FancyTextTool limit={40} heading="Type your name" tool={`market-${page.slug}`} />
        </section>
      )}

      <div className="mt-10">
        <Prose sections={page.sections} />
      </div>

      <AdSlot slot="2222222222" />

      <FaqSection faqs={page.faqs} />

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold">
          More {platform.name} names by country
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {siblings.map((s) => (
            <Link
              key={s.slug}
              to="/best-nicknames/$slug"
              params={{ slug: s.slug }}
              className="surface-card hover-lift block p-4"
            >
              <span className="block font-semibold">
                <span aria-hidden className="mr-2">
                  {s.country.flag}
                </span>
                {s.h1}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {s.country.language} vocabulary, {s.platform.name} rules
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">
          Other platforms in {country.name}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {page.related.map((slug) => {
            const rel = MARKET_MAP[slug];
            if (!rel) return null;
            return (
              <Link
                key={slug}
                to="/best-nicknames/$slug"
                params={{ slug }}
                className="surface-card px-3 py-1.5 text-sm font-semibold hover-lift"
              >
                {rel.platform.name}
              </Link>
            );
          })}
          <Link
            to="/best-nicknames/country/$country"
            params={{ country: country.slug }}
            className="surface-card px-3 py-1.5 text-sm font-semibold hover-lift"
          >
            All {country.name} pages →
          </Link>
        </div>
      </section>

      <ExploreMore />
    </div>
  );
}
