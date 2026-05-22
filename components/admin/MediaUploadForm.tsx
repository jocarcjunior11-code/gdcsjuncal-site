'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Upload } from 'lucide-react'
import type { Match } from '@/lib/types'

export function MediaUploadForm({ matches }: { matches: Match[] }) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'upload'|'link'>('upload')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setUploading(true)
    setError(null)
    const fd = new FormData(e.currentTarget)

    try {
      const sb = createClient()
      let url = (fd.get('url') as string) || ''

      // Se modo upload, faz upload primeiro
      if (mode === 'upload') {
        const file = (fd.get('file') as File)
        if (!file || file.size === 0) throw new Error('Seleciona um ficheiro.')
        const path = `media/${Date.now()}-${file.name.replace(/\s+/g, '-')}`
        const { error: upErr } = await sb.storage.from('media').upload(path, file)
        if (upErr) throw upErr
        const { data } = sb.storage.from('media').getPublicUrl(path)
        url = data.publicUrl
      }

      const payload = {
        type:      fd.get('type') as string,
        url,
        caption:   (fd.get('caption') as string) || null,
        match_id:  (fd.get('match_id') as string) || null,
        category:  (fd.get('category') as string) || null
      }

      const { error } = await sb.from('media').insert(payload)
      if (error) throw error

      router.push('/admin/media')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card max-w-2xl space-y-5 p-8">
      <div className="flex gap-2">
        <button type="button" onClick={() => setMode('upload')}
          className={`flex-1 rounded-md border px-4 py-2 text-sm font-semibold transition ${mode==='upload' ? 'border-club-primary bg-club-primary text-white' : 'border-gray-200 text-gray-600'}`}>
          <Upload size={14} className="inline mr-1" /> Carregar ficheiro
        </button>
        <button type="button" onClick={() => setMode('link')}
          className={`flex-1 rounded-md border px-4 py-2 text-sm font-semibold transition ${mode==='link' ? 'border-club-primary bg-club-primary text-white' : 'border-gray-200 text-gray-600'}`}>
          🔗 Colar URL (ex: YouTube)
        </button>
      </div>

      <div>
        <label className="lbl">Tipo</label>
        <select name="type" className="inp">
          <option value="photo">Foto</option>
          <option value="video">Vídeo</option>
        </select>
      </div>

      {mode === 'upload' ? (
        <div>
          <label className="lbl">Ficheiro *</label>
          <input name="file" type="file" className="inp" accept="image/*,video/*" required />
          <p className="mt-1 text-xs text-gray-400">
            Nota: requer um bucket Supabase chamado <code>media</code> com acesso público.
          </p>
        </div>
      ) : (
        <div>
          <label className="lbl">URL *</label>
          <input name="url" required className="inp" placeholder="https://… ou link YouTube embed" />
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="lbl">Categoria</label>
          <input name="category" className="inp" placeholder="Jogos, Treinos, Formação, Clube…" />
        </div>
        <div>
          <label className="lbl">Associar a um jogo</label>
          <select name="match_id" className="inp">
            <option value="">— Sem associação —</option>
            {matches.map(m => (
              <option key={m.id} value={m.id}>
                {new Date(m.match_date).toLocaleDateString('pt-PT')} — {m.home_team} vs {m.away_team}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="lbl">Legenda</label>
        <input name="caption" className="inp" placeholder="Descrição curta da foto/vídeo" />
      </div>

      {error && <p className="text-sm text-club-red">{error}</p>}

      <button type="submit" disabled={uploading} className="btn-primary">
        {uploading ? 'A carregar…' : 'Guardar'}
      </button>

      <style jsx>{`
        .lbl { display:block; font-size:.875rem; font-weight:600; color:#06182B; margin-bottom:.25rem; }
        .inp { width:100%; border:1px solid #e5e7eb; border-radius:.375rem; padding:.55rem .75rem; font-size:.875rem; }
        .inp:focus { outline:none; border-color:#0B2545; box-shadow:0 0 0 3px rgba(11,37,69,.1); }
      `}</style>
    </form>
  )
}
