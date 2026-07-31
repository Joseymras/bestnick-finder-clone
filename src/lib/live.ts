import { supabase } from "@/integrations/supabase/client";

export interface TrendingName {
  id: string;
  name: string;
  styled: string | null;
  category: string;
  votes_up: number;
  votes_down: number;
  featured: boolean;
}

export interface RecentNickname {
  id: string;
  name: string;
  tool: string;
  created_at: string;
}

export async function fetchTrending(limit = 12): Promise<TrendingName[]> {
  const { data } = await supabase
    .from("trending_names")
    .select("id,name,styled,category,votes_up,votes_down,featured")
    .order("votes_up", { ascending: false })
    .limit(limit);
  return (data as TrendingName[]) ?? [];
}

export async function fetchRecent(limit = 24): Promise<RecentNickname[]> {
  const { data } = await supabase
    .from("recent_nicknames")
    .select("id,name,tool,created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as RecentNickname[]) ?? [];
}

/** Adds a name to the public "recent nicknames" feed. Fire-and-forget. */
export async function pushRecent(name: string, tool: string) {
  const clean = name.trim().slice(0, 60);
  if (!clean) return;
  await supabase.from("recent_nicknames").insert({ name: clean, tool });
}

export async function fetchSettings(): Promise<Record<string, Record<string, unknown>>> {
  const { data } = await supabase.from("site_settings").select("key,value");
  const out: Record<string, Record<string, unknown>> = {};
  for (const row of data ?? []) out[row.key as string] = (row.value ?? {}) as Record<string, unknown>;
  return out;
}
