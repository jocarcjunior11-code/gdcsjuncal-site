import Link from 'next/link'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { getMedia } from '@/lib/data'

export default async function AdminMediaPage() {
  const media = await getMedia()
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-club-primary">Media</h1>
        <Link href="/admin/media/nova" className="btn-primary"><Plus size={16} /> Carregar nova</Link>
      </div>

      {media.length === 0 ? (
        <p className="text-gray-500">Sem fotos ou vídeos carregados.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {media.map(m => (
            <div key={m.id} className="card overflow-hidden">
              <div className="relative aspect-square bg-gray-100">
                <Image src={m.thumbnail_url || m.url} alt={m.caption || ''} fill className="object-cover" />
              </div>
              <div className="p-3 text-xs">
                <p className="font-semibold text-club-primary line-clamp-1">{m.caption || 'Sem legenda'}</p>
                <p className="mt-1 text-gray-500">{m.category || 'Sem categoria'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
