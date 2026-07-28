import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { Prose } from "@/components/site/Blocks";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer | BestNickFinder" },
      {
        name: "description",
        content:
          "Disclaimer covering the accuracy of information, third-party trademarks, external links and the use of generated names on BestNickFinder.",
      },
      { property: "og:title", content: "Disclaimer | BestNickFinder" },
      { property: "og:description", content: "Accuracy, trademarks and external links." },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/disclaimer` }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Disclaimer" }]} />
      <h1 className="font-display text-3xl font-extrabold">Disclaimer</h1>
      <p className="mt-2 text-xs text-muted-foreground">Last updated: 1 July 2026</p>
      <Prose
        sections={[
          {
            h2: "General information only",
            body: [
              `The content on ${SITE.domain} is provided for general information. We make reasonable efforts to keep platform rules, character limits and rename costs accurate, but these change without notice and we cannot guarantee that every detail is current.`,
            ],
          },
          {
            h2: "Trademarks and affiliation",
            body: [
              "Game titles, platform names, company names and logos referenced on this site are the property of their respective owners. Their use here is purely descriptive. We are not affiliated with, endorsed by, sponsored by or otherwise connected to any of them.",
            ],
          },
          {
            h2: "Generated names",
            body: [
              "Names produced by our tools are generated from word pools at random. We do not check them against trademark registers, do not guarantee availability on any platform, and do not warrant that any given name is legally clear to use commercially. Carry out your own checks before building a brand on a generated name.",
            ],
          },
          {
            h2: "External links",
            body: [
              "Some pages link to external websites for availability checking or reference. We do not control those sites and are not responsible for their content, availability or privacy practices.",
            ],
          },
          {
            h2: "No professional advice",
            body: [
              "Nothing on this site constitutes legal, trademark or security advice. Consult a qualified professional for decisions with legal or financial consequences.",
            ],
          },
        ]}
      />
    </div>
  );
}
