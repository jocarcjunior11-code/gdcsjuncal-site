// ─────────────────────────────────────────────────
// Camada de acesso a dados
// ─────────────────────────────────────────────────
// Tenta primeiro buscar no Supabase; se não estiver configurado,
// usa os dados de demonstração. Assim o site funciona logo desde
// a primeira execução, mesmo sem base de dados ligada.
// ─────────────────────────────────────────────────

import { createServerSupabaseClient } from './supabase-server'
import {
  demoCompetitions, demoMatches, demoResults, demoMatchGames,
  demoNews, demoTeams, demoPlayers, demoStandings,
  demoTrainers, demoGymPlans, demoGymClasses, demoMedia
} from './demo-data'
import type {
  Competition, CompetitionStanding, Match, MatchGame, MatchResult,
  News, Player, Team, GymTrainer, GymPlan, GymClass, Media
} from './types'

function supabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// ───────────── COMPETIÇÕES ─────────────
export async function getCompetitions(): Promise<Competition[]> {
  if (!supabaseConfigured()) return demoCompetitions
  try {
    const sb = createServerSupabaseClient()
    const { data, error } = await sb.from('competitions').select('*').order('name')
    if (error || !data) return demoCompetitions
    return data as Competition[]
  } catch {
    return demoCompetitions
  }
}

export async function getCompetitionBySlug(slug: string): Promise<Competition | null> {
  if (!supabaseConfigured()) return demoCompetitions.find(c => c.slug === slug) || null
  try {
    const sb = createServerSupabaseClient()
    const { data } = await sb.from('competitions').select('*').eq('slug', slug).maybeSingle()
    return (data as Competition) || demoCompetitions.find(c => c.slug === slug) || null
  } catch {
    return demoCompetitions.find(c => c.slug === slug) || null
  }
}

export async function getStandings(competitionId: string): Promise<CompetitionStanding[]> {
  if (!supabaseConfigured()) return demoStandings[competitionId] || []
  try {
    const sb = createServerSupabaseClient()
    const { data } = await sb
      .from('competition_standings')
      .select('*')
      .eq('competition_id', competitionId)
      .order('position', { ascending: true })
    return (data as CompetitionStanding[]) || demoStandings[competitionId] || []
  } catch {
    return demoStandings[competitionId] || []
  }
}

// ───────────── JOGOS ─────────────
export async function getMatches(opts?: { competitionId?: string; limit?: number }): Promise<Match[]> {
  let list = demoMatches
  if (opts?.competitionId) list = list.filter(m => m.competition_id === opts.competitionId)
  list = [...list].sort((a, b) => +new Date(b.match_date) - +new Date(a.match_date))
  if (opts?.limit) list = list.slice(0, opts.limit)

  if (!supabaseConfigured()) return list
  try {
    const sb = createServerSupabaseClient()
    let q = sb.from('matches').select('*').order('match_date', { ascending: false })
    if (opts?.competitionId) q = q.eq('competition_id', opts.competitionId)
    if (opts?.limit) q = q.limit(opts.limit)
    const { data } = await q
    return (data as Match[]) || list
  } catch {
    return list
  }
}

export async function getMatchById(id: string): Promise<Match | null> {
  if (!supabaseConfigured()) return demoMatches.find(m => m.id === id) || null
  try {
    const sb = createServerSupabaseClient()
    const { data } = await sb.from('matches').select('*').eq('id', id).maybeSingle()
    return (data as Match) || demoMatches.find(m => m.id === id) || null
  } catch {
    return demoMatches.find(m => m.id === id) || null
  }
}

export async function getMatchResult(matchId: string): Promise<MatchResult | null> {
  if (!supabaseConfigured()) return demoResults[matchId] || null
  try {
    const sb = createServerSupabaseClient()
    const { data } = await sb.from('match_results').select('*').eq('match_id', matchId).maybeSingle()
    return (data as MatchResult) || demoResults[matchId] || null
  } catch {
    return demoResults[matchId] || null
  }
}

export async function getMatchGames(matchId: string): Promise<MatchGame[]> {
  if (!supabaseConfigured()) return demoMatchGames[matchId] || []
  try {
    const sb = createServerSupabaseClient()
    const { data } = await sb.from('match_games').select('*').eq('match_id', matchId).order('game_order')
    return (data as MatchGame[]) || demoMatchGames[matchId] || []
  } catch {
    return demoMatchGames[matchId] || []
  }
}

export async function getNextMatch(): Promise<Match | null> {
  const matches = await getMatches()
  const now = Date.now()
  const upcoming = matches
    .filter(m => m.status === 'agendado' && +new Date(m.match_date) >= now)
    .sort((a, b) => +new Date(a.match_date) - +new Date(b.match_date))
  return upcoming[0] || null
}

