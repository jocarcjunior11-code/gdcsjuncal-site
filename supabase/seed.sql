-- ═══════════════════════════════════════════════════════════════
-- SEED — dados de exemplo do GD Centro Social do Juncal
-- ═══════════════════════════════════════════════════════════════
-- Executa DEPOIS do schema.sql. Apaga e recria os dados iniciais.
-- Os nomes dos jogadores e adversários são exemplos —
-- substitui pelos reais a partir do admin do site.
-- ═══════════════════════════════════════════════════════════════

-- Limpeza
TRUNCATE TABLE
  public.media, public.match_games, public.match_results, public.matches,
  public.competition_standings, public.players, public.teams,
  public.competitions, public.clubs, public.news,
  public.gym_classes, public.gym_plans, public.gym_trainers
RESTART IDENTITY CASCADE;

-- ───────────────────────────────────────────────
-- CLUBE
-- ───────────────────────────────────────────────
INSERT INTO public.clubs (id, name, short_name, city, founded_year)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Grupo Desportivo Centro Social do Juncal',
  'GD Juncal',
  'Juncal, Porto de Mós',
  1985
);

-- ───────────────────────────────────────────────
-- COMPETIÇÕES
-- ───────────────────────────────────────────────
INSERT INTO public.competitions (id, name, slug, gender, age_group, season, description) VALUES
  ('22222222-aaaa-aaaa-aaaa-000000000001', 'Divisão de Honra', 'divisao-honra-masculino', 'masculino', 'senior', '2025/2026', 'Principal competição masculina de ténis de mesa em Portugal.'),
  ('22222222-aaaa-aaaa-aaaa-000000000002', '1ª Divisão Nacional', '1a-divisao-nacional-feminino', 'feminino', 'senior', '2025/2026', 'Principal competição feminina nacional de seniores.'),
  ('22222222-aaaa-aaaa-aaaa-000000000003', 'Campeonato Distrital Sub-15', 'distrital-sub15', 'misto', 'sub_15', '2025/2026', 'Campeonato distrital de formação.');

-- ───────────────────────────────────────────────
-- EQUIPAS
-- ───────────────────────────────────────────────
INSERT INTO public.teams (id, club_id, name, gender, age_group, coach_name, competition_id, description) VALUES
  ('33333333-aaaa-aaaa-aaaa-000000000001', '11111111-1111-1111-1111-111111111111', 'Seniores Masculinos', 'masculino', 'senior', 'João Marques', '22222222-aaaa-aaaa-aaaa-000000000001', 'Equipa principal masculina, presente na Divisão de Honra.'),
  ('33333333-aaaa-aaaa-aaaa-000000000002', '11111111-1111-1111-1111-111111111111', 'Seniores Femininos', 'feminino', 'senior', 'Sara Almeida', '22222222-aaaa-aaaa-aaaa-000000000002', 'Equipa principal feminina, presente na 1ª Divisão Nacional.'),
  ('33333333-aaaa-aaaa-aaaa-000000000003', '11111111-1111-1111-1111-111111111111', 'Formação Sub-19', 'misto', 'sub_19', 'Pedro Costa', NULL, 'Atletas em transição para os seniores.'),
  ('33333333-aaaa-aaaa-aaaa-000000000004', '11111111-1111-1111-1111-111111111111', 'Formação Sub-15', 'misto', 'sub_15', 'Rui Ferreira', '22222222-aaaa-aaaa-aaaa-000000000003', 'Formação competitiva distrital.'),
  ('33333333-aaaa-aaaa-aaaa-000000000005', '11111111-1111-1111-1111-111111111111', 'Escolinha Sub-9', 'misto', 'sub_9', 'Inês Lopes', NULL, 'Primeira aprendizagem técnica e divertida do ténis de mesa.');

