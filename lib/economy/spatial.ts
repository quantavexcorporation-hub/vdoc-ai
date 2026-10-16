export type SpatialMode = 'ar' | 'vr'

export type NftCardKind =
  | 'signal'
  | 'relic'
  | 'key'
  | 'companion'
  | 'deed'
  | 'pass'

export type NftCard = {
  id: string
  kind: NftCardKind
  title: string
  edition: string
  supply: string
  trait: string
  hue: number
}

export type VirtualAsset = {
  id: string
  title: string
  slot: string
  detail: string
  hue: number
}

export type SpatialWorld = {
  id: string
  name: string
  district: string
  line: string
  ar: string
  vr: string
  presence: string
  hue: number
  accent: string
  cards: NftCard[]
  assets: VirtualAsset[]
}

export const CARD_KIND_LABEL: Record<NftCardKind, string> = {
  signal: 'Signal Card',
  relic: 'Relic Plaque',
  key: 'World Key',
  companion: 'Companion Shard',
  deed: 'Land Deed',
  pass: 'Premiere Pass',
}

export const SPATIAL_WORLDS: SpatialWorld[] = [
  {
    id: 'harbor',
    name: 'Neo Harbor',
    district: 'Night city',
    line: 'Streets rewrite around whoever holds the key.',
    ar: 'Pin the harbor over your room. Neon lanes lock to the floor.',
    vr: 'Step inside the pier. Rain, boats, and premiere light fill the chamber.',
    presence: '12.4k inside',
    hue: 198,
    accent: '#67e8f9',
    cards: [
      {
        id: 'h-key',
        kind: 'key',
        title: 'Harbor Founder Key',
        edition: 'Genesis · 048',
        supply: '48',
        trait: 'Rewrite one district each week',
        hue: 198,
      },
      {
        id: 'h-pass',
        kind: 'pass',
        title: 'Pier Premiere Pass',
        edition: 'Tonight · Row A',
        supply: '220',
        trait: 'Front-row seat that follows you',
        hue: 42,
      },
      {
        id: 'h-signal',
        kind: 'signal',
        title: 'Tide Signal',
        edition: 'Live · 1/1 scan',
        supply: '1,200',
        trait: 'Broadcast your presence on the water',
        hue: 188,
      },
    ],
    assets: [
      { id: 'h1', title: 'Pier Coat', slot: 'Wearable', detail: 'Reacts to harbor rain', hue: 198 },
      { id: 'h2', title: 'Lot 7', slot: 'Land', detail: 'Studio parcel on the east quay', hue: 210 },
      { id: 'h3', title: 'Skiff', slot: 'Vehicle', detail: 'Silent boat bound to your key', hue: 175 },
      { id: 'h4', title: 'Night Score', slot: 'Sound', detail: 'City theme that follows your route', hue: 220 },
    ],
  },
  {
    id: 'rain',
    name: 'Rain District',
    district: 'Story noir',
    line: 'Every ending is a card you can hand to someone else.',
    ar: 'Glass panes appear on your walls. Forks play as overlays.',
    vr: 'Walk the bridge. The last light chooses with you.',
    presence: '8.1k inside',
    hue: 230,
    accent: '#93c5fd',
    cards: [
      {
        id: 'r-relic',
        kind: 'relic',
        title: 'Bridge Cut Plaque',
        edition: 'Chapter 7',
        supply: '312',
        trait: 'Unlock the midnight ending',
        hue: 230,
      },
      {
        id: 'r-comp',
        kind: 'companion',
        title: 'Listener Shard',
        edition: 'Voice · soft',
        supply: '90',
        trait: 'Narrates choices in your ear',
        hue: 260,
      },
      {
        id: 'r-deed',
        kind: 'deed',
        title: 'Loft Deed',
        edition: 'Block C',
        supply: '16',
        trait: 'Host a fork lounge',
        hue: 215,
      },
    ],
    assets: [
      { id: 'r1', title: 'Ink Veil', slot: 'Wearable', detail: 'Coat that darkens in rain scenes', hue: 230 },
      { id: 'r2', title: 'Bridge Loft', slot: 'Land', detail: 'Story room above the cut', hue: 250 },
      { id: 'r3', title: 'Last Light', slot: 'Relic', detail: 'Held object that changes the ending', hue: 40 },
      { id: 'r4', title: 'Whisper Mic', slot: 'Tool', detail: 'Record a branch others can play', hue: 200 },
    ],
  },
  {
    id: 'glass',
    name: 'Glass Empire',
    district: 'Crystal court',
    line: 'A palace you wear, not a park you queue for.',
    ar: 'Empire shards float in your space. Court light tracks your hands.',
    vr: 'The hall scales to you. Thrones, glass, and a living court.',
    presence: '4.6k inside',
    hue: 280,
    accent: '#c4b5fd',
    cards: [
      {
        id: 'g-relic',
        kind: 'relic',
        title: 'Empire Shard',
        edition: 'Court I',
        supply: '64',
        trait: 'Museum piece that still votes',
        hue: 280,
      },
      {
        id: 'g-pass',
        kind: 'pass',
        title: 'Tribunal Seat',
        edition: 'Season glass',
        supply: '120',
        trait: 'A seat that remembers your rulings',
        hue: 300,
      },
      {
        id: 'g-signal',
        kind: 'signal',
        title: 'Crown Frequency',
        edition: 'Aura',
        supply: '400',
        trait: 'Your outline becomes court light',
        hue: 265,
      },
    ],
    assets: [
      { id: 'g1', title: 'Glass Mantle', slot: 'Wearable', detail: 'Refracts whoever looks at you', hue: 280 },
      { id: 'g2', title: 'North Spire', slot: 'Land', detail: 'Private hall in the empire', hue: 290 },
      { id: 'g3', title: 'Verdict Blade', slot: 'Item', detail: 'Ceremony object, not a weapon skin', hue: 310 },
      { id: 'g4', title: 'Court Chorus', slot: 'Sound', detail: 'Choir that answers your name', hue: 250 },
    ],
  },
  {
    id: 'garden',
    name: 'Null Garden',
    district: 'Living wild',
    line: 'The garden grows from what you collect.',
    ar: 'Vines map onto your desk. Creatures perch on real objects.',
    vr: 'A biome you can walk. Paths open when a card is near.',
    presence: '6.9k inside',
    hue: 145,
    accent: '#6ee7b7',
    cards: [
      {
        id: 'n-comp',
        kind: 'companion',
        title: 'Garden Warden',
        edition: 'Hatched',
        supply: '120',
        trait: 'Leads you to unopened paths',
        hue: 150,
      },
      {
        id: 'n-deed',
        kind: 'deed',
        title: 'Canopy Plot',
        edition: 'Acre 3',
        supply: '32',
        trait: 'Land that blooms from your collection',
        hue: 130,
      },
      {
        id: 'n-key',
        kind: 'key',
        title: 'Root Key',
        edition: 'Wild',
        supply: '200',
        trait: 'Opens a door that was not there',
        hue: 165,
      },
    ],
    assets: [
      { id: 'n1', title: 'Moss Cloak', slot: 'Wearable', detail: 'Camouflage inside the garden', hue: 145 },
      { id: 'n2', title: 'Canopy Plot', slot: 'Land', detail: 'A living acre tied to your deed', hue: 135 },
      { id: 'n3', title: 'Seed Drone', slot: 'Companion', detail: 'Scouts clearings ahead of you', hue: 160 },
      { id: 'n4', title: 'Dawn Loop', slot: 'Sound', detail: 'Biome score that shifts with light', hue: 80 },
    ],
  },
]
