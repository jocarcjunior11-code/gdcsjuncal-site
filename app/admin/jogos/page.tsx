import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getMatches, getCompetitions, getMatchResult } from '@/lib/data'

export default async function AdminMatchesPage() {
  const [matches, competitions] = await Promise.all([getMatches(), getCompetitions()])
  const compMap = new Map(competitions.map(c => [c.id, c.name]))

  const resultsMap = new Map<string, { home_score: number; away_score: number }>()
  await Promise.all(
    matches.map(async m => {
      const r = await getMatchResult(m.id)
      if (r) resultsMap.set(m.id, r)
    })
  )

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-club-primary">Jogos</h1>
        <Link href="/admin/jogos/novo" className="btn-primary">
          <Plus size={16} /> Novo jogo
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="table-clean">
          <thead>
            <tr>
              <th>Data</th>
              <th>Competição</th>
              <th>Jogo</th>
              <th>Resultado</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {matches.length === 0 ? (
              <tr><td colSpan={6} className="py-8 text-center text-gray-500">Sem jogos registados.</td></tr>
            ) : (
              matches.map(m => {
                const r = resultsMap.get(m.id)
                return (
                  <tr key={m.id}>
                    <td>{new Date(m.match_date).toLocaleDateString('pt-PT')}</td>
                    <td className="text-sm text-gray-600">{compMap.get(m.competition_id) || '—'}</td>
                    <td>{m.home_team} <span className="text-gray-400">vs</span> {m.away_team}</td>
                    <td className="font-bold text-club-primary">
                      {r ? `${r.home_score} — ${r.away_score}` : '—'}
                    </td>
                    <td><span className="badge bg-gray-100 capitalize">{m.status.replace('_',' ')}</span></td>
                    <td className="text-right">
                      <Link href={`/admin/jogos/${m.id}`} className="text-sm font-semibold text-club-primary hover:text-club-accent">
                        Editar →
                      </Link>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
