'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { LIVE_CATEGORIES, type LiveCategoryId } from '@/lib/live/data'
import { cn } from '@/lib/utils'

const ICONS: Record<LiveCategoryId, string> = {
  premieres: 'Premiere',
  creators: 'Creator',
  gaming: 'Gaming',
  stories: 'Story',
  ai: 'AI',
}

export function LiveCategories() {
  return (
    <section
      id="live-categories"
      className="relative py-20 md:py-28"
      aria-labelledby="live-categories-title"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <p className="ds-label mb-3">Modes</p>
        <h2 id="live-categories-title" className="ds-heading-lg max-w-xl text-lunar">
          Not streams. Live systems.
        </h2>
        <p className="mt-4 max-w-lg ds-body">
          Each mode is a real-time AI experience — generated live, interactive, and continuous.
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {LIVE_CATEGORIES.map((cat, i) => (
            <li key={cat.id}>
              <Link
                href={`#live-now`}
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--glass-border)] bg-[#10141B]/80 p-5',
                  'transition-all duration-[var(--duration-normal)] ease-[var(--ease-emphasized)]',
                  'hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[var(--shadow-glow-cyan)]',
                  'focus-visible:shadow-[var(--shadow-focus)]',
                  'animate-rise'
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div
                  className="vdoc-frame pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-[var(--duration-normal)] group-hover:opacity-55"
                  style={{ ['--frame-hue' as string]: cat.hue }}
                  aria-hidden
                />
                <div className="relative">
                  <p className="ds-label">{ICONS[cat.id]}</p>
                  <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-lunar">
                    {cat.label}
                  </h3>
                  <p className="mt-1 text-[12px] text-cyan">{cat.mode}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cat.summary}</p>
                  <ul className="mt-4 space-y-1">
                    {cat.points.slice(0, 3).map((p) => (
                      <li key={p} className="text-[12px] text-lunar/80">
                        · {p}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-cyan opacity-80 transition-opacity group-hover:opacity-100">
                    Enter mode <ArrowUpRight className="size-3.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
