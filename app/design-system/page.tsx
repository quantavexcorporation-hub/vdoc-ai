'use client'

import * as React from 'react'
import {
  Home,
  Sparkles,
  Globe,
  Compass,
  Inbox,
} from 'lucide-react'
import {
  DsButton,
  DsInput,
  DsSearchBar,
  DsPromptInput,
  DsCard,
  DsCardTitle,
  DsCardDescription,
  DsCardFooter,
  DsFloatingPanel,
  DsFloatingPanelHeader,
  DsFloatingPanelBody,
  DsNavigation,
  DsSidebar,
  DsCommandPalette,
  useCommandPaletteShortcut,
  DsNotificationStack,
  DsSkeleton,
  DsSkeletonCard,
  DsSkeletonRow,
  DsEmptyState,
} from '@/components/ds'
import type { DsNotificationItem } from '@/components/ds/notification'
import { BrandLogo } from '@/components/brand/logo'
import { colors } from '@/lib/design-system/tokens'

const swatches = [
  { name: 'Deep Space Black', role: 'Primary', token: 'space', className: 'bg-space' },
  { name: 'Cosmic Purple', role: 'Secondary', token: 'cosmic', className: 'bg-cosmic' },
  { name: 'Electric Cyan', role: 'Accent', token: 'cyan', className: 'bg-cyan' },
  { name: 'Neon Blue', role: 'Highlight', token: 'neon', className: 'bg-neon' },
  { name: 'Emerald', role: 'Success', token: 'success', className: 'bg-success' },
  { name: 'Amber', role: 'Warning', token: 'warning', className: 'bg-warning' },
  { name: 'Red', role: 'Error', token: 'error', className: 'bg-error' },
]

const surfaces = [
  { name: 'Void', className: 'bg-bg-void' },
  { name: 'Base', className: 'bg-bg-base' },
  { name: 'Raised', className: 'bg-bg-raised' },
  { name: 'Surface 1', className: 'bg-surface-1' },
  { name: 'Surface 2', className: 'bg-surface-2' },
  { name: 'Surface 3', className: 'bg-surface-3' },
]

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/[0.06] py-20">
      <div className="mb-10 max-w-2xl">
        <p className="ds-label mb-3">{eyebrow}</p>
        <h2 className="ds-heading-xl text-lunar">{title}</h2>
      </div>
      {children}
    </section>
  )
}

