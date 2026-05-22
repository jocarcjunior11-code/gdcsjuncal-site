import Link from 'next/link'
import { notFound } from 'next/navigation'
import { User } from 'lucide-react'
import { getTeamById, getPlayersByTeam, getCompetitions } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function TeamPage({ params }: { params: { id: string } }) {
  const team = await getTeamById(params.id)
  if (!team) notFound()

  const [players, competitions] = await Promise.all([
    getPlayersByTeam(team.id),
    getCompetitions()
  ])
  const competition = competitions.find(c => c.id === team.competition_id)

  return (
    <div className="container-wide py-12">
      <Link href="/equipas" className="text-sm text-gray-500 hover:text-club-primary">
        ← Equipas
      </Link>

      <header className="mt-3 mb-10 rounded-xl bg-club-primary p-8 text-white">
        <span className="eyebrow text-club-accent">{team.gender} · {team.age_group}</span>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold text-white">{team.name}</h1>
        {team.description && <p className="mt-3 max-w-2xl text-white/80">{team.description}</p>}
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          {team.coach_name && (
            <p><span className="text-club-accent">Treinador:</span> {team.coach_name}</p>
          )}
          {competition && (
            <p><span className="text-club-accent">Compete em:</span> <Link href={`/competicoes/${competition.slug}`} className="underline hover:text-club-accent">{competition.name}</Link></p>
          )}
        </div>
      </header>

      <section>
        <h2 className="mb-5 border-l-4 border-club-accent pl-3 font-display text-xl font-bold text-club-primary">
          Plantel
        </h2>
        {players.length === 0 ? (
          <p className="text-gray-500">Sem jogadores registados nesta equipa.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {players.map(p => (
              <div key={p.id} className="card p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-club-light text-club-primary">
                    {p.number ? <span className="font-display font-bold">{p.number}</span> : <User size={20} />}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-club-primary">{p.full_name}</p>
                    {p.position && <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">{p.position}</p>}
                    {p.bio && <p className="mt-2 text-sm text-gray-600">{p.bio}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
