'use client'

import Link from 'next/link'
import {
  Sparkles,
  Play,
  TrendingUp,
  Users,
  Wand2,
  Radio,
  Brain,
  Compass,
  MemoryStick,
  type LucideIcon,
} from 'lucide-react'
import { FadeIn } from '@/components/home/motion'
import { cn } from '@/lib/utils'

type Panel = {
  id: string
  eyebrow: string
  title: string
  insight: string
  href: string
  icon: LucideIcon
  pulse?: boolean
}

const PANELS: Panel[] = [
  {
    id: 'assistant',
    eyebrow: 'AI Assistant',
    title: 'Command the OS',
    insight: 'Speak intent — AI engine routes movies, worlds, branches.',
    href: '/converse',
    icon: Brain,
    pulse: true,
  },
  {
    id: 'generate',
    eyebrow: 'Quick Generation',
    title: 'Make something now',
    insight: 'One prompt → living media.',
    href: '/converse',
    icon: Wand2,
  },
  {
    id: 'continue',
    eyebrow: 'Continue Watching',
    title: 'Rain District — Ch. 7',
    insight: '62% · your thread remembers.',
    href: '/#continue',
    icon: Play,
  },
  {
    id: 'suggest',
    eyebrow: 'AI Suggestions',
    title: 'Your Midnight Cut',
    insight: 'Mood-matched · generated for you.',
    href: '/#for-you',
    icon: Sparkles,
  },
  {
    id: 'trending',
    eyebrow: 'Trending Intelligence',
    title: 'Neon Tribunal rising',
    insight: '+184% signal in the last hour.',
    href: '/#trending',
    icon: TrendingUp,
    pulse: true,
  },
  {
    id: 'creators',
    eyebrow: 'Creator Updates',
    title: 'Nova Ellison',
    insight: 'New quiet world dropped.',
    href: '/#creators',
    icon: Radio,
  },
  {
    id: 'community',
    eyebrow: 'Community Pulse',
    title: 'Bridge Cut forked',
    insight: 'Aya Chen · 128 echoes.',
    href: '/#community',
    icon: Users,
  },
  {
    id: 'journey',
    eyebrow: 'Personal Journey',
    title: 'City That Remembers You',
    insight: 'Adaptive world · your path.',
    href: '/universe?c=worlds',
    icon: Compass,
  },
  {
    id: 'discover',
    eyebrow: 'Daily Discoveries',
    title: 'Pale Constellation',
    insight: 'Created 2h ago · enter now.',
    href: '/universe?c=worlds',
    icon: Sparkles,
  },
  {
    id: 'memory',
    eyebrow: 'Memory Highlights',
    title: 'Harbor Desk',
    insight: 'You returned here three times.',
    href: '/universe?c=shows',
    icon: MemoryStick,
  },
]

export function CommandCenter() {
  return (
    <section
      id="command-center"
      className="relative border-t border-white/[0.06] py-12 md:py-16"
      aria-labelledby="command-center-title"
    >
      <FadeIn>
        <div className="mx-auto max-w-[1400px] px-3 sm:px-6 md:px-10">
          <div className="mb-5 sm:mb-7">
            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/28">
              Intelligence surface
            </p>
            <h2
              id="command-center-title"
              className="text-lg font-semibold tracking-tight text-white/90 md:text-xl"
            >
              For you
            </h2>
            <p className="mt-1.5 max-w-md text-sm text-white/40">
              Engine-ranked insights on your data layer — shortcuts that follow presence.
            </p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {PANELS.map((panel, i) => {
              const Icon = panel.icon
              return (
                <Link
                  key={panel.id}
                  href={panel.href}
                  className={cn(
                    'group relative flex h-full flex-col rounded-2xl border border-white/[0.06] bg-[#2a2a2a]/80 p-4 transition-colors hover:bg-[#2f2f2f]',
                    i === 0 && 'sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:p-5'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={cn(
                        'flex size-8 items-center justify-center rounded-lg bg-white/[0.06] text-white/60',
                        i === 0 && 'size-9'
                      )}
                    >
                      <Icon className={cn('size-3.5', i === 0 && 'size-4')} aria-hidden />
                    </span>
                  </div>
                  <p className={cn('mt-3 text-[11px] text-white/35', i === 0 && 'mt-5')}>
                    {panel.eyebrow}
                  </p>
                  <h3
                    className={cn(
                      'mt-1 font-medium tracking-tight text-white/90',
                      i === 0 ? 'text-xl md:text-2xl' : 'text-sm'
                    )}
                  >
                    {panel.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-1.5 text-white/40',
                      i === 0 ? 'text-sm leading-relaxed' : 'text-[12px] leading-snug'
                    )}
                  >
                    {panel.insight}
                  </p>
                  <span className="mt-auto pt-3 text-[12px] text-white/35 opacity-0 transition-opacity group-hover:opacity-100">
                    Open
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
