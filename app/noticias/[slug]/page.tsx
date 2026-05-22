import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, User } from 'lucide-react'
import { getNewsBySlug, getNews } from '@/lib/data'
import { NewsCard } from '@/components/NewsCard'
import { formatNewsDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function NewsArticlePage({ params }: { params: { slug: string } }) {
  const article = await getNewsBySlug(params.slug)
  if (!article) notFound()

  const all = await getNews({ limit: 4 })
  const related = all.filter(n => n.slug !== article.slug).slice(0, 3)

  return (
    <article className="container-wide py-12">
      <Link href="/noticias" className="text-sm text-gray-500 hover:text-club-primary">
        ← Notícias
      </Link>

      <header className="mt-3 mb-8">
        {article.category && <span className="eyebrow">{article.category}</span>}
        <h1 className="mt-2 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-club-primary leading-tight">
          {article.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {formatNewsDate(article.published_at)}
          </span>
          {article.author && (
            <span className="flex items-center gap-1">
              <User size={14} /> {article.author}
            </span>
          )}
        </div>
      </header>

      {article.cover_image_url && (
        <div className="relative mb-8 aspect-[16/8] w-full overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose-styled mx-auto max-w-3xl whitespace-pre-line text-base leading-relaxed text-gray-700">
        {article.content}
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-gray-100 pt-10">
          <h2 className="mb-6 font-display text-xl font-bold text-club-primary">
            Mais notícias
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map(n => (
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
        </section>
      )}
    </article>
  )
}
