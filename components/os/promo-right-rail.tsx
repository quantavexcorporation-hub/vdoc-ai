'use client'

import * as React from 'react'
import { FeatureCarousel } from '@/components/os/promo/feature-carousel'
import { SpotlightCard } from '@/components/os/promo/spotlight-card'
import { AdRail } from '@/components/os/promo/ad-rail'
import { cn } from '@/lib/utils'

const PANELS = [
  { id: 'intel', label: 'Intelligence' },
  { id: 'spotlight', label: 'Spotlight' },
  { id: 'offers', label: 'Offers' },
] as const

/**
 * Top horizontal promo — same three displays as the old right rail:
 * Intelligence Display · Spotlight · Partner Offers
 * Responsive: phone swipe · tablet 2+banner · desktop 3-up
 */
export function PromoTopRail({ className }: { className?: string }) {
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(0)

  const syncActive = React.useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>('[data-promo-panel]')
    if (!cards.length) return
    const mid = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let bestDist = Infinity
    cards.forEach((card, i) => {
      const center = card.offsetLeft + card.offsetWidth / 2
      const dist = Math.abs(center - mid)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    setActive(best)
  }, [])

  React.useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    syncActive()
    el.addEventListener('scroll', syncActive, { passive: true })
    window.addEventListener('resize', syncActive)
    return () => {
      el.removeEventListener('scroll', syncActive)
      window.removeEventListener('resize', syncActive)
    }
  }, [syncActive])

  const goTo = (i: number) => {
    const el = scrollerRef.current
    const card = el?.querySelectorAll<HTMLElement>('[data-promo-panel]')[i]
    card?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
    setActive(i)
  }

  return (
    <section
      className={cn(
        'vdoc-promo-rail shrink-0 overflow-x-clip border-b border-white/[0.06] bg-[#171717]/90 backdrop-blur-md',
        className
      )}
      aria-label="Intelligence display and offers"
    >
      <div className="vdoc-safe-x mx-auto flex max-w-[1400px] items-center justify-between gap-3 pb-1 pt-2.5 md:px-6 lg:px-8">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
          For you
        </p>
        <span className="hidden text-[10px] text-white/25 sm:inline">
          Intelligence · Spotlight · Offers
        </span>
      </div>

      {/* Phones / small tablets: swipe panels with peek */}
      <div className="md:hidden">
        <div
          ref={scrollerRef}
          className="vdoc-touch-scroll flex gap-3 overflow-x-auto px-3 pb-2 pt-0.5 scrollbar-none sm:px-4"
        >
          <div
            data-promo-panel
            className="w-[min(82vw,20.5rem)] shrink-0 snap-center sm:w-[min(70vw,22rem)]"
          >
            <FeatureCarousel />
          </div>
          <div
            data-promo-panel
            className="w-[min(82vw,20.5rem)] shrink-0 snap-center sm:w-[min(70vw,22rem)]"
          >
            <SpotlightCard />
          </div>
          <div
            data-promo-panel
            className="w-[min(82vw,20.5rem)] shrink-0 snap-center sm:w-[min(70vw,22rem)]"
          >
            <AdRail compact />
          </div>
          <div className="w-2 shrink-0 sm:w-4" aria-hidden />
        </div>

        <div
          className="flex items-center justify-center gap-1 pb-2.5"
          role="tablist"
          aria-label="Promo panels"
        >
          {PANELS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-label={p.label}
              aria-selected={i === active}
              onClick={() => goTo(i)}
              className="inline-flex h-8 min-w-8 items-center justify-center px-1"
            >
              <span
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === active ? 'w-5 bg-white/75' : 'w-1.5 bg-white/25'
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Tablet: 2 + full-width ad banner · Desktop: equal 3-up */}
      <div className="mx-auto hidden max-w-[1400px] gap-3 px-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-4 lg:px-6 xl:gap-5 xl:px-8">
        <div className="min-w-0">
          <FeatureCarousel />
        </div>
        <div className="min-w-0">
          <SpotlightCard />
        </div>
        <div className="min-w-0 md:col-span-2 lg:col-span-1">
          <AdRail compact />
        </div>
      </div>
    </section>
  )
}

/** Compatibility alias — always renders the top horizontal three-panel rail. */
export function PromoRightRail({
  className,
}: {
  mobile?: boolean
  className?: string
}) {
  return <PromoTopRail className={className} />
}
