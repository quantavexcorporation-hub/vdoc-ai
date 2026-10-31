'use client'

import Link from 'next/link'
import { TiltCard } from '@/components/motion/tilt-card'
import { cn } from '@/lib/utils'
import { RARITY_COPY } from '@/lib/cards/catalog'
import type { CardDefinition, CardInstance } from '@/lib/cards/types'

export function HoloCard({
  card,
  instance,
  href,
  spin = false,
  size = 'md',
}: {
  card: CardDefinition
  instance?: CardInstance
  href?: string
  spin?: boolean
  size?: 'sm' | 'md' | 'lg'
}) {
  const inner = (
    <TiltCard
      maxTilt={spin ? 0 : 12}
      className={cn(
        'vdoc-nft-card',
        size === 'sm' && 'vdoc-nft-card-sm',
        size === 'lg' && 'vdoc-nft-card-lg',
        spin && 'vdoc-nft-spin'
      )}
      style={{ ['--nft-hue' as string]: card.hue }}
      data-rarity={card.rarity}
    >
      <div className="vdoc-nft-sheen" aria-hidden />
      <div className="vdoc-nft-foil" aria-hidden />
      <p className="vdoc-nft-series">{card.series}</p>
      <h3 className="vdoc-nft-title">{card.title}</h3>
      <p className="vdoc-nft-ability">{card.ability}</p>
      <div className="vdoc-nft-meta">
        <span className="vdoc-nft-rarity">{RARITY_COPY[card.rarity].label}</span>
        <span>
          {instance
            ? `#${instance.edition} / ${card.editionLimit}`
            : `limit ${card.editionLimit}`}
        </span>
      </div>
      {instance?.evolved ? (
        <p className="vdoc-nft-evolve">Evolved {instance.evolved}</p>
      ) : null}
    </TiltCard>
  )

  if (!href) return inner
  return (
    <Link href={href} className="block rounded-[1.15rem] outline-none focus-visible:shadow-[var(--shadow-focus)]">
      {inner}
    </Link>
  )
}

export function LumenMark({ value }: { value: number }) {
  return (
    <span className="font-mono tabular-nums text-cyan">
      {value.toLocaleString('en-US')}
      <span className="ml-1 text-[0.7em] text-cyan/60">Lm</span>
    </span>
  )
}
