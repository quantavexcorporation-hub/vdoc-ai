'use client'

import * as React from 'react'
import { Check, Sparkles } from 'lucide-react'
import { VdocShell } from '@/components/os/vdoc-shell'
import { LivingAtmosphere } from '@/components/os/living-atmosphere'
import { HomeFooter } from '@/components/home/home-footer'
import { cn } from '@/lib/utils'
import {
  ADDONS,
  COMPARE,
  INR_PER_USD,
  PLANS,
  type AddOnId,
  type BillingCycle,
  type PlanId,
} from '@/lib/upgrade/data'
import {
  readAddOns,
  readCycle,
  readPlan,
  writeAddOns,
  writeCycle,
  writePlan,
} from '@/lib/upgrade/storage'

function rupees(value: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)
}

function dollars(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / INR_PER_USD)
}

function PriceMark({
  inr,
  cadence,
  size = 'lg',
}: {
  inr: number
  cadence: string
  size?: 'lg' | 'sm'
}) {
  if (size === 'sm') {
    return (
      <span className="text-right text-xs text-cyan">
        ₹{rupees(inr)}
        {cadence}
        <span className="mt-0.5 block text-[11px] text-white/45">{dollars(inr)}</span>
      </span>
    )
  }

  return (
    <p className="mt-4 font-display text-2xl font-semibold leading-none text-lunar">
      ₹{rupees(inr)}
      <span className="ml-1 text-xs font-medium text-white/40">{cadence}</span>
      <span className="mt-1.5 block text-sm font-medium text-white/50">{dollars(inr)}</span>
    </p>
  )
}

