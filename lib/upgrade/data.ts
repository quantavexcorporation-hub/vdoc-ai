export type BillingCycle = 'monthly' | 'yearly'
export type PlanId = 'floor' | 'plus' | 'premiere'
export type AddOnId = 'voice' | 'generate' | 'worlds' | 'studio'

export type Plan = {
  id: PlanId
  name: string
  tagline: string
  monthlyPrice: number
  yearlyPrice: number
  bullets: string[]
  cta: string
  badge?: string
  highlight?: boolean
}

export type AddOn = {
  id: AddOnId
  name: string
  description: string
  priceMonthly: number
}

export const PLANS: Plan[] = [
  {
    id: 'floor',
    name: 'FLOOR',
    tagline: 'Open room',
    monthlyPrice: 0,
    yearlyPrice: 0,
    bullets: [
      'Sample pictures and staged rooms',
      'The Listening Forest and four endings',
      'Vyra floor as it stands',
      'Guided Converse replies',
    ],
    cta: 'Stay on Floor',
  },
  {
    id: 'plus',
    name: 'PLUS',
    tagline: 'Recommended',
    badge: 'Most chosen',
    highlight: true,
    monthlyPrice: 699,
    yearlyPrice: 6990,
    bullets: [
      'More titles on the shelf',
      'Resume across a signed-in space',
      'Priority place in generate queues',
      'Creator tools on the account',
    ],
    cta: 'Hold Plus',
  },
  {
    id: 'premiere',
    name: 'PREMIERE',
    tagline: 'Highest floor',
    badge: 'Full stage',
    monthlyPrice: 999,
    yearlyPrice: 9990,
    bullets: [
      'Everything in Plus',
      'Private world branches',
      'Video Genesis studio first',
      'First look at new rooms',
    ],
    cta: 'Hold Premiere',
  },
]

export const ADDONS: AddOn[] = [
  {
    id: 'voice',
    name: 'Voice Converse',
    description: 'Talk to the floor instead of typing.',
    priceMonthly: 149,
  },
  {
    id: 'generate',
    name: 'Priority Generate',
    description: 'Your briefs jump the queue when generation is live.',
    priceMonthly: 199,
  },
  {
    id: 'worlds',
    name: 'Private Worlds',
    description: 'A city branch that only your space can enter.',
    priceMonthly: 249,
  },
  {
    id: 'studio',
    name: 'Studio Pack',
    description: 'Extra seats inside Video Genesis.',
    priceMonthly: 179,
  },
]

export const COMPARE = [
  { feature: 'Watch', floor: 'Samples', plus: 'Library', premiere: 'First look' },
  { feature: 'Create', floor: 'Guided sketch', plus: 'Creator tools', premiere: 'Studio first' },
  { feature: 'Vyra', floor: 'Staged rooms', plus: 'Open rooms', premiere: 'Main stage' },
  { feature: 'Worlds', floor: 'Preview vault', plus: 'Saved place', premiere: 'Private branch' },
]
