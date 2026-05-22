// ─────────────────────────────────────────────────
// Tipos partilhados — refletem a estrutura da base de dados
// ─────────────────────────────────────────────────

export type Gender = 'masculino' | 'feminino' | 'misto'
export type AgeGroup =
  | 'senior'
  | 'sub_23'
  | 'sub_19'
  | 'sub_17'
  | 'sub_15'
  | 'sub_13'
  | 'sub_11'
  | 'sub_9'

export type MatchStatus = 'agendado' | 'em_curso' | 'terminado' | 'adiado'

export interface Club {
  id: string
  name: string
  short_name: string
  logo_url: string | null
  city: string | null
}

export interface Team {
  id: string
  club_id: string
  name: string
  gender: Gender
  age_group: AgeGroup
  coach_name: string | null
  competition_id: string | null
  description: string | null
}

export interface Player {
  id: string
  team_id: string
  full_name: string
  birth_date: string | null
  position: string | null
  number: number | null
  photo_url: string | null
  bio: string | null
}

export interface Competition {
  id: string
  name: string
  slug: string
  gender: Gender
  age_group: AgeGroup
  season: string
  description: string | null
}

export interface CompetitionStanding {
  id: string
  competition_id: string
  team_name: string
  position: number
  played: number
  wins: number
  draws: number
  losses: number
  points: number
}

export interface Match {
  id: string
  competition_id: string
  home_team: string
  away_team: string
  home_team_id: string | null
  away_team_id: string | null
  match_date: string
  location: string | null
  round_number: number | null
  status: MatchStatus
  summary: string | null
  is_home: boolean
}

export interface MatchResult {
  match_id: string
  home_score: number
  away_score: number
}

export interface MatchGame {
  id: string
  match_id: string
  game_order: number
  home_player: string
  away_player: string
  sets: { home: number; away: number }[]
  home_sets_won: number
  away_sets_won: number
}

export interface News {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image_url: string | null
  category: string | null
  author: string | null
  published_at: string
  is_featured: boolean
}

export interface Media {
  id: string
  type: 'photo' | 'video'
  url: string
  thumbnail_url: string | null
  caption: string | null
  match_id: string | null
  category: string | null
  uploaded_at: string
}

export interface GymTrainer {
  id: string
  full_name: string
  speciality: string
  bio: string | null
  photo_url: string | null
}

export interface GymPlan {
  id: string
  name: string
  description: string
  monthly_price: number
  highlights: string[]
  is_featured: boolean
}

export interface GymClass {
  id: string
  name: string
  weekday: string
  start_time: string
  duration_min: number
  trainer_name: string
  level: 'iniciado' | 'intermédio' | 'avançado' | 'todos'
}
