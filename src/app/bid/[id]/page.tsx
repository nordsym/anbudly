'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  getUpphandlingById,
  mockFöretagsprofil,
  type Upphandling,
  type SkaKrav,
  type BorKrav,
} from '@/lib/mock-data'

export default function BidPage() {
  const params = useParams()
  const [upphandling, setUpphandling] = useState<Upphandling | null>(null)
  const [activeTab, setActiveTab] = useState<'översikt' | 'krav' | 'anbud'>('översikt')
  const [generating, setGenerating] = useState(false)
  const [generatedBid, setGeneratedBid] = useState<string>('')

  useEffect(() => {
    const u = getUpphandlingById(params.id as string)
    if (u) setUpphandling(u)
  }, [params.id])

  const handleGenerateBid = async () => {
    setGenerating(true)
    // Simulera AI-generering
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    setGeneratedBid(`# Anbud: ${upphandling?.titel}

## 1. Anbudsgivare

**${mockFöretagsprofil.företagsnamn}**
Org.nr: ${mockFöretagsprofil.organisationsnummer}
${mockFöretagsprofil.adress}, ${mockFöretagsprofil.postort}

Kontaktperson: ${mockFöretagsprofil.kontaktperson}
E-post: ${mockFöretagsprofil.epost}
Tel: ${mockFöretagsprofil.telefon}

---

## 2. Företagspresentation

${mockFöretagsprofil.beskrivning}

### 2.1 Kompetensområden
${mockFöretagsprofil.tjänster.map(t => `- ${t}`).join('\n')}

### 2.2 Certifieringar
${mockFöretagsprofil.certifieringar.map(c => `- ${c}`).join('\n')}

---

## 3. Uppfyllande av ska-krav

${upphandling?.skaKrav.map((krav, i) => `
### Ska-krav ${i + 1}: ${krav.beskrivning}

**Svar:** ${mockFöretagsprofil.företagsnamn} uppfyller detta krav. ${getKravSvar(krav, i)}
`).join('\n')}

---

## 4. Uppfyllande av bör-krav

${upphandling?.borKrav.map((krav, i) => `
### Bör-krav ${i + 1}: ${krav.beskrivning} (${krav.poäng} poäng)

**Svar:** ${getBörKravSvar(krav, i)}
`).join('\n')}

---

## 5. Referenser

${mockFöretagsprofil.referenser.map(ref => `
### ${ref.kund} - ${ref.projekt} (${ref.år})

${ref.beskrivning}

*Kontaktperson: ${ref.kontaktperson}*
`).join('\n')}

---

## 6. Pris

*[Prisuppgifter att fylla i baserat på upphandlingens kravspecifikation]*

---

## 7. Bilagor

- F-skattebevis
- Ansvarsförsäkringsbevis
- ISO 27001-certifikat
- CV:er för nyckelpersoner

---

*Detta anbud har genererats med stöd av AI. Vänligen granska och komplettera innan inskickning.*
`)
    
    setGenerating(false)
    setActiveTab('anbud')
  }

  if (!upphandling) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Laddar...</div>
      </div>
    )
  }

  const skaKravUppfyllda = upphandling.skaKrav.filter((k) => k.uppfyllt).length
  const skaKravTotal = upphandling.skaKrav.length
  const allSkaKravUppfyllda = skaKravUppfyllda === skaKravTotal

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-400 hover:text-gray-600">
                ← Tillbaka
              </Link>
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Anbudly
              </Link>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Upphandlingar
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                Företagsprofil
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Upphandlingsinfo */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {upphandling.titel}
              </h1>
              <p className="text-gray-600 mb-4">{upphandling.upphandlare}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>📁 {upphandling.kategori}</span>
                <span>💰 {upphandling.värde}</span>
                <span>📅 Deadline: {upphandling.deadline}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleGenerateBid}
                disabled={generating}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? '🤖 Genererar anbud...' : '✨ Generera anbud med AI'}
              </button>
              {generatedBid && (
                <button className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">
                  📥 Exportera till Word
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b">
            <nav className="flex">
              <TabButton
                active={activeTab === 'översikt'}
                onClick={() => setActiveTab('översikt')}
              >
                Översikt
              </TabButton>
              <TabButton
                active={activeTab === 'krav'}
                onClick={() => setActiveTab('krav')}
              >
                Krav & Checklista
              </TabButton>
              <TabButton
                active={activeTab === 'anbud'}
                onClick={() => setActiveTab('anbud')}
                badge={generatedBid ? '✓' : undefined}
              >
                Anbudsutkast
              </TabButton>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'översikt' && (
              <ÖversiktTab upphandling={upphandling} />
            )}
            {activeTab === 'krav' && (
              <KravTab
                upphandling={upphandling}
                setUpphandling={setUpphandling}
              />
            )}
            {activeTab === 'anbud' && (
              <AnbudTab generatedBid={generatedBid} generating={generating} />
            )}
          </div>
        </div>

        {/* Status sidebar */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
          <div className="space-y-4">
            <StatusItem
              label="Ska-krav"
              value={`${skaKravUppfyllda}/${skaKravTotal}`}
              status={allSkaKravUppfyllda ? 'complete' : 'incomplete'}
            />
            <StatusItem
              label="Bör-krav"
              value={`${upphandling.borKrav.filter((k) => k.uppfyllt).length}/${upphandling.borKrav.length}`}
              status="partial"
            />
            <StatusItem
              label="Anbudsutkast"
              value={generatedBid ? 'Genererat' : 'Ej påbörjat'}
              status={generatedBid ? 'complete' : 'incomplete'}
            />
            <StatusItem
              label="Dokument"
              value="4/5 uppladdade"
              status="partial"
            />
          </div>
          {!allSkaKravUppfyllda && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ Alla ska-krav måste vara uppfyllda för att kunna skicka in anbud.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function TabButton({
  children,
  active,
  onClick,
  badge,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
  badge?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 font-medium transition border-b-2 flex items-center gap-2 ${
        active
          ? 'text-blue-600 border-blue-600'
          : 'text-gray-500 border-transparent hover:text-gray-700'
      }`}
    >
      {children}
      {badge && (
        <span className="w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  )
}

function ÖversiktTab({ upphandling }: { upphandling: Upphandling }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Beskrivning</h3>
        <p className="text-gray-600">{upphandling.beskrivning}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Upphandlande myndighet</h4>
          <p className="text-gray-600">{upphandling.upphandlare}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Kategori</h4>
          <p className="text-gray-600">{upphandling.kategori}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Uppskattat värde</h4>
          <p className="text-gray-600">{upphandling.värde}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Sista anbudsdag</h4>
          <p className="text-gray-600">{upphandling.deadline}</p>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-2">Matchningsanalys</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`text-3xl font-bold ${
                upphandling.matchningspoäng >= 80
                  ? 'text-green-600'
                  : upphandling.matchningspoäng >= 60
                  ? 'text-yellow-600'
                  : 'text-red-600'
              }`}
            >
              {upphandling.matchningspoäng}%
            </div>
            <div className="text-gray-600">matchning med din företagsprofil</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${
                upphandling.matchningspoäng >= 80
                  ? 'bg-green-500'
                  : upphandling.matchningspoäng >= 60
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${upphandling.matchningspoäng}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function KravTab({
  upphandling,
  setUpphandling,
}: {
  upphandling: Upphandling
  setUpphandling: (u: Upphandling) => void
}) {
  const toggleSkaKrav = (kravId: string) => {
    setUpphandling({
      ...upphandling,
      skaKrav: upphandling.skaKrav.map((k) =>
        k.id === kravId ? { ...k, uppfyllt: !k.uppfyllt } : k
      ),
    })
  }

  const toggleBorKrav = (kravId: string) => {
    setUpphandling({
      ...upphandling,
      borKrav: upphandling.borKrav.map((k) =>
        k.id === kravId ? { ...k, uppfyllt: !k.uppfyllt } : k
      ),
    })
  }

  return (
    <div className="space-y-8">
      {/* Ska-krav */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Ska-krav (obligatoriska)
          </h3>
          <span className="text-sm text-gray-500">
            {upphandling.skaKrav.filter((k) => k.uppfyllt).length}/{upphandling.skaKrav.length} uppfyllda
          </span>
        </div>
        <div className="space-y-3">
          {upphandling.skaKrav.map((krav) => (
            <KravItem
              key={krav.id}
              krav={krav}
              type="ska"
              onToggle={() => toggleSkaKrav(krav.id)}
            />
          ))}
        </div>
      </div>

      {/* Bör-krav */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Bör-krav (meriterande)
          </h3>
          <span className="text-sm text-gray-500">
            {upphandling.borKrav.reduce((sum, k) => sum + (k.uppfyllt ? k.poäng : 0), 0)}/
            {upphandling.borKrav.reduce((sum, k) => sum + k.poäng, 0)} poäng
          </span>
        </div>
        <div className="space-y-3">
          {upphandling.borKrav.map((krav) => (
            <KravItem
              key={krav.id}
              krav={krav}
              type="bör"
              onToggle={() => toggleBorKrav(krav.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function KravItem({
  krav,
  type,
  onToggle,
}: {
  krav: SkaKrav | BorKrav
  type: 'ska' | 'bör'
  onToggle: () => void
}) {
  const isBörKrav = 'poäng' in krav

  return (
    <div
      className={`border rounded-lg p-4 ${
        krav.uppfyllt
          ? 'bg-green-50 border-green-200'
          : krav.uppfyllt === false
          ? 'bg-red-50 border-red-200'
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={onToggle}
          className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
            krav.uppfyllt
              ? 'bg-green-500 border-green-500 text-white'
              : krav.uppfyllt === false
              ? 'bg-red-500 border-red-500 text-white'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {krav.uppfyllt && '✓'}
          {krav.uppfyllt === false && '✗'}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded ${
                type === 'ska'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}
            >
              {type === 'ska' ? 'SKA-KRAV' : `BÖR-KRAV (${(krav as BorKrav).poäng}p)`}
            </span>
          </div>
          <p className="mt-1 text-gray-900">{krav.beskrivning}</p>
        </div>
      </div>
    </div>
  )
}

function AnbudTab({
  generatedBid,
  generating,
}: {
  generatedBid: string
  generating: boolean
}) {
  if (generating) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin text-4xl mb-4">🤖</div>
        <p className="text-gray-600">AI genererar ditt anbudsutkast...</p>
        <p className="text-gray-400 text-sm mt-2">
          Analyserar krav och matchar med din företagsprofil
        </p>
      </div>
    )
  }

  if (!generatedBid) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📝</div>
        <p className="text-gray-600">Inget anbudsutkast genererat ännu</p>
        <p className="text-gray-400 text-sm mt-2">
          Klicka på "Generera anbud med AI" för att komma igång
        </p>
      </div>
    )
  }

  return (
    <div className="prose max-w-none">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-yellow-800 text-sm">
          ⚠️ Detta är ett AI-genererat utkast. Granska noggrant och komplettera med
          specifik information innan du skickar in anbudet.
        </p>
      </div>
      <div className="bg-white border rounded-lg p-6 whitespace-pre-wrap font-mono text-sm">
        {generatedBid}
      </div>
    </div>
  )
}

