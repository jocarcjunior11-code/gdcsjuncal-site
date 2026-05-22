import Link from 'next/link'
import { Trophy, ArrowRight } from 'lucide-react'
import { getCompetitions } from '@/lib/data'

export const metadata = {
  title: 'Competições',
  description: 'Competições de ténis de mesa do Grupo Desportivo Centro Social do Juncal.'
}

export default async function CompetitionsPage() {
  const competitions = await getCompetitions()

  const masculinas = competitions.filter(c => c.gender === 'masculino')
  const femininas  = competitions.filter(c => c.gender === 'feminino')
  const formacao   = competitions.filter(c => c.age_group !== 'senior')

  return (
    <div className="container-wide py-12">
      <header className="mb-10">
        <span className="eyebrow">Ténis de Mesa</span>
        <h1 className="section-title mt-2">Competições</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Acompanha todas as competições onde o GD Juncal está presente — seniores masculinos,
          seniores femininos e formação.
        </p>
      </header>

      <Group title="Masculinos" items={masculinas} />
      <Group title="Femininos"  items={femininas} />
      <Group title="Formação"   items={formacao} />
    </div>
  )
}

function Group({ title, items }: { title: string; items: Awaited<ReturnType<typeof getCompetitions>> }) {
  if (!items.length) return null
  return (
    <section className="mb-12">
      <h2 className="mb-5 border-l-4 border-club-accent pl-3 font-display text-xl font-bold text-club-primary">
        {title}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map(c => (
          <Link key={c.id} href={`/competicoes/${c.slug}`} className="card group p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-club-primary text-club-accent">
                <Trophy size={22} />
              </span>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-gray-400">Temporada {c.season}</p>
                <h3 className="mt-1 font-bold text-club-primary group-hover:text-club-accent">{c.name}</h3>
                {c.description && (
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{c.description}</p>
                )}
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-club-primary">
                  Ver classificação <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
