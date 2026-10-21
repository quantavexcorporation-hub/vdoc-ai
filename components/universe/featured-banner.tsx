'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Play } from 'lucide-react'
import type { CategoryMeta } from '@/lib/universe/data'
import { DsButton } from '@/components/ds'
import { cn } from '@/lib/utils'

export function FeaturedBanner({
  category,
  onPlay,
}: {
  category: CategoryMeta
  onPlay: () => void
}) {
  const router = useRouter()
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const sectionRef = React.useRef<HTMLElement>(null)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setReady(false)
    const v = videoRef.current
    const section = sectionRef.current
    if (!v || !category.featured.video) return

    v.load()

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {})
        } else {
          v.pause()
        }
      },
      { threshold: 0.35 }
    )
    if (section) io.observe(section)

    return () => io.disconnect()
  }, [category.id, category.featured.video])

  return (
    <section
      ref={sectionRef}
      className="vdoc-holo-card relative isolate overflow-hidden rounded-[var(--radius-2xl)]"
      aria-labelledby="featured-title"
    >
      <div className="relative min-h-[28rem] md:min-h-[34rem]">
        {category.featured.video ? (
          <video
            ref={videoRef}
            key={category.featured.video}
            className={cn(
              'absolute inset-0 size-full object-cover transition-opacity duration-[900ms]',
              ready ? 'opacity-100' : 'opacity-0'
            )}
            muted
            loop
            playsInline
            poster={category.featured.image}
            onPlaying={() => setReady(true)}
          >
            <source src={category.featured.video} type="video/mp4" />
          </video>
        ) : null}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.featured.image}
          alt=""
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-[900ms]',
            category.featured.video && ready ? 'opacity-0' : 'opacity-100',
            'universe-kenburns'
          )}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-bg-void via-bg-void/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-transparent to-bg-void/35" />

        <div className="relative flex min-h-[28rem] flex-col justify-end p-6 md:min-h-[34rem] md:p-12">
          <p className="ds-label">{category.label}</p>
          <h2
            id="featured-title"
            className="mt-3 max-w-xl font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-lunar"
          >
            {category.featured.title}
          </h2>
          <p className="mt-4 max-w-lg ds-body">{category.featured.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <DsButton type="button" variant="lunar" size="lg" onClick={onPlay}>
              <Play className="size-4" fill="currentColor" />
              {category.featured.cta}
            </DsButton>
            <DsButton
              type="button"
              variant="glass"
              size="lg"
              onClick={() =>
                router.push(
                  `/converse?q=${encodeURIComponent(
                    `Continue ${category.featured.title}. ${category.featured.description}`
                  )}`
                )
              }
            >
              Continue in Converse
            </DsButton>
          </div>
        </div>
      </div>
    </section>
  )
}
