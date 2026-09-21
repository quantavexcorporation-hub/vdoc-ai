'use client'

import * as React from 'react'
import {
  Bell,
  BookOpen,
  Brain,
  Clapperboard,
  Command,
  Gamepad2,
  Heart,
  LayoutGrid,
  MessageSquare,
  MessageSquarePlus,
  PanelLeft,
  PanelLeftClose,
  Pin,
  Search,
  Settings,
  Star,
  Trash2,
  Users,
  Wand2,
  BookMarked,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  DsCommandPalette,
  useCommandPaletteShortcut,
  type DsCommandItem,
} from '@/components/ds'
import { useConverse } from '@/lib/converse/store'
import type { Conversation } from '@/lib/converse/types'
import { BrandLogo } from '@/components/brand/logo'
import { cn } from '@/lib/utils'

type RealmId =
  | 'chats'
  | 'movies'
  | 'games'
  | 'stories'
  | 'comics'
  | 'community'
  | 'creator'
  | 'workspace'

const REALMS: {
  id: RealmId
  label: string
  icon: LucideIcon
  hint: string
  href?: string
}[] = [
  { id: 'chats', label: 'Recent Chats', icon: MessageSquare, hint: 'Conversations' },
  { id: 'movies', label: 'Movies', icon: Clapperboard, hint: 'Film a scene', href: '/universe' },
  { id: 'games', label: 'Games', icon: Gamepad2, hint: 'Playable worlds', href: '/universe' },
  { id: 'stories', label: 'Stories', icon: BookOpen, hint: 'Branching tales', href: '/universe' },
  { id: 'comics', label: 'Comics', icon: BookMarked, hint: 'Panel sequences', href: '/universe' },
  { id: 'community', label: 'Community', icon: Users, hint: 'Shared realms', href: '/universe' },
  { id: 'creator', label: 'AI Creator', icon: Wand2, hint: 'Studio tools' },
  { id: 'workspace', label: 'Workspace', icon: LayoutGrid, hint: 'Projects' },
]

function NavIcon({
  icon: Icon,
  active,
}: {
  icon: LucideIcon
  active?: boolean
}) {
  return (
    <span
      className={cn(
        'vdoc-rail-icon relative flex size-9 shrink-0 items-center justify-center rounded-xl',
        'transition-transform duration-[var(--duration-normal)] ease-[var(--ease-emphasized)]',
        active ? 'bg-cyan/15 text-cyan' : 'text-muted-foreground'
      )}
    >
      <Icon
        className={cn(
          'size-[18px] transition-transform duration-[var(--duration-normal)] ease-[var(--ease-emphasized)]',
          'group-hover/item:scale-110 group-hover/item:-rotate-3'
        )}
        strokeWidth={1.75}
        aria-hidden
      />
    </span>
  )
}

function ChatRow({
  chat,
  active,
  expanded,
  onSelect,
  onPin,
  onFavorite,
  onDelete,
}: {
  chat: Conversation
  active: boolean
  expanded: boolean
  onSelect: () => void
  onPin: () => void
  onFavorite: () => void
  onDelete: () => void
}) {
  return (
    <div
      className={cn(
        'group/chat relative flex items-center gap-1 rounded-xl transition-colors duration-[var(--duration-fast)]',
        active
          ? 'bg-white/[0.08] text-lunar'
          : 'text-muted-foreground hover:bg-white/[0.045] hover:text-foreground',
        expanded ? 'px-1.5 py-1' : 'justify-center px-0 py-1'
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          'flex min-w-0 items-center gap-2.5 text-left',
          expanded ? 'flex-1 px-1.5 py-1' : 'p-0'
        )}
        title={chat.title}
      >
        <span
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-medium',
            active ? 'bg-cyan/20 text-cyan' : 'bg-white/[0.05] text-muted-foreground'
          )}
        >
          {chat.title.slice(0, 1).toUpperCase() || '·'}
        </span>
        <span
          className={cn(
            'truncate text-[13px] transition-opacity duration-[var(--duration-normal)]',
            expanded ? 'opacity-100' : 'w-0 overflow-hidden opacity-0'
          )}
        >
          {chat.title}
        </span>
      </button>

      {expanded && (
        <div className="flex shrink-0 items-center opacity-0 transition-opacity duration-[var(--duration-fast)] group-hover/chat:opacity-100">
          <button
            type="button"
            onClick={onFavorite}
            className={cn(
              'rounded-md p-1 hover:bg-white/[0.06]',
              chat.favorited && 'opacity-100 text-warning'
            )}
            aria-label="Favorite"
          >
            <Star
              className="size-3"
              fill={chat.favorited ? 'currentColor' : 'none'}
            />
          </button>
          <button
            type="button"
            onClick={onPin}
            className={cn(
              'rounded-md p-1 hover:bg-white/[0.06]',
              chat.pinned && 'opacity-100 text-cyan'
            )}
            aria-label="Pin"
          >
            <Pin className="size-3" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-md p-1 hover:bg-white/[0.06] hover:text-error"
            aria-label="Delete"
          >
            <Trash2 className="size-3" />
          </button>
        </div>
      )}
    </div>
  )
}

