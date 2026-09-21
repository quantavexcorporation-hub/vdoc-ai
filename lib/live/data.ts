export type LiveCategoryId =
  | 'premieres'
  | 'creators'
  | 'gaming'
  | 'stories'
  | 'ai'

export type LiveEventStatus = 'live' | 'upcoming' | 'community'

export type LiveEvent = {
  id: string
  title: string
  description: string
  category: LiveCategoryId
  host: string
  hostKind: 'human' | 'ai' | 'hybrid'
  viewers: string
  duration?: string
  tags: string[]
  hue: number
  status: LiveEventStatus
  startsAt?: string
  countdownLabel?: string
  video?: string
}

export type LiveCategory = {
  id: LiveCategoryId
  label: string
  mode: string
  summary: string
  points: string[]
  hue: number
}

export const LIVE_CATEGORIES: LiveCategory[] = [
  {
    id: 'premieres',
    label: 'Live Premieres',
    mode: 'Generated Live',
    summary: 'First-look cinema that rewrites as the room watches.',
    points: ['Movie launches', 'Series premieres', 'Exclusive first look'],
    hue: 280,
  },
  {
    id: 'creators',
    label: 'Creator Live',
    mode: 'Interactive Session',
    summary: 'Human artists in dialogue with responsive worlds.',
    points: ['Filmmakers', 'Musicians', 'Developers', 'Audience presence'],
    hue: 200,
  },
  {
    id: 'gaming',
    label: 'Live Gaming',
    mode: 'Real-Time Experience',
    summary: 'Tournaments and reveals where the field adapts mid-match.',
    points: ['Tournaments', 'Cloud showcase', 'Game reveals', 'Live commentary'],
    hue: 155,
  },
  {
    id: 'stories',
    label: 'Interactive Stories',
    mode: 'Branching Live',
    summary: 'Narratives that fork from every collective decision.',
    points: ['Audience votes', 'Character interaction', 'Community endings'],
    hue: 320,
  },
  {
    id: 'ai',
    label: 'AI Live Experiences',
    mode: 'Always Generating',
    summary: 'Hosts, concerts, debates, and worlds that never idle.',
    points: ['AI hosts', 'Concerts', 'Debates', 'Game masters', 'Evolving worlds'],
    hue: 230,
  },
]

export const FEATURED_LIVE: LiveEvent = {
  id: 'featured-harbor',
  title: 'Neo Harbor Midnight Protocol',
  description:
    'A city-scale premiere where streets rearrange to your presence. The skyline is co-authored — live — by everyone inside.',
  category: 'premieres',
  host: 'VDOC Atelier · Mira Sol',
  hostKind: 'hybrid',
  viewers: '84.2K',
  duration: '01:14:28',
  tags: ['Premiere', 'World', 'Interactive'],
  hue: 210,
  status: 'live',
  video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
}

export const LIVE_NOW: LiveEvent[] = [
  {
    id: 'ln-1',
    title: 'Signal Choir — Act II',
    description: 'Eight voices. One frequency. The room decides the next measure.',
    category: 'premieres',
    host: 'Archive Hearts',
    hostKind: 'human',
    viewers: '31.4K',
    duration: '00:42:11',
    tags: ['Series', 'First look'],
    hue: 255,
    status: 'live',
  },
  {
    id: 'ln-2',
    title: 'Orbital Quiet Listening Room',
    description: 'An adaptive score that thins when you breathe slower.',
    category: 'creators',
    host: 'Nova Ellison',
    hostKind: 'human',
    viewers: '12.8K',
    duration: '02:05:03',
    tags: ['Music', 'Presence'],
    hue: 175,
    status: 'live',
  },
  {
    id: 'ln-3',
    title: 'Driftline Arena Finals',
    description: 'Tracks generate under tires. Rivals learn your tells in real time.',
    category: 'gaming',
    host: 'Arena Control',
    hostKind: 'hybrid',
    viewers: '56.1K',
    duration: '01:33:40',
    tags: ['Esports', 'Cloud'],
    hue: 195,
    status: 'live',
  },
  {
    id: 'ln-4',
    title: 'The Listening Forest Vote',
    description: 'Paths rearrange when the room hesitates. Cast the next turn.',
    category: 'stories',
    host: 'Rain District Collective',
    hostKind: 'hybrid',
    viewers: '19.6K',
    duration: '00:58:22',
    tags: ['Vote', 'Branch'],
    hue: 145,
    status: 'live',
  },
  {
    id: 'ln-5',
    title: 'Aether Debate — Night Circuit',
    description: 'Two AI hosts argue futures. The audience steers the thesis.',
    category: 'ai',
    host: 'Aether',
    hostKind: 'ai',
    viewers: '44.0K',
    duration: '00:27:15',
    tags: ['Debate', 'AI host'],
    hue: 265,
    status: 'live',
  },
  {
    id: 'ln-6',
    title: 'Glass Empire Ink Session',
    description: 'Panels expand into motion when you linger — then snap back.',
    category: 'creators',
    host: 'Kenji Vale',
    hostKind: 'human',
    viewers: '8.2K',
    duration: '01:02:49',
    tags: ['Comics', 'Studio'],
    hue: 320,
    status: 'live',
  },
]

