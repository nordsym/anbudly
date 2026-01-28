import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">Anbudly</div>
          <div className="space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Logga in
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Kom igång gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Vinn offentliga upphandlingar
          <span className="text-blue-600"> på halva tiden</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          AI som läser dokumenten, checkar kraven och skriver ditt anbud.
          Automatisera 70% av det administrativa arbetet och fokusera på att vinna.
        </p>
        <div className="space-x-4">
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition inline-block"
          >
            Starta gratis provperiod
          </Link>
          <Link
            href="#features"
            className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition inline-block"
          >
            Se hur det fungerar
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">70%</div>
              <div className="text-gray-600">Mindre administrativt arbete</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">40-85h</div>
              <div className="text-gray-600">Sparad tid per anbud</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">100%</div>
              <div className="text-gray-600">Kravkontroll</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Allt du behöver för att vinna upphandlingar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="🔍"
              title="Smart Bevakning"
              description="AI-filtrering som hittar de mest relevanta upphandlingarna för ditt företag automatiskt."
            />
            <FeatureCard
              icon="📄"
              title="Dokumentanalys"
              description="Automatisk extraktion av alla ska-krav, bör-krav och deadlines från upphandlingsdokument."
            />
            <FeatureCard
              icon="✍️"
              title="AI-genererat anbud"
              description="Genererar kompletta anbudsutkast baserat på din företagsprofil och tidigare anbud."
            />
            <FeatureCard
              icon="✅"
              title="Checklista-motor"
              description="Automatgenererad checklista som säkerställer att du inte missar några ska-krav."
            />
            <FeatureCard
              icon="📊"
              title="Gap-analys"
              description="Se direkt vad som saknas för att kvalificera och vilka krav som kan vara svåra."
            />
            <FeatureCard
              icon="📁"
              title="Dokumentbibliotek"
              description="Samla certifikat, CV:n och referenser på ett ställe för snabb återanvändning."
            />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Vi löser ett riktigt problem
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Svenska SME lägger 40-80 timmar per anbud på upphandlingar de ofta förlorar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-red-600 mb-2">❌ Utan Anbudly</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 5-10 timmar/vecka att hitta upphandlingar</li>
                <li>• 8-20 timmar att läsa dokumenten</li>
                <li>• 20-40 timmar att skriva anbudet</li>
                <li>• Risk att missa ska-krav = diskvalificering</li>
                <li>• Hitrate på bara 10-15%</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-500">
              <h3 className="font-semibold text-green-600 mb-2">✅ Med Anbudly</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Relevanta upphandlingar levereras automatiskt</li>
                <li>• AI extraherar alla krav på sekunder</li>
                <li>• Anbudsutkast genereras direkt</li>
                <li>• Checklista säkerställer inga missade krav</li>
                <li>• Fokusera på kvalitet, inte administration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Enkel och transparent prissättning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard
              name="Free"
              price="0"
              description="Perfekt för att testa"
              features={[
                'Bevakning (3 sökord)',
                '1 dokumentanalys/månad',
                'Grundläggande checklist',
              ]}
            />
            <PricingCard
              name="Starter"
              price="990"
              description="För seriösa anbudsgivare"
              features={[
                'Obegränsad bevakning',
                '5 dokumentanalyser/månad',
                '2 anbudsgenereringar/månad',
                'Företagsprofil',
                'Email-support',
              ]}
              highlighted
            />
            <PricingCard
              name="Pro"
              price="2 490"
              description="För aktiva anbudsgivare"
              features={[
                'Allt i Starter',
                'Obegränsade analyser',
                '10 anbudsgenereringar/månad',
                'Prioriterad support',
                'API-access',
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Redo att vinna fler upphandlingar?
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Starta din gratis provperiod idag och se hur AI kan transformera ditt anbudsarbete.
          </p>
          <Link
            href="/signup"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition inline-block"
          >
            Starta gratis provperiod
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-white mb-4 md:mb-0">Anbudly</div>
            <div className="space-x-6">
              <Link href="#" className="hover:text-white">Om oss</Link>
              <Link href="#" className="hover:text-white">Kontakt</Link>
              <Link href="#" className="hover:text-white">Villkor</Link>
              <Link href="#" className="hover:text-white">Integritet</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            © 2025 Anbudly. Alla rättigheter förbehållna.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false,
}: {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
}) {
  return (
    <div
      className={`p-8 rounded-lg ${
        highlighted
          ? 'bg-blue-600 text-white ring-4 ring-blue-600 ring-offset-2'
          : 'bg-white border border-gray-200'
      }`}
    >
      <h3 className={`text-xl font-semibold ${highlighted ? 'text-white' : 'text-gray-900'}`}>
        {name}
      </h3>
      <p className={`text-sm ${highlighted ? 'text-blue-100' : 'text-gray-500'} mb-4`}>
        {description}
      </p>
      <div className="mb-6">
        <span className={`text-4xl font-bold ${highlighted ? 'text-white' : 'text-gray-900'}`}>
          {price}
        </span>
        <span className={highlighted ? 'text-blue-100' : 'text-gray-500'}> kr/mån</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <span className={`mr-2 ${highlighted ? 'text-blue-200' : 'text-green-500'}`}>✓</span>
            <span className={highlighted ? 'text-blue-100' : 'text-gray-600'}>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/signup"
        className={`block text-center py-3 rounded-lg font-semibold transition ${
          highlighted
            ? 'bg-white text-blue-600 hover:bg-blue-50'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Kom igång
      </Link>
    </div>
  )
}
