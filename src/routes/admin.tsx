import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Loader2, Star, Trash2, LogOut, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { SeoManager } from "@/components/site/SeoManager";
import { buildHead } from "@/lib/seo";
import { fetchRecent, fetchTrending, type RecentNickname, type TrendingName } from "@/lib/live";

export const Route = createFileRoute("/admin")({
  head: () =>
    buildHead({
      path: "/admin",
      title: "Admin dashboard — BestNickFinder",
      description: "Owner dashboard for BestNickFinder.online.",
      noindex: true,
    }),
  component: AdminPage,
});

interface EventRow {
  action: string;
  tool: string;
  count: number;
}

function AdminPage() {
  const { session, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  const [trending, setTrending] = useState<TrendingName[]>([]);
  const [recent, setRecent] = useState<RecentNickname[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [settings, setSettings] = useState({ adsenseClient: "", gaId: "", announcement: "" });
  const [newName, setNewName] = useState({ name: "", styled: "", category: "gamer" });
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !session) void navigate({ to: "/auth" });
  }, [loading, session, navigate]);

  const reload = useCallback(async () => {
    setTrending(await fetchTrending(50));
    setRecent(await fetchRecent(60));

    const { data: ev } = await supabase
      .from("tool_events")
      .select("action,tool")
      .order("created_at", { ascending: false })
      .limit(1000);
    const tally = new Map<string, EventRow>();
    for (const row of ev ?? []) {
      const key = `${row.tool}|${row.action}`;
      const found = tally.get(key);
      if (found) found.count += 1;
      else tally.set(key, { action: row.action, tool: row.tool, count: 1 });
    }
    setEvents([...tally.values()].sort((a, b) => b.count - a.count).slice(0, 25));

    const { data: st } = await supabase.from("site_settings").select("key,value");
    const map = Object.fromEntries((st ?? []).map((r) => [r.key, r.value])) as Record<
      string,
      Record<string, string> | null
    >;
    setSettings({
      adsenseClient: map.monetization?.adsenseClient ?? "",
      gaId: map.monetization?.gaId ?? "",
      announcement: map.announcement?.text ?? "",
    });
  }, []);

  useEffect(() => {
    if (isAdmin) void reload();
  }, [isAdmin, reload]);

  const flash = (msg: string) => {
    setStatus(msg);
    window.setTimeout(() => setStatus((s) => (s === msg ? null : s)), 2500);
  };

  const addTrending = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.name.trim()) return;
    setBusy(true);
    const { error } = await supabase.from("trending_names").insert({
      name: newName.name.trim(),
      styled: newName.styled.trim() || null,
      category: newName.category,
      featured: true,
    });
    setBusy(false);
    if (error) return flash(error.message);
    setNewName({ name: "", styled: "", category: newName.category });
    flash("Name added to popularity trends.");
    void reload();
  };

  const toggleFeatured = async (row: TrendingName) => {
    await supabase.from("trending_names").update({ featured: !row.featured }).eq("id", row.id);
    void reload();
  };

  const bump = async (row: TrendingName, by: number) => {
    await supabase
      .from("trending_names")
      .update({ votes_up: Math.max(0, row.votes_up + by) })
      .eq("id", row.id);
    void reload();
  };

  const removeTrending = async (id: string) => {
    await supabase.from("trending_names").delete().eq("id", id);
    void reload();
  };

  const removeRecent = async (id: string) => {
    await supabase.from("recent_nicknames").delete().eq("id", id);
    void reload();
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("site_settings").upsert(
      [
        {
          key: "monetization",
          value: { adsenseClient: settings.adsenseClient, gaId: settings.gaId },
        },
        { key: "announcement", value: { text: settings.announcement } },
      ],
      { onConflict: "key" },
    );
    setBusy(false);
    flash(error ? error.message : "Settings saved.");
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-extrabold">Admin access required</h1>
        <p className="mt-3 text-muted-foreground">
          This account isn&apos;t an owner of BestNickFinder.online. Sign in with the owner email to
          manage the site.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              void navigate({ to: "/auth" });
            }}
            className="rounded-lg border border-border px-4 py-2 font-semibold"
          >
            Switch account
          </button>
          <Link to="/" className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground">
            Back to tools
          </Link>
        </div>
      </div>
    );
  }

  const input =
    "w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none ring-ring/40 focus:border-primary focus:ring-4";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h1 className="truncate font-display text-3xl font-extrabold">Admin dashboard</h1>
          <p className="truncate text-sm text-muted-foreground">{session?.user.email}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => void reload()}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold"
          >
            <RefreshCw className="h-4 w-4" /> Refresh
          </button>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              void navigate({ to: "/" });
            }}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      {status && <p className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm">{status}</p>}

      <section className="surface-card mt-8 p-5">
        <h2 className="font-display text-xl font-bold">Popularity trends</h2>
        <form onSubmit={addTrending} className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto]">
          <input
            aria-label="Name"
            placeholder="Name"
            value={newName.name}
            onChange={(e) => setNewName({ ...newName, name: e.target.value })}
            className={input}
          />
          <input
            aria-label="Styled version"
            placeholder="Styled version (optional)"
            value={newName.styled}
            onChange={(e) => setNewName({ ...newName, styled: e.target.value })}
            className={input}
          />
          <select
            aria-label="Category"
            value={newName.category}
            onChange={(e) => setNewName({ ...newName, category: e.target.value })}
            className={input}
          >
            {["gamer", "aesthetic", "fantasy", "professional", "symbols"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground disabled:opacity-50"
          >
            Add
          </button>
        </form>

        <ul className="mt-5 divide-y divide-border">
          {trending.map((r) => (
            <li key={r.id} className="flex items-center gap-3 py-2.5">
              <span className="min-w-0 flex-1 truncate">
                <span className="font-medium">{r.styled || r.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">{r.category}</span>
              </span>
              <span className="shrink-0 text-xs text-muted-foreground">▲ {r.votes_up}</span>
              <button type="button" onClick={() => bump(r, 10)} className="shrink-0 text-xs font-semibold text-primary">
                +10
              </button>
              <button type="button" onClick={() => bump(r, -10)} className="shrink-0 text-xs text-muted-foreground">
                −10
              </button>
              <button
                type="button"
                onClick={() => toggleFeatured(r)}
                aria-label="Toggle featured"
                className="shrink-0"
              >
                <Star className={`h-4 w-4 ${r.featured ? "fill-primary text-primary" : "text-muted-foreground"}`} />
              </button>
              <button
                type="button"
                onClick={() => removeTrending(r.id)}
                aria-label={`Delete ${r.name}`}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="surface-card mt-6 p-5">
        <h2 className="font-display text-xl font-bold">Recent nicknames feed</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Moderate the public feed — remove anything you don&apos;t want on the homepage.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {recent.map((r) => (
            <li
              key={r.id}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm"
            >
              {r.name}
              <button
                type="button"
                onClick={() => removeRecent(r.id)}
                aria-label={`Remove ${r.name}`}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
          {!recent.length && <li className="text-sm text-muted-foreground">No entries yet.</li>}
        </ul>
      </section>

      <section className="surface-card mt-6 p-5">
        <h2 className="font-display text-xl font-bold">Tool engagement (last 1,000 events)</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="py-2">Tool</th>
                <th className="py-2">Action</th>
                <th className="py-2 text-right">Events</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.map((e) => (
                <tr key={`${e.tool}-${e.action}`}>
                  <td className="py-2 font-medium">{e.tool}</td>
                  <td className="py-2">{e.action}</td>
                  <td className="py-2 text-right">{e.count}</td>
                </tr>
              ))}
              {!events.length && (
                <tr>
                  <td colSpan={3} className="py-3 text-muted-foreground">
                    No events recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <SeoManager onFlash={flash} />

      <section className="surface-card mt-6 p-5">
        <h2 className="font-display text-xl font-bold">Monetization &amp; site settings</h2>
        <form onSubmit={saveSettings} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="adsense" className="mb-1.5 block text-sm font-semibold">
              AdSense publisher ID
            </label>
            <input
              id="adsense"
              placeholder="ca-pub-XXXXXXXXXXXXXXXX"
              value={settings.adsenseClient}
              onChange={(e) => setSettings({ ...settings, adsenseClient: e.target.value })}
              className={input}
            />
          </div>
          <div>
            <label htmlFor="ga" className="mb-1.5 block text-sm font-semibold">
              GA4 measurement ID
            </label>
            <input
              id="ga"
              placeholder="G-XXXXXXXXXX"
              value={settings.gaId}
              onChange={(e) => setSettings({ ...settings, gaId: e.target.value })}
              className={input}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="announcement" className="mb-1.5 block text-sm font-semibold">
              Site announcement (shown nowhere until you use it)
            </label>
            <input
              id="announcement"
              value={settings.announcement}
              onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
              className={input}
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground disabled:opacity-50"
            >
              Save settings
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
