import type {
  GenerationMode,
  MediaPayload,
  MemoryItem,
  StoryPayload,
} from './types'

const SEEDS = [
  'from-[#0a1628] via-[#1a3a5c] to-[#0d2818]',
  'from-[#1a0a28] via-[#3a1a5c] to-[#0a1828]',
  'from-[#28180a] via-[#5c3a1a] to-[#18280a]',
  'from-[#0a2828] via-[#1a5c5c] to-[#280a18]',
  'from-[#180a28] via-[#4a2a6c] to-[#0a2030]',
  'from-[#201808] via-[#6a4820] to-[#102028]',
]

function pickSeed(prompt: string) {
  let h = 0
  for (let i = 0; i < prompt.length; i++) h = (h * 31 + prompt.charCodeAt(i)) >>> 0
  return SEEDS[h % SEEDS.length]
}

export function detectMode(prompt: string): GenerationMode {
  const p = prompt.toLowerCase()
  if (/\b(interactive\s+story|choose\s+your|adventure\s+story|story\s+where\s+i)\b/.test(p) || /\bstory\b/.test(p) && /\b(branch|choice|interactive)\b/.test(p))
    return 'story'
  if (/\b(movie|film|feature|cinematic\s+short)\b/.test(p)) return 'movie'
  if (/\b(video|clip|footage|animate|animation)\b/.test(p)) return 'video'
  if (/\b(image|picture|photo|draw|illustrat|render|generate\s+an?\s+art)\b/.test(p))
    return 'image'
  if (/\b(code|function|component|typescript|python|sql|algorithm|implement)\b/.test(p))
    return 'code'
  return 'chat'
}

function extractSubject(prompt: string) {
  return prompt
    .replace(/^(please\s+)?(generate|create|make|draw|show|write|film)\s+(me\s+)?(a|an|the)?\s*/i, '')
    .replace(/\b(image|picture|photo|video|clip|movie|film|story)\b/gi, '')
    .trim()
    .slice(0, 80) || 'untitled vision'
}

export function buildMedia(mode: 'image' | 'video' | 'movie', prompt: string): MediaPayload {
  const subject = extractSubject(prompt)
  const seed = pickSeed(prompt)
  if (mode === 'image') {
    return { kind: 'image', title: subject, prompt, seed }
  }
  if (mode === 'video') {
    return {
      kind: 'video',
      title: subject,
      prompt,
      seed,
      durationLabel: '0:12',
      scenes: [
        { title: 'Open', description: 'Atmosphere gathers' },
        { title: 'Motion', description: 'Subject enters frame' },
        { title: 'Close', description: 'Light resolves' },
      ],
    }
  }
  return {
    kind: 'movie',
    title: subject,
    prompt,
    seed,
    durationLabel: '2:40',
    scenes: [
      { title: 'Act I', description: 'World establishes itself' },
      { title: 'Act II', description: 'Tension finds a face' },
      { title: 'Act III', description: 'Quiet landing' },
      { title: 'Credits', description: 'Score fades to void' },
    ],
  }
}

export function buildStory(prompt: string): StoryPayload {
  const subject = extractSubject(prompt)
  return {
    title: subject,
    startId: 'start',
    nodes: {
      start: {
        id: 'start',
        text: `You stand at the edge of **${subject}**. The air tastes like ozone and unfinished sentences. Two paths open — neither promises safety.`,
        choices: [
          { id: 'c1', label: 'Follow the quiet light', next: 'light' },
          { id: 'c2', label: 'Enter the denser dark', next: 'dark' },
        ],
      },
      light: {
        id: 'light',
        text: 'The light resolves into a corridor of glass. Reflections of you arrive half a second late — as if the world is buffering your intent.',
        choices: [
          { id: 'c3', label: 'Speak to the reflection', next: 'speak' },
          { id: 'c4', label: 'Break a pane', next: 'break' },
        ],
      },
      dark: {
        id: 'dark',
        text: 'Darkness here is textured. You hear a low engine, then a voice that knows your name without asking.',
        choices: [
          { id: 'c5', label: 'Ask what it remembers', next: 'memory' },
          { id: 'c6', label: 'Offer a trade', next: 'trade' },
        ],
      },
      speak: {
        id: 'speak',
        text: 'Your reflection answers first: “You already chose once. This is the edit.” The corridor brightens. Ending A — lucid.',
      },
      break: {
        id: 'break',
        text: 'Glass becomes rain. Behind it: a desk, a cursor, and a blank page waiting for your next line. Ending B — meta.',
      },
      memory: {
        id: 'memory',
        text: 'It lists three things you care about — then one you forgot you cared about. Ending C — remembered.',
      },
      trade: {
        id: 'trade',
        text: 'You give it a secret. It gives you a door that only opens when you stop looking. Ending D — sideways.',
      },
    },
  }
}

