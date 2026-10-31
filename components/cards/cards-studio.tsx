'use client'

import * as React from 'react'
import { DsButton, DsInput } from '@/components/ds'
import { CARD_RARITIES } from '@/lib/cards/types'
import { RARITY_COPY } from '@/lib/cards/catalog'
import { mintedCount } from '@/lib/cards/ledger'
import { cardById, collectorById, useCards } from '@/lib/cards/store'

export function CardsStudio() {
  const { state, ready, create, feature, flag, resolveReport } = useCards()
  const [title, setTitle] = React.useState('')
  const [rarity, setRarity] = React.useState<(typeof CARD_RARITIES)[number]>('rare')
  const [limit, setLimit] = React.useState('48')
  const [hue, setHue] = React.useState('200')
  const [series, setSeries] = React.useState('Studio Series')
  const [summary, setSummary] = React.useState('')
  const [ability, setAbility] = React.useState('')

  return (
    <section className="px-4 py-10 sm:px-6 md:px-10 md:py-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="ds-label mb-3">Studio</p>
        <h1 className="ds-heading-lg text-lunar text-[clamp(1.6rem,4vw,2.4rem)]">
          Create and moderate on this device
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          This is a floor studio, not a remote admin console. It writes
          platform-native cards here. It does not mint on a chain. Suspicious
          listings can be flagged so they cannot sell.
        </p>

        <form
          className="mt-8 grid gap-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault()
            if (
              create({
                title,
                rarity,
                hue: Number(hue),
                editionLimit: Number(limit),
                summary,
                ability,
                series,
                creator: 'Studio',
              })
            ) {
              setTitle('')
              setSummary('')
              setAbility('')
            }
          }}
        >
          <DsInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label className="flex w-full flex-col gap-2">
            <span className="ds-label">Rarity</span>
            <select
              value={rarity}
              onChange={(e) => setRarity(e.target.value as typeof rarity)}
              className="h-11 rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.03] px-3 text-sm"
            >
              {CARD_RARITIES.map((item) => (
                <option key={item} value={item}>
                  {RARITY_COPY[item].label}
                </option>
              ))}
            </select>
          </label>
          <DsInput
            label="Edition limit"
            inputMode="numeric"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
          <DsInput
            label="Hue"
            inputMode="numeric"
            value={hue}
            onChange={(e) => setHue(e.target.value)}
          />
          <DsInput label="Series" value={series} onChange={(e) => setSeries(e.target.value)} />
          <DsInput label="Ability" value={ability} onChange={(e) => setAbility(e.target.value)} />
          <div className="md:col-span-2">
            <DsInput
              label="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
          <DsButton type="submit" disabled={!ready}>
            Create native card
          </DsButton>
        </form>

        <h2 className="mt-12 text-lg text-lunar">Catalog control</h2>
        <ul className="mt-4 space-y-2">
          {state.cards.map((card) => (
            <li
              key={card.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm"
            >
              <span>
                {card.title} · {RARITY_COPY[card.rarity].label} ·{' '}
                {mintedCount(state, card.id)}/{card.editionLimit}
                {card.featuredRank ? ` · feature ${card.featuredRank}` : ''}
              </span>
              <span className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((rank) => (
                  <button
                    key={rank}
                    type="button"
                    className="rounded-md px-2 py-1 text-[11px] text-white/50 hover:bg-white/10 hover:text-white"
                    onClick={() => feature(card.id, card.featuredRank === rank ? null : rank)}
                  >
                    F{rank}
                  </button>
                ))}
              </span>
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-lg text-lunar">Listings and flags</h2>
        <ul className="mt-4 space-y-2">
          {state.instances
            .filter((instance) => instance.listed || instance.flagged)
            .map((instance) => {
              const card = cardById(state, instance.cardId)
              const owner = collectorById(state, instance.ownerId)
              return (
                <li
                  key={instance.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm"
                >
                  <span>
                    {card?.title} #{instance.edition} · {owner?.handle}
                    {instance.listed ? ` · ${instance.listPrice} Lm` : ''}
                    {instance.flagged ? ' · flagged' : ''}
                  </span>
                  <DsButton
                    size="sm"
                    variant="ghost"
                    onClick={() => flag(instance.id, !instance.flagged)}
                  >
                    {instance.flagged ? 'Clear flag' : 'Flag'}
                  </DsButton>
                </li>
              )
            })}
        </ul>

        <h2 className="mt-12 text-lg text-lunar">Reports</h2>
        <ul className="mt-4 space-y-2">
          {state.reports.length === 0 ? (
            <li className="text-sm text-white/40">No reports on this device.</li>
          ) : (
            state.reports.map((report) => (
              <li
                key={report.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm"
              >
                <span>
                  {report.status} · {report.reason}
                </span>
                {report.status === 'open' ? (
                  <DsButton size="sm" variant="outline" onClick={() => resolveReport(report.id)}>
                    Clear
                  </DsButton>
                ) : null}
              </li>
            ))
          )}
        </ul>

        <h2 className="mt-12 text-lg text-lunar">Ledger</h2>
        <ol className="mt-3 max-h-[28rem] space-y-2 overflow-auto border-l border-white/10 pl-4 text-[13px] text-white/55">
          {state.ledger.map((event) => (
            <li key={event.id}>
              <span className="text-white/35">{event.at.slice(0, 16).replace('T', ' ')}</span>
              {' · '}
              {event.kind} · {event.note}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
