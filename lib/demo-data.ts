// ─────────────────────────────────────────────────
// Dados de demonstração
// ─────────────────────────────────────────────────
// Estes dados servem para o site funcionar SEM Supabase ligado.
// Quando configurares a base de dados real, as páginas vão buscar
// dados ao Supabase em vez deste ficheiro (vê lib/data.ts).
// ─────────────────────────────────────────────────

import type {
  Competition, CompetitionStanding, Match, MatchGame, MatchResult,
  News, Player, Team, GymTrainer, GymPlan, GymClass, Media
} from './types'

export const demoCompetitions: Competition[] = [
  {
    id: 'comp-1',
    name: 'Divisão de Honra',
    slug: 'divisao-honra-masculino',
    gender: 'masculino',
    age_group: 'senior',
    season: '2025/2026',
    description: 'Principal competição masculina de ténis de mesa em Portugal.'
  },
  {
    id: 'comp-2',
    name: '1ª Divisão Nacional',
    slug: '1a-divisao-nacional-feminino',
    gender: 'feminino',
    age_group: 'senior',
    season: '2025/2026',
    description: 'Principal competição feminina nacional de seniores.'
  },
  {
    id: 'comp-3',
    name: 'Campeonato Distrital Sub-15',
    slug: 'distrital-sub15',
    gender: 'misto',
    age_group: 'sub_15',
    season: '2025/2026',
    description: 'Campeonato distrital de formação.'
  }
]

export const demoStandings: Record<string, CompetitionStanding[]> = {
  'comp-1': [
    { id: 's1',  competition_id: 'comp-1', team_name: 'Sporting CP',          position: 1, played: 10, wins: 9, draws: 0, losses: 1,  points: 27 },
    { id: 's2',  competition_id: 'comp-1', team_name: 'SL Benfica',           position: 2, played: 10, wins: 8, draws: 1, losses: 1,  points: 25 },
    { id: 's3',  competition_id: 'comp-1', team_name: 'GD Juncal',            position: 3, played: 10, wins: 7, draws: 1, losses: 2,  points: 22 },
    { id: 's4',  competition_id: 'comp-1', team_name: 'Ala Nun\'Álvares',     position: 4, played: 10, wins: 6, draws: 0, losses: 4,  points: 18 },
    { id: 's5',  competition_id: 'comp-1', team_name: 'CTM Mirandela',        position: 5, played: 10, wins: 4, draws: 2, losses: 4,  points: 14 },
    { id: 's6',  competition_id: 'comp-1', team_name: 'AD Pasteleira',        position: 6, played: 10, wins: 3, draws: 1, losses: 6,  points: 10 },
    { id: 's7',  competition_id: 'comp-1', team_name: 'GR Vale Formoso',      position: 7, played: 10, wins: 2, draws: 1, losses: 7,  points: 7  },
    { id: 's8',  competition_id: 'comp-1', team_name: 'CD Estarreja',         position: 8, played: 10, wins: 0, draws: 0, losses: 10, points: 0  }
  ],
  'comp-2': [
    { id: 'sf1', competition_id: 'comp-2', team_name: 'CTM Mirandela',  position: 1, played: 8, wins: 7, draws: 0, losses: 1, points: 21 },
    { id: 'sf2', competition_id: 'comp-2', team_name: 'GD Juncal',      position: 2, played: 8, wins: 6, draws: 1, losses: 1, points: 19 },
    { id: 'sf3', competition_id: 'comp-2', team_name: 'Sporting CP',    position: 3, played: 8, wins: 5, draws: 1, losses: 2, points: 16 },
    { id: 'sf4', competition_id: 'comp-2', team_name: 'SL Benfica',     position: 4, played: 8, wins: 4, draws: 0, losses: 4, points: 12 },
    { id: 'sf5', competition_id: 'comp-2', team_name: 'AD Pasteleira',  position: 5, played: 8, wins: 2, draws: 1, losses: 5, points: 7  },
    { id: 'sf6', competition_id: 'comp-2', team_name: 'GR Vale Formoso',position: 6, played: 8, wins: 0, draws: 1, losses: 7, points: 1  }
  ]
}

