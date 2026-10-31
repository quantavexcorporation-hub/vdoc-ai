'use client'

import * as React from 'react'
import { seedState, STORE_KEY } from './catalog'
import {
  buyListing,
  clearReport,
  createCard,
  evolveInstance,
  featureCard,
  listInstance,
  mintInstance,
  reportListing,
  setFavorites,
  setFlag,
  tradeInstances,
  unlistInstance,
} from './ledger'
import type { CardsState, LedgerResult } from './types'

type CardsContextValue = {
  state: CardsState
  ready: boolean
  notice: string | null
  apply: (result: LedgerResult) => boolean
  buy: (instanceId: string) => boolean
  list: (instanceId: string, price: number) => boolean
  unlist: (instanceId: string) => boolean
  mint: (cardId: string) => boolean
  create: (input: Parameters<typeof createCard>[1]) => boolean
  trade: (offerInstanceId: string, askInstanceId: string) => boolean
  evolve: (instanceId: string) => boolean
  favorites: (ids: string[]) => boolean
  feature: (cardId: string, rank: number | null) => boolean
  report: (instanceId: string, reason: string) => boolean
  flag: (instanceId: string, flagged: boolean) => boolean
  resolveReport: (reportId: string) => boolean
}

const CardsContext = React.createContext<CardsContextValue | null>(null)

function readStored(): CardsState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CardsState
    if (!parsed?.cards || !parsed?.instances || !parsed?.collectors) return null
    return parsed
  } catch {
    return null
  }
}

function writeStored(state: CardsState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORE_KEY, JSON.stringify(state))
}

export function CardsProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CardsState>(seedState)
  const [ready, setReady] = React.useState(false)
  const [notice, setNotice] = React.useState<string | null>(null)

  React.useEffect(() => {
    const stored = readStored()
    if (stored) setState(stored)
    setReady(true)
  }, [])

  React.useEffect(() => {
    if (ready) writeStored(state)
  }, [ready, state])

  const apply = React.useCallback((result: LedgerResult) => {
    if (!result.ok) {
      setNotice(result.error)
      return false
    }
    setState(result.state)
    setNotice(result.event.note)
    return true
  }, [])

  const value = React.useMemo<CardsContextValue>(
    () => ({
      state,
      ready,
      notice,
      apply,
      buy: (instanceId) => apply(buyListing(state, instanceId, state.youId)),
      list: (instanceId, price) =>
        apply(listInstance(state, instanceId, state.youId, price)),
      unlist: (instanceId) => apply(unlistInstance(state, instanceId, state.youId)),
      mint: (cardId) => apply(mintInstance(state, cardId, state.youId)),
      create: (input) => apply(createCard(state, input)),
      trade: (offerInstanceId, askInstanceId) =>
        apply(tradeInstances(state, state.youId, offerInstanceId, askInstanceId)),
      evolve: (instanceId) => apply(evolveInstance(state, instanceId, state.youId)),
      favorites: (ids) => apply(setFavorites(state, state.youId, ids)),
      feature: (cardId, rank) => apply(featureCard(state, cardId, rank)),
      report: (instanceId, reason) => apply(reportListing(state, instanceId, reason)),
      flag: (instanceId, flagged) => apply(setFlag(state, instanceId, flagged)),
      resolveReport: (reportId) => apply(clearReport(state, reportId)),
    }),
    [apply, notice, ready, state]
  )

  return <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
}

export function useCards() {
  const ctx = React.useContext(CardsContext)
  if (!ctx) throw new Error('useCards must be used inside CardsProvider')
  return ctx
}

export function youOf(state: CardsState) {
  return state.collectors.find((collector) => collector.id === state.youId) ?? null
}

export function cardById(state: CardsState, id: string) {
  return state.cards.find((card) => card.id === id) ?? null
}

export function instancesFor(state: CardsState, cardId: string) {
  return state.instances
    .filter((instance) => instance.cardId === cardId)
    .sort((a, b) => a.edition - b.edition)
}

export function ownedBy(state: CardsState, ownerId: string) {
  return state.instances.filter((instance) => instance.ownerId === ownerId)
}

export function collectorById(state: CardsState, id: string) {
  return state.collectors.find((collector) => collector.id === id) ?? null
}
