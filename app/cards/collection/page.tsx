import type { Metadata } from 'next'
import { CardsCollection } from '@/components/cards/cards-collection'

export const metadata: Metadata = {
  title: 'Collection — VDOC Cards',
  description: 'Your platform-native cards, showcase, and floor history on this device.',
}

export default function CardsCollectionPage() {
  return <CardsCollection />
}