export const demoTeams: Team[] = [
  { id: 'team-1', club_id: 'c1', name: 'Seniores Masculinos', gender: 'masculino', age_group: 'senior',  coach_name: 'João Marques',   competition_id: 'comp-1', description: 'Equipa principal masculina, presente na Divisão de Honra.' },
  { id: 'team-2', club_id: 'c1', name: 'Seniores Femininos',  gender: 'feminino',  age_group: 'senior',  coach_name: 'Sara Almeida',   competition_id: 'comp-2', description: 'Equipa principal feminina, presente na 1ª Divisão Nacional.' },
  { id: 'team-3', club_id: 'c1', name: 'Formação Sub-19',     gender: 'misto',     age_group: 'sub_19',  coach_name: 'Pedro Costa',    competition_id: null,     description: 'Atletas em transição para os seniores.' },
  { id: 'team-4', club_id: 'c1', name: 'Formação Sub-15',     gender: 'misto',     age_group: 'sub_15',  coach_name: 'Rui Ferreira',   competition_id: 'comp-3', description: 'Formação competitiva distrital.' },
  { id: 'team-5', club_id: 'c1', name: 'Escolinha Sub-9',     gender: 'misto',     age_group: 'sub_9',   coach_name: 'Inês Lopes',     competition_id: null,     description: 'Primeira aprendizagem técnica e divertida do ténis de mesa.' }
]

export const demoPlayers: Player[] = [
  { id: 'p1',  team_id: 'team-1', full_name: 'Miguel Pereira', birth_date: null, position: 'Defensor',  number: 1, photo_url: null, bio: 'Atleta sénior, estilo defensivo, 8 anos no clube.' },
  { id: 'p2',  team_id: 'team-1', full_name: 'André Sousa',    birth_date: null, position: 'Atacante',  number: 2, photo_url: null, bio: 'Atleta agressivo, especialista em forehand topspin.' },
  { id: 'p3',  team_id: 'team-1', full_name: 'Tiago Reis',     birth_date: null, position: 'All-round', number: 3, photo_url: null, bio: 'Joga há 12 anos, com várias presenças em finais distritais.' },
  { id: 'p4',  team_id: 'team-1', full_name: 'Bruno Martins',  birth_date: null, position: 'Atacante',  number: 4, photo_url: null, bio: 'Recém-promovido dos sub-19, ataque rápido e curto.' },
  { id: 'p5',  team_id: 'team-2', full_name: 'Maria Antunes',  birth_date: null, position: 'All-round', number: 1, photo_url: null, bio: 'Capitã da equipa feminina, vasta experiência nacional.' },
  { id: 'p6',  team_id: 'team-2', full_name: 'Carolina Dias',  birth_date: null, position: 'Atacante',  number: 2, photo_url: null, bio: 'Atleta jovem com forte top spin de direita.' },
  { id: 'p7',  team_id: 'team-2', full_name: 'Beatriz Lopes',  birth_date: null, position: 'Defensora', number: 3, photo_url: null, bio: 'Estilo defensivo clássico, paciente e resiliente.' },
  { id: 'p8',  team_id: 'team-3', full_name: 'Diogo Nunes',    birth_date: null, position: 'Atacante',  number: 1, photo_url: null, bio: 'Promessa da formação. Treina 5 vezes por semana.' },
  { id: 'p9',  team_id: 'team-3', full_name: 'Rafael Pinto',   birth_date: null, position: 'All-round', number: 2, photo_url: null, bio: 'Estilo equilibrado, finalista distrital sub-17.' },
  { id: 'p10', team_id: 'team-4', full_name: 'Leonor Vieira',  birth_date: null, position: 'Atacante',  number: 1, photo_url: null, bio: 'Campeã distrital sub-13 em 2024/2025.' },
  { id: 'p11', team_id: 'team-4', full_name: 'Gonçalo Santos', birth_date: null, position: 'Defensor',  number: 2, photo_url: null, bio: 'Joga há 4 anos, especialista em chop.' }
]