export default function DesignSystemPage() {
  const [paletteOpen, setPaletteOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState<DsNotificationItem[]>([
    {
      id: '1',
      title: 'Realm synced',
      description: 'Lumen Fields is ready.',
      tone: 'success',
    },
  ])

  useCommandPaletteShortcut(paletteOpen, setPaletteOpen)

  return (
    <div className="min-h-screen bg-bg-void text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div className="absolute -left-1/4 top-0 h-[50vh] w-[60vw] rounded-full bg-[radial-gradient(circle,oklch(0.52_0.18_295_/0.12),transparent_70%)] blur-3xl animate-atmosphere" />
        <div className="absolute -right-1/4 bottom-0 h-[45vh] w-[55vw] rounded-full bg-[radial-gradient(circle,oklch(0.82_0.14_200_/0.1),transparent_70%)] blur-3xl" />
      </div>

      <DsNavigation
        scrolled
        brand={
          <a href="/design-system" className="font-display text-xl font-semibold tracking-tight text-lunar">
            VDOC<span className="text-cyan"> · DS</span>
          </a>
        }
        items={[
          { label: 'Color', href: '#color' },
          { label: 'Type', href: '#type' },
          { label: 'Components', href: '#components' },
          { label: 'Motion', href: '#motion' },
        ]}
        trailing={
          <>
            <DsButton variant="ghost" size="sm" onClick={() => setPaletteOpen(true)}>
              ⌘K
            </DsButton>
            <DsButton
              variant="outline"
              size="sm"
              onClick={() =>
                setNotifications((n) => [
                  ...n,
                  {
                    id: String(Date.now()),
                    title: 'Signal received',
                    description: 'Notification system online.',
                    tone: 'info',
                  },
                ])
              }
            >
              Notify
            </DsButton>
          </>
        }
      />

      <main className="ds-container pb-32 pt-10">
        <header className="max-w-3xl pb-16 pt-8">
          <p className="ds-label mb-4">Design System</p>
          <BrandLogo size="xl" className="mb-4" />
          <h1 className="sr-only">vdoc</h1>
          <p className="mt-6 ds-body-lg max-w-xl text-pretty">
            One visual language for an AI native entertainment operating system.
            Tokens first. Components second. Pages never invent their own rules.
          </p>
          <p className="mt-4 ds-caption">
            Brand map — Primary: {colors.primary} · Secondary: {colors.secondary} ·
            Accent: {colors.accent} · Highlight: {colors.highlight}
          </p>
        </header>

        {/* COLOR */}
        <Section id="color" eyebrow="Foundations" title="Color system">
          <div className="ds-grid-responsive gap-4">
            {swatches.map((s) => (
              <div
                key={s.token}
                className="overflow-hidden rounded-[var(--radius-xl)] border border-white/10 lg:col-span-3"
              >
                <div className={`h-28 ${s.className}`} />
                <div className="bg-surface-1 px-4 py-3">
                  <p className="text-sm font-medium text-lunar">{s.name}</p>
                  <p className="ds-caption mt-1">
                    {s.role} · --{s.token}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="ds-heading mt-14 mb-6 text-lunar">Background & surface layers</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {surfaces.map((s) => (
              <div
                key={s.name}
                className={`flex h-24 items-end rounded-[var(--radius-lg)] border border-white/10 p-3 ${s.className}`}
              >
                <span className="text-xs text-lunar/80">{s.name}</span>
              </div>
            ))}
          </div>

          <h3 className="ds-heading mt-14 mb-6 text-lunar">Glass system</h3>
          <div className="vdoc-frame relative overflow-hidden rounded-[var(--radius-2xl)] p-10" style={{ ['--frame-hue' as string]: 220 }}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="ds-glass rounded-[var(--radius-xl)] p-6">
                <p className="ds-label mb-2">Glass</p>
                <p className="ds-body-sm text-lunar">Subtle blur · soft border · elevation md</p>
              </div>
              <div className="ds-glass-strong rounded-[var(--radius-xl)] p-6">
                <p className="ds-label mb-2">Glass Strong</p>
                <p className="ds-body-sm text-lunar">Deeper blur · stronger fill · elevation lg</p>
              </div>
            </div>
          </div>
        </Section>

        {/* GRID / RADIUS / SHADOW */}
        <Section id="layout" eyebrow="Foundations" title="Grid, radius & elevation">
          <div className="ds-grid mb-10 rounded-[var(--radius-xl)] border border-white/10 p-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex h-16 items-center justify-center rounded-[var(--radius-sm)] bg-cyan/10 text-xs text-cyan"
              >
                {i + 1}
              </div>
            ))}
          </div>
          <p className="ds-caption mb-10">12-column grid · responsive collapses to 1 → 2 → 12</p>

          <div className="mb-10 flex flex-wrap items-end gap-4">
            {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((r) => (
              <div key={r} className="text-center">
                <div
                  className="size-16 border border-cyan/40 bg-surface-2"
                  style={{ borderRadius: `var(--radius-${r})` }}
                />
                <p className="ds-caption mt-2">{r}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(['sm', 'md', 'lg'] as const).map((e) => (
              <div
                key={e}
                className={`rounded-[var(--radius-xl)] bg-surface-1 p-6 ds-elevate-${e}`}
              >
                <p className="text-sm font-medium text-lunar">Elevation {e}</p>
                <p className="ds-caption mt-1">shadow-{e}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* TYPE */}
        <Section id="type" eyebrow="Foundations" title="Typography scale">
          <div className="space-y-8">
            <div>
              <p className="ds-caption mb-2">Display</p>
              <p className="ds-display-sm">Shape the world</p>
            </div>
            <div>
              <p className="ds-caption mb-2">Heading</p>
              <p className="ds-heading-lg text-lunar">Entertainment operating system</p>
            </div>
            <div>
              <p className="ds-caption mb-2">Body</p>
              <p className="ds-body max-w-xl">
                Syne for display. Outfit for interface. Caption for metadata.
                Tracking and line-height are locked to the scale — never freestyle.
              </p>
            </div>
            <div>
              <p className="ds-caption mb-2">Caption / Label</p>
              <p className="ds-label">Living · Realms · Presence</p>
            </div>
          </div>
        </Section>

        {/* MOTION */}
        <Section id="motion" eyebrow="Foundations" title="Animation timing & curves">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ['Instant', '80ms'],
              ['Fast', '150ms'],
              ['Normal', '250ms'],
              ['Slow', '400ms'],
              ['Slower', '600ms'],
              ['Crawl', '900ms'],
            ].map(([name, value]) => (
              <div
                key={name}
                className="rounded-[var(--radius-lg)] border border-white/10 bg-surface-1 px-4 py-3"
              >
                <p className="text-sm text-lunar">{name}</p>
                <p className="ds-caption mt-1 font-mono">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex size-16 items-center justify-center rounded-full bg-cyan/20 animate-breathe">
              <span className="size-3 rounded-full bg-cyan" />
            </div>
            <div className="flex size-16 items-center justify-center rounded-full border border-neon/40">
              <span className="size-2.5 rounded-full bg-neon animate-signal" />
            </div>
            <p className="ds-body-sm self-center max-w-sm">
              Curves: standard, emphasized, decelerate, accelerate, spring.
              Motion is purposeful — never decorative noise.
            </p>
          </div>
        </Section>

        {/* COMPONENTS */}
        <Section id="components" eyebrow="Components" title="Button system">
          <div className="flex flex-wrap gap-3">
            <DsButton variant="primary">Primary</DsButton>
            <DsButton variant="secondary">Secondary</DsButton>
            <DsButton variant="highlight">Highlight</DsButton>
            <DsButton variant="lunar">Lunar</DsButton>
            <DsButton variant="outline">Outline</DsButton>
            <DsButton variant="ghost">Ghost</DsButton>
            <DsButton variant="glass">Glass</DsButton>
            <DsButton variant="destructive">Destructive</DsButton>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <DsButton size="sm">Small</DsButton>
            <DsButton size="md">Medium</DsButton>
            <DsButton size="lg">Large</DsButton>
            <DsButton size="xl">XLarge</DsButton>
          </div>
        </Section>

        <Section id="inputs" eyebrow="Components" title="Input · Search · Prompt">
          <div className="grid max-w-2xl gap-6">
            <DsInput
              label="Identity"
              placeholder="Traveler name"
              hint="Visible to companions in shared realms."
            />
            <DsInput label="Access key" error="Invalid key format" placeholder="••••••••" />
            <DsSearchBar />
            <DsPromptInput
              suggestions={[
                'Open a quiet realm for two',
                'Continue Rain District',
                'Cast me as the stranger',
              ]}
              onSubmit={() =>
                setNotifications((n) => [
                  ...n,
                  {
                    id: String(Date.now()),
                    title: 'Prompt accepted',
                    description: 'Building your world…',
                    tone: 'success',
                  },
                ])
              }
            />
          </div>
        </Section>

        <Section id="cards" eyebrow="Components" title="Cards & floating panels">
          <div className="grid gap-6 md:grid-cols-2">
            <DsCard interactive className="group">
              <DsCardTitle>Rain District</DsCardTitle>
              <DsCardDescription>
                Interactive surfaces use elevation and border — never random card chrome.
              </DsCardDescription>
              <DsCardFooter>
                <DsButton size="sm" variant="outline">
                  Resume
                </DsButton>
              </DsCardFooter>
            </DsCard>

            <DsFloatingPanel>
              <DsFloatingPanelHeader>
                <p className="text-sm font-medium text-lunar">Floating panel</p>
                <span className="ds-caption">Glass · elevated</span>
              </DsFloatingPanelHeader>
              <DsFloatingPanelBody>
                <p className="ds-body-sm">
                  Overlays, sheets, and OS chrome share the same glass language.
                </p>
              </DsFloatingPanelBody>
            </DsFloatingPanel>
          </div>
        </Section>

        <Section id="chrome" eyebrow="Components" title="Sidebar · Command · Empty · Skeleton">
          <div className="relative mb-16 h-72 overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-bg-base">
            <DsSidebar
              className="!absolute"
              brand={
                <span className="font-display text-lg font-semibold text-lunar">V</span>
              }
              items={[
                { icon: Home, label: 'Home', active: true },
                { icon: Sparkles, label: 'Living' },
                { icon: Globe, label: 'Realms' },
                { icon: Compass, label: 'Explore' },
              ]}
            />
            <div className="flex h-full items-center justify-center pl-16">
              <p className="ds-body-sm">Hover the rail to expand</p>
            </div>
          </div>

          <div className="mb-10">
            <DsButton variant="secondary" onClick={() => setPaletteOpen(true)}>
              Open command palette
            </DsButton>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <DsEmptyState
              icon={<Inbox className="size-6" />}
              title="No living threads"
              description="When you enter a story, it will wait for you here."
              actionLabel="Enter VDOC"
              onAction={() => setPaletteOpen(true)}
            />
            <div className="space-y-6">
              <DsSkeletonRow />
              <DsSkeleton className="h-3 w-full" />
              <DsSkeletonCard />
            </div>
          </div>
        </Section>

        <Section id="states" eyebrow="Interaction" title="Hover & focus states">
          <div className="grid gap-4 md:grid-cols-3">
            <button
              type="button"
              className="ds-hoverable ds-focusable ds-pressable rounded-[var(--radius-xl)] border border-white/10 bg-surface-1 p-6 text-left"
            >
              <p className="text-sm font-medium text-lunar">Hoverable</p>
              <p className="ds-caption mt-2">Border + fill lift on hover</p>
            </button>
            <button
              type="button"
              className="ds-focusable rounded-[var(--radius-xl)] border border-white/10 bg-surface-1 p-6 text-left"
            >
              <p className="text-sm font-medium text-lunar">Focusable</p>
              <p className="ds-caption mt-2">Tab here — cyan focus ring</p>
            </button>
            <button
              type="button"
              className="ds-pressable rounded-[var(--radius-xl)] border border-cyan/30 bg-cyan/10 p-6 text-left"
            >
              <p className="text-sm font-medium text-lunar">Pressable</p>
              <p className="ds-caption mt-2">Scale 0.98 on active</p>
            </button>
          </div>
        </Section>
      </main>

      <DsCommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        items={[
          {
            id: 'enter',
            label: 'Enter VDOC',
            group: 'Navigate',
            shortcut: '↵',
            icon: <Home className="size-4" />,
          },
          {
            id: 'realms',
            label: 'Open Realms',
            group: 'Navigate',
            icon: <Globe className="size-4" />,
          },
          {
            id: 'notify',
            label: 'Push test notification',
            group: 'System',
            onSelect: () =>
              setNotifications((n) => [
                ...n,
                {
                  id: String(Date.now()),
                  title: 'Palette action',
                  description: 'Command executed.',
                  tone: 'warning',
                },
              ]),
          },
        ]}
      />

      <DsNotificationStack
        items={notifications}
        onDismiss={(id) => setNotifications((n) => n.filter((x) => x.id !== id))}
      />
    </div>
  )
}
