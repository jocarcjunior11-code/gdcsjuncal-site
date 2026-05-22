import Link from 'next/link'
import { getTeams } from '@/lib/data'

export default async function AdminTeamsPage() {
  const teams = await getTeams()
  return (
    <>
      <h1 className="mb-8 font-display text-3xl font-bold text-club-primary">Equipas</h1>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="table-clean">
          <thead><tr><th>Equipa</th><th>Escalão</th><th>Treinador</th><th></th></tr></thead>
          <tbody>
            {teams.map(t => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td className="text-sm">{t.gender} · {t.age_group}</td>
                <td className="text-sm">{t.coach_name || '—'}</td>
                <td className="text-right">
                  <Link href={`/equipas/${t.id}`} className="text-sm font-semibold text-club-primary hover:text-club-accent">Ver pública →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
