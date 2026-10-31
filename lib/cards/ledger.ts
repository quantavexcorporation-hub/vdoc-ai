import { EVOLVE_FEE, FLOOR_MIN, MINT_FEE } from './catalog'
import type {
  CardDefinition,
  CardRarity,
  CardsState,
  Collector,
  LedgerEvent,
  LedgerResult,
} from './types'
import { CARD_RARITIES } from './types'

function now() {
  return new Date().toISOString()
}

function uid(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

function fail(error: string): LedgerResult {
  return { ok: false, error }
}

function clone(state: CardsState): CardsState {
  return {
    ...state,
    cards: state.cards.map((card) => ({ ...card })),
    instances: state.instances.map((instance) => ({ ...instance })),
    collectors: state.collectors.map((collector) => ({
      ...collector,
      favoriteIds: [...collector.favoriteIds],
    })),
    ledger: [...state.ledger],
    trades: state.trades.map((trade) => ({ ...trade })),
    reports: state.reports.map((report) => ({ ...report })),
  }
}

function push(
  next: CardsState,
  event: Omit<LedgerEvent, 'id' | 'at'>
): LedgerResult {
  const written: LedgerEvent = { id: uid('evt'), at: now(), ...event }
  next.ledger = [written, ...next.ledger].slice(0, 240)
  return { ok: true, state: next, event: written }
}

function collector(state: CardsState, id: string) {
  return state.collectors.find((item) => item.id === id) ?? null
}

function cardOf(state: CardsState, id: string) {
  return state.cards.find((item) => item.id === id) ?? null
}

function instanceOf(state: CardsState, id: string) {
  return state.instances.find((item) => item.id === id) ?? null
}

function burstBlocked(state: CardsState, actorId: string) {
  const recent = state.ledger.filter(
    (event) =>
      (event.from === actorId || event.to === actorId) &&
      Date.now() - Date.parse(event.at) < 1600
  )
  return recent.length >= 4
}

function rarityOk(value: string): value is CardRarity {
  return (CARD_RARITIES as readonly string[]).includes(value)
}

function debit(person: Collector, amount: number) {
  if (person.credits < amount) return false
  person.credits -= amount
  return true
}

function credit(person: Collector, amount: number) {
  person.credits += amount
}

export function mintedCount(state: CardsState, cardId: string) {
  return state.instances.filter((instance) => instance.cardId === cardId).length
}

export function buyListing(
  state: CardsState,
  instanceId: string,
  buyerId: string
): LedgerResult {
  if (burstBlocked(state, buyerId)) {
    return fail('Slow down — this floor blocks burst writes.')
  }
  const next = clone(state)
  const instance = instanceOf(next, instanceId)
  const buyer = collector(next, buyerId)
  if (!instance || !buyer) return fail('That card is not on this floor.')
  const card = cardOf(next, instance.cardId)
  const seller = collector(next, instance.ownerId)
  if (!card || !seller) return fail('Owner or card is missing.')
  if (instance.flagged) return fail('This listing is flagged. Studio must clear it.')
  if (!instance.listed || instance.listPrice == null) {
    return fail('This edition is not listed.')
  }
  if (instance.ownerId === buyerId) return fail('You already hold this edition.')
  if (instance.listPrice < FLOOR_MIN[card.rarity]) {
    return fail('Price is under the rarity floor. Listing is blocked.')
  }
  if (!debit(buyer, instance.listPrice)) {
    return fail('Not enough Lumen on this floor.')
  }
  credit(seller, instance.listPrice)
  const amount = instance.listPrice
  instance.ownerId = buyerId
  instance.listed = false
  instance.listPrice = null
  return push(next, {
    kind: 'buy',
    cardId: card.id,
    instanceId: instance.id,
    from: seller.id,
    to: buyerId,
    amount,
    note: `Bought ${card.title} #${instance.edition} for ${amount} Lumen.`,
  })
}

export function listInstance(
  state: CardsState,
  instanceId: string,
  ownerId: string,
  price: number
): LedgerResult {
  const next = clone(state)
  const instance = instanceOf(next, instanceId)
  const owner = collector(next, ownerId)
  if (!instance || !owner) return fail('That edition is not on this floor.')
  const card = cardOf(next, instance.cardId)
  if (!card) return fail('Card is missing.')
  if (instance.ownerId !== ownerId) return fail('You do not own this edition.')
  if (instance.flagged) return fail('Flagged editions cannot be listed.')
  if (!Number.isInteger(price) || price < FLOOR_MIN[card.rarity]) {
    return fail(`List at ${FLOOR_MIN[card.rarity]} Lumen or more for ${card.rarity}.`)
  }
  instance.listed = true
  instance.listPrice = price
  return push(next, {
    kind: 'list',
    cardId: card.id,
    instanceId: instance.id,
    from: ownerId,
    amount: price,
    note: `Listed ${card.title} #${instance.edition} at ${price} Lumen.`,
  })
}

export function unlistInstance(
  state: CardsState,
  instanceId: string,
  ownerId: string
): LedgerResult {
  const next = clone(state)
  const instance = instanceOf(next, instanceId)
  if (!instance) return fail('That edition is not on this floor.')
  if (instance.ownerId !== ownerId) return fail('You do not own this edition.')
  if (!instance.listed) return fail('This edition is not listed.')
  instance.listed = false
  instance.listPrice = null
  return push(next, {
    kind: 'unlist',
    cardId: instance.cardId,
    instanceId: instance.id,
    from: ownerId,
    note: `Unlisted edition ${instance.edition}.`,
  })
}

export function mintInstance(
  state: CardsState,
  cardId: string,
  ownerId: string
): LedgerResult {
  if (burstBlocked(state, ownerId)) {
    return fail('Slow down — this floor blocks burst writes.')
  }
  const next = clone(state)
  const card = cardOf(next, cardId)
  const owner = collector(next, ownerId)
  if (!card || !owner) return fail('Card or collector is missing.')
  const minted = mintedCount(next, cardId)
  if (minted >= card.editionLimit) return fail('This edition is sold out on this floor.')
  const fee = MINT_FEE[card.rarity]
  if (!debit(owner, fee)) return fail(`Mint needs ${fee} Lumen on this floor.`)
  const edition = minted + 1
  const instance = {
    id: uid('inst'),
    cardId: card.id,
    edition,
    ownerId,
    listed: false,
    listPrice: null,
    evolved: 0,
    flagged: false,
    createdAt: now(),
  }
  next.instances = [instance, ...next.instances]
  return push(next, {
    kind: 'mint',
    cardId: card.id,
    instanceId: instance.id,
    to: ownerId,
    amount: fee,
    note: `Minted ${card.title} #${edition} as a platform-native card.`,
  })
}

export function createCard(
  state: CardsState,
  input: {
    title: string
    rarity: string
    hue: number
    editionLimit: number
    summary: string
    ability: string
    series: string
    creator: string
  }
): LedgerResult {
  const title = input.title.trim()
  const summary = input.summary.trim()
  const ability = input.ability.trim()
  const series = input.series.trim() || 'Studio Series'
  if (title.length < 3 || title.length > 48) {
    return fail('Title needs 3–48 characters.')
  }
  if (!rarityOk(input.rarity)) return fail('Use Legendary, Epic, or Rare only.')
  if (!Number.isInteger(input.editionLimit) || input.editionLimit < 1 || input.editionLimit > 999) {
    return fail('Edition limit must be 1–999.')
  }
  if (summary.length < 8) return fail('Write a short summary.')
  if (state.cards.some((card) => card.title.toLowerCase() === title.toLowerCase())) {
    return fail('A card with that title already exists.')
  }
  const next = clone(state)
  const card: CardDefinition = {
    id: title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 40) || uid('card'),
    title,
    creator: input.creator.trim() || 'Studio',
    rarity: input.rarity,
    hue: Math.max(0, Math.min(360, Math.round(input.hue) || 200)),
    editionLimit: input.editionLimit,
    summary,
    ability: ability || 'Holds a floor mark.',
    series,
    featuredRank: null,
    origin: 'studio',
    createdAt: now(),
  }
  if (
    next.cards.some((item) => item.id === card.id) ||
    card.id === 'collection' ||
    card.id === 'studio'
  ) {
    card.id = `${card.id}-${uid('x').slice(-4)}`
  }
  next.cards = [card, ...next.cards]
  return push(next, {
    kind: 'create',
    cardId: card.id,
    from: next.youId,
    note: `Studio created ${card.title} · ${card.rarity} · limit ${card.editionLimit}.`,
  })
}

