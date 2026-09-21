import type { Metadata } from 'next'
import { IntelligenceApp } from '@/components/intelligence/intelligence-app'

export const metadata: Metadata = {
  title: 'Intelligence — vdoc',
  description:
    'Audience intelligence for pains entertainment never solved: mood, trust, re-entry, afterglow, unfinished guilt, world threads.',
}

export default function IntelligencePage() {
  return <IntelligenceApp />
}
