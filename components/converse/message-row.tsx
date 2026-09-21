'use client'

import * as React from 'react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Pencil,
  RotateCcw,
} from 'lucide-react'
import type { Message } from '@/lib/converse/types'
import { getBranchMeta, useConverse } from '@/lib/converse/store'
import { Markdown } from './markdown'
import { MediaCard } from './media-card'
import { StoryPlayer } from './story-player'
import { AiThinking, LiveGenerationStrip } from '@/components/motion/ai-states'
import { cn } from '@/lib/utils'

export function MessageRow({ message }: { message: Message }) {
  const { active, retry, editAndResend, navigateBranch, dispatch } = useConverse()
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(message.content)
  const [copied, setCopied] = React.useState(false)
  const isUser = message.role === 'user'
  const branch = active ? getBranchMeta(active, message) : { index: 1, total: 1 }

  const copy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1200)
  }

  return (
    <article
      className={cn(
        'group converse-msg relative w-full animate-rise',
        isUser ? 'pl-8 sm:pl-16' : 'pr-4 sm:pr-8'
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-2xl',
          isUser && 'flex justify-end'
        )}
      >
        {isUser ? (
          <div className="max-w-[min(100%,36rem)]">
            {editing ? (
              <div className="rounded-2xl border border-cyan/30 bg-white/[0.04] p-3">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                  className="w-full resize-none bg-transparent text-[15px] leading-relaxed text-lunar focus:outline-none"
                  autoFocus
                />
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false)
                      setDraft(message.content)
                    }}
                    className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(false)
                      void editAndResend(message.id, draft)
                    }}
                    className="rounded-lg bg-cyan px-3 py-1.5 text-xs font-medium text-space"
                  >
                    Save & branch
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl rounded-br-md bg-white/[0.07] px-4 py-3 text-[15px] leading-relaxed text-lunar">
                {message.content}
                {message.attachments && message.attachments.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {message.attachments.map((a) => (
                      <li
                        key={a.id}
                        className="rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-[11px] text-muted-foreground"
                      >
                        {a.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full">
            {message.streaming && !message.content ? (
              <AiThinking label="Composing" />
            ) : (
              <>
                <Markdown content={message.content} streaming={message.streaming} />
                {message.streaming && message.content && (
                  <LiveGenerationStrip tokenHint={message.content.length} />
                )}
              </>
            )}
            {message.media && <MediaCard media={message.media} />}
            {message.story && <StoryPlayer story={message.story} />}
          </div>
        )}

        {/* Actions */}
        <div
          className={cn(
            'mt-2 flex items-center gap-0.5 opacity-100 transition-opacity duration-[var(--duration-fast)] md:opacity-0 md:group-hover:opacity-100 focus-within:!opacity-100',
            isUser && 'justify-end',
            message.streaming && 'pointer-events-none opacity-0'
          )}
        >
          {branch.total > 1 && (
            <div className="mr-1 flex items-center gap-0.5 text-[11px] text-muted-foreground">
              <button
                type="button"
                disabled={branch.index <= 1}
                onClick={() => navigateBranch(message.id, -1)}
                className="rounded-md p-1 hover:bg-white/[0.06] disabled:opacity-30"
                aria-label="Previous branch"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <span className="tabular-nums">
                {branch.index}/{branch.total}
              </span>
              <button
                type="button"
                disabled={branch.index >= branch.total}
                onClick={() => navigateBranch(message.id, 1)}
                className="rounded-md p-1 hover:bg-white/[0.06] disabled:opacity-30"
                aria-label="Next branch"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          )}

          {!isUser && message.versions.length > 1 && active && (
            <div className="mr-1 flex items-center gap-0.5 text-[11px] text-muted-foreground">
              <button
                type="button"
                disabled={message.activeVersion <= 0}
                onClick={() =>
                  dispatch({
                    type: 'SET_ACTIVE_VERSION',
                    conversationId: active.id,
                    messageId: message.id,
                    index: message.activeVersion - 1,
                  })
                }
                className="rounded-md p-1 hover:bg-white/[0.06] disabled:opacity-30"
                aria-label="Previous version"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <span className="tabular-nums">
                v{message.activeVersion + 1}/{message.versions.length}
              </span>
              <button
                type="button"
                disabled={message.activeVersion >= message.versions.length - 1}
                onClick={() =>
                  dispatch({
                    type: 'SET_ACTIVE_VERSION',
                    conversationId: active.id,
                    messageId: message.id,
                    index: message.activeVersion + 1,
                  })
                }
                className="rounded-md p-1 hover:bg-white/[0.06] disabled:opacity-30"
                aria-label="Next version"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={copy}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
            aria-label="Copy"
          >
            {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
          </button>

          {isUser && !editing && (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
              aria-label="Edit prompt"
            >
              <Pencil className="size-3.5" />
            </button>
          )}

          {!isUser && (
            <button
              type="button"
              onClick={() => void retry(message.id)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
              aria-label="Retry"
            >
              <RotateCcw className="size-3.5" />
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