export const UPCOMING: LiveEvent[] = [
  {
    id: 'up-1',
    title: 'Afterlight Global Premiere',
    description: 'Noir city premiere with live ending forks.',
    category: 'premieres',
    host: 'Harbor Protocol',
    hostKind: 'hybrid',
    viewers: '—',
    tags: ['Cinema'],
    hue: 280,
    status: 'upcoming',
    startsAt: 'Today · 21:00',
    countdownLabel: 'in 4h 12m',
  },
  {
    id: 'up-2',
    title: 'Null Garden Co-op Reveal',
    description: 'Exploration realm showcase with live commentary.',
    category: 'gaming',
    host: 'Pulse Cartography',
    hostKind: 'human',
    viewers: '—',
    tags: ['Reveal'],
    hue: 160,
    status: 'upcoming',
    startsAt: 'Tomorrow · 18:30',
    countdownLabel: 'in 1d 1h',
  },
  {
    id: 'up-3',
    title: 'AI Concert: Filament Score',
    description: 'A generated orchestra that follows the crowd’s pulse.',
    category: 'ai',
    host: 'Filament',
    hostKind: 'ai',
    viewers: '—',
    tags: ['Concert'],
    hue: 230,
    status: 'upcoming',
    startsAt: 'Fri · 20:00',
    countdownLabel: 'in 2d 3h',
  },
  {
    id: 'up-4',
    title: 'Door That Remembers — Chapter Zero',
    description: 'Community chooses the first three doors together.',
    category: 'stories',
    host: 'Story Atelier',
    hostKind: 'hybrid',
    viewers: '—',
    tags: ['Interactive'],
    hue: 300,
    status: 'upcoming',
    startsAt: 'Sat · 16:00',
    countdownLabel: 'in 3d',
  },
]

export const COMMUNITY_EVENTS: LiveEvent[] = [
  {
    id: 'cm-1',
    title: 'Harbor Movie Night',
    description: 'Watch party with live plot annotations.',
    category: 'premieres',
    host: 'Orbit Collective',
    hostKind: 'human',
    viewers: '2.4K',
    tags: ['Watch party'],
    hue: 215,
    status: 'community',
  },
  {
    id: 'cm-2',
    title: 'Creator Q&A · Soft Signal',
    description: 'Ask the makers shaping tonight’s endings.',
    category: 'creators',
    host: 'Aya Chen',
    hostKind: 'human',
    viewers: '1.1K',
    tags: ['Q&A'],
    hue: 190,
    status: 'community',
  },
  {
    id: 'cm-3',
    title: 'Fan Vote: Bridge Cut',
    description: 'Pick the ending that becomes canonical.',
    category: 'stories',
    host: 'Rain District',
    hostKind: 'hybrid',
    viewers: '6.8K',
    tags: ['Voting'],
    hue: 340,
    status: 'community',
  },
  {
    id: 'cm-4',
    title: 'Live Challenge · Echo Heist',
    description: 'Stealth run scored by the room’s silence.',
    category: 'gaming',
    host: 'Community Arena',
    hostKind: 'human',
    viewers: '3.9K',
    tags: ['Challenge'],
    hue: 185,
    status: 'community',
  },
]

export type QuickShort = {
  id: string
  title: string
  tag: string
  duration: string
  hue: number
  video?: string
}

/** AI short-form entertainment — under a minute, generated for quick play */
export const QUICK_SHORTS: QuickShort[] = [
  {
    id: 'qs-1',
    title: 'Paper Cranes → Birds',
    tag: 'Metamorphosis',
    duration: '0:12',
    hue: 25,
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 'qs-2',
    title: 'Neon Blink Cut',
    tag: 'VFX',
    duration: '0:18',
    hue: 280,
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 'qs-3',
    title: 'Harbor Micro Dawn',
    tag: 'World',
    duration: '0:24',
    hue: 210,
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
  {
    id: 'qs-4',
    title: 'Soft Score Pulse',
    tag: 'Music',
    duration: '0:31',
    hue: 175,
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  {
    id: 'qs-5',
    title: 'Door in One Breath',
    tag: 'Story',
    duration: '0:15',
    hue: 320,
    video: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 'qs-6',
    title: 'Driftline Flash',
    tag: 'Game',
    duration: '0:22',
    hue: 195,
  },
  {
    id: 'qs-7',
    title: 'Glass Panel Snap',
    tag: 'Comic',
    duration: '0:09',
    hue: 340,
  },
  {
    id: 'qs-8',
    title: 'Orbital Quiet Loop',
    tag: 'Ambient',
    duration: '0:45',
    hue: 230,
  },
]

export const CATEGORY_LABEL: Record<LiveCategoryId, string> = {
  premieres: 'Live Premieres',
  creators: 'Creator Live',
  gaming: 'Live Gaming',
  stories: 'Interactive Stories',
  ai: 'AI Experiences',
}