-- ───────────────────────────────────────────────
-- JOGADORES (exemplos — substituir por nomes reais)
-- ───────────────────────────────────────────────
INSERT INTO public.players (team_id, full_name, position, number, bio) VALUES
  ('33333333-aaaa-aaaa-aaaa-000000000001', 'Miguel Pereira', 'Defensor', 1, 'Atleta sénior, estilo defensivo, 8 anos no clube.'),
  ('33333333-aaaa-aaaa-aaaa-000000000001', 'André Sousa', 'Atacante', 2, 'Atleta agressivo, especialista em forehand topspin.'),
  ('33333333-aaaa-aaaa-aaaa-000000000001', 'Tiago Reis', 'All-round', 3, 'Joga há 12 anos, com várias presenças em finais distritais.'),
  ('33333333-aaaa-aaaa-aaaa-000000000001', 'Bruno Martins', 'Atacante', 4, 'Recém-promovido dos sub-19, ataque rápido e curto.'),
  ('33333333-aaaa-aaaa-aaaa-000000000002', 'Maria Antunes', 'All-round', 1, 'Capitã da equipa feminina, vasta experiência nacional.'),
  ('33333333-aaaa-aaaa-aaaa-000000000002', 'Carolina Dias', 'Atacante', 2, 'Atleta jovem com forte top spin de direita.'),
  ('33333333-aaaa-aaaa-aaaa-000000000002', 'Beatriz Lopes', 'Defensora', 3, 'Estilo defensivo clássico, paciente e resiliente.'),
  ('33333333-aaaa-aaaa-aaaa-000000000003', 'Diogo Nunes', 'Atacante', 1, 'Promessa da formação. Treina 5 vezes por semana.'),
  ('33333333-aaaa-aaaa-aaaa-000000000003', 'Rafael Pinto', 'All-round', 2, 'Estilo equilibrado, finalista distrital sub-17.'),
  ('33333333-aaaa-aaaa-aaaa-000000000004', 'Leonor Vieira', 'Atacante', 1, 'Campeã distrital sub-13 em 2024/2025.'),
  ('33333333-aaaa-aaaa-aaaa-000000000004', 'Gonçalo Santos', 'Defensor', 2, 'Joga há 4 anos, especialista em chop.');

-- ───────────────────────────────────────────────
-- CLASSIFICAÇÕES
-- ───────────────────────────────────────────────
INSERT INTO public.competition_standings (competition_id, team_name, position, played, wins, draws, losses, points) VALUES
  ('22222222-aaaa-aaaa-aaaa-000000000001', 'Sporting CP', 1, 10, 9, 0, 1, 27),
  ('22222222-aaaa-aaaa-aaaa-000000000001', 'SL Benfica', 2, 10, 8, 1, 1, 25),
  ('22222222-aaaa-aaaa-aaaa-000000000001', 'GD Juncal', 3, 10, 7, 1, 2, 22),
  ('22222222-aaaa-aaaa-aaaa-000000000001', 'Ala Nun''Álvares', 4, 10, 6, 0, 4, 18),
  ('22222222-aaaa-aaaa-aaaa-000000000001', 'CTM Mirandela', 5, 10, 4, 2, 4, 14),
  ('22222222-aaaa-aaaa-aaaa-000000000001', 'AD Pasteleira', 6, 10, 3, 1, 6, 10),
  ('22222222-aaaa-aaaa-aaaa-000000000001', 'GR Vale Formoso', 7, 10, 2, 1, 7, 7),
  ('22222222-aaaa-aaaa-aaaa-000000000001', 'CD Estarreja', 8, 10, 0, 0, 10, 0);

INSERT INTO public.competition_standings (competition_id, team_name, position, played, wins, draws, losses, points) VALUES
  ('22222222-aaaa-aaaa-aaaa-000000000002', 'CTM Mirandela', 1, 8, 7, 0, 1, 21),
  ('22222222-aaaa-aaaa-aaaa-000000000002', 'GD Juncal', 2, 8, 6, 1, 1, 19),
  ('22222222-aaaa-aaaa-aaaa-000000000002', 'Sporting CP', 3, 8, 5, 1, 2, 16),
  ('22222222-aaaa-aaaa-aaaa-000000000002', 'SL Benfica', 4, 8, 4, 0, 4, 12),
  ('22222222-aaaa-aaaa-aaaa-000000000002', 'AD Pasteleira', 5, 8, 2, 1, 5, 7),
  ('22222222-aaaa-aaaa-aaaa-000000000002', 'GR Vale Formoso', 6, 8, 0, 1, 7, 1);

