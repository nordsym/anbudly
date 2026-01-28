export interface Upphandling {
  id: string
  titel: string
  upphandlare: string
  publicerad: string
  deadline: string
  kategori: string
  värde: string
  matchningspoäng: number
  beskrivning: string
  skaKrav: SkaKrav[]
  borKrav: BorKrav[]
  status: 'ny' | 'pågående' | 'inskickad' | 'vunnen' | 'förlorad'
}

export interface SkaKrav {
  id: string
  beskrivning: string
  uppfyllt: boolean | null
  kommentar?: string
}

export interface BorKrav {
  id: string
  beskrivning: string
  poäng: number
  uppfyllt: boolean | null
  kommentar?: string
}

export interface Företagsprofil {
  id: string
  företagsnamn: string
  organisationsnummer: string
  adress: string
  postort: string
  kontaktperson: string
  epost: string
  telefon: string
  hemsida: string
  beskrivning: string
  bransch: string[]
  tjänster: string[]
  geografisktOmråde: string[]
  antalAnställda: string
  omsättning: string
  certifieringar: string[]
  referenser: Referens[]
}

export interface Referens {
  id: string
  kund: string
  projekt: string
  år: string
  värde: string
  beskrivning: string
  kontaktperson: string
}

export const mockUpphandlingar: Upphandling[] = [
  {
    id: '1',
    titel: 'IT-konsulttjänster inom systemutveckling',
    upphandlare: 'Stockholms kommun',
    publicerad: '2025-01-15',
    deadline: '2025-02-28',
    kategori: 'IT & Konsulttjänster',
    värde: '5-10 MSEK',
    matchningspoäng: 92,
    beskrivning: 'Stockholms kommun upphandlar IT-konsulttjänster för att stödja verksamhetens digitaliseringsresa. Uppdraget omfattar systemutveckling, arkitektur och projektledning.',
    status: 'ny',
    skaKrav: [
      { id: 'sk1', beskrivning: 'Anbudsgivaren ska ha F-skattebevis', uppfyllt: true },
      { id: 'sk2', beskrivning: 'Anbudsgivaren ska ha ansvarsförsäkring om minst 5 MSEK', uppfyllt: true },
      { id: 'sk3', beskrivning: 'Anbudsgivaren ska kunna påvisa minst 3 referensuppdrag inom offentlig sektor', uppfyllt: null },
      { id: 'sk4', beskrivning: 'Anbudsgivaren ska ha minst 5 anställda med relevant kompetens', uppfyllt: true },
      { id: 'sk5', beskrivning: 'Konsulter ska ha minst 5 års erfarenhet av systemutveckling', uppfyllt: null },
    ],
    borKrav: [
      { id: 'bk1', beskrivning: 'Erfarenhet av Azure-plattformen', poäng: 20, uppfyllt: true },
      { id: 'bk2', beskrivning: 'Certifiering inom agila metoder (t.ex. Scrum Master)', poäng: 15, uppfyllt: true },
      { id: 'bk3', beskrivning: 'Erfarenhet av integration med befintliga kommunsystem', poäng: 25, uppfyllt: null },
    ],
  },
  {
    id: '2',
    titel: 'Ramavtal för städtjänster',
    upphandlare: 'Region Västra Götaland',
    publicerad: '2025-01-20',
    deadline: '2025-03-15',
    kategori: 'Facility Management',
    värde: '2-5 MSEK/år',
    matchningspoäng: 45,
    beskrivning: 'Region Västra Götaland upphandlar städtjänster för kontorslokaler i Göteborg med omnejd. Uppdraget omfattar daglig städning samt storstädning.',
    status: 'ny',
    skaKrav: [
      { id: 'sk1', beskrivning: 'Anbudsgivaren ska ha F-skattebevis', uppfyllt: null },
      { id: 'sk2', beskrivning: 'Anbudsgivaren ska ha kollektivavtal', uppfyllt: null },
      { id: 'sk3', beskrivning: 'Anbudsgivaren ska ha miljöcertifiering (ISO 14001 eller motsvarande)', uppfyllt: null },
    ],
    borKrav: [
      { id: 'bk1', beskrivning: 'Erfarenhet av sjukhusstädning', poäng: 30, uppfyllt: null },
      { id: 'bk2', beskrivning: 'Miljövänliga städprodukter', poäng: 20, uppfyllt: null },
    ],
  },
  {
    id: '3',
    titel: 'Konsultstöd för verksamhetsutveckling',
    upphandlare: 'Försäkringskassan',
    publicerad: '2025-01-18',
    deadline: '2025-02-20',
    kategori: 'IT & Konsulttjänster',
    värde: '1-3 MSEK',
    matchningspoäng: 88,
    beskrivning: 'Försäkringskassan söker konsultstöd för att genomföra verksamhetsutvecklingsprojekt med fokus på digitalisering av interna processer.',
    status: 'pågående',
    skaKrav: [
      { id: 'sk1', beskrivning: 'Anbudsgivaren ska ha erfarenhet av förändringsledning', uppfyllt: true },
      { id: 'sk2', beskrivning: 'Konsulter ska ha minst 3 års erfarenhet av verksamhetsutveckling', uppfyllt: true },
      { id: 'sk3', beskrivning: 'Anbudsgivaren ska kunna starta uppdraget inom 4 veckor', uppfyllt: true },
    ],
    borKrav: [
      { id: 'bk1', beskrivning: 'Erfarenhet av myndighetsuppdrag', poäng: 25, uppfyllt: true },
      { id: 'bk2', beskrivning: 'Lean/Six Sigma-certifiering', poäng: 15, uppfyllt: false },
    ],
  },
  {
    id: '4',
    titel: 'Utveckling av mobilapplikation',
    upphandlare: 'Trafikverket',
    publicerad: '2025-01-22',
    deadline: '2025-03-01',
    kategori: 'IT & Konsulttjänster',
    värde: '500 000 - 1 MSEK',
    matchningspoäng: 76,
    beskrivning: 'Trafikverket upphandlar utveckling av en mobilapplikation för resenärsinformation. Appen ska finnas för både iOS och Android.',
    status: 'ny',
    skaKrav: [
      { id: 'sk1', beskrivning: 'Anbudsgivaren ska ha dokumenterad erfarenhet av React Native eller Flutter', uppfyllt: true },
      { id: 'sk2', beskrivning: 'Anbudsgivaren ska kunna tillhandahålla källkod enligt MIT-licens', uppfyllt: null },
      { id: 'sk3', beskrivning: 'Anbudsgivaren ska ha erfarenhet av tillgänglighetsanpassning (WCAG 2.1)', uppfyllt: null },
    ],
    borKrav: [
      { id: 'bk1', beskrivning: 'Erfarenhet av realtidsdata och API-integrationer', poäng: 30, uppfyllt: null },
      { id: 'bk2', beskrivning: 'Portfolio med minst 3 publicerade appar', poäng: 20, uppfyllt: null },
    ],
  },
  {
    id: '5',
    titel: 'IT-säkerhetstjänster',
    upphandlare: 'Skatteverket',
    publicerad: '2025-01-10',
    deadline: '2025-02-15',
    kategori: 'IT & Konsulttjänster',
    värde: '3-6 MSEK',
    matchningspoäng: 71,
    beskrivning: 'Skatteverket upphandlar IT-säkerhetstjänster inklusive penetrationstester, säkerhetsgranskningar och incidenthantering.',
    status: 'inskickad',
    skaKrav: [
      { id: 'sk1', beskrivning: 'Anbudsgivaren ska ha säkerhetsklassade konsulter', uppfyllt: true },
      { id: 'sk2', beskrivning: 'Anbudsgivaren ska ha ISO 27001-certifiering', uppfyllt: true },
      { id: 'sk3', beskrivning: 'Anbudsgivaren ska kunna genomföra uppdrag inom Sverige', uppfyllt: true },
    ],
    borKrav: [
      { id: 'bk1', beskrivning: 'OSCP eller motsvarande certifiering hos konsulter', poäng: 25, uppfyllt: true },
      { id: 'bk2', beskrivning: 'Erfarenhet av SOC-drift', poäng: 20, uppfyllt: true },
    ],
  },
]

