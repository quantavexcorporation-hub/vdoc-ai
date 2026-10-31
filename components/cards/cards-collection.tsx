'use client'

import { DsButton } from '@/components/ds'
import { cardById, ownedBy, useCards, youOf } from '@/lib/cards/store'
import { HoloCard, LumenMark } from './holo-card'

export function CardsCollection() {
  const { state, ready, favorites, unlist } = useCards()
  const you = youOf(state)
  const held = you ? ownedBy(state, you.id) : []
  const showcase = (you?.favoriteIds ?? [])
    .map((id) => held.find((instance) => instance.id === id))
    .filter((instance): instance is NonNullable<typeof instance> => Boolean(instance))

  return (
    <section className="px-4 py-10 sm:px-6 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="ds-label mb-3">Your floor</p>
        <h1 className="ds-heading-lg text-lunar text-[clamp(1.6rem,4vw,2.4rem)]">
          Collection and showcase
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Three favourite cards sit on this floor profile. Public account profiles
          are not shipped. Ownership is on this device.
        </p>
        {you ? (
          <p className="mt-4 text-sm text-white/55">
            {you.name} · {you.handle} · <LumenMark value={you.credits} /> · {held.length} held
          </p>
        ) : null}

        <h2 className="mt-10 text-lg text-lunar">Favourite three</h2>
        {showcase.length === 0 ? (
          <p className="mt-3 text-sm text-white/45">Pick up to three from the cards you hold.</p>
        ) : (
          <ul className="mt-5 grid gap-4 sm:grid-cols-3">
            {showcase.map((instance) => {
              const card = cardById(state, instance.cardId)
              if (!card) return null
              return (
                <li key={instance.id}>
                  <HoloCard card={card} instance={instance} href={`/cards/${card.id}`} />
                </li>
              )
            })}
          </ul>
        )}

        <h2 className="mt-12 text-lg text-lunar">Held editions</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {held.map((instance) => {
            const card = cardById(state, instance.cardId)
            if (!card) return null
            const selected = you?.favoriteIds.includes(instance.id)
            return (
              <li key={instance.id} className="ds-glass rounded-[1.25rem] p-4">
                <HoloCard card={card} instance={instance} href={`/cards/${card.id}`} />
                <div className="mt-4 flex flex-wrap gap-2">
                  <DsButton
                    size="sm"
                    variant={selected ? 'primary' : 'glass'}
                    disabled={!ready}
                    onClick={() => {
                      const current = you?.favoriteIds ?? []
                      const next = selected
                        ? current.filter((id) => id !== instance.id)
                        : [...current, instance.id].slice(0, 3)
                      favorites(next)
                    }}
                  >
                    {selected ? 'On showcase' : 'Showcase'}
                  </DsButton>
                  {instance.listed ? (
                    <DsButton size="sm" variant="ghost" onClick={() => unlist(instance.id)}>
                      Unlist
                    </DsButton>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ul>

        <h2 className="mt-12 text-lg text-lunar">Floor personas</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {state.collectors
            .filter((collector) => !collector.floor)
            .map((collector) => {
              const count = ownedBy(state, collector.id).length
              const fav = collector.favoriteIds[0]
              const favInst = state.instances.find((instance) => instance.id === fav)
              const favCard = favInst ? cardById(state, favInst.cardId) : null
              return (
                <li key={collector.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-sm text-lunar">{collector.name}</p>
                  <p className="text-[12px] text-white/40">{collector.handle}</p>
                  <p className="mt-2 text-[12px] text-white/50">
                    {count} cards · <LumenMark value={collector.credits} />
                  </p>
                  {favCard ? (
                    <p className="mt-2 text-[12px] text-white/45">Shows {favCard.title}</p>
                  ) : null}
                </li>
              )
            })}
        </ul>

        <h2 className="mt-12 text-lg text-lunar">Your writes</h2>
        <ol className="mt-3 space-y-2 border-l border-white/10 pl-4 text-[13px] text-white/55">
          {state.ledger
            .filter(
              (event) => event.from === state.youId || event.to === state.youId
            )
            .slice(0, 16)
            .map((event) => (
              <li key={event.id}>
                <span className="text-white/35">{event.at.slice(0, 16).replace('T', ' ')}</span>
                {' · '}
                {event.note}
              </li>
            ))}
        </ol>
      </div>
    </section>
  )
}
