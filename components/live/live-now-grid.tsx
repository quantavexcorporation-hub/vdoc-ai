'use client'

import * as React from 'react'
import { LIVE_NOW, CATEGORY_LABEL, type LiveCategoryId, type LiveEvent } from '@/lib/live/data'
import { LiveBadge } from './live-badge'
import { AliveMeta } from '@/components/os/alive-meta'
import { cn } from '@/lib/utils'

function LiveCard({ event }: { event: LiveEvent }) {
  const [active, setActive] = React.useState(false)

  return (
    <article
      className={cn(
        'vdoc-holo-card group relative rounded-[var(--radius-xl)]',
        'focus-within:shadow-[var(--shadow-focus)]'
      )}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      <button
        type="button"
        className="relative block w-full text-left focus-visible:outline-none"
        aria-label={`Join ${event.title}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <div
            className={cn(
              'vdoc-frame absolute inset-0 transition-transform duration-[700ms] ease-[var(--ease-emphasized)]',
              active && 'scale-[1.05]'
            )}
            style={{ ['--frame-hue' as string]: event.hue }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent" />
          <div className="absolute left-3 top-3">
            <LiveBadge />
          </div>
          {event.duration && (
            <span className="absolute bottom-3 right-3 rounded-[var(--radius-sm)] bg-black/55 px-2 py-0.5 font-mono text-[11px] text-lunar backdrop-blur-sm">
              {event.duration}
            </span>
          )}
        </div>

        <div className="p-4">
          <AliveMeta seed={event.id + event.title} className="mb-2" />
          <p className="ds-label text-[10px]">{CATEGORY_LABEL[event.category]}</p>
          <h3 className="mt-2 font-display text-base font-semibold tracking-tight text-lunar">
            {event.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
            {event.description}
          </p>
          <div className="mt-3 flex items-center justify-between gap-2 text-[12px] text-muted-foreground">
            <span className="truncate text-lunar/90">{event.host}</span>
            <span className="shrink-0 tabular-nums">{event.viewers}</span>
          </div>
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
            {event.tags.map((t) => (
              <li
                key={t}
                className="rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </button>
    </article>
  )
}

export function LiveNowGrid() {
  const [filter, setFilter] = React.useState<LiveCategoryId | 'all'>('all')
  const items =
    filter === 'all' ? LIVE_NOW : LIVE_NOW.filter((e) => e.category === filter)

  const filters: { id: LiveCategoryId | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'premieres', label: 'Premieres' },
    { id: 'creators', label: 'Creators' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'stories', label: 'Stories' },
    { id: 'ai', label: 'AI' },
  ]

  return (
    <section id="live-now" className="relative py-16 md:py-24" aria-labelledby="live-now-title">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="ds-label mb-3">Live now</p>
            <h2 id="live-now-title" className="ds-heading-lg text-lunar">
              Happening across the OS
            </h2>
          </div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter live experiences"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn('ix-select', filter === f.id && 'ix-select-on')}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((event) => (
            <LiveCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
