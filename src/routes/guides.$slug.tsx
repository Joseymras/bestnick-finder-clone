import { createFileRoute, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { JsonLd, Prose, ToolGrid } from "@/components/site/Blocks";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AdSlot } from "@/components/site/AdSlot";
import { GUIDE_MAP, SITE } from "@/lib/content";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }) => {
    const guide = GUIDE_MAP[params.slug];
    if (!guide) throw notFound();
    return guide;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | BestNickFinder` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "article" },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `${SITE.url}/guides/${loaderData.slug}` }] : [],
  }),
  component: Page,
});

function Page() {
  const guide = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: guide.title,
              description: guide.description,
              dateModified: guide.updated,
              datePublished: guide.updated,
              author: { "@type": "Organization", name: SITE.name },
              publisher: { "@type": "Organization", name: SITE.name },
              mainEntityOfPage: `${SITE.url}/guides/${guide.slug}`,
            },
            faqJsonLd(guide.faqs),
          ],
        }}
      />
      <Breadcrumbs items={[{ label: "Guides", to: "/guides" }, { label: guide.title }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{guide.h1}</h1>
      <p className="mt-2 text-xs text-muted-foreground">
        Updated {guide.updated} · {guide.readTime}
      </p>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{guide.intro}</p>

      <AdSlot slot="1111111111" />

      <div className="mt-6">
        <Prose sections={guide.sections} />
      </div>

      <FaqSection faqs={guide.faqs} />

      <section className="mt-12">
        <h2 className="mb-4 font-display text-2xl font-bold">Try the tools</h2>
        <ToolGrid />
      </section>
    </article>
  );
}
