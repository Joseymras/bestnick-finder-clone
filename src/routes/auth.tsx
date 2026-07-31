import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/auth")({
  head: () =>
    buildHead({
      path: "/auth",
      title: "Sign in — BestNickFinder admin",
      description:
        "Sign in to the BestNickFinder.online admin area to manage trending names, feeds and site settings.",
      noindex: true,
    }),
  component: AuthPage,
});

function AuthPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (session) void navigate({ to: "/admin" });
  }, [session, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    const fn =
      mode === "signin"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    const { error } = await fn;
    setBusy(false);
    if (error) setMessage(error.message);
    else if (mode === "signup") setMessage("Account created. You can sign in now.");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-3xl font-extrabold">Admin sign in</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This area is for site owners. Visitors don&apos;t need an account to use any tool.
      </p>

      <form onSubmit={submit} className="surface-card mt-6 space-y-4 p-5">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none ring-ring/40 focus:border-primary focus:ring-4"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none ring-ring/40 focus:border-primary focus:ring-4"
          />
        </div>

        {message && <p className="text-sm text-primary">{message}</p>}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setMessage(null);
          }}
          className="w-full text-sm text-muted-foreground hover:underline"
        >
          {mode === "signin" ? "Need to create the owner account?" : "Already have an account? Sign in"}
        </button>
      </form>

      <Link to="/" className="mt-6 inline-block text-sm font-semibold text-primary hover:underline">
        ← Back to the tools
      </Link>
    </div>
  );
}
