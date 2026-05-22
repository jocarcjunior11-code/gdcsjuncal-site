'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Plus, Trash2 } from 'lucide-react'
import type { Competition, Match, MatchGame, MatchResult, Team } from '@/lib/types'

interface Props {
  match: Match
  result: MatchResult | null
  games: MatchGame[]
  competitions: Competition[]
  teams: Team[]
}

export function MatchEditor({ match, result, games: initialGames, competitions, teams }: Props) {
  const router = useRouter()
  const [tab, setTab] = useState<'detalhes'|'resultado'|'encontros'>('detalhes')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  // Estado de resultado
  const [homeScore, setHomeScore] = useState(result?.home_score ?? 0)
  const [awayScore, setAwayScore] = useState(result?.away_score ?? 0)

  // Estado de encontros
  const [games, setGames] = useState<Array<Partial<MatchGame> & { tempId: string }>>(
    initialGames.map(g => ({ ...g, tempId: g.id }))
  )

  function saveDetails(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
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
      summary:        (fd.get('summary') as string) || null
    }
    ;(async () => {
      try {
        const sb = createClient()
        const { error } = await sb.from('matches').update(payload).eq('id', match.id)
        if (error) throw error
        setMsg('✅ Detalhes guardados.')
        router.refresh()
      } catch (err: any) {
        setMsg('❌ ' + (err.message || 'Erro ao guardar.'))
      } finally {
        setSaving(false)
      }
    })()
  }

  async function saveResult() {
    setSaving(true)
    setMsg(null)
    try {
      const sb = createClient()
      const { error } = await sb
        .from('match_results')
        .upsert({ match_id: match.id, home_score: homeScore, away_score: awayScore })
      if (error) throw error
      // Marca jogo como terminado
      await sb.from('matches').update({ status: 'terminado' }).eq('id', match.id)
      setMsg('✅ Resultado guardado.')
      router.refresh()
    } catch (err: any) {
      setMsg('❌ ' + (err.message || 'Erro ao guardar.'))
    } finally {
      setSaving(false)
    }
  }

  function addGame() {
    setGames(prev => [
      ...prev,
      { tempId: 'new-' + Date.now(), match_id: match.id, game_order: prev.length + 1, home_player: '', away_player: '', sets: [], home_sets_won: 0, away_sets_won: 0 }
    ])
  }

  function updateGame(i: number, patch: Partial<MatchGame>) {
    setGames(prev => prev.map((g, idx) => idx === i ? { ...g, ...patch } : g))
  }

  function updateSet(i: number, setIndex: number, key: 'home'|'away', val: number) {
    setGames(prev => prev.map((g, idx) => {
      if (idx !== i) return g
      const sets = [...((g.sets as any) || [])]
      sets[setIndex] = { ...(sets[setIndex] || { home: 0, away: 0 }), [key]: val }
      const homeWins = sets.filter(s => s.home > s.away).length
      const awayWins = sets.filter(s => s.away > s.home).length
      return { ...g, sets, home_sets_won: homeWins, away_sets_won: awayWins }
    }))
  }

  function addSet(i: number) {
    setGames(prev => prev.map((g, idx) => idx === i ? { ...g, sets: [...((g.sets as any) || []), { home: 0, away: 0 }] } : g))
  }

  function removeGame(i: number) {
    setGames(prev => prev.filter((_, idx) => idx !== i))
  }

  async function saveGames() {
    setSaving(true)
    setMsg(null)
    try {
      const sb = createClient()
      // Apaga existentes e re-insere (simples e robusto para um clube)
      await sb.from('match_games').delete().eq('match_id', match.id)
      const inserts = games.map((g, idx) => ({
        match_id: match.id,
        game_order: idx + 1,
        home_player: g.home_player,
        away_player: g.away_player,
        sets: g.sets || [],
        home_sets_won: g.home_sets_won || 0,
        away_sets_won: g.away_sets_won || 0
      }))
      if (inserts.length) {
        const { error } = await sb.from('match_games').insert(inserts)
        if (error) throw error
      }
      setMsg('✅ Encontros guardados.')
      router.refresh()
    } catch (err: any) {
      setMsg('❌ ' + (err.message || 'Erro ao guardar.'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6 flex gap-2 border-b border-gray-200">
        {(['detalhes','resultado','encontros'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold transition ${
              tab === t ? 'border-club-accent text-club-primary' : 'border-transparent text-gray-500 hover:text-club-primary'
            }`}
          >
            {t === 'detalhes' ? 'Detalhes' : t === 'resultado' ? 'Resultado final' : 'Encontros individuais'}
          </button>
        ))}
      </div>

      {msg && <p className="mb-4 text-sm">{msg}</p>}

      {tab === 'detalhes' && (
        <form onSubmit={saveDetails} className="card space-y-5 p-6">
          <div>
            <label className="lbl">Competição</label>
            <select name="competition_id" required className="inp" defaultValue={match.competition_id}>
              {competitions.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div><label className="lbl">Casa</label><input name="home_team" className="inp" defaultValue={match.home_team} /></div>
            <div><label className="lbl">Visitante</label><input name="away_team" className="inp" defaultValue={match.away_team} /></div>
          </div>
          <div>
            <label className="lbl">Equipa do clube</label>
            <select name="home_team_id" className="inp" defaultValue={match.home_team_id || ''}>
              <option value="">— Sem associação —</option>
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div><label className="lbl">Data e hora</label>
              <input name="match_date" type="datetime-local" className="inp"
                defaultValue={match.match_date?.slice(0, 16)} />
            </div>
            <div><label className="lbl">Jornada</label><input name="round_number" type="number" className="inp" defaultValue={match.round_number || ''} /></div>
            <div><label className="lbl">Estado</label>
              <select name="status" className="inp" defaultValue={match.status}>
                <option value="agendado">Agendado</option>
                <option value="em_curso">Em curso</option>
                <option value="terminado">Terminado</option>
                <option value="adiado">Adiado</option>
              </select>
            </div>
          </div>
          <div><label className="lbl">Local</label><input name="location" className="inp" defaultValue={match.location || ''} /></div>
          <div><label className="lbl">Resumo / reflexão</label><textarea name="summary" rows={5} className="inp" defaultValue={match.summary || ''} /></div>

          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'A guardar…' : 'Guardar detalhes'}
          </button>

          <style jsx>{`
            .lbl { display:block; font-size:.875rem; font-weight:600; color:#06182B; margin-bottom:.25rem; }
            .inp { width:100%; border:1px solid #e5e7eb; border-radius:.375rem; padding:.55rem .75rem; font-size:.875rem; }
            .inp:focus { outline:none; border-color:#0B2545; box-shadow:0 0 0 3px rgba(11,37,69,.1); }
          `}</style>
        </form>
      )}

      {tab === 'resultado' && (
        <div className="card space-y-6 p-6">
          <p className="text-sm text-gray-600">
            Indica o resultado final do jogo. Será mostrado a verde como “Terminado” no site.
          </p>
          <div className="grid grid-cols-3 items-center gap-4">
            <div className="text-center">
              <p className="text-sm font-semibold text-club-primary">{match.home_team}</p>
              <input type="number" min={0} value={homeScore} onChange={e => setHomeScore(Number(e.target.value))}
                className="mt-2 w-full rounded border border-gray-200 px-3 py-2 text-center font-display text-3xl font-bold" />
            </div>
            <p className="text-center font-display text-3xl text-gray-300">—</p>
            <div className="text-center">
              <p className="text-sm font-semibold text-club-primary">{match.away_team}</p>
              <input type="number" min={0} value={awayScore} onChange={e => setAwayScore(Number(e.target.value))}
                className="mt-2 w-full rounded border border-gray-200 px-3 py-2 text-center font-display text-3xl font-bold" />
            </div>
          </div>
          <button onClick={saveResult} disabled={saving} className="btn-primary">
            {saving ? 'A guardar…' : 'Guardar resultado'}
          </button>
        </div>
      )}

      {tab === 'encontros' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Adiciona cada encontro individual com os jogadores e os sets disputados (ex: 11-8, 11-6, 9-11, 11-9).
          </p>
          {games.map((g, i) => (
            <div key={g.tempId} className="card space-y-3 p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-club-accent">Encontro {i + 1}</p>
                <button onClick={() => removeGame(i)} className="text-club-red hover:underline text-xs flex items-center gap-1">
                  <Trash2 size={14} /> Remover
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input className="inp2" placeholder="Jogador da casa" value={g.home_player || ''} onChange={e => updateGame(i, { home_player: e.target.value })} />
                <input className="inp2" placeholder="Jogador visitante" value={g.away_player || ''} onChange={e => updateGame(i, { away_player: e.target.value })} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {((g.sets as any) || []).map((s: any, sIdx: number) => (
                  <div key={sIdx} className="flex items-center gap-1">
                    <input type="number" value={s.home} onChange={e => updateSet(i, sIdx, 'home', Number(e.target.value))}
                      className="w-14 rounded border border-gray-200 px-2 py-1 text-center text-sm" />
                    <span className="text-gray-400">-</span>
                    <input type="number" value={s.away} onChange={e => updateSet(i, sIdx, 'away', Number(e.target.value))}
                      className="w-14 rounded border border-gray-200 px-2 py-1 text-center text-sm" />
                  </div>
                ))}
                <button onClick={() => addSet(i)} className="text-xs font-semibold text-club-primary hover:text-club-accent flex items-center gap-1">
                  <Plus size={12} /> Adicionar set
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Sets ganhos: <strong>{g.home_sets_won}</strong> — <strong>{g.away_sets_won}</strong>
              </p>
            </div>
          ))}

          <button onClick={addGame} className="btn-secondary">
            <Plus size={16} /> Adicionar encontro
          </button>

          <div className="mt-4">
            <button onClick={saveGames} disabled={saving} className="btn-primary">
              {saving ? 'A guardar…' : 'Guardar encontros'}
            </button>
          </div>

          <style jsx>{`
            .inp2 { width:100%; border:1px solid #e5e7eb; border-radius:.375rem; padding:.5rem .75rem; font-size:.875rem; }
            .inp2:focus { outline:none; border-color:#0B2545; box-shadow:0 0 0 3px rgba(11,37,69,.1); }
          `}</style>
        </div>
      )}
    </div>
  )
}
