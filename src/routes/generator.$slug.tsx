import { createFileRoute, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { FancyTextTool } from "@/components/site/FancyTextTool";
import { NameGenerator } from "@/components/site/NameGenerator";
import { CopyCard } from "@/components/site/CopyCard";
import { JsonLd, Prose, RelatedLinks } from "@/components/site/Blocks";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AdSlot } from "@/components/site/AdSlot";
import { NICHE_MAP, SITE } from "@/lib/content";

export const Route = createFileRoute("/generator/$slug")({
  loader: ({ params }) => {
    const niche = NICHE_MAP[params.slug];
    if (!niche) throw notFound();
    return niche;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: loaderData.title },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.description },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: `${SITE.url}/generator/${loaderData.slug}` }]
      : [],
  }),
  component: Page,
});

function Page() {
  const niche = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            faqJsonLd(niche.faqs),
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
                { "@type": "ListItem", position: 2, name: "Tools", item: `${SITE.url}/tools` },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: niche.h1,
                  item: `${SITE.url}/generator/${niche.slug}`,
                },
              ],
            },
          ],
        }}
      />
      <Breadcrumbs items={[{ label: "Tools", to: "/tools" }, { label: niche.h1 }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{niche.h1}</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">{niche.intro}</p>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-2xl font-bold">Style your name</h2>
        <FancyTextTool limit={40} heading="Enter your name" />
      </section>

      <AdSlot slot="1111111111" />

      <section className="mt-10">
        <h2 className="mb-3 font-display text-2xl font-bold">Generate a fresh idea</h2>
        <NameGenerator defaultFlavor={niche.flavor} count={12} showFlavors={false} />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 font-display text-2xl font-bold">Ready-made examples</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {niche.examples.map((e: string) => (
            <CopyCard key={e} value={e} size="sm" />
          ))}
        </div>
      </section>

      <div className="mt-10">
        <Prose sections={niche.sections} />
      </div>

      <AdSlot slot="2222222222" />

      <FaqSection faqs={niche.faqs} />
      <RelatedLinks slugs={niche.related} />
    </div>
  );
}
