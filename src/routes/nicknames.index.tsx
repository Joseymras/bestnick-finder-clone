import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { JsonLd } from "@/components/site/Blocks";
import { ExploreMore } from "@/components/site/LinkHub";
import { buildHead, breadcrumbJsonLd } from "@/lib/seo";
import { LOCALES } from "@/lib/i18n";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/nicknames/")({
  head: () => ({
    ...buildHead({
      path: "/nicknames",
      title: "Nickname Generator in 10 Languages — BestNickFinder",
      description:
        "Generate nicknames and stylish names in Spanish, Portuguese, Hindi, Arabic, French, German, Turkish, Russian, Indonesian and Vietnamese — free and instant.",
      socialTitle: "Nickname generator in your language",
    }),
    links: [
      { rel: "canonical", href: `${SITE.url}/nicknames` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE.url}/` },
      ...LOCALES.map((l) => ({
        rel: "alternate",
        hrefLang: l.hreflang,
        href: `${SITE.url}/nicknames/${l.code}`,
      })),
    ],
  }),
  component: LanguagesIndex,
});

function LanguagesIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbJsonLd([{ name: "Languages", path: "/nicknames" }]),
            {
              "@type": "ItemList",
              name: "Nickname generators by language",
              itemListElement: LOCALES.map((l, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: l.h1,
                url: `${SITE.url}/nicknames/${l.code}`,
              })),
            },
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Languages" }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        Nickname generator in your language
      </h1>
      <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
        Every generator on BestNickFinder works with any alphabet, but these pages are written for
        specific audiences — with local wording, local platform notes and their own FAQ. Pick your
        language to start generating nicknames, stylish fonts and symbols right away.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {LOCALES.map((l) => (
          <li key={l.code}>
            <Link
              to="/nicknames/$lang"
              params={{ lang: l.code }}
              className="surface-card hover-lift block h-full p-4"
            >
              <span className="block font-display text-lg font-bold">{l.native}</span>
              <span className="mt-1 block text-xs uppercase tracking-wider text-muted-foreground">
                {l.label}
              </span>
              <span className="mt-2 block text-sm text-muted-foreground">{l.h1}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ExploreMore />
    </div>
  );
}
