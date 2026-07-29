import { createFileRoute, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { NameGenerator } from "@/components/site/NameGenerator";
import { FancyTextTool } from "@/components/site/FancyTextTool";
import { JsonLd, Prose } from "@/components/site/Blocks";
import { RelatedGenerators, ExploreMore } from "@/components/site/LinkHub";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AdSlot } from "@/components/site/AdSlot";
import { SymbolPalette } from "@/components/site/SymbolPalette";
import { LANDING_MAP } from "@/lib/landing";
import { buildHead, breadcrumbJsonLd, toolJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/ideas/$slug")({
  loader: ({ params }) => {
    const page = LANDING_MAP[params.slug];
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) =>
    loaderData
      ? buildHead({
          path: `/ideas/${loaderData.slug}`,
          title: loaderData.title,
          description: loaderData.description,
          socialTitle: loaderData.h1,
          socialDescription: loaderData.promise,
          type: "article",
        })
      : {},
  component: Page,
});

function Page() {
  const page = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            faqJsonLd(page.faqs),
            breadcrumbJsonLd([
              { name: "Name ideas", path: "/ideas" },
              { name: page.h1, path: `/ideas/${page.slug}` },
            ]),
            toolJsonLd(page.h1, page.promise, `/ideas/${page.slug}`),
            {
              "@type": "Article",
              headline: page.h1,
              description: page.promise,
              mainEntityOfPage: `${SITE.url}/ideas/${page.slug}`,
              author: { "@type": "Organization", name: SITE.name },
              publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
            },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Name ideas", to: "/ideas" }, { label: page.h1 }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{page.h1}</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">{page.intro}</p>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-2xl font-bold">Generate {page.keyword}</h2>
        {page.tool === "fancy" ? (
          <FancyTextTool limit={44} heading="Type your text" tool={page.slug} />
        ) : page.tool === "symbols" ? (
          <SymbolPalette tool={page.slug} />
        ) : (
          <NameGenerator defaultFlavor={page.flavor} count={18} showFlavors tool={page.slug} />
        )}
      </section>

      <AdSlot slot="1111111111" />

      <div className="mt-10">
        <Prose sections={page.sections} />
      </div>

      <AdSlot slot="2222222222" />

      <FaqSection faqs={page.faqs} />
      <RelatedGenerators
        slugs={page.related}
        description="Keep exploring — these pages target closely related name styles."
      />
      <ExploreMore />
    </div>
  );
}
