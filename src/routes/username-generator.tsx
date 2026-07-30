import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/site/Layout";
import { SelectableResults, SelectionControls } from "@/components/site/SelectableResults";
import { ExportBar } from "@/components/site/ExportBar";
import { ExploreMore } from "@/components/site/LinkHub";
import { useSelection } from "@/hooks/use-selection";
import { track } from "@/lib/analytics";
import { JsonLd, Prose, RelatedLinks } from "@/components/site/Blocks";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AdSlot } from "@/components/site/AdSlot";
import { usernameVariants } from "@/lib/names";
import { SITE } from "@/lib/content";

const PLATFORMS = [
  { name: "Instagram", url: (h: string) => `https://instagram.com/${h}` },
  { name: "TikTok", url: (h: string) => `https://tiktok.com/@${h}` },
  { name: "YouTube", url: (h: string) => `https://youtube.com/@${h}` },
  { name: "X", url: (h: string) => `https://x.com/${h}` },
  { name: "Reddit", url: (h: string) => `https://reddit.com/user/${h}` },
  { name: "Twitch", url: (h: string) => `https://twitch.tv/${h}` },
  { name: "GitHub", url: (h: string) => `https://github.com/${h}` },
];

const FAQS = [
  {
    q: "How do I find an available username?",
    a: "Generate a batch of variations, then open each platform's profile URL with your handle appended. A not-found page means it is free. Checking manually is slower than a checker tool but it is the only authoritative method.",
  },
  {
    q: "What characters are allowed in a username?",
    a: "Most platforms allow lowercase letters, numbers, periods and underscores. Roblox allows only one underscore and no periods; Discord handles are lowercase-only. None accept fancy Unicode.",
  },
  {
    q: "Should I use the same username everywhere?",
    a: "Yes, whenever possible. Consistency means every mention of you anywhere points to all of your profiles. It is worth accepting a slightly less perfect name to get one that is free across the board.",
  },
  {
    q: "Are numbers in a username bad?",
    a: "Random trailing numbers look like a second-choice account. A number that means something — a year you chose deliberately, a jersey number — reads fine.",
  },
  {
    q: "How long should a username be?",
    a: "Six to fourteen characters. Short enough to type from memory, long enough to still be available on the big platforms.",
  },
];

const SECTIONS = [
  {
    h2: "How this generator builds handles",
    body: [
      "Enter any word — your name, a nickname, a brand — and the tool produces variations using the patterns that consistently find available handles: prefixes, suffixes, leetspeak substitution, adjective and noun compounds, and controlled numeric endings.",
      "Long words produce fewer usable results, so start from the shortest recognisable version of your name.",
    ],
  },
  {
    h2: "Prefixes and suffixes that still work",
    body: ["When the bare word is taken, these modifiers preserve the brand better than random digits."],
    list: [
      "the — theVellum, theCrumbClub",
      "its / real — itsaria, realnoor",
      "hq / co / studio — vellumhq, driftco",
      "verb suffix — ariabuilds, noorcooks",
      "single trailing x — vellumx",
    ],
  },
  {
    h2: "Platform character rules at a glance",
    body: ["Check your candidate against the strictest platform on your list before you commit."],
    list: [
      "Instagram: 30 chars, letters, numbers, period, underscore",
      "TikTok: 24 chars, changeable once every 30 days",
      "YouTube: 3–30 chars for @handles, two changes per 14 days",
      "X: 15 chars, letters, numbers and underscore only",
      "Discord: 2–32 chars, lowercase, period and underscore",
      "Roblox: 3–20 chars, one underscore, not at the ends",
      "Twitch: 4–25 chars, letters, numbers and underscore",
    ],
  },
  {
    h2: "Claim it everywhere on the same day",
    body: [
      "Availability moves fast on short handles. When you find a name free across your list, register it on every platform that day — even the ones you have no plans to use. Dormant accounts cost nothing and keep the option open permanently.",
    ],
  },
];

export const Route = createFileRoute("/username-generator")({
  head: () => ({
    meta: [
      { title: "Username Generator — Find an Available Handle | BestNickFinder" },
      {
        name: "description",
        content:
          "Generate username variations from any word and check availability on Instagram, TikTok, YouTube, X, Reddit, Twitch and GitHub in one click.",
      },
      { property: "og:title", content: "Username Generator — Find an Available Handle" },
      {
        property: "og:description",
        content: "Build handle variations and check them across every major platform.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/username-generator` }],
  }),
  component: Page,
});

function Page() {
  const [base, setBase] = useState("");
  const [focused, setFocused] = useState("");
  const results = useMemo(() => usernameVariants(base, 36), [base]);
  const { selected, toggle, selectAll, clear, exportLines, count } = useSelection(results);

  useEffect(() => {
    clear();
  }, [base, clear]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={faqJsonLd(FAQS)} />
      <Breadcrumbs items={[{ label: "Tools", to: "/tools" }, { label: "Username Generator" }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Username Generator</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Enter your name or a keyword and get dozens of handle variations. Pick one, then check it
        across every major platform with a single click.
      </p>

      <div className="surface-card mt-8 p-5">
        <label htmlFor="base" className="mb-1.5 block text-sm font-semibold">
          Your name or keyword
        </label>
        <input
          id="base"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          onBlur={() => base && track("generate", "username-generator", { length: base.length })}
          placeholder="e.g. aria"
          className="w-full rounded-lg border border-input bg-background px-4 py-3 text-lg outline-none ring-ring/40 transition focus:border-primary focus:ring-4"
        />

        {results.length > 0 && (
          <>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <SelectionControls
                total={results.length}
                selectedCount={count}
                onSelectAll={selectAll}
                onClear={clear}
                tool="username-generator"
              />
              <ExportBar
                lines={exportLines}
                fileBase={`${base || "username"}-ideas`}
                title={`${base || "Username"} — handle ideas`}
                tool="username-generator"
              />
            </div>
            <div className="mt-4" onClickCapture={(e) => {
              const t = (e.target as HTMLElement).closest("button");
              if (t?.textContent) setFocused(t.textContent.trim());
            }}>
              <SelectableResults
                items={results.map((r) => ({ value: r }))}
                selected={selected}
                onToggle={toggle}
                tool="username-generator"
                size="sm"
              />
            </div>
          </>
        )}

        {(focused || base) && (
          <div className="mt-6 border-t border-border pt-5">
            <h2 className="text-sm font-semibold">
              Check availability for{" "}
              <span className="text-primary">@{focused || base.trim().toLowerCase()}</span>
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Opens each profile URL in a new tab — a “not found” page means the handle is free.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <a
                  key={p.name}
                  href={p.url(focused || base.trim().toLowerCase())}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary hover:bg-accent"
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <AdSlot slot="1111111111" />

      <div className="mt-8">
        <Prose sections={SECTIONS} />
      </div>

      <FaqSection faqs={FAQS} />
      <RelatedLinks
        slugs={["instagram-username-ideas", "tiktok-username-ideas", "roblox-username-ideas"]}
      />
      <ExploreMore />
    </div>
  );
}
