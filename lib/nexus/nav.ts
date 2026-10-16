import {
  Home,
  Lightbulb,
  Wand2,
  BookOpen,
  Users,
  Globe,
  Film,
  Image,
  Headphones,
  Music,
  Radio,
  Bot,
  FolderKanban,
  Box,
  ChartNoAxesCombined,
  Send,
  LineChart,
  Coins,
  Wallet,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export type NexusViewId =
  | 'home'
  | 'idea-lab'
  | 'create'
  | 'stories'
  | 'characters'
  | 'worlds'
  | 'video'
  | 'image'
  | 'audio'
  | 'music'
  | 'live-production'
  | 'ai-agents'
  | 'projects'
  | 'assets'
  | 'audience'
  | 'distribution'
  | 'analytics'
  | 'creative-economy'
  | 'v-fi'
  | 'settings'

export type NexusNavItem = {
  id: NexusViewId
  label: string
  icon: LucideIcon
  /** Primary surfaces shown by default; others via More */
  primary?: boolean
}

export type NexusNavGroup = {
  id: string
  label: string
  items: NexusNavItem[]
}

/** Progressive disclosure — primary items first; rest under More */
export const NEXUS_NAV: NexusNavGroup[] = [
  {
    id: 'create',
    label: 'Create',
    items: [
      { id: 'home', label: 'Home', icon: Home, primary: true },
      { id: 'idea-lab', label: 'Idea Lab', icon: Lightbulb, primary: true },
      { id: 'create', label: 'Create', icon: Wand2, primary: true },
      { id: 'stories', label: 'Stories', icon: BookOpen, primary: true },
      { id: 'characters', label: 'Characters', icon: Users, primary: true },
      { id: 'worlds', label: 'Worlds', icon: Globe, primary: true },
    ],
  },
  {
    id: 'produce',
    label: 'Produce',
    items: [
      { id: 'video', label: 'Video', icon: Film, primary: true },
      { id: 'image', label: 'Image', icon: Image },
      { id: 'audio', label: 'Audio', icon: Headphones },
      { id: 'music', label: 'Music', icon: Music },
      { id: 'live-production', label: 'Live Production', icon: Radio },
    ],
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    items: [
      { id: 'ai-agents', label: 'AI Agents', icon: Bot, primary: true },
      { id: 'audience', label: 'Audience Intelligence', icon: ChartNoAxesCombined },
      { id: 'analytics', label: 'Analytics', icon: LineChart },
    ],
  },
  {
    id: 'library',
    label: 'Library',
    items: [
      { id: 'projects', label: 'Projects', icon: FolderKanban, primary: true },
      { id: 'assets', label: 'Assets', icon: Box, primary: true },
    ],
  },
  {
    id: 'grow',
    label: 'Grow',
    items: [
      { id: 'distribution', label: 'Distribution', icon: Send },
      { id: 'creative-economy', label: 'Creative Economy', icon: Coins },
      { id: 'v-fi', label: 'V-Fi', icon: Wallet },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
]

export const NEXUS_VIEW_META: Record<
  NexusViewId,
  { title: string; subtitle: string }
> = {
  home: {
    title: 'Video Genesis Home',
    subtitle: 'Intent → Intelligence → Creation — your creative OS command surface.',
  },
  'idea-lab': {
    title: 'Idea Lab',
    subtitle: 'Score, remix, and promote concepts into stories without leaving the Studio.',
  },
  create: {
    title: 'Create',
    subtitle: 'Speak intent. The AI Director routes models, tools, and memory.',
  },
  stories: {
    title: 'Story Engine',
    subtitle: 'Scripts, continuity, endings, and episode structure with project memory.',
  },
  characters: {
    title: 'Characters',
    subtitle: 'Reusable identities that stay consistent across trailers, episodes, and worlds.',
  },
  worlds: {
    title: 'Worlds',
    subtitle: 'Locations, rules, and atmospheres shared across every format.',
  },
  video: {
    title: 'AI Video Workspace',
    subtitle: 'Text, image, and video pipelines with cinematic control.',
  },
  image: {
    title: 'Image Studio',
    subtitle: 'Posters, thumbnails, stills — tied to project style memory.',
  },
  audio: {
    title: 'Audio',
    subtitle: 'Dialogue, FX, and voice profiles in one multimodal thread.',
  },
  music: {
    title: 'Music',
    subtitle: 'Themes and scores that travel with your universe.',
  },
  'live-production': {
    title: 'Live Production',
    subtitle: 'Virtual production room — camera, light, environment, performance.',
  },
  'ai-agents': {
    title: 'AI Agents',
    subtitle: 'Specialists orchestrated by the AI Director — not a tool pile.',
  },
  projects: {
    title: 'Projects',
    subtitle: 'Intelligent memory for every generation, decision, and version.',
  },
  assets: {
    title: 'Assets',
    subtitle: 'Characters, worlds, costumes, styles — reusable creative DNA.',
  },
  audience: {
    title: 'Audience Intelligence',
    subtitle: 'Explain retention. Act on insight. Generate the next cut.',
  },
  distribution: {
    title: 'Distribution Engine',
    subtitle: 'One project → trailer, Shorts, verticals, posters, audio.',
  },
  analytics: {
    title: 'Analytics',
    subtitle: 'Event-driven creative performance — estimates labeled as estimates.',
  },
  'creative-economy': {
    title: 'Creative Economy',
    subtitle: 'Assets and experiences that extend creation into V-Fi naturally.',
  },
  'v-fi': {
    title: 'V-Fi',
    subtitle: 'Bridge to Virtual Universe — ownership as a continuation of craft.',
  },
  settings: {
      title: 'Video Genesis Settings',
      subtitle: 'Assist / Co-pilot / Autopilot modes and model preferences.',
    },
  }

export function isNexusViewId(v: string | null): v is NexusViewId {
  return !!v && v in NEXUS_VIEW_META
}
