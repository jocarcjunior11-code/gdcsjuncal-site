import Link from 'next/link'
import { Check, Clock, Dumbbell, MapPin, Phone, User } from 'lucide-react'
import { clubConfig } from '@/lib/club-config'
import { getGymTrainers, getGymPlans, getGymClasses } from '@/lib/data'

export const metadata = {
  title: 'Ginásio',
  description: 'Ginásio do Grupo Desportivo Centro Social do Juncal — horários, planos, PTs e inscrições.'
}

const WEEKDAY_ORDER = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo']

export default async function GymPage() {
  const [trainers, plans, classes] = await Promise.all([
    getGymTrainers(), getGymPlans(), getGymClasses()
  ])

  // Agrupar aulas por dia
  const byDay = classes.reduce<Record<string, typeof classes>>((acc, c) => {
    acc[c.weekday] = acc[c.weekday] || []
    acc[c.weekday].push(c)
    return acc
  }, {})

  return (
    <>
      {/* Hero do ginásio */}
      <section className="bg-club-primary text-white">
        <div className="container-wide grid items-center gap-10 py-16 md:grid-cols-2">
          <div>
            <span className="eyebrow text-club-accent">{clubConfig.gym.name}</span>
            <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold text-white">
              Treina em casa do clube.
            </h1>
            <p className="mt-4 max-w-xl text-white/80">
              Equipamento renovado, três personal trainers certificados, aulas semanais
              e horários alargados para encaixar na tua rotina.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/inscricoes/ginasio" className="btn-accent">Inscreve-te agora</Link>
              <a href={`tel:${clubConfig.contact.phone}`} className="btn-secondary border-white text-white hover:bg-white hover:text-club-primary">
                <Phone size={16} /> {clubConfig.contact.phone}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Stat label="Plano sócio" value={clubConfig.gym.pricing.monthly} />
            <Stat label="Plano estudante" value={clubConfig.gym.pricing.student} />
            <Stat label="Plano família" value={clubConfig.gym.pricing.family} />
            <Stat label="Plano anual" value={clubConfig.gym.pricing.annual} />
          </div>
        </div>
      </section>

      {/* Horários */}
      <section className="border-b border-gray-100 bg-club-light">
        <div className="container-wide grid gap-4 py-8 md:grid-cols-3">
          <HoursBlock label="Dias úteis"     value={clubConfig.gym.openingHours.weekdays} />
          <HoursBlock label="Sábado"          value={clubConfig.gym.openingHours.saturday} />
          <HoursBlock label="Domingo"         value={clubConfig.gym.openingHours.sunday} />
        </div>
      </section>

      {/* Planos */}
      <section className="py-14">
        <div className="container-wide">
          <span className="eyebrow">Mensalidades simples</span>
          <h2 className="section-title mt-2">Planos para todos</h2>
          <p className="mt-3 max-w-2xl text-gray-600">
            Sem letras pequenas e sem fidelizações forçadas. Escolhe o que faz sentido para ti.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {plans.map(p => (
              <div
                key={p.id}
                className={`card relative p-6 ${p.is_featured ? 'border-club-accent ring-2 ring-club-accent/40' : ''}`}
              >
                {p.is_featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-club-accent px-3 py-0.5 text-[11px] font-semibold uppercase text-club-primary">
                    Mais escolhido
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-club-primary">{p.name}</h3>
                <p className="mt-3 font-display text-3xl font-bold text-club-primary">
                  €{p.monthly_price.toFixed(2)} <span className="text-sm font-normal text-gray-500">/ mês</span>
                </p>
                <p className="mt-2 text-sm text-gray-600">{p.description}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 flex-shrink-0 text-club-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/inscricoes/ginasio" className={`mt-6 block text-center ${p.is_featured ? 'btn-primary' : 'btn-secondary'}`}>
                  Quero este plano
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aulas semanais */}
      <section className="bg-club-light py-14">
        <div className="container-wide">
          <span className="eyebrow">Aulas de grupo</span>
          <h2 className="section-title mt-2">Horário semanal</h2>
          <p className="mt-3 max-w-2xl text-gray-600">
            Aulas incluídas em todos os planos. Vagas limitadas por aula.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WEEKDAY_ORDER.filter(d => byDay[d]).map(day => (
              <div key={day} className="card p-5">
                <p className="text-xs uppercase tracking-widest text-club-accent">{day}</p>
                <ul className="mt-3 space-y-2">
                  {byDay[day]
                    .sort((a, b) => a.start_time.localeCompare(b.start_time))
                    .map(c => (
                      <li key={c.id} className="flex items-start justify-between gap-3 border-b border-gray-100 pb-2 last:border-0">
                        <div>
                          <p className="font-semibold text-club-primary">{c.name}</p>
                          <p className="text-xs text-gray-500">
                            {c.trainer_name} · {c.duration_min} min · nível {c.level}
                          </p>
                        </div>
                        <span className="rounded bg-club-primary px-2 py-1 text-xs font-semibold text-white">
                          {c.start_time}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Trainers */}
      <section className="py-14">
        <div className="container-wide">
          <span className="eyebrow">A equipa técnica</span>
          <h2 className="section-title mt-2">Personal Trainers</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {trainers.map(t => (
              <div key={t.id} className="card p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-club-primary text-club-accent">
                  <User size={28} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-club-primary">{t.full_name}</h3>
                <p className="text-sm text-club-accent font-semibold">{t.speciality}</p>
                {t.bio && <p className="mt-3 text-sm text-gray-600">{t.bio}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-club-primary py-14 text-white">
        <div className="container-wide grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-white">Vem fazer uma aula experimental.</h2>
            <p className="mt-3 max-w-xl text-white/80">
              Marca a tua visita ao ginásio. Mostramos-te o espaço, fazemos uma avaliação física
              e dizemos-te qual o plano que melhor encaixa em ti.
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            <Link href="/inscricoes/ginasio" className="btn-accent">Inscrever-me</Link>
            <a href={`mailto:${clubConfig.contact.email}`} className="btn-secondary border-white text-white hover:bg-white hover:text-club-primary">
              Falar com a direção
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/5 p-5">
      <p className="font-display text-2xl font-bold text-club-accent">{value}</p>
      <p className="mt-1 text-sm text-white/70">{label}</p>
    </div>
  )
}

function HoursBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm">
      <Clock className="text-club-accent" size={22} />
      <div>
        <p className="text-xs uppercase tracking-widest text-gray-500">{label}</p>
        <p className="font-semibold text-club-primary">{value}</p>
      </div>
    </div>
  )
}
