import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/site/Layout";
import { CopyCard } from "@/components/site/CopyCard";
import { JsonLd, Prose } from "@/components/site/Blocks";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AdSlot } from "@/components/site/AdSlot";
import { generatePassword } from "@/lib/names";
import { SITE } from "@/lib/content";

const FAQS = [
  {
    q: "Is this password generator safe?",
    a: "Yes. Passwords are generated in your browser using the Web Crypto API and are never transmitted, logged or stored anywhere.",
  },
  {
    q: "How long should a password be?",
    a: "At least 16 characters for important accounts. Length contributes far more to strength than special-character rules do.",
  },
  {
    q: "Should I reuse passwords?",
    a: "Never. One breach then compromises every account sharing that password. Use a password manager and a unique generated password per site.",
  },
  {
    q: "Are random passwords better than passphrases?",
    a: "Both work if they are long enough. Random strings are stronger per character; passphrases are easier to type on a phone or TV.",
  },
];

const SECTIONS = [
  {
    h2: "What makes a password strong",
    body: [
      "Strength comes from unpredictability multiplied by length. A 16-character random string drawn from a large character set is effectively impossible to brute force with current hardware, while a short password with a capital letter and an exclamation mark is not.",
      "Ambiguous characters such as l, I, 1, O and 0 are excluded here so you can read your password back accurately when typing it manually.",
    ],
  },
  {
    h2: "Storing passwords properly",
    body: [
      "Use a password manager. It is the only realistic way to keep a unique long password on every account. Protect it with one strong master password and turn on two-factor authentication on your most important accounts.",
    ],
  },
];

export const Route = createFileRoute("/password-generator")({
  head: () => ({
    meta: [
      { title: "Strong Password Generator — Free & Private | BestNickFinder" },
      {
        name: "description",
        content:
          "Generate strong random passwords in your browser. Adjustable length, uppercase, numbers and symbols. Nothing is sent or stored — completely private.",
      },
      { property: "og:title", content: "Strong Password Generator — Free & Private" },
      {
        property: "og:description",
        content: "Create secure random passwords locally in your browser.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/password-generator` }],
  }),
  component: Page,
});

function Page() {
  const [len, setLen] = useState(18);
  const [upper, setUpper] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [list, setList] = useState<string[]>([]);

  const roll = useCallback(() => {
    setList(Array.from({ length: 5 }, () => generatePassword(len, { upper, digits, symbols })));
  }, [len, upper, digits, symbols]);

  useEffect(() => {
    roll();
  }, [roll]);

  const toggles = [
    { label: "Uppercase", value: upper, set: setUpper },
    { label: "Numbers", value: digits, set: setDigits },
    { label: "Symbols", value: symbols, set: setSymbols },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd data={faqJsonLd(FAQS)} />
      <Breadcrumbs items={[{ label: "Tools", to: "/tools" }, { label: "Password Generator" }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Password Generator</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Generate strong random passwords using your browser's cryptographic random source. Nothing
        leaves your device.
      </p>

      <div className="surface-card mt-8 p-5">
        <label htmlFor="len" className="mb-1.5 block text-sm font-semibold">
          Length: {len}
        </label>
        <input
          id="len"
          type="range"
          min={8}
          max={48}
          value={len}
          onChange={(e) => setLen(Number(e.target.value))}
          className="w-full accent-[var(--color-primary)]"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {toggles.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => t.set(!t.value)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                t.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
          <button
            type="button"
            onClick={roll}
            className="ml-auto rounded-lg bg-primary px-5 py-2 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Regenerate
          </button>
        </div>
        <div className="mt-5 grid gap-2">
          {list.map((p) => (
            <CopyCard key={p} value={p} size="sm" />
          ))}
        </div>
      </div>

      <AdSlot slot="1111111111" />

      <div className="mt-8">
        <Prose sections={SECTIONS} />
      </div>

      <FaqSection faqs={FAQS} />
    </div>
  );
}