-- ───────────────────────────────────────────────
-- JOGOS
-- ───────────────────────────────────────────────
INSERT INTO public.matches (id, competition_id, home_team, away_team, home_team_id, match_date, location, round_number, status, summary, is_home) VALUES
  ('44444444-aaaa-aaaa-aaaa-000000000001',
   '22222222-aaaa-aaaa-aaaa-000000000001',
   'GD Juncal', 'Sporting CP',
   '33333333-aaaa-aaaa-aaaa-000000000001',
   '2026-05-29 21:00:00+00', 'Pavilhão GD Juncal — Juncal', 11, 'agendado',
   NULL, TRUE),

  ('44444444-aaaa-aaaa-aaaa-000000000002',
   '22222222-aaaa-aaaa-aaaa-000000000001',
   'GD Juncal', 'Ala Nun''Álvares',
   '33333333-aaaa-aaaa-aaaa-000000000001',
   '2026-05-15 21:00:00+00', 'Pavilhão GD Juncal — Juncal', 10, 'terminado',
   'Vitória sólida frente a um adversário direto na luta pelo pódio. O André foi decisivo no encontro 3, virando 0-2 para 3-2. Excelente espírito coletivo da equipa.', TRUE),

  ('44444444-aaaa-aaaa-aaaa-000000000003',
   '22222222-aaaa-aaaa-aaaa-000000000002',
   'GD Juncal', 'CTM Mirandela',
   '33333333-aaaa-aaaa-aaaa-000000000002',
   '2026-05-17 16:00:00+00', 'Pavilhão GD Juncal — Juncal', 9, 'terminado',
   'Derrota sentida frente ao líder do campeonato. A equipa esteve à altura no primeiro encontro, mas a experiência das adversárias fez a diferença nos momentos finais.', TRUE),

  ('44444444-aaaa-aaaa-aaaa-000000000004',
   '22222222-aaaa-aaaa-aaaa-000000000001',
   'SL Benfica', 'GD Juncal',
   '33333333-aaaa-aaaa-aaaa-000000000001',
   '2026-05-08 21:00:00+00', 'Pavilhão da Luz — Lisboa', 9, 'terminado',
   'Empate de mérito em casa do segundo classificado. O Miguel destacou-se com 2 pontos individuais.', FALSE),

  ('44444444-aaaa-aaaa-aaaa-000000000005',
   '22222222-aaaa-aaaa-aaaa-000000000003',
   'GD Juncal Sub-15', 'CTM Marinhense',
   '33333333-aaaa-aaaa-aaaa-000000000004',
   '2026-05-24 10:00:00+00', 'Pavilhão GD Juncal — Juncal', 8, 'agendado',
   NULL, TRUE);

-- Resultados
INSERT INTO public.match_results (match_id, home_score, away_score) VALUES
  ('44444444-aaaa-aaaa-aaaa-000000000002', 4, 2),
  ('44444444-aaaa-aaaa-aaaa-000000000003', 1, 4),
  ('44444444-aaaa-aaaa-aaaa-000000000004', 3, 3);

