import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { JsonLd } from "@/components/site/Blocks";
import { AdSlot } from "@/components/site/AdSlot";
import { ExploreMore } from "@/components/site/LinkHub";
import { COUNTRIES, PLATFORMS, MARKET_PAGES } from "@/lib/markets";
import { buildHead, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/best-nicknames/")({
  head: () =>
    buildHead({
      path: "/best-nicknames",
      title: "Best Nicknames by Country & Platform — 24 Countries",
      description:
        "Country-specific nickname generators for TikTok, Instagram, Free Fire, BGMI, WhatsApp and more across India, Indonesia, Brazil, the USA and 20 other markets.",
      socialTitle: "Best nicknames by country and platform",
      socialDescription:
        "Pick your country and platform to generate names in your own language, with the right character limits.",
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
            breadcrumbJsonLd([{ name: "Countries", path: "/best-nicknames" }]),
            {
              "@type": "CollectionPage",
              name: "Best nicknames by country and platform",
              description:
                "Nickname generators tuned to each country's language, slang and platform rules.",
              hasPart: MARKET_PAGES.slice(0, 60).map((m) => ({
                "@type": "WebPage",
                name: m.h1,
                url: `/best-nicknames/${m.slug}`,
              })),
            },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Countries" }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        Best nicknames by country and platform
      </h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
        Names travel badly across borders. A handle that sounds sharp in Jakarta reads as nonsense
        in Berlin, and platform character limits differ too. Pick your country below to generate
        nickname ideas built from your own language's vocabulary — {MARKET_PAGES.length} pages
        across {COUNTRIES.length} countries and {PLATFORMS.length} platforms.
      </p>

      <AdSlot slot="1111111111" />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {COUNTRIES.map((c) => (
          <section key={c.slug} className="surface-card p-5">
            <h2 className="font-display text-xl font-bold">
              <Link to="/best-nicknames/country/$country" params={{ country: c.slug }}>
                <span aria-hidden className="mr-2">
                  {c.flag}
                </span>
                Nicknames in {c.name}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {c.language}
              {c.secondLanguage ? ` + ${c.secondLanguage}` : ""} · {c.platforms.length} platforms
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.platforms.map((p) => {
                const page = MARKET_PAGES.find(
                  (m) => m.country.slug === c.slug && m.platform.slug === p,
                );
                if (!page) return null;
                return (
                  <Link
                    key={p}
                    to="/best-nicknames/$slug"
                    params={{ slug: page.slug }}
                    className="rounded-full border border-border px-3 py-1 text-sm font-semibold hover:border-primary"
                  >
                    {page.platform.name}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <AdSlot slot="2222222222" />
      <ExploreMore />
    </div>
  );
}
