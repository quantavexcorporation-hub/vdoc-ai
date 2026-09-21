'use client'

import * as React from 'react'
import {
  OWNED_ASSETS,
  COLLECTIBLES,
  ESTATES,
  MARKET,
  MARKET_CATEGORIES,
  DROPS,
  INVESTMENTS,
  GALAXY,
  SOCIAL_SHOWCASES,
  CREATOR_STUDIO,
  PASSPORT,
  VAULT,
  type EconomyAsset,
  type MarketItem,
} from '@/lib/economy/data'
import {
  SectionHead,
  RarityChip,
  HoloOrb,
  EnergyValue,
  CinematicTransfer,
} from './primitives'
import { cn } from '@/lib/utils'
import { DsButton } from '@/components/ds'
import { Building2, Gift, TrendingUp, Users, Wand2 } from 'lucide-react'

function ValueMeters({ asset }: { asset: EconomyAsset }) {
  const rows = [
    { label: 'Demand', v: asset.demand },
    { label: 'Fan score', v: asset.fanScore },
    { label: 'Influence', v: asset.influence },
    { label: 'Emotional', v: asset.emotional },
  ]
  return (
    <ul className="space-y-2">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="mb-1 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
            <span>{r.label}</span>
            <span className="tabular-nums text-lunar/80">{r.v}</span>
          </div>
          <div className="vydo-meter">
            <span style={{ width: `${r.v}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

function AssetCard({
  asset,
  onAcquire,
}: {
  asset: EconomyAsset
  onAcquire?: (title: string) => void
}) {
  return (
    <article className={cn('vydo-asset-card p-4', `vydo-rarity-${asset.rarity}`)}>
      <div className="flex gap-3">
        <HoloOrb hue={asset.hue} rarity={asset.rarity} title={asset.title} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <RarityChip rarity={asset.rarity} />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {asset.kind}
            </span>
          </div>
          <h3 className="mt-2 font-display text-base font-semibold tracking-tight text-lunar">
            {asset.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[13px] text-muted-foreground">{asset.summary}</p>
          <div className="mt-3">
            <EnergyValue value={asset.energy} size="sm" />
          </div>
        </div>
      </div>

      <div className="vydo-asset-reveal">
        <p className="text-[12px] text-muted-foreground">
          {asset.ability ? (
            <>
              <span className="text-cyan">Ability · </span>
              {asset.ability}
            </>
          ) : (
            'Living artifact in your civilization.'
          )}
        </p>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Owners {asset.owners.toLocaleString()} · Acquired {asset.acquired}
        </p>
        <ol className="mt-2 space-y-1 border-l border-cyan/20 pl-3 text-[11px] text-muted-foreground">
          {asset.history.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ol>
        {onAcquire ? (
          <DsButton
            size="sm"
            variant="glass"
            className="mt-3"
            onClick={() => onAcquire(asset.title)}
          >
            Seal to Vault
          </DsButton>
        ) : null}
      </div>
    </article>
  )
}

export function EconomyModules() {
  const [cat, setCat] = React.useState<string>('All')
  const [tx, setTx] = React.useState<string | null>(null)
  const [query, setQuery] = React.useState('')

  const marketItems = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return MARKET.filter((m) => {
      const catOk = cat === 'All' || m.category === cat || m.tag === cat
      const qOk =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q) ||
        m.tag.toLowerCase().includes(q)
      return catOk && qOk
    })
  }, [cat, query])

  const acquire = React.useCallback((title: string) => setTx(title), [])

  return (
    <>
      <CinematicTransfer open={!!tx} title={tx} onDone={() => setTx(null)} />

      {/* Asset Universe */}
      <section id="assets" className="vdoc-section-glow py-16 md:py-24" aria-labelledby="assets-title">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHead
            id="assets-title"
            eyebrow="Digital Asset Universe"
            title="Everything you own is alive."
            body="Hover any artifact for history, rarity, abilities, and emotional value — no static inventory."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {OWNED_ASSETS.map((a) => (
              <AssetCard key={a.id} asset={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Collectibles */}
      <section
        id="collectibles"
        className="vdoc-section-glow py-16 md:py-24"
        aria-labelledby="collectibles-title"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHead
            id="collectibles-title"
            eyebrow="AI Collectibles"
            title="Museum artifacts from tomorrow."
            body="Not a marketplace floor — a gallery of mythic glow, particles, and intelligent rarity."
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {COLLECTIBLES.map((a) => (
              <AssetCard key={a.id} asset={a} onAcquire={acquire} />
            ))}
          </div>
        </div>
      </section>

      {/* Real estate */}
      <section id="estates" className="vdoc-section-glow py-16 md:py-24" aria-labelledby="estates-title">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHead
            id="estates-title"
            eyebrow="Virtual Real Estate"
            title="Cities, studios, arenas you hold."
            body="Each property carries visitors, revenue, events, and a live assistant presence."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {ESTATES.map((e) => (
              <article key={e.id} className={cn('vydo-asset-card p-5', `vydo-rarity-${e.rarity}`)}>
                <div
                  className="vdoc-frame mb-4 aspect-[16/9] rounded-[var(--radius-lg)]"
                  style={{ ['--frame-hue' as string]: e.hue }}
                  aria-hidden
                />
                <div className="flex flex-wrap items-center gap-2">
                  <RarityChip rarity={e.rarity} />
                  <span className="text-[11px] text-muted-foreground">{e.type}</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold text-lunar">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.summary}</p>
                <dl className="mt-4 grid grid-cols-3 gap-3 text-[12px]">
                  <div>
                    <dt className="text-muted-foreground">Visitors</dt>
                    <dd className="font-mono text-lunar">{e.visitors}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Revenue</dt>
                    <dd className="font-mono text-cyan">{e.revenue}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Events</dt>
                    <dd className="font-mono text-lunar">{e.events}</dd>
                  </div>
                </dl>
                <p className="mt-3 inline-flex items-center gap-2 text-[12px] text-cyan">
                  <Building2 className="size-3.5" aria-hidden />
                  AI assistant on-site
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section
        id="marketplace"
        className="vdoc-section-glow py-16 md:py-24"
        aria-labelledby="market-title"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHead
            id="market-title"
            eyebrow="AI Marketplace"
            title="Apple Store meets science fiction."
            body="Intelligent search. Magnetic cards. Categories for a civilization — not a crypto floor."
          />
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="vydo-market-search">
              Search marketplace
            </label>
            <input
              id="vydo-market-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe what you want — land, companion, season…"
              className="vdoc-liquid-glass w-full flex-1 rounded-[var(--radius-xl)] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:shadow-[var(--shadow-focus)]"
            />
          </div>
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setCat('All')}
              className={cn(
                'shrink-0 rounded-full px-3 py-1.5 text-[12px] transition-colors',
                cat === 'All'
                  ? 'bg-cyan/15 text-cyan'
                  : 'border border-white/10 text-muted-foreground hover:text-lunar'
              )}
            >
              All
            </button>
            {MARKET_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={cn(
                  'shrink-0 rounded-full px-3 py-1.5 text-[12px] transition-colors',
                  cat === c
                    ? 'bg-cyan/15 text-cyan'
                    : 'border border-white/10 text-muted-foreground hover:text-lunar'
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {marketItems.map((m: MarketItem) => (
              <article key={m.id} className={cn('vydo-asset-card p-4', `vydo-rarity-${m.rarity}`)}>
                <div
                  className="vdoc-frame mb-3 aspect-square rounded-[var(--radius-lg)]"
                  style={{ ['--frame-hue' as string]: m.hue }}
                  aria-hidden
                />
                <RarityChip rarity={m.rarity} />
                <h3 className="mt-2 font-display text-sm font-semibold text-lunar">{m.title}</h3>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {m.category} · {m.tag}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <EnergyValue value={m.energy} size="sm" />
                  <DsButton size="sm" variant="lunar" onClick={() => acquire(m.title)}>
                    Acquire
                  </DsButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Drops */}
      <section id="drops" className="vdoc-section-glow py-16 md:py-24" aria-labelledby="drops-title">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHead
            id="drops-title"
            eyebrow="Limited Edition Drops"
            title="Anticipation as a ritual."
            body="Weekly launch events, countdowns, and energy fields — not silent listings."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {DROPS.map((d) => (
              <article
                key={d.id}
                className={cn(
                  'vydo-asset-card relative overflow-hidden p-6',
                  `vydo-rarity-${d.rarity}`
                )}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 size-40 rounded-full opacity-40 blur-3xl"
                  style={{ background: `oklch(0.6 0.16 ${d.hue} / 0.5)` }}
                  aria-hidden
                />
                <RarityChip rarity={d.rarity} />
                <h3 className="mt-4 font-display text-xl font-semibold text-lunar">{d.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d.subtitle}</p>
                <p className="vydo-drop-timer mt-6 font-mono text-2xl text-cyan">{d.endsIn}</p>
                <p className="mt-2 text-[12px] text-muted-foreground">{d.supply}</p>
                <DsButton
                  className="mt-6"
                  variant="lunar"
                  onClick={() => acquire(d.title)}
                >
                  Enter launch
                </DsButton>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Value engine */}
      <section id="value" className="vdoc-section-glow py-16 md:py-24" aria-labelledby="value-title">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHead
            id="value-title"
            eyebrow="AI Value Engine"
            title="Price is the smallest signal."
            body="Demand, influence, fan score, emotional value — visualized as living meters."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {OWNED_ASSETS.slice(0, 4).map((a) => (
              <article key={a.id} className="vdoc-intel-panel rounded-[var(--radius-xl)] p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="ds-label">{a.title}</p>
                    <EnergyValue value={a.energy} size="md" className="mt-2" />
                  </div>
                  <RarityChip rarity={a.rarity} />
                </div>
                <ValueMeters asset={a} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Passport */}
      <section
        id="passport"
        className="vdoc-section-glow py-16 md:py-24"
        aria-labelledby="passport-title"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHead
            id="passport-title"
            eyebrow="Digital Passport"
            title="Your identity is a living profile."
          />
          <div className="vdoc-liquid-glass grid gap-8 rounded-[var(--radius-2xl)] p-6 md:grid-cols-[1fr_1.2fr] md:p-10">
            <div>
              <div className="flex size-20 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 font-display text-2xl text-cyan">
                {PASSPORT.name.slice(0, 1)}
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-lunar">
                {PASSPORT.handle}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{PASSPORT.creatorRank}</p>
              <p className="text-sm text-muted-foreground">{PASSPORT.communityRank}</p>
              <p className="mt-4 font-mono text-cyan">Reputation {PASSPORT.reputation}</p>
            </div>
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                ['Events', PASSPORT.events],
                ['Worlds', PASSPORT.worlds],
                ['Assets', PASSPORT.earned],
                ['Achievements', PASSPORT.achievements.length],
              ].map(([k, v]) => (
                <div key={k as string} className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.03] p-4">
                  <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="mt-1 font-mono text-2xl text-lunar">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="flex flex-wrap gap-2 md:col-span-2">
              {PASSPORT.achievements.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-[12px] text-cyan"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Creator */}
      <section
        id="creator"
        className="vdoc-section-glow py-16 md:py-24"
        aria-labelledby="creator-title"
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHead
            id="creator-title"
            eyebrow="Creator Economy"
            title="Run a futuristic studio."
            body="Fans, licenses, agents, collections — company-grade control without spreadsheet chrome."
          />
          <div className="vdoc-intel-panel rounded-[var(--radius-2xl)] p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Wand2 className="size-5 text-cyan" aria-hidden />
              <h3 className="font-display text-xl font-semibold text-lunar">
                {CREATOR_STUDIO.brand}
              </h3>
            </div>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {[
                ['Fans', CREATOR_STUDIO.fans],
                ['Revenue', CREATOR_STUDIO.revenue],
                ['Collections', CREATOR_STUDIO.collections],
                ['AI Agents', CREATOR_STUDIO.agents],
                ['Licenses', CREATOR_STUDIO.licenses],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</dt>
                  <dd className="mt-1 font-mono text-xl text-lunar">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Energy */}
      <section id="energy" className="vdoc-section-glow py-16 md:py-24" aria-labelledby="energy-title">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHead
            id="energy-title"
            eyebrow="Virtual Currency"
            title="Balance as energy — never a bank table."
          />
          <div className="vdoc-liquid-glass overflow-hidden rounded-[var(--radius-2xl)] p-8 md:p-12">
            <p className="ds-label">Signal energy</p>
            <EnergyValue value={VAULT.balance} size="lg" className="mt-3" />
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Flowing particles mark transfers. Lumen surfaces spending insights: season drops
              rising, studio lot yielding, companion bonded.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                { t: 'Harbor Studio yield', a: '+420 Ξ', d: '2h ago' },
                { t: 'Soft Score license', a: '−180 Ξ', d: 'Yesterday' },
                { t: 'Drop reservation', a: '−1.2k Ξ', d: '3d ago' },
              ].map((row) => (
                <li
                  key={row.t}
                  className="flex items-center justify-between gap-4 border-b border-white/8 py-3 text-sm"
                >
                  <span className="text-lunar">{row.t}</span>
                  <span className="font-mono text-cyan">{row.a}</span>
                  <span className="text-[12px] text-muted-foreground">{row.d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Invest */}
      <section id="invest" className="vdoc-section-glow py-16 md:py-24" aria-labelledby="invest-title">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHead
            id="invest-title"
            eyebrow="AI Investment Center"
            title="Discover what the civilization wants next."
          />
          <div className="grid gap-3 md:grid-cols-2">
            {INVESTMENTS.map((i) => (
              <a
                key={i.id}
                href={i.href}
                className="vdoc-intel-panel group flex items-start gap-3 rounded-[var(--radius-xl)] p-5 transition-transform hover:-translate-y-1"
              >
                <TrendingUp className="mt-0.5 size-4 shrink-0 text-cyan" aria-hidden />
                <span>
                  <span className="block font-display text-base font-semibold text-lunar group-hover:text-cyan">
                    {i.title}
                  </span>
                  <span className="mt-1 block text-[13px] text-muted-foreground">{i.insight}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Galaxy map */}
      <section id="map" className="vdoc-section-glow py-16 md:py-24" aria-labelledby="map-title">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHead
            id="map-title"
            eyebrow="Interactive Economy Map"
            title="Navigate the galaxy of value."
            body="Creator planets, market clusters, trading routes — visual paths instead of plain menus."
          />
          <div className="vydo-galaxy relative aspect-[16/10] overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 md:aspect-[21/9]">
            {GALAXY.map((n) => (
              <a
                key={n.id}
                href={n.href}
                className="vydo-galaxy-node"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section id="social" className="vdoc-section-glow py-16 md:py-24" aria-labelledby="social-title">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <SectionHead
            id="social-title"
            eyebrow="Social Ownership"
            title="Collectors, galleries, gifts."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {SOCIAL_SHOWCASES.map((s) => (
              <article key={s.id} className="vydo-asset-card p-5">
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-11 items-center justify-center rounded-full border border-white/15 font-display text-sm text-lunar"
                    style={{
                      background: `oklch(0.45 0.12 ${s.hue} / 0.35)`,
                    }}
                  >
                    {s.name.slice(0, 1)}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-lunar">{s.name}</h3>
                    <p className="text-[12px] text-muted-foreground">{s.focus}</p>
                  </div>
                </div>
                <p className="mt-4 font-mono text-sm text-cyan">{s.pieces} pieces</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[11px] text-muted-foreground hover:border-cyan/30 hover:text-cyan"
                  >
                    <Users className="size-3" aria-hidden />
                    Follow
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[11px] text-muted-foreground hover:border-cyan/30 hover:text-cyan"
                  >
                    <Gift className="size-3" aria-hidden />
                    Gift
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
