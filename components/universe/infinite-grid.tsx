'use client'

import * as React from 'react'
import type { MediaItem } from '@/lib/universe/data'
import { MediaCard } from './media-card'

export function InfiniteGrid({
  items,
  onLoadMore,
  hasMore,
  onPlay,
  onHover,
}: {
  items: MediaItem[]
  onLoadMore: () => void
  hasMore: boolean
  onPlay?: (item: MediaItem) => void
  onHover?: (item: MediaItem | null) => void
}) {
  const sentinel = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = sentinel.current
    if (!el || !hasMore) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore()
      },
      { rootMargin: '480px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [hasMore, onLoadMore, items.length])

  return (
    <section>
      <div className="mb-4">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-cyan/80">
          Infinite field
        </p>
        <h3 className="font-display text-xl font-semibold tracking-tight text-lunar md:text-2xl">
          Keep descending
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="animate-rise"
            style={{ animationDelay: `${(i % 12) * 30}ms` }}
          >
            <MediaCard
              item={item}
              fill
              onPlay={onPlay}
              onHover={onHover}
            />
          </div>
        ))}
      </div>

      <div ref={sentinel} className="flex h-24 items-center justify-center">
        {hasMore ? (
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-cyan animate-signal" />
            Generating more of the universe…
          </div>
        ) : (
          <p className="text-[12px] text-muted-foreground/50">End of this sector</p>
        )}
      </div>
    </section>
  )
}
