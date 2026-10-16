/**
 * Virtual Universe — client presentation data only.
 * No API / DB / auth changes. Pure UI layer for the Entertainment OS.
 */

export type Rarity =
  | 'common'
  | 'rare'
  | 'epic'
  | 'legendary'
  | 'mythic'
  | 'cosmic'
  | 'infinity'

export type AssetKind =
  | 'movie'
  | 'show'
  | 'character'
  | 'world'
  | 'avatar'
  | 'badge'
  | 'relic'
  | 'game'
  | 'music'
  | 'collectible'
  | 'home'
  | 'vehicle'
  | 'fashion'
  | 'voice'
  | 'companion'
  | 'membership'
  | 'identity'
  | 'founder'
  | 'land'
  | 'tool'

export type EconomyAsset = {
  id: string
  title: string
  kind: AssetKind
  rarity: Rarity
  hue: number
  energy: number
  summary: string
  ability?: string
  owners: number
  fanScore: number
  demand: number
  influence: number
  emotional: number
  acquired: string
  history: string[]
}

export type Estate = {
  id: string
  title: string
  type: string
  hue: number
  visitors: string
  revenue: string
  events: number
  rarity: Rarity
  summary: string
}

export type MarketItem = {
  id: string
  title: string
  category: string
  rarity: Rarity
  hue: number
  energy: number
  tag: string
}

export type DropEvent = {
  id: string
  title: string
  subtitle: string
  endsIn: string
  rarity: Rarity
  hue: number
  supply: string
}

export type GalaxyNode = {
  id: string
  label: string
  kind: 'creator' | 'market' | 'city' | 'route' | 'cluster'
  x: number
  y: number
  href: string
}

export const RARITY_LABEL: Record<Rarity, string> = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
  mythic: 'Mythic',
  cosmic: 'Cosmic',
  infinity: 'Infinity',
}

export const VAULT = {
  balance: 128_440,
  assets: 47,
  energyFlow: '+2.4k / day',
  guardian: 'Lumen',
  status: 'Vault sealed · Signal private',
}

export const PASSPORT = {
  name: 'You',
  handle: '@signal',
  creatorRank: 'Studio Architect · III',
  communityRank: 'Collector · Aurora',
  reputation: 94,
  events: 18,
  worlds: 12,
  earned: 47,
  achievements: ['First Vault', 'Harbor Founder', 'Night Circuit', 'Mythic Drop'],
}

export const OWNED_ASSETS: EconomyAsset[] = [
  {
    id: 'a1',
    title: 'Afterlight Director Cut',
    kind: 'movie',
    rarity: 'legendary',
    hue: 280,
    energy: 4200,
    summary: 'Interactive premiere seat with branching endings.',
    ability: 'Unlock alternate finales',
    owners: 312,
    fanScore: 91,
    demand: 88,
    influence: 76,
    emotional: 94,
    acquired: '2026-03-12',
    history: ['Minted by Studio Harbor', 'Transferred to you', 'Premiered live'],
  },
  {
    id: 'a2',
    title: 'Neo Harbor Key',
    kind: 'world',
    rarity: 'cosmic',
    hue: 210,
    energy: 9800,
    summary: 'Permanent access to the living city that listens.',
    ability: 'Rewrite one district / week',
    owners: 48,
    fanScore: 97,
    demand: 95,
    influence: 90,
    emotional: 99,
    acquired: '2026-01-02',
    history: ['Founder mint', 'Bound to Digital Passport'],
  },
  {
    id: 'a3',
    title: 'Lumen Companion',
    kind: 'companion',
    rarity: 'mythic',
    hue: 200,
    energy: 6100,
    summary: 'AI vault guardian with soft-signal voice.',
    ability: 'Predictive vault insights',
    owners: 120,
    fanScore: 93,
    demand: 84,
    influence: 81,
    emotional: 96,
    acquired: '2026-02-18',
    history: ['Hatched in AI Lab', 'Awakened'],
  },
  {
    id: 'a4',
    title: 'Rain District Badge',
    kind: 'badge',
    rarity: 'epic',
    hue: 230,
    energy: 890,
    summary: 'Community fork recognition.',
    owners: 1402,
    fanScore: 72,
    demand: 61,
    influence: 55,
    emotional: 80,
    acquired: '2026-04-01',
    history: ['Earned via Bridge Cut'],
  },
  {
    id: 'a5',
    title: 'Driftline Arena Skin',
    kind: 'game',
    rarity: 'rare',
    hue: 190,
    energy: 540,
    summary: 'Neon chassis for multiplayer runs.',
    ability: 'Trail FX in arenas',
    owners: 2204,
    fanScore: 68,
    demand: 70,
    influence: 42,
    emotional: 64,
    acquired: '2026-05-09',
    history: ['Season drop claim'],
  },
  {
    id: 'a6',
    title: 'Soft Score Session',
    kind: 'music',
    rarity: 'epic',
    hue: 175,
    energy: 1100,
    summary: 'Adaptive album that scores your nights.',
    owners: 880,
    fanScore: 85,
    demand: 77,
    influence: 70,
    emotional: 92,
    acquired: '2026-05-20',
    history: ['Creator license', 'Personalized mix'],
  },
  {
    id: 'a7',
    title: 'Orbit Fashion Veil',
    kind: 'fashion',
    rarity: 'legendary',
    hue: 320,
    energy: 3300,
    summary: 'Holo-garment for identity rooms.',
    ability: 'Reactive lighting',
    owners: 210,
    fanScore: 79,
    demand: 82,
    influence: 66,
    emotional: 74,
    acquired: '2026-06-02',
    history: ['Limited atelier drop'],
  },
  {
    id: 'a8',
    title: 'Founder Signal Card',
    kind: 'founder',
    rarity: 'infinity',
    hue: 255,
    energy: 20000,
    summary: 'Irreducible identity of early OS presence.',
    ability: 'Priority season access',
    owners: 11,
    fanScore: 100,
    demand: 99,
    influence: 100,
    emotional: 100,
    acquired: '2025-11-11',
    history: ['Genesis mint', 'Never transferred'],
  },
]

