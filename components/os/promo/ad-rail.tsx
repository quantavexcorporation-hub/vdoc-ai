'use client'

import * as React from 'react'
import Link from 'next/link'
import { Megaphone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AD_AUTO_MS, AD_SLOTS } from '@/lib/os/promo-rail'

export function AdRail({
  className,
  compact = false,
}: {
  className?: string
  compact?: boolean
}) {
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const touchX = React.useRef<number | null>(null)
  const ad = AD_SLOTS[index]

  React.useEffect(() => {
    if (paused) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % AD_SLOTS.length)
    }, AD_AUTO_MS)
    return () => window.clearInterval(id)
  }, [paused])

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null
    setPaused(true)
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchX.current
    touchX.current = null
    setPaused(false)
    if (start == null) return
    const end = e.changedTouches[0]?.clientX
    if (end == null) return
    const delta = end - start
    if (Math.abs(delta) < 40) return
    setIndex((i) =>
      delta < 0
        ? (i + 1) % AD_SLOTS.length
        : (i - 1 + AD_SLOTS.length) % AD_SLOTS.length
    )
  }

  return (
    <section
      className={cn('@container w-full min-w-0', className)}
      aria-label="Partner offers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="mb-1.5 flex items-center gap-1.5 px-0.5 sm:mb-2">
        <Megaphone className="size-3.5 shrink-0 text-white/40" aria-hidden />
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
          Partner Offers
        </p>
        <span className="ml-auto text-[9px] text-white/25 sm:hidden">Swipe</span>
      </div>

      <div
        className={cn(
          'relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#2a2a2a] sm:rounded-2xl',
          'flex flex-col p-3.5 sm:p-4',
          compact
            ? 'min-h-[9.5rem] @[32rem]:min-h-[7.5rem] @[32rem]:flex-row @[32rem]:items-stretch @[32rem]:gap-4'
            : 'min-h-[11rem] @[32rem]:min-h-[8.5rem] @[32rem]:flex-row @[32rem]:items-stretch @[32rem]:gap-5'
        )}
      >
        <div
          className="pointer-events-none absolute right-0 top-0 size-20 rounded-bl-full opacity-30 sm:size-24"
          style={{
            background: `radial-gradient(circle at top right, ${ad.accent}, transparent 70%)`,
          }}
          aria-hidden
        />

        <div className="relative flex min-w-0 flex-1 flex-col @[32rem]:justify-center">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider"
              style={{
                color: ad.accent,
                background: `${ad.accent}18`,
                border: `1px solid ${ad.accent}33`,
              }}
            >
              {ad.badge}
            </span>
            <span className="truncate text-[11px] text-white/35">{ad.sponsor}</span>
          </div>

          <h3 className="mt-2 text-sm font-semibold tracking-tight text-white/95 sm:mt-3 sm:text-base">
            {ad.headline}
          </h3>
          <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-white/45 sm:mt-1.5 sm:text-[13px] sm:line-clamp-3">
            {ad.body}
          </p>
        </div>

        <div
          className={cn(
            'relative mt-3 flex items-center justify-between gap-2',
            '@[32rem]:mt-0 @[32rem]:w-[9.5rem] @[32rem]:shrink-0 @[32rem]:flex-col @[32rem]:items-stretch @[32rem]:justify-center'
          )}
        >
          <Link
            href={ad.href}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.06] px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/[0.1] hover:text-white @[32rem]:w-full"
          >
            {ad.cta}
          </Link>
          <div
            className="flex items-center gap-0.5 @[32rem]:justify-center"
            role="tablist"
            aria-label="Offers"
          >
            {AD_SLOTS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-label={`Offer ${i + 1}`}
                aria-selected={i === index}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => setIndex(i)}
                className="inline-flex size-9 items-center justify-center sm:size-8"
              >
                <span
                  className={cn(
                    'size-1.5 rounded-full transition-colors',
                    i === index ? 'bg-white/80' : 'bg-white/20'
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