export const mockFöretagsprofil: Företagsprofil = {
  id: '1',
  företagsnamn: 'TechSolutions AB',
  organisationsnummer: '556123-4567',
  adress: 'Innovationsvägen 42',
  postort: '111 22 Stockholm',
  kontaktperson: 'Maria Andersson',
  epost: 'maria@techsolutions.se',
  telefon: '08-123 45 67',
  hemsida: 'www.techsolutions.se',
  beskrivning: 'TechSolutions AB är ett IT-konsultbolag som specialiserar sig på systemutveckling, digitaliseringstjänster och verksamhetsutveckling. Vi har arbetat med offentlig sektor sedan 2015 och har gedigen erfarenhet av komplexa integrationsprojekt.',
  bransch: ['IT & Konsulttjänster', 'Systemutveckling', 'Digitalisering'],
  tjänster: [
    'Systemutveckling',
    'API-utveckling och integration',
    'Cloud-arkitektur (Azure, AWS)',
    'Projektledning',
    'Verksamhetsutveckling',
    'Agil coaching',
  ],
  geografisktOmråde: ['Stockholm', 'Uppsala', 'Västra Götaland', 'Remote'],
  antalAnställda: '12',
  omsättning: '15 MSEK',
  certifieringar: [
    'ISO 27001',
    'Microsoft Gold Partner',
    'AWS Certified Partner',
  ],
  referenser: [
    {
      id: 'ref1',
      kund: 'Försäkringskassan',
      projekt: 'Digitalisering av ärendehantering',
      år: '2024',
      värde: '2.5 MSEK',
      beskrivning: 'Utveckling av nytt ärendehanteringssystem med integration mot befintliga system.',
      kontaktperson: 'Erik Svensson, IT-chef',
    },
    {
      id: 'ref2',
      kund: 'Stockholms stad',
      projekt: 'E-tjänsteplattform',
      år: '2023',
      värde: '1.8 MSEK',
      beskrivning: 'Utveckling av en plattform för medborgarservice med självbetjäningstjänster.',
      kontaktperson: 'Anna Lindqvist, Digitaliseringschef',
    },
    {
      id: 'ref3',
      kund: 'Region Stockholm',
      projekt: 'Verksamhetsutveckling inom primärvård',
      år: '2024',
      värde: '800 000 SEK',
      beskrivning: 'Processutveckling och digitalisering av patientflöden.',
      kontaktperson: 'Jonas Berg, Verksamhetschef',
    },
  ],
}

export function getUpphandlingById(id: string): Upphandling | undefined {
  return mockUpphandlingar.find((u) => u.id === id)
}

export function getMatchningspoängColor(poäng: number): string {
  if (poäng >= 80) return 'text-green-600 bg-green-100'
  if (poäng >= 60) return 'text-yellow-600 bg-yellow-100'
  return 'text-red-600 bg-red-100'
}

export function getStatusColor(status: Upphandling['status']): string {
  switch (status) {
    case 'ny':
      return 'text-blue-600 bg-blue-100'
    case 'pågående':
      return 'text-yellow-600 bg-yellow-100'
    case 'inskickad':
      return 'text-purple-600 bg-purple-100'
    case 'vunnen':
      return 'text-green-600 bg-green-100'
    case 'förlorad':
      return 'text-red-600 bg-red-100'
  }
}

export function getStatusText(status: Upphandling['status']): string {
  switch (status) {
    case 'ny':
      return 'Ny'
    case 'pågående':
      return 'Pågående'
    case 'inskickad':
      return 'Inskickad'
    case 'vunnen':
      return 'Vunnen'
    case 'förlorad':
      return 'Förlorad'
  }
}
