'use client'

import Link from 'next/link'
import { DsButton } from '@/components/ds'
import { BrandLogo } from '@/components/brand/logo'
import { NeuralField } from '@/components/home/neural-field'
import { LiveBadge } from './live-badge'

export function LiveHero() {
  return (
    <section
      id="live-enter"
      className="relative flex min-h-[88svh] flex-col justify-end overflow-hidden pb-16 pt-24 md:min-h-[92svh] md:justify-center md:pb-24 md:pt-28"
      aria-labelledby="live-headline"
    >
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-bg-void" />
        <div className="vdoc-horizon absolute inset-0" />
        <div className="vdoc-tech-mesh absolute inset-0 opacity-60" />
        <NeuralField className="absolute inset-0 opacity-50" />
        <div className="absolute inset-x-0 bottom-[32%] vdoc-signal-line opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-void/40 via-transparent to-bg-void" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-6 md:px-10">
        <div className="animate-rise mb-8 flex flex-wrap items-center gap-4">
          <BrandLogo size="lg" priority href="/" />
          <LiveBadge label="Livewire" />
          <span className="vdoc-status-chip">Signal live</span>
        </div>

        <h1
          id="live-headline"
          className="animate-rise animate-rise-delay-1 max-w-3xl font-display text-[clamp(2.5rem,8vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-lunar"
        >
          Entertainment
          <br />
          <span className="bg-gradient-to-r from-lunar via-cyan to-neon bg-clip-text text-transparent">
            in real time.
          </span>
        </h1>

        <p className="animate-rise animate-rise-delay-2 mt-6 max-w-xl text-pretty ds-body-lg">
          AI stages, live creators, interactive premieres — experiences that rewrite themselves
          while the world watches.
        </p>

        <div className="animate-rise animate-rise-delay-3 mt-10 flex flex-wrap gap-3">
          <DsButton asChild variant="lunar" size="lg">
            <a href="#live-now">Explore Live</a>
          </DsButton>
          <DsButton asChild variant="glass" size="lg">
            <Link href="/converse">Create Live Event</Link>
          </DsButton>
        </div>
      </div>
    </section>
  )
}
