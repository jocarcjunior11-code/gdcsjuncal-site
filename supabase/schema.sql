-- ═══════════════════════════════════════════════════════════════
-- SCHEMA — Grupo Desportivo Centro Social do Juncal
-- ═══════════════════════════════════════════════════════════════
-- Cola este ficheiro inteiro no SQL Editor do Supabase e executa.
-- Cria todas as tabelas necessárias e configura as permissões.
-- ═══════════════════════════════════════════════════════════════

-- Limpeza inicial (executa só na primeira vez ou se quiseres recomeçar)
DROP TABLE IF EXISTS public.media CASCADE;
DROP TABLE IF EXISTS public.match_games CASCADE;
DROP TABLE IF EXISTS public.match_results CASCADE;
DROP TABLE IF EXISTS public.matches CASCADE;
DROP TABLE IF EXISTS public.competition_standings CASCADE;
DROP TABLE IF EXISTS public.competitions CASCADE;
DROP TABLE IF EXISTS public.players CASCADE;
DROP TABLE IF EXISTS public.teams CASCADE;
DROP TABLE IF EXISTS public.clubs CASCADE;
DROP TABLE IF EXISTS public.news CASCADE;
DROP TABLE IF EXISTS public.gym_trainers CASCADE;
DROP TABLE IF EXISTS public.gym_plans CASCADE;
DROP TABLE IF EXISTS public.gym_classes CASCADE;
DROP TABLE IF EXISTS public.gym_inscriptions CASCADE;
DROP TABLE IF EXISTS public.tt_inscriptions CASCADE;

-- ───────────────────────────────────────────────
-- 1. CLUBES
-- ───────────────────────────────────────────────
CREATE TABLE public.clubs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  short_name   TEXT NOT NULL,
  logo_url     TEXT,
  city         TEXT,
  founded_year INT,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────
-- 2. COMPETIÇÕES
-- ───────────────────────────────────────────────
CREATE TABLE public.competitions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,                 -- ex: "Divisão de Honra"
  slug         TEXT UNIQUE NOT NULL,          -- ex: "divisao-honra-masculino"
  gender       TEXT NOT NULL CHECK (gender IN ('masculino','feminino','misto')),
  age_group    TEXT NOT NULL,                 -- ex: "senior", "sub_15"
  season       TEXT NOT NULL,                 -- ex: "2025/2026"
  description  TEXT,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────
