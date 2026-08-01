CREATE OR REPLACE FUNCTION public.submit_trending(_name text, _styled text DEFAULT NULL, _category text DEFAULT 'community')
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  clean text := btrim(_name);
  cat text := lower(btrim(coalesce(_category, 'community')));
  existing uuid;
  new_id uuid;
BEGIN
  IF char_length(clean) < 1 OR char_length(clean) > 60 THEN
    RAISE EXCEPTION 'name must be 1-60 characters';
  END IF;
  IF cat !~ '^[a-z0-9-]{3,40}$' THEN
    cat := 'community';
  END IF;

  SELECT id INTO existing FROM public.trending_names WHERE name = clean LIMIT 1;
  IF existing IS NOT NULL THEN
    RETURN existing;
  END IF;

  INSERT INTO public.trending_names (name, styled, category, featured)
  VALUES (clean, nullif(btrim(coalesce(_styled, '')), ''), cat, false)
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_trending(text, text, text) TO anon, authenticated;