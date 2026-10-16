/**
 * Creative Intelligence / project memory — local persistence only (no API/DB changes).
 */

export type CreativeEntityKind =
  | 'character'
  | 'world'
  | 'location'
  | 'object'
  | 'costume'
  | 'style'
  | 'brand'
  | 'music-theme'
  | 'voice'
  | 'story-rule'

export type CreativeEntity = {
  id: string
  kind: CreativeEntityKind
  name: string
  summary: string
  tags: string[]
}

export type NexusProject = {
  id: string
  title: string
  genre: string
  status: 'draft' | 'producing' | 'ready' | 'distributed'
  updatedAt: number
  intent: string
  entities: string[]
  modes: string[]
}

export type IdeaCard = {
  id: string
  title: string
  angle: string
  score: number
  genre: string
  audience: string
}

const PROJECT_KEY = 'vdoc.nexus.projects.v1'
const MEMORY_KEY = 'vdoc.nexus.memory.v1'

export const SEED_ENTITIES: CreativeEntity[] = [
  {
    id: 'char-nova',
    kind: 'character',
    name: 'Nova Ellison',
    summary: 'Quiet-world architect; sound as interface.',
    tags: ['lead', 'creator'],
  },
  {
    id: 'char-aya',
    kind: 'character',
    name: 'Aya Chen',
    summary: 'Branch-cut director; midnight endings.',
    tags: ['community', 'story'],
  },
  {
    id: 'world-harbor',
    kind: 'world',
    name: 'Neo Harbor',
    summary: 'City that rewrites streets around presence.',
    tags: ['live', 'adaptive'],
  },
  {
    id: 'style-35mm',
    kind: 'style',
    name: 'Cinematic 35mm',
    summary: 'Warm grain, shallow depth, night cyan rim.',
    tags: ['look'],
  },
  {
    id: 'voice-guardian',
    kind: 'voice',
    name: 'Vault Guardian',
    summary: 'Low, precise narration for economy drops.',
    tags: ['voice'],
  },
  {
    id: 'theme-signal',
    kind: 'music-theme',
    name: 'Signal Choir',
    summary: 'Pulsing live-score motif for premieres.',
    tags: ['score'],
  },
]

export const SEED_IDEAS: IdeaCard[] = [
  {
    id: 'idea-1',
    title: 'Bridge that chooses you',
    angle: 'Interactive ending where the city decides loyalty.',
    score: 92,
    genre: 'Thriller',
    audience: 'Night binge',
  },
  {
    id: 'idea-2',
    title: 'Silent arena',
    angle: 'Game-cinema hybrid: sound is the weapon.',
    score: 88,
    genre: 'Game / Film',
    audience: 'Gen-Z play',
  },
  {
    id: 'idea-3',
    title: 'Episode zero: fog',
    angle: 'Cold open with no dialogue for 45s — retention bet.',
    score: 84,
    genre: 'Series',
    audience: 'Story core',
  },
  {
    id: 'idea-4',
    title: 'Harbor land drop short',
    angle: '15s vertical teaser for Virtual Universe parcels.',
    score: 79,
    genre: 'Shorts',
    audience: 'Collectors',
  },
]

export const SEED_PROJECTS: NexusProject[] = [
  {
    id: 'proj-aurora',
    title: 'Project Aurora',
    genre: 'Cinematic series',
    status: 'producing',
    updatedAt: Date.now() - 3600_000,
    intent: 'Neon Harbor premiere trailer + three Shorts',
    entities: ['char-nova', 'world-harbor', 'style-35mm'],
    modes: ['copilot'],
  },
  {
    id: 'proj-null',
    title: 'Null Garden',
    genre: 'Exploration game',
    status: 'draft',
    updatedAt: Date.now() - 86400_000,
    intent: 'World bible + character pack',
    entities: ['world-harbor', 'theme-signal'],
    modes: ['assist'],
  },
]

export function loadProjects(): NexusProject[] {
  if (typeof window === 'undefined') return SEED_PROJECTS
  try {
    const raw = window.localStorage.getItem(PROJECT_KEY)
    if (!raw) {
      window.localStorage.setItem(PROJECT_KEY, JSON.stringify(SEED_PROJECTS))
      return SEED_PROJECTS
    }
    return JSON.parse(raw) as NexusProject[]
  } catch {
    return SEED_PROJECTS
  }
}

export function saveProjects(projects: NexusProject[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(PROJECT_KEY, JSON.stringify(projects))
  } catch {
    /* ignore */
  }
}

export type ProjectMemoryNote = {
  id: string
  projectId: string
  at: number
  kind: 'prompt' | 'decision' | 'insight' | 'generation'
  text: string
}

export function appendMemory(note: Omit<ProjectMemoryNote, 'id' | 'at'>) {
  if (typeof window === 'undefined') return
  try {
    const raw = window.localStorage.getItem(MEMORY_KEY)
    const list: ProjectMemoryNote[] = raw ? JSON.parse(raw) : []
    list.unshift({
      ...note,
      id: `mem_${Date.now().toString(36)}`,
      at: Date.now(),
    })
    window.localStorage.setItem(MEMORY_KEY, JSON.stringify(list.slice(0, 120)))
  } catch {
    /* ignore */
  }
}

export function readMemory(projectId?: string, limit = 10): ProjectMemoryNote[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(MEMORY_KEY)
    const list: ProjectMemoryNote[] = raw ? JSON.parse(raw) : []
    return list
      .filter((n) => !projectId || n.projectId === projectId)
      .slice(0, limit)
  } catch {
    return []
  }
}

export const AI_AGENTS = [
  { id: 'director', name: 'AI Director', role: 'Orchestrates all specialists' },
  { id: 'story', name: 'Story Agent', role: 'Scripts & continuity' },
  { id: 'research', name: 'Research Agent', role: 'Trends & references' },
  { id: 'character', name: 'Character Agent', role: 'Identity consistency' },
  { id: 'world', name: 'World Agent', role: 'Universe rules' },
  { id: 'video', name: 'Video Agent', role: 'Shot generation & edit' },
  { id: 'audio', name: 'Audio Agent', role: 'Voice, FX, mix' },
  { id: 'editing', name: 'Editing Agent', role: 'Cuts, Shorts, trailers' },
  { id: 'marketing', name: 'Marketing Agent', role: 'Titles & thumbnails' },
  { id: 'audience', name: 'Audience Agent', role: 'Retention insights' },
  { id: 'analytics', name: 'Analytics Agent', role: 'Performance signals' },
  { id: 'distribution', name: 'Distribution Agent', role: 'Format pipeline' },
  { id: 'monetization', name: 'Monetization Agent', role: 'V-Fi & products' },
] as const
