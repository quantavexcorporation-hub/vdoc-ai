'use client'

import * as React from 'react'
import { Clapperboard, Film, ImageIcon, Play } from 'lucide-react'
import type { MediaPayload } from '@/lib/converse/types'
import { cn } from '@/lib/utils'

export function MediaCard({ media }: { media: MediaPayload }) {
  const [playing, setPlaying] = React.useState(media.kind !== 'image')
  const Icon =
    media.kind === 'image' ? ImageIcon : media.kind === 'video' ? Film : Clapperboard

  return (
    <figure className="converse-media my-4 w-full max-w-xl animate-rise">
      <div
        className={cn(
          'relative aspect-video overflow-hidden rounded-2xl border border-white/[0.1]',
          'bg-gradient-to-br',
          media.seed
        )}
      >
        {/* Procedural atmosphere — GPU transforms only */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-1/4 top-0 size-[70%] rounded-full bg-cyan/20 blur-3xl animate-atmosphere" />
          <div
            className="absolute -right-1/4 bottom-0 size-[60%] rounded-full bg-cosmic/30 blur-3xl animate-atmosphere"
            style={{ animationDelay: '-6s' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,oklch(0.05_0.01_280_/_0.55)_100%)]" />
        </div>

        {media.kind !== 'image' && (
          <>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="absolute left-1/2 top-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-lunar backdrop-blur-md transition-transform duration-[var(--duration-fast)] ease-[var(--ease-emphasized)] hover:scale-105 active:scale-95"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              <Play className={cn('size-6', playing && 'opacity-50')} fill="currentColor" />
            </button>
            {playing && <div className="converse-scanlines absolute inset-0 opacity-30" />}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
              <div className="converse-progress h-full bg-cyan/80" />
            </div>
          </>
        )}

        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-[11px] text-lunar/90 backdrop-blur-md">
          <Icon className="size-3.5 text-cyan" />
          {media.kind}
          {media.durationLabel && (
            <span className="text-muted-foreground">· {media.durationLabel}</span>
          )}
        </div>
      </div>

      <figcaption className="mt-3 space-y-2">
        <p className="font-display text-base font-medium tracking-tight text-lunar">
          {media.title}
        </p>
        {media.scenes && (
          <ol className="grid gap-2 sm:grid-cols-2">
            {media.scenes.map((s, i) => (
              <li
                key={s.title}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="ds-label text-[10px]">{s.title}</span>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.description}</p>
              </li>
            ))}
          </ol>
        )}
      </figcaption>
    </figure>
  )
}
