export const CARD_RARITIES = ['legendary', 'epic', 'rare'] as const

export type CardRarity = (typeof CARD_RARITIES)[number]

export type CardOrigin = 'floor' | 'studio'
export type CardKind = 'native' | 'chain'
export type LedgerKind =
  | 'create'
  | 'mint'
  | 'buy'
  | 'sell'
  | 'list'
  | 'unlist'
  | 'trade'
  | 'evolve'
  | 'feature'
  | 'flag'
  | 'clear'
  | 'report'
  | 'favorite'

export type TradeStatus = 'open' | 'accepted' | 'declined' | 'cancelled'
export type ReportStatus = 'open' | 'cleared'
export type FlagStatus = 'open' | 'cleared'

export type CardDefinition = {
  id: string
  title: string
  creator: string
  rarity: CardRarity
  hue: number
  editionLimit: number
  summary: string
  ability: string
  series: string
  featuredRank: number | null
  origin: CardOrigin
  createdAt: string
}

export type CardInstance = {
  id: string
  cardId: string
  edition: number
  ownerId: string
  listed: boolean
  listPrice: number | null
  evolved: number
  flagged: boolean
  createdAt: string
}

export type Collector = {
  id: string
  name: string
  handle: string
  credits: number
  favoriteIds: string[]
  floor: boolean
}

export type LedgerEvent = {
  id: string
  at: string
  kind: LedgerKind
  cardId: string
  instanceId?: string
  from?: string
  to?: string
  amount?: number
  note: string
}

export type TradeOffer = {
  id: string
  fromId: string
  toId: string
  offerInstanceId: string
  askInstanceId: string
  status: TradeStatus
  createdAt: string
}

export type CardReport = {
  id: string
  instanceId: string
  reason: string
  at: string
  status: ReportStatus
}

export type CardsState = {
  cards: CardDefinition[]
  instances: CardInstance[]
  collectors: Collector[]
  ledger: LedgerEvent[]
  trades: TradeOffer[]
  reports: CardReport[]
  youId: string
}

export type LedgerOk = { ok: true; state: CardsState; event: LedgerEvent }
export type LedgerFail = { ok: false; error: string }
export type LedgerResult = LedgerOk | LedgerFail
