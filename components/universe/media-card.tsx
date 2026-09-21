'use client'

import * as React from 'react'
import { Play, Radio, Star } from 'lucide-react'
import type { MediaItem } from '@/lib/universe/data'
import { TiltCard } from '@/components/motion/tilt-card'
import { AliveMeta } from '@/components/os/alive-meta'
import { cn } from '@/lib/utils'

export function MediaCard({
  item,
  variant = 'poster',
  fill = false,
  onPlay,
  onHover,
}: {
  item: MediaItem
  variant?: 'poster' | 'wide' | 'square'
  fill?: boolean
  onPlay?: (item: MediaItem) => void
  onHover?: (item: MediaItem | null) => void
}) {
  const [active, setActive] = React.useState(false)

  const aspect =
    variant === 'wide'
      ? 'aspect-[16/9]'
      : variant === 'square'
        ? 'aspect-square'
        : 'aspect-[2/3]'

  return (
    <TiltCard
      as="article"
      maxTilt={fill ? 0 : 3}
      glare={false}
      className={cn(
        'universe-card group relative motion-card-lift',
        fill
          ? 'w-full'
          : variant === 'wide'
            ? 'w-[min(86vw,340px)] shrink-0 snap-start'
            : 'w-[min(42vw,168px)] shrink-0 snap-start sm:w-[180px]',
        !fill && variant === 'square' && 'w-[min(42vw,160px)] sm:w-[168px]'
      )}
      onPointerEnter={() => {
        setActive(true)
        onHover?.(item)
      }}
      onPointerLeave={() => {
        setActive(false)
        onHover?.(null)
      }}
      onFocus={() => onHover?.(item)}
      onBlur={() => onHover?.(null)}
    >
      <button
        type="button"
        onClick={() => onPlay?.(item)}
        className="vdoc-holo-card relative block w-full rounded-[var(--radius-xl)] text-left focus-visible:shadow-[var(--shadow-focus)]"
        aria-label={`Play ${item.title}`}
      >
        <div className={cn('relative overflow-hidden rounded-[var(--radius-xl)]', aspect)}>
          {item.hue != null ? (
            <div
              className="vdoc-frame absolute inset-0"
              style={{ ['--frame-hue' as string]: item.hue }}
              aria-hidden
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt=""
              loading="lazy"
              decoding="async"
              className={cn(
                'absolute inset-0 size-full object-cover transition-transform duration-[700ms] ease-[var(--ease-emphasized)]',
                active && 'scale-[1.06]'
              )}
            />
          )}

          <div
            className={cn(
              'pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-[var(--duration-normal)]',
              active ? 'opacity-100' : 'opacity-75'
            )}
          />

          <div
            className={cn(
              'absolute inset-x-0 bottom-0 p-3 transition-all duration-[var(--duration-normal)] ease-[var(--ease-emphasized)]',
              active ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-95'
            )}
          >
            <AliveMeta
              seed={item.id + item.title}
              summary={item.subtitle}
              compact
              className="mb-1.5"
            />
            <p className="truncate font-display text-[13px] font-semibold tracking-tight text-lunar">
              {item.title}
            </p>
            <p className="mt-0.5 truncate text-[12px] text-muted-foreground">{item.subtitle}</p>
          </div>

          <span
            className={cn(
              'absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-lunar backdrop-blur-md transition-all duration-[var(--duration-normal)] ease-[var(--ease-emphasized)]',
              active
                ? 'scale-100 opacity-100'
                : 'scale-90 opacity-0 group-focus-within:scale-100 group-focus-within:opacity-100'
            )}
          >
            <Play className="size-4 translate-x-0.5" fill="currentColor" />
          </span>

          {item.live && (
            <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-[var(--radius-md)] border border-white/15 bg-black/50 px-2 py-0.5 text-[11px] font-medium text-cyan backdrop-blur-md">
              <Radio className="size-2.5" />
              Live
            </span>
          )}

          {item.duration && (
            <span className="absolute right-2.5 top-2.5 rounded-[var(--radius-sm)] bg-black/55 px-1.5 py-0.5 font-mono text-[10px] text-lunar backdrop-blur-sm">
              {item.duration}
            </span>
          )}
        </div>
      </button>

      {item.rating != null && (
        <div className="mt-2 flex items-center gap-1 px-0.5 text-[12px] text-muted-foreground">
          <Star className="size-3 text-warning" fill="currentColor" />
          <span className="tabular-nums text-lunar">{item.rating.toFixed(1)}</span>
          {item.author && <span className="truncate">· {item.author}</span>}
        </div>
      )}
    </TiltCard>
  )
}
