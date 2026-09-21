/**
 * Intent → existing routes. Magical search UX without new APIs.
 */

export type IntentAction = {
  id: string
  label: string
  hint: string
  href: string
  keywords: string[]
}

export const INTENT_ACTIONS: IntentAction[] = [
  {
    id: 'emotional',
    label: 'I want something emotional',
    hint: 'Warm stories & soft scores',
    href: '/universe?c=stories',
    keywords: ['emotional', 'feel', 'sad', 'heart', 'warm', 'romance', 'cry'],
  },
  {
    id: 'cyberpunk',
    label: 'Show me cyberpunk',
    hint: 'Neon cinema & electric games',
    href: '/universe?c=movies',
    keywords: ['cyberpunk', 'neon', 'cyber', 'noir', 'futuristic', 'tech'],
  },
  {
    id: 'horror',
    label: 'Generate horror',
    hint: 'Open Converse with a horror prompt',
    href: '/converse?q=' + encodeURIComponent('Generate a horror experience'),
    keywords: ['horror', 'scary', 'terror', 'dark', 'thriller', 'fear'],
  },
  {
    id: 'continue',
    label: 'Continue yesterday',
    hint: 'Resume your personal journey',
    href: '/#continue',
    keywords: ['continue', 'yesterday', 'resume', 'where i left', 'watching'],
  },
  {
    id: 'create',
    label: 'Create something new',
    hint: 'Enter the AI Creator',
    href: '/converse',
    keywords: ['create', 'new', 'generate', 'make', 'build', 'invent'],
  },
  {
    id: 'live',
    label: 'What is live right now',
    hint: 'Enter Live Universe',
    href: '/live',
    keywords: ['live', 'now', 'happening', 'premiere', 'event', 'stream'],
  },
  {
    id: 'games',
    label: 'I want to play',
    hint: 'AI Games universe',
    href: '/universe?c=games',
    keywords: ['play', 'game', 'games', 'multiplayer', 'arena'],
  },
  {
    id: 'music',
    label: 'Something with sound',
    hint: 'Music & audio worlds',
    href: '/universe?c=music',
    keywords: ['music', 'sound', 'audio', 'score', 'listen', 'song'],
  },
  {
    id: 'shorts',
    label: 'Something quick',
    hint: 'AI shorts in a breath',
    href: '/#quick-entertainment',
    keywords: ['quick', 'short', 'shorts', 'fast', 'minute', 'brief'],
  },
  {
    id: 'worlds',
    label: 'Take me into a world',
    hint: 'Virtual Cities',
    href: '/universe?c=worlds',
    keywords: ['world', 'worlds', 'city', 'cities', 'universe', 'explore', 'enter', 'virtual'],
  },
  {
    id: 'economy',
    label: 'Open my digital vault',
    hint: 'Virtual Economy · ownership universe',
    href: '/economy',
    keywords: [
      'vault',
      'economy',
      'wallet',
      'finance',
      'nft',
      'asset',
      'own',
      'collect',
      'land',
      'marketplace',
      'virtual',
      'energy',
    ],
  },
]

export function matchIntent(query: string): IntentAction[] {
  const q = query.trim().toLowerCase()
  if (!q) return INTENT_ACTIONS.slice(0, 5)

  const scored = INTENT_ACTIONS.map((action) => {
    let score = 0
    if (action.label.toLowerCase().includes(q)) score += 8
    if (action.hint.toLowerCase().includes(q)) score += 3
    for (const kw of action.keywords) {
      if (q.includes(kw) || kw.includes(q)) score += 5
    }
    return { action, score }
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.action)

  return scored.length ? scored : INTENT_ACTIONS.slice(0, 5)
}

/** Mood tokens for category surfaces — CSS data-mood only. */
export const CATEGORY_MOOD: Record<string, string> = {
  movies: 'cinema',
  series: 'cinema',
  games: 'neon',
  stories: 'warm',
  comics: 'warm',
  music: 'audio',
  worlds: 'cosmic',
  shorts: 'pulse',
  live: 'signal',
  community: 'social',
  converse: 'intelligence',
}
