'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Mock login - i produktion använd Supabase auth
    if (email && password) {
      // Simulera API-anrop
      await new Promise((resolve) => setTimeout(resolve, 500))
      router.push('/dashboard')
    } else {
      setError('Fyll i e-post och lösenord')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            Anbudly
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Logga in på ditt konto
          </h1>
          <p className="mt-2 text-gray-600">
            Eller{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              skapa ett nytt konto
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-postadress
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="namn@företag.se"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Lösenord
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              <span className="ml-2 text-sm text-gray-600">Kom ihåg mig</span>
            </label>
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Glömt lösenord?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loggar in...' : 'Logga in'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Genom att logga in godkänner du våra{' '}
          <Link href="#" className="text-blue-600 hover:underline">
            villkor
          </Link>{' '}
          och{' '}
          <Link href="#" className="text-blue-600 hover:underline">
            integritetspolicy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
