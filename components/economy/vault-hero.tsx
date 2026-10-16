'use client'

import * as React from 'react'
import Link from 'next/link'
import { Shield, Sparkles, Activity } from 'lucide-react'
import { VAULT } from '@/lib/economy/data'
import { BrandLogo } from '@/components/brand/logo'
import { EnergyValue, HoloOrb } from './primitives'
import { DsButton } from '@/components/ds'

export function VaultHero() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), 120)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section
      id="vault"
      className="relative flex min-h-[88svh] flex-col justify-center overflow-hidden pb-16 pt-24 md:pb-24 md:pt-28"
      aria-labelledby="vault-title"
    >
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="vdoc-aurora absolute inset-0 opacity-70" />
        <div className="vdoc-tech-mesh absolute inset-0 opacity-40" />
        <div className="vdoc-neural-lines absolute inset-0 opacity-35" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-6 md:px-10">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <BrandLogo size="lg" href="/" />
          <span className="vdoc-status-chip">Virtual Universe</span>
        </div>

        <div
          className={
            open
              ? 'vydo-vault-door vdoc-liquid-glass overflow-hidden rounded-[var(--radius-2xl)] p-6 md:p-10'
              : 'opacity-0'
          }
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="ds-label mb-3">AI Digital Vault</p>
              <h1
                id="vault-title"
                className="font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-lunar"
              >
                Enter the world.
                <br />
                <span className="bg-gradient-to-r from-lunar via-cyan to-neon bg-clip-text text-transparent">
                  Hold the card.
                </span>
              </h1>
              <p className="mt-5 max-w-md text-pretty ds-body">
                Virtual Universe is a spatial place — AR over your room, VR you can walk, NFT cards
                that are not copies of each other, and assets that only live inside the world.{' '}
                {VAULT.guardian} still guards the vault beneath it.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                  <DsButton asChild variant="lunar" size="lg">
                    <a href="#worlds">Enter AR/VR world</a>
                  </DsButton>
                <DsButton asChild variant="glass" size="lg">
                  <a href="#cards">View NFT cards</a>
                </DsButton>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-xs flex-col items-center rounded-[var(--radius-2xl)] border border-cyan/20 bg-black/30 p-6 text-center backdrop-blur-md md:mx-0">
              <HoloOrb hue={200} rarity="cosmic" title={VAULT.guardian} className="mb-4 size-24" />
              <p className="ds-label">Guardian · {VAULT.guardian}</p>
              <p className="mt-1 text-sm text-muted-foreground">{VAULT.status}</p>

              <div className="mt-6 w-full space-y-4 text-left">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    Energy balance
                  </p>
                  <EnergyValue value={VAULT.balance} size="lg" className="mt-1" />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="size-3.5 text-cyan" aria-hidden />
                    Assets
                  </span>
                  <span className="font-mono text-lg text-lunar">{VAULT.assets}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Activity className="size-3.5 text-cyan" aria-hidden />
                    Flow
                  </span>
                  <span className="font-mono text-sm text-cyan">{VAULT.energyFlow}</span>
                </div>
              </div>

              <Link
                href="#energy"
                className="mt-6 inline-flex items-center gap-2 text-[12px] text-cyan hover:underline"
              >
                <Shield className="size-3.5" aria-hidden />
                Ask vault assistant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