export const demoMatches: Match[] = [
  {
    id: 'm1', competition_id: 'comp-1',
    home_team: 'GD Juncal', away_team: 'Sporting CP',
    home_team_id: 'team-1', away_team_id: null,
    match_date: '2026-05-29T21:00:00.000Z',
    location: 'Pavilhão GD Juncal — Juncal',
    round_number: 11, status: 'agendado',
    summary: null, is_home: true
  },
  {
    id: 'm2', competition_id: 'comp-1',
    home_team: 'GD Juncal', away_team: 'Ala Nun\'Álvares',
    home_team_id: 'team-1', away_team_id: null,
    match_date: '2026-05-15T21:00:00.000Z',
    location: 'Pavilhão GD Juncal — Juncal',
    round_number: 10, status: 'terminado',
    summary: 'Vitória sólida frente a um adversário direto na luta pelo pódio. O André foi decisivo no encontro 3, virando 0-2 para 3-2. Excelente espírito coletivo da equipa.',
    is_home: true
  },
  {
    id: 'm3', competition_id: 'comp-2',
    home_team: 'GD Juncal', away_team: 'CTM Mirandela',
    home_team_id: 'team-2', away_team_id: null,
    match_date: '2026-05-17T16:00:00.000Z',
    location: 'Pavilhão GD Juncal — Juncal',
    round_number: 9, status: 'terminado',
    summary: 'Derrota sentida frente ao líder do campeonato. A equipa esteve à altura no primeiro encontro, mas a experiência das adversárias fez a diferença nos momentos finais.',
    is_home: true
  },
  {
    id: 'm4', competition_id: 'comp-1',
    home_team: 'SL Benfica', away_team: 'GD Juncal',
    home_team_id: null, away_team_id: 'team-1',
    match_date: '2026-05-08T21:00:00.000Z',
    location: 'Pavilhão da Luz — Lisboa',
    round_number: 9, status: 'terminado',
    summary: 'Empate de mérito em casa do segundo classificado. O Miguel destacou-se com 2 pontos individuais.',
    is_home: false
  },
  {
    id: 'm5', competition_id: 'comp-3',
    home_team: 'GD Juncal Sub-15', away_team: 'CTM Marinhense',
    home_team_id: 'team-4', away_team_id: null,
    match_date: '2026-05-24T10:00:00.000Z',
    location: 'Pavilhão GD Juncal — Juncal',
    round_number: 8, status: 'agendado',
    summary: null, is_home: true
  }
]

export const demoResults: Record<string, MatchResult> = {
  'm2': { match_id: 'm2', home_score: 4, away_score: 2 },
  'm3': { match_id: 'm3', home_score: 1, away_score: 4 },
  'm4': { match_id: 'm4', home_score: 3, away_score: 3 }
}

export const demoMatchGames: Record<string, MatchGame[]> = {
  'm2': [
    { id: 'g1', match_id: 'm2', game_order: 1, home_player: 'Miguel Pereira', away_player: 'A. Ribeiro', sets: [{home:11,away:8},{home:11,away:6},{home:9,away:11},{home:11,away:9}], home_sets_won: 3, away_sets_won: 1 },
    { id: 'g2', match_id: 'm2', game_order: 2, home_player: 'André Sousa',    away_player: 'P. Silva',   sets: [{home:7,away:11},{home:9,away:11},{home:11,away:7},{home:11,away:9},{home:11,away:7}], home_sets_won: 3, away_sets_won: 2 },
    { id: 'g3', match_id: 'm2', game_order: 3, home_player: 'Tiago Reis',     away_player: 'M. Oliveira',sets: [{home:11,away:6},{home:11,away:4},{home:11,away:7}], home_sets_won: 3, away_sets_won: 0 },
    { id: 'g4', match_id: 'm2', game_order: 4, home_player: 'Bruno Martins',  away_player: 'A. Ribeiro', sets: [{home:8,away:11},{home:11,away:7},{home:6,away:11},{home:9,away:11}], home_sets_won: 1, away_sets_won: 3 },
    { id: 'g5', match_id: 'm2', game_order: 5, home_player: 'Miguel Pereira', away_player: 'P. Silva',   sets: [{home:6,away:11},{home:9,away:11},{home:11,away:8},{home:7,away:11}], home_sets_won: 1, away_sets_won: 3 },
    { id: 'g6', match_id: 'm2', game_order: 6, home_player: 'André Sousa',    away_player: 'M. Oliveira',sets: [{home:11,away:9},{home:11,away:7},{home:9,away:11},{home:11,away:6}], home_sets_won: 3, away_sets_won: 1 }
  ]
}

