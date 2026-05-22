import { GymInscriptionForm } from '@/components/GymInscriptionForm'
import { getGymPlans } from '@/lib/data'

export const metadata = {
  title: 'Inscrição no ginásio',
  description: 'Inscreve-te no ginásio do GD Juncal.'
}

export default async function GymInscriptionPage() {
  const plans = await getGymPlans()
  return (
    <div className="container-wide py-12">
      <header className="mb-8 max-w-2xl">
        <span className="eyebrow">Ginásio do clube</span>
        <h1 className="section-title mt-2">Inscrição no ginásio</h1>
        <p className="mt-3 text-gray-600">
          Preenche os dados e a direção contacta-te em 24h úteis para combinar a tua visita.
        </p>
      </header>
      <GymInscriptionForm plans={plans} />
    </div>
  )
}
