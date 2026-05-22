import Image from 'next/image'
import { getMedia } from '@/lib/data'

export const metadata = {
  title: 'Galeria',
  description: 'Galeria de fotos e vídeos do GD Juncal.'
}

export default async function MediaPage() {
  const media = await getMedia()

  // Agrupar por categoria
  const byCategory = media.reduce<Record<string, typeof media>>((acc, m) => {
    const k = m.category || 'Outros'
    acc[k] = acc[k] || []
    acc[k].push(m)
    return acc
  }, {})

  return (
    <div className="container-wide py-12">
      <header className="mb-10">
        <span className="eyebrow">Arquivo visual</span>
        <h1 className="section-title mt-2">Galeria</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Fotografias e vídeos dos jogos, treinos, eventos e momentos do clube.
        </p>
      </header>

      {Object.keys(byCategory).length === 0 ? (
        <p className="text-gray-500">Sem media disponível.</p>
      ) : (
        Object.entries(byCategory).map(([category, items]) => (
          <section key={category} className="mb-12">
            <h2 className="mb-5 border-l-4 border-club-accent pl-3 font-display text-xl font-bold text-club-primary">
              {category}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {items.map(m => (
                <a
                  key={m.id}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden rounded-lg bg-gray-100"
                >
                  <Image
                    src={m.thumbnail_url || m.url}
                    alt={m.caption || ''}
                    fill
                    sizes="(min-width: 1024px) 300px, 50vw"
                    className="object-cover transition group-hover:scale-105"
                  />
                  {m.type === 'video' && (
                    <span className="absolute right-2 top-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                      Vídeo
                    </span>
                  )}
                  {m.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs text-white opacity-0 transition group-hover:opacity-100">
                      {m.caption}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
