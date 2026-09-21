'use client'

import * as React from 'react'
import { ConverseProvider, useConverse } from '@/lib/converse/store'
import { ConverseSidebar, SidebarToggle } from './sidebar'
import { FloatingInput } from './floating-input'
import { MessageRow } from './message-row'
import { MemoryPanel } from './memory-panel'
import { cn } from '@/lib/utils'

function ConverseShell() {
  const { state, path, active } = useConverse()
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const bottomRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [path.map((m) => m.id + m.content.length + String(m.streaming)).join('|')])

  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    if (!q) return
    window.dispatchEvent(new CustomEvent('vdoc:prefill', { detail: q }))
    window.history.replaceState({}, '', '/converse')
  }, [])

  const empty = path.length === 0

  return (
    <div className="relative min-h-dvh bg-bg-void text-foreground" data-mood="intelligence">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="vdoc-aurora vdoc-aurora-static absolute inset-0 opacity-40" />
        <div className="vdoc-horizon absolute inset-0 opacity-30" />
        <div className="vdoc-tech-mesh absolute inset-0 opacity-15" />
      </div>

      <ConverseSidebar />
      <MemoryPanel />

      <div
        className={cn(
          'relative flex min-h-dvh flex-col transition-[padding] duration-[var(--duration-slow)] ease-[var(--ease-emphasized)]',
          'md:pl-[96px]',
          state.sidebarOpen && 'md:pl-[300px]',
          state.memoryOpen && 'md:pr-[320px]'
        )}
      >
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-transparent px-3 py-3 backdrop-blur-md sm:px-5">
          <SidebarToggle />
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-sm font-semibold tracking-tight text-lunar">
              {active?.title || 'Converse'}
            </h1>
            <p className="text-[12px] text-muted-foreground">
              Context-aware · branchable · remembered
            </p>
          </div>
        </header>

        <div
          ref={scrollerRef}
          className="ix-scroll relative flex-1 overflow-y-auto px-3 pb-44 pt-4 sm:px-6"
        >
          {!empty && (
            <div className="mx-auto flex max-w-3xl flex-col gap-10 py-8">
              {path.map((m) => (
                <MessageRow key={m.id} message={m} />
              ))}
            </div>
          )}
          <div ref={bottomRef} className="h-px" />
        </div>

        <FloatingInput />
      </div>
    </div>
  )
}

export function ConverseApp() {
  return (
    <ConverseProvider>
      <ConverseShell />
    </ConverseProvider>
  )
}
