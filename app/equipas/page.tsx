import Link from 'next/link'
import { Users, ArrowRight } from 'lucide-react'
import { getTeams, getCompetitions } from '@/lib/data'

export const metadata = {
  title: 'Equipas',
  description: 'Equipas seniores e de formação do Grupo Desportivo Centro Social do Juncal.'
}

const AGE_LABEL: Record<string, string> = {
  senior: 'Seniores',
  sub_19: 'Sub-19', sub_17: 'Sub-17',
  sub_15: 'Sub-15', sub_13: 'Sub-13',
  sub_11: 'Sub-11', sub_9:  'Sub-9'
}

export default async function TeamsPage() {
  const [teams, competitions] = await Promise.all([getTeams(), getCompetitions()])
  const compMap = new Map(competitions.map(c => [c.id, c.name]))

  const seniores = teams.filter(t => t.age_group === 'senior')
  const formacao = teams.filter(t => t.age_group !== 'senior')

  return (
    <div className="container-wide py-12">
      <header className="mb-10">
        <span className="eyebrow">Modalidade Ténis de Mesa</span>
        <h1 className="section-title mt-2">As nossas equipas</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Desde a Escolinha aos Seniores, o clube acompanha cada atleta ao longo do seu percurso.
        </p>
      </header>

      <Group title="Seniores" items={seniores} compMap={compMap} />
      <Group title="Formação" items={formacao} compMap={compMap} />
    </div>
  )
}

function Group({
  title, items, compMap
}: {
  title: string
  items: Awaited<ReturnType<typeof getTeams>>
  compMap: Map<string, string>
}) {
  if (!items.length) return null
  return (
    <section className="mb-12">
      <h2 className="mb-5 border-l-4 border-club-accent pl-3 font-display text-xl font-bold text-club-primary">
        {title}
      </h2>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map(t => (
          <Link key={t.id} href={`/equipas/${t.id}`} className="card group p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-club-primary text-club-accent">
              <Users size={22} />
            </span>
            <h3 className="mt-4 font-bold text-club-primary group-hover:text-club-accent">{t.name}</h3>
            <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">
              {AGE_LABEL[t.age_group] || t.age_group} · {t.gender}
            </p>
            {t.coach_name && (
              <p className="mt-3 text-sm text-gray-600">
                <span className="font-semibold text-club-dark">Treinador:</span> {t.coach_name}
              </p>
            )}
            {t.competition_id && compMap.get(t.competition_id) && (
              <p className="mt-1 text-sm text-gray-600">
                <span className="font-semibold text-club-dark">Compete em:</span> {compMap.get(t.competition_id)}
              </p>
            )}
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-club-primary">
              Ver plantel <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
