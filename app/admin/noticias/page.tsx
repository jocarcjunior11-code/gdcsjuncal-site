import Link from 'next/link'
import { Plus } from 'lucide-react'
import { getNews } from '@/lib/data'
import { formatNewsDate } from '@/lib/utils'

export default async function AdminNewsPage() {
  const news = await getNews()
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-club-primary">Notícias</h1>
        <Link href="/admin/noticias/nova" className="btn-primary"><Plus size={16} /> Nova notícia</Link>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="table-clean">
          <thead><tr><th>Título</th><th>Categoria</th><th>Data</th><th>Destaque</th><th></th></tr></thead>
          <tbody>
            {news.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-gray-500">Sem notícias.</td></tr>
            ) : news.map(n => (
              <tr key={n.id}>
                <td className="max-w-md truncate">{n.title}</td>
                <td className="text-sm text-gray-600">{n.category || '—'}</td>
                <td className="text-sm">{formatNewsDate(n.published_at)}</td>
                <td>{n.is_featured && <span className="badge bg-club-accent/20 text-club-primary">Destaque</span>}</td>
                <td className="text-right">
                  <Link href={`/admin/noticias/${n.id}`} className="text-sm font-semibold text-club-primary hover:text-club-accent">Editar →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
