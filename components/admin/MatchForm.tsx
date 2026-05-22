'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { Competition, Team } from '@/lib/types'

export function MatchForm({ competitions, teams }: { competitions: Competition[]; teams: Team[] }) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const fd = new FormData(e.currentTarget)
    const payload = {
      competition_id: fd.get('competition_id') as string,
      home_team:      fd.get('home_team') as string,
      away_team:      fd.get('away_team') as string,
      home_team_id:   (fd.get('home_team_id') as string) || null,
      match_date:     fd.get('match_date') as string,
      location:       fd.get('location') as string,
      round_number:   Number(fd.get('round_number')) || null,
      status:         fd.get('status') as string,
      summary:        (fd.get('summary') as string) || null,
      is_home:        (fd.get('home_team') as string).includes('Juncal')
    }
    try {
      const sb = createClient()
      const { data, error } = await sb.from('matches').insert(payload).select().single()
      if (error) throw error
      router.push(`/admin/jogos/${data.id}`)
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Erro ao criar o jogo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card max-w-3xl space-y-5 p-8">
      <div>
        <label className="lbl">Competição *</label>
        <select name="competition_id" required className="inp">
          {competitions.map(c => <option key={c.id} value={c.id}>{c.name} — {c.season}</option>)}
        </select>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="lbl">Equipa da casa *</label>
          <input name="home_team" required className="inp" placeholder="GD Juncal" />
        </div>
        <div>
          <label className="lbl">Equipa visitante *</label>
          <input name="away_team" required className="inp" placeholder="Adversário" />
        </div>
      </div>

      <div>
        <label className="lbl">Equipa do clube (associar plantel)</label>
        <select name="home_team_id" className="inp">
          <option value="">— Sem associação —</option>
          {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className="lbl">Data e hora *</label>
          <input name="match_date" type="datetime-local" required className="inp" />
        </div>
        <div>
          <label className="lbl">Jornada</label>
          <input name="round_number" type="number" className="inp" />
        </div>
        <div>
          <label className="lbl">Estado *</label>
          <select name="status" required className="inp">
            <option value="agendado">Agendado</option>
            <option value="em_curso">Em curso</option>
            <option value="terminado">Terminado</option>
            <option value="adiado">Adiado</option>
          </select>
        </div>
      </div>

      <div>
        <label className="lbl">Local</label>
        <input name="location" className="inp" placeholder="Pavilhão GD Juncal — Juncal" />
      </div>

      <div>
        <label className="lbl">Resumo / reflexão do jogo</label>
        <textarea name="summary" rows={5} className="inp" placeholder="Adiciona aqui um texto institucional sobre o jogo (opcional)." />
      </div>

      {error && <p className="text-sm text-club-red">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary">
        {submitting ? 'A criar…' : 'Criar jogo'}
      </button>

      <style jsx>{`
        .lbl { display:block; font-size:.875rem; font-weight:600; color:#06182B; margin-bottom:.25rem; }
        .inp { width:100%; border:1px solid #e5e7eb; border-radius:.375rem; padding:.55rem .75rem; font-size:.875rem; }
        .inp:focus { outline:none; border-color:#0B2545; box-shadow:0 0 0 3px rgba(11,37,69,.1); }
      `}</style>
    </form>
  )
}
