'use client'

import * as React from 'react'
import { X } from 'lucide-react'

type Node = {
  kicker: string
  text: string
  choices?: { id: string; label: string; next: string }[]
}

const NODES: Record<string, Node> = {
  start: {
    kicker: 'The Listening Forest',
    text: 'Rain has just stopped. The trees keep a ledger of the words you never said. Two paths are open, and only one of them will still be here when you leave.',
    choices: [
      { id: 'light', label: 'Follow the pale trunks', next: 'light' },
      { id: 'dark', label: 'Step into the denser dark', next: 'dark' },
    ],
  },
  light: {
    kicker: 'The unsent',
    text: 'The pale trunks are glass. Inside each one is a message you wrote and never sent. The oldest one still has your handwriting.',
    choices: [
      { id: 'send', label: 'Send the oldest letter', next: 'letter' },
      { id: 'keep', label: 'Leave it sealed', next: 'kept' },
    ],
  },
  dark: {
    kicker: 'The voice',
    text: 'Something in the dark says your name the way you use it when nobody is listening. It is waiting for a trade, or for a question.',
    choices: [
      { id: 'ask', label: 'Ask what it remembers', next: 'name' },
      { id: 'trade', label: 'Offer the sentence you withheld', next: 'door' },
    ],
  },
  letter: {
    kicker: 'Ending · The Letter',
    text: 'You send it. The glass goes clear, the rain starts again, and the forest stops keeping that one. You walk out with wet sleeves and one fewer unsent thing.',
  },
  kept: {
    kicker: 'Ending · The Kept',
    text: 'You leave the letter where it is. The trunk warms under your hand, like a promise accepted. You are lighter because you chose not to spend it.',
  },
  name: {
    kicker: 'Ending · The Name',
    text: 'It answers with the name, then the reason you stopped using it. You say it once, out loud. The dark thins. You keep the name. The forest does not.',
  },
  door: {
    kicker: 'Ending · The Door',
    text: 'You give it the sentence. A door appears that only opens when you stop looking for it. You turn your back. The latch clicks. You step through without checking who followed.',
  },
}

export function ListeningForest({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [id, setId] = React.useState('start')
  const closeRef = React.useRef<HTMLButtonElement>(null)
  const node = NODES[id]

  React.useEffect(() => {
    if (!open) return
    setId('start')
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open || !node) return null

  const ended = !node.choices?.length

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="The Listening Forest"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        aria-label="Close story"
        tabIndex={-1}
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[100dvh] w-full max-w-xl flex-col overflow-y-auto rounded-t-[var(--radius-2xl)] border border-white/10 bg-[#0c1410] p-5 shadow-[var(--shadow-xl)] sm:max-h-[85dvh] sm:rounded-[var(--radius-2xl)] sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <p className="ds-label text-cyan">{node.kicker}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 p-2 text-white/60 hover:text-white"
            aria-label="Close story"
          >
            <X className="size-4" />
          </button>
        </div>
        <p className="font-display text-[clamp(1.35rem,4vw,1.85rem)] font-medium leading-snug tracking-tight text-lunar">
          {node.text}
        </p>
        {node.choices ? (
          <div className="mt-8 flex flex-col gap-2">
            {node.choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => setId(choice.next)}
                className="min-h-12 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-lunar transition-colors hover:border-cyan/40 hover:bg-cyan/10"
              >
                {choice.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setId('start')}
              className="min-h-11 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#141414]"
            >
              Walk in again
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80"
            >
              Leave the forest
            </button>
          </div>
        )}
        {ended ? (
          <p className="mt-6 text-xs text-white/40">
            This ending stays on this screen. Nothing is saved to an account.
          </p>
        ) : null}
      </div>
    </div>
  )
}