export function tradeInstances(
  state: CardsState,
  fromId: string,
  offerInstanceId: string,
  askInstanceId: string
): LedgerResult {
  if (offerInstanceId === askInstanceId) return fail('A card cannot trade for itself.')
  if (burstBlocked(state, fromId)) {
    return fail('Slow down — this floor blocks burst writes.')
  }
  const next = clone(state)
  const offer = instanceOf(next, offerInstanceId)
  const ask = instanceOf(next, askInstanceId)
  if (!offer || !ask) return fail('One of those editions is missing.')
  if (offer.ownerId !== fromId) return fail('You do not own the offered edition.')
  if (ask.ownerId === fromId) return fail('You already hold the asked edition.')
  if (offer.flagged || ask.flagged) return fail('Flagged editions cannot trade.')
  const toId = ask.ownerId
  const from = collector(next, fromId)
  const to = collector(next, toId)
  if (!from || !to) return fail('Collector is missing.')
  offer.ownerId = toId
  offer.listed = false
  offer.listPrice = null
  ask.ownerId = fromId
  ask.listed = false
  ask.listPrice = null
  next.trades = [
    {
      id: uid('trd'),
      fromId,
      toId,
      offerInstanceId,
      askInstanceId,
      status: 'accepted',
      createdAt: now(),
    },
    ...next.trades,
  ].slice(0, 80)
  const offerCard = cardOf(next, offer.cardId)
  const askCard = cardOf(next, ask.cardId)
  return push(next, {
    kind: 'trade',
    cardId: ask.cardId,
    instanceId: ask.id,
    from: fromId,
    to: toId,
    note: `Traded ${offerCard?.title ?? 'card'} #${offer.edition} for ${askCard?.title ?? 'card'} #${ask.edition}. Floor personas, not live wallets.`,
  })
}

