import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw, ShieldCheck, Copy, Check, Eye, EyeOff } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Layout";
import { JsonLd, Prose } from "@/components/site/Blocks";
import { FaqSection, faqJsonLd } from "@/components/site/Faq";
import { AdSlot } from "@/components/site/AdSlot";
import { RelatedGenerators, ExploreMore } from "@/components/site/LinkHub";
import { ExportBar } from "@/components/site/ExportBar";
import { buildHead, breadcrumbJsonLd, toolJsonLd } from "@/lib/seo";
import { track } from "@/lib/analytics";
import { useCopy } from "@/hooks/use-copy";
import {
  DEFAULT_OPTIONS,
  generatePassphrase,
  generatePassword,
  generatePin,
  strengthOf,
  breachCount,
  type PasswordOptions,
} from "@/lib/password";

const TOOL = "password-generator";

const FAQS = [
  {
    q: "How long should a password be in 2026?",
    a: "Sixteen characters is the practical floor and 20+ is better. Length adds far more resistance than swapping letters for symbols, because every extra character multiplies the number of guesses an attacker must make.",
  },
  {
    q: "Are these passwords generated on my device?",
    a: "Yes. Every password, passphrase and PIN is created in your browser with the Web Crypto API. Nothing is transmitted, logged or stored on our servers.",
  },
  {
    q: "How does the breach check work without sending my password?",
    a: "We hash your password locally, then send only the first five characters of that hash to the Have I Been Pwned range API. It returns a list of matching hash suffixes and the comparison happens in your browser, so the password itself never leaves your device.",
  },
  {
    q: "Password or passphrase — which is stronger?",
    a: "A four to six word random passphrase is typically as strong as a 16 character random password and far easier to type on a phone or console. Use passphrases where you must type by hand, random strings everywhere a password manager fills them in.",
  },
  {
    q: "What does crack time actually estimate?",
    a: "It assumes an offline attack at roughly 10 billion guesses per second against a fast-hashed leak — a realistic modern GPU rig. Online attacks against a well-built login are thousands of times slower, so treat this as the worst case.",
  },
  {
    q: "Should I reuse a strong password across sites?",
    a: "No. One breach then unlocks everything. Generate a unique password per account, store them in a password manager, and turn on two-factor authentication on anything that supports it.",
  },
];

const SECTIONS = [
  {
    h2: "A password generator built for how accounts actually get broken",
    body: [
      "Most accounts are not lost to clever hacking. They are lost to a password that was reused on a forum that got breached in 2019, or to a pattern a cracking rig guesses in under a second. This generator is designed against both failure modes: every value comes from a cryptographically secure random source, and the strength meter penalises the shortcuts humans reach for — repeated characters, keyboard runs, years, and dictionary words that appear in every wordlist.",
      "You can tune the character mix, drop look-alike characters so nothing gets mistyped when you read a password off a screen, and force at least one character from every class you enabled. The entropy figure updates as you type, so you can see exactly what each change buys you.",
    ],
  },
  {
    h2: "Passwords, passphrases and PINs — pick the right shape",
    body: [
      "Random character strings are ideal when a password manager does the typing. Passphrases win whenever a human types the secret: console logins, Wi-Fi keys, laptop unlocks and disk encryption. PINs exist for hardware and banking flows that only accept digits, and the honest advice there is to use the maximum length the system allows.",
      "Whichever shape you choose, uniqueness matters more than exotic symbols. A different 16 character password on every site beats one perfect password used twice.",
    ],
  },
  {
    h2: "How to store what you generate",
    body: [
      "Put every generated secret straight into a password manager and let it fill logins for you. Keep one strong, memorable passphrase as the master key and write it down somewhere physically safe until you have it memorised. Enable two-factor authentication on email first — email is the recovery route to everything else.",
      "Rotate a password when a service reports a breach or when the breach checker on this page reports a hit. Routine 90-day rotation on an otherwise strong, unique password mostly just pushes people toward weaker, patterned choices.",
    ],
  },
];

export const Route = createFileRoute("/password-generator")({
  head: () =>
    buildHead({
      path: "/password-generator",
      title: "Password Generator — Strong Random Passwords & Passphrases",
      description:
        "Generate strong random passwords, passphrases and PINs in your browser. Live entropy, crack-time estimates and a privacy-safe breach check. Free, no signup.",
      socialTitle: "Advanced password generator with entropy and breach check",
      socialDescription:
        "Cryptographically secure passwords, passphrases and PINs generated on your device — with live strength scoring.",
    }),
  component: Page,
});

