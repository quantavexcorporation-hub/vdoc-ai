import {
  Clapperboard,
  Film,
  Gamepad2,
  BookOpen,
  BookMarked,
  Tv,
  Globe,
  Zap,
  Sparkles,
  Wand2,
  Gem,
  TrendingUp,
  Radio,
  Mic2,
  Heart,
  Star,
  Play,
  Moon,
  ListChecks,
  Calendar,
  Aperture,
  Settings,
  type LucideIcon,
} from 'lucide-react'
import type { UniverseCategory } from '@/lib/universe/data'

export type RailItem = {
  id: string
  icon: LucideIcon
  label: string
  href: string
  hue: number
  /** Soft chip — LIVE / AI / NEW */
  badge?: string
  pulse?: boolean
  match?: (ctx: {
    pathname: string
    category: UniverseCategory | null
    hash: string
  }) => boolean
}

export type RailGroup = {
  id: string
  label: string
  items: RailItem[]
}

/** VDOC rail — futuristic OS surfaces mapped to real routes/anchors */
export const entertainmentNavGroups: RailGroup[] = [
  {
    id: 'vault',
    label: 'Virtual Worlds',
    items: [
      {
        id: 'economy',
        icon: Gem,
        label: 'Virtual Universe',
        href: '/economy',
        hue: 200,
        badge: 'OWN',
        match: ({ pathname }) => pathname === '/economy',
      },
      {
        id: 'worlds',
        icon: Globe,
        label: 'Virtual Cities',
        href: '/universe?c=worlds',
        hue: 255,
        badge: 'ENTER',
        match: ({ pathname, category }) =>
          pathname === '/universe' && category === 'worlds',
      },
      {
        id: 'live',
        icon: Zap,
        label: 'PLAYVERSE',
        href: '/live',
        hue: 210,
        badge: 'LIVE',
        pulse: true,
        match: ({ pathname }) => pathname === '/live',
      },
    ],
  },
  {
    id: 'universe',
    label: 'Core',
    items: [
      {
        id: 'movies',
        icon: Clapperboard,
        label: 'Movies',
        href: '/universe?c=movies',
        hue: 280,
        match: ({ pathname, category }) =>
          pathname === '/universe' && (category === 'movies' || !category),
      },
      {
        id: 'series',
        icon: Film,
        label: 'Series',
        href: '/universe?c=series',
        hue: 230,
        match: ({ pathname, category }) =>
          pathname === '/universe' && category === 'series',
      },
      {
        id: 'games',
        icon: Gamepad2,
        label: 'Games',
        href: '/universe?c=games',
        hue: 200,
        match: ({ pathname, category }) =>
          pathname === '/universe' && category === 'games',
      },
      {
        id: 'stories',
        icon: BookOpen,
        label: 'Stories',
        href: '/universe?c=stories',
        hue: 155,
        match: ({ pathname, category }) =>
          pathname === '/universe' && category === 'stories',
      },
      {
        id: 'comics',
        icon: BookMarked,
        label: 'Comics',
        href: '/universe?c=comics',
        hue: 320,
        match: ({ pathname, category }) =>
          pathname === '/universe' && category === 'comics',
      },
      {
        id: 'shows',
        icon: Tv,
        label: 'Shows',
        href: '/universe?c=shows',
        hue: 18,
        match: ({ pathname, category }) =>
          pathname === '/universe' &&
          (category === 'shows' || (category as string) === 'music'),
      },
    ],
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    items: [
      {
        id: 'mood-match',
        icon: Heart,
        label: 'Mood Match',
        href: '/intelligence#mood-match',
        hue: 350,
        badge: 'FEEL',
        match: ({ pathname, hash }) =>
          pathname === '/intelligence' && hash === 'mood-match',
      },
      {
        id: 'top-rated',
        icon: Star,
        label: 'Top Rated Only',
        href: '/intelligence#top-rated',
        hue: 200,
        badge: 'PEAK',
        match: ({ pathname, hash }) =>
          pathname === '/intelligence' && hash === 'top-rated',
      },
      {
        id: 'continue-watch',
        icon: Play,
        label: 'Continue Watching',
        href: '/intelligence#continue-watch',
        hue: 220,
        badge: 'RESUME',
        match: ({ pathname, hash }) =>
          pathname === '/intelligence' && hash === 'continue-watch',
      },
      {
        id: 'favourite-upcoming',
        icon: Calendar,
        label: 'Favourite Upcoming',
        href: '/intelligence#favourite-upcoming',
        hue: 350,
        badge: 'SOON',
        match: ({ pathname, hash }) =>
          pathname === '/intelligence' && hash === 'favourite-upcoming',
      },
      {
        id: 'evening-intent',
        icon: Moon,
        label: 'Evening Intent',
        href: '/intelligence#evening-intent',
        hue: 240,
        badge: 'NIGHT',
        match: ({ pathname, hash }) =>
          pathname === '/intelligence' && hash === 'evening-intent',
      },
      {
        id: 'unfinished',
        icon: ListChecks,
        label: 'Unfinished',
        href: '/intelligence#unfinished',
        hue: 45,
        badge: 'CLEAR',
        match: ({ pathname, hash }) =>
          pathname === '/intelligence' && hash === 'unfinished',
      },
    ],
  },
  {
    id: 'pulse',
    label: 'Pulse',
    items: [
      {
        id: 'trending',
        icon: TrendingUp,
        label: 'Trending Now',
        href: '/#trending',
        hue: 15,
        badge: 'HOT',
        pulse: true,
        match: ({ pathname, hash }) => pathname === '/' && hash === 'trending',
      },
      {
        id: 'recent',
        icon: Radio,
        label: 'Just Release',
        href: '/#recent',
        hue: 160,
        badge: 'NEW',
        match: ({ pathname, hash }) => pathname === '/' && hash === 'recent',
      },
      {
        id: 'teaser-trailer',
        icon: Clapperboard,
        label: 'Teaser & Trailer',
        href: '/#teaser-trailer',
        hue: 280,
        badge: 'PREVIEW',
        match: ({ pathname, hash }) =>
          pathname === '/' && hash === 'teaser-trailer',
      },
    ],
  },
  {
    id: 'create',
    label: 'Create',
    items: [
      {
        id: 'creator',
        icon: Wand2,
        label: 'AI Creator',
        href: '/converse',
        hue: 265,
        badge: 'MAKE',
      },
      {
        id: 'creators',
        icon: Radio,
        label: 'Creator Spotlight',
        href: '/#creators',
        hue: 280,
        match: ({ pathname, hash }) => pathname === '/' && hash === 'creators',
      },
      {
        id: 'voice',
        icon: Mic2,
        label: 'Voice Converse',
        href: '/converse',
        hue: 175,
      },
      {
        id: 'quick',
        icon: Sparkles,
        label: 'Quick Entertain',
        href: '/#quick-entertainment',
        hue: 25,
        match: ({ pathname, hash }) =>
          pathname === '/' && hash === 'quick-entertainment',
      },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    items: [
      {
        id: 'video-genesis',
        icon: Aperture,
        label: 'Video Genesis',
        href: '/video-genesis',
        hue: 190,
        badge: 'STUDIO',
        pulse: true,
        match: ({ pathname }) =>
          pathname === '/video-genesis' || pathname.startsWith('/video-genesis'),
      },
      {
        id: 'settings',
        icon: Settings,
        label: 'Settings',
        href: '/settings',
        hue: 220,
        match: ({ pathname }) => pathname === '/settings' || pathname.startsWith('/settings/'),
      },
      {
        id: 'upgrade',
        icon: Sparkles,
        label: 'Upgrade',
        href: '/upgrade',
        hue: 45,
        badge: 'PLUS',
        pulse: true,
        match: ({ pathname }) => pathname === '/upgrade',
      },
    ],
  },
]

export const entertainmentNav: RailItem[] = entertainmentNavGroups.flatMap(
  (g) => g.items
)
