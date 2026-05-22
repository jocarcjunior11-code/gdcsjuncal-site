// ─────────────────────────────────────────────────
// Configuração central do clube
// ─────────────────────────────────────────────────
// Tudo o que aqui mudares aparece em todo o site.
// É o ÚNICO sítio onde precisas de tocar para alterar
// nome, cores, contactos ou textos institucionais.
// ─────────────────────────────────────────────────

export const clubConfig = {
  // Identidade
  name: 'Grupo Desportivo Centro Social do Juncal',
  shortName: 'GD Juncal',
  acronym: 'GDCSJ',
  founded: 1985, // muda para o ano correto se souberes
  motto: 'Tradição, mérito e comunidade',

  // Modalidades em destaque
  highlightedSports: ['Ténis de Mesa', 'Ginásio'],

  // Contactos
  contact: {
    email: 'geral@gdjuncal.pt',
    phone: '+351 000 000 000',
    address: 'Juncal, Porto de Mós, Portugal',
    facebook: 'https://www.facebook.com/profile.php?id=100077718830092'
  },

  // SEO e metadata
  seo: {
    description:
      'Plataforma oficial do Grupo Desportivo Centro Social do Juncal — ténis de mesa, ginásio, equipas, competições e notícias.',
    keywords: [
      'GD Juncal',
      'Centro Social do Juncal',
      'Ténis de mesa Juncal',
      'Ginásio Juncal',
      'Clube desportivo Porto de Mós'
    ]
  },

  // Ginásio
  gym: {
    name: 'Ginásio GD Juncal',
    openingHours: {
      weekdays: '07h00 — 22h00',
      saturday: '09h00 — 13h00 / 15h00 — 20h00',
      sunday: '09h00 — 13h00'
    },
    pricing: {
      monthly: '€25',
      quarterly: '€65',
      annual: '€220',
      student: '€18 / mês',
      family: '€40 / mês (2 pessoas)'
    }
  }
}

export type ClubConfig = typeof clubConfig
