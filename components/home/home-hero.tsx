'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowUp, AudioLines, Clapperboard, Play, Sparkles, Wand2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getSpaceRole } from '@/lib/nexus/access'
import {
  DEFAULT_FOCUS,
  DEFAULT_USER_NAME,
  readUserFocus,
  readUserName,
  timeGreeting,
} from '@/lib/os/user-space'

/**
 * Quantrion-style dashboard welcome — user name + data, not brand logo/tagline.
 */
export function HomeHero() {
  const router = useRouter()
  const [value, setValue] = React.useState('')
  const [listening, setListening] = React.useState(false)
  const [userName, setUserName] = React.useState(DEFAULT_USER_NAME)
  const [focus, setFocus] = React.useState(DEFAULT_FOCUS)
  const [role, setRole] = React.useState<'audience' | 'creator'>('audience')
  const [greeting, setGreeting] = React.useState('Welcome')
  const [readyPct] = React.useState(72)

  React.useEffect(() => {
    setUserName(readUserName())
    setFocus(readUserFocus())
    setRole(getSpaceRole())
    setGreeting(timeGreeting())
  }, [])

  const submit = () => {
    const q = value.trim()
    window.dispatchEvent(new CustomEvent('vdoc-floor-ask', { detail: { prompt: q } }))
    setValue('')
  }

  return (
    <section
      id="enter"
      className="relative px-3 pb-8 pt-5 sm:px-4 sm:pb-10 sm:pt-8 md:px-8 md:pb-12 md:pt-10"
      aria-labelledby="home-headline"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 sm:p-5 md:p-6">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/35">
            Welcome intelligence
          </p>
          <h1
            id="home-headline"
            className="font-display text-[clamp(1.5rem,5vw,2.5rem)] font-semibold tracking-tight text-white/95"
          >
            {greeting}, <span className="text-cyan">{userName}</span>
          </h1>
          <p className="mt-1.5 text-sm text-white/45">
            {role === 'creator' ? 'Creator space' : 'Audience space'} · Watching {focus}
          </p>

          <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/25 p-3 sm:mt-5 sm:p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-md bg-cyan/10 text-cyan">
                <Sparkles className="size-3.5" aria-hidden />
              </span>
              <span className="text-sm font-medium text-white/90">Today&apos;s AI Recommendation</span>
            </div>
            <p className="text-sm leading-relaxed text-white/45">
              You are{' '}
              <span className="font-semibold text-white/90">{readyPct}% synced</span> with your
              entertainment thread. Continue {focus.split('·')[0]?.trim() || 'your world'}, or
              generate a new branch — optimal window now.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => router.push('/converse')}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-medium text-[#141414] transition-opacity hover:opacity-90"
            >
              <Play className="size-3.5" aria-hidden />
              Continue watching
            </button>
            <button
              type="button"
              onClick={() => router.push('/converse')}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs text-white/75 transition-colors hover:bg-white/[0.05]"
            >
              <Wand2 className="size-3.5" aria-hidden />
              Create something
            </button>
            <button
              type="button"
              onClick={() => router.push(role === 'creator' ? '/video-genesis' : '/settings')}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs text-white/75 transition-colors hover:bg-white/[0.05]"
            >
              <Clapperboard className="size-3.5" aria-hidden />
              {role === 'creator' ? 'Open Video Genesis' : 'Studio settings'}
            </button>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
          className="vdoc-composer mt-5 text-left"
          role="search"
          aria-label="VDOC prompt"
        >
          <label htmlFor="home-prompt" className="sr-only">
            Tell VDOC what to create
          </label>
          <textarea
            id="home-prompt"
            rows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                submit()
              }
            }}
            placeholder={`Ask the OS, ${userName === '…' ? 'friend' : userName}…`}
            className="w-full resize-none bg-transparent px-4 pb-2 pt-3.5 text-[15px] leading-relaxed text-white/90 placeholder:text-white/35 focus:outline-none"
          />
          <div className="flex items-center justify-between gap-2 px-2 pb-2">
            <button
              type="button"
              aria-pressed={listening}
              onClick={() => setListening((v) => !v)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors',
                listening
                  ? 'bg-white/[0.08] text-white/90'
                  : 'text-white/40 hover:bg-white/[0.05] hover:text-white/70'
              )}
            >
              <AudioLines className="size-3.5" aria-hidden />
              {listening ? 'Listening…' : 'Voice'}
            </button>
            <button
              type="submit"
              aria-label="Enter VDOC"
              className={cn(
                'inline-flex size-8 items-center justify-center rounded-full transition-colors',
                value.trim()
                  ? 'bg-white text-[#171717] hover:bg-white/90'
                  : 'bg-white/15 text-white/40'
              )}
            >
              <ArrowUp className="size-4" aria-hidden />
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { label: 'Something emotional', href: '/universe?c=stories' },
            { label: 'Cyberpunk', href: '/universe?c=games' },
            { label: 'Generate horror', href: '/universe?c=movies' },
            { label: 'Continue yesterday', href: '/converse' },
            { label: 'Create something new', href: '/converse' },
          ].map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => router.push(chip.href)}
              className="rounded-full border border-white/[0.08] bg-transparent px-3 py-1.5 text-xs text-white/50 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04] hover:text-white/80"
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
