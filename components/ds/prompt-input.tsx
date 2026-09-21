'use client'

import * as React from 'react'
import { ArrowUp, AudioLines } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DsButton } from '@/components/ds/button'

export interface DsPromptInputProps {
  value?: string
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  suggestions?: string[]
  className?: string
  listening?: boolean
  onListeningChange?: (listening: boolean) => void
}

function DsPromptInput({
  value: valueProp,
  onValueChange,
  onSubmit,
  placeholder = 'What should the world become?',
  suggestions,
  className,
  listening = false,
  onListeningChange,
}: DsPromptInputProps) {
  const [internal, setInternal] = React.useState('')
  const value = valueProp ?? internal
  const setValue = (v: string) => {
    if (valueProp === undefined) setInternal(v)
    onValueChange?.(v)
  }

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    onSubmit?.(trimmed)
    if (valueProp === undefined) setInternal('')
  }

  return (
    <div className={cn('w-full', className)}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="vdoc-prompt ds-glass rounded-[var(--radius-2xl)] p-2 transition-all duration-[var(--duration-slow)] ease-[var(--ease-emphasized)]"
        role="search"
        aria-label="VDOC prompt"
      >
        <label htmlFor="ds-prompt" className="sr-only">
          Prompt VDOC
        </label>
        <textarea
          id="ds-prompt"
          rows={2}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              submit()
            }
          }}
          placeholder={placeholder}
          className="w-full resize-none bg-transparent px-4 py-3 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
        <div className="flex items-center justify-between gap-3 px-2 pb-1">
          <button
            type="button"
            aria-pressed={listening}
            onClick={() => onListeningChange?.(!listening)}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <AudioLines className={cn('size-4', listening && 'text-cyan')} aria-hidden />
            {listening ? 'Listening…' : 'Voice'}
          </button>
          <DsButton
            type="submit"
            size="icon"
            variant="lunar"
            disabled={!value.trim()}
            aria-label="Send prompt"
            className="rounded-full"
          >
            <ArrowUp className="size-5" />
          </DsButton>
        </div>
      </form>

      {suggestions && suggestions.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Suggestions">
          {suggestions.map((s) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => setValue(s)}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-left text-[13px] text-muted-foreground transition-all duration-[var(--duration-normal)] hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-foreground"
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export { DsPromptInput }
