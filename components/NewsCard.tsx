import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import { formatNewsDate } from '@/lib/utils'

interface NewsCardProps {
  slug: string
  title: string
  excerpt?: string | null
  coverImageUrl?: string | null
  category?: string | null
  publishedAt: string
  variant?: 'default' | 'featured'
}

export function NewsCard({ slug, title, excerpt, coverImageUrl, category, publishedAt, variant = 'default' }: NewsCardProps) {
  if (variant === 'featured') {
    return (
      <Link href={`/noticias/${slug}`} className="group relative block overflow-hidden rounded-xl">
        <div className="aspect-[16/9] relative bg-club-primary">
          {coverImageUrl && (
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-club-dark/85 via-club-dark/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          {category && <span className="eyebrow">{category}</span>}
          <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold leading-tight text-white">{title}</h3>
          {excerpt && <p className="mt-2 max-w-2xl text-sm text-white/80 line-clamp-2">{excerpt}</p>}
          <p className="mt-3 text-xs text-white/60 flex items-center gap-2">
            <Calendar size={12} /> {formatNewsDate(publishedAt)}
          </p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/noticias/${slug}`} className="card block overflow-hidden">
      <div className="aspect-[16/9] relative bg-gray-100">
        {coverImageUrl && (
          <Image src={coverImageUrl} alt={title} fill sizes="(min-width: 768px) 400px, 100vw" className="object-cover" />
        )}
      </div>
      <div className="p-5">
        {category && <span className="eyebrow">{category}</span>}
        <h3 className="mt-2 text-lg font-bold text-club-primary line-clamp-2">{title}</h3>
        {excerpt && <p className="mt-2 text-sm text-gray-600 line-clamp-3">{excerpt}</p>}
        <p className="mt-3 text-xs text-gray-400 flex items-center gap-2">
          <Calendar size={12} /> {formatNewsDate(publishedAt)}
        </p>
      </div>
    </Link>
  )
}
