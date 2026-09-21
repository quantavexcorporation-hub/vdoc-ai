'use client'

import Link from 'next/link'
import {
  ArrowUpRight,
  Clapperboard,
  Play,
  Sparkles,
  Wand2,
  ChartNoAxesCombined,
  Layers,
} from 'lucide-react'
import type { NexusViewId } from '@/lib/nexus/nav'
import {
  AI_AGENTS,
  SEED_ENTITIES,
  SEED_IDEAS,
  loadProjects,
  type IdeaCard,
} from '@/lib/nexus/memory'
import { MODEL_REGISTRY, readNexusEvents, routeTask } from '@/lib/nexus/orchestrator'
import { cn } from '@/lib/utils'
import * as React from 'react'

function Panel({
  title,
  children,
  action,
}: {
  title: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-white/85">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  )
}

export function NexusView({
  view,
  onNavigate,
}: {
  view: NexusViewId
  onNavigate: (id: NexusViewId) => void
}) {
  switch (view) {
    case 'home':
      return <HomeView onNavigate={onNavigate} />
    case 'idea-lab':
      return <IdeaLabView onNavigate={onNavigate} />
    case 'create':
      return <CreateView />
    case 'stories':
      return <GenericStudio title="Story Engine" bullets={[
        'AI scriptwriter with structure templates',
        'Character arcs & dialogue continuity',
        'Alternative endings + episode planning',
        'Storyboard bridge into production',
      ]} cta="Open Create with story intent" onCta={() => onNavigate('create')} />
    case 'characters':
      return <EntitiesView kind="character" />
    case 'worlds':
      return <EntitiesView kind="world" />
    case 'video':
      return <ProductionView />
    case 'image':
    case 'audio':
    case 'music':
      return (
        <GenericStudio
          title={view === 'image' ? 'Image Studio' : view === 'audio' ? 'Audio' : 'Music'}
          bullets={[
            'Tied to project style & voice memory',
            'Routes to specialized providers via orchestrator',
            'Outputs land in Assets automatically',
          ]}
          cta="Route a generation"
          onCta={() => onNavigate('create')}
        />
      )
    case 'live-production':
      return (
        <GenericStudio
          title="Live Production Room"
          bullets={[
            'Scene · camera · lens · lighting · environment',
            'Natural language + manual cinematic controls',
            'Future-ready for virtual production modules',
          ]}
          cta="Stage a scene brief"
          onCta={() => onNavigate('create')}
        />
      )
    case 'ai-agents':
      return <AgentsView />
    case 'projects':
      return <ProjectsView onNavigate={onNavigate} />
    case 'assets':
      return <EntitiesView />
    case 'audience':
      return <AudienceView onNavigate={onNavigate} />
    case 'distribution':
      return <DistributionView />
    case 'analytics':
      return <AnalyticsView />
    case 'creative-economy':
      return (
        <GenericStudio
          title="Creative Economy"
          bullets={[
            'Characters, collectibles, experiences from Studio DNA',
            'Natural extension of creation — not a separate finance app',
            'Bridge to Virtual Economy (V-Fi) when you are ready',
          ]}
          cta="Open V-Fi bridge"
          onCta={() => onNavigate('v-fi')}
        />
      )
    case 'v-fi':
      return (
        <div className="space-y-4">
          <Panel title="Virtual Economy bridge">
            <p className="text-sm text-white/50">
              Video Genesis keeps creation and ownership connected. Jump into the existing Virtual Economy
              without leaving the Vdoc ecosystem.
            </p>
            <Link
              href="/economy"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-[#141414]"
            >
              Open Virtual Economy
              <ArrowUpRight className="size-4" />
            </Link>
          </Panel>
        </div>
      )
    case 'settings':
      return <NexusSettingsView />
    default:
      return null
  }
}

function HomeView({ onNavigate }: { onNavigate: (id: NexusViewId) => void }) {
  const projects = loadProjects()
  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121216] p-6 md:p-8">
        <div className="vdoc-machine-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="vdoc-engine-pulse pointer-events-none absolute left-1/2 top-0 h-32 w-2/3 -translate-x-1/2" aria-hidden />
        <p className="relative font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-cyan/60">
          Video Genesis · software machine
        </p>
        <h2 className="relative mt-2 max-w-xl font-display text-2xl font-semibold tracking-tight text-white/95 md:text-3xl">
          Direct one intelligent entertainment machine.
        </h2>
        <p className="relative mt-3 max-w-lg text-sm leading-relaxed text-white/45">
          AI is the engine. Data is the layer. You are the director — movies, shows, games, worlds.
        </p>
        <div className="relative mt-5 grid max-w-lg gap-2 sm:grid-cols-3">
          {[
            { k: '01', t: 'AI Engine', d: 'Routes & executes' },
            { k: '02', t: 'Data Layer', d: 'Memory & continuity' },
            { k: '03', t: 'Control', d: 'You approve & steer' },
          ].map((row) => (
            <div
              key={row.k}
              className="rounded-xl border border-white/[0.07] bg-black/30 px-3 py-2.5"
            >
              <p className="font-mono text-[9px] text-white/30">{row.k}</p>
              <p className="mt-0.5 text-xs font-medium text-white/85">{row.t}</p>
              <p className="text-[11px] text-white/35">{row.d}</p>
            </div>
          ))}
        </div>
        <div className="relative mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onNavigate('create')}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-[#141414]"
          >
            <Wand2 className="size-4" />
            Start creating
          </button>
          <button
            type="button"
            onClick={() => onNavigate('idea-lab')}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/80 hover:bg-white/[0.05]"
          >
            <Sparkles className="size-4" />
            Idea Lab
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: Clapperboard,
            t: 'Intent → Creation',
            d: 'Speak once. Orchestrator routes models.',
            v: 'create' as const,
          },
          {
            icon: Layers,
            t: 'Creative memory',
            d: 'Characters & worlds reuse across formats.',
            v: 'assets' as const,
          },
          {
            icon: ChartNoAxesCombined,
            t: 'Audience loop',
            d: 'Insight explains retention — then regenerates.',
            v: 'audience' as const,
          },
        ].map((c) => (
          <button
            key={c.t}
            type="button"
            onClick={() => onNavigate(c.v)}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-left transition-colors hover:bg-white/[0.05]"
          >
            <c.icon className="size-5 text-cyan/70" />
            <p className="mt-3 text-sm font-medium text-white/90">{c.t}</p>
            <p className="mt-1 text-[13px] text-white/40">{c.d}</p>
          </button>
        ))}
      </div>

      <Panel
        title="Active projects"
        action={
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="text-xs text-white/40 hover:text-white/70"
          >
            View all
          </button>
        }
      >
        <ul className="space-y-2">
          {projects.slice(0, 3).map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-black/20 px-3 py-2.5"
            >
              <div>
                <p className="text-sm text-white/85">{p.title}</p>
                <p className="text-[12px] text-white/35">
                  {p.genre} · {p.status}
                </p>
              </div>
              <Play className="size-4 text-white/30" />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

function IdeaLabView({ onNavigate }: { onNavigate: (id: NexusViewId) => void }) {
  const [ideas] = React.useState<IdeaCard[]>(SEED_IDEAS)
  return (
    <div className="space-y-4">
      <p className="text-sm text-white/45">
        IDEA → STORY → STORYBOARD → PRODUCTION — promote without leaving Video Genesis.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {ideas.map((idea) => (
          <article
            key={idea.id}
            className="flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] text-white/35">{idea.genre}</span>
              <span className="rounded-full bg-cyan/10 px-2 py-0.5 text-[11px] font-medium text-cyan/80">
                Score {idea.score}
              </span>
            </div>
            <h4 className="mt-2 text-base font-medium text-white/90">{idea.title}</h4>
            <p className="mt-1 flex-1 text-[13px] text-white/45">{idea.angle}</p>
            <p className="mt-2 text-[11px] text-white/30">Audience · {idea.audience}</p>
            <button
              type="button"
              onClick={() => onNavigate('stories')}
              className="mt-3 rounded-lg border border-white/10 py-2 text-xs text-white/70 hover:bg-white/[0.05]"
            >
              Promote to Story Engine
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

function CreateView() {
  const [intent, setIntent] = React.useState('')
  const [plan, setPlan] = React.useState<ReturnType<typeof routeTask> | null>(null)

  return (
    <div className="space-y-4">
      <Panel title="Creative intent">
        <textarea
          rows={3}
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          placeholder="e.g. Create a 30s cinematic trailer for Project Aurora in Neo Harbor…"
          className="w-full resize-none rounded-xl border border-white/[0.08] bg-black/30 px-3 py-2.5 text-sm text-white/90 placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
        />
        <button
          type="button"
          onClick={() => setPlan(routeTask('video-gen'))}
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-[#141414]"
        >
          <Wand2 className="size-4" />
          Route through orchestrator
        </button>
        {plan && (
          <div className="mt-4 rounded-xl border border-cyan/20 bg-cyan/[0.06] p-3 text-[13px] text-white/70">
            <p className="font-medium text-cyan/90">Orchestration plan</p>
            <p className="mt-1">{plan.rationale}</p>
            <p className="mt-2 font-mono text-[11px] text-white/35">
              Fallback: {plan.fallback.map((m) => m.label).join(' · ') || '—'}
            </p>
          </div>
        )}
      </Panel>
      <Panel title="Pipeline">
        <ol className="grid gap-2 sm:grid-cols-4">
          {['Classify', 'Select model', 'Generate', 'Evaluate'].map((s, i) => (
            <li
              key={s}
              className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-3 text-center text-xs text-white/55"
            >
              <span className="block text-[10px] text-white/30">{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  )
}

function EntitiesView({ kind }: { kind?: string }) {
  const list = kind
    ? SEED_ENTITIES.filter((e) => e.kind === kind)
    : SEED_ENTITIES
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((e) => (
        <article
          key={e.id}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4"
        >
          <p className="text-[10px] uppercase tracking-wider text-white/35">{e.kind}</p>
          <h4 className="mt-1 text-sm font-medium text-white/90">{e.name}</h4>
          <p className="mt-1 text-[13px] text-white/45">{e.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {e.tags.map((t) => (
              <span
                key={t}
                className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-white/40"
              >
                {t}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

function ProductionView() {
  return (
    <div className="space-y-4">
      <Panel title="AI Production Room">
        <div className="grid gap-2 sm:grid-cols-3">
          {['Scene', 'Camera', 'Lens', 'Lighting', 'Environment', 'VFX', 'Sound', 'Dialogue', 'Music'].map(
            (c) => (
              <div
                key={c}
                className="rounded-xl border border-white/[0.06] bg-black/25 px-3 py-4 text-center text-xs text-white/55"
              >
                {c}
              </div>
            )
          )}
        </div>
        <p className="mt-4 text-[13px] text-white/40">
          Try: “Move the camera slowly behind the character.” · “Cinematic 35mm look.” · “Sunset to
          night.”
        </p>
      </Panel>
      <Panel title="Video workspace">
        <ul className="grid gap-2 sm:grid-cols-2 text-[13px] text-white/50">
          {[
            'Text-to-video',
            'Image-to-video',
            'Video-to-video',
            'Scene extension',
            'Relighting',
            'Character consistency',
            'Auto edit',
            'Vertical / Shorts',
          ].map((x) => (
            <li key={x} className="rounded-lg border border-white/[0.05] px-3 py-2">
              {x}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

function AgentsView() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {AI_AGENTS.map((a) => (
        <div
          key={a.id}
          className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3"
        >
          <p className="text-sm font-medium text-white/85">{a.name}</p>
          <p className="mt-0.5 text-[12px] text-white/40">{a.role}</p>
        </div>
      ))}
    </div>
  )
}

function ProjectsView({ onNavigate }: { onNavigate: (id: NexusViewId) => void }) {
  const projects = loadProjects()
  return (
    <div className="space-y-3">
      {projects.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onNavigate('create')}
          className="flex w-full items-start justify-between rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-left hover:bg-white/[0.05]"
        >
          <div>
            <p className="text-sm font-medium text-white/90">{p.title}</p>
            <p className="mt-1 text-[13px] text-white/40">{p.intent}</p>
            <p className="mt-2 text-[11px] text-white/30">
              {p.status} · mode {p.modes.join(', ')}
            </p>
          </div>
          <ArrowUpRight className="size-4 text-white/30" />
        </button>
      ))}
    </div>
  )
}

function AudienceView({ onNavigate }: { onNavigate: (id: NexusViewId) => void }) {
  return (
    <div className="space-y-4">
      <Panel title="Insight (not just a metric)">
        <p className="text-2xl font-semibold tracking-tight text-white/90">Retention 63%</p>
        <p className="mt-3 text-sm leading-relaxed text-white/50">
          Your audience stayed <span className="text-cyan/80">18% longer</span> when the story began
          with action. Cold opens with dialogue lost viewers in the first 12 seconds.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('create')}
          className="mt-4 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-[#141414]"
        >
          Generate 3 new openings from this insight
        </button>
      </Panel>
    </div>
  )
}

function DistributionView() {
  const steps = [
    'Long video',
    'Trailer',
    'Shorts',
    'Clips',
    'Vertical',
    'Social teaser',
    'Poster',
    'Thumbnail',
    'Audio',
    'Community post',
  ]
  return (
    <Panel title="One project → many formats">
      <ol className="flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <li
            key={s}
            className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-1.5 text-[12px] text-white/55"
          >
            <span className="mr-1.5 text-white/25">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </Panel>
  )
}

function AnalyticsView() {
  const [events, setEvents] = React.useState<ReturnType<typeof readNexusEvents>>([])
  React.useEffect(() => {
    setEvents(readNexusEvents(8))
  }, [])
  return (
    <div className="space-y-4">
      <Panel title="Event layer">
        <p className="text-[13px] text-white/40">
          generation.created · asset.created · content.performance.updated · creative.insight.generated
        </p>
        <ul className="mt-3 space-y-2">
          {events.length === 0 && (
            <li className="text-sm text-white/35">No events yet — talk to the AI Director.</li>
          )}
          {events.map((e) => (
            <li
              key={e.id}
              className="rounded-lg border border-white/[0.05] px-3 py-2 font-mono text-[11px] text-white/45"
            >
              {e.type} · {new Date(e.at).toLocaleTimeString()}
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Model registry">
        <ul className="space-y-1.5 text-[13px] text-white/50">
          {MODEL_REGISTRY.map((m) => (
            <li key={m.id} className="flex justify-between gap-2 border-b border-white/[0.04] py-1.5">
              <span>{m.label}</span>
              <span className="text-white/30">{m.category}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  )
}

function NexusSettingsView() {
  return (
    <Panel title="Human + AI control">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { id: 'assist', t: 'Assist', d: 'AI recommends. You decide.' },
          { id: 'copilot', t: 'Co-pilot', d: 'Create together with approvals.' },
          { id: 'autopilot', t: 'Autopilot', d: 'AI runs approved workflows.' },
        ].map((m) => (
          <div
            key={m.id}
            className="rounded-xl border border-white/[0.08] bg-black/20 p-4"
          >
            <p className="text-sm font-medium text-white/90">{m.t}</p>
            <p className="mt-1 text-[12px] text-white/40">{m.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] text-white/35">
        Mode is controlled from the Video Genesis top bar. Existing Vdoc auth, V-Fi, and entertainment flows
        stay unchanged.
      </p>
    </Panel>
  )
}

function GenericStudio({
  title,
  bullets,
  cta,
  onCta,
}: {
  title: string
  bullets: string[]
  cta: string
  onCta: () => void
}) {
  return (
    <Panel title={title}>
      <ul className="space-y-2 text-sm text-white/50">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="text-cyan/50">·</span>
            {b}
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onCta}
        className="mt-4 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/80 hover:bg-white/[0.05]"
      >
        {cta}
      </button>
    </Panel>
  )
}
