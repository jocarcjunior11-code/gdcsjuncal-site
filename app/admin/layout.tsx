import Link from 'next/link'
import { LayoutDashboard, Trophy, Calendar, Newspaper, ImageIcon, Users, LogOut } from 'lucide-react'
import { clubConfig } from '@/lib/club-config'

export const metadata = {
  title: 'Administração',
  robots: { index: false }
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <aside className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-club-light/30 md:block">
        <div className="px-5 py-6">
          <p className="text-xs uppercase tracking-widest text-club-accent">Administração</p>
          <p className="mt-1 font-display text-base font-bold text-club-primary leading-tight">
            {clubConfig.shortName}
          </p>
        </div>
        <nav className="flex flex-col gap-1 px-3 pb-6 text-sm">
          <SideLink href="/admin" icon={<LayoutDashboard size={16} />} label="Painel" />
          <SideLink href="/admin/jogos" icon={<Calendar size={16} />} label="Jogos" />
          <SideLink href="/admin/competicoes" icon={<Trophy size={16} />} label="Competições" />
          <SideLink href="/admin/equipas" icon={<Users size={16} />} label="Equipas" />
          <SideLink href="/admin/noticias" icon={<Newspaper size={16} />} label="Notícias" />
          <SideLink href="/admin/media" icon={<ImageIcon size={16} />} label="Media" />
          <SideLink href="/admin/inscricoes" icon={<Users size={16} />} label="Inscrições" />
          <hr className="my-3" />
          <SideLink href="/admin/logout" icon={<LogOut size={16} />} label="Sair" />
        </nav>
      </aside>

      <div className="flex-1 bg-white px-4 py-8 md:px-10">
        {children}
      </div>
    </div>
  )
}

function SideLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded px-3 py-2 text-club-dark transition hover:bg-club-primary hover:text-white"
    >
      {icon} <span>{label}</span>
    </Link>
  )
}
