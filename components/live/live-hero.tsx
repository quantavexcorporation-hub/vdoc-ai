'use client'

import * as React from 'react'
import Link from 'next/link'
import { FEATURED_LIVE, LIVE_NOW } from '@/lib/live/data'
import { LiveBadge } from './live-badge'

export function LiveHero() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [ready, setReady] = React.useState(false)
  const rooms = [...LIVE_NOW, ...LIVE_NOW]

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [])

  return (
    <section
      id="live-enter"
      className="relative flex min-h-[calc(100dvh-7.5rem)] flex-col justify-end overflow-hidden md:min-h-[100svh]"
      aria-labelledby="live-headline"
    >
      <div className="absolute inset-0" aria-hidden>
        {FEATURED_LIVE.video ? (
          <video
            ref={videoRef}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
            muted
            loop
            playsInline
            onPlaying={() => setReady(true)}
          >
            <source src={FEATURED_LIVE.video} type="video/mp4" />
          </video>
        ) : null}
        <div
          className={`vdoc-frame absolute inset-0 transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
          style={{ ['--frame-hue' as string]: FEATURED_LIVE.hue }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/45 to-[#07080c]/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,oklch(0.62_0.16_200/0.35),transparent_46%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-4 pb-6 pt-8 sm:px-6 md:px-10 md:pb-10 md:pt-24">
        <div className="flex flex-wrap items-center gap-3">
          <LiveBadge label="PLAYVERSE" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-white/55">Live floor</span>
        </div>

        <h1
          id="live-headline"
          className="mt-4 font-display text-[clamp(2.4rem,11vw,8rem)] font-semibold leading-[0.82] tracking-[-0.05em] text-white"
        >
          PLAYVERSE
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
          The live floor. Premieres, creators, and rooms that shift while you are still inside.
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-cyan">Main stage</p>
            <p className="mt-1 font-display text-[clamp(1.5rem,3vw,2.4rem)] font-semibold tracking-tight text-white">
              {FEATURED_LIVE.title}
            </p>
            <p className="mt-1 max-w-lg text-sm text-white/60">{FEATURED_LIVE.description}</p>
            <p className="mt-2 text-xs text-white/45">
              {FEATURED_LIVE.host} · {FEATURED_LIVE.viewers} staged, not a live count
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <a
              href="#featured-live"
              className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-medium text-[#141414]"
            >
              Enter the stage
            </a>
            <Link
              href="#live-now"
              className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-5 text-sm text-white/85"
            >
              Open rooms
            </Link>
          </div>
        </div>

        <div className="mt-6 overflow-hidden">
          <div className="playverse-drift flex w-max gap-3">
            {rooms.map((room, index) => (
              <a
                key={`${room.id}-${index}`}
                href="#live-now"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 text-xs text-white/75 backdrop-blur-md"
              >
                <span className="size-1.5 rounded-full bg-cyan" aria-hidden />
                {room.title}
                <span className="text-white/40">{room.viewers}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
