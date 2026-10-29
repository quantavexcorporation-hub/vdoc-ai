import type { Metadata } from 'next'
import { Suspense } from 'react'
import { UniverseApp } from '@/components/universe/universe-app'

export const metadata: Metadata = {
  title: 'Universe — VDOC',
  description:
    'Enter the AI Entertainment Universe — movies, series, games, stories, comics, shorts, novels, and virtual worlds.',
}

export default function UniversePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-bg-void text-muted-foreground">
          Entering universe…
        </div>
      }
    >
      <UniverseApp />
    </Suspense>
  )
}
