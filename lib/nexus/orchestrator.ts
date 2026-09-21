/**
 * Model / provider abstraction — UI never binds to a single AI vendor.
 * Ready for real providers later without rewriting Nexus surfaces.
 */

export type ModelCategory =
  | 'llm'
  | 'reasoning'
  | 'image'
  | 'video'
  | 'video-edit'
  | 'speech'
  | 'voice'
  | 'music'
  | 'transcription'
  | 'translation'
  | '3d'
  | 'vision'
  | 'embeddings'
  | 'moderation'

export type TaskKind =
  | 'script'
  | 'storyboard'
  | 'image-gen'
  | 'video-gen'
  | 'edit'
  | 'voice'
  | 'music'
  | 'analyze'
  | 'caption'
  | 'distribute'
  | 'idea'

export type ControlMode = 'assist' | 'copilot' | 'autopilot'

export type ModelDescriptor = {
  id: string
  label: string
  category: ModelCategory
  quality: number
  cost: number
  latency: number
  provider: string
}

export const MODEL_REGISTRY: ModelDescriptor[] = [
  {
    id: 'vdoc-llm-prime',
    label: 'VDOC Reasoning Prime',
    category: 'reasoning',
    quality: 0.92,
    cost: 0.4,
    latency: 0.5,
    provider: 'vdoc-abstract',
  },
  {
    id: 'vdoc-image-cinema',
    label: 'Cinema Image',
    category: 'image',
    quality: 0.9,
    cost: 0.55,
    latency: 0.6,
    provider: 'vdoc-abstract',
  },
  {
    id: 'vdoc-video-shot',
    label: 'Shot Engine',
    category: 'video',
    quality: 0.88,
    cost: 0.7,
    latency: 0.8,
    provider: 'vdoc-abstract',
  },
  {
    id: 'vdoc-voice-cast',
    label: 'Cast Voice',
    category: 'voice',
    quality: 0.86,
    cost: 0.35,
    latency: 0.4,
    provider: 'vdoc-abstract',
  },
  {
    id: 'vdoc-music-theme',
    label: 'Theme Score',
    category: 'music',
    quality: 0.85,
    cost: 0.45,
    latency: 0.55,
    provider: 'vdoc-abstract',
  },
  {
    id: 'vdoc-vision-cut',
    label: 'Vision Cut',
    category: 'vision',
    quality: 0.87,
    cost: 0.3,
    latency: 0.35,
    provider: 'vdoc-abstract',
  },
]

const TASK_CATEGORY: Record<TaskKind, ModelCategory[]> = {
  script: ['reasoning', 'llm'],
  storyboard: ['reasoning', 'image'],
  'image-gen': ['image'],
  'video-gen': ['video'],
  edit: ['video-edit', 'vision'],
  voice: ['voice', 'speech'],
  music: ['music'],
  analyze: ['reasoning', 'vision'],
  caption: ['transcription', 'llm'],
  distribute: ['reasoning'],
  idea: ['reasoning', 'llm'],
}

export type OrchestrationPlan = {
  task: TaskKind
  model: ModelDescriptor
  fallback: ModelDescriptor[]
  rationale: string
}

/** Select model by TASK + QUALITY + COST + SPEED preference weights */
export function routeTask(
  task: TaskKind,
  prefs: { quality?: number; cost?: number; speed?: number } = {}
): OrchestrationPlan {
  const q = prefs.quality ?? 0.45
  const c = prefs.cost ?? 0.25
  const s = prefs.speed ?? 0.3
  const cats = TASK_CATEGORY[task]
  const pool = MODEL_REGISTRY.filter((m) => cats.includes(m.category))
  const scored = (pool.length ? pool : MODEL_REGISTRY)
    .map((m) => ({
      m,
      score: m.quality * q + (1 - m.cost) * c + (1 - m.latency) * s,
    }))
    .sort((a, b) => b.score - a.score)

  const best = scored[0].m
  return {
    task,
    model: best,
    fallback: scored.slice(1, 3).map((x) => x.m),
    rationale: `Routed ${task} → ${best.label} (${best.provider}) for quality/cost/latency balance.`,
  }
}

export type GenerationEvent =
  | 'generation.created'
  | 'asset.created'
  | 'project.updated'
  | 'video.published'
  | 'viewer.engaged'
  | 'viewer.completed'
  | 'audience.segmented'
  | 'content.performance.updated'
  | 'creative.insight.generated'

export type NexusEvent = {
  id: string
  type: GenerationEvent
  at: number
  payload: Record<string, unknown>
}

const EVENT_KEY = 'vdoc.nexus.events.v1'

export function emitNexusEvent(
  type: GenerationEvent,
  payload: Record<string, unknown> = {}
): NexusEvent {
  const ev: NexusEvent = {
    id: `ev_${Date.now().toString(36)}`,
    type,
    at: Date.now(),
    payload,
  }
  if (typeof window === 'undefined') return ev
  try {
    const raw = window.localStorage.getItem(EVENT_KEY)
    const list: NexusEvent[] = raw ? JSON.parse(raw) : []
    list.unshift(ev)
    window.localStorage.setItem(EVENT_KEY, JSON.stringify(list.slice(0, 80)))
  } catch {
    /* private mode */
  }
  return ev
}

export function readNexusEvents(limit = 12): NexusEvent[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(EVENT_KEY)
    const list: NexusEvent[] = raw ? JSON.parse(raw) : []
    return list.slice(0, limit)
  } catch {
    return []
  }
}
