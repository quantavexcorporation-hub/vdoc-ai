'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeFooter } from '@/components/home/home-footer'
import { LivingAtmosphere } from '@/components/os/living-atmosphere'
import { VdocShell } from '@/components/os/vdoc-shell'
import { VaultHero } from './vault-hero'
import { SpatialWorld } from './spatial-world'
import { EconomyModules } from './economy-modules'
import { ECONOMY_NAV } from '@/lib/economy/data'
import { cn } from '@/lib/utils'

export function EconomyApp() {
  const pathname = usePathname()

  return (
    <VdocShell mood="intelligence">
      <LivingAtmosphere intensity="subtle" />
      <div className="pointer-events-none fixed inset-0 -z-10 vdoc-mood-wash" aria-hidden />

      <nav
        className="sticky top-0 z-30 border-b border-[var(--border)] bg-bg-void/75 backdrop-blur-md"
        aria-label="Virtual Universe"
      >
        <div className="mx-auto flex max-w-[1400px] items-center gap-1 overflow-x-auto px-4 py-2.5 scrollbar-none sm:px-6 md:px-10">
          <Link
            href="/economy"
            aria-current={pathname === '/economy' ? 'page' : undefined}
            className="mr-2 shrink-0 rounded-[var(--radius-md)] bg-cyan/12 px-3 py-1.5 text-[13px] font-medium text-cyan"
          >
            Virtual Universe
          </Link>
          {ECONOMY_NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'shrink-0 rounded-[var(--radius-md)] px-3 py-1.5 text-[13px] text-muted-foreground transition-colors',
                'hover:bg-white/[0.04] hover:text-foreground'
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <VaultHero />
        <SpatialWorld />
        <EconomyModules />
      </main>

      <HomeFooter />
    </VdocShell>
  )
}
