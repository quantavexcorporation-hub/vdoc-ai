import type { Metadata } from 'next'
import { CardsMarket } from '@/components/cards/cards-market'

export const metadata: Metadata = {
  title: 'Cards — VDOC collectible floor',
  description:
    'Legendary, Epic, and Rare platform-native cards. Floor credit only. Chain mint stays off until a chain is configured.',
}

export default function CardsPage() {
  return <CardsMarket />
}