export function buildResponse(
  prompt: string,
  memory: MemoryItem[],
  mode: GenerationMode
): string {
  const memLine =
    memory.length > 0
      ? `\n\n_Holding ${memory.length} memory thread${memory.length === 1 ? '' : 's'} — ${memory
          .slice(0, 3)
          .map((m) => m.content)
          .join('; ')}._`
      : ''

  if (mode === 'image') {
    return `Composed a still from your brief.${memLine}\n\nUse the canvas below — regenerate anytime, or refine with more light, lens, or mood.`
  }
  if (mode === 'video') {
    return `Cut a short motion sequence.${memLine}\n\nScrub the timeline to preview beats. Ask for a longer cut or a different camera grammar.`
  }
  if (mode === 'movie') {
    return `Assembled a miniature film structure — acts, score cues, and a closing card.${memLine}\n\nBranch the plot, swap the ending, or expand any act into a scene.`
  }
  if (mode === 'story') {
    return `Opened an interactive thread.${memLine}\n\nChoose a path. Each fork stays in your conversation tree — you can rewind and rebranch.`
  }
  if (mode === 'code') {
    return `Here’s a clean starting point you can drop in and iterate.${memLine}

\`\`\`typescript
type StreamChunk = { type: 'token' | 'done'; value?: string }

export async function* streamReply(prompt: string): AsyncGenerator<StreamChunk> {
  const words = prompt.split(/\\s+/).filter(Boolean)
  for (const word of words) {
    yield { type: 'token', value: word + ' ' }
    await new Promise((r) => setTimeout(r, 12))
  }
  yield { type: 'done' }
}
\`\`\`

Want tests, a React hook wrapper, or a different language?`
  }

  // Contextual chat
  const tips = [
    'I can also spin **images**, **video**, a short **movie**, or a **branching story** — just say the word.',
    'Edit any prompt to fork the conversation. Pin what matters; fold the rest.',
    'Drop files onto the input — I’ll treat them as context, not clutter.',
  ]
  const tip = tips[prompt.length % tips.length]

  return `**Understood.** ${prompt.length > 120 ? 'Here’s the distilled read:' : 'Here’s how I’d play it:'}

${craftParagraph(prompt)}

${tip}${memLine}`
}

function craftParagraph(prompt: string) {
  const clean = prompt.trim().replace(/\s+/g, ' ')
  if (clean.length < 40) {
    return `You asked for *${clean}*. I’ll keep the surface quiet and the signal sharp — tell me the constraint that matters most (tone, length, or format) and I’ll lock to it.`
  }
  return `Reading your intent as a request to move with clarity. Lead with the outcome, keep the machinery invisible, and leave room for a second beat if you want to go deeper. If this should become a visual, a clip, or a story with choices — say so and I’ll switch engines without resetting context.`
}

/** Infer memory candidates from user text */
export function inferMemory(prompt: string): MemoryItem | null {
  const name = prompt.match(/\b(?:my name is|i'm|i am)\s+([A-Z][a-z]+)\b/i)
  if (name) {
    return {
      id: `mem-${Date.now()}`,
      content: `User’s name is ${name[1]}`,
      source: 'inferred',
      createdAt: Date.now(),
      tags: ['identity'],
    }
  }
  const prefer = prompt.match(/\b(?:i (?:prefer|like|love|hate|want))\s+(.{8,60}?)(?:\.|$)/i)
  if (prefer) {
    return {
      id: `mem-${Date.now()}`,
      content: prefer[0].trim(),
      source: 'inferred',
      createdAt: Date.now(),
      tags: ['preference'],
    }
  }
  const remember = prompt.match(/\bremember(?: that)?\s+(.+?)(?:\.|$)/i)
  if (remember) {
    return {
      id: `mem-${Date.now()}`,
      content: remember[1].trim(),
      source: 'explicit',
      createdAt: Date.now(),
      tags: ['explicit'],
    }
  }
  return null
}

export type StreamHandlers = {
  onToken: (token: string) => void
  onDone: () => void
  signal?: AbortSignal
}

/** GPU-friendly streaming: rAF batched word chunks */
export async function streamText(
  full: string,
  { onToken, onDone, signal }: StreamHandlers
) {
  const parts = full.split(/(\s+)/)
  let i = 0
  await new Promise<void>((resolve) => {
    const tick = () => {
      if (signal?.aborted) {
        resolve()
        return
      }
      // Emit 1–3 parts per frame for butter feel
      const n = 1 + (i % 3 === 0 ? 1 : 0)
      for (let k = 0; k < n && i < parts.length; k++, i++) {
        onToken(parts[i])
      }
      if (i >= parts.length) {
        onDone()
        resolve()
        return
      }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

export const SUGGESTIONS = [
  'Generate an image of a quiet neon harbor at 4am',
  'Write a TypeScript stream helper with tests',
  'Start an interactive story in a rain-soaked city',
  'Make a short video of paper cranes becoming birds',
  'Film a one-minute movie about a door that remembers',
  'Remember that I prefer concise answers with code first',
]
