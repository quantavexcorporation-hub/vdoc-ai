'use client'

import * as React from 'react'
import Link from 'next/link'
import { Clapperboard, Shield } from 'lucide-react'
import { enableCreator, isCreator } from '@/lib/nexus/access'
import { NexusExperience } from '@/components/nexus/nexus-experience'

/**
 * Video Genesis — creators only (mirrors Quantrion LectureForge professional gate).
 */
export function VideoGenesisGate() {
  const [allowed, setAllowed] = React.useState(false)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setAllowed(isCreator())
    setReady(true)
  }, [])

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#0f0f0f] text-white/40">
        Checking creator access…
      </div>
    )
  }

  if (!allowed) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-[#0f0f0f] px-4 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-amber-400/25 bg-[#161616] p-8">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
            <Shield className="size-6" aria-hidden />
          </div>
          <h1 className="text-lg font-semibold text-white/95">Creators only</h1>
          <p className="mt-2 text-sm leading-relaxed text-white/45">
            <span className="font-medium text-white/70">Video Genesis</span> is the software machine
            for Vdoc creators — AI as engine, data as layer. Audience keeps entertainment; creators
            unlock production.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => {
                enableCreator()
                setAllowed(true)
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-[#141414]"
            >
              <Clapperboard className="size-4" aria-hidden />
              Continue as creator
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/70 hover:bg-white/[0.05]"
            >
              Back to Dashboard
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-white/30">
            Demo unlock stores a local creator flag until real auth roles ship.
          </p>
        </div>
      </div>
    )
  }

  return <NexusExperience />
}
