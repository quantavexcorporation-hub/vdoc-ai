import { Suspense, lazy, type ReactNode } from 'react'
import { HomeHero } from '@/components/home/home-hero'
import { HomeFooter } from '@/components/home/home-footer'
import { LivingAtmosphere } from '@/components/os/living-atmosphere'
import { VdocShell } from '@/components/os/vdoc-shell'

const CommandCenter = lazy(() =>
  import('@/components/os/command-center').then((m) => ({ default: m.CommandCenter }))
)
const QuickEntertainment = lazy(() =>
  import('@/components/live/quick-entertainment').then((m) => ({
    default: m.QuickEntertainment,
  }))
)
const HomeRails = lazy(() =>
  import('@/components/home/home-rails').then((m) => ({ default: m.HomeRails }))
)
const FeaturedUniverse = lazy(() =>
  import('@/components/home/featured-sections').then((m) => ({ default: m.FeaturedUniverse }))
)
const CommunitySection = lazy(() =>
  import('@/components/home/featured-sections').then((m) => ({ default: m.CommunitySection }))
)
const CreatorSpotlight = lazy(() =>
  import('@/components/home/featured-sections').then((m) => ({ default: m.CreatorSpotlight }))
)

function BelowFold({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="vdoc-safe-x mx-auto max-w-[1400px] px-3 py-8 sm:px-6 md:px-10" aria-hidden>
          <div className="vdoc-skeleton-pulse mb-4 h-4 w-24" />
          <div className="vdoc-skeleton-pulse mb-3 h-8 w-64 max-w-full" />
          <div className="vdoc-skeleton-pulse h-40 w-full" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export default function VdocHomePage() {
  return (
    <VdocShell mood="intelligence">
      <LivingAtmosphere intensity="subtle" />
      <a
        href="#enter"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:m-0 focus:inline-flex focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-full focus:bg-lunar focus:px-4 focus:py-2 focus:text-sm focus:text-space focus:[clip:auto]"
      >
        Skip to VDOC
      </a>

      <div className="vdoc-enter-smooth">
        <main>
          <HomeHero />
          <BelowFold>
            <CommandCenter />
          </BelowFold>
          <BelowFold>
            <QuickEntertainment />
          </BelowFold>
          <BelowFold>
            <HomeRails />
          </BelowFold>
          <BelowFold>
            <FeaturedUniverse />
            <CommunitySection />
            <CreatorSpotlight />
          </BelowFold>
        </main>

        <HomeFooter />
      </div>
    </VdocShell>
  )
}
