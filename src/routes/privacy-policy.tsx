import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Layout";
import { Prose } from "@/components/site/Blocks";
import { SITE } from "@/lib/content";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | BestNickFinder" },
      {
        name: "description",
        content:
          "How BestNickFinder handles data: what we collect, how advertising cookies work, and the choices available to you.",
      },
      { property: "og:title", content: "Privacy Policy | BestNickFinder" },
      { property: "og:description", content: "Our data, cookie and advertising practices." },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/privacy-policy` }],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <h1 className="font-display text-3xl font-extrabold">Privacy Policy</h1>
      <p className="mt-2 text-xs text-muted-foreground">Last updated: 1 July 2026</p>
      <Prose
        sections={[
          {
            h2: "Who we are",
            body: [
              `${SITE.name} operates ${SITE.domain}, a free collection of name and text generators. This policy explains what information is handled when you use the site and why.`,
            ],
          },
          {
            h2: "Information you enter",
            body: [
              "Names, words and passwords you type into the generators are processed entirely in your browser. They are never transmitted to our servers, never logged and never stored. Closing the tab removes them completely.",
            ],
          },
          {
            h2: "Information collected automatically",
            body: [
              "Like most websites, our hosting provider records standard server logs, which may include your IP address, browser type, referring page and the time of your request. These logs are used for security and to diagnose faults.",
              "We use Google Analytics to understand aggregate traffic patterns. Analytics data is collected in a pseudonymised form and is not used to identify individuals.",
            ],
          },
          {
            h2: "Cookies and advertising",
            body: [
              "We show advertising served by Google AdSense. Google and its partners may use cookies or similar technologies to serve ads based on your prior visits to this and other websites.",
              "Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the internet. You may opt out of personalised advertising by visiting Google's Ads Settings, and you can opt out of third-party vendor cookie use through the Network Advertising Initiative opt-out page.",
              "Where required by law, a consent banner is shown before non-essential cookies are set, and you may withdraw consent at any time.",
            ],
          },
          {
            h2: "Your rights",
            body: [
              "Depending on where you live, you may have the right to access, correct, delete or restrict processing of personal data relating to you, and to object to processing or lodge a complaint with a supervisory authority. Because we do not maintain user accounts, we typically hold no data that can identify you directly. Contact us if you have a request.",
            ],
          },
          {
            h2: "Children",
            body: [
              "This site is not directed at children under 13, and we do not knowingly collect personal information from them.",
            ],
          },
          {
            h2: "Changes and contact",
            body: [
              "We may update this policy from time to time; the date at the top reflects the latest revision. Questions can be sent through our contact page.",
            ],
          },
        ]}
      />
    </div>
  );
}
