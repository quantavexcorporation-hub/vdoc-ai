import type { CardDefinition, CardInstance, CardsState, Collector } from './types'

export const YOU_ID = 'you'
export const STORE_KEY = 'vdoc_cards_floor_v1'

export const FLOOR_MIN: Record<'legendary' | 'epic' | 'rare', number> = {
  legendary: 220,
  epic: 80,
  rare: 28,
}

export const MINT_FEE: Record<'legendary' | 'epic' | 'rare', number> = {
  legendary: 520,
  epic: 210,
  rare: 86,
}

export const EVOLVE_FEE: Record<'legendary' | 'epic' | 'rare', number> = {
  legendary: 360,
  epic: 160,
  rare: 64,
}

export const RARITY_COPY = {
  legendary: {
    label: 'Legendary',
    eyebrow: 'Ultra-rare',
    title: 'Gold-locked editions.',
    body: 'Premium holographic cards with tight supply. Exclusive on this floor — not a live chain drop.',
  },
  epic: {
    label: 'Epic',
    eyebrow: 'Special edition',
    title: 'High-signal collectibles.',
    body: 'Purple-blue motion, animated faces, and special editions. Floor credit only — not a purchase.',
  },
  rare: {
    label: 'Rare',
    eyebrow: 'Limited',
    title: 'Distinct limited cards.',
    body: 'Silver-cyan holos with edition numbers. Limited on this device, not a public mint.',
  },
} as const

const CREATED = '2026-03-01T12:00:00.000Z'

function card(
  id: string,
  title: string,
  rarity: CardDefinition['rarity'],
  hue: number,
  editionLimit: number,
  series: string,
  summary: string,
  ability: string,
  featuredRank: number | null = null
): CardDefinition {
  return {
    id,
    title,
    creator: 'VDOC Floor',
    rarity,
    hue,
    editionLimit,
    summary,
    ability,
    series,
    featuredRank,
    origin: 'floor',
    createdAt: CREATED,
  }
}

export const FLOOR_CARDS: CardDefinition[] = [
  card(
    'afterlight-crown',
    'Afterlight Crown',
    'legendary',
    48,
    18,
    'Cinema Relics',
    'The last light from Afterlight, pressed into a gold seal.',
    'Holds a resume mark on cinema floors.',
    1
  ),
  card(
    'neo-harbor-seal',
    'Neo Harbor Seal',
    'legendary',
    200,
    24,
    'City Keys',
    'A city that listens, stamped as a collector seal.',
    'Opens a preview of Virtual Cities.',
    2
  ),
  card(
    'listening-forest-relic',
    'Listening Forest Relic',
    'legendary',
    155,
    12,
    'Story Relics',
    'Bark that remembers every quiet choice.',
    'Keeps a story thread warm.',
    3
  ),
  card(
    'night-circuit-halo',
    'Night Circuit Halo',
    'legendary',
    280,
    16,
    'Novel Relics',
    'A novel ring that only lights after midnight.',
    'Marks a long-form night.',
    null
  ),
  card(
    'studio-seven-key',
    'Studio Seven Key',
    'legendary',
    320,
    20,
    'Creator Relics',
    'A key that never leaves the seventh room.',
    'Unlocks a creator preview.',
    null
  ),
  card(
    'mirror-room-sigil',
    'Mirror Room Sigil',
    'legendary',
    18,
    14,
    'Noir Relics',
    'A sigil that only shows your last look.',
    'Holds a noir cut.',
    null
  ),
  card(
    'rain-district-pass',
    'Rain District Pass',
    'epic',
    210,
    64,
    'Story Editions',
    'Chapter weather, printed as a pass.',
    'Keeps Rain District on your floor.',
    4
  ),
  card(
    'glass-empire-crest',
    'Glass Empire Crest',
    'epic',
    255,
    80,
    'Game Editions',
    'A crest that fractures and reforms.',
    'Signals a game arena.',
    5
  ),
  card(
    'harbor-desk-quill',
    'Harbor Desk Quill',
    'epic',
    40,
    72,
    'Novel Editions',
    'A quill that writes the same desk twice.',
    'Pins a novel return.',
    null
  ),
  card(
    'soft-vote-ribbon',
    'Soft Vote Ribbon',
    'epic',
    330,
    96,
    'Serial Editions',
    'A ribbon for a vote that never shouts.',
    'Holds a serial beat.',
    null
  ),
  card(
    'driftline-arena-mark',
    'Driftline Arena Mark',
    'epic',
    190,
    88,
    'Game Editions',
    'A mark that only stays if you keep moving.',
    'Opens a Driftline preview.',
    null
  ),
  card(
    'pale-constellation',
    'Pale Constellation',
    'epic',
    265,
    54,
    'Fresh Editions',
    'A sky map dropped two hours ago.',
    'Keeps a just-release glow.',
    6
  ),
  card(
    'paper-crane-flicker',
    'Paper Crane Flicker',
    'rare',
    25,
    240,
    'Short Prints',
    'A twelve-second fold that still flies.',
    'Opens a short preview.',
    null
  ),
  card(
    'null-garden-seed',
    'Null Garden Seed',
    'rare',
    150,
    200,
    'Game Prints',
    'A seed that grows only in empty rooms.',
    'Holds a game start.',
    null
  ),
  card(
    'bridge-cut-token',
    'Bridge Cut Token',
    'rare',
    175,
    280,
    'Story Prints',
    'A token from a forked ending.',
    'Marks a community cut.',
    null
  ),
  card(
    'signal-choir-note',
    'Signal Choir Note',
    'rare',
    220,
    320,
    'Novel Prints',
    'One note from a choir that never meets.',
    'Keeps a quiet score.',
    null
  ),
  card(
    'whisper-protocol-chip',
    'Whisper Protocol Chip',
    'rare',
    300,
    260,
    'Story Prints',
    'A chip that only speaks once.',
    'Holds a thriller beat.',
    null
  ),
  card(
    'lumen-run-badge',
    'Lumen Run Badge',
    'rare',
    80,
    360,
    'Game Prints',
    'A badge for a run you have not finished.',
    'Pins a co-op start.',
    null
  ),
]

