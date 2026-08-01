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

/* ------------------------------------------------------------------ *
 * Voting
 * ------------------------------------------------------------------ */

const VOTER_KEY_STORAGE = "bnf_voter_key";

/** Stable anonymous voter key kept in localStorage (never a real identity). */
export function getVoterKey(): string {
  if (typeof window === "undefined") return "";
  let key = window.localStorage.getItem(VOTER_KEY_STORAGE);
  if (!key) {
    key = crypto.randomUUID().replace(/-/g, "").slice(0, 32);
    window.localStorage.setItem(VOTER_KEY_STORAGE, key);
  }
  return key;
}

export type VoteDirection = 1 | -1;

/** Casts (or toggles) a vote. Returns the fresh tallies from the database. */
export async function voteNickname(nicknameId: string, direction: VoteDirection) {
  const voterKey = getVoterKey();
  if (!voterKey) return null;
  const { data, error } = await supabase.rpc("vote_nickname", {
    _nickname_id: nicknameId,
    _direction: direction,
    _voter_key: voterKey,
  });
  if (error) return null;
  const row = Array.isArray(data) ? data[0] : data;
  return (row as { votes_up: number; votes_down: number } | undefined) ?? null;
}

/** The current visitor's existing votes, keyed by nickname id. */
export async function fetchMyVotes(): Promise<Record<string, VoteDirection>> {
  const voterKey = getVoterKey();
  if (!voterKey) return {};
  const { data } = await supabase
    .from("nickname_votes")
    .select("nickname_id,direction")
    .eq("voter_key", voterKey);
  const out: Record<string, VoteDirection> = {};
  for (const row of data ?? []) out[row.nickname_id as string] = row.direction as VoteDirection;
  return out;
}

/** Ensures a name exists in trending_names so it can be voted on, returns its id. */
export async function ensureTrending(name: string, category = "community", styled?: string) {
  const clean = name.trim().slice(0, 60);
  if (!clean) return null;
  const { data: found } = await supabase
    .from("trending_names")
    .select("id")
    .eq("name", clean)
    .maybeSingle();
  if (found) return found.id as string;
  const { data } = await supabase
    .from("trending_names")
    .insert({ name: clean, category, styled: styled ?? null })
    .select("id")
    .maybeSingle();
  return (data?.id as string | undefined) ?? null;
}
