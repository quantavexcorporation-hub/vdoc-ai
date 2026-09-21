'use client'

import * as React from 'react'
import Link from 'next/link'
import { Play, Sparkles } from 'lucide-react'
import { QUICK_SHORTS, type QuickShort } from '@/lib/live/data'
import { cn } from '@/lib/utils'

function ShortCard({ short }: { short: QuickShort }) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = React.useState(false)

  const start = () => {
    const v = videoRef.current
    if (!v || !short.video) return
    v.play().catch(() => {})
    setPlaying(true)
  }

  const stop = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0
    setPlaying(false)
  }

  return (
    <article
        className={cn(
          'vdoc-holo-card group relative h-[22rem] w-[min(42vw,9.5rem)] shrink-0 snap-start rounded-[var(--radius-xl)]',
          'sm:h-[26rem] sm:w-[11rem]',
          'focus-within:shadow-[var(--shadow-focus)]'
        )}
      onPointerEnter={start}
      onPointerLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      <button
        type="button"
        className="absolute inset-0 text-left focus-visible:outline-none"
        aria-label={`Play ${short.title}, ${short.duration}`}
      >
        {short.video ? (
          <video
            ref={videoRef}
            className={cn(
              'absolute inset-0 size-full object-cover transition-opacity duration-[var(--duration-normal)]',
              playing ? 'opacity-100' : 'opacity-0'
            )}
            muted
            loop
            playsInline
            preload="none"
          >
            <source src={short.video} type="video/mp4" />
          </video>
        ) : null}

        <div
          className={cn(
            'vdoc-frame absolute inset-0 transition-opacity duration-[var(--duration-normal)]',
            playing && short.video ? 'opacity-0' : 'opacity-100'
          )}
          style={{ ['--frame-hue' as string]: short.hue }}
          aria-hidden
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/20 to-transparent" />

        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-[var(--radius-sm)] border border-white/12 bg-black/45 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-cyan backdrop-blur-md">
          <Sparkles className="size-2.5" aria-hidden />
          AI
        </span>

        <span className="absolute right-2.5 top-2.5 rounded-[var(--radius-sm)] bg-black/55 px-1.5 py-0.5 font-mono text-[10px] text-lunar backdrop-blur-sm">
          {short.duration}
        </span>

        <span
          className={cn(
            'absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-lunar backdrop-blur-md transition-all duration-[var(--duration-normal)]',
            playing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
          )}
          aria-hidden
        >
          <Play className="size-4 translate-x-0.5" fill="currentColor" />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-cyan/90">
            {short.tag}
          </p>
          <h3 className="mt-1 font-display text-[13px] font-semibold leading-snug tracking-tight text-lunar sm:text-sm">
            {short.title}
          </h3>
        </div>
      </button>
    </article>
  )
}

export function QuickEntertainment() {
  return (
    <section
      id="quick-entertainment"
      className="vdoc-section-glow relative py-16 md:py-24"
      aria-labelledby="quick-entertainment-title"
    >
      <div className="vdoc-safe-x mx-auto max-w-[1400px] px-3 sm:px-6 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="ds-label mb-3">Quick Entertain</p>
            <h2 id="quick-entertainment-title" className="ds-heading-lg text-lunar text-[clamp(1.25rem,4vw,2rem)]">
              AI shorts in a breath
            </h2>
            <p className="mt-3 max-w-md ds-body text-sm sm:text-base">
              Under a minute. Generated for the moment. Hover to preview — enter to go deeper.
            </p>
          </div>
          <Link
            href="/universe?c=shorts"
            className="inline-flex min-h-10 shrink-0 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-cyan"
          >
            Open all shorts
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div
        className="vdoc-touch-scroll ix-scroll mt-6 flex gap-3 overflow-x-auto px-3 pb-2 snap-x snap-mandatory scrollbar-none sm:mt-8 sm:gap-4 sm:px-6 md:gap-4 md:px-10"
        role="list"
        aria-label="AI short videos"
      >
        {QUICK_SHORTS.map((short) => (
          <div key={short.id} role="listitem">
            <ShortCard short={short} />
          </div>
        ))}
        <div className="w-2 shrink-0 md:w-6" aria-hidden />
      </div>
    </section>
  )
}