export const SEED_COLLECTORS: Collector[] = [
  {
    id: YOU_ID,
    name: 'You',
    handle: '@floor',
    credits: 1860,
    favoriteIds: ['inst_paper-crane-flicker_1', 'inst_rain-district-pass_1'],
    floor: true,
  },
  {
    id: 'aya',
    name: 'Aya Chen',
    handle: '@bridge',
    credits: 4200,
    favoriteIds: ['inst_bridge-cut-token_1'],
    floor: false,
  },
  {
    id: 'nova',
    name: 'Nova Ellison',
    handle: '@quiet',
    credits: 3100,
    favoriteIds: ['inst_listening-forest-relic_1'],
    floor: false,
  },
  {
    id: 'harbor',
    name: 'Harbor Desk',
    handle: '@desk',
    credits: 2540,
    favoriteIds: ['inst_harbor-desk-quill_1'],
    floor: false,
  },
]

const OWNER_ROTATION = [YOU_ID, 'aya', 'nova', 'harbor'] as const

function seedCount(limit: number) {
  return Math.min(limit, limit <= 24 ? 4 : limit <= 96 ? 5 : 6)
}

function suggestedPrice(card: CardDefinition, edition: number) {
  const base = FLOOR_MIN[card.rarity] * 2 + (card.featuredRank ?? 0) * 40
  return base + edition * 6
}

export function seedInstances(): CardInstance[] {
  const instances: CardInstance[] = []
  for (const card of FLOOR_CARDS) {
    const count = seedCount(card.editionLimit)
    for (let n = 1; n <= count; n += 1) {
      const ownerId = OWNER_ROTATION[(n - 1) % OWNER_ROTATION.length]
      const listed = ownerId !== YOU_ID && n % 2 === 0
      instances.push({
        id: `inst_${card.id}_${n}`,
        cardId: card.id,
        edition: n,
        ownerId,
        listed,
        listPrice: listed ? suggestedPrice(card, n) : null,
        evolved: n === 1 && card.rarity === 'legendary' ? 1 : 0,
        flagged: false,
        createdAt: CREATED,
      })
    }
  }
  return instances
}

export function seedState(): CardsState {
  return {
    cards: FLOOR_CARDS.map((card) => ({ ...card })),
    instances: seedInstances(),
    collectors: SEED_COLLECTORS.map((collector) => ({
      ...collector,
      favoriteIds: [...collector.favoriteIds],
    })),
    ledger: [
      {
        id: 'evt_floor_open',
        at: CREATED,
        kind: 'create',
        cardId: 'afterlight-crown',
        note: 'Floor catalog opened. Platform-native cards only.',
      },
    ],
    trades: [],
    reports: [],
    youId: YOU_ID,
  }
}
