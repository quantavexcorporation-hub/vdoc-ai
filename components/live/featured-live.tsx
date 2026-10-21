'use client'

import * as React from 'react'
import { Bell, Share2, Radio } from 'lucide-react'
import { FEATURED_LIVE } from '@/lib/live/data'
import { DsButton } from '@/components/ds'
import { LiveBadge } from './live-badge'
import { cn } from '@/lib/utils'

export function FeaturedLive() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const sectionRef = React.useRef<HTMLElement>(null)
  const [ready, setReady] = React.useState(false)
  const [elapsed, setElapsed] = React.useState(FEATURED_LIVE.duration ?? '00:00:00')

  React.useEffect(() => {
    const v = videoRef.current
    const section = sectionRef.current
    if (!v || !FEATURED_LIVE.video) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.35 }
    )
    if (section) io.observe(section)
    return () => io.disconnect()
  }, [])

  React.useEffect(() => {
    const start = Date.now()
    const id = window.setInterval(() => {
      const t = Math.floor((Date.now() - start) / 1000) + 74 * 60 + 28
      const h = String(Math.floor(t / 3600)).padStart(2, '0')
      const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0')
      const s = String(t % 60).padStart(2, '0')
      setElapsed(`${h}:${m}:${s}`)
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="featured-live"
      className="relative py-8 md:py-12"
      aria-labelledby="featured-live-title"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="ds-label mb-6">Inside the premiere</p>

        <article
          className={cn(
            'vdoc-holo-card group relative isolate overflow-hidden rounded-[var(--radius-2xl)]'
          )}
        >
          <div className="relative min-h-[26rem] md:min-h-[32rem]">
            {FEATURED_LIVE.video ? (
              <video
                ref={videoRef}
                className={cn(
                  'absolute inset-0 size-full object-cover transition-opacity duration-[900ms]',
                  ready ? 'opacity-100' : 'opacity-0'
                )}
                muted
                loop
                playsInline
                onPlaying={() => setReady(true)}
              >
                <source src={FEATURED_LIVE.video} type="video/mp4" />
              </video>
            ) : null}

            <div
              className={cn(
                'vdoc-frame absolute inset-0 transition-opacity duration-[900ms]',
                FEATURED_LIVE.video && ready ? 'opacity-0' : 'opacity-100'
              )}
              style={{ ['--frame-hue' as string]: FEATURED_LIVE.hue }}
              aria-hidden
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#05070A] via-[#05070A]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-[#05070A]/40" />

            <div className="relative flex min-h-[26rem] flex-col justify-end p-6 md:min-h-[32rem] md:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <LiveBadge />
                <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <Radio className="size-3 text-cyan" aria-hidden />
                  {FEATURED_LIVE.viewers} staged · {elapsed}
                </span>
              </div>

              <h2
                id="featured-live-title"
                className="mt-4 max-w-xl font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-lunar"
              >
                {FEATURED_LIVE.title}
              </h2>
              <p className="mt-4 max-w-lg ds-body">{FEATURED_LIVE.description}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Hosted by <span className="text-lunar">{FEATURED_LIVE.host}</span>
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <DsButton variant="lunar" size="lg">
                  Join Event
                </DsButton>
                <DsButton variant="glass" size="lg">
                  <Bell className="size-4" aria-hidden />
                  Reminder
                </DsButton>
                <DsButton variant="ghost" size="lg" aria-label="Share event">
                  <Share2 className="size-4" aria-hidden />
                  Share
                </DsButton>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
