import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LiveApp } from '@/components/live/live-app'

export const metadata: Metadata = {
  title: 'Live Universe — AI Live Experiences',
  description:
    'Real-time AI-powered experiences, live creators, interactive events, premieres, and global entertainment.',
}

export default function LivePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-bg-void text-muted-foreground">
          Entering Live Universe…
        </div>
      }
    >
      <LiveApp />
    </Suspense>
  )
}
