'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  mockUpphandlingar,
  getMatchningspoängColor,
  getStatusColor,
  getStatusText,
  type Upphandling,
} from '@/lib/mock-data'

export default function DashboardPage() {
  const [filter, setFilter] = useState<string>('alla')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUpphandlingar = mockUpphandlingar.filter((u) => {
    const matchesFilter = filter === 'alla' || u.status === filter
    const matchesSearch =
      u.titel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.upphandlare.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

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
              <Link href="/dashboard" className="text-blue-600 font-medium">
                Upphandlingar
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Nya upphandlingar"
            value={mockUpphandlingar.filter((u) => u.status === 'ny').length.toString()}
            subtitle="denna vecka"
            icon="🔔"
          />
          <StatCard
            title="Pågående anbud"
            value={mockUpphandlingar.filter((u) => u.status === 'pågående').length.toString()}
            subtitle="under arbete"
            icon="✍️"
          />
          <StatCard
            title="Inskickade"
            value={mockUpphandlingar.filter((u) => u.status === 'inskickad').length.toString()}
            subtitle="väntar på beslut"
            icon="📤"
          />
          <StatCard
            title="Hög matchning"
            value={mockUpphandlingar.filter((u) => u.matchningspoäng >= 80).length.toString()}
            subtitle="80%+ matchning"
            icon="⭐"
          />
        </div>

        {/* Filter & Search */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-2 flex-wrap">
              <FilterButton
                active={filter === 'alla'}
                onClick={() => setFilter('alla')}
              >
                Alla
              </FilterButton>
              <FilterButton
                active={filter === 'ny'}
                onClick={() => setFilter('ny')}
              >
                Nya
              </FilterButton>
              <FilterButton
                active={filter === 'pågående'}
                onClick={() => setFilter('pågående')}
              >
                Pågående
              </FilterButton>
              <FilterButton
                active={filter === 'inskickad'}
                onClick={() => setFilter('inskickad')}
              >
                Inskickade
              </FilterButton>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Sök upphandlingar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>
        </div>

        {/* Upphandlingslista */}
        <div className="space-y-4">
          {filteredUpphandlingar.map((upphandling) => (
            <UpphandlingsCard key={upphandling.id} upphandling={upphandling} />
          ))}
          {filteredUpphandlingar.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
              Inga upphandlingar hittades med dessa filter.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string
  value: string
  subtitle: string
  icon: string
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  )
}

function FilterButton({
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
      className={`px-4 py-2 rounded-lg font-medium transition ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  )
}

function UpphandlingsCard({ upphandling }: { upphandling: Upphandling }) {
  const daysUntilDeadline = Math.ceil(
    (new Date(upphandling.deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  )

  return (
    <Link href={`/bid/${upphandling.id}`}>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition cursor-pointer">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  upphandling.status
                )}`}
              >
                {getStatusText(upphandling.status)}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchningspoängColor(
                  upphandling.matchningspoäng
                )}`}
              >
                {upphandling.matchningspoäng}% matchning
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {upphandling.titel}
            </h3>
            <p className="text-gray-600 text-sm mb-2">{upphandling.upphandlare}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span>📁 {upphandling.kategori}</span>
              <span>💰 {upphandling.värde}</span>
              <span
                className={
                  daysUntilDeadline <= 7 ? 'text-red-600 font-medium' : ''
                }
              >
                ⏰ {daysUntilDeadline > 0 ? `${daysUntilDeadline} dagar kvar` : 'Deadline passerad'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-500">Ska-krav</div>
              <div className="font-semibold">
                {upphandling.skaKrav.filter((k) => k.uppfyllt).length}/
                {upphandling.skaKrav.length}
              </div>
            </div>
            <div className="text-gray-400">→</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
