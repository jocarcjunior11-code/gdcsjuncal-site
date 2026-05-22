import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { demoNews } from '@/lib/demo-data'
import { NewsForm } from '@/components/admin/NewsForm'
import type { News } from '@/lib/types'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Editar notícia', robots: { index: false } }

async function getNewsById(id: string): Promise<News | null> {
  try {
    const sb = createServerSupabaseClient()
    const { data } = await sb.from('news').select('*').eq('id', id).maybeSingle()
    if (data) return data as News
  } catch {}
  return demoNews.find(n => n.id === id) || null
}

export default async function EditNewsPage({ params }: { params: { id: string } }) {
  const news = await getNewsById(params.id)
  if (!news) notFound()
  return (
    <>
      <h1 className="mb-8 font-display text-3xl font-bold text-club-primary">Editar notícia</h1>
      <NewsForm initial={news} />
    </>
  )
}