-- Encontros individuais (exemplo — jogo GD Juncal 4-2 Ala Nun'Álvares)
INSERT INTO public.match_games (match_id, game_order, home_player, away_player, sets, home_sets_won, away_sets_won) VALUES
  ('44444444-aaaa-aaaa-aaaa-000000000002', 1, 'Miguel Pereira', 'A. Ribeiro',
   '[{"home":11,"away":8},{"home":11,"away":6},{"home":9,"away":11},{"home":11,"away":9}]'::jsonb, 3, 1),
  ('44444444-aaaa-aaaa-aaaa-000000000002', 2, 'André Sousa', 'P. Silva',
   '[{"home":7,"away":11},{"home":9,"away":11},{"home":11,"away":7},{"home":11,"away":9},{"home":11,"away":7}]'::jsonb, 3, 2),
  ('44444444-aaaa-aaaa-aaaa-000000000002', 3, 'Tiago Reis', 'M. Oliveira',
   '[{"home":11,"away":6},{"home":11,"away":4},{"home":11,"away":7}]'::jsonb, 3, 0),
  ('44444444-aaaa-aaaa-aaaa-000000000002', 4, 'Bruno Martins', 'A. Ribeiro',
   '[{"home":8,"away":11},{"home":11,"away":7},{"home":6,"away":11},{"home":9,"away":11}]'::jsonb, 1, 3),
  ('44444444-aaaa-aaaa-aaaa-000000000002', 5, 'Miguel Pereira', 'P. Silva',
   '[{"home":6,"away":11},{"home":9,"away":11},{"home":11,"away":8},{"home":7,"away":11}]'::jsonb, 1, 3),
  ('44444444-aaaa-aaaa-aaaa-000000000002', 6, 'André Sousa', 'M. Oliveira',
   '[{"home":11,"away":9},{"home":11,"away":7},{"home":9,"away":11},{"home":11,"away":6}]'::jsonb, 3, 1);

-- ───────────────────────────────────────────────
-- NOTÍCIAS
-- ───────────────────────────────────────────────
INSERT INTO public.news (title, slug, excerpt, content, category, author, is_featured, cover_image_url) VALUES
  ('GD Juncal vence Ala Nun''Álvares em jogo decisivo',
   'gd-juncal-vence-ala-nun-alvares',
   'A equipa sénior masculina assegurou 3 pontos importantes na luta pelo pódio da Divisão de Honra.',
   'Em noite quente no pavilhão do Juncal, a equipa sénior masculina venceu o Ala Nun''Álvares por 4-2, reforçando a sua posição na luta pelo pódio.

O destaque vai para a reviravolta de André Sousa no encontro 3, que perdia por 0-2 e conseguiu virar para 3-2. Tiago Reis também se notabilizou com vitória categórica por 3-0.

A equipa joga agora em casa frente ao líder Sporting CP, num encontro decisivo para as ambições do clube nesta temporada.',
   'Ténis de Mesa', 'Direção GD Juncal', TRUE,
   'https://placehold.co/1200x630/0B2545/ffffff?text=GD+Juncal+vence'),

  ('Inscrições abertas para a Escolinha de Ténis de Mesa Sub-9',
   'inscricoes-escolinha-sub9',
   'Pais e encarregados de educação podem inscrever crianças entre os 5 e 9 anos.',
   'O Grupo Desportivo Centro Social do Juncal abre inscrições para a Escolinha de Ténis de Mesa, dirigida a crianças entre os 5 e 9 anos.

Os treinos decorrem às terças e quintas, das 17h30 às 19h00, no pavilhão do clube. A mensalidade é simbólica e inclui equipamento desportivo.

Para inscrever o teu filho ou filha, basta contactar a direção do clube ou visitar o pavilhão durante o horário de treino.',
   'Formação', 'Direção GD Juncal', TRUE,
   'https://placehold.co/1200x630/13315C/ffffff?text=Escolinha+Sub-9'),

  ('Ginásio do clube recebe novos equipamentos',
   'ginasio-novos-equipamentos',
   'Renovação do espaço inclui máquinas cardio, área funcional e zona de pesos livres.',
   'O ginásio do Grupo Desportivo Centro Social do Juncal renovou-se. Foram adquiridos novos equipamentos cardio, criada uma área de treino funcional e ampliada a zona de pesos livres.

A inauguração contou com a presença de associados e da direção, e o ginásio passa a funcionar todos os dias úteis das 7h às 22h.

Aproveita a campanha de inscrição: primeira mensalidade a metade do preço até final do mês.',
   'Ginásio', 'Direção GD Juncal', FALSE,
   'https://placehold.co/1200x630/D4AF37/0B2545?text=Novo+Gin%C3%A1sio');

-- ───────────────────────────────────────────────
-- GINÁSIO
-- ───────────────────────────────────────────────
INSERT INTO public.gym_trainers (full_name, speciality, bio) VALUES
  ('Hugo Vieira', 'Treino funcional e força', 'Licenciado em Educação Física, 10 anos de experiência em treino personalizado.'),
  ('Ana Mendes', 'Pilates e reabilitação', 'Fisioterapeuta com especialização em Pilates clínico.'),
  ('Rui Tavares', 'Cardio e perda de peso', 'PT certificado com foco em programas de emagrecimento sustentável.');

INSERT INTO public.gym_plans (name, description, monthly_price, highlights, is_featured) VALUES
  ('Plano Sócio', 'Acesso livre ao ginásio em todos os horários para sócios do clube.', 25.00,
   ARRAY['Acesso ilimitado', 'Avaliação física inicial gratuita', 'Sem fidelização'], TRUE),
  ('Plano Estudante', 'Mensalidade reduzida para estudantes até aos 23 anos.', 18.00,
   ARRAY['Acesso ilimitado', 'Necessário comprovativo de estudante', 'Sem fidelização'], FALSE),
  ('Plano Família', 'Para dois membros do mesmo agregado familiar.', 40.00,
   ARRAY['Dois utilizadores', 'Avaliação física inicial gratuita', 'Acesso ilimitado'], FALSE),
  ('Plano Anual', 'Pagamento anual com desconto significativo.', 18.33,
   ARRAY['Equivalente a 10 meses pagos', 'Sem renovação automática', 'T-shirt do clube oferta'], FALSE);

INSERT INTO public.gym_classes (name, weekday, start_time, duration_min, trainer_name, level) VALUES
  ('Treino Funcional', 'Segunda',  '19:00', 60, 'Hugo Vieira', 'todos'),
  ('Pilates',         'Segunda',  '20:00', 60, 'Ana Mendes',  'todos'),
  ('HIIT',            'Terça',    '19:00', 45, 'Rui Tavares', 'intermédio'),
  ('Pilates',         'Quarta',   '19:00', 60, 'Ana Mendes',  'iniciado'),
  ('Treino Funcional','Quinta',   '19:00', 60, 'Hugo Vieira', 'avançado'),
  ('Cardio Express',  'Sexta',    '18:30', 45, 'Rui Tavares', 'todos'),
  ('Pilates',         'Sábado',   '10:00', 60, 'Ana Mendes',  'todos');

-- ───────────────────────────────────────────────
-- MEDIA (placeholders — substituir por fotos reais)
-- ───────────────────────────────────────────────
INSERT INTO public.media (type, url, thumbnail_url, caption, match_id, category) VALUES
  ('photo', 'https://placehold.co/1600x900/0B2545/D4AF37?text=Jogo+vs+Ala+Nun%27%C3%81lvares',
   'https://placehold.co/600x400/0B2545/D4AF37?text=Foto+1',
   'Equipa sénior masculina antes do jogo.',
   '44444444-aaaa-aaaa-aaaa-000000000002', 'Jogos'),
  ('photo', 'https://placehold.co/1600x900/13315C/ffffff?text=Treino+Sub-15',
   'https://placehold.co/600x400/13315C/ffffff?text=Foto+2',
   'Treino da equipa Sub-15.', NULL, 'Formação'),
  ('photo', 'https://placehold.co/1600x900/D4AF37/0B2545?text=Pavilh%C3%A3o',
   'https://placehold.co/600x400/D4AF37/0B2545?text=Foto+3',
   'Pavilhão do GD Juncal.', NULL, 'Clube');