export async function getLatestResult(): Promise<Match | null> {
  const matches = await getMatches()
  return matches.find(m => m.status === 'terminado') || null
}

// ───────────── EQUIPAS / JOGADORES ─────────────
export async function getTeams(): Promise<Team[]> {
  if (!supabaseConfigured()) return demoTeams
  try {
    const sb = createServerSupabaseClient()
    const { data } = await sb.from('teams').select('*').order('name')
    return (data as Team[]) || demoTeams
  } catch {
    return demoTeams
  }
}

export async function getTeamById(id: string): Promise<Team | null> {
  if (!supabaseConfigured()) return demoTeams.find(t => t.id === id) || null
  try {
    const sb = createServerSupabaseClient()
    const { data } = await sb.from('teams').select('*').eq('id', id).maybeSingle()
    return (data as Team) || demoTeams.find(t => t.id === id) || null
  } catch {
    return demoTeams.find(t => t.id === id) || null
  }
}

export async function getPlayersByTeam(teamId: string): Promise<Player[]> {
  if (!supabaseConfigured()) return demoPlayers.filter(p => p.team_id === teamId)
  try {
    const sb = createServerSupabaseClient()
    const { data } = await sb.from('players').select('*').eq('team_id', teamId).order('number')
    return (data as Player[]) || demoPlayers.filter(p => p.team_id === teamId)
  } catch {
    return demoPlayers.filter(p => p.team_id === teamId)
  }
}

// ───────────── NOTÍCIAS ─────────────
export async function getNews(opts?: { limit?: number; featured?: boolean }): Promise<News[]> {
  let list = [...demoNews].sort((a, b) => +new Date(b.published_at) - +new Date(a.published_at))
  if (opts?.featured) list = list.filter(n => n.is_featured)
  if (opts?.limit) list = list.slice(0, opts.limit)

  if (!supabaseConfigured()) return list
  try {
    const sb = createServerSupabaseClient()
    let q = sb.from('news').select('*').order('published_at', { ascending: false })
    if (opts?.featured) q = q.eq('is_featured', true)
    if (opts?.limit) q = q.limit(opts.limit)
    const { data } = await q
    return (data as News[]) || list
  } catch {
    return list
  }
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  if (!supabaseConfigured()) return demoNews.find(n => n.slug === slug) || null
  try {
    const sb = createServerSupabaseClient()
    const { data } = await sb.from('news').select('*').eq('slug', slug).maybeSingle()
    return (data as News) || demoNews.find(n => n.slug === slug) || null
  } catch {
    return demoNews.find(n => n.slug === slug) || null
  }
}

// ───────────── MEDIA ─────────────
export async function getMedia(opts?: { matchId?: string; category?: string }): Promise<Media[]> {
  let list = [...demoMedia]
  if (opts?.matchId) list = list.filter(m => m.match_id === opts.matchId)
  if (opts?.category) list = list.filter(m => m.category === opts.category)

  if (!supabaseConfigured()) return list
  try {
    const sb = createServerSupabaseClient()
    let q = sb.from('media').select('*').order('uploaded_at', { ascending: false })
    if (opts?.matchId) q = q.eq('match_id', opts.matchId)
    if (opts?.category) q = q.eq('category', opts.category)
    const { data } = await q
    return (data as Media[]) || list
  } catch {
    return list
  }
}

// ───────────── GINÁSIO ─────────────
export async function getGymTrainers(): Promise<GymTrainer[]> {
  if (!supabaseConfigured()) return demoTrainers
  try {
    const sb = createServerSupabaseClient()
    const { data } = await sb.from('gym_trainers').select('*').order('full_name')
    return (data as GymTrainer[]) || demoTrainers
  } catch {
    return demoTrainers
  }
}

export async function getGymPlans(): Promise<GymPlan[]> {
  if (!supabaseConfigured()) return demoGymPlans
  try {
    const sb = createServerSupabaseClient()
    const { data } = await sb.from('gym_plans').select('*').order('monthly_price')
    return (data as GymPlan[]) || demoGymPlans
  } catch {
    return demoGymPlans
  }
}

export async function getGymClasses(): Promise<GymClass[]> {
  if (!supabaseConfigured()) return demoGymClasses
  try {
    const sb = createServerSupabaseClient()
    const { data } = await sb.from('gym_classes').select('*').order('weekday')
    return (data as GymClass[]) || demoGymClasses
  } catch {
    return demoGymClasses
  }
}
