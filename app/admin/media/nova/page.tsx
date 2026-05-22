import { MediaUploadForm } from '@/components/admin/MediaUploadForm'
import { getMatches } from '@/lib/data'

export const metadata = { title: 'Carregar media', robots: { index: false } }

export default async function NewMediaPage() {
  const matches = await getMatches()
  return (
    <>
      <h1 className="mb-8 font-display text-3xl font-bold text-club-primary">Carregar foto ou vídeo</h1>
      <MediaUploadForm matches={matches} />
    </>
  )
}