export function UpgradeApp() {
  const [cycle, setCycle] = React.useState<BillingCycle>('monthly')
  const [plan, setPlan] = React.useState<PlanId>('plus')
  const [addons, setAddons] = React.useState<AddOnId[]>([])
  const [held, setHeld] = React.useState(false)

  React.useEffect(() => {
    const storedCycle = readCycle()
    const storedPlan = readPlan()
    const storedAddOns = readAddOns()
    if (storedCycle) setCycle(storedCycle)
    if (storedPlan) setPlan(storedPlan)
    if (storedAddOns.length) setAddons(storedAddOns)
  }, [])

  React.useEffect(() => writeCycle(cycle), [cycle])
  React.useEffect(() => writePlan(plan), [plan])
  React.useEffect(() => writeAddOns(addons), [addons])

  const selected = PLANS.find((item) => item.id === plan) ?? PLANS[1]
  const addTotal = addons.reduce(
    (sum, id) => sum + (ADDONS.find((item) => item.id === id)?.priceMonthly ?? 0),
    0
  )
  const total =
    cycle === 'monthly'
      ? selected.monthlyPrice + addTotal
      : selected.yearlyPrice + addTotal * 10

  return (
    <VdocShell mood="intelligence">
      <LivingAtmosphere intensity="subtle" />
      <main className="mx-auto max-w-[1100px] px-3 py-8 sm:px-6 sm:py-10 md:px-8 md:py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
              Upgrade
            </p>
            <h1 className="mt-2 font-display text-[clamp(1.7rem,5vw,2.6rem)] font-semibold tracking-tight text-white/95">
              Raise the floor.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/45">
              Pick a tier, then attach only the modules you want. Payment is not live.
              The pick stays on this device.
            </p>
          </div>
          <div
            className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1"
            role="group"
            aria-label="Billing cycle"
          >
            {(['monthly', 'yearly'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCycle(option)}
                className={cn(
                  'min-h-9 rounded-full px-4 text-xs font-medium capitalize',
                  cycle === option
                    ? 'bg-white text-[#141414]'
                    : 'text-white/55 hover:text-white/85'
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {PLANS.map((item) => {
            const price = cycle === 'monthly' ? item.monthlyPrice : item.yearlyPrice
            const on = plan === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPlan(item.id)}
                aria-pressed={on}
                className={cn(
                  'rounded-2xl border p-5 text-left transition-colors',
                  on
                    ? 'border-cyan/40 bg-cyan/[0.08] shadow-[0_0_40px_rgba(34,211,238,0.08)]'
                    : 'border-white/[0.08] bg-white/[0.03] hover:border-white/16'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-white/45">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm font-medium text-white/90">{item.tagline}</p>
                  </div>
                  {item.badge ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-cyan/25 bg-cyan/10 px-2 py-0.5 text-[10px] text-cyan">
                      <Sparkles className="size-3" aria-hidden />
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <PriceMark inr={price} cadence={cycle === 'monthly' ? '/mo' : '/yr'} />
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-xs text-white/55">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-cyan" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <span
                  className={cn(
                    'mt-5 flex h-10 items-center justify-center rounded-xl text-sm font-medium',
                    item.highlight
                      ? 'bg-white text-[#141414]'
                      : 'border border-white/10 bg-white/[0.04] text-white/80'
                  )}
                >
                  {item.cta}
                </span>
              </button>
            )
          })}
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
          <div className="border-b border-white/[0.06] px-5 py-4">
            <h2 className="text-sm font-medium text-white/90">What changes</h2>
            <p className="mt-1 text-xs text-white/40">Three floors. One current pick.</p>
          </div>
          <div className="hidden grid-cols-4 text-[11px] font-medium text-white/40 sm:grid">
            <div className="px-5 py-3">Feature</div>
            <div className="px-5 py-3">Floor</div>
            <div className="px-5 py-3">Plus</div>
            <div className="px-5 py-3">Premiere</div>
          </div>
          {COMPARE.map((row, index) => (
            <div
              key={row.feature}
              className={cn(
                'grid gap-1 px-5 py-3 text-xs sm:grid-cols-4 sm:gap-0',
                index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
              )}
            >
              <p className="font-medium text-white/85">{row.feature}</p>
              <p className="text-white/50">
                <span className="sm:hidden">Floor · </span>
                {row.floor}
              </p>
              <p className="text-white/50">
                <span className="sm:hidden">Plus · </span>
                {row.plus}
              </p>
              <p className="text-white/50">
                <span className="sm:hidden">Premiere · </span>
                {row.premiere}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-sm font-medium text-white/90">Modules</h2>
              <p className="mt-1 text-xs text-white/40">Attach only what you need.</p>
            </div>
            <p className="text-xs text-white/40">{addons.length} selected</p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {ADDONS.map((addon) => {
              const on = addons.includes(addon.id)
              return (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() =>
                    setAddons((prev) =>
                      prev.includes(addon.id)
                        ? prev.filter((id) => id !== addon.id)
                        : [...prev, addon.id]
                    )
                  }
                  aria-pressed={on}
                  className={cn(
                    'rounded-xl border p-4 text-left transition-colors',
                    on ? 'border-cyan/35 bg-cyan/[0.08]' : 'border-white/10 bg-black/20 hover:border-white/20'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-white/90">{addon.name}</p>
                    <PriceMark inr={addon.priceMonthly} cadence="/mo" size="sm" />
                  </div>
                  <p className="mt-1 text-xs text-white/45">{addon.description}</p>
                </button>
              )
            })}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-white/90">Hold this mix</p>
              <p className="mt-1 text-xs text-white/45">
                {selected.name} · {cycle} · {addons.length} modules
              </p>
            </div>
            <button
              type="button"
              onClick={() => setHeld(true)}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-medium text-[#141414]"
            >
              {held ? 'Held on this device' : 'Hold this plan'}
            </button>
          </div>
          <p className="mt-4 rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-xs text-white/45">
            Estimated total ₹{rupees(total)} {cycle === 'monthly' ? '/mo' : '/yr'} · {dollars(total)}.
            Nothing was charged. Accounts and payment come later.
          </p>
        </section>
      </main>
      <HomeFooter />
    </VdocShell>
  )
}
