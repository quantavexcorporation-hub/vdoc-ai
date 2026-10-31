'use client'

import * as React from 'react'
import { ArrowUp, Brain } from 'lucide-react'
import { buildResponse, detectMode, streamText } from '@/lib/converse/ai'
import { cn } from '@/lib/utils'

type Turn = {
  id: string
  role: 'user' | 'assistant'
  content: string
  streaming?: boolean
}

const STARTERS = [
  'What should I watch tonight?',
  'Open a quiet story',
  'Open collectible cards',
  'Open a novel',
]

function uid() {
  return `dash-${Math.random().toString(36).slice(2, 9)}`
}

function plain(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')
}

export function DashboardAssistant() {
  const [turns, setTurns] = React.useState<Turn[]>([])
  const [value, setValue] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const abortRef = React.useRef<AbortController | null>(null)
  const sendRef = React.useRef<(raw: string) => Promise<void>>(async () => {})

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [turns])

  const send = React.useCallback(async (raw: string) => {
    const prompt = raw.trim()
    if (!prompt) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    const user: Turn = { id: uid(), role: 'user', content: prompt }
    const assistantId = uid()
    setValue('')
    setBusy(true)
    setTurns((prev) => [
      ...prev,
      user,
      { id: assistantId, role: 'assistant', content: '', streaming: true },
    ])

    const reply = buildResponse(prompt, [], detectMode(prompt))
    await streamText(reply, {
      signal: controller.signal,
      onToken: (token) => {
        setTurns((prev) =>
          prev.map((turn) =>
            turn.id === assistantId ? { ...turn, content: turn.content + token } : turn
          )
        )
      },
      onDone: () => {
        setTurns((prev) =>
          prev.map((turn) => (turn.id === assistantId ? { ...turn, streaming: false } : turn))
        )
        setBusy(false)
      },
    })
    setBusy(false)
  }, [])

  sendRef.current = send

  React.useEffect(() => {
    const onAsk = (event: Event) => {
      const prompt = (event as CustomEvent<{ prompt?: string }>).detail?.prompt
      document.getElementById('ai-assistant')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (typeof prompt === 'string' && prompt.trim()) {
        void sendRef.current(prompt)
      }
    }
    window.addEventListener('vdoc-floor-ask', onAsk)
    return () => window.removeEventListener('vdoc-floor-ask', onAsk)
  }, [])

  return (
    <section
      id="ai-assistant"
      className="relative border-t border-white/[0.06] px-3 py-8 sm:px-6 sm:py-10 md:px-8"
      aria-labelledby="dashboard-assistant-title"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-4 flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
            <Brain className="size-4" aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/35">
              On this floor
            </p>
            <h2
              id="dashboard-assistant-title"
              className="mt-1 font-display text-lg font-semibold tracking-tight text-white/95"
            >
              AI Assistant
            </h2>
            <p className="mt-1 text-sm text-white/45">
              Ask here. Guided floor · replies are written here, not by a live model.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03]">
          <div className="max-h-[22rem] min-h-[10rem] space-y-3 overflow-y-auto px-4 py-4">
            {turns.length === 0 ? (
              <p className="text-sm text-white/40">
                Tell it a mood, a title, or a night. It stays on the dashboard.
              </p>
            ) : (
              turns.map((turn) => (
                <div
                  key={turn.id}
                  className={cn(
                    'max-w-[90%] rounded-xl px-3 py-2 text-sm leading-relaxed',
                    turn.role === 'user'
                      ? 'ml-auto bg-white/[0.08] text-white/90'
                      : 'bg-black/25 text-white/70'
                  )}
                >
                  {plain(turn.content) || (turn.streaming ? '…' : '')}
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>

          <div className="flex flex-wrap gap-2 border-t border-white/[0.06] px-4 py-3">
            {STARTERS.map((starter) => (
              <button
                key={starter}
                type="button"
                onClick={() => send(starter)}
                className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-white/50 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04] hover:text-white/80"
              >
                {starter}
              </button>
            ))}
          </div>

          <form
            className="flex items-end gap-2 border-t border-white/[0.06] px-3 py-3"
            onSubmit={(e) => {
              e.preventDefault()
              void send(value)
            }}
          >
            <label htmlFor="dashboard-assistant-prompt" className="sr-only">
              Ask the AI Assistant
            </label>
            <textarea
              id="dashboard-assistant-prompt"
              rows={2}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  void send(value)
                }
              }}
              placeholder="Ask the assistant…"
              className="min-h-11 w-full resize-none bg-transparent px-2 py-2 text-sm text-white/90 placeholder:text-white/35 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={busy || !value.trim()}
              className={cn(
                'mb-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors',
                value.trim() && !busy
                  ? 'bg-white text-[#171717] hover:bg-white/90'
                  : 'bg-white/15 text-white/40'
              )}
            >
              <ArrowUp className="size-4" aria-hidden />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
