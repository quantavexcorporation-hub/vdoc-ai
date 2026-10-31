'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { HomeFooter } from '@/components/home/home-footer'
import { LivingAtmosphere } from '@/components/os/living-atmosphere'
import { VdocShell } from '@/components/os/vdoc-shell'
import { describeCardKind } from '@/lib/cards/chain'
import { RARITY_COPY } from '@/lib/cards/catalog'
import { CARD_RARITIES, type CardRarity } from '@/lib/cards/types'
import { CardsProvider, useCards, youOf } from '@/lib/cards/store'
import { LumenMark } from './holo-card'
import { cn } from '@/lib/utils'

export function parseRarity(value: string | null): CardRarity | null {
  if (value === 'legendary' || value === 'epic' || value === 'rare') return value
  return null
}

function CardsInner({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const rarity = parseRarity(searchParams.get('r'))
  const { state, notice, ready } = useCards()
  const you = youOf(state)

  const links = [
    { href: '/cards', label: 'Marketplace', current: pathname === '/cards' && !rarity },
    ...CARD_RARITIES.map((item) => ({
      href: `/cards?r=${item}`,
      label: RARITY_COPY[item].label,
      current: pathname === '/cards' && rarity === item,
    })),
    {
      href: '/cards/collection',
      label: 'Collection',
      current: pathname === '/cards/collection',
    },
    { href: '/cards/studio', label: 'Studio', current: pathname === '/cards/studio' },
  ]

  return (
    <VdocShell mood={rarity ?? 'cosmic'}>
      <LivingAtmosphere intensity="subtle" />
      <div className="pointer-events-none fixed inset-0 -z-10 vdoc-mood-wash" aria-hidden />

      <nav
        className="sticky top-0 z-30 border-b border-[var(--border)] bg-bg-void/75 backdrop-blur-md"
        aria-label="Cards"
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-2.5 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            <Link
              href="/cards"
              className="mr-2 shrink-0 rounded-[var(--radius-md)] bg-cyan/12 px-3 py-1.5 text-[13px] font-medium text-cyan"
            >
              Cards
            </Link>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.current ? 'page' : undefined}
                className={cn(
                  'shrink-0 rounded-[var(--radius-md)] px-3 py-1.5 text-[13px] transition-colors',
                  link.current
                    ? 'bg-white/[0.08] text-foreground'
                    : 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="shrink-0 font-mono text-[11px] text-white/40">
            {ready && you ? (
              <>
                {you.handle} · <LumenMark value={you.credits} />
              </>
            ) : (
              'Opening floor…'
            )}
          </p>
        </div>
      </nav>

      <div className="mx-auto max-w-[1400px] px-4 pt-5 sm:px-6 md:px-10">
        <p className="max-w-3xl text-[12px] leading-relaxed text-white/45">
          {describeCardKind()}. Lumen is floor credit — not money, not a purchase.
          History stays on this device. Other collectors are floor personas, not live
          wallets. Accounts are not required on this floor.
        </p>
        {notice ? (
          <p className="mt-2 text-[13px] text-cyan" role="status">
            {notice}
          </p>
        ) : null}
      </div>

      <main>
        {ready ? (
          children
        ) : (
          <p className="px-4 py-16 text-sm text-muted-foreground sm:px-6 md:px-10">
            Reading cards on this device…
          </p>
        )}
      </main>
      <HomeFooter />
    </VdocShell>
  )
}

export function CardsShell({ children }: { children: ReactNode }) {
  return (
    <CardsProvider>
      <CardsInner>{children}</CardsInner>
    </CardsProvider>
  )
}
