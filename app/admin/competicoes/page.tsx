import Link from 'next/link'
import { getCompetitions } from '@/lib/data'

export default async function AdminCompetitionsPage() {
  const comps = await getCompetitions()
  return (
    <>
      <h1 className="mb-8 font-display text-3xl font-bold text-club-primary">Competições</h1>
      <p className="mb-6 text-sm text-gray-600">
        As competições e classificações podem ser geridas diretamente no Supabase (tabelas <code>competitions</code> e <code>competition_standings</code>).
        Nesta versão inicial mostramos a lista para referência rápida.
      </p>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="table-clean">
          <thead><tr><th>Nome</th><th>Categoria</th><th>Temporada</th><th></th></tr></thead>
          <tbody>
            {comps.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td className="text-sm">{c.gender} · {c.age_group}</td>
                <td className="text-sm">{c.season}</td>
                <td className="text-right">
                  <Link href={`/competicoes/${c.slug}`} className="text-sm font-semibold text-club-primary hover:text-club-accent">
                    Ver pública →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
