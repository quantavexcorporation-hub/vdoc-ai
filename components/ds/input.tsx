import * as React from 'react'
import { cn } from '@/lib/utils'

export interface DsInputProps extends React.ComponentProps<'input'> {
  label?: string
  hint?: string
  error?: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
}

function DsInput({
  className,
  label,
  hint,
  error,
  leading,
  trailing,
  id,
  ...props
}: DsInputProps) {
  const inputId = id ?? React.useId()

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="ds-label">
          {label}
        </label>
      )}
      <div
        className={cn(
          'group relative flex h-11 items-center gap-2 rounded-[var(--radius-lg)] border bg-white/[0.03] px-3',
          'transition-all duration-[var(--duration-normal)] ease-[var(--ease-standard)]',
          'focus-within:border-cyan/40 focus-within:shadow-[var(--shadow-focus)]',
          error ? 'border-error/50' : 'border-white/10 hover:border-white/16',
          className
        )}
      >
        {leading && (
          <span className="shrink-0 text-muted-foreground" aria-hidden>
            {leading}
          </span>
        )}
        <input
          id={inputId}
          data-slot="ds-input"
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {trailing && (
          <span className="shrink-0 text-muted-foreground" aria-hidden>
            {trailing}
          </span>
        )}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="ds-caption text-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="ds-caption">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export { DsInput }
