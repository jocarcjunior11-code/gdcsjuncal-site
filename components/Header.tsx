'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { clubConfig } from '@/lib/club-config'

const navigation = [
  { name: 'Início',       href: '/' },
  { name: 'Competições',  href: '/competicoes' },
  { name: 'Jogos',        href: '/jogos' },
  { name: 'Equipas',      href: '/equipas' },
  { name: 'Ginásio',      href: '/ginasio' },
  { name: 'Notícias',     href: '/noticias' },
  { name: 'Media',        href: '/media' }
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="bg-club-primary text-white">
        <div className="container-wide flex items-center justify-between py-1.5 text-xs">
          <span className="hidden sm:inline">
            {clubConfig.contact.address} · {clubConfig.contact.phone}
          </span>
          <div className="flex items-center gap-4">
            <a href={`mailto:${clubConfig.contact.email}`} className="hover:text-club-accent">
              {clubConfig.contact.email}
            </a>
            <Link href="/admin" className="hover:text-club-accent">
              Área reservada
            </Link>
          </div>
        </div>
      </div>

      <div className="container-wide flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-club-primary text-white font-display text-lg font-bold">
            GDJ
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-lg font-bold leading-tight text-club-primary">
              {clubConfig.shortName}
            </p>
            <p className="text-[11px] uppercase tracking-widest text-gray-500">
              {clubConfig.name}
            </p>
          </div>
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-club-dark transition hover:text-club-primary"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/inscricoes/tenis-de-mesa" className="btn-primary text-xs">
            Inscreve-te
          </Link>
        </nav>

        {/* Botão mobile */}
        <button
          aria-label="Abrir menu"
          className="lg:hidden text-club-primary"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <nav className="container-wide flex flex-col py-3">
            {navigation.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-gray-100 py-3 text-sm font-medium text-club-dark"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/inscricoes/tenis-de-mesa"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3"
            >
              Inscreve-te
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
