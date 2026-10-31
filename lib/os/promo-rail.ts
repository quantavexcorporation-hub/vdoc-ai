export type FeatureSlide = {
  id: string
  eyebrow: string
  headline: string
  description: string
  cta: string
  href: string
  accent: string
}

export type AdSlot = {
  id: string
  sponsor: string
  badge: string
  headline: string
  body: string
  cta: string
  href: string
  accent: string
}

export const FEATURE_SLIDES: FeatureSlide[] = [
  {
    id: 'creator',
    eyebrow: 'AI Creator',
    headline: 'Speak. Enter. Shape.',
    description: 'Turn one prompt into movies, games, stories, and living worlds.',
    cta: 'Create now',
    href: '/converse',
    accent: '#67e8f9',
  },
  {
    id: 'cities',
    eyebrow: 'Virtual Cities',
    headline: 'Cities that rewrite',
    description: 'Enter adaptive urban worlds that listen to every choice you make.',
    cta: 'Enter city',
    href: '/universe?c=worlds',
    accent: '#a78bfa',
  },
  {
    id: 'cards',
    eyebrow: 'Cards',
    headline: 'Legendary. Epic. Rare.',
    description: 'Platform-native collectibles with holographic editions on this floor.',
    cta: 'Open Cards',
    href: '/cards',
    accent: '#34d399',
  },
  {
    id: 'economy',
    eyebrow: 'Virtual Universe',
    headline: 'Ownership is the plot',
    description: 'Collectibles, land, and living assets inside your digital vault.',
    cta: 'Open vault',
    href: '/economy',
    accent: '#fbbf24',
  },
  {
    id: 'quick',
    eyebrow: 'Quick Entertain',
    headline: 'Under a minute',
    description: 'AI shorts generated for the moment — hover to preview, enter to go deeper.',
    cta: 'Watch shorts',
    href: '/#quick-entertainment',
    accent: '#fb7185',
  },
]

export const SPOTLIGHT = {
  eyebrow: 'Limited drop',
  title: 'Neon Harbor Premiere',
  body: 'A live world rewrite tonight — streets rearrange around every presence.',
  cta: 'Enter premiere',
  href: '/universe?c=worlds',
}

export const AD_SLOTS: AdSlot[] = [
  {
    id: 'plus',
    sponsor: 'VDOC Plus',
    badge: 'Sponsored',
    headline: 'Unlock infinite creation',
    body: 'Priority generation, voice mode, and private world branches.',
    cta: 'Upgrade',
    href: '/intelligence',
    accent: '#67e8f9',
  },
  {
    id: 'cards-pass',
    sponsor: 'Cards',
    badge: 'Featured',
    headline: 'Floor collectibles',
    body: 'Legendary, Epic, and Rare cards — Lumen only, not a purchase.',
    cta: 'Open Cards',
    href: '/cards',
    accent: '#34d399',
  },
  {
    id: 'vault',
    sponsor: 'Virtual Universe',
    badge: 'New',
    headline: 'Founders land drop',
    body: 'Early parcels in Neo Harbor — own the block before it rewrites.',
    cta: 'Explore',
    href: '/economy',
    accent: '#fbbf24',
  },
  {
    id: 'partner',
    sponsor: 'Studio Partners',
    badge: 'Partner',
    headline: 'Co-author a series',
    body: 'Branch endings with featured creators and mint your cut.',
    cta: 'Join thread',
    href: '/#community',
    accent: '#a78bfa',
  },
  {
    id: 'intel',
    sponsor: 'Intelligence',
    badge: 'Need',
    headline: 'Tired of endless scroll?',
    body: 'Mood Match and Top Rated Only — pains catalogs never solved.',
    cta: 'Open Intelligence',
    href: '/intelligence',
    accent: '#67e8f9',
  },
]

export const FEATURE_AUTO_MS = 7000
export const AD_AUTO_MS = 6500
