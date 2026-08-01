-- Votes on trending names (anonymous-friendly, deduped per browser fingerprint)
CREATE TABLE public.nickname_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname_id uuid NOT NULL REFERENCES public.trending_names(id) ON DELETE CASCADE,
  voter_key text NOT NULL,
  direction smallint NOT NULL CHECK (direction IN (-1, 1)),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (nickname_id, voter_key)
);

GRANT SELECT ON public.nickname_votes TO anon;
GRANT SELECT ON public.nickname_votes TO authenticated;
GRANT ALL ON public.nickname_votes TO service_role;
ALTER TABLE public.nickname_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "votes public read" ON public.nickname_votes FOR SELECT USING (true);
CREATE POLICY "votes admin manage" ON public.nickname_votes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Voting happens only through this function so tallies stay consistent.
CREATE OR REPLACE FUNCTION public.vote_nickname(_nickname_id uuid, _direction smallint, _voter_key text)
RETURNS TABLE (votes_up integer, votes_down integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  prev smallint;
BEGIN
  IF _direction NOT IN (-1, 1) THEN
    RAISE EXCEPTION 'direction must be -1 or 1';
  END IF;
  IF char_length(coalesce(_voter_key, '')) < 8 OR char_length(_voter_key) > 64 THEN
    RAISE EXCEPTION 'invalid voter key';
  END IF;

  SELECT v.direction INTO prev FROM public.nickname_votes v
    WHERE v.nickname_id = _nickname_id AND v.voter_key = _voter_key;

  IF prev IS NULL THEN
    INSERT INTO public.nickname_votes (nickname_id, voter_key, direction)
      VALUES (_nickname_id, _voter_key, _direction);
    IF _direction = 1 THEN
      UPDATE public.trending_names SET votes_up = votes_up + 1 WHERE id = _nickname_id;
    ELSE
      UPDATE public.trending_names SET votes_down = votes_down + 1 WHERE id = _nickname_id;
    END IF;
  ELSIF prev = _direction THEN
    DELETE FROM public.nickname_votes WHERE nickname_id = _nickname_id AND voter_key = _voter_key;
    IF _direction = 1 THEN
      UPDATE public.trending_names SET votes_up = greatest(0, votes_up - 1) WHERE id = _nickname_id;
    ELSE
      UPDATE public.trending_names SET votes_down = greatest(0, votes_down - 1) WHERE id = _nickname_id;
    END IF;
  ELSE
    UPDATE public.nickname_votes SET direction = _direction
      WHERE nickname_id = _nickname_id AND voter_key = _voter_key;
    IF _direction = 1 THEN
      UPDATE public.trending_names
        SET votes_up = votes_up + 1, votes_down = greatest(0, votes_down - 1)
        WHERE id = _nickname_id;
    ELSE
      UPDATE public.trending_names
        SET votes_down = votes_down + 1, votes_up = greatest(0, votes_up - 1)
        WHERE id = _nickname_id;
    END IF;
  END IF;

  RETURN QUERY SELECT t.votes_up, t.votes_down FROM public.trending_names t WHERE t.id = _nickname_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.vote_nickname(uuid, smallint, text) TO anon, authenticated;

-- Per-page SEO overrides the owner can publish without a redeploy
CREATE TABLE public.seo_overrides (
  path text PRIMARY KEY,
  title text,
  description text,
  canonical text,
  og_title text,
  og_description text,
  og_image text,
  twitter_title text,
  twitter_description text,
  jsonld jsonb,
  noindex boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.seo_overrides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_overrides TO authenticated;
GRANT ALL ON public.seo_overrides TO service_role;
ALTER TABLE public.seo_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "seo public read" ON public.seo_overrides FOR SELECT USING (true);
CREATE POLICY "seo admin write" ON public.seo_overrides FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));