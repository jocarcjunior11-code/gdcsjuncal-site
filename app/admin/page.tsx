import Link from 'next/link'
import { Calendar, Newspaper, Trophy, Users, ImageIcon, ArrowRight } from 'lucide-react'
import { getMatches, getNews } from '@/lib/data'

export default async function AdminDashboard() {
  const [matches, news] = await Promise.all([getMatches({ limit: 5 }), getNews({ limit: 3 })])
  const upcoming = matches.filter(m => m.status === 'agendado').length
  const finished = matches.filter(m => m.status === 'terminado').length

  return (
    <>
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold text-club-primary">Painel da direção</h1>
        <p className="mt-2 text-gray-600">Visão geral do que está a acontecer no clube.</p>
      </header>

      <section className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Jogos agendados" value={upcoming} icon={<Calendar />} />
        <StatCard label="Jogos terminados" value={finished} icon={<Trophy />} />
        <StatCard label="Notícias publicadas" value={news.length} icon={<Newspaper />} />
        <StatCard label="Total de jogos" value={matches.length} icon={<ImageIcon />} />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 font-display text-lg font-bold text-club-primary">Ações rápidas</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction href="/admin/jogos/novo" label="Adicionar novo jogo" icon={<Calendar size={18} />} />
          <QuickAction href="/admin/noticias/nova" label="Escrever notícia" icon={<Newspaper size={18} />} />
          <QuickAction href="/admin/media/nova" label="Carregar fotos / vídeos" icon={<ImageIcon size={18} />} />
          <QuickAction href="/admin/inscricoes" label="Ver inscrições pendentes" icon={<Users size={18} />} />
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-lg font-bold text-club-primary">Jogos recentes</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="table-clean">
            <thead>
              <tr>
                <th>Data</th>
                <th>Jogo</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {matches.map(m => (
                <tr key={m.id}>
                  <td>{new Date(m.match_date).toLocaleDateString('pt-PT')}</td>
                  <td>{m.home_team} <span className="text-gray-400">vs</span> {m.away_team}</td>
                  <td>
                    <span className="badge bg-gray-100 capitalize">{m.status.replace('_',' ')}</span>
                  </td>
                  <td className="text-right">
                    <Link href={`/admin/jogos/${m.id}`} className="text-sm font-semibold text-club-primary hover:text-club-accent">
                      Editar →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-club-primary text-club-accent">
        {icon}
      </span>
      <div>
        <p className="font-display text-2xl font-bold text-club-primary">{value}</p>
        <p className="text-xs uppercase tracking-widest text-gray-500">{label}</p>
      </div>
    </div>
  )
}

function QuickAction({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition hover:border-club-accent hover:shadow-md"
    >
      <span className="flex items-center gap-3 text-sm font-semibold text-club-primary">
        {icon} {label}
      </span>
      <ArrowRight size={16} className="text-gray-400 transition group-hover:text-club-accent" />
    </Link>
  )
}
