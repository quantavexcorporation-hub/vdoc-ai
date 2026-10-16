'use client'

import * as React from 'react'
import { Box, Glasses, Scan } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  CARD_KIND_LABEL,
  SPATIAL_WORLDS,
  type NftCard,
  type SpatialMode,
  type SpatialWorld,
} from '@/lib/economy/spatial'

function CardFace({
  card,
  active,
  onSelect,
}: {
  card: NftCard
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={cn(
        'vu-card group relative shrink-0 text-left transition-transform duration-300',
        `vu-card-${card.kind}`,
        active && 'vu-card-active scale-[1.02]'
      )}
      style={{ ['--card-hue' as string]: card.hue }}
    >
      <span className="vu-card-kicker">{CARD_KIND_LABEL[card.kind]}</span>
      <span className="vu-card-title">{card.title}</span>
      <span className="vu-card-edition">{card.edition}</span>
      <span className="vu-card-foot">
        <span>NFT</span>
        <span>{card.supply}</span>
      </span>
    </button>
  )
}

export function SpatialWorld() {
  const [worldId, setWorldId] = React.useState(SPATIAL_WORLDS[0].id)
  const [mode, setMode] = React.useState<SpatialMode>('vr')
  const [cardId, setCardId] = React.useState(SPATIAL_WORLDS[0].cards[0].id)

  const world = SPATIAL_WORLDS.find((w) => w.id === worldId) ?? SPATIAL_WORLDS[0]
  const card = world.cards.find((c) => c.id === cardId) ?? world.cards[0]

  const pickWorld = (next: SpatialWorld) => {
    setWorldId(next.id)
    setCardId(next.cards[0].id)
  }

  return (
    <section
      id="worlds"
      className="relative overflow-hidden border-b border-white/[0.06] pb-12 pt-6 sm:pb-16 sm:pt-8"
      aria-labelledby="spatial-title"
    >
      <div className="mx-auto max-w-[1400px] px-3 sm:px-6 md:px-10">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/35">
              Spatial layer
            </p>
            <h2
              id="spatial-title"
              className="mt-2 font-display text-[clamp(1.7rem,4vw,2.8rem)] font-semibold tracking-tight text-white/95"
            >
              An AR/VR world you hold.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/45">
              Not a headset store or a theme park queue. Each world is a place, a set of NFT cards,
              and the assets that only exist inside it.
            </p>
          </div>
          <div
            className="inline-flex w-fit rounded-full border border-white/10 bg-black/30 p-1"
            role="group"
            aria-label="Spatial mode"
          >
            <button
              type="button"
              onClick={() => setMode('ar')}
              aria-pressed={mode === 'ar'}
              className={cn(
                'inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-xs',
                mode === 'ar' ? 'bg-white text-[#141414]' : 'text-white/55'
              )}
            >
              <Scan className="size-3.5" aria-hidden />
              AR overlay
            </button>
            <button
              type="button"
              onClick={() => setMode('vr')}
              aria-pressed={mode === 'vr'}
              className={cn(
                'inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-xs',
                mode === 'vr' ? 'bg-white text-[#141414]' : 'text-white/55'
              )}
            >
              <Glasses className="size-3.5" aria-hidden />
              VR chamber
            </button>
          </div>
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {SPATIAL_WORLDS.map((w) => (
            <button
              key={w.id}
              type="button"
              onClick={() => pickWorld(w)}
              aria-pressed={w.id === world.id}
              className={cn(
                'shrink-0 rounded-full border px-3 py-2 text-left text-xs transition-colors',
                w.id === world.id
                  ? 'border-white/30 bg-white/[0.08] text-white'
                  : 'border-white/10 text-white/50 hover:text-white/80'
              )}
            >
              <span className="block font-medium">{w.name}</span>
              <span className="block text-[10px] uppercase tracking-wider text-white/35">
                {w.district}
              </span>
            </button>
          ))}
        </div>

        <div
          className="vu-stage relative min-h-[22rem] overflow-hidden rounded-3xl border border-white/10 sm:min-h-[28rem]"
          style={{
            ['--world-hue' as string]: world.hue,
            ['--world-accent' as string]: world.accent,
          }}
          data-mode={mode}
        >
          <div className="vu-stage-sky" aria-hidden />
          <div className="vu-stage-grid" aria-hidden />
          <div className={cn('vu-stage-horizon', mode === 'ar' && 'vu-stage-horizon-ar')} aria-hidden />
          <div className="vu-float vu-float-a" aria-hidden />
          <div className="vu-float vu-float-b" aria-hidden />
          <div className="vu-float vu-float-c" aria-hidden />

          <div className="relative z-10 flex h-full min-h-[22rem] flex-col justify-between p-4 sm:min-h-[28rem] sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  {mode === 'ar' ? 'Augmented' : 'Immersive'} · {world.presence}
                </p>
                <h3 className="mt-1 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {world.name}
                </h3>
                <p className="mt-2 max-w-md text-sm text-white/70">{world.line}</p>
              </div>
              <span className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/70 sm:inline-flex">
                <Box className="size-3" aria-hidden />
                {mode === 'ar' ? 'Room locked' : 'Full chamber'}
              </span>
            </div>

            <div className="max-w-lg rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur-md sm:p-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                {mode === 'ar' ? 'How it sits in your space' : 'How it feels inside'}
              </p>
              <p className="mt-1.5 text-sm text-white/80">{mode === 'ar' ? world.ar : world.vr}</p>
              {card ? (
                <p className="mt-2 text-xs text-white/45">
                  Holding <span className="text-white/80">{card.title}</span> — {card.trait}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div id="cards" className="mt-8">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35">
                NFT cards
              </p>
              <h3 className="mt-1 text-lg font-semibold text-white/90">Different cards, not one template</h3>
            </div>
            <p className="hidden text-xs text-white/35 sm:block">Bound to {world.name}</p>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {world.cards.map((c) => (
              <CardFace
                key={c.id}
                card={c}
                active={c.id === card.id}
                onSelect={() => setCardId(c.id)}
              />
            ))}
          </div>
        </div>

        <div id="spatial-assets" className="mt-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35">
            Virtual assets
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white/90">What you carry into {world.name}</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {world.assets.map((asset) => (
              <article
                key={asset.id}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
              >
                <div
                  className="mb-3 h-16 rounded-xl"
                  style={{
                    background: `linear-gradient(145deg, oklch(0.55 0.12 ${asset.hue} / 0.55), oklch(0.2 0.04 ${asset.hue} / 0.9))`,
                  }}
                  aria-hidden
                />
                <p className="text-[10px] uppercase tracking-wider text-cyan/80">{asset.slot}</p>
                <h4 className="mt-1 font-medium text-white/90">{asset.title}</h4>
                <p className="mt-1 text-sm text-white/45">{asset.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
