import type { Metadata } from 'next'
import { Suspense } from 'react'
import { VideoGenesisGate } from '@/components/nexus/video-genesis-gate'

export const metadata: Metadata = {
  title: 'Video Genesis — AI Creative Intelligence Studio',
  description:
    'Creator-only AI entertainment studio for movies, shows, games, and worlds. Evolution layer on Vdoc.',
}

export default function VideoGenesisPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-[#0f0f0f] text-white/40">
          Opening Video Genesis…
        </div>
      }
    >
      <VideoGenesisGate />
    </Suspense>
  )
}
