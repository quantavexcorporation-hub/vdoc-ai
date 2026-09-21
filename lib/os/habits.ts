/**
 * Client-only navigation habits — no API, no route changes.
 * Powers predictive sidebar ordering & suggestions.
 */

const STORAGE_KEY = 'vdoc.os.habits.v1'

export type HabitMap = Record<string, number>

function read(): HabitMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as HabitMap
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function write(map: HabitMap) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {
    /* quota / private mode */
  }
}

/** Record a visit to a rail item id (e.g. "movies", "live"). */
export function recordHabit(id: string, weight = 1) {
  const map = read()
  map[id] = (map[id] ?? 0) + weight
  write(map)
  return map
}

export function getHabits(): HabitMap {
  return read()
}

/** Sort items by habit score (stable for ties). */
export function sortByHabit<T extends { id: string }>(items: T[]): T[] {
  const map = read()
  return [...items].sort((a, b) => (map[b.id] ?? 0) - (map[a.id] ?? 0))
}

/** Top predicted destinations (ids with score > 0). */
export function predictNext(limit = 3): string[] {
  const map = read()
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([id]) => id)
}
