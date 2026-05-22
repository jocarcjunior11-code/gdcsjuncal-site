import { createServerSupabaseClient } from '@/lib/supabase-server'
import { formatShortDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

async function fetchInscriptions() {
  try {
    const sb = createServerSupabaseClient()
    const [gym, tt] = await Promise.all([
      sb.from('gym_inscriptions').select('*').order('created_at', { ascending: false }),
      sb.from('tt_inscriptions').select('*').order('created_at', { ascending: false })
    ])
    return { gym: gym.data || [], tt: tt.data || [] }
  } catch {
    return { gym: [], tt: [] }
  }
}

export default async function AdminInscriptionsPage() {
  const { gym, tt } = await fetchInscriptions()

  return (
    <>
      <h1 className="mb-8 font-display text-3xl font-bold text-club-primary">Inscrições</h1>

      <section className="mb-12">
        <h2 className="mb-4 border-l-4 border-club-accent pl-3 font-display text-xl font-bold text-club-primary">
          Ginásio
        </h2>
        <Table rows={gym} columns={['Nome','Email','Telefone','Plano','Data','Contactado']} type="gym" />
      </section>

      <section>
        <h2 className="mb-4 border-l-4 border-club-accent pl-3 font-display text-xl font-bold text-club-primary">
          Ténis de Mesa
        </h2>
        <Table rows={tt} columns={['Nome','Encarregado','Telefone','Experiência','Data','Contactado']} type="tt" />
      </section>
    </>
  )
}

function Table({ rows, columns, type }: { rows: any[]; columns: string[]; type: 'gym'|'tt' }) {
  if (rows.length === 0) {
    return <p className="text-gray-500">Sem inscrições — assim que alguém preencher o formulário, aparece aqui.</p>
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="table-clean">
        <thead><tr>{columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.full_name}</td>
              {type === 'gym' ? (
                <>
                  <td className="text-sm">{r.email}</td>
                  <td className="text-sm">{r.phone}</td>
                  <td className="text-sm">{r.plan || '—'}</td>
                </>
              ) : (
                <>
                  <td className="text-sm">{r.guardian_name || '—'}</td>
                  <td className="text-sm">{r.phone}</td>
                  <td className="text-sm">{r.experience || '—'}</td>
                </>
              )}
              <td className="text-sm">{formatShortDate(r.created_at)}</td>
              <td>
                <span className={`badge ${r.contacted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {r.contacted ? 'Sim' : 'Pendente'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
