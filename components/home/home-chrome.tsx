'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PanelLeft, Settings, X, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BrandLogo } from '@/components/brand/logo'
import { LogoAwaken } from '@/components/os/logo-awaken'
import type { UniverseCategory } from '@/lib/universe/data'
import { recordHabit, predictNext } from '@/lib/os/habits'
import {
  entertainmentNavGroups,
  type RailItem,
} from '@/lib/os/nav'
import { readUserName, readUserFocus } from '@/lib/os/user-space'
import { getSpaceRole } from '@/lib/nexus/access'

export function HomeChrome() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('c') as UniverseCategory | null
  const [hash, setHash] = React.useState('')

  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [predicted, setPredicted] = React.useState<string[]>([])
  const [awaken, setAwaken] = React.useState(false)
  const [spaceName, setSpaceName] = React.useState('You')
  const [spaceFocus, setSpaceFocus] = React.useState('Your space')
  const [spaceRole, setSpaceRole] = React.useState<'audience' | 'creator'>('audience')

  React.useEffect(() => {
    setPredicted(predictNext(2))
    setSpaceName(readUserName())
    setSpaceFocus(readUserFocus())
    setSpaceRole(getSpaceRole())
  }, [pathname])

  const visit = (id: string) => {
    recordHabit(id)
    setPredicted(predictNext(2))
    setMobileOpen(false)
  }

  /** Dashboard link — direct home, no ritual */
  const goDashboard = (e?: React.MouseEvent) => {
    visit('dashboard')
    setHash('')

    const settle = () => {
      if (typeof window === 'undefined') return
      if (window.location.hash) {
        window.history.replaceState(null, '', '/')
      }
      document.getElementById('vdoc-main')?.scrollTo({ top: 0, behavior: 'auto' })
    }

    if (pathname === '/') {
      e?.preventDefault()
      settle()
      return
    }

    settle()
    router.push('/')
  }

  /** Logo — futuristic awaken ritual, then dashboard */
  const startLogoAwaken = (e?: React.MouseEvent) => {
    e?.preventDefault()
    setMobileOpen(false)
    recordHabit('logo-awaken')
    setAwaken(true)
  }

  const finishLogoAwaken = React.useCallback(() => {
    setAwaken(false)
    setHash('')
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        window.history.replaceState(null, '', '/')
      }
      document.getElementById('vdoc-main')?.scrollTo({ top: 0, behavior: 'auto' })
    }
    if (pathname !== '/') {
      router.push('/')
    }
  }, [pathname, router])

  React.useEffect(() => {
    const sync = () => setHash(window.location.hash.replace('#', ''))
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  React.useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const ctx = { pathname, category: activeCategory, hash }

  const renderLink = (item: RailItem) => {
    const isActive = item.match?.(ctx) ?? false
    const Icon = item.icon
    const isPredicted = predicted.includes(item.id)
    return (
      <li key={item.id}>
        <Link
          href={item.href}
          onClick={() => visit(item.id)}
          aria-current={isActive ? 'page' : undefined}
          className={cn(
            'group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm outline-none',
            'transition-colors duration-150',
            isActive
              ? 'bg-white/[0.08] font-medium text-foreground'
              : 'text-white/55 hover:bg-white/[0.05] hover:text-white/90',
            isPredicted && !isActive && 'text-white/70'
          )}
        >
          <span className="relative shrink-0">
            <Icon
              className={cn(
                'size-[1.125rem]',
                isActive ? 'text-foreground' : 'text-white/45 group-hover:text-white/70'
              )}
              aria-hidden
            />
            {item.pulse && (
              <span
                className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                aria-hidden
              />
            )}
          </span>
          <span className="min-w-0 flex-1 truncate">{item.label}</span>
          {item.badge && (
            <span
              className={cn(
                'shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium tracking-wide',
                isActive
                  ? 'bg-white/15 text-white/80'
                  : 'bg-white/[0.06] text-white/40 group-hover:text-white/60'
              )}
            >
              {item.badge}
            </span>
          )}
        </Link>
      </li>
    )
  }

  const SidebarBody = (
    <>
      <div className="flex items-center justify-between gap-2 px-3 pt-3.5 pb-2">
        <BrandLogo
          href={null}
          size="sm"
          onClick={() => startLogoAwaken()}
          className="ml-0.5"
        />
        <button
          type="button"
          className="rounded-lg p-2 text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white/80 md:hidden"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
        >
          <X className="size-4" />
        </button>
      </div>

      <nav
        className="min-h-0 flex-1 overflow-y-auto px-2 pb-3 scrollbar-none"
        aria-label="Entertainment"
      >
        {entertainmentNavGroups.map((group) => (
          <div key={group.id} className="mb-4">
            <p className="mb-1 px-3 text-[11px] font-medium text-white/30">
              {group.label}
            </p>
            {group.id === 'universe' && (
              <ul className="mb-0.5 space-y-0.5">
                <li>
                  <Link
                    href="/"
                    onClick={goDashboard}
                    aria-current={pathname === '/' && !hash ? 'page' : undefined}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                      pathname === '/' && !hash
                        ? 'bg-white/[0.08] font-medium text-foreground'
                        : 'text-white/55 hover:bg-white/[0.05] hover:text-white/90'
                    )}
                  >
                    <LayoutDashboard
                      className={cn(
                        'size-4',
                        pathname === '/' && !hash ? 'text-foreground' : 'text-white/45'
                      )}
                      aria-hidden
                    />
                    Dashboard
                  </Link>
                </li>
              </ul>
            )}
            <ul className="space-y-0.5">{group.items.map(renderLink)}</ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/[0.06] p-2">
        <div className="mb-2 space-y-1 rounded-lg px-2.5 py-1.5">
          <div className="flex items-center gap-2 text-[11px] text-white/40">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative size-1.5 rounded-full bg-emerald-400" />
            </span>
            Machine online
          </div>
          <p className="font-mono text-[9px] tracking-[0.14em] text-white/25">
            AI ENGINE · DATA LAYER · LIVE
          </p>
        </div>
        <Link
          href="/settings"
          onClick={() => visit('settings')}
          className="flex w-full items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.05]"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-xs font-medium text-white/80">
            {spaceName.slice(0, 1).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1 text-left">
            <span className="block truncate text-sm text-white/85">{spaceName}</span>
            <span className="block truncate text-xs text-white/35">
              {spaceRole === 'creator' ? 'Creator' : 'Audience'} · {spaceFocus.split('·')[0]?.trim()}
            </span>
          </span>
          <Settings className="size-4 shrink-0 text-white/35" aria-hidden />
        </Link>
      </div>
    </>
  )

  return (
    <>
      <aside
        className="vdoc-shell-docked relative z-50 hidden h-dvh w-[var(--shell-rail-width)] shrink-0 flex-col border-r border-white/[0.06] md:flex"
        aria-label="Sidebar"
      >
        {SidebarBody}
      </aside>

      <div className="vdoc-mobile-topbar fixed inset-x-0 top-0 z-50 flex items-center gap-1.5 border-b border-white/[0.06] bg-[#171717]/95 px-1.5 backdrop-blur-md sm:gap-3 sm:px-3 md:hidden">
        <button
          type="button"
          aria-label="Open sidebar"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-white/55 hover:bg-white/[0.06] hover:text-white/90"
        >
          <PanelLeft className="size-5" />
        </button>
        <BrandLogo
          size="sm"
          href={null}
          onClick={() => startLogoAwaken()}
          className="min-w-0"
        />
      </div>

      <div
        className={cn(
          'fixed inset-0 z-[60] md:hidden',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <button
          type="button"
          aria-label="Close overlay"
          className={cn(
            'absolute inset-0 bg-black/60 transition-opacity duration-200',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={cn(
            'vdoc-shell-docked absolute left-0 top-0 flex h-dvh w-[var(--shell-rail-width)] max-w-[300px] flex-col border-r border-white/[0.06] pb-[env(safe-area-inset-bottom,0px)] pt-[env(safe-area-inset-top,0px)] transition-transform duration-300 ease-out',
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
          aria-hidden={!mobileOpen}
          {...(!mobileOpen
            ? ({ inert: true } as React.HTMLAttributes<HTMLElement>)
            : {})}
        >
          {SidebarBody}
        </aside>
      </div>

      <LogoAwaken open={awaken} onComplete={finishLogoAwaken} />
    </>
  )
}
