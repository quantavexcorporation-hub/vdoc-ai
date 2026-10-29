'use client'

import Link from 'next/link'
import { FadeIn, useParallax } from '@/components/home/motion'
import { DsButton } from '@/components/ds'

export function FeaturedUniverse() {
  const parallax = useParallax(0.12)

  return (
    <section
      id="universe"
      className="vdoc-section-glow relative overflow-hidden py-24 md:py-32"
      aria-labelledby="universe-title"
    >
      <FadeIn>
        <div className="ds-container mb-10 md:mb-14">
          <p className="ds-label mb-3">Featured universe</p>
          <h2 id="universe-title" className="ds-heading-xl max-w-2xl text-lunar">
            Neo Harbor is rewriting tonight.
          </h2>
        </div>
      </FadeIn>

      <div className="ds-container">
        <div className="vdoc-holo-card group relative min-h-[28rem] overflow-hidden rounded-[var(--radius-2xl)] md:min-h-[36rem]">
          <div
            ref={parallax}
            className="absolute -inset-[8%] will-change-transform"
            aria-hidden
          >
            <div
              className="vdoc-frame absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-emphasized)] group-hover:scale-[1.03]"
              style={{ ['--frame-hue' as string]: 210 }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-bg-void via-bg-void/75 to-transparent" />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[var(--radius-2xl)]" />

          <div className="relative flex min-h-[28rem] flex-col justify-end p-8 md:min-h-[36rem] md:p-14">
            <p className="ds-label mb-3">Live world</p>
            <h3 className="font-display text-3xl font-semibold tracking-tight text-lunar md:text-5xl">
              Neo Harbor
            </h3>
            <p className="mt-4 max-w-md text-pretty ds-body">
              A city that listens to every choice. Streets rearrange. Stories collide.
              Your presence is the plot.
            </p>
            <div className="mt-8">
              <DsButton asChild variant="lunar" size="lg">
                <Link href="/universe?c=worlds">Enter Neo Harbor</Link>
              </DsButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function CommunitySection() {
  return (
    <section id="community" className="vdoc-section-glow py-20 md:py-28" aria-labelledby="community-title">
      <FadeIn>
        <div className="ds-container">
          <p className="ds-label mb-3">Community</p>
          <h2 id="community-title" className="ds-heading-lg mb-10 max-w-xl text-lunar md:mb-12">
            Worlds shaped together.
          </h2>

          <article className="vdoc-holo-card relative overflow-hidden rounded-[var(--radius-2xl)] p-8 md:p-12">
            <p className="ds-caption">
              <span className="text-cyan">Aya Chen</span> forked a story ending
            </p>
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-lunar md:text-3xl">
              Rain District — Bridge Cut
            </h3>
            <p className="mt-4 max-w-lg ds-body">
              A midnight ending where the bridge chooses you. Join the thread and leave
              your version of the last light.
            </p>
            <div className="mt-8">
              <DsButton asChild variant="outline" size="md">
                <Link href="/universe?c=stories">Open thread</Link>
              </DsButton>
            </div>
          </article>
        </div>
      </FadeIn>
    </section>
  )
}

export function CreatorSpotlight() {
  return (
    <section id="creators" className="vdoc-section-glow py-20 md:py-28" aria-labelledby="creators-title">
      <FadeIn>
        <div className="ds-container">
          <div className="vdoc-holo-card overflow-hidden rounded-[var(--radius-2xl)]">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[22rem]">
                <div
                  className="vdoc-frame absolute inset-0"
                  style={{ ['--frame-hue' as string]: 320 }}
                  role="img"
                  aria-label="Creator Nova Ellison"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-void via-transparent to-transparent lg:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="ds-label mb-3">Creator spotlight</p>
                <h2 id="creators-title" className="ds-heading text-lunar">
                  Nova Ellison
                </h2>
                <p className="mt-4 ds-body">
                  Building rooms that stay on air — and every viewer becomes a co-author.
                </p>
                <div className="mt-8">
                  <DsButton asChild variant="glass" size="md">
                    <Link href="/universe?c=novels">Explore her novels</Link>
                  </DsButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
