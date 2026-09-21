'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DsSearchBarProps
  extends Omit<React.ComponentProps<'input'>, 'type' | 'onChange'> {
  value?: string
  onValueChange?: (value: string) => void
  onClear?: () => void
}

function DsSearchBar({
  className,
  value: valueProp,
  onValueChange,
  onClear,
  placeholder = 'Search worlds, stories, presence…',
  ...props
}: DsSearchBarProps) {
  const [internal, setInternal] = React.useState('')
  const value = valueProp ?? internal
  const setValue = (v: string) => {
    if (valueProp === undefined) setInternal(v)
    onValueChange?.(v)
  }

  return (
    <div
      role="search"
      className={cn(
        'group relative flex h-11 w-full max-w-xl items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4',
        'transition-all duration-[var(--duration-normal)] ease-[var(--ease-standard)]',
        'focus-within:border-cyan/35 focus-within:bg-white/[0.06] focus-within:shadow-[var(--shadow-focus)]',
        className
      )}
    >
      <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <label htmlFor={props.id ?? 'ds-search'} className="sr-only">
        Search
      </label>
      <input
        id={props.id ?? 'ds-search'}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        {...props}
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setValue('')
            onClear?.()
          }}
          className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      ) : (
        <kbd className="hidden rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
          ⌘K
        </kbd>
      )}
    </div>
  )
}

export { DsSearchBar }