export const demoNews: News[] = [
  {
    id: 'n1',
    title: 'GD Juncal vence Ala Nun\'Álvares em jogo decisivo',
    slug: 'gd-juncal-vence-ala-nun-alvares',
    excerpt: 'A equipa sénior masculina assegurou 3 pontos importantes na luta pelo pódio da Divisão de Honra.',
    content: `Em noite quente no pavilhão do Juncal, a equipa sénior masculina venceu o Ala Nun'Álvares por 4-2, reforçando a sua posição na luta pelo pódio.

O destaque vai para a reviravolta de André Sousa no encontro 3, que perdia por 0-2 e conseguiu virar para 3-2. Tiago Reis também se notabilizou com vitória categórica por 3-0.

A equipa joga agora em casa frente ao líder Sporting CP, num encontro decisivo para as ambições do clube nesta temporada.`,
    cover_image_url: 'https://placehold.co/1200x630/0B2545/ffffff?text=GD+Juncal+vence',
    category: 'Ténis de Mesa',
    author: 'Direção GD Juncal',
    published_at: '2026-05-16T10:00:00.000Z',
    is_featured: true
  },
  {
    id: 'n2',
    title: 'Inscrições abertas para a Escolinha de Ténis de Mesa Sub-9',
    slug: 'inscricoes-escolinha-sub9',
    excerpt: 'Pais e encarregados de educação podem inscrever crianças entre os 5 e 9 anos.',
    content: `O Grupo Desportivo Centro Social do Juncal abre inscrições para a Escolinha de Ténis de Mesa, dirigida a crianças entre os 5 e 9 anos.

Os treinos decorrem às terças e quintas, das 17h30 às 19h00, no pavilhão do clube. A mensalidade é simbólica e inclui equipamento desportivo.

Para inscrever o teu filho ou filha, basta contactar a direção do clube ou visitar o pavilhão durante o horário de treino.`,
    cover_image_url: 'https://placehold.co/1200x630/13315C/ffffff?text=Escolinha+Sub-9',
    category: 'Formação',
    author: 'Direção GD Juncal',
    published_at: '2026-05-10T09:00:00.000Z',
    is_featured: true
  },
  {
    id: 'n3',
    title: 'Ginásio do clube recebe novos equipamentos',
    slug: 'ginasio-novos-equipamentos',
    excerpt: 'Renovação do espaço inclui máquinas cardio, área funcional e zona de pesos livres.',
    content: `O ginásio do Grupo Desportivo Centro Social do Juncal renovou-se. Foram adquiridos novos equipamentos cardio, criada uma área de treino funcional e ampliada a zona de pesos livres.

A inauguração contou com a presença de associados e da direção, e o ginásio passa a funcionar todos os dias úteis das 7h às 22h.

Aproveita a campanha de inscrição: primeira mensalidade a metade do preço até final do mês.`,
    cover_image_url: 'https://placehold.co/1200x630/D4AF37/0B2545?text=Novo+Gin%C3%A1sio',
    category: 'Ginásio',
    author: 'Direção GD Juncal',
    published_at: '2026-05-02T08:00:00.000Z',
    is_featured: false
  }
]

export const demoTrainers: GymTrainer[] = [
  { id: 't1', full_name: 'Hugo Vieira',  speciality: 'Treino funcional e força',  bio: 'Licenciado em Educação Física, 10 anos de experiência em treino personalizado.', photo_url: null },
  { id: 't2', full_name: 'Ana Mendes',   speciality: 'Pilates e reabilitação',     bio: 'Fisioterapeuta com especialização em Pilates clínico.', photo_url: null },
  { id: 't3', full_name: 'Rui Tavares',  speciality: 'Cardio e perda de peso',     bio: 'PT certificado com foco em programas de emagrecimento sustentável.', photo_url: null }
]

