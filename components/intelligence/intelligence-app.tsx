'use client'

import Link from 'next/link'
import {
  ArrowRight,
  Calendar,
  Fingerprint,
  Heart,
  Moon,
  Play,
  Star,
  Sparkles,
  Sunset,
  Layers,
  ListChecks,
} from 'lucide-react'
import { HomeFooter } from '@/components/home/home-footer'
import { LivingAtmosphere } from '@/components/os/living-atmosphere'
import { VdocShell } from '@/components/os/vdoc-shell'
import { INTEL_NEEDS } from '@/lib/os/intelligence-needs'

const ICONS: Record<string, typeof Sparkles> = {
  'mood-match': Heart,
  'top-rated': Star,
  'continue-watch': Play,
  'favourite-upcoming': Calendar,
  'taste-mirror': Fingerprint,
  afterglow: Sunset,
  'evening-intent': Moon,
  unfinished: ListChecks,
  'thread-continuity': Layers,
}

/**
 * Intelligence for audience pain — problems catalogs never solved.
 */
export function IntelligenceApp() {
  return (
    <VdocShell mood="intelligence">
      <LivingAtmosphere intensity="subtle" />

      <main className="mx-auto max-w-3xl px-3 py-8 sm:px-4 sm:py-10 md:px-8 md:py-14">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
          Intelligence · Audience
        </p>
        <h1 className="mt-2 font-display text-[clamp(1.5rem,5vw,2.25rem)] font-semibold tracking-tight text-white/95 md:text-4xl">
          Problems entertainment never solved.
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/45">
          Not more shelves. Not more rankings. Intelligence for the painful gaps — mood,
          trust, re-entry, afterglow, unfinished guilt, and worlds that die at the credits.
        </p>

        <div className="mt-10 space-y-4">
          {INTEL_NEEDS.map((need, i) => {
            const Icon = ICONS[need.id] ?? Sparkles
            return (
              <article
                key={need.id}
                id={need.id}
                className="scroll-mt-24 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 md:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-white/[0.06] text-white/70">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] text-white/30">
                        {String(i + 1).padStart(2, '0')} · BURNING
                      </p>
                      <h2 className="text-base font-medium text-white/90 md:text-lg">
                        {need.name}
                      </h2>
                    </div>
                  </div>
                  <span className="shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-cyan/80 bg-cyan/10">
                    {need.badge}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/55">
                  <span className="text-white/35">Pain — </span>
                  {need.pain}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/40">
                  <span className="text-white/30">Never solved — </span>
                  {need.neverSolved}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  <span className="text-cyan/70">Intelligence — </span>
                  {need.solve}
                </p>
                <p className="mt-2 text-[13px] text-white/45">{need.outcome}</p>

                <Link
                  href={`/converse?q=${encodeURIComponent(need.prompt)}`}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-sm font-medium text-[#141414] transition-opacity hover:opacity-90"
                >
                  Solve this now
                  <ArrowRight className="size-3.5" />
                </Link>
              </article>
            )
          })}
        </div>
      </main>

      <HomeFooter />
    </VdocShell>
  )
}
