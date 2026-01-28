import BidPageClient from './BidPageClient'

// Required for static export - pre-render all bid pages
export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ]
}

export default function BidPage() {
  return <BidPageClient />
}
