import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { Prose } from "@/components/site/Blocks";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | BestNickFinder" },
      {
        name: "description",
        content:
          "The terms that govern your use of BestNickFinder, including acceptable use, intellectual property and limitation of liability.",
      },
      { property: "og:title", content: "Terms of Use | BestNickFinder" },
      { property: "og:description", content: "Terms governing use of BestNickFinder." },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/terms` }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Terms of Use" }]} />
      <h1 className="font-display text-3xl font-extrabold">Terms of Use</h1>
      <p className="mt-2 text-xs text-muted-foreground">Last updated: 1 July 2026</p>
      <Prose
        sections={[
          {
            h2: "Acceptance",
            body: [
              `By accessing ${SITE.domain} you agree to these terms. If you do not agree, please stop using the site.`,
            ],
          },
          {
            h2: "Use of generated content",
            body: [
              "Names, text and passwords produced by our generators are provided free of charge and without restriction. You may use them for personal and commercial purposes. We make no claim of ownership over generated output and grant no exclusivity — another visitor may generate the same result.",
            ],
          },
          {
            h2: "Acceptable use",
            body: ["You agree not to use this site to:"],
            list: [
              "Create names intended to harass, impersonate or defame another person",
              "Break the terms of service of any game or platform",
              "Scrape, mirror or resell the site or its content at scale",
              "Attempt to disrupt, overload or gain unauthorised access to the site",
            ],
          },
          {
            h2: "Intellectual property",
            body: [
              "The site design, written guides and code are owned by us and protected by copyright. Unicode characters and symbols are part of a public standard and are not owned by anyone. Game, platform and company names mentioned on this site are trademarks of their respective owners; we are not affiliated with, endorsed by or sponsored by any of them.",
            ],
          },
          {
            h2: "No warranty",
            body: [
              "The site is provided on an as-is basis without warranties of any kind. We do not guarantee that a generated name is available, unique, legally clear or acceptable on any given platform. Verify availability and trademark status yourself before commercial use.",
            ],
          },
          {
            h2: "Limitation of liability",
            body: [
              "To the fullest extent permitted by law, we are not liable for any indirect or consequential loss arising from your use of this site or of any name generated on it.",
            ],
          },
          {
            h2: "Changes",
            body: [
              "We may revise these terms at any time. Continued use of the site after a change constitutes acceptance of the revised terms.",
            ],
          },
        ]}
      />
    </div>
  );
}
