import type { Metadata } from 'next'
import { Suspense } from 'react'
import { EconomyApp } from '@/components/economy/economy-app'

export const metadata: Metadata = {
  title: 'Virtual Universe — AI Digital Vault',
  description:
    'The financial layer of the AI Entertainment OS — digital vault, asset universe, collectibles, land, and living ownership.',
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
