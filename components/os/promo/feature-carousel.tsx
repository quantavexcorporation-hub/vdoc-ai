'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FEATURE_AUTO_MS, FEATURE_SLIDES } from '@/lib/os/promo-rail'

export function FeatureCarousel({ className }: { className?: string }) {
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const touchX = React.useRef<number | null>(null)
  const slide = FEATURE_SLIDES[index]

  React.useEffect(() => {
    if (paused) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % FEATURE_SLIDES.length)
    }, FEATURE_AUTO_MS)
    return () => window.clearInterval(id)
  }, [paused])

  const prev = () =>
    setIndex((i) => (i - 1 + FEATURE_SLIDES.length) % FEATURE_SLIDES.length)
  const next = () => setIndex((i) => (i + 1) % FEATURE_SLIDES.length)

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
    if (delta < 0) next()
    else prev()
  }

  return (
    <section
      className={cn('flex h-full min-w-0 w-full flex-col', className)}
      aria-label="Intelligence display"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="mb-1.5 flex items-center gap-1.5 px-0.5 sm:mb-2">
        <Sparkles className="size-3.5 shrink-0 text-cyan/70" aria-hidden />
        <p className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
          Intelligence Display
        </p>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#2a2a2a] sm:rounded-2xl">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${slide.accent}33, transparent 55%)`,
          }}
          aria-hidden
        />

        <div className="relative flex flex-1 flex-col p-3.5 sm:p-4">
          <p
            className="text-[10px] font-medium tracking-wide sm:text-[11px]"
            style={{ color: slide.accent }}
          >
            {slide.eyebrow}
          </p>
          <h3 className="mt-1.5 text-base font-semibold tracking-tight text-white/95 sm:mt-2 sm:text-lg">
            {slide.headline}
          </h3>
          <p className="mt-1.5 line-clamp-3 flex-1 text-[12px] leading-relaxed text-white/45 sm:mt-2 sm:text-[13px]">
            {slide.description}
          </p>

          <div className="mt-3 flex items-center justify-between gap-2 sm:mt-4">
            <Link
              href={slide.href}
              className="inline-flex min-h-10 items-center rounded-full bg-white px-3.5 py-2 text-xs font-medium text-[#171717] transition-opacity hover:opacity-90"
            >
              {slide.cta}
            </Link>
            <div className="flex items-center">
              <button
                type="button"
                onClick={prev}
                className="inline-flex size-10 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/80 sm:size-9"
                aria-label="Previous"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={next}
                className="inline-flex size-10 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/80 sm:size-9"
                aria-label="Next"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-2.5 flex gap-1.5 sm:mt-3" role="tablist" aria-label="Slides">
            {FEATURE_SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors sm:h-1',
                  i === index ? 'bg-white/70' : 'bg-white/15 hover:bg-white/25'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
