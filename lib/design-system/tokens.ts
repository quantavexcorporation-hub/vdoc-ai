/**
 * VDOC Design System — Token reference (JS)
 * Source of truth for values remains CSS custom properties in app/globals.css
 */

export const colors = {
  primary: 'Deep Space Black',
  secondary: 'Cosmic Purple',
  accent: 'Electric Cyan',
  highlight: 'Neon Blue',
  success: 'Emerald',
  warning: 'Amber',
  error: 'Red',
} as const

export const colorTokens = {
  space: 'var(--space)',
  cosmic: 'var(--cosmic)',
  cyan: 'var(--cyan)',
  neon: 'var(--neon)',
  success: 'var(--success)',
  warning: 'var(--warning)',
  error: 'var(--error)',
  lunar: 'var(--lunar)',
} as const

export const spacing = {
  0: 'var(--space-0)',
  1: 'var(--space-1)',
  2: 'var(--space-2)',
  3: 'var(--space-3)',
  4: 'var(--space-4)',
  5: 'var(--space-5)',
  6: 'var(--space-6)',
  8: 'var(--space-8)',
  10: 'var(--space-10)',
  12: 'var(--space-12)',
  16: 'var(--space-16)',
  20: 'var(--space-20)',
  24: 'var(--space-24)',
  32: 'var(--space-32)',
} as const

export const radii = {
  xs: 'var(--radius-xs)',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  '2xl': 'var(--radius-2xl)',
  full: 'var(--radius-full)',
} as const

export const duration = {
  instant: 'var(--duration-instant)',
  fast: 'var(--duration-fast)',
  normal: 'var(--duration-normal)',
  slow: 'var(--duration-slow)',
  slower: 'var(--duration-slower)',
  crawl: 'var(--duration-crawl)',
} as const

export const ease = {
  standard: 'var(--ease-standard)',
  emphasized: 'var(--ease-emphasized)',
  decelerate: 'var(--ease-decelerate)',
  accelerate: 'var(--ease-accelerate)',
  spring: 'var(--ease-spring)',
} as const

export const elevation = {
  xs: 'var(--shadow-xs)',
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  glowCyan: 'var(--shadow-glow-cyan)',
  glowCosmic: 'var(--shadow-glow-cosmic)',
  glowNeon: 'var(--shadow-glow-neon)',
  focus: 'var(--shadow-focus)',
} as const

export const typography = {
  display: 'ds-display',
  displaySm: 'ds-display-sm',
  headingXl: 'ds-heading-xl',
  headingLg: 'ds-heading-lg',
  heading: 'ds-heading',
  headingSm: 'ds-heading-sm',
  bodyLg: 'ds-body-lg',
  body: 'ds-body',
  bodySm: 'ds-body-sm',
  caption: 'ds-caption',
  label: 'ds-label',
} as const

export const grid = {
  columns: 12,
  maxWidth: 'var(--grid-max)',
  gutter: 'var(--grid-gutter)',
} as const
