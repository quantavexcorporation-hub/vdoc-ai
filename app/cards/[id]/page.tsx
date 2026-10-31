import type { Metadata } from 'next'
import { CardsDetail } from '@/components/cards/cards-detail'
import { FLOOR_CARDS } from '@/lib/cards/catalog'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const card = FLOOR_CARDS.find((item) => item.id === id)
  return {
    title: card ? `${card.title} — Cards` : 'Card — VDOC',
    description: card?.summary ?? 'Platform-native collectible on the VDOC Cards floor.',
  }
}

export default async function CardDetailPage({ params }: Props) {
  const { id } = await params
  return <CardsDetail cardId={id} />
}
