'use client'

import * as React from 'react'
import type { StoryPayload } from '@/lib/converse/types'
import { cn } from '@/lib/utils'

export function StoryPlayer({ story }: { story: StoryPayload }) {
  const [nodeId, setNodeId] = React.useState(story.startId)
  const [history, setHistory] = React.useState<string[]>([story.startId])
  const node = story.nodes[nodeId]

  if (!node) return null

  return (
    <div className="converse-story my-4 max-w-xl animate-rise rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
      <p className="ds-label mb-3">{story.title}</p>
      <p className="text-[15px] leading-relaxed text-lunar/90 whitespace-pre-wrap">
        {node.text.replace(/\*\*(.*?)\*\*/g, '$1')}
      </p>

      {node.choices && node.choices.length > 0 ? (
        <div className="mt-5 flex flex-col gap-2">
          {node.choices.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setNodeId(c.next)
                setHistory((h) => [...h, c.next])
              }}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-left text-sm text-lunar transition-all duration-[var(--duration-normal)] ease-[var(--ease-emphasized)] hover:border-cyan/30 hover:bg-cyan/5 hover:translate-x-0.5 active:scale-[0.99]"
            >
              {c.label}
            </button>
          ))}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setNodeId(story.startId)
            setHistory([story.startId])
          }}
          className="mt-5 text-sm text-cyan hover:underline"
        >
          Restart story
        </button>
      )}

      <div className="mt-4 flex gap-1">
        {history.map((id, i) => (
          <button
            key={`${id}-${i}`}
            type="button"
            onClick={() => {
              setNodeId(id)
              setHistory((h) => h.slice(0, i + 1))
            }}
            className={cn(
              'size-1.5 rounded-full transition-colors',
              id === nodeId ? 'bg-cyan' : 'bg-white/20 hover:bg-white/40'
            )}
            aria-label={`Step ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