export const demoGymPlans: GymPlan[] = [
  { id: 'gp1', name: 'Plano Sócio',     description: 'Acesso livre ao ginásio em todos os horários para sócios do clube.', monthly_price: 25, highlights: ['Acesso ilimitado','Avaliação física inicial gratuita','Sem fidelização'], is_featured: true },
  { id: 'gp2', name: 'Plano Estudante', description: 'Mensalidade reduzida para estudantes até aos 23 anos.',              monthly_price: 18, highlights: ['Acesso ilimitado','Comprovativo de estudante','Sem fidelização'], is_featured: false },
  { id: 'gp3', name: 'Plano Família',   description: 'Para dois membros do mesmo agregado familiar.',                       monthly_price: 40, highlights: ['Dois utilizadores','Avaliação física gratuita','Acesso ilimitado'], is_featured: false },
  { id: 'gp4', name: 'Plano Anual',     description: 'Pagamento anual com desconto significativo.',                          monthly_price: 18.33, highlights: ['Equivalente a 10 meses pagos','Sem renovação automática','T-shirt do clube oferta'], is_featured: false }
]

export const demoGymClasses: GymClass[] = [
  { id: 'c1', name: 'Treino Funcional', weekday: 'Segunda', start_time: '19:00', duration_min: 60, trainer_name: 'Hugo Vieira',  level: 'todos' },
  { id: 'c2', name: 'Pilates',          weekday: 'Segunda', start_time: '20:00', duration_min: 60, trainer_name: 'Ana Mendes',   level: 'todos' },
  { id: 'c3', name: 'HIIT',             weekday: 'Terça',   start_time: '19:00', duration_min: 45, trainer_name: 'Rui Tavares',  level: 'intermédio' },
  { id: 'c4', name: 'Pilates',          weekday: 'Quarta',  start_time: '19:00', duration_min: 60, trainer_name: 'Ana Mendes',   level: 'iniciado' },
  { id: 'c5', name: 'Treino Funcional', weekday: 'Quinta',  start_time: '19:00', duration_min: 60, trainer_name: 'Hugo Vieira',  level: 'avançado' },
  { id: 'c6', name: 'Cardio Express',   weekday: 'Sexta',   start_time: '18:30', duration_min: 45, trainer_name: 'Rui Tavares',  level: 'todos' },
  { id: 'c7', name: 'Pilates',          weekday: 'Sábado',  start_time: '10:00', duration_min: 60, trainer_name: 'Ana Mendes',   level: 'todos' }
]

export const demoMedia: Media[] = [
  { id: 'med1', type: 'photo', url: 'https://placehold.co/1600x900/0B2545/D4AF37?text=Jogo+vs+Ala+Nun%27%C3%81lvares', thumbnail_url: 'https://placehold.co/600x400/0B2545/D4AF37?text=Foto+1', caption: 'Equipa sénior masculina antes do jogo.', match_id: 'm2', category: 'Jogos', uploaded_at: '2026-05-15T22:00:00.000Z' },
  { id: 'med2', type: 'photo', url: 'https://placehold.co/1600x900/13315C/ffffff?text=Treino+Sub-15', thumbnail_url: 'https://placehold.co/600x400/13315C/ffffff?text=Foto+2', caption: 'Treino da equipa Sub-15.', match_id: null, category: 'Formação', uploaded_at: '2026-05-12T18:00:00.000Z' },
  { id: 'med3', type: 'photo', url: 'https://placehold.co/1600x900/D4AF37/0B2545?text=Pavilh%C3%A3o', thumbnail_url: 'https://placehold.co/600x400/D4AF37/0B2545?text=Foto+3', caption: 'Pavilhão do GD Juncal.', match_id: null, category: 'Clube', uploaded_at: '2026-05-01T10:00:00.000Z' }
]
