import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Dumbbell, Trophy, Users } from 'lucide-react'
import { clubConfig } from '@/lib/club-config'
import {
  getNextMatch, getLatestResult, getMatchResult, getStandings,
  getCompetitions, getNews
} from '@/lib/data'
import { MatchCard } from '@/components/MatchCard'
import { NewsCard } from '@/components/NewsCard'
import { formatMatchDate } from '@/lib/utils'

export default async function HomePage() {
  const [next, latest, competitions, news] = await Promise.all([
    getNextMatch(),
    getLatestResult(),
    getCompetitions(),
    getNews({ limit: 3 })
  ])

  const seniorMasc = competitions.find(c => c.gender === 'masculino' && c.age_group === 'senior')
  const standings = seniorMasc ? await getStandings(seniorMasc.id) : []
  const latestResult = latest ? await getMatchResult(latest.id) : null
  const featured = news[0]
  const otherNews = news.slice(1, 3)

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-club-primary text-white">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://placehold.co/1920x800/0B2545/D4AF37?text=+"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="container-wide relative grid gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <span className="eyebrow text-club-accent">{clubConfig.motto}</span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-white">
              {clubConfig.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Tradição na modalidade. Comunidade no clube. Ténis de mesa de competição,
              formação para todas as idades, e um ginásio para a saúde de todos.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/inscricoes/tenis-de-mesa" className="btn-accent">
                Junta-te ao Ténis de Mesa <ArrowRight size={16} />
              </Link>
              <Link href="/inscricoes/ginasio" className="btn-secondary border-white text-white hover:bg-white hover:text-club-primary">
                Inscreve-te no Ginásio
              </Link>
            </div>
          </div>

          {/* Próximo jogo em destaque */}
          {next && (
            <div className="rounded-xl bg-white text-club-dark shadow-2xl">
              <div className="rounded-t-xl bg-club-accent px-5 py-2 text-xs font-semibold uppercase tracking-widest text-club-primary">
                Próximo jogo
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Jornada {next.round_number}
                </p>
                <div className="mt-4 grid grid-cols-3 items-center gap-2">
                  <div className="text-center">
                    <p className="font-display text-base font-bold text-club-primary line-clamp-2">{next.home_team}</p>
                  </div>
                  <p className="text-center font-display text-3xl font-bold text-gray-300">VS</p>
                  <div className="text-center">
                    <p className="font-display text-base font-bold text-club-primary line-clamp-2">{next.away_team}</p>
                  </div>
                </div>
                <div className="mt-6 space-y-1 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <Calendar size={14} className="text-club-accent" />
                    {formatMatchDate(next.match_date)}
                  </p>
                  {next.location && <p className="pl-6">📍 {next.location}</p>}
                </div>
                <Link href={`/jogos/${next.id}`} className="btn-primary mt-6 w-full">
                  Ver detalhes <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ───────── ACESSOS RÁPIDOS ───────── */}
      <section className="border-b border-gray-100 bg-club-light">
        <div className="container-wide grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
          <QuickLink href="/competicoes" icon={<Trophy size={22} />} label="Competições" />
          <QuickLink href="/jogos"       icon={<Calendar size={22} />} label="Jogos" />
          <QuickLink href="/equipas"     icon={<Users size={22} />} label="Equipas" />
          <QuickLink href="/ginasio"     icon={<Dumbbell size={22} />} label="Ginásio" />
        </div>
      </section>

      {/* ───────── ÚLTIMO RESULTADO + CLASSIFICAÇÃO ───────── */}
      <section className="py-14">
        <div className="container-wide grid gap-8 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Resultado mais recente</span>
            <h2 className="section-title mt-2">Último jogo</h2>
            {latest ? (
              <div className="mt-5">
                <MatchCard
                  id={latest.id}
                  homeTeam={latest.home_team}
                  awayTeam={latest.away_team}
                  homeScore={latestResult?.home_score}
                  awayScore={latestResult?.away_score}
                  date={latest.match_date}
                  location={latest.location}
                  status={latest.status}
                />
                {latest.summary && (
                  <p className="mt-4 rounded-md bg-club-light/60 p-4 text-sm text-gray-700 leading-relaxed">
                    “{latest.summary}”
                  </p>
                )}
              </div>
            ) : (
              <p className="mt-5 text-gray-500">Sem jogos terminados ainda.</p>
            )}
          </div>

          <div>
            <span className="eyebrow">{seniorMasc?.name || 'Classificação'}</span>
            <h2 className="section-title mt-2">Classificação resumida</h2>
            <div className="mt-5 overflow-hidden rounded-lg border border-gray-200">
              <table className="table-clean">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Equipa</th>
                    <th className="text-center">J</th>
                    <th className="text-center">V</th>
                    <th className="text-center">E</th>
                    <th className="text-center">D</th>
                    <th className="text-center">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.slice(0, 5).map(s => {
                    const highlight = s.team_name.includes('Juncal')
                    return (
                      <tr key={s.id} className={highlight ? 'bg-club-accent/15 font-semibold' : ''}>
                        <td>{s.position}</td>
                        <td>{s.team_name}</td>
                        <td className="text-center">{s.played}</td>
                        <td className="text-center">{s.wins}</td>
                        <td className="text-center">{s.draws}</td>
                        <td className="text-center">{s.losses}</td>
                        <td className="text-center font-bold">{s.points}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {seniorMasc && (
              <Link href={`/competicoes/${seniorMasc.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-club-primary hover:text-club-accent">
                Ver classificação completa <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ───────── CTA GINÁSIO ───────── */}
      <section className="relative overflow-hidden bg-club-primary text-white">
        <div className="container-wide grid items-center gap-8 py-14 md:grid-cols-2">
          <div>
            <span className="eyebrow text-club-accent">{clubConfig.gym.name}</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
              Treina onde a comunidade do clube treina.
            </h2>
            <p className="mt-3 max-w-xl text-white/80">
              Equipamentos novos, PTs certificados, aulas semanais e horários alargados.
              Mensalidade desde <strong className="text-club-accent">{clubConfig.gym.pricing.student}</strong>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/ginasio" className="btn-accent">Ver planos e horários</Link>
              <Link href="/inscricoes/ginasio" className="btn-secondary border-white text-white hover:bg-white hover:text-club-primary">
                Inscreve-te agora
              </Link>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-white/5 p-5">
              <p className="text-3xl font-display font-bold text-club-accent">07h</p>
              <p className="mt-1 text-sm text-white/70">Aberto desde as</p>
            </div>
            <div className="rounded-lg bg-white/5 p-5">
              <p className="text-3xl font-display font-bold text-club-accent">22h</p>
              <p className="mt-1 text-sm text-white/70">Até às</p>
            </div>
            <div className="rounded-lg bg-white/5 p-5">
              <p className="text-3xl font-display font-bold text-club-accent">3 PTs</p>
              <p className="mt-1 text-sm text-white/70">Disponíveis</p>
            </div>
            <div className="rounded-lg bg-white/5 p-5">
              <p className="text-3xl font-display font-bold text-club-accent">7</p>
              <p className="mt-1 text-sm text-white/70">Aulas semanais</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── NOTÍCIAS ───────── */}
      <section className="py-14">
        <div className="container-wide">
          <div className="flex items-end justify-between">
            <div>
              <span className="eyebrow">Atualidade</span>
              <h2 className="section-title mt-2">Últimas notícias</h2>
            </div>
            <Link href="/noticias" className="text-sm font-semibold text-club-primary hover:text-club-accent">
              Ver todas →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {featured && (
              <div className="lg:col-span-2 lg:row-span-2">
                <NewsCard
                  variant="featured"
                  slug={featured.slug}
                  title={featured.title}
                  excerpt={featured.excerpt}
                  coverImageUrl={featured.cover_image_url}
                  category={featured.category}
                  publishedAt={featured.published_at}
                />
              </div>
            )}
            {otherNews.map(n => (
              <NewsCard
                key={n.id}
                slug={n.slug}
                title={n.title}
                excerpt={n.excerpt}
                coverImageUrl={n.cover_image_url}
                category={n.category}
                publishedAt={n.published_at}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA FINAL ───────── */}
      <section className="border-t border-gray-100 bg-club-light py-14">
        <div className="container-wide grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="section-title">Pronto para fazer parte?</h2>
            <p className="mt-3 max-w-xl text-gray-600">
              O clube cresce com cada nova inscrição. Junta-te à secção de ténis de mesa,
              ao ginásio, ou simplesmente diz olá à nossa direção.
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            <Link href="/inscricoes/tenis-de-mesa" className="btn-primary">Ténis de Mesa</Link>
            <Link href="/inscricoes/ginasio" className="btn-secondary">Ginásio</Link>
            <a href={`mailto:${clubConfig.contact.email}`} className="btn-secondary">Contactar</a>
          </div>
        </div>
      </section>
    </>
  )
}

function QuickLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 transition hover:border-club-accent hover:shadow-md"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-club-primary text-white transition group-hover:bg-club-accent group-hover:text-club-primary">
        {icon}
      </span>
      <span className="font-semibold text-club-dark">{label}</span>
    </Link>
  )
}
