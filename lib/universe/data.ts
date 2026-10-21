export type UniverseCategory =
  | 'movies'
  | 'series'
  | 'games'
  | 'stories'
  | 'comics'
  | 'shorts'
  | 'music'
  | 'worlds'

export type MediaItem = {
  id: string
  title: string
  subtitle: string
  category: UniverseCategory
  image: string
  /** Owned poster hue — preferred over image for catalog cards */
  hue?: number
  preview?: string
  duration?: string
  live?: boolean
  viewers?: string
  genre: string
  author?: string
  rating?: number
  /** Public sample file. Absent titles are stills. */
  video?: string
  /** Opens the signature choice story instead of a player. */
  story?: boolean
}

export type CategoryMeta = {
  id: UniverseCategory
  label: string
  tagline: string
  featured: {
    title: string
    description: string
    image: string
    video?: string
    liveLabel: string
    cta: string
  }
  genres: string[]
  status: {
    generating: number
    online: string
    queue: string
  }
}

/** Lightweight featured poster — one SVG, not per-card payloads */
function frame(hue: number, w = 1600, h = 900) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="g" cx="28%" cy="22%" r="72%">
      <stop offset="0%" stop-color="hsl(${hue} 72% 48%)" stop-opacity="0.85"/>
      <stop offset="55%" stop-color="hsl(${(hue + 40) % 360} 55% 28%)" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="hsl(260 40% 6%)"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <circle cx="${w * 0.78}" cy="${h * 0.18}" r="${w * 0.18}" fill="hsl(${(hue + 180) % 360} 80% 70%)" opacity="0.12"/>
</svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const HUE: Record<UniverseCategory, number> = {
  movies: 280,
  series: 230,
  games: 200,
  stories: 155,
  comics: 320,
  shorts: 25,
  music: 175,
  worlds: 210,
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'movies',
    label: 'AI Movies',
    tagline: 'Feature films that rewrite on every watch',
    featured: {
      title: 'Afterlight Protocol',
      description:
        'A noir city that remembers every ending you abandoned. Tonight the harbor is rewriting itself around your cursor.',
      image: frame(280),
      video:
        '/media/flower.mp4',
      liveLabel: 'Premiere',
      cta: 'Play instantly',
    },
    genres: ['Noir', 'Sci-Fi', 'Romance', 'Thriller', 'Heist', 'Dreamcore'],
    status: { generating: 1284, online: '2.1M', queue: '42ms' },
  },
  {
    id: 'series',
    label: 'AI Series',
    tagline: 'Episodes that branch with your attention',
    featured: {
      title: 'Signal Choir — Season 3',
      description:
        'Eight voices. One frequency. Each episode adapts to who is listening in the room.',
      image: frame(230),
      video:
        '/media/flower.mp4',
      liveLabel: 'Episode drop',
      cta: 'Start episode',
    },
    genres: ['Drama', 'Anthology', 'Mystery', 'Slice', 'Cyber'],
    status: { generating: 892, online: '1.4M', queue: '38ms' },
  },
  {
    id: 'games',
    label: 'AI Games',
    tagline: 'Worlds that play back',
    featured: {
      title: 'Driftline Arena',
      description:
        'A competitive realm where tracks generate under your tires and rivals learn your tells.',
      image: frame(200),
      video:
        '/media/flower.mp4',
      liveLabel: 'Matchmaking',
      cta: 'Enter match',
    },
    genres: ['Arena', 'RPG', 'Puzzle', 'Co-op', 'Roguelike'],
    status: { generating: 2103, online: '3.8M', queue: '29ms' },
  },
  {
    id: 'stories',
    label: 'Interactive Stories',
    tagline: 'Choose, branch, remember',
    featured: {
      title: 'The Listening Forest',
      description:
        'Paths rearrange when you hesitate. The forest keeps a quiet ledger of every word you never said.',
      image: frame(155),
      liveLabel: 'Mid-chapter',
      cta: 'Open chapter',
    },
    genres: ['Fantasy', 'Horror', 'Romance', 'Mystery', 'Meta'],
    status: { generating: 640, online: '980K', queue: '51ms' },
  },
  {
    id: 'comics',
    label: 'Comics',
    tagline: 'Panels that animate on gaze',
    featured: {
      title: 'Glass Empire Vol. 7',
      description:
        'Ink that breathes. Panels expand into motion when you linger — then snap back to stillness.',
      image: frame(320),
      liveLabel: 'New issue',
      cta: 'Read now',
    },
    genres: ['Noir', 'Manga', 'Super', 'Slice', 'Experimental'],
    status: { generating: 411, online: '620K', queue: '44ms' },
  },
  {
    id: 'shorts',
    label: 'Shorts',
    tagline: 'Vertical sparks under 60 seconds',
    featured: {
      title: 'Paper Cranes → Birds',
      description:
        'A twelve-second metamorphosis loop that never lands the same way twice.',
      image: frame(25),
      video:
        '/media/flower.mp4',
      liveLabel: 'Loop',
      cta: 'Play short',
    },
    genres: ['Loop', 'Comedy', 'VFX', 'ASMR', 'Microplot'],
    status: { generating: 5021, online: '5.2M', queue: '22ms' },
  },
  {
    id: 'music',
    label: 'Music',
    tagline: 'Scores that follow your pulse',
    featured: {
      title: 'Orbital Quiet',
      description:
        'An adaptive score that thins when you breathe slower and blooms when the room gets loud.',
      image: frame(175),
      liveLabel: 'Listening room',
      cta: 'Listen live',
    },
    genres: ['Ambient', 'Synth', 'Score', 'Vocal', 'Glitch'],
    status: { generating: 733, online: '1.1M', queue: '33ms' },
  },
  {
    id: 'worlds',
    label: 'Virtual Cities',
    tagline: 'Persistent places with soft physics',
    featured: {
      title: 'Neo Harbor',
      description:
        'Streets rearrange. Stories collide. Your presence is the plot — and the skyline knows your name.',
      image: frame(210),
      video:
        '/media/flower.mp4',
      liveLabel: 'World open',
      cta: 'Enter world',
    },
    genres: ['City', 'Nature', 'Orbit', 'Dream', 'Social'],
    status: { generating: 356, online: '4.6M', queue: '27ms' },
  },
]

