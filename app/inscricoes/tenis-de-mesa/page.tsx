import { TTInscriptionForm } from '@/components/TTInscriptionForm'

export const metadata = {
  title: 'Inscrição no Ténis de Mesa',
  description: 'Inscreve-te na secção de ténis de mesa do GD Juncal — escolinha, formação ou seniores.'
}

export default function TTInscriptionPage() {
  return (
    <div className="container-wide py-12">
      <header className="mb-8 max-w-2xl">
        <span className="eyebrow">Ténis de Mesa</span>
        <h1 className="section-title mt-2">Inscreve-te na modalidade</h1>
        <p className="mt-3 text-gray-600">
          Escolinha (5-9 anos), formação (10-19 anos) ou seniores. A direção contacta-te em 48h úteis para combinar treino experimental.
        </p>
      </header>
      <TTInscriptionForm />
    </div>
  )
}
