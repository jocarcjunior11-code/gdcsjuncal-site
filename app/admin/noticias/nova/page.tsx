import { NewsForm } from '@/components/admin/NewsForm'

export const metadata = { title: 'Nova notícia', robots: { index: false } }

export default function NewNewsPage() {
  return (
    <>
      <h1 className="mb-8 font-display text-3xl font-bold text-club-primary">Nova notícia</h1>
      <NewsForm />
    </>
  )
}
