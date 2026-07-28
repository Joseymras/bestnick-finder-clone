import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { Prose } from "@/components/site/Blocks";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy | BestNickFinder" },
      {
        name: "description",
        content:
          "Which cookies BestNickFinder uses, why they are set, how long they last and how to control or remove them in your browser.",
      },
      { property: "og:title", content: "Cookie Policy | BestNickFinder" },
      { property: "og:description", content: "Cookies used on BestNickFinder and how to control them." },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/cookie-policy` }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Cookie Policy" }]} />
      <h1 className="font-display text-3xl font-extrabold">Cookie Policy</h1>
      <p className="mt-2 text-xs text-muted-foreground">Last updated: 1 July 2026</p>
      <Prose
        sections={[
          {
            h2: "What cookies are",
            body: [
              "Cookies are small text files stored by your browser when you visit a website. They allow a site to remember information between page loads and between visits.",
            ],
          },
          {
            h2: "Cookies we use",
            body: ["This site uses a small number of cookie categories:"],
            list: [
              "Essential — required for the site to function and to remember your consent choice",
              "Analytics — Google Analytics, used to measure aggregate traffic and page performance",
              "Advertising — Google AdSense and its partners, used to select and measure ads",
            ],
          },
          {
            h2: "Third-party advertising cookies",
            body: [
              "Google and its partners may use cookies to serve ads based on your prior visits to this and other sites. You can opt out of personalised advertising through Google's Ads Settings, and out of many third-party vendor cookies through the Network Advertising Initiative and Your Online Choices opt-out pages.",
            ],
          },
          {
            h2: "Controlling cookies",
            body: [
              "Every major browser lets you view, block and delete cookies from its settings or privacy menu. Blocking all cookies will not break the generators on this site, since they run entirely locally, but it may reset your consent choice on each visit.",
            ],
          },
          {
            h2: "Consent",
            body: [
              `Where required by law, ${SITE.domain} requests consent before setting non-essential cookies, and you can change or withdraw that consent at any time through your browser settings.`,
            ],
          },
        ]}
      />
    </div>
  );
}
