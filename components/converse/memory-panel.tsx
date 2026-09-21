'use client'

import * as React from 'react'
import { Brain, X } from 'lucide-react'
import { useConverse } from '@/lib/converse/store'
import { cn } from '@/lib/utils'

export function MemoryPanel() {
  const { state, dispatch } = useConverse()
  const [draft, setDraft] = React.useState('')

  if (!state.memoryOpen) return null

  return (
    <aside
      className={cn(
        'fixed right-0 top-0 z-40 flex h-dvh w-[min(100%,320px)] flex-col',
        'border-l border-white/[0.06] bg-bg-void/95 backdrop-blur-xl',
        'animate-rise'
      )}
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2">
          <Brain className="size-4 text-cyan" />
          <h2 className="font-display text-sm font-semibold">Memory</h2>
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'TOGGLE_MEMORY' })}
          className="rounded-lg p-2 text-muted-foreground hover:bg-white/[0.06]"
          aria-label="Close memory"
        >
          <X className="size-4" />
        </button>
      </div>

      <p className="px-4 pt-2 text-[12px] leading-relaxed text-muted-foreground">
        Context VDOC keeps across conversations. Say “remember …” or state preferences — they land here.
      </p>

      <form
        className="mt-4 px-4"
        onSubmit={(e) => {
          e.preventDefault()
          if (!draft.trim()) return
          dispatch({
            type: 'ADD_MEMORY',
            item: {
              id: `mem-${Date.now()}`,
              content: draft.trim(),
              source: 'explicit',
              createdAt: Date.now(),
              tags: ['manual'],
            },
          })
          setDraft('')
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a memory…"
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan/40"
        />
      </form>

      <ul className="mt-4 flex-1 space-y-2 overflow-y-auto px-4 pb-6 scrollbar-none">
        {state.memory.length === 0 && (
          <li className="py-8 text-center text-[13px] text-muted-foreground/50">
            No memories yet
          </li>
        )}
        {state.memory.map((m) => (
          <li
            key={m.id}
            className="group rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
          >
            <p className="text-[13px] leading-snug text-lunar/90">{m.content}</p>
            <div className="mt-1.5 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
                {m.source}
              </span>
              <button
                type="button"
                onClick={() => dispatch({ type: 'REMOVE_MEMORY', id: m.id })}
                className="text-[11px] text-muted-foreground opacity-0 transition-opacity hover:text-error group-hover:opacity-100"
              >
                Forget
              </button>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  )
}