export const COLLECTIBLES: EconomyAsset[] = [
  OWNED_ASSETS[1],
  OWNED_ASSETS[2],
  OWNED_ASSETS[7],
  {
    id: 'c1',
    title: 'Glass Empire Relic',
    kind: 'relic',
    rarity: 'mythic',
    hue: 250,
    energy: 7200,
    summary: 'Museum-grade shard from the first empire season.',
    owners: 64,
    fanScore: 90,
    demand: 93,
    influence: 88,
    emotional: 87,
    acquired: '—',
    history: ['Vault exhibition'],
  },
  {
    id: 'c2',
    title: 'Paper Crane Voice',
    kind: 'voice',
    rarity: 'legendary',
    hue: 40,
    energy: 2500,
    summary: 'Metamorphosis vocal pack for companions.',
    owners: 190,
    fanScore: 83,
    demand: 75,
    influence: 60,
    emotional: 91,
    acquired: '—',
    history: ['AI atelier'],
  },
]

export const ESTATES: Estate[] = [
  {
    id: 'e1',
    title: 'Harbor Studio Lot',
    type: 'Creator Studio',
    hue: 210,
    visitors: '1.2k / wk',
    revenue: '4.8k Ξ',
    events: 3,
    rarity: 'legendary',
    summary: 'Premiere editing floor with live audience seats.',
  },
  {
    id: 'e2',
    title: 'Null Garden Arena',
    type: 'Gaming Arena',
    hue: 145,
    visitors: '8.4k / wk',
    revenue: '12.1k Ξ',
    events: 11,
    rarity: 'cosmic',
    summary: 'Exploration circuit hosting co-op seasons.',
  },
  {
    id: 'e3',
    title: 'Quiet Concert Dome',
    type: 'Concert Hall',
    hue: 175,
    visitors: '3.1k / wk',
    revenue: '6.2k Ξ',
    events: 5,
    rarity: 'mythic',
    summary: 'Sound-reactive dome for Soft Score nights.',
  },
  {
    id: 'e4',
    title: 'Rain District Loft',
    type: 'Creator Room',
    hue: 230,
    visitors: '640 / wk',
    revenue: '1.1k Ξ',
    events: 2,
    rarity: 'epic',
    summary: 'Story fork lounge with community threads.',
  },
]

export const MARKET: MarketItem[] = [
  { id: 'm1', title: 'Neon Tribunal Seat', category: 'Movies', rarity: 'legendary', hue: 295, energy: 5600, tag: 'Season' },
  { id: 'm2', title: 'Echo Heist Blade', category: 'Items', rarity: 'epic', hue: 190, energy: 980, tag: 'Game' },
  { id: 'm3', title: 'Aya Chen Avatar', category: 'Avatars', rarity: 'rare', hue: 320, energy: 720, tag: 'Identity' },
  { id: 'm4', title: 'Orbital Quiet Land', category: 'Land', rarity: 'cosmic', hue: 255, energy: 15400, tag: 'Estate' },
  { id: 'm5', title: 'Story Branch Pack', category: 'Stories', rarity: 'epic', hue: 155, energy: 1400, tag: 'Creator' },
  { id: 'm6', title: 'AI Lab Toolkit', category: 'AI Tools', rarity: 'mythic', hue: 200, energy: 8900, tag: 'Studio' },
  { id: 'm7', title: 'Driftline Vehicle', category: 'Vehicles', rarity: 'legendary', hue: 210, energy: 4100, tag: 'Limited' },
  { id: 'm8', title: 'Signal Choir Pass', category: 'Music', rarity: 'rare', hue: 230, energy: 640, tag: 'Live' },
]

