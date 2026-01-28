'use client'

import { useState } from 'react'
import Link from 'next/link'
import { mockFöretagsprofil, type Företagsprofil } from '@/lib/mock-data'

export default function ProfilePage() {
  const [profil, setProfil] = useState<Företagsprofil>(mockFöretagsprofil)
  const [activeTab, setActiveTab] = useState<'info' | 'tjänster' | 'referenser'>('info')
  const [editMode, setEditMode] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Mock save - i produktion spara till Supabase
    setEditMode(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Anbudly
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Upphandlingar
              </Link>
              <Link href="/profile" className="text-blue-600 font-medium">
                Företagsprofil
              </Link>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">MA</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Företagsprofil</h1>
            <p className="text-gray-600">
              Informationen här används för att generera anbud
            </p>
          </div>
          <div className="flex gap-3">
            {saved && (
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                ✓ Sparad
              </span>
            )}
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Avbryt
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Spara ändringar
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Redigera
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b">
            <nav className="flex">
              <TabButton
                active={activeTab === 'info'}
                onClick={() => setActiveTab('info')}
              >
                Grundinfo
              </TabButton>
              <TabButton
                active={activeTab === 'tjänster'}
                onClick={() => setActiveTab('tjänster')}
              >
                Tjänster & Kompetens
              </TabButton>
              <TabButton
                active={activeTab === 'referenser'}
                onClick={() => setActiveTab('referenser')}
              >
                Referenser
              </TabButton>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'info' && (
              <GrundInfoTab profil={profil} editMode={editMode} setProfil={setProfil} />
            )}
            {activeTab === 'tjänster' && (
              <TjänsterTab profil={profil} editMode={editMode} setProfil={setProfil} />
            )}
            {activeTab === 'referenser' && (
              <ReferenserTab profil={profil} editMode={editMode} />
            )}
          </div>
        </div>

        {/* Dokument */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Uppladdade dokument</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DocumentCard name="F-skattebevis" date="2025-01-15" status="giltig" />
            <DocumentCard name="Ansvarsförsäkring" date="2025-01-10" status="giltig" />
            <DocumentCard name="ISO 27001-certifikat" date="2024-12-01" status="giltig" />
            <DocumentCard name="Kollektivavtal" date="2024-11-20" status="giltig" />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-500 cursor-pointer transition">
              <span className="text-3xl mb-2">+</span>
              <span className="text-sm">Ladda upp dokument</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 font-medium transition border-b-2 ${
        active
          ? 'text-blue-600 border-blue-600'
          : 'text-gray-500 border-transparent hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  )
}

function GrundInfoTab({
  profil,
  editMode,
  setProfil,
}: {
  profil: Företagsprofil
  editMode: boolean
  setProfil: (p: Företagsprofil) => void
}) {
  const handleChange = (field: keyof Företagsprofil, value: string) => {
    setProfil({ ...profil, [field]: value })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Företagsnamn"
        value={profil.företagsnamn}
        onChange={(v) => handleChange('företagsnamn', v)}
        editMode={editMode}
      />
      <InputField
        label="Organisationsnummer"
        value={profil.organisationsnummer}
        onChange={(v) => handleChange('organisationsnummer', v)}
        editMode={editMode}
      />
      <InputField
        label="Adress"
        value={profil.adress}
        onChange={(v) => handleChange('adress', v)}
        editMode={editMode}
      />
      <InputField
        label="Postort"
        value={profil.postort}
        onChange={(v) => handleChange('postort', v)}
        editMode={editMode}
      />
      <InputField
        label="Kontaktperson"
        value={profil.kontaktperson}
        onChange={(v) => handleChange('kontaktperson', v)}
        editMode={editMode}
      />
      <InputField
        label="E-post"
        value={profil.epost}
        onChange={(v) => handleChange('epost', v)}
        editMode={editMode}
        type="email"
      />
      <InputField
        label="Telefon"
        value={profil.telefon}
        onChange={(v) => handleChange('telefon', v)}
        editMode={editMode}
      />
      <InputField
        label="Hemsida"
        value={profil.hemsida}
        onChange={(v) => handleChange('hemsida', v)}
        editMode={editMode}
      />
      <InputField
        label="Antal anställda"
        value={profil.antalAnställda}
        onChange={(v) => handleChange('antalAnställda', v)}
        editMode={editMode}
      />
      <InputField
        label="Omsättning"
        value={profil.omsättning}
        onChange={(v) => handleChange('omsättning', v)}
        editMode={editMode}
      />
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Företagsbeskrivning
        </label>
        {editMode ? (
          <textarea
            value={profil.beskrivning}
            onChange={(e) => handleChange('beskrivning', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
          />
        ) : (
          <p className="text-gray-900">{profil.beskrivning}</p>
        )}
      </div>
    </div>
  )
}

function TjänsterTab({
  profil,
  editMode,
  setProfil,
}: {
  profil: Företagsprofil
  editMode: boolean
  setProfil: (p: Företagsprofil) => void
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tjänster</h3>
        <div className="flex flex-wrap gap-2">
          {profil.tjänster.map((tjänst, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {tjänst}
              {editMode && (
                <button className="ml-2 text-blue-500 hover:text-blue-700">×</button>
              )}
            </span>
          ))}
          {editMode && (
            <button className="px-3 py-1 border border-dashed border-blue-300 text-blue-500 rounded-full text-sm hover:bg-blue-50">
              + Lägg till
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Branscher</h3>
        <div className="flex flex-wrap gap-2">
          {profil.bransch.map((bransch, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
            >
              {bransch}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Geografiskt område</h3>
        <div className="flex flex-wrap gap-2">
          {profil.geografisktOmråde.map((område, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
            >
              {område}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Certifieringar</h3>
        <div className="flex flex-wrap gap-2">
          {profil.certifieringar.map((cert, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ReferenserTab({
  profil,
  editMode,
}: {
  profil: Företagsprofil
  editMode: boolean
}) {
  return (
    <div className="space-y-4">
      {profil.referenser.map((ref) => (
        <div key={ref.id} className="border rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900">{ref.kund}</h4>
              <p className="text-blue-600">{ref.projekt}</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <div>{ref.år}</div>
              <div>{ref.värde}</div>
            </div>
          </div>
          <p className="mt-2 text-gray-600 text-sm">{ref.beskrivning}</p>
          <p className="mt-2 text-gray-500 text-sm">Kontakt: {ref.kontaktperson}</p>
          {editMode && (
            <button className="mt-2 text-red-500 text-sm hover:text-red-700">
              Ta bort referens
            </button>
          )}
        </div>
      ))}
      {editMode && (
        <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-500 transition">
          + Lägg till referens
        </button>
      )}
    </div>
  )
}

function InputField({
  label,
  value,
  onChange,
  editMode,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  editMode: boolean
  type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {editMode ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      ) : (
        <p className="text-gray-900">{value}</p>
      )}
    </div>
  )
}

function DocumentCard({
  name,
  date,
  status,
}: {
  name: string
  date: string
  status: 'giltig' | 'utgången'
}) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-sm transition">
      <div className="flex items-center gap-3">
        <span className="text-2xl">📄</span>
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">Uppladdad: {date}</p>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            status === 'giltig'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {status === 'giltig' ? '✓ Giltig' : '⚠ Utgången'}
        </span>
      </div>
    </div>
  )
}
