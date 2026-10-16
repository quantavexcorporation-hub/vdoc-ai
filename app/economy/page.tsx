import type { Metadata } from 'next'
import { Suspense } from 'react'
import { EconomyApp } from '@/components/economy/economy-app'

export const metadata: Metadata = {
  title: 'Virtual Universe — AR/VR worlds, NFT cards, assets',
  description:
    'A spatial entertainment world: AR overlays, VR chambers, distinct NFT cards, and virtual assets bound to each place.',
}

export default function EconomyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-bg-void text-muted-foreground">
          Opening Virtual Universe…
        </div>
      }
    >
      <EconomyApp />
    </Suspense>
  )
}
