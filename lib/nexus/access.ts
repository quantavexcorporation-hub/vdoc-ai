/**
 * Creator-only access for Video Genesis (local until real auth/RBAC).
 * Audience / default users cannot open the studio.
 */

const CREATOR_KEY = 'vdoc.role.creator.v1'

export type VdocSpaceRole = 'audience' | 'creator'

export function isCreator(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(CREATOR_KEY) === '1'
  } catch {
    return false
  }
}

export function getSpaceRole(): VdocSpaceRole {
  return isCreator() ? 'creator' : 'audience'
}

export function enableCreator() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CREATOR_KEY, '1')
  } catch {
    /* ignore */
  }
}

export function disableCreator() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(CREATOR_KEY)
  } catch {
    /* ignore */
  }
}