type Mode = "password" | "passphrase" | "pin";

function Page() {
  const [mode, setMode] = useState<Mode>("password");
  const [opts, setOpts] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [phrase, setPhrase] = useState({
    words: 5,
    separator: "-",
    capitalize: true,
    addNumber: true,
    addSymbol: false,
  });
  const [pinLength, setPinLength] = useState(6);
  const [value, setValue] = useState("");
  const [batch, setBatch] = useState<string[]>([]);
  const [reveal, setReveal] = useState(true);
  const [breach, setBreach] = useState<number | null | "checking">(null);
  const { copy, copied } = useCopy();

  const make = useCallback(() => {
    if (mode === "password") return generatePassword(opts);
    if (mode === "passphrase") return generatePassphrase(phrase);
    return generatePin(pinLength);
  }, [mode, opts, phrase, pinLength]);

  const roll = useCallback(() => {
    setValue(make());
    setBatch(Array.from({ length: 5 }, () => make()));
    setBreach(null);
  }, [make]);

  useEffect(() => {
    roll();
  }, [roll]);

  const strength = useMemo(() => strengthOf(value), [value]);
  const meterColors = ["bg-destructive", "bg-destructive", "bg-amber-500", "bg-primary", "bg-primary"];

  const check = async () => {
    setBreach("checking");
    track("generate", TOOL, { action: "breach_check" });
    setBreach(await breachCount(value));
  };

  const field =
    "w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none ring-ring/40 focus:border-primary focus:ring-4";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            faqJsonLd(FAQS),
            breadcrumbJsonLd([{ name: "Password generator", path: "/password-generator" }]),
            toolJsonLd(
              "Password Generator",
              "Generate strong random passwords, passphrases and PINs with live entropy and crack-time scoring.",
              "/password-generator",
            ),
          ],
        }}
      />

      <Breadcrumbs items={[{ label: "Password generator" }]} />
      <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
        Advanced password generator
      </h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        Cryptographically secure passwords, passphrases and PINs generated entirely on your device.
        Watch the entropy and crack-time estimate change as you tune the recipe, then check the result
        against billions of leaked credentials without ever sending it anywhere.
      </p>

      <div className="surface-card mt-6 p-5">
        <div className="flex flex-wrap gap-2">
          {(["password", "passphrase", "pin"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                mode === m
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
          <output
            className={`min-w-0 truncate rounded-lg border border-border bg-background px-4 py-3 font-mono text-lg ${
              reveal ? "" : "blur-sm select-none"
            }`}
          >
            {value}
          </output>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => setReveal((r) => !r)}
              aria-label={reveal ? "Hide password" : "Show password"}
              className="rounded-lg border border-border p-2.5"
            >
              {reveal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => {
                copy(value);
                track("copy", TOOL, { value_length: value.length });
              }}
              className="rounded-lg border border-border p-2.5"
              aria-label="Copy password"
            >
              {copied === value ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => {
                roll();
                track("generate", TOOL, { mode });
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground"
            >
              <RefreshCw className="h-4 w-4" /> New
            </button>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <span className="font-semibold">
              {strength.label} · {strength.bits} bits of entropy
            </span>
            <span className="text-muted-foreground">Offline crack time: {strength.crackTime}</span>
          </div>
          <div className="mt-2 flex gap-1" role="img" aria-label={`Strength: ${strength.label}`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i <= strength.score ? meterColors[strength.score] : "bg-border"
                }`}
              />
            ))}
          </div>
          {strength.advice.length > 0 && (
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              {strength.advice.map((a) => (
                <li key={a}>• {a}</li>
              ))}
            </ul>
          )}
        </div>

        {mode === "password" && (
          <div className="mt-5 border-t border-border pt-4">
            <label htmlFor="len" className="block text-sm font-semibold">
              Length: {opts.length}
            </label>
            <input
              id="len"
              type="range"
              min={8}
              max={64}
              value={opts.length}
              onChange={(e) => setOpts({ ...opts, length: Number(e.target.value) })}
              className="mt-2 w-full accent-primary"
            />
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {(
                [
                  ["lower", "Lowercase a–z"],
                  ["upper", "Uppercase A–Z"],
                  ["digits", "Digits 0–9"],
                  ["symbols", "Symbols !@#$"],
                  ["excludeAmbiguous", "Exclude look-alikes (I l 1 O 0)"],
                  ["noRepeats", "No repeated neighbours"],
                  ["requireEachClass", "At least one of each type"],
                ] as [keyof PasswordOptions, string][]
              ).map(([key, label]) => (
                <label key={key} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(opts[key])}
                    onChange={(e) => setOpts({ ...opts, [key]: e.target.checked })}
                    className="h-4 w-4 accent-primary"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        )}

        {mode === "passphrase" && (
          <div className="mt-5 grid gap-4 border-t border-border pt-4 sm:grid-cols-2">
            <div>
              <label htmlFor="words" className="mb-1.5 block text-sm font-semibold">
                Words: {phrase.words}
              </label>
              <input
                id="words"
                type="range"
                min={3}
                max={10}
                value={phrase.words}
                onChange={(e) => setPhrase({ ...phrase, words: Number(e.target.value) })}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <label htmlFor="sep" className="mb-1.5 block text-sm font-semibold">
                Separator
              </label>
              <select
                id="sep"
                value={phrase.separator}
                onChange={(e) => setPhrase({ ...phrase, separator: e.target.value })}
                className={field}
              >
                {["-", ".", "_", " ", ""].map((s) => (
                  <option key={s} value={s}>
                    {s === "" ? "none" : s === " " ? "space" : s}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={phrase.capitalize}
                onChange={(e) => setPhrase({ ...phrase, capitalize: e.target.checked })}
                className="h-4 w-4 accent-primary"
              />
              Capitalise words
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={phrase.addNumber}
                onChange={(e) => setPhrase({ ...phrase, addNumber: e.target.checked })}
                className="h-4 w-4 accent-primary"
              />
              Append a number
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={phrase.addSymbol}
                onChange={(e) => setPhrase({ ...phrase, addSymbol: e.target.checked })}
                className="h-4 w-4 accent-primary"
              />
              Append a symbol
            </label>
          </div>
        )}

        {mode === "pin" && (
          <div className="mt-5 border-t border-border pt-4">
            <label htmlFor="pin" className="block text-sm font-semibold">
              Digits: {pinLength}
            </label>
            <input
              id="pin"
              type="range"
              min={3}
              max={12}
              value={pinLength}
              onChange={(e) => setPinLength(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={check}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold hover:border-primary"
          >
            <ShieldCheck className="h-4 w-4" />
            {breach === "checking" ? "Checking…" : "Check against breaches"}
          </button>
          {breach === 0 && <span className="text-sm text-primary">Not found in any known breach.</span>}
          {typeof breach === "number" && breach > 0 && (
            <span className="text-sm text-destructive">
              Seen {breach.toLocaleString()} times in breaches — generate a new one.
            </span>
          )}
          {breach === null && (
            <span className="text-xs text-muted-foreground">
              Only a partial hash is sent — never the password itself.
            </span>
          )}
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-2xl font-bold">Five more, ready to export</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {batch.map((b) => (
            <li key={b}>
              <button
                type="button"
                onClick={() => {
                  copy(b);
                  track("copy", TOOL, { value_length: b.length });
                }}
                className="hover-lift w-full truncate rounded-lg border border-border bg-background px-3 py-2.5 text-left font-mono text-sm"
              >
                {copied === b ? "Copied" : b}
              </button>
            </li>
          ))}
        </ul>
        <ExportBar
          className="mt-4"
          lines={[value, ...batch]}
          fileBase="secure-passwords"
          title="Generated passwords"
          tool={TOOL}
        />
      </section>

      <AdSlot slot="1111111111" />

      <div className="mt-10">
        <Prose sections={SECTIONS} />
      </div>

      <AdSlot slot="2222222222" />

      <FaqSection faqs={FAQS} />
      <RelatedGenerators
        slugs={["gamer-tags", "aesthetic-usernames", "cool-usernames"]}
        description="Pair a secure password with a handle people remember."
      />
      <ExploreMore />
    </div>
  );
}
