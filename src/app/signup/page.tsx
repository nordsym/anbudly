'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    företagsnamn: '',
    namn: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Lösenorden matchar inte')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('Lösenordet måste vara minst 8 tecken')
      setLoading(false)
      return
    }

    // Mock signup - i produktion använd Supabase auth
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-blue-600">
            Anbudly
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Skapa ditt konto
          </h1>
          <p className="mt-2 text-gray-600">
            Har du redan ett konto?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Logga in
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
            <label htmlFor="företagsnamn" className="block text-sm font-medium text-gray-700 mb-1">
              Företagsnamn
            </label>
            <input
              type="text"
              id="företagsnamn"
              name="företagsnamn"
              value={formData.företagsnamn}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ditt Företag AB"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="namn" className="block text-sm font-medium text-gray-700 mb-1">
              Ditt namn
            </label>
            <input
              type="text"
              id="namn"
              name="namn"
              value={formData.namn}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Anna Andersson"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-postadress
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="namn@företag.se"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Lösenord
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Minst 8 tecken"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Bekräfta lösenord
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Upprepa lösenordet"
              required
            />
          </div>

          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded mt-1"
                required
              />
              <span className="ml-2 text-sm text-gray-600">
                Jag godkänner{' '}
                <Link href="#" className="text-blue-600 hover:underline">
                  användarvillkoren
                </Link>{' '}
                och{' '}
                <Link href="#" className="text-blue-600 hover:underline">
                  integritetspolicyn
                </Link>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Skapar konto...' : 'Skapa konto'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Genom att skapa ett konto får du tillgång till:
          </p>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>✓ Bevakning av 3 sökord</li>
            <li>✓ 1 dokumentanalys per månad</li>
            <li>✓ Grundläggande checklist</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
