'use client'

import * as React from 'react'
import Link from 'next/link'
import { DsButton, DsInput } from '@/components/ds'
import { EVOLVE_FEE, FLOOR_MIN, MINT_FEE, RARITY_COPY } from '@/lib/cards/catalog'
import { mintedCount } from '@/lib/cards/ledger'
import {
  cardById,
  collectorById,
  instancesFor,
  ownedBy,
  useCards,
  youOf,
} from '@/lib/cards/store'
import { HoloCard, LumenMark } from './holo-card'

export function CardsDetail({ cardId }: { cardId: string }) {
  const { state, ready, buy, list, unlist, mint, trade, evolve } = useCards()
  const card = cardById(state, cardId)
  const you = youOf(state)
  const instances = instancesFor(state, cardId)
  const yours = you ? ownedBy(state, you.id) : []
  const [price, setPrice] = React.useState('')
  const [offerId, setOfferId] = React.useState(yours[0]?.id ?? '')
  const [spin, setSpin] = React.useState(false)

  if (!card) {
    return (
      <section className="px-4 py-16 sm:px-6 md:px-10">
        <div className="mx-auto max-w-[800px]">
          <h1 className="ds-heading-lg text-2xl text-lunar">Card not on this floor</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            That id is not in the catalog or studio.
          </p>
          <Link href="/cards" className="mt-6 inline-flex text-sm text-cyan">
            Back to Cards
          </Link>
        </div>
      </section>
    )
  }

  const left = card.editionLimit - mintedCount(state, card.id)
  const history = state.ledger.filter((event) => event.cardId === card.id).slice(0, 12)
  const yourCopy = instances.find((instance) => instance.ownerId === you?.id)
  const listed = instances.filter((instance) => instance.listed)

  return (
    <section className="vdoc-nft-floor px-4 py-10 sm:px-6 md:px-10 md:py-16" data-nft-floor={card.rarity}>
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div>
          <HoloCard card={card} instance={yourCopy ?? instances[0]} spin={spin} size="lg" />
          <DsButton
            className="mt-4 w-full"
            variant="glass"
            onClick={() => setSpin((value) => !value)}
          >
            {spin ? 'Stop rotate' : 'Rotate card'}
          </DsButton>
        </div>

        <div>
          <p className="ds-label mb-3">{RARITY_COPY[card.rarity].eyebrow}</p>
          <h1 className="ds-heading-lg text-lunar text-[clamp(1.6rem,4vw,2.4rem)]">
            {card.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{card.summary}</p>
          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-white/40">Rarity</dt>
              <dd>{RARITY_COPY[card.rarity].label}</dd>
            </div>
            <div>
              <dt className="text-white/40">Creator</dt>
              <dd>{card.creator}</dd>
            </div>
            <div>
              <dt className="text-white/40">Series</dt>
              <dd>{card.series}</dd>
            </div>
            <div>
              <dt className="text-white/40">Edition</dt>
              <dd>
                {instances.length} minted · {left} left · limit {card.editionLimit}
              </dd>
            </div>
            <div>
              <dt className="text-white/40">Kind</dt>
              <dd>Platform-native collectible</dd>
            </div>
            <div>
              <dt className="text-white/40">Origin</dt>
              <dd>{card.origin === 'studio' ? 'Studio' : 'Floor catalog'}</dd>
            </div>
          </dl>
          <p className="mt-4 text-sm text-white/55">
            Ability · {card.ability}
            {yourCopy?.evolved ? ` · evolved ${yourCopy.evolved}` : ''}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            <DsButton size="sm" variant="glass" disabled={!ready || left <= 0} onClick={() => mint(card.id)}>
              Mint · {MINT_FEE[card.rarity]} Lm
            </DsButton>
            {yourCopy ? (
              <>
                <DsButton
                  size="sm"
                  variant="outline"
                  disabled={!ready}
                  onClick={() => evolve(yourCopy.id)}
                >
                  Evolve · {EVOLVE_FEE[card.rarity]} Lm
                </DsButton>
                {yourCopy.listed ? (
                  <DsButton size="sm" variant="ghost" onClick={() => unlist(yourCopy.id)}>
                    Unlist
                  </DsButton>
                ) : (
                  <form
                    className="flex gap-2"
                    onSubmit={(e) => {
                      e.preventDefault()
                      list(yourCopy.id, Number(price))
                    }}
                  >
                    <DsInput
                      label="List price"
                      className="w-36"
                      inputMode="numeric"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder={`${FLOOR_MIN[card.rarity]}+`}
                    />
                    <DsButton size="sm" variant="outline" type="submit" className="self-end">
                      List
                    </DsButton>
                  </form>
                )}
              </>
            ) : null}
          </div>

          <h2 className="mt-10 text-lg text-lunar">Editions</h2>
          <ul className="mt-3 space-y-2">
            {instances.map((instance) => {
              const owner = collectorById(state, instance.ownerId)
              return (
                <li
                  key={instance.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm"
                >
                  <span>
                    #{instance.edition} · {owner?.name ?? 'Unknown'} · {owner?.handle}
                    {instance.flagged ? ' · flagged' : ''}
                    {instance.evolved ? ` · ev ${instance.evolved}` : ''}
                  </span>
                  <span className="flex items-center gap-2">
                    {instance.listed && instance.listPrice != null ? (
                      <>
                        <LumenMark value={instance.listPrice} />
                        <DsButton
                          size="sm"
                          disabled={!ready || instance.ownerId === you?.id}
                          onClick={() => buy(instance.id)}
                        >
                          Buy
                        </DsButton>
                      </>
                    ) : (
                      <span className="text-white/40">Held</span>
                    )}
                  </span>
                </li>
              )
            })}
          </ul>

          {listed[0] && yours.length > 0 && listed[0].ownerId !== you?.id ? (
            <form
              className="mt-8 ds-glass rounded-2xl p-4"
              onSubmit={(e) => {
                e.preventDefault()
                trade(offerId, listed[0].id)
              }}
            >
              <h2 className="text-base text-lunar">Peer trade</h2>
              <p className="mt-1 text-[12px] text-white/45">
                Swap one of yours for a listed edition. The other collector is a
                floor persona. This is not a wallet transfer.
              </p>
              <label className="mt-3 block text-[13px] text-white/50">
                Offer
                <select
                  value={offerId}
                  onChange={(e) => setOfferId(e.target.value)}
                  className="mt-1 h-10 w-full rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.03] px-3 text-sm"
                >
                  {yours.map((instance) => {
                    const offerCard = cardById(state, instance.cardId)
                    return (
                      <option key={instance.id} value={instance.id}>
                        {offerCard?.title} #{instance.edition}
                      </option>
                    )
                  })}
                </select>
              </label>
              <DsButton className="mt-3" size="sm" type="submit" variant="outline">
                Trade for #{listed[0].edition}
              </DsButton>
            </form>
          ) : null}

          <h2 className="mt-10 text-lg text-lunar">History</h2>
          <ol className="mt-3 space-y-2 border-l border-white/10 pl-4 text-[13px] text-white/55">
            {history.length === 0 ? (
              <li>No writes yet for this card.</li>
            ) : (
              history.map((event) => (
                <li key={event.id}>
                  <span className="text-white/35">{event.at.slice(0, 10)}</span> · {event.note}
                </li>
              ))
            )}
          </ol>
        </div>
      </div>
    </section>
  )
}