export function evolveInstance(
  state: CardsState,
  instanceId: string,
  ownerId: string
): LedgerResult {
  const next = clone(state)
  const instance = instanceOf(next, instanceId)
  const owner = collector(next, ownerId)
  if (!instance || !owner) return fail('That edition is not on this floor.')
  const card = cardOf(next, instance.cardId)
  if (!card) return fail('Card is missing.')
  if (instance.ownerId !== ownerId) return fail('You do not own this edition.')
  if (instance.listed) return fail('Unlist before you evolve it.')
  if (instance.flagged) return fail('Flagged editions cannot evolve.')
  if (instance.evolved >= 3) return fail('This edition is already at evolve 3.')
  const fee = EVOLVE_FEE[card.rarity]
  if (!debit(owner, fee)) return fail(`Evolve needs ${fee} Lumen.`)
  instance.evolved += 1
  return push(next, {
    kind: 'evolve',
    cardId: card.id,
    instanceId: instance.id,
    from: ownerId,
    amount: fee,
    note: `Evolved ${card.title} #${instance.edition} to level ${instance.evolved}.`,
  })
}

export function setFavorites(
  state: CardsState,
  ownerId: string,
  favoriteIds: string[]
): LedgerResult {
  const unique = [...new Set(favoriteIds)].slice(0, 3)
  const next = clone(state)
  const owner = collector(next, ownerId)
  if (!owner) return fail('Collector is missing.')
  if (
    unique.some((id) => {
      const instance = instanceOf(next, id)
      return !instance || instance.ownerId !== ownerId
    })
  ) {
    return fail('Showcase only accepts editions you own.')
  }
  owner.favoriteIds = unique
  return push(next, {
    kind: 'favorite',
    cardId: next.cards[0]?.id ?? 'floor',
    from: ownerId,
    note: `Showcase set to ${unique.length} card${unique.length === 1 ? '' : 's'}.`,
  })
}

export function featureCard(
  state: CardsState,
  cardId: string,
  rank: number | null
): LedgerResult {
  const next = clone(state)
  const card = cardOf(next, cardId)
  if (!card) return fail('Card is missing.')
  if (rank != null && (!Number.isInteger(rank) || rank < 1 || rank > 6)) {
    return fail('Feature rank is 1–6, or clear it.')
  }
  if (rank != null) {
    for (const item of next.cards) {
      if (item.id !== cardId && item.featuredRank === rank) item.featuredRank = null
    }
  }
  card.featuredRank = rank
  return push(next, {
    kind: 'feature',
    cardId: card.id,
    from: next.youId,
    note:
      rank == null
        ? `Cleared feature on ${card.title}.`
        : `Featured ${card.title} at rank ${rank}.`,
  })
}

export function reportListing(
  state: CardsState,
  instanceId: string,
  reason: string
): LedgerResult {
  const text = reason.trim()
  if (text.length < 6) return fail('Write a short report reason.')
  const next = clone(state)
  const instance = instanceOf(next, instanceId)
  if (!instance) return fail('That edition is not on this floor.')
  next.reports = [
    {
      id: uid('rpt'),
      instanceId,
      reason: text.slice(0, 160),
      at: now(),
      status: 'open',
    },
    ...next.reports,
  ].slice(0, 80)
  return push(next, {
    kind: 'report',
    cardId: instance.cardId,
    instanceId,
    from: next.youId,
    note: `Report opened: ${text.slice(0, 80)}`,
  })
}

export function setFlag(
  state: CardsState,
  instanceId: string,
  flagged: boolean
): LedgerResult {
  const next = clone(state)
  const instance = instanceOf(next, instanceId)
  if (!instance) return fail('That edition is not on this floor.')
  instance.flagged = flagged
  if (flagged) {
    instance.listed = false
    instance.listPrice = null
  }
  return push(next, {
    kind: flagged ? 'flag' : 'clear',
    cardId: instance.cardId,
    instanceId,
    from: next.youId,
    note: flagged
      ? `Flagged edition ${instance.edition}. Listing closed.`
      : `Cleared flag on edition ${instance.edition}.`,
  })
}

export function clearReport(state: CardsState, reportId: string): LedgerResult {
  const next = clone(state)
  const report = next.reports.find((item) => item.id === reportId)
  if (!report) return fail('Report is missing.')
  report.status = 'cleared'
  const instance = instanceOf(next, report.instanceId)
  return push(next, {
    kind: 'clear',
    cardId: instance?.cardId ?? 'floor',
    instanceId: report.instanceId,
    from: next.youId,
    note: 'Report cleared in studio.',
  })
}