const TITLES: Record<UniverseCategory, string[]> = {
  movies: [
    'Static Bloom',
    'Harbor Protocol',
    'Soft Apocalypse',
    'Neon Tribunal',
    'Velvet Circuit',
    'Midnight Grammar',
    'Ash Opera',
    'Lumen Heist',
    'Quiet Voltage',
    'Echo Meridian',
  ],
  series: [
    'Rain District',
    'Mirror Season',
    'Low Orbit Letters',
    'The Soft War',
    'Candle Frequency',
    'Second Sky',
    'Archive Hearts',
    'Night Shift Gods',
  ],
  games: [
    'Glass Empire',
    'Tidefold',
    'Pulse Cartography',
    'Null Garden',
    'Co-op Realm',
    'Shard Relay',
    'Fog Circuit',
    'Astra Duet',
  ],
  stories: [
    'Door That Remembers',
    'Chapter Zero',
    'Ink & Ozone',
    'The Edit',
    'Sideways Ending',
    'Unsaid Atlas',
    'Forked Moon',
    'Quiet Choice',
  ],
  comics: [
    'Panel Rain',
    'Ink Orbit',
    'Frame Zero',
    'Speech Bubble City',
    'Gutter Light',
    'Halftone Dreams',
    'Capillary',
    'Bleed Edge',
  ],
  shorts: [
    'Crane Loop',
    '60 Frames',
    'Blink Cut',
    'Pocket Epic',
    'Micro Dawn',
    'Snap Orbit',
    'One Breath',
    'Vertical Myth',
  ],
  music: [
    'Filament Score',
    'Soft Engine',
    'Chorus Void',
    'Pulse Quilt',
    'Amber Delay',
    'Skyline Hum',
    'Glass Percussion',
    'Night Bandwidth',
  ],
  worlds: [
    'Orbital Quiet',
    'Moss Terminal',
    'Mirror Bay',
    'Cloud Atelier',
    'Deep Plaza',
    'Aurora Dock',
    'Silent Metro',
    'Ember Commons',
  ],
}

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

export function buildCatalog(category: UniverseCategory, count = 48): MediaItem[] {
  const meta = CATEGORIES.find((c) => c.id === category)!
  const titles = TITLES[category]
  const baseHue = HUE[category]
  const items: MediaItem[] = []
  for (let i = 0; i < count; i++) {
    const title = titles[i % titles.length]
    const seed = hash(`${category}-${i}-${title}`)
    const genre = meta.genres[seed % meta.genres.length]
    const hue = (baseHue + (seed % 80) - 20 + 360) % 360
    const signature = category === 'stories' && i === 0
    const video = !signature && i === 0 ? meta.featured.video : undefined
    items.push({
      id: `${category}-${i}`,
      title: signature
        ? 'The Listening Forest'
        : i < titles.length
          ? title
          : `${title} ${Math.floor(i / titles.length) + 1}`,
      subtitle: signature
        ? 'Choose a path · four endings'
        : video
          ? `${genre} · Sample picture`
          : `${genre} · On the shelf`,
      category,
      image: '',
      hue,
      video,
      story: signature || undefined,
      duration:
        category === 'shorts'
          ? `0:${String(12 + (seed % 40)).padStart(2, '0')}`
          : category === 'music'
            ? `${3 + (seed % 5)}:${String(seed % 60).padStart(2, '0')}`
            : category === 'movies'
              ? `${90 + (seed % 40)} min`
              : undefined,
      live: seed % 7 === 0,
      viewers: seed % 5 === 0 ? `${(seed % 90) + 10}K` : undefined,
      genre,
      author: ['Aya', 'Noah', 'Mira', 'Kenji', 'Sol'][seed % 5],
      rating: 3.8 + ((seed % 20) / 20) * 1.2,
    })
  }
  return items
}

export function sliceRails(items: MediaItem[]) {
  return {
    trending: items.slice(0, 10),
    recent: items.slice(4, 14),
    recommended: items.slice(8, 18),
    community: items.slice(12, 22),
  }
}
