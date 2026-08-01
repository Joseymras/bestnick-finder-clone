ALTER TABLE public.tool_events DROP CONSTRAINT IF EXISTS tool_events_check;
ALTER TABLE public.tool_events DROP CONSTRAINT IF EXISTS "events public insert";
DROP POLICY IF EXISTS "events public insert" ON public.tool_events;
CREATE POLICY "events public insert" ON public.tool_events FOR INSERT TO public
WITH CHECK (
  tool ~ '^[a-z0-9-]{3,40}$'
  AND action = ANY (ARRAY['generate','copy','copy_bulk','download_txt','download_png','download_svg','share','select_all','search','view','vote'])
);