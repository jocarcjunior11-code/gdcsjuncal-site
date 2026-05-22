import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, MapPin, Trophy } from 'lucide-react'
import {
  getMatchById, getMatchResult, getMatchGames, getMedia, getCompetitions
} from '@/lib/data'
import { formatMatchDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function MatchPage({ params }: { params: { id: string } }) {
  const match = await getMatchById(params.id)
  if (!match) notFound()

  const [result, games, media, competitions] = await Promise.all([
    getMatchResult(match.id),
    getMatchGames(match.id),
    getMedia({ matchId: match.id }),
    getCompetitions()
  ])

  const competition = competitions.find(c => c.id === match.competition_id)
  const isFinished = match.status === 'terminado'

  return (
    <div className="container-wide py-12">
      <Link href="/jogos" className="text-sm text-gray-500 hover:text-club-primary">
        ← Jogos
      </Link>

      {/* Cabeçalho do jogo */}
      <header className="mt-3 mb-10 rounded-xl bg-club-primary p-8 text-white">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-club-accent">
          {competition && (
            <span className="flex items-center gap-1">
              <Trophy size={14} /> {competition.name}
            </span>
          )}
          {match.round_number && <span>Jornada {match.round_number}</span>}
        </div>

        <div className="mt-6 grid grid-cols-3 items-center gap-4">
          <div className="text-center">
            <p className="font-display text-xl md:text-2xl font-bold">{match.home_team}</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-white/60">Casa</p>
          </div>

          <div className="text-center">
            {isFinished && result ? (
              <p className="font-display text-5xl md:text-6xl font-bold text-club-accent">
                {result.home_score} <span className="text-white/40">—</span> {result.away_score}
              </p>
            ) : (
              <p className="font-display text-3xl text-white/70">VS</p>
            )}
          </div>

          <div className="text-center">
            <p className="font-display text-xl md:text-2xl font-bold">{match.away_team}</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-white/60">Fora</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80">
          <span className="flex items-center gap-2">
            <Calendar size={16} className="text-club-accent" />
            {formatMatchDate(match.match_date)}
          </span>
          {match.location && (
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-club-accent" />
              {match.location}
            </span>
          )}
        </div>
      </header>

      {/* Resumo institucional */}
      {match.summary && (
        <section className="mb-12">
          <h2 className="mb-3 border-l-4 border-club-accent pl-3 font-display text-xl font-bold text-club-primary">
            Resumo do jogo
          </h2>
          <p className="whitespace-pre-line rounded-md bg-club-light/60 p-5 text-gray-700 leading-relaxed">
            {match.summary}
          </p>
        </section>
      )}

      {/* Encontros individuais */}
      {games.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-5 border-l-4 border-club-accent pl-3 font-display text-xl font-bold text-club-primary">
            Encontros individuais
          </h2>
          <div className="space-y-3">
            {games.map(g => {
              const homeWin = g.home_sets_won > g.away_sets_won
              return (
                <div key={g.id} className="card overflow-hidden">
                  <div className="flex items-center justify-between bg-club-light/40 px-4 py-2 text-xs uppercase tracking-widest text-gray-500">
                    <span>Encontro #{g.game_order}</span>
                  </div>
                  <div className="grid grid-cols-7 items-center gap-2 p-4">
                    <p className={`col-span-2 text-right text-sm font-semibold ${homeWin ? 'text-club-primary' : 'text-gray-600'}`}>
                      {g.home_player}
                    </p>
                    <p className="text-center font-display text-2xl font-bold text-club-primary">
                      {g.home_sets_won} — {g.away_sets_won}
                    </p>
                    <p className={`col-span-2 text-left text-sm font-semibold ${!homeWin ? 'text-club-primary' : 'text-gray-600'}`}>
                      {g.away_player}
                    </p>
                    <div className="col-span-2 flex flex-wrap justify-end gap-1">
                      {(g.sets as { home: number; away: number }[]).map((s, i) => (
                        <span key={i} className="rounded bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-700">
                          {s.home}-{s.away}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Galeria */}
      {media.length > 0 && (
        <section>
          <h2 className="mb-5 border-l-4 border-club-accent pl-3 font-display text-xl font-bold text-club-primary">
            Galeria
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {media.map(m => (
              <a
                key={m.id}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-video overflow-hidden rounded-lg bg-gray-100"
              >
                <Image
                  src={m.thumbnail_url || m.url}
                  alt={m.caption || 'Galeria do jogo'}
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover transition group-hover:scale-105"
                />
                {m.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs text-white">
                    {m.caption}
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
