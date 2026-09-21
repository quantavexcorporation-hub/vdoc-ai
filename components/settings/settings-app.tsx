'use client'

import * as React from 'react'
import Link from 'next/link'
import { VdocShell } from '@/components/os/vdoc-shell'
import { LivingAtmosphere } from '@/components/os/living-atmosphere'
import { HomeFooter } from '@/components/home/home-footer'
import {
  disableCreator,
  enableCreator,
  isCreator,
} from '@/lib/nexus/access'
import {
  readUserFocus,
  readUserName,
  writeUserFocus,
  writeUserName,
} from '@/lib/os/user-space'

export function SettingsApp() {
  const [creator, setCreator] = React.useState(false)
  const [ready, setReady] = React.useState(false)
  const [name, setName] = React.useState('')
  const [focus, setFocus] = React.useState('')

  React.useEffect(() => {
    setCreator(isCreator())
    setName(readUserName())
    setFocus(readUserFocus())
    setReady(true)
  }, [])

  return (
    <VdocShell mood="intelligence">
      <LivingAtmosphere intensity="subtle" />
      <main className="mx-auto max-w-3xl px-3 py-8 sm:px-4 sm:py-10 md:px-8 md:py-14">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
          Settings
        </p>
        <h1 className="mt-2 font-display text-[clamp(1.5rem,5vw,1.875rem)] font-semibold tracking-tight text-white/95 md:text-3xl">
          Platform controls
        </h1>
        <p className="mt-2 max-w-xl text-sm text-white/45">
          Profile and space role. Video Genesis lives in its own sidebar section.
        </p>

        <div className="mt-8 grid gap-4">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
            <p className="text-sm font-medium text-white/85">Your profile</p>
            <p className="mt-1 text-sm text-white/40">
              Shown on the dashboard greeting — name and current thread.
            </p>
            <label className="mt-4 block text-[11px] uppercase tracking-wider text-white/35">
              Display name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => writeUserName(name)}
                className="mt-1.5 w-full rounded-xl border border-white/[0.1] bg-black/30 px-3 py-2 text-sm text-white/90 outline-none focus:border-white/20"
                placeholder="Your name"
              />
            </label>
            <label className="mt-3 block text-[11px] uppercase tracking-wider text-white/35">
              Current focus
              <input
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                onBlur={() => writeUserFocus(focus)}
                className="mt-1.5 w-full rounded-xl border border-white/[0.1] bg-black/30 px-3 py-2 text-sm text-white/90 outline-none focus:border-white/20"
                placeholder="What you are watching or building"
              />
            </label>
            <button
              type="button"
              onClick={() => {
                writeUserName(name)
                writeUserFocus(focus)
              }}
              className="mt-3 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-[#141414]"
            >
              Save profile
            </button>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
            <p className="text-sm font-medium text-white/85">Space role</p>
            <p className="mt-2 text-sm text-white/40">
              {ready
                ? creator
                  ? 'Creator — Video Genesis unlocked from the sidebar.'
                  : 'Audience — switch to Creator to open Video Genesis.'
                : 'Loading…'}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  enableCreator()
                  setCreator(true)
                }}
                className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${
                  creator
                    ? 'bg-white text-[#141414]'
                    : 'border border-white/15 text-white/60 hover:bg-white/[0.05]'
                }`}
              >
                Creator
              </button>
              <button
                type="button"
                onClick={() => {
                  disableCreator()
                  setCreator(false)
                }}
                className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${
                  !creator
                    ? 'bg-white text-[#141414]'
                    : 'border border-white/15 text-white/60 hover:bg-white/[0.05]'
                }`}
              >
                Audience
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
            <p className="text-sm font-medium text-white/85">Virtual Economy</p>
            <p className="mt-2 text-sm text-white/40">
              Ownership and V-Fi remain on their existing routes for everyone.
            </p>
            <Link
              href="/economy"
              className="mt-3 inline-flex text-sm text-cyan/80 hover:text-cyan"
            >
              Open Virtual Economy →
            </Link>
          </div>
        </div>
      </main>
      <HomeFooter />
    </VdocShell>
  )
}
