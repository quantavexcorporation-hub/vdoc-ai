import type { AddOnId, BillingCycle, PlanId } from './data'

const PLAN_KEY = 'vdoc_upgrade_plan'
const CYCLE_KEY = 'vdoc_upgrade_cycle'
const ADDON_KEY = 'vdoc_upgrade_addons'

function canStore() {
  return typeof window !== 'undefined'
}

export function readPlan(): PlanId | null {
  if (!canStore()) return null
  const value = window.localStorage.getItem(PLAN_KEY)
  if (value === 'floor' || value === 'plus' || value === 'premiere') return value
  return null
}

export function writePlan(plan: PlanId) {
  if (!canStore()) return
  window.localStorage.setItem(PLAN_KEY, plan)
}

export function readCycle(): BillingCycle | null {
  if (!canStore()) return null
  const value = window.localStorage.getItem(CYCLE_KEY)
  if (value === 'monthly' || value === 'yearly') return value
  return null
}

export function writeCycle(cycle: BillingCycle) {
  if (!canStore()) return
  window.localStorage.setItem(CYCLE_KEY, cycle)
}

export function readAddOns(): AddOnId[] {
  if (!canStore()) return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(ADDON_KEY) ?? '[]') as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (id): id is AddOnId =>
        id === 'voice' || id === 'generate' || id === 'worlds' || id === 'studio'
    )
  } catch {
    return []
  }
}

export function writeAddOns(addons: AddOnId[]) {
  if (!canStore()) return
  window.localStorage.setItem(ADDON_KEY, JSON.stringify(addons))
}
