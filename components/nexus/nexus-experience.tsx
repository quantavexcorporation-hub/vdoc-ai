'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  ChevronDown,
  Command,
  PanelRight,
  X,
} from 'lucide-react'
import { BrandLogo } from '@/components/brand/logo'
import { AiDirector } from '@/components/nexus/ai-director'
import { NexusView } from '@/components/nexus/nexus-views'
import {
  NEXUS_NAV,
  NEXUS_VIEW_META,
  isNexusViewId,
  type NexusViewId,
} from '@/lib/nexus/nav'
import type { ControlMode } from '@/lib/nexus/orchestrator'
import { cn } from '@/lib/utils'

/**
 * Video Genesis — Creative OS shell.
 * Separate from entertainment HomeChrome; does not alter existing platform chrome.
 */
export function NexusExperience() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const raw = searchParams.get('v')
  const view: NexusViewId = isNexusViewId(raw) ? raw : 'home'

  const [mode, setMode] = React.useState<ControlMode>('copilot')
  const [directorOpen, setDirectorOpen] = React.useState(true)
  const [moreOpen, setMoreOpen] = React.useState(false)
  const [cmd, setCmd] = React.useState('')
  const [mobileNav, setMobileNav] = React.useState(false)
  const [mobileDirector, setMobileDirector] = React.useState(false)

  const meta = NEXUS_VIEW_META[view]

  const go = (id: NexusViewId) => {
    router.replace(`/video-genesis?v=${id}`, { scroll: false })
    setMobileNav(false)
    setMoreOpen(false)
  }

  const runCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const q = cmd.trim().toLowerCase()
    if (!q) return
    if (q.startsWith('create')) go('create')
    else if (q.includes('analy')) go('analytics')
    else if (q.includes('idea')) go('idea-lab')
    else if (q.includes('audience')) go('audience')
    else if (q.includes('distribut')) go('distribution')
    else if (q.includes('project')) go('projects')
    else go('create')
    setCmd('')
  }

  const primaryItems = NEXUS_NAV.flatMap((g) => g.items.filter((i) => i.primary))
  const secondaryItems = NEXUS_NAV.flatMap((g) => g.items.filter((i) => !i.primary))

  const NavList = ({ items }: { items: typeof primaryItems }) => (
    <ul className="space-y-0.5">
      {items.map((item) => {
        const Icon = item.icon
        const active = item.id === view
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => go(item.id)}
              className={cn(
                'flex min-h-11 w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors',
                active
                  ? 'bg-white/[0.09] font-medium text-white'
                  : 'text-white/50 hover:bg-white/[0.05] hover:text-white/85'
              )}
            >
              <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
              <span className="truncate">{item.label}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className="vdoc-vg-shell flex h-dvh max-h-dvh overflow-hidden text-foreground">
      {/* Video Genesis left rail */}
      <aside className="hidden w-[248px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0e0e10]/95 lg:flex">
        <div className="vdoc-machine-scan flex items-center gap-2 border-b border-white/[0.06] px-3 py-3">
          <BrandLogo href={null} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold tracking-wide text-white/90">
              Video Genesis
            </p>
            <p className="truncate font-mono text-[9px] tracking-[0.12em] text-cyan/50">
              AI ENGINE · DATA LAYER
            </p>
          </div>
        </div>
        <div className="px-2 pt-3">
          <Link
            href="/"
            className="mb-2 flex min-h-10 items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-white/40 hover:bg-white/[0.05] hover:text-white/70"
          >
            <ArrowLeft className="size-3.5" />
            Back to Dashboard
          </Link>
        </div>
        <nav className="min-h-0 flex-1 overflow-y-auto px-2 pb-3 scrollbar-none" aria-label="Video Genesis">
          <p className="mb-1.5 px-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
            Studio
          </p>
          <NavList items={primaryItems} />
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/30 hover:text-white/50"
            >
              More modules
              <ChevronDown
                className={cn('size-3.5 transition-transform', moreOpen && 'rotate-180')}
              />
            </button>
            {moreOpen && <NavList items={secondaryItems} />}
          </div>
        </nav>
        <div className="border-t border-white/[0.06] p-3">
          <p className="font-mono text-[9px] tracking-[0.16em] text-white/28">
            INTENT → ENGINE → DATA → CREATION
          </p>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 flex-wrap items-center gap-2 border-b border-white/[0.06] bg-[#101012]/95 px-2 py-2 backdrop-blur sm:px-3 md:px-5 md:py-2.5">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg text-white/50 hover:bg-white/[0.05] lg:hidden"
            aria-label="Open Video Genesis menu"
            onClick={() => setMobileNav(true)}
          >
            <ChevronDown className="size-5 rotate-[-90deg]" />
          </button>
          <div className="min-w-0 flex-1 basis-[40%]">
            <h1 className="truncate text-sm font-semibold text-white/90 md:text-base">
              {meta.title}
            </h1>
            <p className="hidden truncate text-[12px] text-white/35 sm:block">{meta.subtitle}</p>
          </div>

          <div className="hidden items-center gap-2 font-mono text-[9px] tracking-[0.14em] text-white/25 md:flex">
            <span className="size-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            ENGINE
          </div>

          <div className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-lg border border-white/[0.08] bg-black/20 p-0.5 scrollbar-none">
            {([
              ['assist', 'Assist'],
              ['copilot', 'Co-pilot'],
              ['autopilot', 'Auto'],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={cn(
                  'shrink-0 rounded-md px-2 py-1.5 text-[10px] transition-colors sm:text-[11px]',
                  mode === id
                    ? 'bg-white/[0.12] text-white'
                    : 'text-white/40 hover:text-white/70'
                )}
              >
                <span className="sm:hidden">{label === 'Co-pilot' ? 'Co' : label}</span>
                <span className="hidden sm:inline">
                  {id === 'autopilot' ? 'Autopilot' : label}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
                setDirectorOpen((v) => !v)
              } else {
                setMobileDirector(true)
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-[11px] text-white/50 hover:text-white/80"
          >
            <PanelRight className="size-3.5" />
            <span className="hidden xs:inline sm:inline">Director</span>
          </button>
        </header>

        <form
          onSubmit={runCommand}
          className="flex shrink-0 items-center gap-2 border-b border-white/[0.05] bg-black/20 px-3 py-2.5 md:px-5"
        >
          <Command className="size-4 shrink-0 text-cyan/50" aria-hidden />
          <input
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            placeholder="Command: Create · Analyze · Edit…"
            className="min-w-0 flex-1 bg-transparent font-mono text-[13px] text-white/80 placeholder:text-white/28 focus:outline-none"
          />
        </form>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:p-4 md:p-6">
          <NexusView view={view} onNavigate={go} />
        </div>
      </div>

      {directorOpen && (
        <div className="hidden w-[min(100%,360px)] shrink-0 lg:block">
          <AiDirector mode={mode} className="h-full" />
        </div>
      )}

      {/* Mobile / tablet nav drawer */}
      {mobileNav && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close"
            onClick={() => setMobileNav(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[min(86vw,300px)] flex-col bg-[#121212] pb-[env(safe-area-inset-bottom,0px)] pt-[env(safe-area-inset-top,0px)]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-3">
              <p className="text-sm font-medium text-white/90">Video Genesis</p>
              <button
                type="button"
                onClick={() => setMobileNav(false)}
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center"
              >
                <X className="size-4 text-white/50" />
              </button>
            </div>
            <div className="px-2 pt-2">
              <Link
                href="/"
                className="mb-2 flex min-h-10 items-center gap-2 rounded-lg px-2.5 py-2 text-xs text-white/40 hover:bg-white/[0.05]"
              >
                <ArrowLeft className="size-3.5" />
                Back to Dashboard
              </Link>
            </div>
            <nav className="flex-1 overflow-y-auto p-2">
              <NavList items={[...primaryItems, ...secondaryItems]} />
            </nav>
          </div>
        </div>
      )}

      {/* Mobile AI Director sheet */}
      {mobileDirector && (
        <div className="fixed inset-0 z-[85] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            aria-label="Close director"
            onClick={() => setMobileDirector(false)}
          />
          <div className="absolute inset-x-0 bottom-0 flex h-[min(88dvh,640px)] flex-col rounded-t-2xl border-t border-white/[0.08] bg-[#101012] pb-[env(safe-area-inset-bottom,0px)]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <p className="text-sm font-medium text-white/90">AI Engine</p>
              <button
                type="button"
                onClick={() => setMobileDirector(false)}
                aria-label="Close"
                className="inline-flex size-10 items-center justify-center"
              >
                <X className="size-4 text-white/50" />
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <AiDirector mode={mode} className="h-full border-0" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
