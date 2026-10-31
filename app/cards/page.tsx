import type { Metadata } from 'next'
import { CardsMarket } from '@/components/cards/cards-market'

export const metadata: Metadata = {
  title: 'Leaderboard — VDOC Cards',
  description:
    'Legendary, Epic, and Rare on one Cards desk. Floor credit only. Chain mint stays off until a chain is configured.',
}

export default function CardsPage() {
  return <CardsMarket />
}
