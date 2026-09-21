/**
 * Demo user space profile for dashboard (local until real auth).
 */

const NAME_KEY = 'vdoc.user.name.v1'
const FOCUS_KEY = 'vdoc.user.focus.v1'

export const DEFAULT_USER_NAME = 'Nova'
export const DEFAULT_FOCUS = 'Neon Harbor · Season arc'

export function readUserName(): string {
  if (typeof window === 'undefined') return DEFAULT_USER_NAME
  try {
    return window.localStorage.getItem(NAME_KEY)?.trim() || DEFAULT_USER_NAME
  } catch {
    return DEFAULT_USER_NAME
  }
}

export function readUserFocus(): string {
  if (typeof window === 'undefined') return DEFAULT_FOCUS
  try {
    return window.localStorage.getItem(FOCUS_KEY)?.trim() || DEFAULT_FOCUS
  } catch {
    return DEFAULT_FOCUS
  }
}

export function writeUserName(name: string) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(NAME_KEY, name.trim() || DEFAULT_USER_NAME)
  } catch {
    /* ignore */
  }
}

export function writeUserFocus(focus: string) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(FOCUS_KEY, focus.trim() || DEFAULT_FOCUS)
  } catch {
    /* ignore */
  }
}

export function timeGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}
