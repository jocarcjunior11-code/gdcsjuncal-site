import Link from 'next/link'
import { clubConfig } from '@/lib/club-config'
import { Facebook, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-16 bg-club-primary text-white">
      <div className="container-wide grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-club-primary font-display text-lg font-bold">
              GDJ
            </div>
            <p className="font-display text-lg font-bold">{clubConfig.shortName}</p>
          </div>
          <p className="text-sm text-white/80">{clubConfig.motto}</p>
          <p className="mt-3 text-xs text-white/60">Fundado em {clubConfig.founded}</p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-club-accent">
            Modalidades
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/competicoes" className="text-white/80 hover:text-club-accent">Ténis de Mesa</Link></li>
            <li><Link href="/equipas" className="text-white/80 hover:text-club-accent">Equipas</Link></li>
            <li><Link href="/ginasio" className="text-white/80 hover:text-club-accent">Ginásio</Link></li>
            <li><Link href="/jogos" className="text-white/80 hover:text-club-accent">Jogos & Resultados</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-club-accent">
            Inscreve-te
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/inscricoes/tenis-de-mesa" className="text-white/80 hover:text-club-accent">Ténis de Mesa</Link></li>
            <li><Link href="/inscricoes/ginasio" className="text-white/80 hover:text-club-accent">Ginásio</Link></li>
            <li><Link href="/noticias" className="text-white/80 hover:text-club-accent">Notícias do clube</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-club-accent">
            Contactos
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2 text-white/80">
              <MapPin size={16} className="mt-0.5 flex-shrink-0" />
              <span>{clubConfig.contact.address}</span>
            </li>
            <li className="flex items-center gap-2 text-white/80">
              <Phone size={16} /> {clubConfig.contact.phone}
            </li>
            <li className="flex items-center gap-2 text-white/80">
              <Mail size={16} />
              <a href={`mailto:${clubConfig.contact.email}`} className="hover:text-club-accent">
                {clubConfig.contact.email}
              </a>
            </li>
            <li>
              <a
                href={clubConfig.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-club-accent"
              >
                <Facebook size={16} /> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} {clubConfig.name}. Todos os direitos reservados.</p>
          <p>Site institucional · Versão 1.0</p>
        </div>
      </div>
    </footer>
  )
}
