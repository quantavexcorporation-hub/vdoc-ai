import type { Metadata } from 'next'
import { CardsStudio } from '@/components/cards/cards-studio'

export const metadata: Metadata = {
  title: 'Studio — VDOC Cards',
  description:
    'Create Legendary, Epic, or Rare cards on this device. Floor studio, not a remote admin console.',
}

export default function CardsStudioPage() {
  return <CardsStudio />
}
