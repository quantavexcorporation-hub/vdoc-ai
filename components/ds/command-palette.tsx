'use client'

import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { Sparkles } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { INTENT_ACTIONS, matchIntent } from '@/lib/os/intent'

export type DsCommandItem = {
  id: string
  label: string
  group?: string
  shortcut?: string
  icon?: React.ReactNode
  onSelect?: () => void
}

export interface DsCommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: DsCommandItem[]
  placeholder?: string
}

function DsCommandPalette({
  open,
  onOpenChange,
  items,
  placeholder = 'Describe what you want — emotional, cyberpunk, create…',
}: DsCommandPaletteProps) {
  const [query, setQuery] = React.useState('')

  React.useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const groups = React.useMemo(() => {
    const map = new Map<string, DsCommandItem[]>()
    for (const item of items) {
      const key = item.group ?? 'Commands'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(item)
    }
    return map
  }, [items])

  const intents = React.useMemo(() => matchIntent(query), [query])

  const runHref = (href: string) => {
    onOpenChange(false)
    window.location.href = href
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="vdoc-liquid-glass overflow-hidden border-cyan/15 p-0 shadow-[var(--shadow-xl),var(--shadow-glow-cyan)] sm:max-w-xl"
      >
        <DialogTitle className="sr-only">AI Command</DialogTitle>
        <CommandPrimitive
          className="flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-xl)]"
          label="AI Command"
          shouldFilter={true}
        >
          <div className="flex items-center gap-2 border-b border-white/[0.08] px-4">
            <Sparkles className="size-4 shrink-0 text-cyan" aria-hidden />
            <CommandPrimitive.Input
              value={query}
              onValueChange={setQuery}
              placeholder={placeholder}
              className="h-13 w-full bg-transparent py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
            />
            <kbd className="rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              ESC
            </kbd>
          </div>

          <CommandPrimitive.List className="max-h-96 overflow-y-auto p-2">
            <CommandPrimitive.Empty className="px-3 py-6">
              <p className="text-center text-sm text-muted-foreground">
                No exact match — try an intent below.
              </p>
              <ul className="mt-4 space-y-1">
                {INTENT_ACTIONS.slice(0, 4).map((intent) => (
                  <li key={intent.id}>
                    <button
                      type="button"
                      onClick={() => runHref(intent.href)}
                      className="flex w-full items-start gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-left transition-colors hover:bg-cyan/10"
                    >
                      <Sparkles className="mt-0.5 size-3.5 shrink-0 text-cyan" aria-hidden />
                      <span>
                        <span className="block text-sm text-lunar">{intent.label}</span>
                        <span className="block text-[12px] text-muted-foreground">
                          {intent.hint}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </CommandPrimitive.Empty>

            <CommandPrimitive.Group
              heading="Intent"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-cyan"
            >
              {intents.map((intent) => (
                <CommandPrimitive.Item
                  key={`intent-${intent.id}`}
                  value={`${intent.label} ${intent.keywords.join(' ')}`}
                  onSelect={() => runHref(intent.href)}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm text-muted-foreground',
                    'aria-selected:bg-cyan/10 aria-selected:text-foreground'
                  )}
                >
                  <Sparkles className="mt-0.5 size-3.5 shrink-0 text-cyan" aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block text-lunar">{intent.label}</span>
                    <span className="block text-[12px] text-muted-foreground">{intent.hint}</span>
                  </span>
                </CommandPrimitive.Item>
              ))}
            </CommandPrimitive.Group>

            {[...groups.entries()].map(([group, groupItems]) => (
              <CommandPrimitive.Group
                key={group}
                heading={group}
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.18em] [&_[cmdk-group-heading]]:text-cyan"
              >
                {groupItems.map((item) => (
                  <CommandPrimitive.Item
                    key={item.id}
                    value={item.label}
                    onSelect={() => {
                      item.onSelect?.()
                      onOpenChange(false)
                    }}
                    className={cn(
                      'flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm text-muted-foreground',
                      'aria-selected:bg-cyan/10 aria-selected:text-foreground'
                    )}
                  >
                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                    <span className="flex-1">{item.label}</span>
                    {item.shortcut && (
                      <kbd className="font-mono text-[10px] text-muted-foreground">
                        {item.shortcut}
                      </kbd>
                    )}
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            ))}
          </CommandPrimitive.List>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  )
}

/** Hook: ⌘K / Ctrl+K toggles palette */
function useCommandPaletteShortcut(
  open: boolean,
  onOpenChange: (open: boolean) => void
) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])
}

export { DsCommandPalette, useCommandPaletteShortcut }
