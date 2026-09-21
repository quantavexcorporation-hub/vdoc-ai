import type { Metadata } from 'next'
import { ConverseApp } from '@/components/converse/converse-app'

export const metadata: Metadata = {
  title: 'Converse — VDOC',
  description:
    'A buttery conversation surface — streaming, branching, memory, media, and voice.',
}

export default function ConversePage() {
  return <ConverseApp />
}
