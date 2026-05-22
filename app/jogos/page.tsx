import { getCompetitions, getMatches, getMatchResult } from '@/lib/data'
import { MatchCard } from '@/components/MatchCard'

export const metadata = {
  title: 'Jogos',
  description: 'Calendário e resultados de todos os jogos do GD Juncal.'
}

export default async function MatchesPage() {
  const [matches, competitions] = await Promise.all([getMatches(), getCompetitions()])
  const compMap = new Map(competitions.map(c => [c.id, c.name]))

  const resultsMap = new Map<string, { home_score: number; away_score: number }>()
  await Promise.all(
    matches.map(async m => {
      const r = await getMatchResult(m.id)
      if (r) resultsMap.set(m.id, r)
    })
  )

  const upcoming = matches.filter(m => m.status === 'agendado')
  const finished = matches.filter(m => m.status === 'terminado')

  return (
    <div className="container-wide py-12">
      <header className="mb-10">
        <span className="eyebrow">Calendário desportivo</span>
        <h1 className="section-title mt-2">Jogos</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Próximos jogos e resultados das equipas do GD Juncal em todas as competições.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="mb-5 border-l-4 border-club-accent pl-3 font-display text-xl font-bold text-club-primary">
          Próximos jogos
        </h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-500">Sem jogos agendados de momento.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {upcoming.map(m => (
              <MatchCard
                key={m.id} id={m.id}
                homeTeam={m.home_team} awayTeam={m.away_team}
                date={m.match_date} location={m.location}
                competition={compMap.get(m.competition_id)}
                status={m.status}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-5 border-l-4 border-club-accent pl-3 font-display text-xl font-bold text-club-primary">
          Últimos resultados
        </h2>
        {finished.length === 0 ? (
          <p className="text-gray-500">Sem resultados registados.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {finished.map(m => {
              const r = resultsMap.get(m.id)
              return (
                <MatchCard
                  key={m.id} id={m.id}
                  homeTeam={m.home_team} awayTeam={m.away_team}
                  homeScore={r?.home_score} awayScore={r?.away_score}
                  date={m.match_date} location={m.location}
                  competition={compMap.get(m.competition_id)}
                  status={m.status}
                />
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
