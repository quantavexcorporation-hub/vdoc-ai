'use client'

import * as React from 'react'
import Link from 'next/link'
import { DsButton, DsSearchBar } from '@/components/ds'
import { EVOLVE_FEE, FLOOR_MIN, MINT_FEE, RARITY_COPY } from '@/lib/cards/catalog'
import { mintedCount } from '@/lib/cards/ledger'
import {
  cardById,
  collectorById,
  useCards,
  youOf,
} from '@/lib/cards/store'
import { CARD_RARITIES, type CardRarity } from '@/lib/cards/types'
import { HoloCard, LumenMark } from './holo-card'

type SortKey = 'featured' | 'newest' | 'price' | 'edition'

type ListingRow = NonNullable<
  ReturnType<typeof buildRow>
>

function buildRow(
  state: ReturnType<typeof useCards>['state'],
  instanceId: string
) {
  const instance = state.instances.find((item) => item.id === instanceId)
  if (!instance || !instance.listed || instance.listPrice == null) return null
  const card = cardById(state, instance.cardId)
  const owner = collectorById(state, instance.ownerId)
  return card && owner ? { instance, card, owner } : null
}

export function CardsMarket() {
  const { state, ready, buy, mint, report } = useCards()
  const you = youOf(state)
  const [query, setQuery] = React.useState('')
  const [sort, setSort] = React.useState<SortKey>('featured')
  const [reportId, setReportId] = React.useState<string | null>(null)
  const [reportText, setReportText] = React.useState('')

  const listings = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    const rows = state.instances
      .map((instance) => buildRow(state, instance.id))
      .filter((row): row is ListingRow => Boolean(row))
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
      if (sort === 'price') return (b.instance.listPrice ?? 0) - (a.instance.listPrice ?? 0)
      if (sort === 'edition') return a.instance.edition - b.instance.edition
      if (sort === 'newest') return b.instance.createdAt.localeCompare(a.instance.createdAt)
      return (a.card.featuredRank ?? 99) - (b.card.featuredRank ?? 99)
    })
  }, [query, sort, state])

  const byRarity = React.useMemo(() => {
    const groups = {} as Record<CardRarity, ListingRow[]>
    for (const rarity of CARD_RARITIES) groups[rarity] = []
    for (const row of listings) groups[row.card.rarity].push(row)
    return groups
  }, [listings])

  return (
    <div data-nft-floor="all" className="vdoc-nft-floor">
      <section className="px-4 py-8 sm:px-6 md:px-10 md:py-12">
        <div className="mx-auto max-w-[1400px]">
          <p className="ds-label mb-3">Cards desk</p>
          <h1 className="ds-heading-lg max-w-3xl text-lunar text-[clamp(1.6rem,4vw,2.4rem)]">
            Leaderboard
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Legendary, Epic, and Rare sit in one desk. Floor credit only — not a
            purchase, not a chain.
          </p>

          <article
            className="vdoc-card-desk mt-8 overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.03]"
            aria-labelledby="cards-desk-title"
          >
            <header className="flex flex-col gap-3 border-b border-white/8 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div>
                <p id="cards-desk-title" className="font-mono text-[11px] tracking-[0.16em] text-white/40">
                  LEADERBOARD · FLOOR DESK
                </p>
                <p className="mt-1 text-[13px] text-white/55">
                  {ready ? `${listings.length} quotes` : 'Reading this device…'} · three books
                </p>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:max-w-xl sm:flex-row sm:items-center sm:justify-end">
                <DsSearchBar
                  id="cards-search"
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search title, creator, owner…"
                  className="max-w-full"
                />
                <label className="flex items-center gap-2 text-[13px] text-white/50">
                  Rank
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="h-10 rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.03] px-3 text-sm text-foreground"
                  >
                    <option value="featured">Featured</option>
                    <option value="price">Quote</option>
                    <option value="newest">Newest</option>
                    <option value="edition">Edition</option>
                  </select>
                </label>
              </div>
            </header>

            <div className="grid md:grid-cols-3">
              {CARD_RARITIES.map((rarity) => {
                const rows = byRarity[rarity]
                const books = state.cards.filter((card) => card.rarity === rarity)
                const lead = rows[0]
                return (
                  <section
                    key={rarity}
                    data-rarity={rarity}
                    className="vdoc-card-book border-white/8 px-4 py-5 md:border-r md:last:border-r-0"
                    aria-labelledby={`desk-${rarity}`}
                  >
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="ds-label">{RARITY_COPY[rarity].eyebrow}</p>
                        <h2 id={`desk-${rarity}`} className="mt-1 text-lg text-lunar">
                          {RARITY_COPY[rarity].label}
                        </h2>
                      </div>
                      <p className="font-mono text-[11px] text-white/40">
                        {rows.length} live
                      </p>
                    </div>

                    {lead ? (
                      <div className="mt-4">
                        <HoloCard
                          card={lead.card}
                          instance={lead.instance}
                          href={`/cards/${lead.card.id}`}
                          size="sm"
                        />
                      </div>
                    ) : (
                      <p className="mt-4 text-sm text-white/40">No live quote in this book.</p>
                    )}

                    <ol className="mt-4 space-y-1.5">
                      {rows.map((row, index) => (
                        <li
                          key={row.instance.id}
                          className="rounded-xl border border-white/8 bg-black/20 px-2.5 py-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <Link
                              href={`/cards/${row.card.id}`}
                              className="min-w-0 text-[13px] text-lunar hover:text-cyan"
                            >
                              <span className="mr-2 font-mono text-[11px] text-white/35">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              {row.card.title}
                              <span className="ml-1 text-white/40">#{row.instance.edition}</span>
                            </Link>
                            <LumenMark value={row.instance.listPrice ?? 0} />
                          </div>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <p className="truncate text-[11px] text-white/40">
                              {row.owner.handle}
                            </p>
                            <div className="flex gap-1">
                              <DsButton
                                size="sm"
                                disabled={!ready || row.owner.id === you?.id}
                                onClick={() => buy(row.instance.id)}
                              >
                                Buy
                              </DsButton>
                              <DsButton
                                size="sm"
                                variant="ghost"
                                onClick={() => setReportId(row.instance.id)}
                              >
                                Flag
                              </DsButton>
                            </div>
                          </div>
                          {reportId === row.instance.id ? (
                            <form
                              className="mt-2 flex gap-2"
                              onSubmit={(e) => {
                                e.preventDefault()
                                if (report(row.instance.id, reportText)) {
                                  setReportId(null)
                                  setReportText('')
                                }
                              }}
                            >
                              <input
                                value={reportText}
                                onChange={(e) => setReportText(e.target.value)}
                                placeholder="Why is this quote off?"
                                className="h-9 min-w-0 flex-1 rounded-[var(--radius-md)] border border-white/10 bg-white/[0.03] px-2 text-sm"
                              />
                              <DsButton size="sm" variant="outline" type="submit">
                                Send
                              </DsButton>
                            </form>
                          ) : null}
                        </li>
                      ))}
                    </ol>

                    <div className="mt-5 border-t border-white/8 pt-4">
                      <p className="font-mono text-[10px] tracking-[0.14em] text-white/35">
                        MINT BOOK · {MINT_FEE[rarity]} LM
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {books.slice(0, 4).map((card) => {
                          const minted = mintedCount(state, card.id)
                          const left = card.editionLimit - minted
                          return (
                            <li
                              key={card.id}
                              className="flex items-center justify-between gap-2 text-[12px]"
                            >
                              <Link href={`/cards/${card.id}`} className="min-w-0 truncate text-white/70 hover:text-cyan">
                                {card.title}
                                <span className="ml-1 text-white/35">
                                  {left} left · floor {FLOOR_MIN[rarity]}
                                </span>
                              </Link>
                              <DsButton
                                size="sm"
                                variant="glass"
                                disabled={!ready || left <= 0}
                                onClick={() => mint(card.id)}
                              >
                                Mint
                              </DsButton>
                            </li>
                          )
                        })}
                      </ul>
                      <p className="mt-2 text-[11px] text-white/30">
                        Evolve {EVOLVE_FEE[rarity]} Lm
                      </p>
                    </div>
                  </section>
                )
              })}
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}