export function ConverseSidebar() {
  const { state, dispatch } = useConverse()
  const [hovered, setHovered] = React.useState(false)
  const [realm, setRealm] = React.useState<RealmId>('chats')
  const [cmdOpen, setCmdOpen] = React.useState(false)
  const [notifOpen, setNotifOpen] = React.useState(false)
  const searchRef = React.useRef<HTMLInputElement>(null)

  useCommandPaletteShortcut(cmdOpen, setCmdOpen)

  // Expanded when user pinned it open, or hovering the floating rail (desktop)
  const expanded = state.sidebarOpen || hovered
  const mobileOpen = state.sidebarOpen

  const chats = Object.values(state.conversations).sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return b.updatedAt - a.updatedAt
  })

  const q = state.searchQuery.trim().toLowerCase()
  const filtered = q
    ? chats.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          Object.values(c.messages).some((m) =>
            m.content.toLowerCase().includes(q)
          )
      )
    : chats

  const pinned = filtered.filter((c) => c.pinned)
  const favorites = filtered.filter((c) => c.favorited)
  const recent = filtered.filter((c) => !c.pinned).slice(0, 12)

  const commandItems: DsCommandItem[] = React.useMemo(
    () => [
      {
        id: 'new',
        label: 'New conversation',
        group: 'Actions',
        shortcut: 'N',
        icon: <MessageSquarePlus className="size-4" />,
        onSelect: () => dispatch({ type: 'NEW_CHAT' }),
      },
      {
        id: 'memory',
        label: 'Toggle memory',
        group: 'Actions',
        icon: <Brain className="size-4" />,
        onSelect: () => dispatch({ type: 'TOGGLE_MEMORY' }),
      },
      ...REALMS.map((r) => ({
        id: `realm-${r.id}`,
        label: r.label,
        group: 'Realms',
        icon: <r.icon className="size-4" />,
        onSelect: () => setRealm(r.id),
      })),
      ...chats.slice(0, 8).map((c) => ({
        id: `chat-${c.id}`,
        label: c.title,
        group: 'Recent',
        icon: <MessageSquare className="size-4" />,
        onSelect: () => dispatch({ type: 'SELECT_CHAT', id: c.id }),
      })),
    ],
    [chats, dispatch]
  )

  const realmPrompt: Partial<Record<RealmId, string>> = {
    movies: 'Film a one-minute movie about ',
    games: 'Design a playable game loop where ',
    stories: 'Start an interactive story in ',
    comics: 'Create a comic page about ',
    community: 'Draft a community prompt for ',
    creator: 'Open AI Creator mode for ',
    workspace: 'Organize a workspace for ',
  }

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-[var(--duration-normal)] md:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        aria-hidden
      />

      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          'vdoc-float-rail fixed z-50 flex flex-col',
          'top-3 bottom-3 left-3',
          'rounded-[1.35rem] border border-white/[0.1]',
          'bg-[oklch(0.09_0.016_280_/_0.72)] backdrop-blur-[28px] saturate-[1.25]',
          'shadow-[0_8px_40px_oklch(0_0_0_/_0.45),0_1px_0_oklch(1_0_0_/_0.06)_inset]',
          'transition-[width,transform,box-shadow] duration-[var(--duration-slow)] ease-[var(--ease-emphasized)]',
          'will-change-[width,transform]',
          expanded ? 'w-[272px]' : 'w-[72px]',
          // Mobile: slide in/out
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-[120%] md:translate-x-0'
        )}
        aria-label="VDOC navigation"
      >
        {/* Soft inner glow */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.35rem]"
          aria-hidden
        >
          <div className="absolute -left-8 top-0 size-32 rounded-full bg-cyan/10 blur-3xl" />
          <div className="absolute -right-6 bottom-12 size-28 rounded-full bg-cosmic/15 blur-3xl" />
        </div>

        {/* Brand */}
        <div
          className={cn(
            'relative flex items-center gap-2.5 px-3 pt-3.5',
            expanded ? 'justify-between' : 'justify-center'
          )}
        >
          <BrandLogo
            size="sm"
            className={cn(
              'transition-all duration-[var(--duration-normal)]',
              !expanded && 'scale-90'
            )}
          />

          {expanded && (
            <button
              type="button"
              onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground md:hidden"
              aria-label="Close"
            >
              <PanelLeftClose className="size-4" />
            </button>
          )}
        </div>

        {/* Search + Command */}
        <div className="relative mt-3 space-y-1.5 px-2.5">
          <button
            type="button"
            onClick={() => {
              if (!state.sidebarOpen) dispatch({ type: 'TOGGLE_SIDEBAR' })
              requestAnimationFrame(() => searchRef.current?.focus())
            }}
            className={cn(
              'group/item flex w-full items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03]',
              'text-muted-foreground transition-all duration-[var(--duration-normal)]',
              'hover:border-white/[0.12] hover:bg-white/[0.055] hover:text-foreground',
              expanded ? 'px-2 py-1.5' : 'justify-center px-0 py-2'
            )}
            aria-label="Search"
          >
            <NavIcon icon={Search} />
            {expanded && (
              <input
                ref={searchRef}
                value={state.searchQuery}
                onChange={(e) =>
                  dispatch({ type: 'SET_SEARCH', query: e.target.value })
                }
                onClick={(e) => e.stopPropagation()}
                placeholder="Search"
                className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/55 focus:outline-none"
              />
            )}
          </button>

          <button
            type="button"
            onClick={() => setCmdOpen(true)}
            className={cn(
              'group/item flex w-full items-center rounded-xl text-muted-foreground',
              'transition-colors duration-[var(--duration-fast)] hover:bg-white/[0.05] hover:text-foreground',
              expanded ? 'gap-2 px-2 py-1' : 'justify-center py-1.5'
            )}
          >
            <NavIcon icon={Command} />
            <span
              className={cn(
                'flex flex-1 items-center text-[13px] transition-opacity duration-[var(--duration-normal)]',
                expanded ? 'opacity-100' : 'w-0 overflow-hidden opacity-0'
              )}
            >
              Command Menu
              <kbd className="ml-auto rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/70">
                ⌘K
              </kbd>
            </span>
          </button>

          <button
            type="button"
            onClick={() => dispatch({ type: 'NEW_CHAT' })}
            className={cn(
              'group/item flex w-full items-center rounded-xl',
              'border border-cyan/20 bg-cyan/[0.07] text-cyan',
              'transition-all duration-[var(--duration-normal)] hover:bg-cyan/[0.12] hover:shadow-[0_0_24px_oklch(0.82_0.14_200_/_0.15)]',
              expanded ? 'gap-2 px-2 py-1.5' : 'justify-center py-2'
            )}
          >
            <NavIcon icon={MessageSquarePlus} active />
            <span
              className={cn(
                'text-[13px] font-medium transition-opacity duration-[var(--duration-normal)]',
                expanded ? 'opacity-100' : 'w-0 overflow-hidden opacity-0'
              )}
            >
              New chat
            </span>
          </button>
        </div>

        {/* Scroll body */}
        <div className="relative mt-3 flex-1 overflow-y-auto overflow-x-hidden px-2.5 pb-2 scrollbar-none">
          {/* Realms */}
          <p
            className={cn(
              'mb-1.5 px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/55 transition-opacity',
              expanded ? 'opacity-100' : 'opacity-0'
            )}
          >
            Realms
          </p>
          <nav className="space-y-0.5" aria-label="Realms">
            {REALMS.map((item) => {
              const active = realm === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  title={item.label}
                  onClick={() => {
                    setRealm(item.id)
                    if (item.href) {
                      window.location.href = item.href
                      return
                    }
                    if (item.id === 'chats') return
                    const prefix = realmPrompt[item.id]
                    if (prefix) {
                      dispatch({ type: 'NEW_CHAT' })
                      window.dispatchEvent(
                        new CustomEvent('vdoc:prefill', { detail: prefix })
                      )
                    }
                  }}
                  className={cn(
                    'group/item flex w-full items-center rounded-xl transition-colors duration-[var(--duration-fast)]',
                    active
                      ? 'bg-white/[0.07] text-lunar'
                      : 'text-muted-foreground hover:bg-white/[0.045] hover:text-foreground',
                    expanded ? 'gap-2 px-1.5 py-0.5' : 'justify-center py-1'
                  )}
                >
                  <NavIcon icon={item.icon} active={active} />
                  <span
                    className={cn(
                      'flex min-w-0 flex-1 flex-col items-start transition-opacity duration-[var(--duration-normal)]',
                      expanded ? 'opacity-100' : 'w-0 overflow-hidden opacity-0'
                    )}
                  >
                    <span className="truncate text-[13px]">{item.label}</span>
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Pinned */}
          {(pinned.length > 0 || expanded) && (
            <section className="mt-4">
              <p
                className={cn(
                  'mb-1.5 flex items-center gap-1.5 px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/55',
                  !expanded && 'justify-center px-0'
                )}
              >
                <Pin className="size-2.5" />
                {expanded && 'Pinned'}
              </p>
              <div className="space-y-0.5">
                {pinned.length === 0 && expanded && (
                  <p className="px-2 py-1 text-[11px] text-muted-foreground/40">
                    Pin chats you return to
                  </p>
                )}
                {pinned.map((c) => (
                  <ChatRow
                    key={c.id}
                    chat={c}
                    active={state.activeConversationId === c.id}
                    expanded={expanded}
                    onSelect={() =>
                      dispatch({ type: 'SELECT_CHAT', id: c.id })
                    }
                    onPin={() => dispatch({ type: 'PIN_CHAT', id: c.id })}
                    onFavorite={() =>
                      dispatch({ type: 'FAVORITE_CHAT', id: c.id })
                    }
                    onDelete={() =>
                      dispatch({ type: 'DELETE_CHAT', id: c.id })
                    }
                  />
                ))}
              </div>
            </section>
          )}

          {/* Favorites */}
          {(favorites.length > 0 || expanded) && (
            <section className="mt-4">
              <p
                className={cn(
                  'mb-1.5 flex items-center gap-1.5 px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/55',
                  !expanded && 'justify-center px-0'
                )}
              >
                <Heart className="size-2.5" />
                {expanded && 'Favorites'}
              </p>
              <div className="space-y-0.5">
                {favorites.length === 0 && expanded && (
                  <p className="px-2 py-1 text-[11px] text-muted-foreground/40">
                    Star what matters
                  </p>
                )}
                {favorites.map((c) => (
                  <ChatRow
                    key={c.id}
                    chat={c}
                    active={state.activeConversationId === c.id}
                    expanded={expanded}
                    onSelect={() =>
                      dispatch({ type: 'SELECT_CHAT', id: c.id })
                    }
                    onPin={() => dispatch({ type: 'PIN_CHAT', id: c.id })}
                    onFavorite={() =>
                      dispatch({ type: 'FAVORITE_CHAT', id: c.id })
                    }
                    onDelete={() =>
                      dispatch({ type: 'DELETE_CHAT', id: c.id })
                    }
                  />
                ))}
              </div>
            </section>
          )}

          {/* Recent */}
          <section className="mt-4">
            <p
              className={cn(
                'mb-1.5 flex items-center gap-1.5 px-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/55',
                !expanded && 'justify-center px-0'
              )}
            >
              <MessageSquare className="size-2.5" />
              {expanded && 'Recent'}
            </p>
            <div className="space-y-0.5">
              {recent.length === 0 && expanded && (
                <p className="px-2 py-1 text-[11px] text-muted-foreground/40">
                  Your threads appear here
                </p>
              )}
              {recent.map((c) => (
                <ChatRow
                  key={c.id}
                  chat={c}
                  active={state.activeConversationId === c.id}
                  expanded={expanded}
                  onSelect={() => dispatch({ type: 'SELECT_CHAT', id: c.id })}
                  onPin={() => dispatch({ type: 'PIN_CHAT', id: c.id })}
                  onFavorite={() =>
                    dispatch({ type: 'FAVORITE_CHAT', id: c.id })
                  }
                  onDelete={() =>
                    dispatch({ type: 'DELETE_CHAT', id: c.id })
                  }
                />
              ))}
            </div>
          </section>
        </div>

        {/* Footer — profile / notifs / settings / memory */}
        <div className="relative space-y-0.5 border-t border-white/[0.06] px-2.5 py-2.5">
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen((v) => !v)}
              className={cn(
                'group/item flex w-full items-center rounded-xl text-muted-foreground',
                'transition-colors hover:bg-white/[0.05] hover:text-foreground',
                expanded ? 'gap-2 px-1.5 py-0.5' : 'justify-center py-1'
              )}
            >
              <span className="relative">
                <NavIcon icon={Bell} />
                <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-cyan shadow-[0_0_8px_var(--cyan)]" />
              </span>
              <span
                className={cn(
                  'flex flex-1 items-center text-[13px] transition-opacity',
                  expanded ? 'opacity-100' : 'w-0 overflow-hidden opacity-0'
                )}
              >
                Notifications
              </span>
            </button>
            {notifOpen && expanded && (
              <div className="absolute bottom-full left-0 right-0 mb-2 rounded-xl border border-white/[0.08] bg-[oklch(0.11_0.02_280_/_0.95)] p-3 shadow-[var(--shadow-lg)] backdrop-blur-xl">
                <p className="text-[12px] text-muted-foreground">
                  You’re caught up. New realm invites and renders will land here.
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => dispatch({ type: 'TOGGLE_MEMORY' })}
            className={cn(
              'group/item flex w-full items-center rounded-xl transition-colors',
              state.memoryOpen
                ? 'bg-cyan/10 text-cyan'
                : 'text-muted-foreground hover:bg-white/[0.05] hover:text-foreground',
              expanded ? 'gap-2 px-1.5 py-0.5' : 'justify-center py-1'
            )}
          >
            <NavIcon icon={Brain} active={state.memoryOpen} />
            <span
              className={cn(
                'flex flex-1 items-center text-[13px] transition-opacity',
                expanded ? 'opacity-100' : 'w-0 overflow-hidden opacity-0'
              )}
            >
              Memory
              <span className="ml-auto tabular-nums text-[11px] opacity-50">
                {state.memory.length}
              </span>
            </span>
          </button>

          <button
            type="button"
            className={cn(
              'group/item flex w-full items-center rounded-xl text-muted-foreground',
              'transition-colors hover:bg-white/[0.05] hover:text-foreground',
              expanded ? 'gap-2 px-1.5 py-0.5' : 'justify-center py-1'
            )}
            aria-label="Settings"
          >
            <NavIcon icon={Settings} />
            <span
              className={cn(
                'text-[13px] transition-opacity',
                expanded ? 'opacity-100' : 'w-0 overflow-hidden opacity-0'
              )}
            >
              Settings
            </span>
          </button>

          <button
            type="button"
            className={cn(
              'group/item mt-1 flex w-full items-center rounded-xl',
              'transition-colors hover:bg-white/[0.05]',
              expanded ? 'gap-2.5 px-1.5 py-1.5' : 'justify-center py-1.5'
            )}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-neon/80 to-cosmic text-[11px] font-semibold text-lunar shadow-[0_0_16px_oklch(0.7_0.18_255_/_0.25)]">
              You
            </span>
            <span
              className={cn(
                'min-w-0 flex-1 text-left transition-opacity',
                expanded ? 'opacity-100' : 'w-0 overflow-hidden opacity-0'
              )}
            >
              <span className="block truncate text-[13px] font-medium text-lunar">
                Your space
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">
                Profile · Free
              </span>
            </span>
          </button>
        </div>
      </aside>

      <DsCommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        items={commandItems}
        placeholder="Jump to a chat, realm, or action…"
      />
    </>
  )
}

export function SidebarToggle() {
  const { state, dispatch } = useConverse()
  return (
    <button
      type="button"
      onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
      className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
      aria-label="Toggle sidebar"
    >
      {state.sidebarOpen ? (
        <PanelLeftClose className="size-4" />
      ) : (
        <PanelLeft className="size-4" />
      )}
    </button>
  )
}
