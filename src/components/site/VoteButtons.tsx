import { useEffect, useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { voteNickname, type VoteDirection } from "@/lib/live";
import { track } from "@/lib/analytics";
import { useUiLang } from "@/lib/ui-lang";

/**
 * Up/down vote control for a nickname. One vote per browser per name; clicking
 * the active side removes the vote, clicking the other side switches it.
 */
export function VoteButtons({
  nicknameId,
  up,
  down,
  myVote,
  tool = "popularity-trends",
  size = "md",
}: {
  nicknameId: string;
  up: number;
  down: number;
  myVote?: VoteDirection;
  tool?: string;
  size?: "sm" | "md";
}) {
  const { t } = useUiLang();
  const [tally, setTally] = useState({ up, down });
  const [mine, setMine] = useState<VoteDirection | undefined>(myVote);
  const [busy, setBusy] = useState(false);

  useEffect(() => setTally({ up, down }), [up, down]);
  useEffect(() => setMine(myVote), [myVote]);

  const cast = async (direction: VoteDirection) => {
    if (busy) return;
    setBusy(true);
    const next = await voteNickname(nicknameId, direction);
    setBusy(false);
    if (!next) return;
    setTally({ up: next.votes_up, down: next.votes_down });
    setMine((prev) => (prev === direction ? undefined : direction));
    track("vote", tool, { direction });
  };

  const pad = size === "sm" ? "px-1.5 py-1 text-[11px]" : "px-2 py-1.5 text-xs";
  const icon = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        onClick={() => void cast(1)}
        aria-label={t.upvote}
        aria-pressed={mine === 1}
        className={`inline-flex items-center gap-1 rounded-md border font-semibold transition-colors ${pad} ${
          mine === 1
            ? "border-primary bg-primary/10 text-primary"
            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
        }`}
      >
        <ThumbsUp className={icon} /> {tally.up}
      </button>
      <button
        type="button"
        onClick={() => void cast(-1)}
        aria-label={t.downvote}
        aria-pressed={mine === -1}
        className={`inline-flex items-center gap-1 rounded-md border font-semibold transition-colors ${pad} ${
          mine === -1
            ? "border-destructive bg-destructive/10 text-destructive"
            : "border-border text-muted-foreground hover:border-destructive hover:text-destructive"
        }`}
      >
        <ThumbsDown className={icon} /> {tally.down}
      </button>
    </div>
  );
}