export const DROPS: DropEvent[] = [
  {
    id: 'd1',
    title: 'Aurora Season: Glass Keys',
    subtitle: 'Creator collaboration · Harbor × Nova',
    endsIn: '02:14:37',
    rarity: 'cosmic',
    hue: 255,
    supply: '250 remaining',
  },
  {
    id: 'd2',
    title: 'Mythic Companion Eggs',
    subtitle: 'AI-generated artifacts',
    endsIn: '18:02:11',
    rarity: 'mythic',
    hue: 300,
    supply: '80 remaining',
  },
  {
    id: 'd3',
    title: 'Founder Evening Membership',
    subtitle: 'Premium OS layer',
    endsIn: '4d 06h',
    rarity: 'infinity',
    hue: 200,
    supply: '11 remaining',
  },
]

export const INVESTMENTS = [
  { id: 'i1', title: 'Rising: Glass Empire Relics', insight: '+42% demand · 6h', href: '#collectibles' },
  { id: 'i2', title: 'Creator: Nova Ellison', insight: 'New quiet world signal', href: '#creator' },
  { id: 'i3', title: 'World: Neo Harbor lots', insight: 'Visitor spike · live events', href: '#estates' },
  { id: 'i4', title: 'Drop: Aurora Season', insight: 'Countdown active', href: '#drops' },
]

export const GALAXY: GalaxyNode[] = [
  { id: 'g1', label: 'Vault Core', kind: 'city', x: 50, y: 48, href: '#vault' },
  { id: 'g2', label: 'Market Cluster', kind: 'market', x: 72, y: 32, href: '#marketplace' },
  { id: 'g3', label: 'Harbor Planet', kind: 'creator', x: 28, y: 30, href: '#creator' },
  { id: 'g4', label: 'Arena Belt', kind: 'cluster', x: 78, y: 62, href: '#estates' },
  { id: 'g5', label: 'Drop Nebula', kind: 'route', x: 35, y: 68, href: '#drops' },
  { id: 'g6', label: 'Collective Ring', kind: 'cluster', x: 58, y: 22, href: '#social' },
  { id: 'g7', label: 'Passport Star', kind: 'city', x: 22, y: 55, href: '#passport' },
]

export const SOCIAL_SHOWCASES = [
  { id: 's1', name: 'Aya Chen', focus: 'Story forks', pieces: 28, hue: 190 },
  { id: 's2', name: 'Nova Ellison', focus: 'Quiet worlds', pieces: 41, hue: 320 },
  { id: 's3', name: 'Drift Collective', focus: 'Arena skins', pieces: 96, hue: 200 },
]

export const CREATOR_STUDIO = {
  brand: 'Your Signal Studio',
  fans: '12.4k',
  revenue: '38.2k Ξ',
  collections: 6,
  agents: 3,
  licenses: 14,
}

export const MARKET_CATEGORIES = [
  'Characters',
  'Movies',
  'Stories',
  'Music',
  'Avatars',
  'Items',
  'Land',
  'Vehicles',
  'AI Tools',
  'Creator Packs',
  'Limited Editions',
  'Season Drops',
] as const

export const ECONOMY_NAV = [
  { id: 'worlds', label: 'AR/VR Worlds' },
  { id: 'cards', label: 'NFT Cards' },
  { id: 'spatial-assets', label: 'Virtual Assets' },
  { id: 'vault', label: 'AI Vault' },
  { id: 'assets', label: 'Asset Universe' },
  { id: 'collectibles', label: 'Collectibles' },
  { id: 'estates', label: 'Real Estate' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'drops', label: 'Drops' },
  { id: 'value', label: 'Value Engine' },
  { id: 'passport', label: 'Passport' },
  { id: 'creator', label: 'Creator' },
  { id: 'energy', label: 'Energy' },
  { id: 'invest', label: 'Invest' },
  { id: 'map', label: 'Galaxy Map' },
  { id: 'social', label: 'Social' },
] as const
