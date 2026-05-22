'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { slugify } from '@/lib/utils'
import type { News } from '@/lib/types'

interface Props {
  initial?: News
}

export function NewsForm({ initial }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState(initial?.title || '')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const payload = {
      title:           fd.get('title') as string,
      slug:            slugify(fd.get('title') as string),
      excerpt:         (fd.get('excerpt') as string) || null,
      content:         fd.get('content') as string,
      cover_image_url: (fd.get('cover_image_url') as string) || null,
      category:        (fd.get('category') as string) || null,
      author:          (fd.get('author') as string) || null,
      is_featured:     fd.get('is_featured') === 'on'
    }
    try {
      const sb = createClient()
      if (initial) {
        const { error } = await sb.from('news').update(payload).eq('id', initial.id)
        if (error) throw error
      } else {
        const { error } = await sb.from('news').insert(payload)
        if (error) throw error
      }
      router.push('/admin/noticias')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Erro ao guardar.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card max-w-3xl space-y-5 p-8">
      <div>
        <label className="lbl">Título *</label>
        <input name="title" required className="inp" value={title} onChange={e => setTitle(e.target.value)} />
        <p className="mt-1 text-xs text-gray-400">URL: /noticias/{title ? slugify(title) : 'slug-gerado'}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div><label className="lbl">Categoria</label>
          <input name="category" className="inp" defaultValue={initial?.category || ''} placeholder="Ténis de Mesa, Ginásio, Formação…" />
        </div>
        <div><label className="lbl">Autor</label>
          <input name="author" className="inp" defaultValue={initial?.author || 'Direção GD Juncal'} />
        </div>
      </div>

      <div>
        <label className="lbl">Imagem de capa (URL)</label>
        <input name="cover_image_url" className="inp" defaultValue={initial?.cover_image_url || ''} placeholder="https://…" />
      </div>

      <div>
        <label className="lbl">Resumo curto</label>
        <textarea name="excerpt" rows={2} className="inp" defaultValue={initial?.excerpt || ''} placeholder="Uma ou duas frases que aparecem na lista de notícias." />
      </div>

      <div>
        <label className="lbl">Conteúdo *</label>
        <textarea name="content" required rows={12} className="inp" defaultValue={initial?.content || ''} />
        <p className="mt-1 text-xs text-gray-400">Podes escrever em parágrafos separados por linhas em branco.</p>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_featured" defaultChecked={initial?.is_featured} />
        Marcar como destaque (aparece em maior na homepage)
      </label>

      {error && <p className="text-sm text-club-red">{error}</p>}

      <button type="submit" disabled={saving} className="btn-primary">
        {saving ? 'A guardar…' : initial ? 'Guardar alterações' : 'Publicar notícia'}
      </button>

      <style jsx>{`
        .lbl { display:block; font-size:.875rem; font-weight:600; color:#06182B; margin-bottom:.25rem; }
        .inp { width:100%; border:1px solid #e5e7eb; border-radius:.375rem; padding:.55rem .75rem; font-size:.875rem; }
        .inp:focus { outline:none; border-color:#0B2545; box-shadow:0 0 0 3px rgba(11,37,69,.1); }
      `}</style>
    </form>
  )
}
