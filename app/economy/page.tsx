import type { Metadata } from 'next'
import { Suspense } from 'react'
import { EconomyApp } from '@/components/economy/economy-app'

export const metadata: Metadata = {
  title: 'Virtual Universe — preview worlds and cards',
  description:
    'A spatial preview: AR overlays, VR chambers, and virtual cards. Nothing on this floor is a purchase.',
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