function StatusItem({
  label,
  value,
  status,
}: {
  label: string
  value: string
  status: 'complete' | 'incomplete' | 'partial'
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600">{label}</span>
      <span
        className={`font-medium ${
          status === 'complete'
            ? 'text-green-600'
            : status === 'incomplete'
            ? 'text-gray-400'
            : 'text-yellow-600'
        }`}
      >
        {status === 'complete' && '✓ '}
        {status === 'incomplete' && '○ '}
        {status === 'partial' && '◐ '}
        {value}
      </span>
    </div>
  )
}

function getKravSvar(krav: SkaKrav, index: number): string {
  const svar = [
    'Vi innehar giltigt F-skattebevis som bifogas anbudet.',
    'Vår ansvarsförsäkring uppgår till 10 MSEK och täcker alla typer av uppdrag inom IT-konsulttjänster.',
    'Se bifogade referensuppdrag från Försäkringskassan, Stockholms stad och Region Stockholm.',
    'Vi har 12 anställda varav 10 arbetar med systemutveckling och konsulttjänster.',
    'Samtliga konsulter som föreslås för uppdraget har minst 7 års erfarenhet av systemutveckling.',
  ]
  return svar[index] || 'Vi bekräftar att vi uppfyller detta krav.'
}

function getBörKravSvar(krav: BorKrav, index: number): string {
  const svar = [
    'Vårt team har omfattande erfarenhet av Azure-plattformen. Vi är Microsoft Gold Partner och har genomfört flera migrationsprojekt till Azure.',
    'Fyra av våra konsulter är certifierade Scrum Masters och vi arbetar uteslutande enligt agila principer.',
    'Vi har gedigen erfarenhet av integration med kommunala system, senast i projektet för Stockholms stad.',
  ]
  return svar[index] || 'Vi har relevant erfarenhet inom detta område.'
}
