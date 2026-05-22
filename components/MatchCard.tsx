import Link from 'next/link'
import { Calendar, MapPin, Trophy } from 'lucide-react'
import { formatMatchDate } from '@/lib/utils'

interface MatchCardProps {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore?: number | null
  awayScore?: number | null
  date: string
  location?: string | null
  competition?: string | null
  status: 'agendado' | 'em_curso' | 'terminado' | 'adiado'
  isHome?: boolean
}

export function MatchCard(props: MatchCardProps) {
  const { id, homeTeam, awayTeam, homeScore, awayScore, date, location, competition, status } = props
  const isFinished = status === 'terminado'

  return (
    <Link href={`/jogos/${id}`} className="card block overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 bg-club-light/40 px-4 py-2 text-xs">
        <div className="flex items-center gap-2 text-club-primary">
          <Trophy size={14} />
          <span className="font-semibold uppercase tracking-wide">{competition || 'Competição'}</span>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-3 items-center gap-2 p-5">
        <div className="text-center">
          <p className="text-sm font-semibold text-club-dark line-clamp-2">{homeTeam}</p>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-gray-400">Casa</p>
        </div>

        <div className="text-center">
          {isFinished && homeScore != null && awayScore != null ? (
            <div className="font-display text-3xl font-bold text-club-primary">
              {homeScore} <span className="text-gray-300">—</span> {awayScore}
            </div>
          ) : (
            <div>
              <p className="font-display text-xl font-bold text-club-primary">VS</p>
              <p className="mt-1 text-[11px] text-gray-500">{formatMatchDate(date)}</p>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-club-dark line-clamp-2">{awayTeam}</p>
          <p className="mt-1 text-[10px] uppercase tracking-widest text-gray-400">Fora</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-gray-100 px-4 py-2 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Calendar size={12} /> {formatMatchDate(date)}
        </span>
        {location && (
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {location}
          </span>
        )}
      </div>
    </Link>
  )
}

function StatusBadge({ status }: { status: MatchCardProps['status'] }) {
  const map = {
    agendado:   { label: 'Agendado',  cls: 'bg-blue-100 text-blue-700' },
    em_curso:   { label: 'Em curso',  cls: 'bg-amber-100 text-amber-700 animate-pulse' },
    terminado:  { label: 'Terminado', cls: 'bg-emerald-100 text-emerald-700' },
    adiado:     { label: 'Adiado',    cls: 'bg-gray-200 text-gray-700' }
  } as const
  const s = map[status]
  return <span className={`badge ${s.cls}`}>{s.label}</span>
}
