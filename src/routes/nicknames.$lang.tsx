import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { FancyTextTool } from "@/components/site/FancyTextTool";
import { NameGenerator } from "@/components/site/NameGenerator";
import { JsonLd } from "@/components/site/Blocks";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AdSlot } from "@/components/site/AdSlot";
import { TrendingPanel } from "@/components/site/LivePanels";
import { ExploreMore } from "@/components/site/LinkHub";
import { LOCALES, LOCALE_MAP } from "@/lib/i18n";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/nicknames/$lang")({
  loader: ({ params }) => {
    const locale = LOCALE_MAP[params.lang];
    if (!locale) throw notFound();
    return locale;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const url = `${SITE.url}/nicknames/${loaderData.code}`;
    return {
      meta: [
        { title: loaderData.title },
        { name: "description", content: loaderData.description },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.description },
        { property: "og:url", content: url },
        { property: "og:locale", content: loaderData.hreflang },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: loaderData.title },
        { name: "twitter:description", content: loaderData.description },
      ],
      links: [
        { rel: "canonical", href: url },
        { rel: "alternate", hrefLang: "x-default", href: `${SITE.url}/` },
        { rel: "alternate", hrefLang: "en", href: `${SITE.url}/` },
        ...LOCALES.map((l) => ({
          rel: "alternate",
          hrefLang: l.hreflang,
          href: `${SITE.url}/nicknames/${l.code}`,
        })),
      ],
    };
  },
  component: LocalePage,
});

function LocalePage() {
  const locale = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8" dir={locale.dir} lang={locale.hreflang}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            faqJsonLd(locale.faqs),
            {
              "@type": "WebApplication",
              name: locale.h1,
              description: locale.description,
              url: `${SITE.url}/nicknames/${locale.code}`,
              inLanguage: locale.hreflang,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
          ],
        }}
      />

      <div dir="ltr">
        <Breadcrumbs items={[{ label: "Languages", to: "/nicknames" }, { label: locale.native }]} />
      </div>

      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{locale.h1}</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">{locale.intro}</p>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-2xl font-bold">{locale.labels.generate}</h2>
        <NameGenerator count={18} showFlavors tool={`nicknames-${locale.code}`} />
      </section>

      <AdSlot slot="1111111111" />

      <section className="mt-10">
        <h2 className="mb-3 font-display text-2xl font-bold">{locale.labels.styleIt}</h2>
        <FancyTextTool limit={44} heading={locale.labels.input} tool={`fancy-${locale.code}`} />
      </section>

      <div className="mt-10 space-y-8">
        {locale.sections.map((s) => (
          <section key={s.h2}>
            <h2 className="font-display text-2xl font-bold">{s.h2}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>

      <AdSlot slot="2222222222" />

      <div className="mt-10">
        <TrendingPanel limit={10} />
      </div>

      <FaqSection faqs={locale.faqs} />

      <section className="mt-10" dir="ltr">
        <h2 className="font-display text-xl font-bold">Other languages</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {LOCALES.filter((l) => l.code !== locale.code).map((l) => (
            <li key={l.code}>
              <Link
                to="/nicknames/$lang"
                params={{ lang: l.code }}
                className="rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary"
              >
                {l.native}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div dir="ltr">
        <ExploreMore />
      </div>
    </div>
  );
}
