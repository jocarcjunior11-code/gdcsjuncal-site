import { getNews } from '@/lib/data'
import { NewsCard } from '@/components/NewsCard'

export const metadata = {
  title: 'Notícias',
  description: 'Notícias e atualizações do Grupo Desportivo Centro Social do Juncal.'
}

export default async function NewsListPage() {
  const news = await getNews()

  return (
    <div className="container-wide py-12">
      <header className="mb-10">
        <span className="eyebrow">Atualidade</span>
        <h1 className="section-title mt-2">Notícias do clube</h1>
        <p className="mt-3 max-w-2xl text-gray-600">
          Resultados, eventos, formação e tudo o que se passa no GD Juncal.
        </p>
      </header>

      {news.length === 0 ? (
        <p className="text-gray-500">Ainda não há notícias publicadas.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map(n => (
            <NewsCard
              key={n.id}
              slug={n.slug}
              title={n.title}
              excerpt={n.excerpt}
              coverImageUrl={n.cover_image_url}
              category={n.category}
              publishedAt={n.published_at}
            />
          ))}
        </div>
      )}
    </div>
  )
}