-- 3. EQUIPAS
-- ───────────────────────────────────────────────
CREATE TABLE public.teams (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id         UUID REFERENCES public.clubs(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  gender          TEXT NOT NULL CHECK (gender IN ('masculino','feminino','misto')),
  age_group       TEXT NOT NULL,
  coach_name      TEXT,
  competition_id  UUID REFERENCES public.competitions(id) ON DELETE SET NULL,
  description     TEXT,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────
-- 4. JOGADORES
-- ───────────────────────────────────────────────
CREATE TABLE public.players (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id     UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  birth_date  DATE,
  position    TEXT,
  number      INT,
  photo_url   TEXT,
  bio         TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────
-- 5. CLASSIFICAÇÕES
-- ───────────────────────────────────────────────
CREATE TABLE public.competition_standings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id  UUID REFERENCES public.competitions(id) ON DELETE CASCADE,
  team_name       TEXT NOT NULL,
  position        INT NOT NULL,
  played          INT DEFAULT 0,
  wins            INT DEFAULT 0,
  draws           INT DEFAULT 0,
  losses          INT DEFAULT 0,
  points          INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────
-- 6. JOGOS (núcleo do sistema)
-- ───────────────────────────────────────────────
CREATE TABLE public.matches (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id  UUID REFERENCES public.competitions(id) ON DELETE CASCADE,
  home_team       TEXT NOT NULL,
  away_team       TEXT NOT NULL,
  home_team_id    UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  away_team_id    UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  match_date      TIMESTAMPTZ NOT NULL,
  location        TEXT,
  round_number    INT,
  status          TEXT NOT NULL DEFAULT 'agendado'
                  CHECK (status IN ('agendado','em_curso','terminado','adiado')),
  summary         TEXT,                         -- reflexão institucional editável
  is_home         BOOLEAN DEFAULT TRUE,         -- true se o GD Juncal joga em casa
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────
-- 7. RESULTADO FINAL DO JOGO
-- ───────────────────────────────────────────────
CREATE TABLE public.match_results (
  match_id    UUID PRIMARY KEY REFERENCES public.matches(id) ON DELETE CASCADE,
  home_score  INT NOT NULL DEFAULT 0,
  away_score  INT NOT NULL DEFAULT 0,
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────
-- 8. ENCONTROS INDIVIDUAIS DO JOGO (cada partida 1v1)
-- ───────────────────────────────────────────────
CREATE TABLE public.match_games (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id        UUID REFERENCES public.matches(id) ON DELETE CASCADE,
  game_order      INT NOT NULL,
  home_player     TEXT NOT NULL,
  away_player     TEXT NOT NULL,
  sets            JSONB NOT NULL DEFAULT '[]'::jsonb,
                  -- formato: [{"home":11,"away":7},{"home":8,"away":11}, ...]
  home_sets_won   INT NOT NULL DEFAULT 0,
  away_sets_won   INT NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────
-- 9. NOTÍCIAS
-- ───────────────────────────────────────────────
CREATE TABLE public.news (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title             TEXT NOT NULL,
  slug              TEXT UNIQUE NOT NULL,
  excerpt           TEXT,
  content           TEXT NOT NULL,
  cover_image_url   TEXT,
  category          TEXT,
  author            TEXT,
  published_at      TIMESTAMPTZ DEFAULT now(),
  is_featured       BOOLEAN DEFAULT FALSE,
  created_at        TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────
-- 10. MEDIA (fotos e vídeos)
-- ───────────────────────────────────────────────
CREATE TABLE public.media (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type            TEXT NOT NULL CHECK (type IN ('photo','video')),
  url             TEXT NOT NULL,
  thumbnail_url   TEXT,
  caption         TEXT,
  match_id        UUID REFERENCES public.matches(id) ON DELETE SET NULL,
  category        TEXT,
  uploaded_at     TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────
-- 11. GINÁSIO
-- ───────────────────────────────────────────────
CREATE TABLE public.gym_trainers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   TEXT NOT NULL,
  speciality  TEXT NOT NULL,
  bio         TEXT,
  photo_url   TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.gym_plans (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  description     TEXT,
  monthly_price   NUMERIC(8,2) NOT NULL,
  highlights      TEXT[] DEFAULT '{}',
  is_featured     BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.gym_classes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  weekday       TEXT NOT NULL,
  start_time    TIME NOT NULL,
  duration_min  INT NOT NULL DEFAULT 60,
  trainer_name  TEXT,
  level         TEXT DEFAULT 'todos',
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────
-- 12. INSCRIÇÕES (formulários do site)
-- ───────────────────────────────────────────────
CREATE TABLE public.gym_inscriptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  plan            TEXT,
  message         TEXT,
  contacted       BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.tt_inscriptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT NOT NULL,
  birth_date      DATE,
  email           TEXT,
  phone           TEXT NOT NULL,
  guardian_name   TEXT,
  experience      TEXT,
  message         TEXT,
  contacted       BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (segurança das tabelas)
-- ═══════════════════════════════════════════════════════════════
-- Por defeito: qualquer pessoa pode LER (o site é público).
-- Só utilizadores autenticados podem ESCREVER (admin).
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE public.clubs                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competition_standings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_results          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_games            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_trainers           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_plans              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_classes            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gym_inscriptions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tt_inscriptions        ENABLE ROW LEVEL SECURITY;

-- Função auxiliar: aplicar políticas de leitura pública e escrita autenticada
DO $$
DECLARE
  t TEXT;
  public_read_tables TEXT[] := ARRAY[
    'clubs','competitions','teams','players','competition_standings',
    'matches','match_results','match_games','news','media',
    'gym_trainers','gym_plans','gym_classes'
  ];
BEGIN
  FOREACH t IN ARRAY public_read_tables LOOP
    EXECUTE format('CREATE POLICY "%s_public_read" ON public.%I FOR SELECT USING (true);', t, t);
    EXECUTE format('CREATE POLICY "%s_auth_write" ON public.%I FOR ALL USING (auth.role() = ''authenticated'') WITH CHECK (auth.role() = ''authenticated'');', t, t);
  END LOOP;
END$$;

-- Inscrições: qualquer pessoa pode submeter, só admin pode ler
CREATE POLICY "gym_inscriptions_insert" ON public.gym_inscriptions
  FOR INSERT WITH CHECK (true);
CREATE POLICY "gym_inscriptions_admin_read" ON public.gym_inscriptions
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "gym_inscriptions_admin_update" ON public.gym_inscriptions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "tt_inscriptions_insert" ON public.tt_inscriptions
  FOR INSERT WITH CHECK (true);
CREATE POLICY "tt_inscriptions_admin_read" ON public.tt_inscriptions
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "tt_inscriptions_admin_update" ON public.tt_inscriptions
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ═══════════════════════════════════════════════════════════════
-- ÍNDICES (para o site ser rápido)
-- ═══════════════════════════════════════════════════════════════
CREATE INDEX idx_matches_date          ON public.matches(match_date);
CREATE INDEX idx_matches_competition   ON public.matches(competition_id);
CREATE INDEX idx_matches_status        ON public.matches(status);
CREATE INDEX idx_news_published        ON public.news(published_at DESC);
CREATE INDEX idx_news_featured         ON public.news(is_featured);
CREATE INDEX idx_media_match           ON public.media(match_id);
CREATE INDEX idx_players_team          ON public.players(team_id);
CREATE INDEX idx_standings_competition ON public.competition_standings(competition_id, position);
