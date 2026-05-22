import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCompetitionBySlug, getMatches, getStandings, getMatchResult } from '@/lib/data'
import { MatchCard } from '@/components/MatchCard'

export const dynamic = 'force-dynamic'

export default async function CompetitionPage({ params }: { params: { slug: string } }) {
  const competition = await getCompetitionBySlug(params.slug)
  if (!competition) notFound()

  const [standings, matches] = await Promise.all([
    getStandings(competition.id),
    getMatches({ competitionId: competition.id })
  ])

  // Resultados associados
  const resultsMap = new Map<string, { home_score: number; away_score: number }>()
  await Promise.all(
    matches.map(async m => {
      const r = await getMatchResult(m.id)
      if (r) resultsMap.set(m.id, r)
    })
  )

  const matchesByRound = matches.reduce<Record<number, typeof matches>>((acc, m) => {
    const r = m.round_number ?? 0
    acc[r] = acc[r] || []
    acc[r].push(m)
    return acc
  }, {})

  const rounds = Object.keys(matchesByRound)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="container-wide py-12">
      <Link href="/competicoes" className="text-sm text-gray-500 hover:text-club-primary">
        ← Competições
      </Link>

      <header className="mt-3 mb-10">
        <span className="eyebrow">Temporada {competition.season}</span>
        <h1 className="section-title mt-2">{competition.name}</h1>
        {competition.description && (
          <p className="mt-3 max-w-2xl text-gray-600">{competition.description}</p>
        )}
      </header>

      {/* Classificação */}
      <section className="mb-12">
        <h2 className="mb-5 border-l-4 border-club-accent pl-3 font-display text-xl font-bold text-club-primary">
          Classificação
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="table-clean">
            <thead>
              <tr>
                <th>#</th>
                <th>Equipa</th>
                <th className="text-center">J</th>
                <th className="text-center">V</th>
                <th className="text-center">E</th>
                <th className="text-center">D</th>
                <th className="text-center">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    Sem dados de classificação disponíveis.
                  </td>
                </tr>
              ) : (
                standings.map(s => {
                  const highlight = s.team_name.includes('Juncal')
                  return (
                    <tr key={s.id} className={highlight ? 'bg-club-accent/15 font-semibold' : ''}>
                      <td>{s.position}</td>
                      <td>{s.team_name}</td>
                      <td className="text-center">{s.played}</td>
                      <td className="text-center">{s.wins}</td>
                      <td className="text-center">{s.draws}</td>
                      <td className="text-center">{s.losses}</td>
                      <td className="text-center font-bold">{s.points}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          J — Jogos · V — Vitórias · E — Empates · D — Derrotas · Pts — Pontos
        </p>
      </section>

      {/* Calendário e resultados por jornada */}
      <section>
        <h2 className="mb-5 border-l-4 border-club-accent pl-3 font-display text-xl font-bold text-club-primary">
          Calendário e Resultados
        </h2>

        {rounds.length === 0 ? (
          <p className="text-gray-500">Ainda não há jogos registados nesta competição.</p>
        ) : (
          rounds.map(round => (
            <div key={round} className="mb-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-club-primary">
                Jornada {round}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {matchesByRound[round].map(m => {
                  const r = resultsMap.get(m.id)
                  return (
                    <MatchCard
                      key={m.id}
                      id={m.id}
                      homeTeam={m.home_team}
                      awayTeam={m.away_team}
                      homeScore={r?.home_score}
                      awayScore={r?.away_score}
                      date={m.match_date}
                      location={m.location}
                      competition={competition.name}
                      status={m.status}
                    />
                  )
                })}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}
