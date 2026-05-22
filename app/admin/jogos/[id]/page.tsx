import { notFound } from 'next/navigation'
import { getMatchById, getMatchResult, getMatchGames, getCompetitions, getTeams } from '@/lib/data'
import { MatchEditor } from '@/components/admin/MatchEditor'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Editar jogo', robots: { index: false } }

export default async function EditMatchPage({ params }: { params: { id: string } }) {
  const match = await getMatchById(params.id)
  if (!match) notFound()

  const [result, games, competitions, teams] = await Promise.all([
    getMatchResult(match.id),
    getMatchGames(match.id),
    getCompetitions(),
    getTeams()
  ])

  return (
    <>
      <h1 className="mb-8 font-display text-3xl font-bold text-club-primary">
        Editar jogo
      </h1>
      <MatchEditor match={match} result={result} games={games} competitions={competitions} teams={teams} />
    </>
  )
}
