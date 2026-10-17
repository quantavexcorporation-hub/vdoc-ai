'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeFooter } from '@/components/home/home-footer'
import { LiveHero } from './live-hero'
import { LiveCategories } from './live-categories'
import { FeaturedLive } from './featured-live'
import { LiveNowGrid } from './live-now-grid'
import { UpcomingTimeline } from './upcoming-timeline'
import { CommunityEvents } from './community-events'
import { AiExperiencePanel } from './ai-experience-panel'
import { QuickEntertainment } from './quick-entertainment'
import { LivingAtmosphere } from '@/components/os/living-atmosphere'
import { VdocShell } from '@/components/os/vdoc-shell'
import { cn } from '@/lib/utils'

const TOP_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Discover', href: '/#trending' },
  { label: 'Movies', href: '/universe?c=movies' },
  { label: 'Games', href: '/universe?c=games' },
  { label: 'Stories', href: '/universe?c=stories' },
  { label: 'Community', href: '/#community' },
  { label: 'Creators', href: '/#creators' },
  { label: 'Vyra', href: '/live' },
  { label: 'Virtual Universe', href: '/economy' },
  { label: 'Shorts', href: '/live#quick-entertainment' },
]

export function LiveApp() {
  const pathname = usePathname()

  return (
    <VdocShell mood="signal">
      <LivingAtmosphere intensity="subtle" />
      <div className="pointer-events-none fixed inset-0 -z-10 vdoc-mood-wash" aria-hidden />

      <nav
        className="sticky top-0 z-30 border-b border-[var(--border)] bg-bg-void/75 backdrop-blur-md"
        aria-label="Vyra"
      >
        <div className="mx-auto flex max-w-[1400px] items-center gap-1 overflow-x-auto px-4 py-2.5 scrollbar-none sm:px-6 md:px-10">
          {TOP_NAV.map((item) => {
            const active = item.href === '/live' ? pathname === '/live' : false
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'shrink-0 rounded-[var(--radius-md)] px-3 py-1.5 text-[13px] transition-colors',
                  active
                    ? 'bg-cyan/12 font-medium text-cyan'
                    : 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/converse"
            className="ml-auto shrink-0 rounded-[var(--radius-md)] px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-cyan"
          >
            Search
          </Link>
          <Link
            href="/converse"
            className="shrink-0 rounded-[var(--radius-md)] px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Profile
          </Link>
        </div>
      </nav>

      <main>
        <LiveHero />
        <QuickEntertainment />
        <LiveCategories />
        <FeaturedLive />
        <LiveNowGrid />
        <UpcomingTimeline />
        <CommunityEvents />
        <AiExperiencePanel />
      </main>

      <HomeFooter />
    </VdocShell>
  )
}
