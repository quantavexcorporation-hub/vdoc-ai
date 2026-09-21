'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { Rarity } from '@/lib/economy/data'
import { RARITY_LABEL } from '@/lib/economy/data'

export function RarityChip({ rarity, className }: { rarity: Rarity; className?: string }) {
  return (
    <span className={cn('vydo-rarity-chip', `vydo-rarity-${rarity}`, className)}>
      {RARITY_LABEL[rarity]}
    </span>
  )
}

export function HoloOrb({
  hue,
  rarity,
  title,
  className,
}: {
  hue: number
  rarity: Rarity
  title: string
  className?: string
}) {
  return (
    <div
      className={cn('vydo-holo-orb group relative', `vydo-rarity-${rarity}`, className)}
      style={{ ['--orb-hue' as string]: hue }}
      aria-hidden
    >
      <div className="vydo-holo-orb-core" />
      <div className="vydo-holo-orb-ring" />
      <span className="sr-only">{title}</span>
    </div>
  )
}

export function EnergyValue({
  value,
  className,
  size = 'md',
}: {
  value: number | string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const formatted =
    typeof value === 'number' ? value.toLocaleString('en-US') : value
  return (
    <span
      className={cn(
        'vydo-energy inline-flex items-baseline gap-1 font-mono tabular-nums text-cyan',
        size === 'lg' && 'text-3xl md:text-4xl font-semibold tracking-tight',
        size === 'md' && 'text-lg font-medium',
        size === 'sm' && 'text-sm',
        className
      )}
    >
      <span className="vydo-energy-dot" aria-hidden />
      {formatted}
      <span className="text-[0.65em] text-cyan/70">Ξ</span>
    </span>
  )
}

export function SectionHead({
  id,
  eyebrow,
  title,
  body,
}: {
  id: string
  eyebrow: string
  title: string
  body?: string
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="ds-label mb-3">{eyebrow}</p>
      <h2 id={id} className="ds-heading-lg text-lunar">
        {title}
      </h2>
      {body ? <p className="mt-3 ds-body text-muted-foreground">{body}</p> : null}
    </div>
  )
}

/** Cinematic ownership confirm — no toast; OS theater. */
export function CinematicTransfer({
  open,
  title,
  onDone,
}: {
  open: boolean
  title: string | null
  onDone: () => void
}) {
  React.useEffect(() => {
    if (!open) return
    const t = window.setTimeout(onDone, 2800)
    return () => window.clearTimeout(t)
  }, [open, onDone])

  if (!open || !title) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-bg-void/80 backdrop-blur-md"
      role="alertdialog"
      aria-modal
      aria-label="Ownership transfer"
    >
      <div className="vydo-tx-stage relative mx-6 max-w-md overflow-hidden rounded-[var(--radius-2xl)] border border-cyan/25 p-10 text-center shadow-[var(--shadow-glow-cyan)]">
        <div className="vydo-tx-particles" aria-hidden />
        <p className="ds-label mb-3 text-cyan">Ownership sealed</p>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-lunar md:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-sm text-muted-foreground">
          Lumen congratulates you. Asset entering AI Digital Vault…
        </p>
        <div className="mx-auto mt-8 h-1 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="vydo-tx-bar h-full rounded-full bg-cyan" />
        </div>
      </div>
    </div>
  )
}
