'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'
import { DsButton, DsSearchBar } from '@/components/ds'
import { EVOLVE_FEE, FLOOR_MIN, MINT_FEE, RARITY_COPY } from '@/lib/cards/catalog'
import { mintedCount } from '@/lib/cards/ledger'
import {
  cardById,
  collectorById,
  useCards,
  youOf,
} from '@/lib/cards/store'
import type { CardRarity } from '@/lib/cards/types'
import { HoloCard, LumenMark } from './holo-card'
import { parseRarity } from './cards-shell'

type SortKey = 'featured' | 'newest' | 'price' | 'edition'

export function CardsMarket() {
  const searchParams = useSearchParams()
  const rarity = parseRarity(searchParams.get('r'))
  const { state, ready, buy, mint, report } = useCards()
  const you = youOf(state)
  const [query, setQuery] = React.useState('')
  const [sort, setSort] = React.useState<SortKey>('featured')
  const [reportId, setReportId] = React.useState<string | null>(null)
  const [reportText, setReportText] = React.useState('')

  const listings = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = state.instances
      .filter((instance) => instance.listed && instance.listPrice != null)
      .map((instance) => {
        const card = cardById(state, instance.cardId)
        const owner = collectorById(state, instance.ownerId)
        return card && owner ? { instance, card, owner } : null
      })
      .filter((row): row is NonNullable<typeof row> => Boolean(row))
      .filter((row) => !rarity || row.card.rarity === rarity)
      .filter((row) => {
        if (!q) return true
        return (
          row.card.title.toLowerCase().includes(q) ||
          row.card.creator.toLowerCase().includes(q) ||
          row.card.series.toLowerCase().includes(q) ||
          row.owner.handle.toLowerCase().includes(q)
        )
      })

    return rows.sort((a, b) => {
      if (sort === 'price') return (a.instance.listPrice ?? 0) - (b.instance.listPrice ?? 0)
      if (sort === 'edition') return a.instance.edition - b.instance.edition
      if (sort === 'newest') return b.instance.createdAt.localeCompare(a.instance.createdAt)
      return (a.card.featuredRank ?? 99) - (b.card.featuredRank ?? 99)
    })
  }, [query, rarity, sort, state])

  const catalog = React.useMemo(() => {
    return state.cards.filter((card) => !rarity || card.rarity === rarity)
  }, [rarity, state.cards])

  const copy = rarity ? RARITY_COPY[rarity] : null

  return (
    <div data-nft-floor={rarity ?? 'all'} className="vdoc-nft-floor">
      <section className="vdoc-section-glow px-4 py-10 sm:px-6 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1400px]">
          <p className="ds-label mb-3">{copy?.eyebrow ?? 'Collectible floor'}</p>
          <h1 className="ds-heading-lg max-w-3xl text-lunar text-[clamp(1.6rem,4vw,2.6rem)]">
            {copy?.title ?? 'Cards. Own a face of the floor.'}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            {copy?.body ??
              'Legendary, Epic, and Rare only. Buy, mint, trade, and evolve platform-native cards. No extra rarity tiers.'}
          </p>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 lg:flex-row lg:items-center">
          <DsSearchBar
            id="cards-search"
            value={query}
            onValueChange={setQuery}
            placeholder="Search title, creator, series, owner…"
            className="max-w-xl"
          />
          <label className="flex items-center gap-2 text-[13px] text-white/50">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-10 rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price">Price</option>
              <option value="edition">Edition</option>
            </select>
          </label>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 md:px-10" aria-labelledby="cards-market-title">
        <div className="mx-auto max-w-[1400px]">
          <h2 id="cards-market-title" className="ds-heading-lg text-xl text-lunar">
            Live listings
          </h2>
          <p className="mt-2 text-sm text-white/45">
            {ready ? `${listings.length} listed` : 'Reading this device…'} · floor
            credit only
          </p>
          {listings.length === 0 ? (
            <p className="mt-8 text-sm text-muted-foreground">
              No listings match. Mint a remaining edition or open another rarity.
            </p>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {listings.map(({ card, instance, owner }) => (
                <li key={instance.id} className="ds-glass rounded-[1.25rem] p-4">
                  <HoloCard card={card} instance={instance} href={`/cards/${card.id}`} />
                  <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-[12px] text-white/45">
                        {owner.name} · {owner.handle}
                      </p>
                      <p className="mt-1 text-sm">
                        <LumenMark value={instance.listPrice ?? 0} />
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <DsButton
                        size="sm"
                        disabled={!ready || owner.id === you?.id}
                        onClick={() => buy(instance.id)}
                      >
                        Buy
                      </DsButton>
                      <DsButton
                        size="sm"
                        variant="ghost"
                        onClick={() => setReportId(instance.id)}
                      >
                        Report
                      </DsButton>
                    </div>
                  </div>
                  {reportId === instance.id ? (
                    <form
                      className="mt-3 flex gap-2"
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (report(instance.id, reportText)) {
                          setReportId(null)
                          setReportText('')
                        }
                      }}
                    >
                      <input
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                        placeholder="Why is this listing off?"
                        className="h-10 min-w-0 flex-1 rounded-[var(--radius-md)] border border-white/10 bg-white/[0.03] px-3 text-sm"
                      />
                      <DsButton size="sm" variant="outline" type="submit">
                        Send
                      </DsButton>
                    </form>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 md:px-10" aria-labelledby="cards-catalog-title">
        <div className="mx-auto max-w-[1400px]">
          <h2 id="cards-catalog-title" className="ds-heading-lg text-xl text-lunar">
            Catalog
          </h2>
          <p className="mt-2 text-sm text-white/45">
            Mint remaining editions on this device. Fees:{' '}
            {(Object.keys(MINT_FEE) as CardRarity[]).map((key, i) => (
              <span key={key}>
                {i ? ' · ' : ''}
                {RARITY_COPY[key].label} {MINT_FEE[key]} Lm
              </span>
            ))}
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {catalog.map((card) => {
              const minted = mintedCount(state, card.id)
              const left = card.editionLimit - minted
              return (
                <li key={card.id} className="ds-glass rounded-[1.25rem] p-4">
                  <HoloCard card={card} href={`/cards/${card.id}`} />
                  <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
                    <div className="text-[12px] text-white/50">
                      <p>
                        {minted} minted · {left} left
                      </p>
                      <p>
                        Floor {FLOOR_MIN[card.rarity]} · evolve {EVOLVE_FEE[card.rarity]}
                      </p>
                    </div>
                    <DsButton
                      size="sm"
                      variant="glass"
                      disabled={!ready || left <= 0}
                      onClick={() => mint(card.id)}
                    >
                      Mint native
                    </DsButton>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}
