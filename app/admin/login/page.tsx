import { LoginForm } from '@/components/admin/LoginForm'
import { clubConfig } from '@/lib/club-config'

export const metadata = { title: 'Entrar — Administração', robots: { index: false } }

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-club-light/40 px-4 py-12">
      <div className="card w-full max-w-md p-8">
        <p className="eyebrow">Área reservada</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-club-primary">
          {clubConfig.shortName} · Administração
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Acesso reservado à direção do clube e responsáveis pela comunicação.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
