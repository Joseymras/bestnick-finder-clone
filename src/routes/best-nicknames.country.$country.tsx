import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { NameGenerator } from "@/components/site/NameGenerator";
import { JsonLd } from "@/components/site/Blocks";
import { AdSlot } from "@/components/site/AdSlot";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { ExploreMore } from "@/components/site/LinkHub";
import { COUNTRY_MAP, pagesForCountry, type Country, type MarketPage } from "@/lib/markets";
import { buildHead, breadcrumbJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/best-nicknames/country/$country")({
  loader: ({ params }) => {
    const country = COUNTRY_MAP[params.country];
    if (!country) throw notFound();
    return { country, pages: pagesForCountry(country.slug) };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.country as Country | undefined;
    if (!c) return {};
    return buildHead({
      path: `/best-nicknames/country/${c.slug}`,
      title: `Best Nicknames in ${c.name} — ${c.language} Name Generator`,
      description: `Generate ${c.demonym} nicknames in ${c.language}${
        c.secondLanguage ? ` and ${c.secondLanguage}` : ""
      } for TikTok, Instagram, gaming and messaging apps. Free, instant, no signup.`,
      type: "article",
    });
  },
  component: Page,
});

function Page() {
  const { country, pages } = Route.useLoaderData() as {
    country: Country;
    pages: MarketPage[];
  };

  const faqs = [
    {
      q: `What are good nicknames for ${c(country)} users?`,
      a: `Strong ${country.demonym} handles pair one ${country.language} word with one short English word. ${country.habit}`,
    },
    {
      q: `Can I write my nickname in ${country.language} script?`,
      a: `Display names on most apps accept ${country.language} script and emoji, but username fields usually require Latin letters. Transliterate the username and keep the local script for display.`,
    },
    {
      q: `Which app should I pick a nickname for first?`,
      a: `Start with the platform you post on most — in ${country.name} that is usually ${
        pages[0]?.platform.name ?? "TikTok"
      } — then reuse the same handle everywhere so people can find you.`,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            faqJsonLd(faqs),
            breadcrumbJsonLd([
              { name: "Countries", path: "/best-nicknames" },
              { name: country.name, path: `/best-nicknames/country/${country.slug}` },
            ]),
            {
              "@type": "CollectionPage",
              name: `Nicknames in ${country.name}`,
              inLanguage: country.langCode,
              url: `${SITE.url}/best-nicknames/country/${country.slug}`,
            },
          ],
        }}
      />

      <Breadcrumbs
        items={[{ label: "Countries", to: "/best-nicknames" }, { label: country.name }]}
      />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        <span aria-hidden className="mr-2">
          {country.flag}
        </span>
        Best nicknames in {country.name}
      </h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Names built from {country.language}
        {country.secondLanguage ? ` and ${country.secondLanguage}` : ""} vocabulary, sized for the
        apps people actually use in {country.name}. {country.habit}
      </p>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-2xl font-bold">
          {country.demonym} nickname generator
        </h2>
        <NameGenerator count={18} showFlavors tool={`country-${country.slug}`} />
      </section>

      <AdSlot slot="1111111111" />

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">Pick your platform</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {pages.map((p) => (
            <Link
              key={p.slug}
              to="/best-nicknames/$slug"
              params={{ slug: p.slug }}
              className="surface-card hover-lift block p-4"
            >
              <span className="block font-semibold">{p.h1}</span>
              <span className="mt-1 block text-sm text-muted-foreground line-clamp-2">
                {p.platform.vibe}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">{country.language} words we mix in</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {country.pool.map((w) => (
            <li key={w} className="surface-card px-3 py-1.5 text-sm font-semibold">
              {w}
            </li>
          ))}
        </ul>
      </section>

      <AdSlot slot="2222222222" />
      <FaqSection faqs={faqs} />
      <ExploreMore />
    </div>
  );
}

function c(country: Country) {
  return country.demonym;
}
