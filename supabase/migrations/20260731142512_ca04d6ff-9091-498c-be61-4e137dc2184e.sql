-- roles
CREATE TYPE public.app_role AS ENUM ('admin','moderator','user');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own profile write" ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "own roles read" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- signup handler: profile + bootstrap admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email,'@',1)))
  ON CONFLICT (id) DO NOTHING;

  IF lower(NEW.email) = 'joseymras88@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- trending names
CREATE TABLE public.trending_names (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  styled TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  votes_up INTEGER NOT NULL DEFAULT 0,
  votes_down INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.trending_names TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trending_names TO authenticated;
GRANT ALL ON public.trending_names TO service_role;
ALTER TABLE public.trending_names ENABLE ROW LEVEL SECURITY;
CREATE POLICY "trending public read" ON public.trending_names FOR SELECT USING (true);
CREATE POLICY "trending admin write" ON public.trending_names FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- recent nicknames feed
CREATE TABLE public.recent_nicknames (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 60),
  tool TEXT NOT NULL DEFAULT 'nickname-generator',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.recent_nicknames TO anon;
GRANT SELECT, INSERT, DELETE ON public.recent_nicknames TO authenticated;
GRANT ALL ON public.recent_nicknames TO service_role;
ALTER TABLE public.recent_nicknames ENABLE ROW LEVEL SECURITY;
CREATE POLICY "recent public read" ON public.recent_nicknames FOR SELECT USING (true);
CREATE POLICY "recent public insert" ON public.recent_nicknames FOR INSERT WITH CHECK (char_length(name) BETWEEN 1 AND 60);
CREATE POLICY "recent admin delete" ON public.recent_nicknames FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- anonymous usage counters
CREATE TABLE public.tool_events (
  id BIGSERIAL PRIMARY KEY,
  tool TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.tool_events TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.tool_events_id_seq TO anon, authenticated, service_role;
GRANT SELECT, INSERT ON public.tool_events TO authenticated;
GRANT ALL ON public.tool_events TO service_role;
ALTER TABLE public.tool_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events public insert" ON public.tool_events FOR INSERT WITH CHECK (true);
CREATE POLICY "events admin read" ON public.tool_events FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- site settings
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings public read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "settings admin write" ON public.site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

INSERT INTO public.site_settings (key, value) VALUES
  ('ads', '{"client":"","enabled":false}'::jsonb),
  ('analytics', '{"ga4":"","enabled":false}'::jsonb),
  ('announcement', '{"text":"","enabled":false}'::jsonb);

INSERT INTO public.trending_names (name, styled, category, votes_up, votes_down, featured) VALUES
  ('ShadowStrike','丂ﾄᗩＤ०Ｗ丂ㄒ尺ﻉ',  'freefire', 4821, 903, true),
  ('NinjaKing','ήɪɳʝαKɪɳɠ','freefire', 4410, 812, true),
  ('BrokenHeart','ʙʀᴏᴋᴇɴ ʜᴇᴀʀᴛ♡','aesthetic', 3980, 640, true),
  ('QueenBee','✿ QUEEN BEE ✿','aesthetic', 3520, 590, true),
  ('ProGamer','⚡ProGamer⚡','gamer', 3310, 505, false),
  ('LoneWolf','꧁LoneWolf꧂','gamer', 3105, 470, false),
  ('DarkAngel','☠DarkAngel☠','dark', 2870, 412, false),
  ('SoftAura','｡ﾟsoft auraﻭ｡','aesthetic', 2640, 380, false),
  ('CyberFox','ᑕYᗷᗴᖇᖴOX','tech', 2410, 340, false),
  ('MoonChild','☾ MoonChild ☽','aesthetic', 2180, 300, false),
  ('IronClan','【IronClan】','clan', 1990, 280, false),
  ('SniperX','▄︻SniperX══━一','gamer', 1840, 260, false);

INSERT INTO public.recent_nicknames (name, tool) VALUES
  ('Zerohyme','nickname-generator'),
  ('VelvetSky','nickname-generator'),
  ('Krystalize','username-generator'),
  ('꧁NoxBlade꧂','fancy-text-generator'),
  ('AuroraLuxe','nickname-generator'),
  ('PixelDrift','username-generator'),
  ('ᴍɪᴅɴɪɢʜᴛ','fancy-text-generator'),
  ('SolarFlarez','nickname-generator'),
  ('NebulaKid','nickname-generator'),
  ('EchoWave','username-generator'),
  ('★Vortex★','fancy-text-generator'),
  ('LunaMint','nickname-generator');