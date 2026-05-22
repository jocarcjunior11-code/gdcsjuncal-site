import { getCompetitions, getTeams } from '@/lib/data'
import { MatchForm } from '@/components/admin/MatchForm'

export const metadata = { title: 'Novo jogo', robots: { index: false } }

export default async function NewMatchPage() {
  const [competitions, teams] = await Promise.all([getCompetitions(), getTeams()])
  return (
    <>
      <h1 className="mb-8 font-display text-3xl font-bold text-club-primary">Adicionar novo jogo</h1>
      <MatchForm competitions={competitions} teams={teams} />
    </>
  )
}
