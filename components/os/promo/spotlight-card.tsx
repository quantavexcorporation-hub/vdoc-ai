'use client'

import Link from 'next/link'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SPOTLIGHT } from '@/lib/os/promo-rail'

export function SpotlightCard({ className }: { className?: string }) {
  return (
    <section
      className={cn('flex h-full min-w-0 w-full flex-col', className)}
      aria-label="Spotlight"
    >
      <div className="mb-1.5 flex items-center gap-1.5 px-0.5 sm:mb-2">
        <Zap className="size-3.5 shrink-0 text-amber-400" aria-hidden />
        <p className="truncate text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
          Spotlight
        </p>
        <span className="ml-auto shrink-0 rounded-full border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-amber-300">
          Live
        </span>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-amber-400/20 bg-gradient-to-br from-amber-400/[0.08] via-[#2a2a2a] to-cyan/[0.08] p-3.5 sm:rounded-2xl sm:p-4">
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-amber-400/15 blur-3xl sm:size-32"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 -left-6 size-24 rounded-full bg-cyan/10 blur-3xl sm:size-28"
          aria-hidden
        />

        <div className="relative flex flex-1 flex-col">
          <p className="text-[10px] font-medium uppercase tracking-wider text-amber-300/80 sm:text-[11px]">
            {SPOTLIGHT.eyebrow}
          </p>
          <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-white/95 sm:mt-2 sm:text-xl">
            {SPOTLIGHT.title}
          </h3>
          <p className="mt-1.5 line-clamp-3 flex-1 text-[12px] leading-relaxed text-white/45 sm:mt-2 sm:text-[13px]">
            {SPOTLIGHT.body}
          </p>

          <Link
            href={SPOTLIGHT.href}
            className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-400/90 to-cyan/80 px-4 py-2.5 text-sm font-medium text-[#0a0a0a] transition-opacity hover:opacity-95 sm:mt-4"
          >
            {SPOTLIGHT.cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
