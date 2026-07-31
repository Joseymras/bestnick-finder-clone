REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;

DROP POLICY "recent public insert" ON public.recent_nicknames;
CREATE POLICY "recent public insert" ON public.recent_nicknames FOR INSERT
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 60
    AND char_length(tool) BETWEEN 3 AND 40
    AND tool ~ '^[a-z0-9-]+$'
  );

DROP POLICY "events public insert" ON public.tool_events;
CREATE POLICY "events public insert" ON public.tool_events FOR INSERT
  WITH CHECK (
    tool ~ '^[a-z0-9-]{3,40}$'
    AND action IN ('generate','copy','copy_bulk','download_txt','download_png','download_svg','share','select_all','search','view')
  );