'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  BookOpen,
  Clapperboard,
  Gamepad2,
  Globe,
  Tv,
  MessageSquare,
  BookMarked,
  Film,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  CATEGORIES,
  buildCatalog,
  sliceRails,
  type MediaItem,
  type UniverseCategory,
} from '@/lib/universe/data'
import { VdocShell } from '@/components/os/vdoc-shell'
import { FeaturedBanner } from './featured-banner'
import { LiveStatus } from './live-status'
import { ContentRail } from './content-rail'
import { InfiniteGrid } from './infinite-grid'
import { InstantPlayer } from './instant-player'
import { ListeningForest } from './listening-forest'
import { LivingAtmosphere } from '@/components/os/living-atmosphere'
import { CATEGORY_MOOD } from '@/lib/os/intent'
import { cn } from '@/lib/utils'

const ICONS: Record<UniverseCategory, LucideIcon> = {
  movies: Clapperboard,
  series: Film,
  games: Gamepad2,
  stories: BookOpen,
  comics: BookMarked,
  shorts: Sparkles,
  shows: Tv,
  worlds: Globe,
}

const VALID = new Set<UniverseCategory>(
  CATEGORIES.map((c) => c.id)
)

function resolveCategory(raw: string | null): UniverseCategory {
  if (raw === 'music') return 'shows'
  if (raw && VALID.has(raw as UniverseCategory)) return raw as UniverseCategory
  return 'movies'
}

export function UniverseApp() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryId = resolveCategory(searchParams.get('c'))

  const [genre, setGenre] = React.useState<string | null>(null)
  const [page, setPage] = React.useState(1)
  const [playing, setPlaying] = React.useState<MediaItem | null>(null)
  const [forest, setForest] = React.useState(false)

  const category = CATEGORIES.find((c) => c.id === categoryId)!

  const setCategoryId = React.useCallback(
    (id: UniverseCategory) => {
      router.push(`/universe?c=${id}`, { scroll: false })
    },
    [router]
  )

  const catalog = React.useMemo(
    () => buildCatalog(categoryId, 18 + page * 12),
    [categoryId, page]
  )

  const filtered = React.useMemo(
    () => (genre ? catalog.filter((i) => i.genre === genre) : catalog),
    [catalog, genre]
  )

  const rails = React.useMemo(() => sliceRails(filtered), [filtered])
  const hasMore = page < 6

  React.useEffect(() => {
    setPage(1)
    setGenre(null)
  }, [categoryId])

  const onPlay = React.useCallback((item: MediaItem) => {
    if (item.story) {
      setForest(true)
      return
    }
    setPlaying(item)
  }, [])

  return (
    <VdocShell mood={CATEGORY_MOOD[categoryId] ?? 'cinema'}>
      <LivingAtmosphere intensity="subtle" />
      <div className="pointer-events-none fixed inset-0 -z-10 vdoc-mood-wash" aria-hidden />
      <div className="pointer-events-none fixed inset-0 -z-10 universe-stars opacity-30" aria-hidden />

      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-bg-void/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <p className="ds-label text-[11px]">Entertainment universe</p>
                <span className="font-mono text-[9px] tracking-wider text-cyan/60">AI OS</span>
              </div>
              <h1 className="truncate font-display text-sm font-semibold tracking-tight text-lunar sm:text-base">
                {category.label}
              </h1>
              <p className="mt-0.5 truncate text-[13px] text-muted-foreground">{category.tagline}</p>
            </div>

            <Link
              href="/converse"
              className="inline-flex items-center gap-2 rounded-[var(--radius-lg)] border border-[var(--glass-border)] bg-white/[0.04] px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.08] hover:text-foreground"
            >
              <MessageSquare className="size-3.5" />
              <span className="hidden sm:inline">Converse</span>
            </Link>
          </div>

          <nav
            className="mx-auto flex max-w-[1400px] gap-1.5 overflow-x-auto px-4 pb-3 scrollbar-none sm:px-6 md:hidden"
            aria-label="Universe categories"
          >
            {CATEGORIES.map((c) => {
              const Icon = ICONS[c.id]
              const active = c.id === categoryId
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryId(c.id)}
                  className={cn(
                    'group/cat inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13px] transition-all duration-[var(--duration-normal)] ease-[var(--ease-emphasized)]',
                    active
                      ? 'bg-lunar text-space shadow-[var(--shadow-glow-cyan)]'
                      : 'border border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:border-white/[0.14] hover:bg-white/[0.06] hover:text-foreground'
                  )}
                >
                  <Icon
                    className={cn(
                      'size-3.5 transition-transform duration-[var(--duration-normal)] group-hover/cat:scale-110',
                      active ? 'text-space' : 'text-cyan'
                    )}
                  />
                  {c.label}
                </button>
              )
            })}
          </nav>
        </header>

        <main className="ix-scroll relative mx-auto max-w-[1400px] space-y-14 overflow-x-hidden px-4 py-8 sm:px-6 md:py-10">
          <FeaturedBanner
            category={category}
            onPlay={() => {
              if (category.id === 'stories') {
                setForest(true)
                return
              }
              onPlay({
                id: `featured-${category.id}`,
                title: category.featured.title,
                subtitle: category.featured.video ? 'Sample picture' : category.label,
                category: category.id,
                image: category.featured.image,
                genre: category.genres[0],
                video: category.featured.video,
              })
            }}
          />

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <LiveStatus category={category} />
            <div className="flex flex-wrap gap-2" role="group" aria-label="Genres">
              <button
                type="button"
                onClick={() => setGenre(null)}
                className={cn('ix-select', !genre && 'ix-select-on')}
              >
                All
              </button>
              {category.genres.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGenre(g === genre ? null : g)}
                  className={cn('ix-select', genre === g && 'ix-select-on')}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <ContentRail
            eyebrow="Signal rising"
            title="Trending"
            items={rails.trending}
            variant="wide"
            onPlay={onPlay}
          />

          <ContentRail
            eyebrow="On the shelf"
            title="Also here"
            items={rails.recent}
            onPlay={onPlay}
          />

          <ContentRail
            eyebrow="For your orbit"
            title="Recommended"
            items={rails.recommended}
            onPlay={onPlay}
          />

          <ContentRail
            eyebrow="From the crowd"
            title="Community Picks"
            items={rails.community}
            variant="square"
            onPlay={onPlay}
          />

          <InfiniteGrid
            items={filtered}
            hasMore={hasMore}
            onLoadMore={() => setPage((p) => Math.min(6, p + 1))}
            onPlay={onPlay}
          />
        </main>

      <InstantPlayer item={playing} onClose={() => setPlaying(null)} />
      <ListeningForest open={forest} onClose={() => setForest(false)} />
    </VdocShell>
  )
}
