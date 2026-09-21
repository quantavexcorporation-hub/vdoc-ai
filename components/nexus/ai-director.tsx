'use client'

import * as React from 'react'
import { ArrowUp, Bot, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { routeTask, emitNexusEvent, type ControlMode } from '@/lib/nexus/orchestrator'
import { appendMemory } from '@/lib/nexus/memory'

type Msg = { id: string; role: 'user' | 'director'; text: string; meta?: string }

const SUGGESTIONS = [
  'Create a cinematic trailer.',
  'Make this scene darker.',
  'Create three alternative endings.',
  'Turn this episode into five Shorts.',
  'Analyze why this video lost viewers.',
]

function directorReply(input: string, mode: ControlMode): { text: string; meta: string } {
  const lower = input.toLowerCase()
  let task: Parameters<typeof routeTask>[0] = 'idea'
  if (lower.includes('trailer') || lower.includes('video') || lower.includes('short'))
    task = 'video-gen'
  else if (lower.includes('scene') || lower.includes('dark') || lower.includes('edit'))
    task = 'edit'
  else if (lower.includes('ending') || lower.includes('script') || lower.includes('episode'))
    task = 'script'
  else if (lower.includes('thumbnail') || lower.includes('poster')) task = 'image-gen'
  else if (lower.includes('analy') || lower.includes('retention') || lower.includes('audience'))
    task = 'analyze'
  else if (lower.includes('music') || lower.includes('score')) task = 'music'
  else if (lower.includes('voice') || lower.includes('dub')) task = 'voice'

  const plan = routeTask(task)
  emitNexusEvent('generation.created', { task, model: plan.model.id, mode })
  appendMemory({
    projectId: 'proj-aurora',
    kind: 'prompt',
    text: input,
  })
  appendMemory({
    projectId: 'proj-aurora',
    kind: 'generation',
    text: plan.rationale,
  })

  const modeLine =
    mode === 'autopilot'
      ? 'Autopilot: executing approved workflow with checkpoints.'
      : mode === 'copilot'
        ? 'Co-pilot: I will draft; you approve each stage.'
        : 'Assist: recommendations only — you decide.'

  return {
    meta: plan.rationale,
    text: `${modeLine}\n\nUnderstood: “${input}”\n\nI’m operating tools against Project Aurora memory (Neo Harbor, Nova Ellison, 35mm look). Next: stage a plan with ${plan.model.label}, then quality-check before commit.\n\nSay “proceed” to run, or refine the brief.`,
  }
}

export function AiDirector({
  mode,
  className,
}: {
  mode: ControlMode
  className?: string
}) {
  const [msgs, setMsgs] = React.useState<Msg[]>([
    {
      id: 'm0',
      role: 'director',
      text: 'AI Engine online. I orchestrate story, video, audience, and distribution against your data layer — I don’t just chat. What should we create?',
    },
  ])
  const [value, setValue] = React.useState('')
  const endRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  const send = (text: string) => {
    const q = text.trim()
    if (!q) return
    const userMsg: Msg = { id: `u_${Date.now()}`, role: 'user', text: q }
    const reply = directorReply(q, mode)
    const dirMsg: Msg = {
      id: `d_${Date.now()}`,
      role: 'director',
      text: reply.text,
      meta: reply.meta,
    }
    setMsgs((m) => [...m, userMsg, dirMsg])
    setValue('')
  }

  return (
    <aside
      className={cn(
        'flex h-full w-full flex-col border-l border-white/[0.06] bg-[#101012]',
        className
      )}
      aria-label="AI Director"
    >
      <div className="vdoc-machine-scan flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="flex size-8 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
          <Bot className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-white/90">AI Engine</p>
          <p className="font-mono text-[10px] tracking-[0.08em] text-white/35">
            Director · tools · memory
          </p>
        </div>
        <span className="rounded border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-emerald-300">
          Live
        </span>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3 scrollbar-none">
        {msgs.map((m) => (
          <div
            key={m.id}
            className={cn(
              'rounded-xl px-3 py-2.5 text-[13px] leading-relaxed',
              m.role === 'user'
                ? 'ml-6 bg-white/[0.08] text-white/90'
                : 'mr-2 border border-white/[0.06] bg-white/[0.03] text-white/70'
            )}
          >
            {m.role === 'director' && (
              <span className="mb-1.5 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-cyan/70">
                <Sparkles className="size-3" aria-hidden />
                Director
              </span>
            )}
            <p className="whitespace-pre-wrap">{m.text}</p>
            {m.meta && (
              <p className="mt-2 border-t border-white/[0.05] pt-2 font-mono text-[10px] text-white/30">
                {m.meta}
              </p>
            )}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="border-t border-white/[0.06] p-3">
        <div className="mb-2 flex gap-1.5 overflow-x-auto scrollbar-none">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="shrink-0 rounded-full border border-white/[0.08] px-2.5 py-1 text-[11px] text-white/45 transition-colors hover:border-white/15 hover:text-white/80"
            >
              {s}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(value)
          }}
          className="flex items-end gap-2 rounded-xl border border-white/[0.1] bg-[#2a2a2a] p-2"
        >
          <textarea
            rows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send(value)
              }
            }}
            placeholder="Direct the engine…"
            className="min-h-[2.5rem] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-white/90 placeholder:text-white/30 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send"
            className={cn(
              'mb-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors',
              value.trim()
                ? 'bg-white text-[#141414]'
                : 'bg-white/10 text-white/30'
            )}
          >
            <ArrowUp className="size-4" />
          </button>
        </form>
      </div>
    </aside>
  )
}
