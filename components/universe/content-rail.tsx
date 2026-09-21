'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { MediaItem } from '@/lib/universe/data'
import { MediaCard } from './media-card'
import { cn } from '@/lib/utils'

export function ContentRail({
  title,
  eyebrow,
  items,
  variant = 'poster',
  onPlay,
  onHover,
}: {
  title: string
  eyebrow?: string
  items: MediaItem[]
  variant?: 'poster' | 'wide' | 'square'
  onPlay?: (item: MediaItem) => void
  onHover?: (item: MediaItem | null) => void
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = React.useState(false)
  const [canRight, setCanRight] = React.useState(true)

  const update = React.useCallback(() => {
    const el = ref.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }, [])

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update, items])

  const scrollBy = (dir: -1 | 1) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.78, behavior: 'smooth' })
  }

  return (
    <section className="relative group/rail">
      <div className="mb-4 flex items-end justify-between gap-4 px-1">
        <div>
          {eyebrow && (
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-cyan/80">
              {eyebrow}
            </p>
          )}
          <h3 className="font-display text-xl font-semibold tracking-tight text-lunar md:text-2xl">
            {title}
          </h3>
        </div>
        <div className="hidden items-center gap-1 sm:flex">
          <button
            type="button"
            disabled={!canLeft}
            onClick={() => scrollBy(-1)}
            className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-muted-foreground transition-all hover:bg-white/[0.08] hover:text-foreground disabled:opacity-30"
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            disabled={!canRight}
            onClick={() => scrollBy(1)}
            className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-muted-foreground transition-all hover:bg-white/[0.08] hover:text-foreground disabled:opacity-30"
            aria-label="Scroll right"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className={cn(
          'flex gap-3.5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 scrollbar-none',
          'mask-rail'
        )}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            className="animate-rise"
            style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
          >
            <MediaCard
              item={item}
              variant={variant}
              onPlay={onPlay}
              onHover={onHover}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
