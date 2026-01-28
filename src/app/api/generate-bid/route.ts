import { NextRequest, NextResponse } from 'next/server'

// This would use Claude API in production
export async function POST(request: NextRequest) {
  try {
    const { upphandling, företagsprofil } = await request.json()

    // In production, this would call Claude API:
    // const response = await anthropic.messages.create({
    //   model: 'claude-3-opus-20240229',
    //   max_tokens: 4096,
    //   messages: [{
    //     role: 'user',
    //     content: `Generera ett anbudssvar baserat på följande upphandling och företagsprofil...`
    //   }]
    // })

    // For MVP, return mock response
    const mockBid = `# Anbud: ${upphandling.titel}

## 1. Anbudsgivare

**${företagsprofil.företagsnamn}**
Org.nr: ${företagsprofil.organisationsnummer}
${företagsprofil.adress}, ${företagsprofil.postort}

Kontaktperson: ${företagsprofil.kontaktperson}
E-post: ${företagsprofil.epost}
Tel: ${företagsprofil.telefon}

---

## 2. Företagspresentation

${företagsprofil.beskrivning}

---

## 3. Uppfyllande av krav

[AI-genererat svar för varje krav baserat på företagsprofilen]

---

## 4. Referenser

[Referenser från företagsprofilen]

---

*Detta anbud har genererats med stöd av AI.*
`

    return NextResponse.json({ bid: mockBid })
  } catch (error) {
    console.error('Error generating bid:', error)
    return NextResponse.json(
      { error: 'Failed to generate bid' },
      { status: 500 }
    )
  }
}
