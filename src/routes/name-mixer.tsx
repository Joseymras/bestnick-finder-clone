import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/site/Layout";
import { CopyCard } from "@/components/site/CopyCard";
import { JsonLd, Prose, RelatedLinks } from "@/components/site/Blocks";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AdSlot } from "@/components/site/AdSlot";
import { mixNames } from "@/lib/names";
import { SITE } from "@/lib/content";

const FAQS = [
  {
    q: "How do I mix two names together?",
    a: "Take the opening sound of the first name and the ending of the second, then try the reverse. Enter both names above and the mixer produces every workable split automatically.",
  },
  {
    q: "What is a ship name?",
    a: "A ship name is a blended name for two people or characters, used widely in fandom. Mechanically it is identical to a couple name.",
  },
  {
    q: "Can I mix more than two names?",
    a: "Run the mixer twice — blend the first two names, then feed that result back in with the third. Keep the final result under about twelve characters so it stays sayable.",
  },
  {
    q: "Can I use a mixed name for a business?",
    a: "Yes, and it is a common branding technique for partnerships. Check the domain and trademark register before you commit.",
  },
];

const SECTIONS = [
  {
    h2: "Where the split should fall",
    body: [
      "The most natural blends cut both names at a syllable boundary. Cutting mid-consonant-cluster produces results nobody can pronounce. The generator tries every split position and filters out combinations that are too long, too short or that pile consonants together.",
    ],
  },
  {
    h2: "Uses beyond couple names",
    body: ["Any time two identities need a single label, blending beats a hyphen."],
    list: [
      "Couple and ship names for social bios",
      "Duo streaming and podcast channel names",
      "Business partnerships and joint ventures",
      "Band names from two members' surnames",
      "Pet names combining two owners",
      "Clan tags merging two squad names",
    ],
  },
  {
    h2: "Quality checks",
    body: [
      "Before you use a blend, say it aloud three times, write it down, and search it. You are checking that it is pronounceable, that it does not accidentally spell something unfortunate, and that it is not already a well-known brand.",
    ],
  },
];

export const Route = createFileRoute("/name-mixer")({
  head: () => ({
    meta: [
      { title: "Name Mixer — Blend Two Names Into One | BestNickFinder" },
      {
        name: "description",
        content:
          "Free name mixer that blends two names into couple names, ship names, duo brands and clan tags. Instant results, copy with one tap.",
      },
      { property: "og:title", content: "Name Mixer — Blend Two Names Into One" },
      {
        property: "og:description",
        content: "Combine any two names into dozens of readable blends instantly.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/name-mixer` }],
  }),
  component: Page,
});

function Page() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const results = useMemo(() => mixNames(a, b, 30), [a, b]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={faqJsonLd(FAQS)} />
      <Breadcrumbs items={[{ label: "Tools", to: "/tools" }, { label: "Name Mixer" }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Name Mixer</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Enter two names and get every plausible blend — couple names, ship names, duo brands and
        clan tags. Results filter out anything unpronounceable.
      </p>

      <div className="surface-card mt-8 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="a" className="mb-1.5 block text-sm font-semibold">
              First name
            </label>
            <input
              id="a"
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="e.g. Aria"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none ring-ring/40 transition focus:border-primary focus:ring-4"
            />
          </div>
          <div>
            <label htmlFor="b" className="mb-1.5 block text-sm font-semibold">
              Second name
            </label>
            <input
              id="b"
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="e.g. Noah"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 outline-none ring-ring/40 transition focus:border-primary focus:ring-4"
            />
          </div>
        </div>

        {results.length > 0 ? (
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((r) => (
              <CopyCard key={r} value={r} size="sm" />
            ))}
          </div>
        ) : (
          <p className="mt-5 text-sm text-muted-foreground">
            Enter both names to see blended results.
          </p>
        )}
      </div>

      <AdSlot slot="1111111111" />

      <div className="mt-8">
        <Prose sections={SECTIONS} />
      </div>

      <FaqSection faqs={FAQS} />
      <RelatedLinks slugs={["couple-name-generator", "business-name-generator", "cute-nicknames"]} />
    </div>
  );
}
