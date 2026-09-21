'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FadeIn } from '@/components/home/motion'
import { AliveMeta } from '@/components/os/alive-meta'

export type RailItem = {
  id: string
  title: string
  meta: string
  /** OKLCH hue for owned cinematic frame */
  hue: number
  progress?: number
  href?: string
}

export function ExperienceRail({
  id,
  eyebrow,
  title,
  items,
  infinite,
}: {
  id: string
  eyebrow: string
  title: string
  items: RailItem[]
  infinite?: boolean
}) {
  const scroller = React.useRef<HTMLDivElement>(null)
  const [paused, setPaused] = React.useState(false)
  const visible = React.useRef(true)

  React.useEffect(() => {
    const el = scroller.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  React.useEffect(() => {
    if (!infinite) return
    const el = scroller.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = now - last
      last = now
      if (!paused && visible.current) {
        el.scrollLeft += dt * 0.028
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [infinite, paused])

  const display = infinite ? [...items, ...items] : items

  return (
    <section id={id} className="vdoc-section-glow relative py-10 sm:py-16 md:py-24" aria-labelledby={`${id}-title`}>
      <FadeIn>
        <div className="ds-container mb-6 flex items-end justify-between gap-4 sm:mb-8 md:mb-10 md:gap-6">
          <div className="min-w-0">
            <p className="ds-label mb-2 sm:mb-3">{eyebrow}</p>
            <h2 id={`${id}-title`} className="ds-heading-lg text-lunar text-[clamp(1.25rem,4vw,2rem)]">
              {title}
            </h2>
          </div>
          <Link
            href="/universe"
            className="hidden shrink-0 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-cyan md:inline-flex"
          >
            View all
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </FadeIn>

      <div
        ref={scroller}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        className="vdoc-touch-scroll ix-scroll scrollbar-none flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 sm:gap-4 sm:px-6 md:gap-5 md:px-10"
        role="list"
        aria-label={title}
      >
        {display.map((item, i) => {
          const href = item.href ?? '/universe'
          return (
            <Link
              key={`${item.id}-${i}`}
              href={href}
              role="listitem"
              className={cn(
                'vdoc-holo-card group relative h-[18rem] w-[min(72vw,15.5rem)] shrink-0 snap-start rounded-[var(--radius-2xl)] sm:h-[22rem] sm:w-[min(78vw,17.5rem)] md:h-[26rem] md:w-[19rem]',
                'focus-visible:shadow-[var(--shadow-focus)]'
              )}
            >
              <div
                className="vdoc-frame absolute inset-0 transition-transform duration-[var(--duration-slower)] ease-[var(--ease-emphasized)] group-hover:scale-[1.05]"
                style={{ ['--frame-hue' as string]: item.hue }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-bg-void/20 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.1] rounded-[var(--radius-2xl)]" />

              {typeof item.progress === 'number' && (
                <div className="absolute inset-x-5 bottom-[5.5rem] h-0.5 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)]"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 md:p-6">
                <AliveMeta seed={item.id + item.title} summary={item.meta} />
                <p className="ds-label">{item.meta}</p>
                <h3 className="font-display text-xl font-semibold tracking-tight text-lunar md:text-[1.35rem]">
                  {item.title}
                </h3>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-cyan">
                  Enter <ArrowRight className="size-3.5 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          )
        })}
        <div className="w-4 shrink-0 md:w-8" aria-hidden />
      </div>
    </section>
  )
}
